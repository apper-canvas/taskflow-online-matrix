import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ 
  className,
  checked,
  onChange,
  label,
  size = "md",
  ...props 
}, ref) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            "flex items-center justify-center rounded border-2 cursor-pointer transition-all duration-200",
            sizes[size],
            checked
              ? "bg-gradient-to-r from-success-500 to-success-600 border-success-500 text-white scale-110"
              : "border-slate-300 bg-white hover:border-slate-400",
            className
          )}
          onClick={() => onChange?.({ target: { checked: !checked } })}
        >
          {checked && (
            <ApperIcon 
              name="Check" 
              className={cn(
                "text-white",
                size === "sm" && "h-3 w-3",
                size === "md" && "h-3 w-3",
                size === "lg" && "h-4 w-4"
              )}
            />
          )}
        </div>
      </div>
      {label && (
        <label 
          className="text-sm font-medium text-slate-700 cursor-pointer select-none"
          onClick={() => onChange?.({ target: { checked: !checked } })}
        >
          {label}
        </label>
      )}
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox