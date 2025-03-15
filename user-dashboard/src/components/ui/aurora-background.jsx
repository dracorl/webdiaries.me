"use client"
import {cn} from "@/lib/utils"
import React from "react"

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-zinc-100 dark:bg-[#0a0a0a] text-slate-950 transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,#d1d5db_0%,#d1d5db_7%,transparent_10%,transparent_12%,#d1d5db_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,#171717_0%,#171717_7%,transparent_10%,transparent_12%,#171717_16%)]
            [--aurora:repeating-linear-gradient(100deg,#d1d5db_10%,#9ca3af_15%,#6b7280_20%,#4b5563_25%,#374151_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px]
            after:content-[''] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed]
            pointer-events-none
            absolute -inset-[10px] opacity-40 will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,#000_10%,transparent_70%)]`
          )}
        ></div>
      </div>
      {children}
    </div>
  )
}
