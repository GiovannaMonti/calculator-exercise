import React, { useState } from "react"
import ReactDOM from "react-dom"
import "./index.css"
const calculate = (a, b, op) => {
  switch (op) {
    case "+":
      return a + b
    case "-":
      return a - b
    case "/":
      return a / b
    case "*":
      return a * b
    default:
    // do nothing
  }
}

function Operator({ onClick, symbol }) {
  return <button onClick={() => onClick(symbol)}>{symbol}</button>
}

function TextInput({
  currentValue,
  nextValue,
  operator,
  onInputSubmit,
  onChange,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onInputSubmit()
      }}
    >
      <input
        id="textinput"
        type="text"
        value={operator == null ? currentValue : nextValue}
        onChange={(e) => onChange(parseInt(e.target.value))}
      ></input>
      <input type="submit" value="=" />
    </form>
  )
}

function Number({ value, onClick }) {
  return (
    <button
      className="number"
      value={value}
      onClick={(e) => onClick(e.target.value)}
    >
      {value}
    </button>
  )
}

function CalculatorBoard({
  currentValue,
  setCurrentValue,
  nextValue,
  setNextValue,
  operator,
  setOperator,
  isResult,
  setIsResult,
}) {
  const onOperatorClick = (op) => {
    if (operator != null) {
      setCurrentValue(calculate(currentValue, nextValue, operator))
      setNextValue("")
    }
    setOperator(op)
  }
  const onNumberClick = (target) => {
    if (isResult) {
      if (operator == null) {
        setCurrentValue(parseInt(target))
      } else {
        setNextValue(parseInt(nextValue + target))
      }
      setIsResult(false)
      return
    }
    if (operator == null) {
      setCurrentValue(parseInt(currentValue + target))
    } else {
      setNextValue(parseInt(nextValue + target))
    }
  }
  const resetCalculator = () => {
    setCurrentValue(0)
    setNextValue("")
    setOperator(null)
    setIsResult(false)
  }
  return (
    <div id="board">
      <div id="numbers">
        <div className="board-row">
          <Number value="7" onClick={onNumberClick} />
          <Number value="8" onClick={onNumberClick} />
          <Number value="9" onClick={onNumberClick} />
        </div>
        <div className="board-row">
          <Number value="4" onClick={onNumberClick} />
          <Number value="5" onClick={onNumberClick} />
          <Number value="6" onClick={onNumberClick} />
        </div>
        <div className="board-row">
          <Number value="1" onClick={onNumberClick} />
          <Number value="2" onClick={onNumberClick} />
          <Number value="3" onClick={onNumberClick} />
        </div>
        <div className="board-row">
          <button onClick={resetCalculator}>Canc</button>
          <Number value="0" onClick={onNumberClick} />
        </div>
      </div>
      <div className="operations">
        {["+", "-", "*", "/"].map((symbol) => (
          <Operator key={symbol} onClick={onOperatorClick} symbol={symbol} />
        ))}
      </div>
    </div>
  )
}

function Calculator() {
  const [currentValue, setCurrentValue] = useState("")
  const [nextValue, setNextValue] = useState("")
  const [operator, setOperator] = useState(null)
  const [isResult, setIsResult] = useState(false)
  const result = calculate(currentValue, nextValue, operator)
  console.log({ operator, currentValue, nextValue, result })
  return (
    <div>
      <TextInput
        currentValue={currentValue}
        setCurrentValue={setCurrentValue}
        nextValue={nextValue}
        setNextValue={setNextValue}
        operator={operator}
        setOperator={setOperator}
        onInputSubmit={() => {
          setCurrentValue(result)
          setNextValue("")
          setOperator(null)
          setIsResult(true)
        }}
        onChange={(value) => {
          if (operator == null) {
            setCurrentValue(value)
          } else {
            setNextValue(value)
          }
        }}
      />
      <CalculatorBoard
        currentValue={currentValue}
        setCurrentValue={setCurrentValue}
        nextValue={nextValue}
        setNextValue={setNextValue}
        operator={operator}
        setOperator={setOperator}
        isResult={isResult}
        setIsResult={setIsResult}
      />
    </div>
  )
}

ReactDOM.render(<Calculator />, document.getElementById("root"))
