import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Textarea = forwardRef(({ 
  className, 
  error,
  label,
  required,
  rows = 3,
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
      <textarea
        rows={rows}
        className={cn(
          "w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 placeholder:text-slate-400",
          "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none",
          "transition-colors duration-200 resize-vertical",
          error && "border-error-500 focus:border-error-500 focus:ring-error-500/20",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="text-sm text-error-500 flex items-center gap-1">
          <ApperIcon name="AlertCircle" className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
})

Textarea.displayName = "Textarea"

export default Textarea