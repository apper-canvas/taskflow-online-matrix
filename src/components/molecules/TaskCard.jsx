import React, { useState } from "react"
import { motion } from "framer-motion"
import { format, isToday, isTomorrow, isPast, parseISO } from "date-fns"
import { toast } from "react-toastify"
import Checkbox from "@/components/atoms/Checkbox"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleToggleComplete = async () => {
    setIsCompleting(true)
    try {
      await onToggleComplete(task.Id, !task.completed)
      if (!task.completed) {
        toast.success("Task completed! Great job! 🎉")
      } else {
        toast.info("Task marked as pending")
      }
    } catch (error) {
      toast.error("Failed to update task")
    } finally {
      setIsCompleting(false)
    }
  }

  const formatDueDate = (dateString) => {
    if (!dateString) return null
    
    const date = parseISO(dateString)
    
    if (isToday(date)) return "Today"
    if (isTomorrow(date)) return "Tomorrow"
    
    return format(date, "MMM d")
  }

  const getDueDateStatus = (dateString) => {
    if (!dateString) return "none"
    
    const date = parseISO(dateString)
    
    if (isPast(date) && !isToday(date)) return "overdue"
    if (isToday(date)) return "today"
    
    return "upcoming"
  }

  const dueDateStatus = getDueDateStatus(task.dueDate)
  const formattedDueDate = formatDueDate(task.dueDate)

  const priorityColors = {
    high: "priority-high",
    medium: "priority-medium",
    low: "priority-low"
  }

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      layout
      className={cn(
        "bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all duration-200",
        priorityColors[task.priority],
        task.completed && "opacity-75 bg-slate-50"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            size="md"
            className={cn(
              "transition-all duration-300",
              isCompleting && "animate-bounce-gentle"
            )}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-semibold text-slate-900 mb-1",
                task.completed && "line-through text-slate-500"
              )}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={cn(
                  "text-sm text-slate-600 mb-3 line-clamp-2",
                  task.completed && "text-slate-400"
                )}>
                  {task.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                icon="Edit2"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.Id)}
                icon="Trash2"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-error-500 hover:text-error-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant={task.priority} size="sm">
                {task.priority}
              </Badge>
              
              <div className="flex items-center gap-1">
                <div 
                  className={cn(
                    "w-2 h-2 rounded-full",
                    categoryColors[task.category] || "bg-slate-400"
                  )}
                />
                <span className="text-xs text-slate-600 capitalize">
                  {task.category}
                </span>
              </div>
            </div>

            {formattedDueDate && (
              <div className={cn(
                "flex items-center gap-1 text-xs px-2 py-1 rounded-full",
                dueDateStatus === "overdue" && "bg-error-100 text-error-700",
                dueDateStatus === "today" && "bg-warning-100 text-warning-700",
                dueDateStatus === "upcoming" && "bg-slate-100 text-slate-600"
              )}>
                <ApperIcon 
                  name={dueDateStatus === "overdue" ? "AlertTriangle" : "Calendar"} 
                  className="h-3 w-3" 
                />
                <span>{formattedDueDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard