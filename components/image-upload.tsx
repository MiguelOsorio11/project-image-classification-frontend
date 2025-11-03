"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  onUpload: (file: File) => void
  loading?: boolean
}

export function ImageUpload({ onUpload, loading = false }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0])
    }
  }

  const processFile = (file: File) => {
    // Validate file type
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("Por favor selecciona una imagen válida (JPG, PNG o WebP)")
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload file
    onUpload(file)
  }

  return (
    <div className="space-y-4">
      {/* Drag and Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-200 ${
          isDragging ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50 hover:bg-card/80"
        } ${loading ? "opacity-50 pointer-events-none" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleFileSelect}
          className="hidden"
          disabled={loading}
        />

        <div className="flex flex-col items-center justify-center gap-3">
          {!preview ? (
            <>
              <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-semibold">
                  {isDragging ? "Suelta la imagen aquí" : "Arrastra una imagen aquí"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">o haz clic para seleccionar</p>
              </div>
            </>
          ) : (
            <>
              <ImageIcon className="w-12 h-12 text-primary" />
              <p className="text-sm text-muted-foreground">{loading ? "Procesando..." : "Imagen cargada"}</p>
            </>
          )}
        </div>
      </div>

      {/* Preview */}
      {preview && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
          <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
          {loading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-white text-sm font-medium">Analizando imagen...</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
