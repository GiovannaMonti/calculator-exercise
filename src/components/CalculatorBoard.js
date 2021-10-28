import { Number } from "./Number"
import { Operator } from "./Operator"
import { calculate } from "../utils"
function CalculatorBoard({
  currentValue,
  setCurrentValue,
  nextValue,
  setNextValue,
  operator,
  setOperator,
  isResult,
  setIsResult,
  setHasSubmitted,
}) {
  const onOperatorClick = (op) => {
    if (currentValue === "Err") {
      return
    }
    if (operator != null) {
      setCurrentValue(calculate(currentValue, nextValue, operator))
      setNextValue(0)
    }
    setOperator(op)
    setHasSubmitted(false)
  }
  const onNumberClick = (target) => {
    if (isResult) {
      setHasSubmitted(false)
      if (operator == null) {
        setCurrentValue(parseInt(target))
      } else {
        setNextValue(parseInt(nextValue + target))
      }
      setIsResult(false)
      return
    }
    setHasSubmitted(false)
    if (operator == null) {
      setCurrentValue(parseInt(currentValue + target))
    } else {
      setNextValue(parseInt(nextValue + target))
    }
  }
  const resetCalculator = () => {
    setCurrentValue(0)
    setNextValue(0)
    setOperator(null)
    setIsResult(false)
  }
  return (
    <div id="board">
      <div id="numbers">
        {["7", "8", "9", "4", "5", "6", "1", "2", "3"].map((value) => (
          <Number key={value} value={value} onClick={onNumberClick} />
        ))}
        <button id="canc" onClick={resetCalculator}>
          C
        </button>
        <Number value="0" onClick={onNumberClick} />
      </div>
      <div className="operations">
        {["+", "-", "*", "/"].map((symbol) => (
          <Operator
            currentValue={currentValue}
            key={symbol}
            onClick={onOperatorClick}
            symbol={symbol}
          />
        ))}
      </div>
    </div>
  )
}
export { CalculatorBoard }
