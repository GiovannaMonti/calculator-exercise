function Operator({ onClick, symbol }) {
  return <button onClick={() => onClick(symbol)}>{symbol}</button>
}

export { Operator }
