# Architecture — Book to Action

> 最後對齊：2026-09-16  
> 反映**目前 repo 實況**。規劃中的能力見 [PRODUCT.md](./PRODUCT.md)；頁面 UX 合約見 [SPEC.md](../SPEC.md)。

---

## Tech Stack（現況）

| 層 | 選擇 | 備註 |
|---|---|---|
| Framework | Next.js 16（App Router）+ React 19 + TypeScript | 見 `package.json`；寫碼前讀 `node_modules/next/dist/docs/` |
| 樣式 | SCSS Modules（`*.module.scss`）+ `globals.scss` | 非 Tailwind；非 Joy UI |
| ORM | Prisma 7（`prisma-client` generator） | Client 輸出至 `src/generated/prisma` |
| DB | SQLite via Turso / libSQL | `@prisma/adapter-libsql`；env：`TURSO_DATABASE_URL`、`TURSO_AUTH_TOKEN` |
| 富文字 | TipTap（Concept / Problem） | `src/components/RichTextEditor.tsx` |
| Auth | 無（單人 MVP） | schema 無 `users` |
| 套件管理 | pnpm | |
| Lint | ESLint（`eslint-config-next`） | 非 Biome |

> 早期文件曾寫「PostgreSQL recommended」——**現行實作為 Turso/SQLite**。若日後遷回 Postgres，更新本檔與 EVOLUTION。

---

## Repository Map

```
/
├── CLAUDE.md                      # AI 快速入口
├── CLAUDE-frontend-conventions.md # 本專案前端慣例
├── SPEC.md                        # MVP 頁面 / UX 合約
├── docs/                          # 產品・架構・演進（本目錄）
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── scripts/
│   └── apply-migration.ts         # db:migrate
├── prisma7.config.ts
├── src/
│   ├── app/                       # App Router：pages + API routes
│   ├── components/                # 共用 UI
│   ├── lib/                       # db、format 等
│   └── generated/prisma/          # Prisma Client（generate 產生）
└── public/
```

### `src/app` 慣例

- 頁面：`page.tsx` + 同目錄 `page.module.scss`
- API：`src/app/api/**/route.ts`
- 語系：`layout.tsx` 設 `lang="zh-TW"`；UI 文案以繁中為主

---

## 領域模型

價值鏈（與產品一致）：

```
Book ──< BookConcept >── Concept ──< ConceptExperiment >── Experiment
                                                              │
                                                    ExperimentLog (N)
                                                              │
                                                    ExperimentResult (0..1)
```

- 關聯在 Book↔Concept、Concept↔Experiment 皆為 **many-to-many**（利於跨書合成、一概念多實驗）。
- `Experiment.status`：`active` | `completed` | `stopped`
- `ExperimentResult.rating`：`helpful` | `partial` | `not_helpful` | `unknown`

完整欄位以 `prisma/schema.prisma` 為準。

### 未來擴充預留（尚未入 schema）

對齊 PRODUCT North Star，可能新增（**未實作，勿當現況**）：

- `Methodology` / `Template`：可互動方法論或平台模板
- `MethodologyStep`：步驟、引導問題、檢查項
- Book／Template → Methodology → Experiment 的來源連結
- 可選：使用者匯入的原文片段（注意版權與儲存策略）

新增前先更新 PRODUCT / EVOLUTION，再改 schema。

---

## HTTP API（現況）

| Method | Path | 用途 |
|---|---|---|
| GET/POST | `/api/books` | 列表 / 建立 |
| GET/PATCH/DELETE | `/api/books/[id]` | 單筆 |
| GET/POST | `/api/concepts` | 列表 / 建立（可帶 book 連結） |
| GET/PATCH/DELETE | `/api/concepts/[id]` | 單筆 |
| GET/POST | `/api/experiments` | 列表 / 建立（可帶 concept 連結） |
| GET/PATCH/DELETE | `/api/experiments/[id]` | 單筆 |
| GET/POST | `/api/experiments/[id]/logs` | 日誌 |
| POST | `/api/experiments/[id]/result` | 結束並寫入結果 |
| GET | `/api/stats` | Books→Concepts→Experiments 漏斗等 |

資料存取統一經 `src/lib/db.ts` 的 Prisma singleton。

---

## Routes（頁面）

| Route | 職責 |
|---|---|
| `/` | 進行中實驗 + 轉化統計 |
| `/books` | 書列表 |
| `/books/new` | 新增書（title） |
| `/books/[id]` | 書詳情 + concepts |
| `/concepts/[id]` | Concept + experiments |
| `/experiments/new` | 建立實驗 |
| `/experiments/[id]` | 實驗詳情 + logs |
| `/experiments/[id]/result` | 結束實驗 / 結果 |

詳細線框與文案契約見 SPEC.md。

---

## 執行與資料指令

```bash
pnpm install
pnpm db:generate    # prisma generate
pnpm db:migrate     # scripts/apply-migration.ts
pnpm dev
pnpm build
pnpm lint
```

環境變數（至少）：

- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`（若遠端需要）

---

## 架構原則（給實作者）

1. **Experiment 是核心實體** — API / UI 優先服務實驗循環，不要做成書庫 CRUD 優先
2. **Server 資料 + 簡單 client 互動** — 現行無 Redux；不要為了「架構完整」引入未使用的狀態庫
3. **Schema 真相在 Prisma** — 文件與 SPEC 落差時，以 `schema.prisma` + migration 為準，並回寫文件
4. **Next.js 以本機 docs 為準** — 本專案 Next 16 可能與訓練資料不同
5. **North Star 功能先設計領域，再堆 UI** — 模板／方法論互動應能接上既有 Experiment／Log／Result，避免第二套平行追蹤系統
