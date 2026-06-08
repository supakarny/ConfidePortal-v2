# Code Guidelines

## Core Principles

### User Context
- **The user is NOT a programmer**. Always guide and educate the user throughout the process.
- Explain what you're about to do, why you're doing it, and what the expected outcome will be.
- Use simple, non-technical language when possible, while teaching technical concepts gradually.

### Language Preference
- **Always respond in the same language as the user**. If the user writes in Thai, respond in Thai. If in English, respond in English.


## Project Overview
I want to build a comprehensive internal web application called "Confide Portal" for the employees of Confide Technology Co., Ltd. This portal will serve as a centralized hub containing various sub-applications (modules). Different departments and roles will have access to specific modules, but there will be foundational modules accessible to everyone.


## Technical Stack & Architecture
- Three-tier Application Architecture: Clear separation of Presentation Layer (Interface), Application Layer (Business Logic), and Data Layer (Database).
- Modular Monolith Approach: All modules will share the same codebase, use the same database, and run in the same process initially. However, they must be designed with microservice principles in mind, communicating internally via RESTful APIs and RPC-like patterns to allow future decoupling.
- Transparency & Auditability: EVERY action within the system must be fully traceable. An extensive audit logging system must be implemented globally.
- Admin Control: System administrators must have absolute control and visibility over all processes and sub-applications.

### Tech Stack
- Frontend: Next.js (App Router preferred)
- Styling: Tailwind CSS + shadcn/ui components
- Database ORM: Prisma
- Database: PostgreSQL
- File Storage: Local storage API (built as an internal microservice/module)
- Version Control: Git
- Containerization: Docker (Please generate a docker-compose.yml for PostgreSQL and the app)
- All Tech stack must be latest version and production ready, secure, and scalable, if there are better tech stack or tools that suitable for this project please suggest. If so, please explain and justify your suggestion.

### Authentication Requirements
- Primary: Google OAuth login (Strictly restricted to the @confide.co.th domain). Employees can just "Login with Google".
- Secondary: Manual account creation by the Administrator ONLY (for specific employees who do not have a company email). No public sign-up allowed.

### Data Seeding
Always implement comprehensive data seeding to provide mockup data:
- **Default admin account**: email: `test@test.com`, password: `admin123`
- **Sample data** relevant to the application (news articles, blog posts, orders, products, etc.)
- Seed data should be substantial enough for users to see how the application works with real data


## Instructions for AI
- Start by providing the terminal commands to initialize this project (Next.js, Prisma, shadcn/ui).
- Provide the `docker-compose.yml` file for setting up the local database.
- Provide the `schema.prisma` file that covers the models needed for the 6 foundational modules mentioned above.
- Outline the folder structure representing the Modular Monolith / 3-tier architecture.
- Wait for my confirmation before generating the code for each specific module.