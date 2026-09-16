# Book to Action — Product Spec (MVP)

> 本檔是**現行 MVP** 的頁面與 UX 合約。  
> 長期願景（方法論互動 Web、平台模板上架等）見 [docs/PRODUCT.md](./docs/PRODUCT.md)。  
> 技術現況見 [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)。  
> 決策演進見 [docs/EVOLUTION.md](./docs/EVOLUTION.md)。

## Product Vision

> 我讀完一本書 → 找到一個真正吸收的 Concept → 把它變成一個 Experiment → 實際記錄 → 最後知道它對我有沒有用。

The strongest value proposition: **「我讀的書，到底有多少真正進入我的人生？」**

North Star 延伸：書中方法論（或平台模板）→ 可互動實踐 → 追蹤 → 快速判斷適不適合自己。MVP 先把 Experiment 循環做穩，再長出導入／模板能力。

---

## Pages

### 1. Home `/`

**First thing the user sees: what am I experimenting with right now?**

Not books. Experiments.

#### Layout

```
Life Experiment                          + New

🧪 進行中的 Experiment
┌──────────────────────────────────────┐
│ 不再用「今天什麼都沒做」評價自己        │
│                                      │
│ Concept: 大腦容易形成固定的負面思考模式  │
│ 2026/09/01 → 2026/10/01              │
│ 最近 Log：2 天前                      │
│                         [查看 Experiment →] │
└──────────────────────────────────────┘

📚 我的閱讀轉化
     10 Books
        ↓
     17 Concepts
        ↓
     ⭐ 8 Experiments

     過去 6 個月
     [查看所有 Books]
```

#### Sections
1. Active experiments list (each card: title, concept, date range, last log)
2. Quick `+ New` CTA
3. Conversion funnel: Books → Concepts → Experiments count

#### Excluded from home
- Today's tasks
- Streak counter
- Daily check-in
- Recommended books
- Social feed

---

### 2. New Book `/books/new`

Single field. That's it.

```
← 新增 Book

📚 Book Title
[ 大人學 獨自升級          ]

                    [下一步 →]
```

**Excluded:**
- ISBN search
- Google Books API
- Author, publisher, cover, rating, reading dates, page count

After saving → redirect to Create Concept for this book.

---

### 3. Create Concept `/concepts/new?bookId=...`

Wording matters: **"你從這本書吸收了什麼？"** — not "this book says".

```
← 大人學 獨自升級

💡 你從這本書吸收了什麼？

[ 困住我的可能不是現實，
  而是我對現實的想像。      ]

你可以輸入自己的理解，不需要寫成完整筆記。

                    [建立 Concept]
```

First-person absorption, not a book summary.

---

### 4. Concept Detail `/concepts/[id]`

```
💡 Concept

困住我的可能不是現實，
而是我對現實的想像。

來源
📚 大人學 獨自升級

🧪 由此產生的 Experiments
┌───────────────────────────┐
│ 我嘗試投遞一份原本不敢投的工作 │  進行中
└───────────────────────────┘
┌───────────────────────────┐
│ 每週做一次職涯假設驗證        │  已完成
└───────────────────────────┘

                  [+ 建立 Experiment]
```

One concept → many experiments.

---

### 5. Create Experiment `/experiments/new?conceptId=...`

The core creation form.

```
← 建立 Experiment

💡 Concept
困住我的可能不是現實，而是我對現實的想像。

──────────────────────────────────────

🧪 Experiment

我想驗證什麼？
[                                      ]

Description
[                                      ]

你想解決什麼問題？（選填）
[                                      ]

Start Date   [ 2026/09/10 ]
End Date     [ 2026/10/10 ]

                    [開始 Experiment]
```

**Fields:**
| Field | Required | Notes |
|---|---|---|
| Title ("我想驗證什麼") | ✅ | |
| Description | ✅ | |
| Problem | ❌ | Optional, shown as soft prompt |
| Start Date | ✅ | Default today |
| End Date | ✅ | |

---

### 6. Experiment Detail `/experiments/[id]`

The page users return to most often.

```
← Experiment

🧪 我嘗試投遞一份原本不敢投的工作

🟢 進行中
2026/09/10 → 2026/10/10

💡 Concept
困住我的可能不是現實，而是我的想像。

❓ Problem
我常常高估失敗的可能性。

──────────────────────────────────────

📝 Experiment Log

09/12
「今天看到一個職缺，本來想直接關掉，
但最後還是投了。」

09/17
「發現其實收到拒絕也沒有想像中可怕。」

                         [+ 新增 Log]

──────────────────────────────────────

[編輯]                   [結束 Experiment]
```

