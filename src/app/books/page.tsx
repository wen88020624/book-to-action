import Link from "next/link"
import { prisma } from "@/lib/db"
import { formatDate } from "@/lib/format"
import BackLink from "@/components/BackLink"
import styles from "./page.module.scss"

export const dynamic = "force-dynamic"

export default async function BooksPage() {
  const books = await prisma.book.findMany({
    include: { bookConcepts: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className={styles.page}>
      <BackLink href="/" label="首頁" />
      <div className={styles.header}>
        <h1 className={styles.title}>📚 所有 Books</h1>
        <Link href="/books/new" className={styles.newBtn}>+ 新增</Link>
      </div>
      {books.length === 0 ? (
        <p className={styles.empty}>還沒有任何書。</p>
      ) : (
        <div className={styles.list}>
          {books.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`} className={styles.item}>
              <span className={styles.itemTitle}>{book.title}</span>
              <span className={styles.itemMeta}>{book.bookConcepts.length} Concepts · {formatDate(book.createdAt)}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
