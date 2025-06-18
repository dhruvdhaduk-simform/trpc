# tRPC Demo Server

This repository contains a simple demonstration of a tRPC server, showcasing how to build type-safe APIs with an excellent developer experience.

## 🚀 Deployment

The tRPC server is deployed and accessible at the following endpoint:

**Deployment Link:** [https://trpc-server-demo.vercel.app/api/trpc](https://trpc-server-demo.vercel.app/api/trpc)

You can interact with this API using a tRPC client in your frontend application.

## ✨ Features

-   **Type-Safety:** End-to-end type safety from backend to frontend.
-   **Zod Integration:** Utilizes Zod for robust schema validation.
-   **Nested Routers:** Demonstrates how to organize procedures into nested routers for better code structure.
-   **Query Procedures:** Examples of various `query` procedures.

## 📦 API Endpoints

The following procedures are exposed by the server:

You can directly interact with the tRPC `query` procedures by constructing specific URLs. tRPC query inputs are typically passed as a URL-encoded JSON string in the `input` query parameter.

**Base URL:** `https://trpc-server-demo.vercel.app/api/trpc/`

### 1. `greeting` procedure

-   **Without input:**
    `https://trpc-server-demo.vercel.app/api/trpc/greeting`
    [Try it!](https://trpc-server-demo.vercel.app/api/trpc/greeting)

-   **With string input (`"Alice"`):**
    `https://trpc-server-demo.vercel.app/api/trpc/greeting?input=%22Alice%22`
    [Try it!](https://trpc-server-demo.vercel.app/api/trpc/greeting?input=%22Alice%22)

### 2. `reverse` procedure

-   **With string input (`"hello"`):**
    `https://trpc-server-demo.vercel.app/api/trpc/reverse?input=%22hello%22`
    [Try it!](https://trpc-server-demo.vercel.app/api/trpc/reverse?input=%22hello%22)

### 3. `math` (Nested Router)

#### 3.1. `math.square` procedure

-   **With number input (`5`):**
    `https://trpc-server-demo.vercel.app/api/trpc/math.square?input=5`
    [Try it!](https://trpc-server-demo.vercel.app/api/trpc/math.square?input=5)

#### 3.2. `math.sqrt` procedure

-   **With number input (`81`):**
    `https://trpc-server-demo.vercel.app/api/trpc/math.sqrt?input=81`
    [Try it!](https://trpc-server-demo.vercel.app/api/trpc/math.sqrt?input=81)

#### 3.3. `math.add` procedure

-   **With object input (`{"a":10,"b":20}`):**
    `https://trpc-server-demo.vercel.app/api/trpc/math.add?input=%7B%22a%22%3A10%2C%22b%22%3A20%7D`
    [Try it!](https://trpc-server-demo.vercel.app/api/trpc/math.add?input=%7B%22a%22%3A10%2C%22b%22%3A20%7D)

**Note on URL Encoding:** When passing complex types (like strings with spaces or JSON objects) as input, they must be URL-encoded. You can use online tools or `encodeURIComponent(JSON.stringify(yourInput))` in JavaScript to achieve this.

## 💻 Server Code

Here's the core server-side code that defines the tRPC procedures:

```typescript
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

export const appRouter = router({
    greeting: publicProcedure.input(z.string().nullish()).query(({ input }) => {
        return {
            text: `hello ${input ?? 'world'}`,
        };
    }),

    reverse: publicProcedure.input(z.string()).query(({ input }) => {
        return {
            input,
            result: `${input.split('').reverse().join('')}`,
        };
    }),

    math: router({
        square: publicProcedure.input(z.number()).query(({ input }) => {
            return {
                result: `Square of ${input} is ${input * input}`,
            };
        }),

        sqrt: publicProcedure.input(z.number()).query(({ input }) => {
            return {
                result: `Square root of ${input} is ${Math.sqrt(input)}`,
            };
        }),

        add: publicProcedure
            .input(
                z.object({
                    a: z.number(),
                    b: z.number(),
                })
            )
            .query(({ input }) => {
                return {
                    result: `${input.a} + ${input.b} = ${input.a + input.b}`,
                };
            }),
    }),
});

export type AppRouter = typeof appRouter;
```

## 🛠️ How to Run Locally

_(Add instructions here on how to clone the repo, install dependencies, and run the server locally. Example below, adapt to your specific project setup)_

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dhruvdhaduk-simform/trpc
    cd trpc
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
