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
export { Number }
