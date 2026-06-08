"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getRoles() {
  return await prisma.role.findMany({
    include: {
      permissions: true,
      _count: {
        select: { users: true }
      }
    }
  })
}

export async function getPermissions() {
  return await prisma.permission.findMany()
}

export async function getUsersWithRoles() {
  return await prisma.user.findMany({
    include: {
      role: true,
      employee: {
        include: { department: true }
      }
    }
  })
}

export async function assignRoleToUser(userId: string, roleId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { roleId }
    })
    
    await prisma.auditLog.create({
      data: {
        action: 'ROLE_ASSIGNED',
        resource: 'USER',
        resourceId: userId,
        details: { roleId }
      }
    })

    revalidatePath("/roles")
    return { success: true }
  } catch (error) {
    console.error("Failed to assign role:", error)
    return { success: false, error: "Failed to assign role" }
  }
}
