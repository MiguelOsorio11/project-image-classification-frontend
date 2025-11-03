import { NextResponse } from "next/server"

export async function GET() {
  // Mock history endpoint
  // In production, this would fetch from your database
  return NextResponse.json({
    history: [],
    total: 0,
  })
}
