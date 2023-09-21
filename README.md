# React + Elysia Todo App

Demo for a fullstack todos app with react + elysia using bun instead of node.

# Client

Runtime: Bun
Web Framework: React
Tooling: Bun

## Installing Dependencies

```sh
bun i
```

# Server

Runtime: Bun
Server Framework: Elysia
DB: Bun SQlite (with better-sqlite3 binaries for drizzle push support)

## Installing Dependencies

```sh
bun i
```

### Setting DB Stuff

For building better-sqlite3 binaries

```sh
bun add --global node-gyp
bun run --cwd node_modules/better-sqlite3 build-debug
```

For Generating a todos.db file

```sh
bun db:push
```
