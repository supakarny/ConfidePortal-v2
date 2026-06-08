"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getUserNotifications(userId: string) {
  return await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true }
    })
    revalidatePath("/notifications")
    return { success: true }
  } catch (error) {
    console.error("Failed to mark notification as read:", error)
    return { success: false }
  }
}

export async function markAllNotificationsAsRead(userId: string) {
  try {
    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true }
    })
    revalidatePath("/notifications")
    return { success: true }
  } catch (error) {
    console.error("Failed to mark all as read:", error)
    return { success: false }
  }
}

export async function createSystemNotification(data: {
  userId: string
  title: string
  message: string
  type?: string
  link?: string
}) {
  try {
    await prisma.notification.create({
      data: {
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type || 'SYSTEM',
        link: data.link,
      }
    })
    revalidatePath("/notifications")
  } catch (error) {
    console.error("Failed to create notification:", error)
  }
}
