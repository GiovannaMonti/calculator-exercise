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
  isResult,
  setIsResult,
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

// creare componente unico per le operazioni - evitare le duplicazioni dei componenti che svolgono operazioni
// semplificare il codice nei punti in cui non è scritto in modo comprensibile
// gestire casi particolari delle operazioni
// aggiungere tasto canc
