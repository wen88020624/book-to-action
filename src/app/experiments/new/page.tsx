"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import BackLink from "@/components/BackLink"
import RichTextEditor from "@/components/RichTextEditor"
import styles from "./page.module.scss"

function NewExperimentForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const conceptId = searchParams.get("conceptId")
  const [conceptBody, setConceptBody] = useState("")
  const [problemBody, setProblemBody] = useState("")
  const [loading, setLoading] = useState(false)

  const today = new Date().toISOString().split("T")[0]

  useEffect(() => {
    if (conceptId) {
      fetch(`/api/concepts/${conceptId}`).then(r => r.json()).then(c => setConceptBody(c.body))
    }
  }, [conceptId])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.currentTarget)
    const data = {
      title: form.get("title") as string,
      description: form.get("description") as string,
      problem: problemBody || null,
      startDate: form.get("startDate") as string,
      endDate: form.get("endDate") as string,
      conceptId,
    }
    const res = await fetch("/api/experiments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const exp = await res.json()
    router.push(`/experiments/${exp.id}`)
  }

  return (
    <div className={styles.page}>
      <BackLink href={conceptId ? `/concepts/${conceptId}` : "/"} label="返回" />
      <h1 className={styles.title}>建立 Experiment</h1>

      {conceptBody && (
        <div className={styles.conceptPreview}>
          <p className={styles.conceptLabel}>💡 Concept</p>
          <div className={styles.conceptBody} dangerouslySetInnerHTML={{ __html: conceptBody }} />
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>🧪 我想驗證什麼？</label>
          <input name="title" className={styles.input} placeholder="用一句話描述你的實驗" required />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <textarea name="description" className={styles.textarea} rows={3} placeholder="詳細說明這個實驗的做法" required />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>你想解決什麼問題？<span className={styles.optional}>（選填）</span></label>
          <RichTextEditor value="" onChange={setProblemBody} placeholder="描述你目前面對的問題或挑戰" />
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Start Date</label>
            <input name="startDate" type="date" className={styles.input} defaultValue={today} required />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>End Date</label>
            <input name="endDate" type="date" className={styles.input} required />
          </div>
        </div>
        <button type="submit" disabled={loading} className={styles.submit}>
          {loading ? "建立中..." : "開始 Experiment"}
        </button>
      </form>
    </div>
  )
}

export default function NewExperimentPage() {
  return (
    <Suspense>
      <NewExperimentForm />
    </Suspense>
  )
}
