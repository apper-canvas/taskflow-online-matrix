import tasksData from "@/services/mockData/tasks.json"

class TaskService {
  constructor() {
    this.tasks = [...tasksData]
  }

  async delay() {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.tasks]
  }

  async getById(id) {
    await this.delay()
    const task = this.tasks.find(t => t.Id === parseInt(id))
    if (!task) {
      throw new Error("Task not found")
    }
    return { ...task }
  }

  async create(taskData) {
    await this.delay()
    const newTask = {
      Id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      title: taskData.title,
      description: taskData.description || "",
      completed: false,
      priority: taskData.priority || "medium",
      category: taskData.category,
      dueDate: taskData.dueDate,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    this.tasks.push(newTask)
    return { ...newTask }
  }

  async update(id, updateData) {
    await this.delay()
    const taskIndex = this.tasks.findIndex(t => t.Id === parseInt(id))
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }
    
    const updatedTask = {
      ...this.tasks[taskIndex],
      ...updateData,
      completedAt: updateData.completed && !this.tasks[taskIndex].completed 
        ? new Date().toISOString() 
        : updateData.completed ? this.tasks[taskIndex].completedAt : null
    }
    
    this.tasks[taskIndex] = updatedTask
    return { ...updatedTask }
  }

  async delete(id) {
    await this.delay()
    const taskIndex = this.tasks.findIndex(t => t.Id === parseInt(id))
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }
    this.tasks.splice(taskIndex, 1)
    return true
  }

  async getByCategory(category) {
    await this.delay()
    return this.tasks.filter(t => t.category === category).map(t => ({ ...t }))
  }

  async getByPriority(priority) {
    await this.delay()
    return this.tasks.filter(t => t.priority === priority).map(t => ({ ...t }))
  }

  async getCompleted() {
    await this.delay()
    return this.tasks.filter(t => t.completed).map(t => ({ ...t }))
  }

  async getPending() {
    await this.delay()
    return this.tasks.filter(t => !t.completed).map(t => ({ ...t }))
  }

  async search(query) {
    await this.delay()
    const searchTerm = query.toLowerCase()
    return this.tasks.filter(t => 
      t.title.toLowerCase().includes(searchTerm) ||
      t.description.toLowerCase().includes(searchTerm)
    ).map(t => ({ ...t }))
  }
}

export default new TaskService()