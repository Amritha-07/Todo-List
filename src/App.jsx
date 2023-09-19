import { useState } from 'react'
import  {useEffect} from 'react'
import './styles.css'
import { NewTodoForm } from './components/NewTodoForm'
import { TodoList } from './components/TodoList'

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem('ITEMS')
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todos))
  }, [todos])

  function addToDo(title) {
    setTodos((currentTodo) => {
      return [
          ...todos, 
          {id: crypto.randomUUID(), title: title, completed: false}
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id == id) {
          todo.completed = completed
          return {...todo, completed}
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  console.log(todos)

  return (
    <>
      <NewTodoForm addToDo={addToDo} />
      <h1 className='header'>Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  )
}

