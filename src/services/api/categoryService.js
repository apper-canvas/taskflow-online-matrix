import categoriesData from "@/services/mockData/categories.json"

class CategoryService {
  constructor() {
    this.categories = [...categoriesData]
  }

  async delay() {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100))
  }

  async getAll() {
    await this.delay()
    return [...this.categories]
  }

  async getById(id) {
    await this.delay()
    const category = this.categories.find(c => c.Id === parseInt(id))
    if (!category) {
      throw new Error("Category not found")
    }
    return { ...category }
  }

  async create(categoryData) {
    await this.delay()
    const newCategory = {
      Id: Math.max(...this.categories.map(c => c.Id), 0) + 1,
      name: categoryData.name,
      color: categoryData.color,
      taskCount: 0
    }
    this.categories.push(newCategory)
    return { ...newCategory }
  }

  async update(id, updateData) {
    await this.delay()
    const categoryIndex = this.categories.findIndex(c => c.Id === parseInt(id))
    if (categoryIndex === -1) {
      throw new Error("Category not found")
    }
    
    this.categories[categoryIndex] = {
      ...this.categories[categoryIndex],
      ...updateData
    }
    return { ...this.categories[categoryIndex] }
  }

  async delete(id) {
    await this.delay()
    const categoryIndex = this.categories.findIndex(c => c.Id === parseInt(id))
    if (categoryIndex === -1) {
      throw new Error("Category not found")
    }
    this.categories.splice(categoryIndex, 1)
    return true
  }

  async updateTaskCount(categoryName, count) {
    await this.delay()
    const categoryIndex = this.categories.findIndex(c => 
      c.name.toLowerCase() === categoryName.toLowerCase()
    )
    if (categoryIndex !== -1) {
      this.categories[categoryIndex].taskCount = count
      return { ...this.categories[categoryIndex] }
    }
    return null
  }
}

export default new CategoryService()