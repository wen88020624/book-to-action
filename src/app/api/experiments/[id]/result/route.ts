import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: experimentId } = await params
    const { quantitative, qualitative, reflection } = await req.json()
    const [result] = await prisma.$transaction([
      prisma.experimentResult.create({
        data: {
          id: crypto.randomUUID(),
          experimentId,
          quantitative: quantitative || null,
          qualitative: qualitative || null,
          reflection: reflection || null,
        },
      }),
      prisma.experiment.update({ where: { id: experimentId }, data: { status: "completed" } }),
    ])
    return NextResponse.json(result, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: experimentId } = await params
    const { rating } = await req.json()
    const result = await prisma.experimentResult.update({
      where: { experimentId },
      data: { rating },
    })
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
