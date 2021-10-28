function Operator({ currentValue, onClick, symbol }) {
  const isErr = currentValue === "Err" ? true : false
  return (
    <button disabled={isErr} onClick={() => onClick(symbol)}>
      {symbol}
    </button>
  )
}

export { Operator }
