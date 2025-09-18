import React from "react"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ProgressRing from "@/components/molecules/ProgressRing"
import ApperIcon from "@/components/ApperIcon"

const Header = ({ 
  totalTasks, 
  completedTasks, 
  onQuickAdd,
  userName = "You" 
}) => {
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const getMotivationalMessage = () => {
    if (completionPercentage === 100 && totalTasks > 0) {
      return "🎉 All tasks complete! You're amazing!"
    }
    if (completionPercentage >= 75) {
      return "🔥 You're on fire! Keep it up!"
    }
    if (completionPercentage >= 50) {
      return "💪 Great progress! You're halfway there!"
    }
    if (completionPercentage >= 25) {
      return "🚀 Good start! Keep the momentum going!"
    }
    if (totalTasks > 0) {
      return "✨ Every journey starts with a single step!"
    }
    return "🌟 Ready to tackle some tasks?"
  }

  return (
    <div className="bg-white border-b border-slate-100 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <h1 className="text-3xl font-bold gradient-text mb-1">
              TaskFlow
            </h1>
            <p className="text-slate-600">
              {getGreeting()}, {userName}! {getMotivationalMessage()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-6"
          >
            {totalTasks > 0 && (
              <div className="flex items-center gap-4">
                <ProgressRing 
                  progress={completionPercentage} 
                  size={60} 
                  strokeWidth={4}
                />
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">
                    {completedTasks}/{totalTasks}
                  </div>
                  <div className="text-sm text-slate-600">
                    Tasks Complete
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={onQuickAdd}
              icon="Plus"
              size="lg"
              className="shadow-lg hover:shadow-xl"
            >
              Add Task
            </Button>
          </motion.div>
        </div>

        {totalTasks > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></div>
              <span className="text-slate-600">Total:</span>
              <span className="font-semibold text-slate-900">{totalTasks}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-gradient-to-r from-success-500 to-success-600 rounded-full"></div>
              <span className="text-slate-600">Completed:</span>
              <span className="font-semibold text-success-700">{completedTasks}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-gradient-to-r from-warning-500 to-warning-600 rounded-full"></div>
              <span className="text-slate-600">Pending:</span>
              <span className="font-semibold text-warning-700">{totalTasks - completedTasks}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <ApperIcon name="TrendingUp" className="h-3 w-3 text-success-500" />
              <span className="text-slate-600">Progress:</span>
              <span className="font-semibold text-slate-900">{completionPercentage}%</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Header