export default function ObjectArrayExpressions() {
  const user = {
    name: 'kwon',
    email: 'kwon@hc.com',
  }
  const skills = ['Python', 'JavaScript', 'HTML', 'CSS']
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="playground-block">
      <p>
        User: {user.name}({user.email})
      </p>
      <p>First Skill: {skills[0]}</p>
      <p>Skill Number: {skills.length}</p>
      <p>Doubles: {numbers.map((n) => n * 2).join(', ')}</p>
      <p>Even: {numbers.filter((n) => n % 2 === 0).join(', ')}</p>
    </div>
  )
}
