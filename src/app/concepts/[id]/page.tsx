"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import BackLink from "@/components/BackLink"
import RichTextEditor from "@/components/RichTextEditor"
import styles from "./page.module.scss"

interface Book { id: string; title: string }
interface Experiment { id: string; title: string; status: string }
interface Concept {
  id: string; body: string; createdAt: string
  bookConcepts: { book: Book }[]
  conceptExperiments: { experiment: Experiment }[]
}

const statusLabel: Record<string, string> = {
  active: "進行中",
  completed: "已完成",
  stopped: "已停止",
}
const statusClass: Record<string, string> = {
  active: "statusActive",
  completed: "statusCompleted",
  stopped: "statusStopped",
}

export default function ConceptDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [concept, setConcept] = useState<Concept | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editBody, setEditBody] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch(`/api/concepts/${id}`).then(r => r.json()).then(setConcept)
  }, [id])

  function startEdit() {
    if (!concept) return
    setEditBody(concept.body)
    setIsEditing(true)
  }

  function cancelEdit() {
    setIsEditing(false)
    setEditBody("")
  }

  async function saveConcept() {
    if (!concept || !editBody.trim()) return
    setSaving(true)
    await fetch(`/api/concepts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: editBody }),
    })
    setConcept(prev => prev ? { ...prev, body: editBody } : prev)
    setIsEditing(false)
    setSaving(false)
  }

  if (!concept) return <div className={styles.loading}>載入中...</div>

  const book = concept.bookConcepts[0]?.book

  return (
    <div className={styles.page}>
      <BackLink href={book ? `/books/${book.id}` : "/"} label={book ? book.title : "首頁"} />

      <div className={styles.conceptBox}>
        <div className={styles.conceptHeader}>
          <p className={styles.conceptLabel}>💡 Concept</p>
          {!isEditing && (
            <button onClick={startEdit} className={styles.editHint}>編輯</button>
          )}
        </div>

        {isEditing ? (
          <>
            <RichTextEditor
              value={concept.body}
              onChange={setEditBody}
              placeholder="用自己的話寫下你吸收到的概念"
            />
            <div className={styles.editActions}>
              <button onClick={cancelEdit} className={styles.cancelBtn}>取消</button>
              <button
                onClick={saveConcept}
                disabled={saving || !editBody.trim()}
                className={styles.saveBtn}
              >
                {saving ? "儲存中..." : "儲存"}
              </button>
            </div>
          </>
        ) : (
          <div
            className={styles.conceptBody}
            onClick={startEdit}
            title="點擊編輯"
            dangerouslySetInnerHTML={{ __html: concept.body }}
          />
        )}
      </div>

      {book && (
        <p className={styles.source}>來源 📚 <Link href={`/books/${book.id}`}>{book.title}</Link></p>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🧪 由此產生的 Experiments</h2>
        {concept.conceptExperiments.length === 0 ? (
          <p className={styles.empty}>還沒有 Experiment。</p>
        ) : (
          <div className={styles.list}>
            {concept.conceptExperiments.map(({ experiment }) => (
              <Link key={experiment.id} href={`/experiments/${experiment.id}`} className={styles.expCard}>
                <span className={styles.expTitle}>{experiment.title}</span>
                <span className={`${styles.status} ${styles[statusClass[experiment.status]]}`}>
                  {statusLabel[experiment.status]}
                </span>
              </Link>
            ))}
          </div>
        )}
        <Link href={`/experiments/new?conceptId=${id}`} className={styles.newExp}>
          + 建立 Experiment
        </Link>
      </section>
    </div>
  )
}
