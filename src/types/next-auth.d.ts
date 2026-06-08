import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      roleId?: string
      employeeId?: string
    } & DefaultSession["user"]
  }
}
