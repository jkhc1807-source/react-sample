const element1 = <p>이것은 JSX입니다.</p>
const element2 = (
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
)

export default function ElementExpressions() {
  return (
    <div className="playground-block">
      {element1}
      {element2}
    </div>
  )
}
