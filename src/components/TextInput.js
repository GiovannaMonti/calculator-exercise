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
      <div id="current-operation">
        <p>
          {operator == null
            ? ""
            : currentValue + " " + operator + " " + nextValue}
        </p>
      </div>
      <div id="inputbar">
        <input
          id="textinput"
          type="text"
          value={operator == null ? currentValue : nextValue}
          onChange={(e) => onChange(parseInt(e.target.value))}
        ></input>
        <input id="submit" type="submit" value="=" />
      </div>
    </form>
  )
}
export { TextInput }
