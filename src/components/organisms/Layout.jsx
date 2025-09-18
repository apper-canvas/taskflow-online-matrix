import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Layout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold gradient-text">TaskFlow</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileSidebarOpen(true)}
          icon="Menu"
          className="lg:hidden"
        >
          Menu
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-80 bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold gradient-text">Navigation</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  icon="X"
                />
              </div>
              <div className="p-4">
                <p className="text-slate-600">Mobile navigation menu would go here</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:flex">
        {/* Desktop Sidebar - Hidden on Mobile */}
        <div className="hidden lg:block w-80 bg-white border-r border-slate-200 min-h-screen">
          <div className="p-6">
            <h1 className="text-2xl font-bold gradient-text mb-8">TaskFlow</h1>
            <div className="space-y-2">
              <div className="p-3 bg-primary-50 text-primary-700 rounded-lg border-l-4 border-primary-500">
                <div className="flex items-center gap-3">
                  <ApperIcon name="Home" className="h-5 w-5" />
                  <span className="font-medium">Dashboard</span>
                </div>
              </div>
              <div className="p-3 hover:bg-slate-50 rounded-lg transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <ApperIcon name="CheckSquare" className="h-5 w-5 text-slate-500" />
                  <span className="font-medium text-slate-700">All Tasks</span>
                </div>
              </div>
              <div className="p-3 hover:bg-slate-50 rounded-lg transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <ApperIcon name="Calendar" className="h-5 w-5 text-slate-500" />
                  <span className="font-medium text-slate-700">Due Today</span>
                </div>
              </div>
              <div className="p-3 hover:bg-slate-50 rounded-lg transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <ApperIcon name="Star" className="h-5 w-5 text-slate-500" />
                  <span className="font-medium text-slate-700">Important</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout