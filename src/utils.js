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
export { calculate }
