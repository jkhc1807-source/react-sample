export default function BasicExpressions() {
  const name = 'Byungheon'
  const age = 27
  const isAdmin = true

  return (
    <div className="playground-block">
      <p>Name: {name}</p>
      <p>Age: {age + 1}</p>
      <p>{name + "'s Profile"}</p>
      <p>{`${name} is ${age} years old`}</p>
      <p>Admin status: {String(isAdmin)}</p>
    </div>
  )
}
