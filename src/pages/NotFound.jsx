import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <motion.div
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        className="mb-6 text-accent"
      >
        <AlertTriangle size={64} />
      </motion.div>
      
      <h1 className="text-4xl font-bold mb-2 text-surface-800 dark:text-surface-100">
        404 - Page Not Found
      </h1>
      
      <p className="text-lg mb-8 text-surface-600 dark:text-surface-300">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link to="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl shadow-soft hover:bg-primary-dark transition-colors"
        >
          <Home size={18} />
          <span>Back to Home</span>
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default NotFound;