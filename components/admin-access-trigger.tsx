"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function AdminAccessTrigger() {
  const [clickCount, setClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Check if click is in bottom right corner (within 100px from bottom and right)
      const isBottomRight = window.innerWidth - e.clientX < 100 && window.innerHeight - e.clientY < 100

      if (isBottomRight) {
        const now = Date.now()

        // Reset count if more than 1 second has passed since last click
        if (now - lastClickTime > 1000) {
          setClickCount(1)
        } else {
          setClickCount((prev) => prev + 1)
        }

        setLastClickTime(now)
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [lastClickTime])

  useEffect(() => {
    if (clickCount >= 3) {
      router.push("/admin/login")
      setClickCount(0)
    }
  }, [clickCount, router])

  return null
}
