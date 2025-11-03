"use client"

import { X } from "lucide-react"
import { useState } from "react"

interface ImageModalProps {
  image: string
  className: string
  onOpen?: () => void
}

export function ImageModal({ image, className }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <img
        src={image || "/placeholder.svg"}
        alt="Clasificación"
        className={`${className} cursor-pointer hover:opacity-90 transition-opacity`}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 flex justify-between items-center p-4 border-b border-border bg-card">
              <h3 className="font-semibold text-foreground">Vista Completa</h3>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-background rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <img
                src={image || "/placeholder.svg"}
                alt="Clasificación expandida"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
