import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL

if (!BACKEND_URL) {
  throw new Error("BACKEND_URL environment variable is not set")
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    const backendFormData = new FormData()
    backendFormData.append("image", image)

    const response = await fetch(`${BACKEND_URL}/api/predict`, {
      method: "POST",
      body: backendFormData,
    })

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`)
    }

    const prediction = await response.json()
    return NextResponse.json(prediction)
  } catch (error) {
    console.error("Prediction error:", error)
    return NextResponse.json(
      { error: "Prediction failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
