import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  loading = false,
  icon,
  iconPosition = "left",
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-700",
    success: "bg-gradient-to-r from-success-500 to-success-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]",
    danger: "bg-gradient-to-r from-error-500 to-error-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]"
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={loading}
      {...props}
    >
      {loading && <ApperIcon name="Loader2" className="h-4 w-4 animate-spin" />}
      {!loading && icon && iconPosition === "left" && (
        <ApperIcon name={icon} className="h-4 w-4" />
      )}
      {children}
      {!loading && icon && iconPosition === "right" && (
        <ApperIcon name={icon} className="h-4 w-4" />
      )}
    </button>
  )
})

Button.displayName = "Button"

export default Button