/** 샘플 모음 페이지 — 각 블록 복붙용 소스 */

export const PG_REACT_LOGO = `// src/components/playground/ReactLogoHero.jsx
import reactLogo from '../../assets/react.svg'

export default function ReactLogoHero() {
  return (
    <section className="playground-hero">
      <img
        src={reactLogo}
        alt="React logo"
        className="playground-hero__logo"
        width={256}
        height={256}
      />
    </section>
  )
}
`

export const PG_SAMPLE_BUTTONS = `// src/components/playground/SampleButtonsRow.jsx
import ButtonA from '../../ButtonA.jsx'
import ButtonB from '../../ButtonB.jsx'

export default function SampleButtonsRow() {
  return (
    <div className="playground-section--row">
      <ButtonA />
      <ButtonB />
    </div>
  )
}

// 참고: src/ButtonA.jsx, src/ButtonB.jsx (CSS 모듈 스타일)
`

export const PG_USERNAME = `// src/components/playground/UsernameReadonlyField.jsx
export default function UsernameReadonlyField() {
  const disableInput = false

  return (
    <div>
      <label htmlFor="username" className="playground-label">
        username:
      </label>
      <input
        type="text"
        id="username"
        name="username"
        disabled={disableInput}
        className="playground-input"
        autoComplete="off"
        maxLength={10}
        spellCheck={false}
        readOnly
        tabIndex={0}
        placeholder={disableInput ? '입력할 수 없습니다.' : 'Enter your username'}
      />
    </div>
  )
}
`

export const PG_BOOKS = `// src/components/playground/BooksPublishedSection.jsx
const books = [
  { id: 1, title: 'Book1', published: true, publisher: 'Pub1' },
  { id: 2, title: 'Book2', published: false, publisher: 'Pub2' },
  { id: 3, title: 'Book3', published: false, publisher: 'Pub3' },
]

export default function BooksPublishedSection() {
  const publishedBooks = books.filter((book) => book.published)

  return (
    <div className="playground-section--books">
      {publishedBooks.length > 0 && <h2>Published Books</h2>}
      {publishedBooks.length ? (
        <div className="playground-books">
          {publishedBooks.map((book) => (
            <article key={book.id} className="playground-books__card">
              <h3>{book.title}</h3>
              <p>{book.publisher}</p>
            </article>
          ))}
        </div>
      ) : (
        <p>게시된 책이 없습니다.</p>
      )}
    </div>
  )
}
`

export const PG_BASIC = `// src/components/playground/BasicExpressions.jsx
export default function BasicExpressions() {
  const name = 'Byungheon'
  const age = 27
  const isAdmin = true

  return (
    <div className="playground-block">
      <p>Name: {name}</p>
      <p>Age: {age + 1}</p>
      <p>{name + "'s Profile"}</p>
      <p>{\`\${name} is \${age} years old\`}</p>
      <p>Admin status: {String(isAdmin)}</p>
    </div>
  )
}
`

export const PG_OBJECT_ARRAY = `// src/components/playground/ObjectArrayExpressions.jsx
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
`

export const PG_FUNCTIONS = `// src/components/playground/FunctionExpressions.jsx
export default function FunctionExpressions() {
  const getGreeting = (name) => \`Hello, \${name}!\`
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
      <p>Total: $\{calculateTotal(items)}</p>
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
`

export const PG_ELEMENT = `// src/components/playground/ElementExpressions.jsx
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
`

export const PG_INFO_CARDS = `// src/components/playground/InfoCardsSection.jsx
import InfoCard from '../../InfoCard.jsx'

export default function InfoCardsSection() {
  return (
    <div className="playground-section--cards">
      <InfoCard
        title="Props in React"
        content="Props pass data from one component to another."
        author="Alice"
      />
      <InfoCard
        title="React Composition"
        content="Composition makes your components more reusable."
        author="Charlie"
      />
    </div>
  )
}
`

export const PG_COUNTER = `// src/components/playground/CounterPinSection.jsx
import { useState } from 'react'

export default function CounterPinSection() {
  const [count, setCount] = useState(0)
  const [isPinned, setPinned] = useState(false)

  return (
    <div>
      <h2>Count: {count}</h2>
      <div className="playground-section__row">
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          +
        </button>
        <button type="button" onClick={() => setCount((c) => c - 1)}>
          -
        </button>
      </div>
      <button type="button" onClick={() => setPinned((p) => !p)}>
        {isPinned && '📌'} 핀 토글
      </button>
    </div>
  )
}
`

export const PG_TODO = `// src/components/playground/TodoListSection.jsx
import { useState, useEffect } from 'react'

export default function TodoListSection() {
  const [todos, setTodos] = useState(['Learn React', 'Build a project'])
  const [newTodo, setNewTodo] = useState('')
  const [todoNotice, setTodoNotice] = useState(null)

  useEffect(() => {
    if (!todoNotice) return
    const timer = setTimeout(() => setTodoNotice(null), 2500)
    return () => clearTimeout(timer)
  }, [todoNotice])

  const addTodo = (text) => {
    const trimmed = String(text).trim()
    if (!trimmed) {
      setTodoNotice('내용을 입력해 주세요.')
      return
    }
    setTodos([...todos, trimmed])
    setNewTodo('')
  }

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index))
  }

  return (
    <div className="playground-section--todo">
      <h3>Todo List</h3>
      <ul className="playground-todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="playground-todo-list__item">
            <span>{todo}</span>
            <button type="button" onClick={() => deleteTodo(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <p className="playground-todo-typing">Typing: {newTodo}</p>
      <div className="playground-todo-form">
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="새 할 일" />
        <button type="button" onClick={() => addTodo(newTodo)}>
          Add New Task
        </button>
      </div>
      {todoNotice && (
        <div className="todo-toast" role="status">
          {todoNotice}
        </div>
      )}
    </div>
  )
}
`
