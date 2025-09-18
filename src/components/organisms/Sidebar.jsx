import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Sidebar = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect,
  taskCounts = {},
  className 
}) => {
  const totalTasks = Object.values(taskCounts).reduce((sum, count) => sum + count.total, 0)
  const completedTasks = Object.values(taskCounts).reduce((sum, count) => sum + count.completed, 0)

  const categoryColors = {
    work: "bg-primary-500",
    personal: "bg-success-500",
    health: "bg-warning-500",
    finance: "bg-error-500",
    learning: "bg-purple-500",
    shopping: "bg-cyan-500",
    travel: "bg-orange-500",
    home: "bg-lime-500"
  }

  const menuItems = [
    {
      id: "all",
      label: "All Tasks",
      icon: "List",
      count: totalTasks,
      completed: completedTasks
    },
    {
      id: "today",
      label: "Due Today",
      icon: "Calendar",
      count: taskCounts.today?.total || 0,
      completed: taskCounts.today?.completed || 0
    },
    {
      id: "upcoming",
      label: "Upcoming",
      icon: "Clock",
      count: taskCounts.upcoming?.total || 0,
      completed: taskCounts.upcoming?.completed || 0
    },
    {
      id: "completed",
      label: "Completed",
      icon: "CheckCircle",
      count: taskCounts.completed?.total || 0,
      completed: taskCounts.completed?.completed || 0
    }
  ]

  return (
    <div className={cn("w-80 bg-white border-r border-slate-200 h-full", className)}>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">
          Task Overview
        </h2>

        {/* Quick Navigation */}
        <div className="space-y-2 mb-8">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onCategorySelect(item.id)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 hover:bg-slate-50",
                selectedCategory === item.id && "bg-primary-50 text-primary-700 border-l-4 border-primary-500"
              )}
            >
              <div className="flex items-center gap-3">
                <ApperIcon 
                  name={item.icon} 
                  className={cn(
                    "h-5 w-5",
                    selectedCategory === item.id ? "text-primary-600" : "text-slate-500"
                  )}
                />
                <span className="font-medium">{item.label}</span>
              </div>
              
              {item.count > 0 && (
                <div className="flex items-center gap-2">
                  {item.completed > 0 && item.id !== "completed" && (
                    <span className="text-xs text-success-600 bg-success-50 px-2 py-0.5 rounded-full">
                      {item.completed}
                    </span>
                  )}
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    selectedCategory === item.id 
                      ? "bg-primary-100 text-primary-700"
                      : "bg-slate-100 text-slate-600"
                  )}>
                    {item.count}
                  </span>
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">
            Categories
          </h3>
          
          <div className="space-y-2">
            {categories.map((category, index) => {
              const categoryKey = category.name.toLowerCase()
              const categoryCount = taskCounts[categoryKey] || { total: 0, completed: 0 }
              
              return (
                <motion.button
                  key={category.Id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index + menuItems.length) * 0.1 }}
                  onClick={() => onCategorySelect(categoryKey)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 hover:bg-slate-50",
                    selectedCategory === categoryKey && "bg-primary-50 text-primary-700 border-l-4 border-primary-500"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={cn(
                        "w-3 h-3 rounded-full",
                        categoryColors[categoryKey] || "bg-slate-400"
                      )}
                    />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  
                  {categoryCount.total > 0 && (
                    <div className="flex items-center gap-2">
                      {categoryCount.completed > 0 && (
                        <span className="text-xs text-success-600 bg-success-50 px-2 py-0.5 rounded-full">
                          {categoryCount.completed}
                        </span>
                      )}
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        selectedCategory === categoryKey 
                          ? "bg-primary-100 text-primary-700"
                          : "bg-slate-100 text-slate-600"
                      )}>
                        {categoryCount.total}
                      </span>
                    </div>
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Progress Summary */}
        {totalTasks > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 p-4 bg-gradient-to-r from-success-50 to-primary-50 rounded-xl border border-success-100"
          >
            <h4 className="text-sm font-semibold text-slate-700 mb-2">
              Daily Progress
            </h4>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-success-500 to-success-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                    transition={{ delay: 1, duration: 1 }}
                  />
                </div>
              </div>
              <span className="text-sm font-medium text-slate-700">
                {Math.round((completedTasks / totalTasks) * 100)}%
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Sidebar