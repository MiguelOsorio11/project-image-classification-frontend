"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock } from "lucide-react"

interface Prediction {
  id: string
  image: string
  classification: string
  confidence: number
  alternatives: Array<{ label: string; score: number }>
  timestamp: Date
}

interface HistoryPanelProps {
  predictions: Prediction[]
  onSelectPrediction: (prediction: Prediction) => void
}

export function HistoryPanel({ predictions, onSelectPrediction }: HistoryPanelProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center gap-2">
        <Clock className="w-4 h-4 text-primary" />
        <h3 className="font-semibold text-foreground">Historial Reciente</h3>
      </div>

      {/* Scroll Area */}
      <ScrollArea className="flex-1">
        {predictions.length > 0 ? (
          <div className="space-y-1 p-2">
            {predictions.map((prediction) => (
              <button
                key={prediction.id}
                onClick={() => onSelectPrediction(prediction)}
                className="w-full text-left group"
              >
                <div className="flex gap-2 p-2 rounded-md hover:bg-primary/10 transition-colors">
                  {/* Thumbnail */}
                  <div className="relative w-12 h-12 rounded border border-border overflow-hidden flex-shrink-0">
                    <img
                      src={prediction.image || "/placeholder.svg"}
                      alt={prediction.classification}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{prediction.classification}</p>
                    <p className="text-xs text-muted-foreground">
                      {(prediction.confidence * 100).toFixed(0)}% confianza
                    </p>
                    <p className="text-xs text-muted-foreground/60">
                      {prediction.timestamp.toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            No hay historial aún
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
