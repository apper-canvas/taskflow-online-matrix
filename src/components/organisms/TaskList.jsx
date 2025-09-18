import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import TaskCard from "@/components/molecules/TaskCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"

const TaskList = ({ 
  tasks, 
  loading, 
  error, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  onRetry,
  emptyStateProps = {}
}) => {
  if (loading) {
    return <Loading type="card" count={6} />
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Empty 
        title={emptyStateProps.title || "No tasks found"}
        message={emptyStateProps.message || "Create your first task to get started!"}
        icon={emptyStateProps.icon || "CheckSquare"}
        actionLabel={emptyStateProps.actionLabel || "Add Task"}
        onAction={emptyStateProps.onAction}
        type={emptyStateProps.type || "tasks"}
      />
    )
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
            layout
            className="group"
          >
            <TaskCard
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {tasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-8 text-sm text-slate-500"
        >
          Showing {tasks.length} task{tasks.length === 1 ? "" : "s"}
          <br />
          <span className="text-xs">
            💡 Tip: Use the search bar to find specific tasks quickly
          </span>
        </motion.div>
      )}
    </div>
  )
}

export default TaskList