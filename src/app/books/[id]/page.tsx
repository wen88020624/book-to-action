"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import BackLink from "@/components/BackLink"
import RichTextEditor from "@/components/RichTextEditor"
import styles from "./page.module.scss"

interface Concept { id: string; body: string; createdAt: string }
interface Book {
  id: string; title: string; createdAt: string
  bookConcepts: { concept: Concept }[]
}

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [book, setBook] = useState<Book | null>(null)
  const [conceptBody, setConceptBody] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`/api/books/${id}`).then(r => r.json()).then(setBook)
  }, [id])

  async function addConcept(e: React.FormEvent) {
    e.preventDefault()
    if (!conceptBody.trim()) return
    setLoading(true)
    const res = await fetch("/api/concepts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: conceptBody, bookId: id }),
    })
    const concept = await res.json()
    router.push(`/concepts/${concept.id}`)
  }

  if (!book) return <div className={styles.loading}>載入中...</div>

  return (
    <div className={styles.page}>
      <BackLink href="/" label="首頁" />
      <h1 className={styles.title}>📚 {book.title}</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>💡 Concepts</h2>
        {book.bookConcepts.length === 0 ? (
          <p className={styles.empty}>還沒有 Concept。</p>
        ) : (
          <div className={styles.list}>
            {book.bookConcepts.map(({ concept }) => (
              <Link
                key={concept.id}
                href={`/concepts/${concept.id}`}
                className={styles.conceptCard}
                dangerouslySetInnerHTML={{ __html: concept.body }}
              />
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>你從這本書吸收了什麼？</h2>
        <form onSubmit={addConcept} className={styles.form}>
          <RichTextEditor
            value=""
            onChange={setConceptBody}
            placeholder="用自己的話寫下你吸收到的概念，不需要寫成完整筆記。"
          />
          <button type="submit" disabled={loading || !conceptBody.trim()} className={styles.submit}>
            {loading ? "建立中..." : "建立 Concept"}
          </button>
        </form>
      </section>
    </div>
  )
}
