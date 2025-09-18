import React from "react"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading your data. Please try again.", 
  onRetry,
  type = "general"
}) => {
  const getErrorDetails = () => {
    switch (type) {
      case "network":
        return {
          icon: "WifiOff",
          title: "Connection Error",
          message: "Unable to connect to the server. Please check your internet connection and try again."
        }
      case "notFound":
        return {
          icon: "Search",
          title: "Not Found",
          message: "The task or category you're looking for doesn't exist or may have been deleted."
        }
      case "permission":
        return {
          icon: "Shield",
          title: "Access Denied",
          message: "You don't have permission to perform this action."
        }
      default:
        return {
          icon: "AlertTriangle",
          title,
          message
        }
    }
  }

  const errorDetails = getErrorDetails()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring" }}
        className="w-16 h-16 bg-gradient-to-br from-error-500 to-error-600 rounded-2xl flex items-center justify-center mb-6"
      >
        <ApperIcon name={errorDetails.icon} className="h-8 w-8 text-white" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-slate-900 mb-2"
      >
        {errorDetails.title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-slate-600 mb-6 max-w-md leading-relaxed"
      >
        {errorDetails.message}
      </motion.p>

      {onRetry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3"
        >
          <Button onClick={onRetry} icon="RefreshCw">
            Try Again
          </Button>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Error