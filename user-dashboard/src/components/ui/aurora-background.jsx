"use client"
import {cn} from "@/lib/utils"
import React, {memo} from "react"

const AuroraBackground = memo(({className, children, ...props}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-zinc-100 dark:bg-[#0a0a0a]",
        className
      )}
      {...props}
    >
      {/* Version 3 – More dynamic, flowing aurora effect */}
      <div className="absolute inset-0 blur-3xl opacity-60">
        <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,#fbcfe8_0%,#a78bfa_25%,#e5e7eb_50%,#f9a8d4_75%,#fbcfe8_100%)] bg-[length:300%_300%] animate-[moveDynamicAurora_15s_ease-in-out_infinite]" />
      </div>

      {children}
    </div>
  )
})

AuroraBackground.displayName = "AuroraBackground"
export {AuroraBackground}
