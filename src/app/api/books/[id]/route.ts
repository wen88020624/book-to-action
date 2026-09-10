import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        bookConcepts: {
          include: { concept: true },
          orderBy: { concept: { createdAt: "desc" } },
        },
      },
    })
    if (!book) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(book)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
