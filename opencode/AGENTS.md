# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this repository.

## Repository Overview

This is a collection of educational programming projects (PLF - Programmieren Lernen mit Fortgeschrittenen Themen) primarily using:
- JavaScript/Node.js with Prisma ORM
- TypeScript with Deno
- Database projects with SQLite
- Various algorithmic and data structure exercises

## Build/Lint/Test Commands

### General Commands
```bash
# Install dependencies (run in project directory)
npm install

# Run with Node.js debugger
node --inspect <filename>.js

# Run with Deno
deno run --allow-read --allow-write <filename>.ts
```

### Prisma Database Projects
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database
npm run seed
# or
npx prisma db seed

# Run queries with debugger
npm run dev
# or
npm run dev-seed

# Run without debugger
npm run run
```

### TypeScript/Deno Projects
```bash
# Run TypeScript file with Deno
deno run --allow-net --allow-read --allow-write <filename>.ts

# Run with permissions for database access
deno run --allow-read --allow-write --allow-net <filename>.ts
```

## Code Style Guidelines

### General Principles
- Use German for variable names and comments where appropriate (this is a German educational repository)
- Follow existing naming conventions in each project
- Keep code simple and educational - clarity over cleverness

### JavaScript/Node.js
- Use `const` for variables that don't need reassignment
- Use `let` only when reassignment is necessary
- Use `require()` for CommonJS imports (consistent with existing code)
- Use async/await for asynchronous operations
- Handle errors appropriately with try/catch blocks

### TypeScript/Deno
- Use ES6 import/export syntax
- Import external modules with full URLs (Deno convention)
- Use type annotations where they add clarity
- Follow Deno security model with explicit permissions

### Database Code (Prisma)
- Use camelCase for JavaScript variables
- Use PascalCase for Prisma model names
- Use descriptive variable names in German when appropriate
- Always close database connections: `prisma.$disconnect()` or `db.close()`
- Use transactions for multiple related operations

### Error Handling
- Always include error handling for database operations
- Use try/catch blocks for async operations
- Log meaningful error messages
- Handle promise rejections with `.catch()`

### File Organization
- Keep related files in the same project directory
- Use descriptive filenames
- Separate seed files from query files
- Keep Prisma schema in `prisma/` directory

### Naming Conventions
- Variables: camelCase (`meineVariable`, `zooDaten`)
- Functions: camelCase (`seedZoo`, `queryDaten`)
- Constants: UPPER_SNAKE_CASE (`MAX_ANIMALS`, `MIN_WORKERS`)
- Files: kebab-case or camelCase (be consistent within project)
- Database tables: snake_case or camelCase (follow Prisma conventions)

### Code Structure
- Use async functions for database operations
- Separate data generation from data querying
- Use meaningful console.log statements for debugging
- Keep functions focused on single responsibilities

### Import/Export Patterns
```javascript
// CommonJS (Node.js projects)
const { PrismaClient } = require('@prisma/client');
const { fakerDE } = require('@faker-js/faker');

// ES6 (Deno/TypeScript projects)
import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";
```

### Testing
- No formal test framework is currently set up
- Test by running scripts and verifying console output
- Use `console.log()` for debugging and verification
- Test with small datasets first

## Project-Specific Notes

### PLF Projects (Prisma)
- These projects use SQLite databases
- Seed files generate test data
- Query files demonstrate database operations
- Use `npx prisma studio` to inspect databases visually

### Deno Projects
- Require explicit permissions for file/network access
- Use external modules via URLs
- May use SQLite directly via Deno-compatible modules

### General Educational Projects
- Focus on learning concepts over production code
- Include explanatory comments where helpful
- Use German variable names when they enhance understanding

## Common Patterns

### Database Seeding
```javascript
async function seedData() {
    try {
        // Generate and insert data
        await prisma.model.create({ data: newData });
        console.log('Seeding completed');
    } catch (error) {
        console.error('Seeding error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}
```

### Database Queries
```javascript
async function queryData() {
    try {
        const results = await prisma.model.findMany({
            where: { condition: true },
            select: { field1: true, field2: true }
        });
        console.log(results);
    } catch (error) {
        console.error('Query error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}
```

## Development Workflow

1. Navigate to the specific project directory
2. Run `npm install` if node_modules is missing
3. For database projects: run `npm run seed` first
4. Run the main script with `npm run dev` or `node --inspect`
5. Check console output for results
6. Use `npx prisma studio` to inspect database if needed

## Security Considerations

- Never commit database files (*.db)
- Never commit .env files with secrets
- Use appropriate file permissions with Deno
- Validate user input in production scenarios (though these are educational projects)