"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getEmployees() {
  return await prisma.employee.findMany({
    include: {
      department: true,
      position: true,
      user: {
        include: { role: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getDepartments() {
  return await prisma.department.findMany()
}

export async function getPositions() {
  return await prisma.position.findMany()
}

export async function createEmployee(data: {
  employeeCode: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  departmentId?: string
  positionId?: string
}) {
  try {
    // Basic transaction: Create User, then Create Employee
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: data.email,
          name: `${data.firstName} ${data.lastName}`,
        }
      })

      await tx.employee.create({
        data: {
          employeeCode: data.employeeCode,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          departmentId: data.departmentId,
          positionId: data.positionId,
          userId: user.id,
          hireDate: new Date(),
        }
      })
      
      // Log Audit
      await tx.auditLog.create({
        data: {
          action: 'EMPLOYEE_CREATED',
          resource: 'EMPLOYEE',
          resourceId: user.id,
          details: { email: data.email, employeeCode: data.employeeCode }
        }
      })
    })

    revalidatePath("/employees")
    return { success: true }
  } catch (error) {
    console.error("Failed to create employee:", error)
    return { success: false, error: "Failed to create employee" }
  }
}
