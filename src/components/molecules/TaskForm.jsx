import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import Select from "@/components/atoms/Select"
import Button from "@/components/atoms/Button"

const TaskForm = ({ task, categories, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "",
    dueDate: ""
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        category: task.category || "",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : ""
      })
    }
  }, [task])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters"
    }

    if (formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        newErrors.dueDate = "Due date cannot be in the past"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fix the errors and try again")
      return
    }

    const submitData = {
      ...formData,
      dueDate: formData.dueDate ? `${formData.dueDate}T23:59:00Z` : null
    }

    try {
      await onSubmit(submitData)
      toast.success(task ? "Task updated successfully!" : "Task created successfully!")
    } catch (error) {
      toast.error("Failed to save task. Please try again.")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" onKeyDown={handleKeyDown}>
      <Input
        label="Task Title"
        required
        value={formData.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
        placeholder="Enter task title..."
        error={errors.title}
        icon="Type"
        maxLength={100}
      />

      <Textarea
        label="Description"
        value={formData.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        placeholder="Add task description (optional)..."
        rows={3}
        error={errors.description}
        maxLength={500}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Priority"
          required
          value={formData.priority}
          onChange={(e) => handleInputChange("priority", e.target.value)}
          error={errors.priority}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </Select>

        <Select
          label="Category"
          required
          value={formData.category}
          onChange={(e) => handleInputChange("category", e.target.value)}
          error={errors.category}
        >
          <option value="">Select category...</option>
          {categories.map(category => (
            <option key={category.Id} value={category.name.toLowerCase()}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>

      <Input
        label="Due Date"
        type="date"
        value={formData.dueDate}
        onChange={(e) => handleInputChange("dueDate", e.target.value)}
        error={errors.dueDate}
        icon="Calendar"
        min={new Date().toISOString().split("T")[0]}
      />

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading}
          icon={task ? "Save" : "Plus"}
        >
          {task ? "Update Task" : "Create Task"}
        </Button>
      </div>

      <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
        💡 Tip: Press Cmd+Enter (Mac) or Ctrl+Enter (Windows) to save quickly
      </div>
    </form>
  )
}

export default TaskForm