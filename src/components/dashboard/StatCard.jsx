import { motion } from "framer-motion";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg p-4 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-card dark:shadow-none"
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full ${color}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-surface-500 dark:text-surface-400 truncate">
            {title}
          </p>
          <p className="text-2xl font-bold text-surface-800 dark:text-surface-100">
            {value.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;