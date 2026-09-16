# Book to Action — CLAUDE.md

> AI 每次迭代的**第一個入口**。細節以 `docs/` 與 `SPEC.md` 為準。

## 文件地圖（必讀順序）

| 優先 | 檔案 | 內容 |
|---|---|---|
| 1 | 本檔 | 30 秒對齊 |
| 2 | [docs/PRODUCT.md](./docs/PRODUCT.md) | North Star、問題、雙軌內容策略 |
| 3 | [SPEC.md](./SPEC.md) | 現行 MVP 頁面與 UX 合約 |
| 4 | [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | 技術棧、目錄、API、資料模型現況 |
| 5 | [docs/EVOLUTION.md](./docs/EVOLUTION.md) | 產品／架構演進；改方向時必更新 |
| — | [docs/README.md](./docs/README.md) | docs 索引與維護規則 |
| — | [CLAUDE-frontend-conventions.md](./CLAUDE-frontend-conventions.md) | 本專案前端慣例 |

---

## What This Product Is

把書裡的方法論變成**可立刻實踐、可追蹤、可判斷適不適合自己**的生活實驗。

核心痛點：讀很多書，生活卻毫無實際改善。

**現行 MVP 循環：**

```
Book → Concept（我吸收了什麼）→ Experiment → Log → Result + Rating
```

**North Star（見 PRODUCT.md）：**

```
書 / 平台模板 → 可互動方法論 → 立刻實踐 → 追蹤 → 快速知道適不適合我
```

內容可**使用者導入**，也可**平台上架模板**讓人直接套用——兩軌都匯入同一套 Experiment 循環。  
**下一階段優先：路徑甲（平台模板）** — 使用者選現成模板 → 立刻開始實驗；使用者導入延後。

**This is NOT a reading management tool.** 價值單位是 Experiment（以及未來的 Methodology Template），不是 Book。

---

## Tech Stack（現況）

- **Framework**: Next.js 16（App Router）+ TypeScript + React 19
- **Styling**: SCSS Modules
- **Database**: Turso / libSQL（SQLite）via Prisma 7 adapter
- **ORM**: Prisma 7（client → `src/generated/prisma`）
- **Auth**: 無 — 單人 MVP
- **Backend**: Next.js Route Handlers（`src/app/api/**`）
- **Rich text**: TipTap（Concept / Problem）

詳見 [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)。寫 Next 相關程式前讀 `node_modules/next/dist/docs/`。

---

## Core User Journey（MVP）

```
Home
 ↓
New Book        ← title only
 ↓
Create Concept  ← "what I absorbed", not "what the book said"
 ↓
Create Experiment (title + description + start/end date + optional problem)
 ↓
Add Logs        ← freeform, zero friction
 ↓
End Experiment  ← quantitative + qualitative + reflection
 ↓
Result          ← helpful / partial / not helpful / don't know yet
 ↓
Home            ← Books → Concepts → Experiments 轉化統計
```

---

## Routes

| Route | Page |
|---|---|
| `/` | Home — active experiments + conversion stats |
| `/books` | All books |
| `/books/new` | Add book (title only) |
| `/books/[id]` | Book detail + linked concepts |
| `/concepts/[id]` | Concept detail + linked experiments |
| `/experiments/new` | Create experiment |
| `/experiments/[id]` | Experiment detail + logs |
| `/experiments/[id]/result` | End experiment + result form |

---

## Data Model（摘要）

```
Book ←── book_concepts ──→ Concept
                              ↕
                     concept_experiments
                              ↕
                         Experiment
                              ↓
                       ExperimentLog
                              ↓
                      ExperimentResult
```

`status`: `active` | `completed` | `stopped`  
`rating`: `helpful` | `partial` | `not_helpful` | `unknown`  

真相來源：`prisma/schema.prisma`。

---

## MVP Scope

**Included:** Book title、Concept、Experiment、Log、Result + rating、Home 漏斗統計  

**Excluded:** ISBN／封面 API、streak、社交、AI 摘要、通知、3-month review UI、方法論模板庫（North Star 後續）

---

## Design Principles

1. **Experiments first** — 首頁先實驗，不是書架
2. **Zero-friction logging** — 一個 textarea 就夠
3. **"What I absorbed"** — 第一人稱吸收，不是書摘復述
4. **Honest outcomes** —「還不知道」可永久保留
5. **No judgment** — 不問「成功了嗎？」

---

## Build Phases

| Phase | Focus | Status |
|---|---|---|
| 1 | UX + user journey | ✅ |
| 2 | IA + routes | ✅ |
| 3 | DB schema | ✅（Turso/SQLite） |
| 4 | Backend API | ✅（MVP routes） |
| 5 | Next.js frontend | ✅（MVP pages） |
| — | Methodology templates / 互動導入 | ⬜ 見 PRODUCT + EVOLUTION |

---

## 改程式時的文件義務

- 改產品方向 → `docs/PRODUCT.md` + `docs/EVOLUTION.md`
- 改技術／目錄／API／schema → `docs/ARCHITECTURE.md` + 必要時 `EVOLUTION.md`
- 改 MVP 頁面行為 → `SPEC.md`
- 保持本檔摘要與上述檔案一致
