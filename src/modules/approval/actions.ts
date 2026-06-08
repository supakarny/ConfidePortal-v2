"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createAuditLog } from "@/modules/audit/actions"

export async function getApprovalFlows() {
  return await prisma.approvalFlow.findMany({
    include: {
      steps: {
        orderBy: { stepOrder: 'asc' }
      },
      _count: {
        select: { requests: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function createApprovalFlow(data: { name: string, description?: string }) {
  try {
    const flow = await prisma.approvalFlow.create({
      data: {
        name: data.name,
        description: data.description,
      }
    })
    
    revalidatePath("/tools/approval-flows")
    return { success: true, flow }
  } catch (error) {
    console.error("Failed to create flow:", error)
    return { success: false }
  }
}

export async function addStepToFlow(flowId: string, stepOrder: number, approverRoleId?: string, approverUserId?: string) {
  try {
    await prisma.approvalStep.create({
      data: {
        flowId,
        stepOrder,
        approverRoleId,
        approverUserId
      }
    })
    revalidatePath("/tools/approval-flows")
    return { success: true }
  } catch (error) {
    console.error("Failed to add step:", error)
    return { success: false }
  }
}

export async function submitRequest(flowId: string, requesterId: string, payload: any) {
  try {
    const request = await prisma.approvalRequest.create({
      data: {
        flowId,
        requesterId,
        payload,
        status: "PENDING",
        currentStepOrder: 1
      }
    })

    await createAuditLog({
      action: "REQUEST_SUBMITTED",
      resource: "APPROVAL_ENGINE",
      resourceId: request.id,
      userId: requesterId,
      details: { flowId }
    })

    revalidatePath("/tools/approvals")
    return { success: true, request }
  } catch (error) {
    console.error("Failed to submit request:", error)
    return { success: false }
  }
}

// Function to get requests that a specific user needs to approve
export async function getPendingApprovalsForUser(userId: string, roleId?: string) {
  // A request is pending for this user if its current step is assigned to them OR their role
  return await prisma.approvalRequest.findMany({
    where: {
      status: "PENDING",
      flow: {
        steps: {
          some: {
            // Need to match the currentStepOrder of the request
            // Prisma doesn't easily allow cross-field joins in a simple `some`, 
            // but we can fetch them and filter, or use raw query.
            // For simplicity here, we fetch requests where the current step matches user/role
            OR: [
              { approverUserId: userId },
              { approverRoleId: roleId || undefined }
            ]
          }
        }
      }
    },
    include: {
      flow: { include: { steps: true } },
      requester: true,
      logs: { include: { approver: true } }
    }
  }).then((requests: any[]) => 
    // Filter to ensure the step matching the user is the *current* step
    requests.filter((req: any) => {
      const currentStep = req.flow.steps.find((s: any) => s.stepOrder === req.currentStepOrder)
      if (!currentStep) return false
      return currentStep.approverUserId === userId || currentStep.approverRoleId === roleId
    })
  )
}

export async function processApproval(requestId: string, approverId: string, action: 'APPROVED' | 'REJECTED', comments?: string) {
  try {
    const request = await prisma.approvalRequest.findUnique({
      where: { id: requestId },
      include: { flow: { include: { steps: true } } }
    })

    if (!request) throw new Error("Request not found")
    
    // Log the action
    await prisma.approvalLog.create({
      data: {
        requestId,
        approverId,
        action,
        comments,
        stepOrder: request.currentStepOrder
      }
    })

    if (action === 'REJECTED') {
      await prisma.approvalRequest.update({
        where: { id: requestId },
        data: { status: 'REJECTED' }
      })
    } else {
      // Find max steps
      const maxStep = Math.max(...request.flow.steps.map(s => s.stepOrder))
      
      if (request.currentStepOrder >= maxStep) {
        // Fully approved
        await prisma.approvalRequest.update({
          where: { id: requestId },
          data: { status: 'APPROVED' }
        })
      } else {
        // Move to next step
        await prisma.approvalRequest.update({
          where: { id: requestId },
          data: { currentStepOrder: request.currentStepOrder + 1 }
        })
      }
    }

    revalidatePath("/tools/approvals")
    return { success: true }
  } catch (error) {
    console.error("Failed to process approval:", error)
    return { success: false }
  }
}
