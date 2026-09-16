# Docs Index — Book to Action

AI 與人類協作時，**先讀這裡**，再依任務深入對應文件。

| 文件 | 用途 | 何時必讀 |
|---|---|---|
| [PRODUCT.md](./PRODUCT.md) | 產品願景、問題、North Star、內容策略 | 任何功能規劃 / 取捨爭議 |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 技術棧、目錄、資料模型、API | 寫程式、改 schema、加 route |
| [EVOLUTION.md](./EVOLUTION.md) | 產品與架構演進紀錄 | 改方向、加 Phase、做 breaking change |
| [../SPEC.md](../SPEC.md) | **現行 MVP** 的頁面與 UX 合約 | 改 UI / 使用者流程 |
| [../CLAUDE.md](../CLAUDE.md) | AI 快速入口（摘要 + 連結） | 每次迭代開頭 |
| [../CLAUDE-frontend-conventions.md](../CLAUDE-frontend-conventions.md) | 本專案前端慣例 | 改頁面 / 元件 / 樣式 |

## 閱讀順序（建議）

1. `CLAUDE.md` — 30 秒對齊「我們在做什麼」
2. `docs/PRODUCT.md` — 確認功能是否服務 North Star
3. `SPEC.md` — 若動的是 MVP 範圍，對齊現有 UX
4. `docs/ARCHITECTURE.md` — 實作落點
5. 實作後在 `docs/EVOLUTION.md` 補一筆決策紀錄

## 文件維護規則

- **產品方向變了** → 更新 `PRODUCT.md`，並在 `EVOLUTION.md` 記一筆
- **架構 / 技術棧變了** → 更新 `ARCHITECTURE.md` + `EVOLUTION.md`
- **MVP 頁面行為變了** → 更新 `SPEC.md`
- **不要**把過期假設留在 `CLAUDE.md`；摘要必須與 `docs/` 一致
