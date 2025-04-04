import { motion } from "framer-motion";
import { Calculator, PlusSquare, Percent, Divide, Square, X, History, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    { 
      title: "Standard Calculator", 
      description: "Basic arithmetic operations",
      icon: <Calculator size={24} />,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      path: "/"
    },
    { 
      title: "Scientific Functions", 
      description: "Advanced mathematical operations",
      icon: <Square size={24} />,
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
      path: "/"
    },
    { 
      title: "Percentage Calculator", 
      description: "Calculate percentages and discounts",
      icon: <Percent size={24} />,
      color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      path: "/"
    },
    { 
      title: "Division Assistant", 
      description: "Complex division with remainders",
      icon: <Divide size={24} />,
      color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
      path: "/"
    },
    { 
      title: "Calculation History", 
      description: "View and manage past calculations",
      icon: <History size={24} />,
      color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
      path: "/"
    },
    { 
      title: "Settings", 
      description: "Customize calculator preferences",
      icon: <Settings size={24} />,
      color: "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400",
      path: "/"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg overflow-hidden bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-card dark:shadow-none"
    >
      <div className="p-4 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center">
          <PlusSquare size={18} className="mr-2 text-primary" />
          <h3 className="font-semibold text-surface-800 dark:text-surface-100">
            Quick Actions
          </h3>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={action.path}
                className="flex items-center p-3 rounded-lg border border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              >
                <div className={`p-2 rounded-full mr-3 ${action.color}`}>
                  {action.icon}
                </div>
                <div>
                  <h4 className="font-medium text-surface-800 dark:text-surface-100">
                    {action.title}
                  </h4>
                  <p className="text-xs text-surface-500 dark:text-surface-400">
                    {action.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuickActions;