import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RotateCcw, 
  Percent, 
  Divide, 
  X as Multiply, 
  Minus, 
  Plus, 
  Equal, 
  Calculator,
  Function as FunctionIcon,
  ArrowLeft
} from "lucide-react";

const MainFeature = ({ onCalculate }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [storedValue, setStoredValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [calculationExpression, setCalculationExpression] = useState("");
  const [mode, setMode] = useState("standard"); // standard or scientific

  // Handle digit input
  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? String(digit) : displayValue + digit);
    }
    
    // Update expression
    if (waitingForOperand) {
      setCalculationExpression(calculationExpression + digit);
    } else if (displayValue === "0") {
      setCalculationExpression(calculationExpression === "0" ? String(digit) : calculationExpression + digit);
    } else {
      setCalculationExpression(calculationExpression + digit);
    }
  };

  // Handle decimal point
  const inputDot = () => {
    if (waitingForOperand) {
      setDisplayValue("0.");
      setCalculationExpression(calculationExpression + "0.");
      setWaitingForOperand(false);
    } else if (displayValue.indexOf(".") === -1) {
      setDisplayValue(displayValue + ".");
      setCalculationExpression(calculationExpression + ".");
    }
  };

  // Handle operators
  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);
    
    if (storedValue === null) {
      setStoredValue(inputValue);
    } else if (operator) {
      const result = calculate(storedValue, inputValue, operator);
      setDisplayValue(String(result));
      setStoredValue(result);
    }
    
    setWaitingForOperand(true);
    setOperator(nextOperator);
    
    // Update expression
    if (nextOperator === "+") {
      setCalculationExpression(calculationExpression + " + ");
    } else if (nextOperator === "-") {
      setCalculationExpression(calculationExpression + " - ");
    } else if (nextOperator === "*") {
      setCalculationExpression(calculationExpression + " × ");
    } else if (nextOperator === "/") {
      setCalculationExpression(calculationExpression + " ÷ ");
    } else if (nextOperator === "%") {
      setCalculationExpression(calculationExpression + " % ");
    }
  };

  // Calculate result
  const calculate = (firstOperand, secondOperand, operation) => {
    switch (operation) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      case "%":
        return (firstOperand * secondOperand) / 100;
      default:
        return secondOperand;
    }
  };

  // Handle equals
  const handleEquals = () => {
    const inputValue = parseFloat(displayValue);
    
    if (storedValue === null) {
      return;
    }
    
    if (operator) {
      const result = calculate(storedValue, inputValue, operator);
      const formattedResult = formatResult(result);
      
      // Add to history
      if (onCalculate) {
        onCalculate({
          expression: calculationExpression,
          result: formattedResult,
          timestamp: new Date()
        });
      }
      
      setDisplayValue(formattedResult);
      setCalculationExpression("");
      setStoredValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  // Format result to handle large numbers and decimals
  const formatResult = (value) => {
    const stringValue = String(value);
    
    if (stringValue.includes('e')) {
      return stringValue; // Scientific notation
    }
    
    const [integerPart, decimalPart] = stringValue.split('.');
    
    if (decimalPart && decimalPart.length > 8) {
      return parseFloat(value.toFixed(8)).toString();
    }
    
    return stringValue;
  };

  // Clear all
  const clearAll = () => {
    setDisplayValue("0");
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setCalculationExpression("");
  };

  // Backspace
  const handleBackspace = () => {
    if (waitingForOperand) return;
    
    if (displayValue.length === 1) {
      setDisplayValue("0");
      setCalculationExpression(calculationExpression.slice(0, -1) || "0");
    } else {
      setDisplayValue(displayValue.slice(0, -1));
      setCalculationExpression(calculationExpression.slice(0, -1));
    }
  };

  // Scientific functions
  const calculateScientific = (func) => {
    const inputValue = parseFloat(displayValue);
    let result;
    
    switch (func) {
      case "sqrt":
        result = Math.sqrt(inputValue);
        setCalculationExpression(`sqrt(${inputValue})`);
        break;
      case "square":
        result = inputValue * inputValue;
        setCalculationExpression(`(${inputValue})²`);
        break;
      case "sin":
        result = Math.sin(inputValue * (Math.PI / 180)); // Convert to radians
        setCalculationExpression(`sin(${inputValue}°)`);
        break;
      case "cos":
        result = Math.cos(inputValue * (Math.PI / 180)); // Convert to radians
        setCalculationExpression(`cos(${inputValue}°)`);
        break;
      case "tan":
        result = Math.tan(inputValue * (Math.PI / 180)); // Convert to radians
        setCalculationExpression(`tan(${inputValue}°)`);
        break;
      case "log":
        result = Math.log10(inputValue);
        setCalculationExpression(`log(${inputValue})`);
        break;
      case "ln":
        result = Math.log(inputValue);
        setCalculationExpression(`ln(${inputValue})`);
        break;
      case "1/x":
        result = 1 / inputValue;
        setCalculationExpression(`1/(${inputValue})`);
        break;
      default:
        return;
    }
    
    const formattedResult = formatResult(result);
    
    // Add to history
    if (onCalculate) {
      onCalculate({
        expression: calculationExpression,
        result: formattedResult,
        timestamp: new Date()
      });
    }
    
    setDisplayValue(formattedResult);
    setWaitingForOperand(true);
  };

  // Toggle positive/negative
  const toggleSign = () => {
    const value = parseFloat(displayValue);
    setDisplayValue(String(-value));
    
    if (calculationExpression.startsWith('-')) {
      setCalculationExpression(calculationExpression.substring(1));
    } else {
      setCalculationExpression('-' + calculationExpression);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      
      if (/\d/.test(key)) {
        event.preventDefault();
        inputDigit(parseInt(key, 10));
      } else if (key === '.') {
        event.preventDefault();
        inputDot();
      } else if (key === '+') {
        event.preventDefault();
        performOperation('+');
      } else if (key === '-') {
        event.preventDefault();
        performOperation('-');
      } else if (key === '*') {
        event.preventDefault();
        performOperation('*');
      } else if (key === '/') {
        event.preventDefault();
        performOperation('/');
      } else if (key === '%') {
        event.preventDefault();
        performOperation('%');
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleEquals();
      } else if (key === 'Escape') {
        event.preventDefault();
        clearAll();
      } else if (key === 'Backspace') {
        event.preventDefault();
        handleBackspace();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [displayValue, waitingForOperand, operator, storedValue, calculationExpression]);

  // Render calculator keys
  const renderKeys = () => {
    if (mode === "standard") {
      return (
        <div className="grid grid-cols-4 gap-3 p-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-function h-14"
            onClick={clearAll}
          >
            AC
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-function h-14"
            onClick={toggleSign}
          >
            +/-
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-function h-14"
            onClick={() => performOperation("%")}
          >
            <Percent size={18} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-operator h-14"
            onClick={() => performOperation("/")}
          >
            <Divide size={18} />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-14"
            onClick={() => inputDigit(7)}
          >
            7
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-14"
            onClick={() => inputDigit(8)}
          >
            8
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-14"
            onClick={() => inputDigit(9)}
          >
            9
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-operator h-14"
            onClick={() => performOperation("*")}
          >
            <Multiply size={18} />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-14"
            onClick={() => inputDigit(4)}
          >
            4
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-14"
            onClick={() => inputDigit(5)}
          >
            5
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-14"
            onClick={() => inputDigit(6)}
          >
            6
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-operator h-14"
            onClick={() => performOperation("-")}
          >
            <Minus size={18} />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-14"
            onClick={() => inputDigit(1)}
          >
            1
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-14"
            onClick={() => inputDigit(2)}
          >
            2
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-14"
            onClick={() => inputDigit(3)}
          >
            3
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-operator h-14"
            onClick={() => performOperation("+")}
          >
            <Plus size={18} />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-14"
            onClick={() => inputDigit(0)}
          >
            0
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-14"
            onClick={inputDot}
          >
            .
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-function h-14"
            onClick={handleBackspace}
          >
            <ArrowLeft size={18} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-equals h-14"
            onClick={handleEquals}
          >
            <Equal size={18} />
          </motion.button>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-5 gap-2 p-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-function h-12 text-sm"
            onClick={clearAll}
          >
            AC
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-function h-12 text-sm"
            onClick={() => calculateScientific("sqrt")}
          >
            √x
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-function h-12 text-sm"
            onClick={() => calculateScientific("square")}
          >
            x²
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-function h-12 text-sm"
            onClick={() => calculateScientific("1/x")}
          >
            1/x
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-operator h-12"
            onClick={() => performOperation("%")}
          >
            <Percent size={16} />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-function h-12 text-sm"
            onClick={() => calculateScientific("sin")}
          >
            sin
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-function h-12 text-sm"
            onClick={() => calculateScientific("cos")}
          >
            cos
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-function h-12 text-sm"
            onClick={() => calculateScientific("tan")}
          >
            tan
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-function h-12 text-sm"
            onClick={toggleSign}
          >
            +/-
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-operator h-12"
            onClick={() => performOperation("/")}
          >
            <Divide size={16} />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-function h-12 text-sm"
            onClick={() => calculateScientific("log")}
          >
            log
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-12"
            onClick={() => inputDigit(7)}
          >
            7
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-12"
            onClick={() => inputDigit(8)}
          >
            8
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-12"
            onClick={() => inputDigit(9)}
          >
            9
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-operator h-12"
            onClick={() => performOperation("*")}
          >
            <Multiply size={16} />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-function h-12 text-sm"
            onClick={() => calculateScientific("ln")}
          >
            ln
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-12"
            onClick={() => inputDigit(4)}
          >
            4
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-12"
            onClick={() => inputDigit(5)}
          >
            5
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-12"
            onClick={() => inputDigit(6)}
          >
            6
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-operator h-12"
            onClick={() => performOperation("-")}
          >
            <Minus size={16} />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-function h-12 text-sm"
            onClick={handleBackspace}
          >
            <ArrowLeft size={16} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-12"
            onClick={() => inputDigit(1)}
          >
            1
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-12"
            onClick={() => inputDigit(2)}
          >
            2
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-12"
            onClick={() => inputDigit(3)}
          >
            3
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-operator h-12"
            onClick={() => performOperation("+")}
          >
            <Plus size={16} />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-function h-12 text-sm"
            onClick={() => setMode("standard")}
          >
            <Calculator size={16} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-12 col-span-2"
            onClick={() => inputDigit(0)}
          >
            0
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-standard h-12"
            onClick={inputDot}
          >
            .
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="calculator-key calculator-key-equals h-12"
            onClick={handleEquals}
          >
            <Equal size={16} />
          </motion.button>
        </div>
      );
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm font-medium text-surface-600 dark:text-surface-300">
          {mode === "standard" ? "Standard Calculator" : "Scientific Calculator"}
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setMode(mode === "standard" ? "scientific" : "standard")}
          className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-light hover:bg-primary/20 dark:hover:bg-primary-dark/30 transition-colors"
        >
          {mode === "standard" ? (
            <span className="flex items-center gap-1">
              <FunctionIcon size={12} />
              Scientific
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Calculator size={12} />
              Standard
            </span>
          )}
        </motion.button>
      </div>

      <div className="calculator-display">
        <div className="text-sm text-surface-500 dark:text-surface-400 mb-1 h-5 overflow-x-auto scrollbar-hide">
          {calculationExpression || "\u00A0"}
        </div>
        <div className="text-3xl font-medium text-surface-800 dark:text-surface-100">
          {displayValue}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderKeys()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;