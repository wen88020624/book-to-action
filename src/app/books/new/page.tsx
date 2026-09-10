"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import BackLink from "@/components/BackLink"
import styles from "./page.module.scss"

export default function NewBookPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const { title } = Object.fromEntries(new FormData(e.currentTarget)) as { title: string }
    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
    const book = await res.json()
    router.push(`/books/${book.id}`)
  }

  return (
    <div className={styles.page}>
      <BackLink href="/" label="首頁" />
      <h1 className={styles.title}>新增 Book</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>📚 Book Title</label>
        <input name="title" className={styles.input} placeholder="書名" required autoFocus />
        <button type="submit" disabled={loading} className={styles.submit}>
          {loading ? "儲存中..." : "下一步 →"}
        </button>
      </form>
    </div>
  )
}
