# Book to Action — CLAUDE.md

## What This Product Is

A **life experiment tracker** that bridges reading and real-world action.

Core loop: Read a book → extract a Concept → run an Experiment → log what happens → reflect on what you learned.

**This is NOT a reading management tool.** The unit of value is the Experiment, not the Book.

---

## Tech Stack

- **Framework**: Next.js (App Router) + TypeScript
- **Styling**: TBD (Tailwind recommended)
- **Database**: PostgreSQL
- **ORM**: TBD (Prisma recommended)
- **Auth**: None for MVP — single user, no login required
- **Backend**: Next.js API Routes (no separate server)

---

## Core User Journey

```
Home
 ↓
New Book        ← just a title, nothing else
 ↓
Create Concept  ← "what I absorbed", not "what the book said"
 ↓
Create Experiment (title + description + start/end date + optional problem)
 ↓
Add Logs        ← freeform text, zero friction
 ↓
End Experiment  ← quantitative result + qualitative result + reflection
 ↓
Result page     ← rate helpfulness (helpful / partial / not helpful / don't know yet)
 ↓
Home            ← see "my reading → X experiments" conversion stats
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

## Data Model

Relationships are **many-to-many** at every layer:

```
Book ←──── book_concepts ────→ Concept
                                  ↕
                           concept_experiments
                                  ↕
                             Experiment
                                  ↓
                           ExperimentLog (freeform)
                                  ↓
                          ExperimentResult (quantitative + qualitative + reflection + rating)
```

### Tables

```sql
users
books          (id, user_id, title, created_at)
concepts       (id, user_id, body, created_at)
experiments    (id, user_id, title, description, problem?, start_date, end_date, status, created_at)
experiment_logs     (id, experiment_id, body, logged_at)
experiment_results  (id, experiment_id, quantitative, qualitative, reflection, rating, completed_at)

book_concepts       (book_id, concept_id)
concept_experiments (concept_id, experiment_id)
```

`status` on experiments: `active` | `completed` | `stopped`

`rating` on results: `helpful` | `partial` | `not_helpful` | `unknown`

---

## MVP Scope — Included

- Book (title only)
- Concept (freeform text, linked to book)
- Experiment (title + description + optional problem + dates)
- Log (freeform text, timestamped)
- End experiment flow (quantitative + qualitative + reflection + rating)
- Home: active experiments list + Books→Concepts→Experiments funnel stats

## MVP Scope — Explicitly Excluded

- ❌ ISBN / Google Books API / cover / author / publisher
- ❌ Reading dates, page count, star ratings on books
- ❌ Streaks, daily check-ins, completion tracking
- ❌ "Did you succeed today?"
- ❌ Recommended books / social feed
- ❌ AI summaries
- ❌ Notifications / reminders (Phase 2)
- ❌ 3-month review flow (data structure ready, UI is Phase 2)

---

## Design Principles

1. **Experiments first** — home page leads with active experiments, not books
2. **Zero-friction logging** — the log form is one freeform textarea, nothing else
3. **"What I absorbed"** — concept wording is always first-person absorption, not book summary
4. **Honest outcomes** — "I don't know yet" is a valid and permanent result rating
5. **No judgment** — never ask "did you succeed?" or show failure metrics

---

## Build Phases

| Phase | Focus |
|---|---|
| 1 | UX + user journey ✅ |
| 2 | Information architecture + routes |
| 3 | Database schema (PostgreSQL) |
| 4 | Backend API |
| 5 | Next.js frontend |
