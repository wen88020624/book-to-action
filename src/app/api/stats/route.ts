import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const [books, concepts, experiments] = await Promise.all([
      prisma.book.count(),
      prisma.concept.count(),
      prisma.experiment.count(),
    ])
    return NextResponse.json({ books, concepts, experiments })
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
