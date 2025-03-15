"use client"
import {cn} from "@/lib/utils"
import React, {memo} from "react"

const AuroraBackground = memo(
  ({className, children, showRadialGradient = true, ...props}) => {
    return (
      <div
        className={cn(
          "relative flex flex-col items-center justify-center bg-zinc-100 dark:bg-[#0a0a0a] text-slate-950 transform-gpu",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden transform-gpu">
          <div
            className={cn(
              `
            [--light-gradient:repeating-linear-gradient(100deg,#d1d5db_0%,transparent_12%)]
            [--dark-gradient:repeating-linear-gradient(100deg,#171717_0%,transparent_12%)]
            [--aurora:repeating-linear-gradient(100deg,#d1d5db_10%,#9ca3af_25%,#4b5563_40%)]
            [background-image:var(--light-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:200%,_150%]
            [background-position:50%_50%]
            after:content-[''] 
            after:absolute 
            after:inset-0 
            after:[background-image:inherit] 
            after:[background-size:inherit] 
            after:animate-aurora
            pointer-events-none
            absolute -inset-[5px] 
            opacity-40`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,#000_20%,transparent_80%)]`
            )}
            style={{
              willChange: "background-position",
              transform: "translateZ(0)"
            }}
          ></div>
        </div>
        {children}
      </div>
    )
  },
  (prevProps, nextProps) => {
    // Sadece gerekli prop'lar değiştiğinde yeniden render
    return (
      prevProps.className === nextProps.className &&
      prevProps.showRadialGradient === nextProps.showRadialGradient &&
      React.Children.count(prevProps.children) ===
        React.Children.count(nextProps.children)
    )
  }
)

AuroraBackground.displayName = "AuroraBackground"

export {AuroraBackground}
