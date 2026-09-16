# Book to Action

把書裡的方法論變成可實踐、可追蹤的生活實驗——快速知道這套方法適不適合你。

## 文件（從這裡開始）

| 檔案 | 說明 |
|---|---|
| [CLAUDE.md](./CLAUDE.md) | AI / 協作者快速入口 |
| [docs/README.md](./docs/README.md) | 產品・架構・演進索引 |
| [docs/PRODUCT.md](./docs/PRODUCT.md) | 產品願景與 North Star |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | 技術架構現況 |
| [docs/EVOLUTION.md](./docs/EVOLUTION.md) | 演進紀錄 |
| [SPEC.md](./SPEC.md) | MVP 頁面與 UX 規格 |

## Getting Started

```bash
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

需要環境變數：`TURSO_DATABASE_URL`、（若需要）`TURSO_AUTH_TOKEN`。

## Stack

Next.js 16 · React 19 · TypeScript · Prisma 7 · Turso/libSQL · SCSS Modules · TipTap

細節見 [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)。
