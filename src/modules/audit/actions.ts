"use server"

import prisma from "@/lib/db"

export async function getAuditLogs(limit = 100) {
  return await prisma.auditLog.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
  })
}

// Global helper to create audit logs
export async function createAuditLog(data: {
  action: string
  resource: string
  resourceId?: string
  userId?: string
  details?: any
  ipAddress?: string
  userAgent?: string
}) {
  try {
    await prisma.auditLog.create({
      data: {
        action: data.action,
        resource: data.resource,
        resourceId: data.resourceId,
        userId: data.userId,
        details: data.details || {},
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      }
    })
  } catch (error) {
    console.error("Failed to create audit log:", error)
  }
}
