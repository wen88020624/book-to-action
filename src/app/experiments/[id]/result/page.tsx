"use client"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import BackLink from "@/components/BackLink"
import styles from "./page.module.scss"

export default function ExperimentResultPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.currentTarget)
    await fetch(`/api/experiments/${id}/result`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quantitative: form.get("quantitative"),
        qualitative: form.get("qualitative"),
        reflection: form.get("reflection"),
      }),
    })
    router.push(`/experiments/${id}`)
  }

  return (
    <div className={styles.page}>
      <BackLink href={`/experiments/${id}`} label="返回實驗" />
      <h1 className={styles.title}>🧪 結束 Experiment</h1>
      <p className={styles.subtitle}>這次實驗發生了什麼？</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>📊 Quantitative Result<span className={styles.opt}>（選填）</span></label>
          <textarea name="quantitative" className={styles.textarea} rows={3}
            placeholder="數字或可量化的結果，例如：4 週投遞了 7 個職缺" />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>📝 Qualitative Result<span className={styles.opt}>（選填）</span></label>
          <textarea name="qualitative" className={styles.textarea} rows={3}
            placeholder="你觀察到了什麼？有什麼感受或發現？" />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>🧠 Reflection<span className={styles.opt}>（選填）</span></label>
          <textarea name="reflection" className={styles.textarea} rows={3}
            placeholder="這次實驗讓你學到了什麼？" />
        </div>
        <button type="submit" disabled={loading} className={styles.submit}>
          {loading ? "儲存中..." : "完成 Experiment"}
        </button>
      </form>
    </div>
  )
}
