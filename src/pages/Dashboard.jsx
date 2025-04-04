import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, BarChart3, CalculatorIcon, ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import StatCard from "../components/dashboard/StatCard";
import ChartCard from "../components/dashboard/ChartCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCalculations: 0,
    complexOperations: 0,
    savedCalculations: 0,
    dailyAverage: 0
  });

  const [calculationHistory, setCalculationHistory] = useState([
    {
      expression: "125 × 48",
      result: "6000",
      timestamp: new Date(2023, 5, 18, 14, 30)
    },
    {
      expression: "√16",
      result: "4",
      timestamp: new Date(2023, 5, 18, 13, 45)
    },
    {
      expression: "250 + 750",
      result: "1000",
      timestamp: new Date(2023, 5, 18, 11, 20)
    },
    {
      expression: "75 ÷ 3",
      result: "25",
      timestamp: new Date(2023, 5, 17, 16, 10)
    },
    {
      expression: "2^8",
      result: "256",
      timestamp: new Date(2023, 5, 17, 15, 25)
    }
  ]);

  useEffect(() => {
    // Simulate fetching dashboard data Test
    setTimeout(() => {
      setStats({
        totalCalculations: 256,
        complexOperations: 48,
        savedCalculations: 32,
        dailyAverage: 15
      });
    }, 500);
  }, []);

  // Daily calculations data for chart
  const dailyData = {
    series: [{
      name: 'Calculations',
      data: [10, 15, 8, 22, 16, 12, 15]
    }],
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };

  // Operation types data for chart
  const operationsData = {
    series: [42, 28, 18, 12],
    labels: ['Basic', 'Advanced', 'Scientific', 'Custom']
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-surface-800 dark:text-surface-100 flex items-center">
              <BarChart3 className="mr-2 text-primary" size={24} />
              Dashboard
            </h1>
            <p className="text-surface-600 dark:text-surface-300 mt-1">
              Overview of your calculation activities
            </p>
          </div>
          <Link 
            to="/"
            className="flex items-center px-3 py-2 rounded-lg bg-surface-100 hover:bg-surface-200 dark:bg-surface-700 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300 transition-colors"
          >
            <ChevronLeft size={16} />
            <span className="ml-1">Back to Calculator</span>
          </Link>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">
            Statistics Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Total Calculations" 
              value={stats.totalCalculations} 
              icon={<CalculatorIcon size={20} />}
              color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
            />
            <StatCard 
              title="Complex Operations" 
              value={stats.complexOperations} 
              icon={<ArrowUpRight size={20} />}
              color="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
            />
            <StatCard 
              title="Saved Calculations" 
              value={stats.savedCalculations} 
              icon={<CalculatorIcon size={20} />}
              color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
            />
            <StatCard 
              title="Daily Average" 
              value={stats.dailyAverage} 
              icon={<BarChart3 size={20} />}
              color="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <ChartCard 
              title="Calculations Activity!" 
              subtitle={`Last 7 days • Updated ${format(new Date(), 'MMM d, yyyy')}`}
              type="bar"
              height={300}
              series={dailyData.series}
              options={{
                xaxis: {
                  categories: dailyData.categories
                },
                chart: {
                  toolbar: {
                    show: false
                  }
                },
                colors: ['#8b5cf6'],
                plotOptions: {
                  bar: {
                    borderRadius: 4,
                    columnWidth: '50%',
                  }
                },
                dataLabels: {
                  enabled: false
                }
              }}
            />
          </div>
          <div>
            <ChartCard 
              title="Operation Types" 
              subtitle="Distribution by category"
              type="donut"
              height={300}
              series={operationsData.series}
              options={{
                labels: operationsData.labels,
                chart: {
                  toolbar: {
                    show: false
                  }
                },
                colors: ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981'],
                legend: {
                  position: 'bottom'
                },
                dataLabels: {
                  enabled: false
                }
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RecentActivity calculations={calculationHistory} />
          <div className="md:col-span-2">
            <QuickActions />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;