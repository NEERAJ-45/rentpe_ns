import { useState } from "react"

export function useToast() {
  const [toast, setToast] = useState<{
    title: string
    description?: string
    variant?: "default" | "destructive"
  } | null>(null)

  const showToast = (title: string, options?: { description?: string; variant?: "default" | "destructive" }) => {
    setToast({ title, ...options })
    setTimeout(() => setToast(null), 5000)
  }

  return { toast, showToast }
}

// Then you'll need to implement a Toast component to display these messages