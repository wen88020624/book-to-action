"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import BackLink from "@/components/BackLink"
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

  useEffect(() => {
    fetch(`/api/concepts/${id}`).then(r => r.json()).then(setConcept)
  }, [id])

  if (!concept) return <div className={styles.loading}>載入中...</div>

  const book = concept.bookConcepts[0]?.book

  return (
    <div className={styles.page}>
      <BackLink href={book ? `/books/${book.id}` : "/"} label={book ? book.title : "首頁"} />

      <div className={styles.conceptBox}>
        <p className={styles.conceptLabel}>💡 Concept</p>
        <div
          className={styles.conceptBody}
          dangerouslySetInnerHTML={{ __html: concept.body }}
        />
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
