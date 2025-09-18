import React from "react"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No tasks yet", 
  message = "Get started by creating your first task.",
  icon = "CheckSquare",
  actionLabel = "Add Task",
  onAction,
  type = "tasks"
}) => {
  const getEmptyState = () => {
    switch (type) {
      case "search":
        return {
          icon: "Search",
          title: "No matching tasks",
          message: "Try adjusting your search criteria or filters to find what you're looking for.",
          actionLabel: "Clear Filters"
        }
      case "category":
        return {
          icon: "Folder",
          title: "No tasks in this category",
          message: "This category is empty. Add some tasks to get organized!",
          actionLabel: "Add Task"
        }
      case "completed":
        return {
          icon: "CheckCircle",
          title: "No completed tasks",
          message: "Complete some tasks to see them here. You've got this!",
          actionLabel: "View All Tasks"
        }
      case "overdue":
        return {
          icon: "Clock",
          title: "No overdue tasks",
          message: "Great job staying on top of your deadlines!",
          actionLabel: "Add Task"
        }
      default:
        return {
          icon,
          title,
          message,
          actionLabel
        }
    }
  }

  const emptyState = getEmptyState()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", bounce: 0.4 }}
        className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mb-6"
      >
        <ApperIcon name={emptyState.icon} className="h-10 w-10 text-slate-400" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-slate-900 mb-2"
      >
        {emptyState.title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-slate-600 mb-8 max-w-md leading-relaxed"
      >
        {emptyState.message}
      </motion.p>

      {onAction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button onClick={onAction} size="lg" icon="Plus">
            {emptyState.actionLabel}
          </Button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-sm text-slate-400"
      >
        <p>💡 Pro tip: Use keyboard shortcuts to work faster!</p>
      </motion.div>
    </motion.div>
  )
}

export default Empty