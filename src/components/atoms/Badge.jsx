import React from "react"
import { cn } from "@/utils/cn"

const Badge = ({ 
  className, 
  variant = "default", 
  size = "md",
  children,
  ...props 
}) => {
  const variants = {
    default: "bg-slate-100 text-slate-800",
    primary: "bg-primary-100 text-primary-800",
    success: "bg-success-100 text-success-800",
    warning: "bg-warning-100 text-warning-800",
    error: "bg-error-100 text-error-800",
    high: "bg-error-100 text-error-800",
    medium: "bg-warning-100 text-warning-800",
    low: "bg-success-100 text-success-800"
  }

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base"
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge