"use client"

import { useState } from "react"
import { ImageUpload } from "@/components/image-upload"
import { PredictionResult } from "@/components/prediction-result"
import { HistoryPanel } from "@/components/history-panel"
import { MetricsDashboard } from "@/components/metrics-dashboard"

interface Prediction {
  id: string
  image: string
  classification: string
  confidence: number
  alternatives: Array<{ label: string; score: number }>
  timestamp: Date
}

export default function Home() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [currentPrediction, setCurrentPrediction] = useState<Prediction | null>(null)
  const [loading, setLoading] = useState(false)

  const handleImageUpload = async (file: File) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Prediction failed")

      const data = await response.json()
      console.log("[v0] API Response:", data)

      const prediction: Prediction = {
        id: Date.now().toString(),
        image: URL.createObjectURL(file),
        classification: data.predicted_class, // Changed from data.classification
        confidence: data.confidence,
        alternatives: Object.entries(data.topk || {}).map(([label, score]) => ({
          label,
          score: score as number,
        })),
        timestamp: new Date(),
      }

      console.log("[v0] Mapped Prediction:", prediction)
      setCurrentPrediction(prediction)
      setPredictions([prediction, ...predictions])
    } catch (error) {
      console.error("Error:", error)
      // Show error toast/message
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ImageClassify</h1>
                <p className="text-xs text-muted-foreground">Clasificador de Imágenes con IA</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload and Result */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <ImageUpload onUpload={handleImageUpload} loading={loading} />

            {/* Prediction Result */}
            {currentPrediction && <PredictionResult prediction={currentPrediction} />}

            {/* Empty State */}
            {!currentPrediction && !loading && (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <div className="text-muted-foreground text-sm">
                  Sube una imagen para ver los resultados de clasificación
                </div>
              </div>
            )}
          </div>

          {/* Right Column - History and Metrics */}
          <div className="space-y-6">
            {/* Metrics */}
            <MetricsDashboard predictions={predictions} />

            {/* History */}
            <HistoryPanel predictions={predictions} onSelectPrediction={setCurrentPrediction} />
          </div>
        </div>
      </main>
    </div>
  )
}
