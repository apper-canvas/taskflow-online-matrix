import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { isPast, isToday, isTomorrow, parseISO } from "date-fns";
import Modal from "@/components/atoms/Modal";
import Button from "@/components/atoms/Button";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";
import TaskList from "@/components/organisms/TaskList";
import Error from "@/components/ui/Error";
import SearchBar from "@/components/molecules/SearchBar";
import TaskForm from "@/components/molecules/TaskForm";
import categoryService from "@/services/api/categoryService";
import taskService from "@/services/api/taskService";
//import TaskForm from "@/components/molecules/TaskForm"

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "all"
  })

  const [showTaskModal, setShowTaskModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [taskModalLoading, setTaskModalLoading] = useState(false)

  // Load initial data
  const loadData = useCallback(async () => {
    setLoading(true)
    setError("")
    
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ])
      
      setTasks(tasksData)
      setCategories(categoriesData)
    } catch (err) {
      setError(err.message || "Failed to load data")
      toast.error("Failed to load tasks and categories")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks]

    // Category filter
    if (selectedCategory === "today") {
      filtered = filtered.filter(task => {
        if (!task.dueDate) return false
        return isToday(parseISO(task.dueDate))
      })
    } else if (selectedCategory === "upcoming") {
      filtered = filtered.filter(task => {
        if (!task.dueDate) return false
        const dueDate = parseISO(task.dueDate)
        return !isToday(dueDate) && !isPast(dueDate)
      })
    } else if (selectedCategory === "completed") {
      filtered = filtered.filter(task => task.completed)
    } else if (selectedCategory !== "all") {
      filtered = filtered.filter(task => 
        task.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      )
    }

    // Status filter
    if (filters.status === "pending") {
      filtered = filtered.filter(task => !task.completed)
    } else if (filters.status === "completed") {
      filtered = filtered.filter(task => task.completed)
    } else if (filters.status === "overdue") {
      filtered = filtered.filter(task => {
        if (!task.dueDate || task.completed) return false
        return isPast(parseISO(task.dueDate)) && !isToday(parseISO(task.dueDate))
      })
    }

    // Priority filter
    if (filters.priority !== "all") {
      filtered = filtered.filter(task => task.priority === filters.priority)
    }

    // Category filter from search bar
    if (filters.category !== "all") {
      filtered = filtered.filter(task => 
        task.category.toLowerCase() === filters.category.toLowerCase()
      )
    }

    return filtered
  }, [tasks, selectedCategory, searchQuery, filters])

  // Calculate task counts for sidebar
  const taskCounts = useMemo(() => {
    const counts = {}
    
    // Count for each category
    categories.forEach(category => {
      const categoryKey = category.name.toLowerCase()
      const categoryTasks = tasks.filter(task => 
        task.category.toLowerCase() === categoryKey
      )
      counts[categoryKey] = {
        total: categoryTasks.length,
        completed: categoryTasks.filter(task => task.completed).length
      }
    })

    // Special counts
    const todayTasks = tasks.filter(task => {
      if (!task.dueDate) return false
      return isToday(parseISO(task.dueDate))
    })
    
    const upcomingTasks = tasks.filter(task => {
      if (!task.dueDate) return false
      const dueDate = parseISO(task.dueDate)
      return !isToday(dueDate) && !isPast(dueDate)
    })
    
    const completedTasks = tasks.filter(task => task.completed)

    counts.today = {
      total: todayTasks.length,
      completed: todayTasks.filter(task => task.completed).length
    }
    
    counts.upcoming = {
      total: upcomingTasks.length,
      completed: upcomingTasks.filter(task => task.completed).length
    }
    
    counts.completed = {
      total: completedTasks.length,
      completed: completedTasks.length
    }

    return counts
  }, [tasks, categories])

  // Task operations
  const handleToggleComplete = async (taskId, completed) => {
    try {
      const updatedTask = await taskService.update(taskId, { completed })
      setTasks(prev => prev.map(task =>
        task.Id === taskId ? updatedTask : task
      ))
    } catch (err) {
      throw new Error("Failed to update task")
    }
  }

  const handleCreateTask = async (taskData) => {
    setTaskModalLoading(true)
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [newTask, ...prev])
      setShowTaskModal(false)
      setEditingTask(null)
    } catch (err) {
      throw new Error("Failed to create task")
    } finally {
      setTaskModalLoading(false)
    }
  }

  const handleUpdateTask = async (taskData) => {
    setTaskModalLoading(true)
    try {
      const updatedTask = await taskService.update(editingTask.Id, taskData)
      setTasks(prev => prev.map(task =>
        task.Id === editingTask.Id ? updatedTask : task
      ))
      setShowTaskModal(false)
      setEditingTask(null)
    } catch (err) {
      throw new Error("Failed to update task")
    } finally {
      setTaskModalLoading(false)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return
    
    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(task => task.Id !== taskId))
      toast.success("Task deleted successfully")
    } catch (err) {
      toast.error("Failed to delete task")
    }
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowTaskModal(true)
  }

  const handleQuickAdd = () => {
    setEditingTask(null)
    setShowTaskModal(true)
  }

  const handleCloseModal = () => {
    setShowTaskModal(false)
    setEditingTask(null)
    setTaskModalLoading(false)
  }

  const getEmptyStateProps = () => {
    if (selectedCategory === "completed") {
      return {
        title: "No completed tasks",
        message: "Complete some tasks to see them here. You've got this!",
        icon: "CheckCircle",
        type: "completed",
        onAction: handleQuickAdd
      }
    }
    
    if (selectedCategory === "today") {
      return {
        title: "No tasks due today",
        message: "Great! You're all caught up for today.",
        icon: "Calendar",
        type: "today",
        onAction: handleQuickAdd
      }
    }
    
    if (selectedCategory === "upcoming") {
      return {
        title: "No upcoming tasks",
        message: "Add some tasks with future due dates to plan ahead.",
        icon: "Clock",
        type: "upcoming",
        onAction: handleQuickAdd
      }
    }
    
    if (searchQuery || filters.status !== "all" || filters.priority !== "all" || filters.category !== "all") {
      return {
        title: "No matching tasks",
        message: "Try adjusting your search criteria or filters to find what you're looking for.",
        icon: "Search",
        type: "search",
        actionLabel: "Clear Filters",
        onAction: () => {
          setSearchQuery("")
          setFilters({ status: "all", priority: "all", category: "all" })
        }
      }
    }
    
    if (selectedCategory !== "all") {
      return {
        title: "No tasks in this category",
        message: "This category is empty. Add some tasks to get organized!",
        icon: "Folder",
        type: "category",
        onAction: handleQuickAdd
      }
    }
    
    return {
      title: "No tasks yet",
      message: "Get started by creating your first task and stay organized!",
      icon: "CheckSquare",
      type: "tasks",
      onAction: handleQuickAdd
    }
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          taskCounts={taskCounts}
          className="hidden lg:block"
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <Header
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            onQuickAdd={handleQuickAdd}
          />

          <div className="p-6 space-y-6">
            <SearchBar
              onSearch={setSearchQuery}
              onFilterChange={setFilters}
              categories={categories}
            />

            <TaskList
              tasks={filteredTasks}
              loading={loading}
              error={error}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onRetry={loadData}
              emptyStateProps={getEmptyStateProps()}
            />
          </div>
        </div>
      </div>

      {/* Task Modal */}
      <Modal
        isOpen={showTaskModal}
        onClose={handleCloseModal}
        title={editingTask ? "Edit Task" : "Create New Task"}
        size="lg"
      >
        <TaskForm
          task={editingTask}
          categories={categories}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={handleCloseModal}
          loading={taskModalLoading}
        />
      </Modal>
    </div>
  )
}

export default Dashboard