---

### 7. Add Log `/experiments/[id]/log/new`

**Maximum friction removal.** No success/failure question. No rating. No count.

```
📝 新增 Experiment Log

2026/09/17

[                           ]
[                           ]
[                           ]

                    [儲存 Log]
```

Freeform text. Date defaults to today. Nothing else.

---

### 8. End Experiment Form `/experiments/[id]/result`

Do NOT ask "did you succeed?" Instead:

```
🧪 結束 Experiment

這次實驗發生了什麼？

📊 Quantitative Result
[                           ]

📝 Qualitative Result
[                           ]
[                           ]

🧠 Reflection
[                           ]
[                           ]

                    [完成 Experiment]
```

All three fields should be optional but prompted. No pass/fail framing.

---

### 9. Result Page (after completing)

```
🧪 Experiment Completed

「我嘗試投遞一份原本不敢投的工作」

────────────────────
📚 大人學 獨自升級
💡 困住我的可能不是現實，而是我對現實的想像。
❓ 我高估了失敗的可能性。
────────────────────

📊 Result
原本：每週幾乎不敢投遞
實驗後：4 週投遞 7 個職缺

📝 我的觀察
真正讓我害怕的不是被拒絕，
而是我一直想像「被拒絕會很糟」。

🧠 我學到了
我不需要先確定自己會成功，才能開始行動。

────────────────────

⭐ 這個 Concept 對我有幫助嗎？

[ 有幫助 ] [ 部分有幫助 ] [ 沒有幫助 ] [ 還不知道 ]
```

**Rating options (stored on `experiment_results.rating`):**
- `helpful`
- `partial`
- `not_helpful`
- `unknown` — "還不知道" is a valid permanent answer

---

### 10. Future: 3-Month Review (Phase 2, data ready now)

Data structure supports it from day one. UI deferred.

```
🧪 87 天前完成的 Experiment

你當時寫：
> 我發現自己把「今天效率不好」
> 直接等同於「我是一個沒有自制力的人」。

[ 查看完整 Experiment ]
[ 新增一則 Reflection ]
[ 我想重新開始這個 Experiment ]
```

---

## Data Model

### Core tables

```sql
users (id, email, name, created_at)

books (
  id, user_id,
  title,
  created_at
)

concepts (
  id, user_id,
  body,          -- "what I absorbed"
  created_at
)

experiments (
  id, user_id,
  title,         -- "我想驗證什麼"
  description,
  problem,       -- nullable
  start_date, end_date,
  status,        -- active | completed | stopped
  created_at
)

experiment_logs (
  id, experiment_id,
  body,
  logged_at      -- defaults to now(), user can change
)

experiment_results (
  id, experiment_id,
  quantitative,  -- nullable
  qualitative,   -- nullable
  reflection,    -- nullable
  rating,        -- helpful | partial | not_helpful | unknown
  completed_at
)
```

### Join tables (many-to-many)

```sql
book_concepts       (book_id, concept_id)
concept_experiments (concept_id, experiment_id)
```

This supports:
- One experiment linked to multiple concepts / books
- One concept producing multiple experiments
- Cross-book concept synthesis (Phase 2)

---

## MVP Boundaries

### In scope
- Full CRUD: Books, Concepts, Experiments, Logs, Results
- Home page with active experiments + conversion funnel
- End experiment flow with reflection
- Helpfulness rating

### Out of scope for MVP
- Auth — single user, no login for MVP
- ISBN / book metadata APIs
- Notifications / reminders
- 3-month review UI
- Social features
- AI features
- Streak tracking
- Methodology interactive templates / 平台模板庫（North Star — 見 PRODUCT.md）
- 大量貼上書中全文的導入管線（後續；注意版權與產品邊界）

---

## Build Plan

| Phase | Deliverable | Status |
|---|---|---|
| 1 | UX + User Journey | ✅ Done |
| 2 | Routes + Component hierarchy | ✅ Done |
| 3 | DB schema（Prisma + Turso/SQLite；非當初草案的裸 Postgres） | ✅ Done |
| 4 | Backend API（Next.js Route Handlers） | ✅ Done |
| 5 | Next.js frontend（MVP pages） | ✅ Done |
| Next | Methodology / 平台模板 / 互動導入 | ⬜ 見 docs/PRODUCT.md + EVOLUTION.md |
