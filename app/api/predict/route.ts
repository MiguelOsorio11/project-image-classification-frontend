import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Mock prediction response
    // In production, this would call your actual ML model API
    const mockPredictions = [
      {
        classification: "Perro",
        confidence: 0.95,
        alternatives: [
          { label: "Gato", score: 0.03 },
          { label: "Lobo", score: 0.02 },
        ],
      },
      {
        classification: "Gato",
        confidence: 0.92,
        alternatives: [
          { label: "Perro", score: 0.05 },
          { label: "Tigre", score: 0.03 },
        ],
      },
      {
        classification: "Automóvil",
        confidence: 0.89,
        alternatives: [
          { label: "Bicicleta", score: 0.07 },
          { label: "Motocicleta", score: 0.04 },
        ],
      },
    ]

    const randomPrediction = mockPredictions[Math.floor(Math.random() * mockPredictions.length)]

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json(randomPrediction)
  } catch (error) {
    console.error("Prediction error:", error)
    return NextResponse.json({ error: "Prediction failed" }, { status: 500 })
  }
}
