![Logo](https://raw.github.com/tanishqmanuja/todos-react-elysia/main/assets/banner.png?maxAge=2592000)

# Todos App (React + ElysiaJS)

A simple starter fullstack todos app built with React and ElysiaJS using bunJS.

## Client

Uses the following tech stack.

- Web Framework: React
- State Management: Zustand
- Styling: TailwindCSS
- Icons: Lucide Icons
- Tooling: Vite, Bun

### Installing Dependencies

```sh
bun i
```

### Starting Dev Server ( Vite )

```sh
bun dev
```

## Server

Uses the following tech stack.

- Runtime: Bun
- Server Framework: Elysia
- DB: Bun SQlite
- ORM: Drizzle

### Installing Dependencies

```sh
bun i
```

### Setting up Local DB File

For Generating a todos.db file if not present

```sh
bun db:generate
bun db:migrate
```

### Starting Dev Server ( Bun )

```sh
bun dev
```

### Extra DB Stuff for Drizzle Kit Push

- For building better-sqlite3 binaries
  ```sh
  bun add --global node-gyp
  bun run --cwd node_modules/better-sqlite3 build-debug
  ```
> [!Note]  
> drizzle sqlite uses better-sqlite3 binaries for drizzle-kit:push support

- Using the push command
  ```sh
  bun db:push
  ```
> [!WARNING]  
> May not work yet! (https://github.com/drizzle-team/drizzle-orm/issues/1293)
