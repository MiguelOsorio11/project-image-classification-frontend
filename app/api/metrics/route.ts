import { NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL

if (!BACKEND_URL) {
  throw new Error("BACKEND_URL environment variable is not set")
}

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/metrics`, {
      method: "GET",
    })

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Metrics error:", error)
    return NextResponse.json(
      {
        totalPredictions: 0,
        avgResponseTime: 0,
        mostCommon: null,
        error: error instanceof Error ? error.message : "Failed to fetch metrics",
      },
      { status: 500 },
    )
  }
}
