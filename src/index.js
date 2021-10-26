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

function Plus({ onClick }) {
  return <button onClick={() => onClick("+")}>+</button>
}

function Minus({ onClick }) {
  return <button onClick={() => onClick("-")}>-</button>
}

function Multiplier({ onClick }) {
  return <button onClick={() => onClick("*")}>*</button>
}

function Divider({ onClick }) {
  return <button onClick={() => onClick("/")}>/</button>
}

function TextInput({
  currentValue,
  nextValue,
  operator,
  result,
  onInputSubmit,
  onChange,
}) {
  const input = document.getElementById("textinput")
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        input.value = result
        onInputSubmit()
      }}
    >
      <input
        id="textinput"
        type="text"
        value={operator == null ? currentValue : nextValue}
        onChange={(e) => {
          const value = parseInt(e.target.value)
          return onChange(
            operator == null ? (currentValue = value) : (nextValue = value)
          )
        }}
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
}) {
  const onOperatorClick = (op) => {
    if (operator != null) {
      setCurrentValue(calculate(currentValue, nextValue, operator))
      setNextValue(0)
      setOperator(op)
    } else {
      setOperator(op)
    }
  }
  const onNumberClick = (target) => {
    if (operator == null) {
      return setCurrentValue(parseInt(currentValue + target))
    }
    return setNextValue(parseInt(nextValue + target))
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
          <Number value="0" onClick={onNumberClick} />
        </div>
      </div>
      <div className="operations">
        <Plus onClick={onOperatorClick} />
        <Minus onClick={onOperatorClick} />
        <Multiplier onClick={onOperatorClick} />
        <Divider onClick={onOperatorClick} />
      </div>
    </div>
  )
}

function Calculator() {
  const [currentValue, setCurrentValue] = useState(0)
  const [nextValue, setNextValue] = useState(0)
  const [operator, setOperator] = useState(null) // se è null devo mettere i numeri nel currentvalue, else nel nextvalue
  console.log(operator)
  console.log(currentValue)
  console.log(nextValue)
  const result = calculate(currentValue, nextValue, operator)
  console.log(result)
  return (
    <div>
      <TextInput
        currentValue={currentValue}
        setCurrentValue={setCurrentValue}
        nextValue={nextValue}
        setNextValue={setNextValue}
        operator={operator}
        setOperator={setOperator}
        result={result}
        onInputSubmit={() => {
          setCurrentValue(0)
          setNextValue(0)
          setOperator(null)
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
      />
    </div>
  )
}

ReactDOM.render(<Calculator />, document.getElementById("root"))
