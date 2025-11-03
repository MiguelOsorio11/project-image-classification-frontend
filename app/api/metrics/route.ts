import { NextResponse } from "next/server"

export async function GET() {
  // Mock metrics endpoint
  return NextResponse.json({
    totalPredictions: 0,
    avgResponseTime: 0,
    mostCommon: null,
  })
}
