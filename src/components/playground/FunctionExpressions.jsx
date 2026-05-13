export default function FunctionExpressions() {
  const getGreeting = (name) => `Hello, ${name}!`
  const formatDate = (date) => new Date(date).toLocaleDateString()
  const calculateTotal = (items) => items.reduce((sum, item) => sum + item.price, 0)
  const items = [
    { id: 1, price: 1000 },
    { id: 2, price: 2000 },
  ]

  return (
    <div className="playground-block">
      <p>{getGreeting('Nico')}</p>
      <p>Today: {formatDate(new Date())}</p>
      <p>Total: ${calculateTotal(items)}</p>
      <p>
        Good{' '}
        {(() => {
          const hour = new Date().getHours()
          return hour < 12 ? 'Morning' : 'Afternoon'
        })()}
      </p>
    </div>
  )
}
