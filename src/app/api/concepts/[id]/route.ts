import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { body } = await req.json()
    const concept = await prisma.concept.update({ where: { id }, data: { body } })
    return NextResponse.json(concept)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const concept = await prisma.concept.findUnique({
      where: { id },
      include: {
        bookConcepts: { include: { book: true } },
        conceptExperiments: {
          include: { experiment: true },
          orderBy: { experiment: { createdAt: "desc" } },
        },
      },
    })
    if (!concept) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(concept)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
