import { motion } from "framer-motion";
import Chart from "react-apexcharts";

const ChartCard = ({ title, subtitle, type, height, series, options }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg overflow-hidden bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-card dark:shadow-none"
    >
      <div className="p-4 border-b border-surface-200 dark:border-surface-700">
        <h3 className="font-semibold text-surface-800 dark:text-surface-100">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>
      <div className="p-4">
        <Chart
          options={{
            ...options,
            theme: {
              mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            },
            chart: {
              ...options.chart,
              background: 'transparent',
              fontFamily: 'inherit',
            },
            grid: {
              borderColor: document.documentElement.classList.contains('dark') 
                ? 'rgba(64, 64, 64, 0.5)' 
                : 'rgba(229, 229, 229, 0.5)'
            },
            xaxis: {
              ...options.xaxis,
              labels: {
                style: {
                  colors: document.documentElement.classList.contains('dark') 
                    ? 'rgba(212, 212, 212, 0.8)' 
                    : 'rgba(82, 82, 82, 0.8)'
                }
              }
            },
            yaxis: {
              ...options.yaxis,
              labels: {
                style: {
                  colors: document.documentElement.classList.contains('dark') 
                    ? 'rgba(212, 212, 212, 0.8)' 
                    : 'rgba(82, 82, 82, 0.8)'
                }
              }
            }
          }}
          series={series}
          type={type}
          height={height}
          width="100%"
        />
      </div>
    </motion.div>
  );
};

export default ChartCard;