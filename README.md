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

> drizzle sqlite uses better-sqlite3 binaries for drizzle-kit:push support

### Installing Dependencies

```sh
bun i
```

### Setting DB Stuff

For building better-sqlite3 binaries

```sh
bun add --global node-gyp
bun run --cwd node_modules/better-sqlite3 build-debug
```

For Generating a todos.db file if not present

```sh
bun db:push
```

### Starting Dev Server ( Bun )

```sh
bun dev
```
