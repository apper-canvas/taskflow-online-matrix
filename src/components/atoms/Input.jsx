import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Input = forwardRef(({ 
  className, 
  type = "text", 
  error,
  icon,
  label,
  required,
  ...props 
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
            <ApperIcon name={icon} className="h-4 w-4" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 placeholder:text-slate-400",
            "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none",
            "transition-colors duration-200",
            icon && "pl-10",
            error && "border-error-500 focus:border-error-500 focus:ring-error-500/20",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-error-500 flex items-center gap-1">
          <ApperIcon name="AlertCircle" className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = "Input"

export default Input