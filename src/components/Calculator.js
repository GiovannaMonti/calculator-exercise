import { useState } from "react"

import { CalculatorBoard } from "./CalculatorBoard"
import { TextInput } from "./TextInput"

import { calculate } from "../utils"

function Calculator() {
  const [currentValue, setCurrentValue] = useState(0)
  const [nextValue, setNextValue] = useState(0)
  const [operator, setOperator] = useState(null)
  const [isResult, setIsResult] = useState(false)
  const result = calculate(currentValue, nextValue, operator)
  console.log({ operator, currentValue, nextValue, result })
  return (
    <div id="calculator">
      <TextInput
        currentValue={currentValue}
        setCurrentValue={setCurrentValue}
        nextValue={nextValue}
        setNextValue={setNextValue}
        operator={operator}
        setOperator={setOperator}
        onInputSubmit={() => {
          setCurrentValue(result)
          setNextValue(0)
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
export { Calculator }
