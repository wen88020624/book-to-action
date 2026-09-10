import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: experimentId } = await params
    const { body } = await req.json()
    const log = await prisma.experimentLog.create({
      data: { id: crypto.randomUUID(), experimentId, body },
    })
    return NextResponse.json(log, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
