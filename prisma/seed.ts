import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // 1. Create Roles & Permissions
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
      description: 'System Administrator with full access',
    },
  })

  const employeeRole = await prisma.role.upsert({
    where: { name: 'EMPLOYEE' },
    update: {},
    create: {
      name: 'EMPLOYEE',
      description: 'Standard Employee access',
    },
  })

  // 2. Create Departments & Positions
  const itDepartment = await prisma.department.upsert({
    where: { name: 'Information Technology' },
    update: {},
    create: {
      name: 'Information Technology',
      description: 'IT Department',
    },
  })

  const managerPosition = await prisma.position.upsert({
    where: { name: 'IT Manager' },
    update: {},
    create: {
      name: 'IT Manager',
      description: 'Manager of IT',
    },
  })

  // 3. Create Admin Users (with explicit credential passwords for local testing)
  const hashedPassword = await bcrypt.hash('admin123', 10)

  // Admin 1 (test@test.com)
  const adminUser1 = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      name: 'Test Admin',
      password: hashedPassword,
      roleId: adminRole.id,
      employee: {
        create: {
          employeeCode: 'EMP-001',
          firstName: 'Test',
          lastName: 'Admin',
          hireDate: new Date(),
          departmentId: itDepartment.id,
          positionId: managerPosition.id,
        }
      }
    },
  })

  // Admin 2 (supakarn.y@confide.co.th)
  const adminUser2 = await prisma.user.upsert({
    where: { email: 'supakarn.y@confide.co.th' },
    update: {},
    create: {
      email: 'supakarn.y@confide.co.th',
      name: 'Supakarn Y.',
      password: hashedPassword,
      roleId: adminRole.id,
      employee: {
        create: {
          employeeCode: 'EMP-002',
          firstName: 'Supakarn',
          lastName: 'Y.',
          hireDate: new Date(),
          departmentId: itDepartment.id,
          positionId: managerPosition.id,
        }
      }
    },
  })

  console.log(`Seeded Admins: ${adminUser1.email}, ${adminUser2.email}`)
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
