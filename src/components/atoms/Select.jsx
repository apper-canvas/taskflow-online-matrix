import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Select = forwardRef(({ 
  className, 
  error,
  label,
  required,
  children,
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
        <select
          className={cn(
            "w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 bg-white",
            "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none",
            "transition-colors duration-200 appearance-none pr-10",
            error && "border-error-500 focus:border-error-500 focus:ring-error-500/20",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
          <ApperIcon name="ChevronDown" className="h-4 w-4" />
        </div>
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

Select.displayName = "Select"

export default Select