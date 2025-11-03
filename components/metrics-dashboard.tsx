"use client"

import { BarChart3, Zap, Target } from "lucide-react"

interface Prediction {
  id: string
  image: string
  classification: string
  confidence: number
  alternatives: Array<{ label: string; score: number }>
  timestamp: Date
}

interface MetricsDashboardProps {
  predictions: Prediction[]
}

export function MetricsDashboard({ predictions }: MetricsDashboardProps) {
  // Calculate metrics
  const totalPredictions = predictions.length
  const avgConfidence =
    predictions.length > 0
      ? ((predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length) * 100).toFixed(1)
      : 0

  const classificationCounts: Record<string, number> = {}
  predictions.forEach((p) => {
    classificationCounts[p.classification] = (classificationCounts[p.classification] || 0) + 1
  })
  const mostCommon =
    Object.entries(classificationCounts).length > 0
      ? Object.entries(classificationCounts).sort(([, a], [, b]) => b - a)[0][0]
      : "N/A"

  // Calculate average response time (mock)
  const avgResponseTime = predictions.length > 0 ? "245ms" : "N/A"

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground px-2">Métricas del Sistema</h3>

      {/* Metric Cards */}
      <div className="space-y-2">
        {/* Total Predictions */}
        <div className="bg-card border border-border rounded-lg p-3 hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground">Predicciones Totales</p>
            <BarChart3 className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{totalPredictions}</p>
        </div>

        {/* Average Confidence */}
        <div className="bg-card border border-border rounded-lg p-3 hover:border-accent/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground">Confianza Promedio</p>
            <Zap className="w-4 h-4 text-accent" />
          </div>
          <p className="text-2xl font-bold text-foreground">{avgConfidence}%</p>
        </div>

        {/* Most Common Classification */}
        <div className="bg-card border border-border rounded-lg p-3 hover:border-secondary/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground">Clase Más Común</p>
            <Target className="w-4 h-4 text-secondary" />
          </div>
          <p className="text-lg font-bold text-foreground truncate">{mostCommon}</p>
        </div>

        {/* Response Time */}
        <div className="bg-card border border-border rounded-lg p-3 hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground">Tiempo Promedio</p>
            <span className="w-4 h-4 rounded-full bg-primary/50" />
          </div>
          <p className="text-2xl font-bold text-foreground">{avgResponseTime}</p>
        </div>
      </div>
    </div>
  )
}
