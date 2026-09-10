import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const books = await prisma.book.findMany({ orderBy: { createdAt: "desc" } })
    return NextResponse.json(books)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json()
    const book = await prisma.book.create({ data: { id: crypto.randomUUID(), title } })
    return NextResponse.json(book, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
