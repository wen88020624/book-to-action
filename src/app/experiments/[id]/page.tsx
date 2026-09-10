"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import BackLink from "@/components/BackLink"
import { formatDate, daysSince } from "@/lib/format"
import styles from "./page.module.scss"

interface Log { id: string; body: string; loggedAt: string }
interface Concept { id: string; body: string }
interface Book { id: string; title: string }
interface Experiment {
  id: string; title: string; description: string; problem: string | null
  startDate: string; endDate: string; status: string; createdAt: string
  conceptExperiments: { concept: Concept & { bookConcepts: { book: Book }[] } }[]
  logs: Log[]
  result: {
    quantitative: string | null; qualitative: string | null
    reflection: string | null; rating: string | null
  } | null
}

const statusConfig: Record<string, { label: string; cls: string }> = {
  active: { label: "🟢 進行中", cls: "statusActive" },
  completed: { label: "🔵 已完成", cls: "statusCompleted" },
  stopped: { label: "🔴 已停止", cls: "statusStopped" },
}

const ratingOptions = [
  { value: "helpful", label: "有幫助" },
  { value: "partial", label: "部分有幫助" },
  { value: "not_helpful", label: "沒有幫助" },
  { value: "unknown", label: "還不知道" },
]

export default function ExperimentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [exp, setExp] = useState<Experiment | null>(null)
  const [logBody, setLogBody] = useState("")
  const [submittingLog, setSubmittingLog] = useState(false)

  async function load() {
    const data = await fetch(`/api/experiments/${id}`).then(r => r.json())
    setExp(data)
  }

  useEffect(() => { load() }, [id])

  async function submitLog(e: React.FormEvent) {
    e.preventDefault()
    setSubmittingLog(true)
    await fetch(`/api/experiments/${id}/logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: logBody }),
    })
    setLogBody("")
    setSubmittingLog(false)
    await load()
  }

  async function setRating(rating: string) {
    await fetch(`/api/experiments/${id}/result`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    })
    await load()
  }

  if (!exp) return <div className={styles.loading}>載入中...</div>

  const concept = exp.conceptExperiments[0]?.concept
  const book = concept?.bookConcepts[0]?.book
  const status = statusConfig[exp.status] ?? statusConfig.active

  // suppress unused warning — daysSince is available for future use
  void daysSince

  return (
    <div className={styles.page}>
      <BackLink href={concept ? `/concepts/${concept.id}` : "/"} label="返回" />

      <div className={styles.header}>
        <h1 className={styles.title}>🧪 {exp.title}</h1>
        <span className={`${styles.statusBadge} ${styles[status.cls]}`}>{status.label}</span>
      </div>

      <p className={styles.dates}>{formatDate(exp.startDate)} → {formatDate(exp.endDate)}</p>

      {concept && (
        <div className={styles.metaCard}>
          <p className={styles.metaLabel}>💡 Concept</p>
          <p className={styles.metaBody}>{concept.body}</p>
        </div>
      )}

      {exp.problem && (
        <div className={styles.metaCard}>
          <p className={styles.metaLabel}>❓ Problem</p>
          <p className={styles.metaBody}>{exp.problem}</p>
        </div>
      )}

      <div className={styles.divider} />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>📝 Experiment Log</h2>
        {exp.logs.length === 0 ? (
          <p className={styles.empty}>還沒有 Log。</p>
        ) : (
          <div className={styles.logs}>
            {exp.logs.map((log) => (
              <div key={log.id} className={styles.logEntry}>
                <p className={styles.logDate}>{formatDate(log.loggedAt)}</p>
                <p className={styles.logBody}>{log.body}</p>
              </div>
            ))}
          </div>
        )}

        {exp.status === "active" && (
          <form onSubmit={submitLog} className={styles.logForm}>
            <textarea
              className={styles.logTextarea}
              placeholder="記錄今天發生了什麼..."
              value={logBody}
              onChange={e => setLogBody(e.target.value)}
              rows={3}
              required
            />
            <button type="submit" disabled={submittingLog} className={styles.logSubmit}>
              {submittingLog ? "儲存中..." : "+ 新增 Log"}
            </button>
          </form>
        )}
      </section>

      {exp.result && (
        <>
          <div className={styles.divider} />
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>🏁 結果</h2>
            {exp.result.quantitative && (
              <div className={styles.resultBlock}>
                <p className={styles.resultLabel}>📊 Quantitative Result</p>
                <p className={styles.resultBody}>{exp.result.quantitative}</p>
              </div>
            )}
            {exp.result.qualitative && (
              <div className={styles.resultBlock}>
                <p className={styles.resultLabel}>📝 Qualitative Result</p>
                <p className={styles.resultBody}>{exp.result.qualitative}</p>
              </div>
            )}
            {exp.result.reflection && (
              <div className={styles.resultBlock}>
                <p className={styles.resultLabel}>🧠 Reflection</p>
                <p className={styles.resultBody}>{exp.result.reflection}</p>
              </div>
            )}
            <div className={styles.ratingSection}>
              <p className={styles.ratingLabel}>⭐ 這個實驗對我有幫助嗎？</p>
              <div className={styles.ratingButtons}>
                {ratingOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setRating(opt.value)}
                    className={`${styles.ratingBtn} ${exp.result?.rating === opt.value ? styles.ratingSelected : ""}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {exp.status === "active" && (
        <div className={styles.actions}>
          <Link href={`/experiments/${id}/result`} className={styles.endBtn}>
            結束 Experiment
          </Link>
        </div>
      )}

      {book && <span style={{ display: "none" }}>{book.title}</span>}
    </div>
  )
}
