"use client"

import { TrendingUp } from "lucide-react"
import { ImageModal } from "./image-modal"

interface Alternative {
  label: string
  score: number
}

interface Prediction {
  id: string
  image: string
  classification: string
  confidence: number
  alternatives: Alternative[]
  timestamp: Date
}

interface PredictionResultProps {
  prediction: Prediction
}

export function PredictionResult({ prediction }: PredictionResultProps) {
  const confidencePercentage = (prediction.confidence * 100).toFixed(1)

  return (
    <div className="space-y-4">
      {/* Main Result Card */}
      <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-lg p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Clasificación Principal</p>
            <h2 className="text-4xl font-bold text-foreground">{prediction.classification}</h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Confianza</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {confidencePercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="space-y-2">
          <div className="w-full bg-background rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
              style={{ width: `${prediction.confidence * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-right">{confidencePercentage}% de certeza</p>
        </div>

        {/* Timestamp */}
        <p className="text-xs text-muted-foreground mt-4">{prediction.timestamp.toLocaleString("es-ES")}</p>
      </div>

      {/* Image Thumbnail - Clickable for Modal */}
      {prediction.image && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <ImageModal image={prediction.image} className="w-full h-auto object-cover rounded-lg" />
        </div>
      )}

      {/* Alternative Predictions */}
      {prediction.alternatives && prediction.alternatives.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">Predicciones Alternativas</h3>
          </div>
          <div className="space-y-3">
            {prediction.alternatives.map((alt, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{alt.label}</span>
                  <span className="text-primary font-medium">{(alt.score * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-1.5 overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: `${alt.score * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
