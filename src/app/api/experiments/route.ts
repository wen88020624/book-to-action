import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status") ?? "active"
    const experiments = await prisma.experiment.findMany({
      where: status === "all" ? undefined : { status },
      include: {
        conceptExperiments: {
          include: {
            concept: {
              include: { bookConcepts: { include: { book: true } } },
            },
          },
        },
        logs: { orderBy: { loggedAt: "desc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(experiments)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, problem, startDate, endDate, conceptId } = await req.json()
    const experiment = await prisma.experiment.create({
      data: {
        id: crypto.randomUUID(),
        title,
        description,
        problem: problem || null,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: "active",
        conceptExperiments: conceptId ? { create: { conceptId } } : undefined,
      },
    })
    return NextResponse.json(experiment, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
