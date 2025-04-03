import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, History, X } from "lucide-react";
import MainFeature from "../components/MainFeature";

//Testing editing changes 

const Home = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState([]);

  const addToHistory = (calculation) => {
    setCalculationHistory(prev => [calculation, ...prev]);
  };

  const clearHistory = () => {
    setCalculationHistory([]);
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="relative mb-6">
          <h1 className="text-3xl font-bold text-center text-surface-800 dark:text-surface-100">
            <span className="inline-block mr-2">
              <Calculator size={32} className="inline text-primary" />
            </span>
            CalcuSmart
          </h1>
          <p className="mt-2 text-center text-surface-600 dark:text-surface-300">
            Your advanced calculation companion
          </p>
        </div>

        <div className="relative">
          <div className="rounded-2xl overflow-hidden bg-surface-50 dark:bg-surface-800 shadow-card dark:shadow-none border border-surface-200 dark:border-surface-700">
            <div className="flex justify-between items-center p-4 border-b border-surface-200 dark:border-surface-700">
              <h2 className="font-semibold text-surface-800 dark:text-surface-100">
                Calculator
              </h2>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                aria-label="Toggle history"
              >
                <History size={18} className="text-primary" />
              </motion.button>
            </div>
            
            <MainFeature onCalculate={addToHistory} />
          </div>

          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ type: "spring", damping: 25 }}
                className="absolute top-0 right-0 w-full h-full rounded-2xl bg-surface-50 dark:bg-surface-800 shadow-card dark:shadow-none border border-surface-200 dark:border-surface-700 overflow-hidden z-10"
              >
                <div className="flex justify-between items-center p-4 border-b border-surface-200 dark:border-surface-700">
                  <h2 className="font-semibold text-surface-800 dark:text-surface-100">
                    Calculation History
                  </h2>
                  <div className="flex gap-2">
                    {calculationHistory.length > 0 && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={clearHistory}
                        className="text-xs px-2 py-1 rounded-md bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      >
                        Clear
                      </motion.button>
                    )}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowHistory(false)}
                      className="p-1 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                      aria-label="Close history"
                    >
                      <X size={18} className="text-surface-600 dark:text-surface-300" />
                    </motion.button>
                  </div>
                </div>
                
                <div className="p-4 h-[400px] overflow-y-auto">
                  {calculationHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-surface-500 dark:text-surface-400">
                      <History size={48} className="mb-2 opacity-30" />
                      <p>No calculations yet done !</p>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {calculationHistory.map((calc, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-3 rounded-lg bg-surface-100 dark:bg-surface-700 border border-surface-200 dark:border-surface-600"
                        >
                          <div className="text-sm text-surface-600 dark:text-surface-400">
                            {calc.expression}
                          </div>
                          <div className="text-lg font-medium text-surface-800 dark:text-surface-100">
                            = {calc.result}
                          </div>
                          <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                            {calc.timestamp.toLocaleTimeString()}
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;