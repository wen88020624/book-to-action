import Link from "next/link"
import { prisma } from "@/lib/db"
import { formatDate, daysSince } from "@/lib/format"
import styles from "./page.module.scss"

export const dynamic = "force-dynamic"

export default async function Home() {
  const [experiments, stats] = await Promise.all([
    prisma.experiment.findMany({
      where: { status: "active" },
      include: {
        conceptExperiments: {
          include: { concept: true },
          take: 1,
        },
        logs: { orderBy: { loggedAt: "desc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
    }),
    Promise.all([
      prisma.book.count(),
      prisma.concept.count(),
      prisma.experiment.count(),
    ]),
  ])

  const [bookCount, conceptCount, experimentCount] = stats

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Life Experiment</h1>
        <Link href="/books/new" className={styles.newBtn}>+ New</Link>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🧪 正在進行的 Experiment</h2>
        {experiments.length === 0 ? (
          <p className={styles.empty}>還沒有進行中的實驗。<Link href="/books/new">新增一本書</Link>開始吧！</p>
        ) : (
          <div className={styles.cards}>
            {experiments.map((exp) => {
              const concept = exp.conceptExperiments[0]?.concept
              const lastLog = exp.logs[0]
              return (
                <Link key={exp.id} href={`/experiments/${exp.id}`} className={styles.card}>
                  <h3 className={styles.cardTitle}>{exp.title}</h3>
                  {concept && <p className={styles.cardConcept}>{concept.body}</p>}
                  <p className={styles.cardDates}>
                    {formatDate(exp.startDate)} → {formatDate(exp.endDate)}
                  </p>
                  <p className={styles.cardLog}>
                    最近 Log：{lastLog ? daysSince(lastLog.loggedAt) : "尚無 Log"}
                  </p>
                  <span className={styles.cardLink}>查看 Experiment →</span>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>📚 我的閱讀轉化</h2>
        <div className={styles.funnel}>
          <div className={styles.funnelRow}>
            <span className={styles.funnelNum}>{bookCount}</span>
            <span className={styles.funnelLabel}>Books</span>
          </div>
          <div className={styles.funnelArrow}>↓</div>
          <div className={styles.funnelRow}>
            <span className={styles.funnelNum}>{conceptCount}</span>
            <span className={styles.funnelLabel}>Concepts</span>
          </div>
          <div className={styles.funnelArrow}>↓</div>
          <div className={styles.funnelRow}>
            <span className={`${styles.funnelNum} ${styles.accent}`}>{experimentCount}</span>
            <span className={styles.funnelLabel}>⭐ Experiments</span>
          </div>
        </div>
        <Link href="/books" className={styles.viewAll}>查看所有 Books →</Link>
      </section>
    </div>
  )
}
