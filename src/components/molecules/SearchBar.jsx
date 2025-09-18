import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const SearchBar = ({ onSearch, onFilterChange, categories = [] }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "all"
  })
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      onSearch(searchQuery)
    }, 300)

    return () => clearTimeout(debounceTimeout)
  }, [searchQuery, onSearch])

  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setFilters({
      status: "all",
      priority: "all",
      category: "all"
    })
  }

  const hasActiveFilters = searchQuery || 
    filters.status !== "all" || 
    filters.priority !== "all" || 
    filters.category !== "all"

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon="Search"
            className="border-0 focus:ring-0 bg-slate-50"
          />
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          icon={isExpanded ? "ChevronUp" : "ChevronDown"}
          className="text-slate-500"
        >
          Filters
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            icon="X"
            className="text-slate-500"
          >
            Clear
          </Button>
        )}
      </div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100">
          <Select
            label="Status"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </Select>

          <Select
            label="Priority"
            value={filters.priority}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </Select>

          <Select
            label="Category"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.Id} value={category.name.toLowerCase()}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
      </motion.div>

      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100"
        >
          <ApperIcon name="Filter" className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-600">Active filters:</span>
          
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-800 rounded-md text-xs">
              Search: "{searchQuery}"
            </span>
          )}
          
          {filters.status !== "all" && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-800 rounded-md text-xs">
              Status: {filters.status}
            </span>
          )}
          
          {filters.priority !== "all" && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-800 rounded-md text-xs">
              Priority: {filters.priority}
            </span>
          )}
          
          {filters.category !== "all" && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-800 rounded-md text-xs">
              Category: {filters.category}
            </span>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default SearchBar