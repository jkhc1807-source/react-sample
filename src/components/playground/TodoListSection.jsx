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
