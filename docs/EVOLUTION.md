# Product & Architecture Evolution

紀錄**已拍板的方向與架構變化**，方便 AI / 人類快速理解「為什麼現在長這樣」，避免重複討論已關閉的選項。

格式：新條目寫在最上方。每筆包含背景、決策、影響、後續。

---

## 2026-09-16 — 文件化 North Star：方法論互動 × 雙軌內容

### 背景

產品初步概念不只是「記書名 → 寫吸收 → 做實驗」，而是：

- 導入書（或書中方法論說明）後，做成**簡單可互動的 Web 體驗**
- 立刻在生活中實踐並追蹤，快速知道適不適合自己
- 也可**由平台上架模板**，使用者不必自己導入文字

既有 `CLAUDE.md` / `SPEC.md` 完整描述了 MVP 實驗追蹤，但 North Star 與實際技術現況（Turso、SCSS、TipTap 等）散落／過期，不利 AI 迭代。

### 決策

1. 新增 `docs/`：`PRODUCT.md`（North Star）、`ARCHITECTURE.md`（現況架構）、`EVOLUTION.md`（本檔）、`README.md`（索引）
2. 明確雙軌內容策略：**使用者導入** vs **平台模板**，兩者都匯入 Experiment 循環
3. 現行 MVP 仍以 SPEC 為交付邊界；方法論互動 Web / 模板庫列為後續演進，不塞進未宣告的 scope
4. 修正 AI 入口文件，使其與 repo 實況一致

### 影響

- AI 迭代應先讀 `docs/PRODUCT.md` 判斷功能是否對齊 North Star
- 實作落點以 `docs/ARCHITECTURE.md` + Prisma schema 為準
- `CLAUDE-frontend-conventions.md` 改為本專案慣例（不再沿用他案的 Joy UI / Redux 範本）

### 後續（尚未做）

- Methodology / Template 領域模型設計
- 平台模板上架流程
- 書摘／方法論文字 → 互動步驟的導入體驗
- （可選）AI 輔助擷取 — 需單獨 Phase 與邊界討論

---

## 2026-09 — MVP 落地：Next.js App + Prisma + Turso

### 背景

Phase 1 UX／旅程已定；需要可運行的全端 MVP。

### 決策（從 git 歷史可見）

- Next.js 16 App Router + TypeScript
- Prisma 7 + libSQL adapter（Turso），datasource 為 SQLite
- 實作 Books / Concepts / Experiments / Logs / Results API 與頁面
- Concept、Problem 使用 TipTap 富文字
- 首頁與 books 使用 dynamic rendering，避免靜態快取過期資料

### 影響

- SPEC 中部分 Phase 狀態需視為「已實作」（見 SPEC Build Plan 更新）
- 文件若仍寫「PostgreSQL only / ORM TBD」即為過期

---

## 2026-09（早期）— 產品定位：Life Experiment Tracker

### 背景

避免做成閱讀管理工具。

### 決策

- 價值單位 = Experiment，不是 Book
- 核心鏈：Book → Concept（我吸收的）→ Experiment → Log → Result + Rating
- MVP 排除：ISBN／封面、streak、社交、AI 摘要、通知
- 設計原則：Experiments first、零摩擦 Log、誠實結果、不問成敗

### 影響

- `SPEC.md` / 初版 `CLAUDE.md` 成為 MVP 合約
- 後續 North Star（方法論模板）必須**延伸**此循環，而非取代成書庫或課程平台

---

## 如何新增一筆

複製以下模板到本檔頂部（「如何新增」一節之上）：

```markdown
## YYYY-MM-DD — 簡短標題

### 背景
為何要改？

### 決策
拍了什麼板？

### 影響
哪些檔案 / schema / 流程要跟著變？

### 後續
還沒做但已約定的下一步（可空）
```
