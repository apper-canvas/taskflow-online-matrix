import React from "react"
import { motion } from "framer-motion"

const Loading = ({ type = "card", count = 6 }) => {
  const shimmer = {
    animate: {
      x: ["-100%", "100%"],
    },
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear",
    },
  }

  const TaskCardSkeleton = () => (
    <div className="bg-white rounded-xl border border-slate-200 p-4 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/50 to-transparent"
        {...shimmer}
      />
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 bg-slate-200 rounded mt-1"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-3 bg-slate-200 rounded w-full"></div>
          <div className="flex items-center gap-2 justify-between">
            <div className="h-6 bg-slate-200 rounded-full w-16"></div>
            <div className="h-6 bg-slate-200 rounded-full w-20"></div>
          </div>
        </div>
      </div>
    </div>
  )

  const CategorySkeleton = () => (
    <div className="flex items-center gap-3 p-3 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/30 to-transparent"
        {...shimmer}
      />
      <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
      <div className="h-4 bg-slate-200 rounded w-20"></div>
      <div className="ml-auto h-5 bg-slate-200 rounded-full w-8"></div>
    </div>
  )

  if (type === "category") {
    return (
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <CategorySkeleton key={i} />
        ))}
      </div>
    )
  }

  if (type === "header") {
    return (
      <div className="flex items-center justify-between p-6 border-b border-slate-100 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/30 to-transparent"
          {...shimmer}
        />
        <div className="space-y-2">
          <div className="h-8 bg-slate-200 rounded w-48"></div>
          <div className="h-4 bg-slate-200 rounded w-32"></div>
        </div>
        <div className="h-10 bg-slate-200 rounded-lg w-32"></div>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <TaskCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default Loading