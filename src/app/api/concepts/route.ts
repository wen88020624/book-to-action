import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { body, bookId } = await req.json()
    const concept = await prisma.concept.create({
      data: {
        id: crypto.randomUUID(),
        body,
        bookConcepts: bookId ? { create: { bookId } } : undefined,
      },
    })
    return NextResponse.json(concept, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
