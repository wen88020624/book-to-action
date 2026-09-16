# Frontend Conventions — Book to Action

> 本專案專用。與 Joy UI / Redux / Biome 無關；那些是其他專案的慣例，**不要**套用到這裡。

## Tech Stack

- React 19 + Next.js 16（App Router）+ TypeScript
- pnpm
- SCSS Modules（`page.module.scss` / `*.module.scss`）
- Prisma 7 + Turso/libSQL
- TipTap（富文字欄位）
- ESLint（`eslint-config-next`）

參考：`package.json`、`docs/ARCHITECTURE.md`

---

## Page Structure

新頁面在 `src/app/**`：

| File | Responsibility |
|---|---|
| `page.tsx` | Route 入口、資料讀取、組裝畫面 |
| `page.module.scss` | 頁面樣式 |

- UI 文案以**繁體中文**為主（`layout` 為 `zh-TW`）
- 共用元件放 `src/components/`
- 工具放 `src/lib/`
- 不要為新頁面引入 Redux / Saga / axios 管線

---

## Data Access

- Server / Route Handler 透過 `src/lib/db.ts` 的 `prisma`
- 瀏覽器端呼叫既有 `/api/*`（`fetch`）
- 新增 endpoint 前對照 `docs/ARCHITECTURE.md` 與現有 `src/app/api/**`

---

## Styling

- 新樣式 → 同目錄 `*.module.scss`
- 全域 → `src/app/globals.scss`（謹慎）
- 保持簡單、可讀；不要為了「設計系統完整」引入未使用的 UI kit

---

## Forms & Rich Text

- 簡單表單可用受控 input / form action，與現有頁面一致
- Concept / Problem 等長文 → 重用 `RichTextEditor`
- 驗證與錯誤訊息就近處理，避免過早抽象

---

## Output Rules

- 變更保持 scope：只改任務需要的檔案
- 註解只寫非明顯邏輯
- 產品／架構決策寫進 `docs/`，不要只留在 PR 描述
- Next.js API 以 `node_modules/next/dist/docs/` 為準

---

## Do / Don't

**Do:**

- 對齊 Experiments-first 與 SPEC 文案語氣
- 更新文件（PRODUCT / ARCHITECTURE / EVOLUTION / SPEC）當行為或方向改變
- 沿用既有 SCSS module 與 TipTap 模式

**Don't:**

- 做成書庫／ISBN／streak／成敗打卡
- 引入 Redux、Joy UI、Biome「因為慣例檔曾這樣寫」
- 另起一套與 Experiment 脫節的追蹤模型（模板功能應接上既有循環）

---

## Evolving This Document

新的可重用前端慣例出現時，更新本檔對應章節，並在 `docs/EVOLUTION.md` 記一筆（若影響架構或產品）。
