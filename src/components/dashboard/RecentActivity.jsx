import { motion } from "framer-motion";
import { History, ChevronRight } from "lucide-react";
import { format } from "date-fns";

const RecentActivity = ({ calculations = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg overflow-hidden bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-card dark:shadow-none"
    >
      <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
        <div className="flex items-center">
          <History size={18} className="mr-2 text-primary" />
          <h3 className="font-semibold text-surface-800 dark:text-surface-100">
            Recent Calculations
          </h3>
        </div>
        <button className="text-xs text-primary hover:underline transition-all">
          View all
        </button>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: "350px" }}>
        {calculations.length === 0 ? (
          <div className="p-4 text-center text-surface-500 dark:text-surface-400">
            No recent calculations
          </div>
        ) : (
          <ul className="divide-y divide-surface-200 dark:divide-surface-700">
            {calculations.map((calc, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-surface-800 dark:text-surface-100">
                      {calc.expression}
                    </div>
                    <div className="text-sm text-primary font-semibold">
                      = {calc.result}
                    </div>
                    <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                      {format(calc.timestamp, 'MMM d, h:mm a')}
                    </div>
                  </div>
                  <button className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors">
                    <ChevronRight size={16} className="text-surface-500 dark:text-surface-400" />
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default RecentActivity;