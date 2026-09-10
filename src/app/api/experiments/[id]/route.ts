import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const experiment = await prisma.experiment.findUnique({
      where: { id },
      include: {
        conceptExperiments: {
          include: {
            concept: {
              include: { bookConcepts: { include: { book: true } } },
            },
          },
        },
        logs: { orderBy: { loggedAt: "asc" } },
        result: true,
      },
    })
    if (!experiment) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(experiment)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const experiment = await prisma.experiment.update({ where: { id }, data: body })
    return NextResponse.json(experiment)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
