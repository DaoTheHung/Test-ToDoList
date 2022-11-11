import './index.css'
import TodoList from './component/TodoList/TodoList';
import { Container, Row, Col, Input } from 'reactstrap'

import { useState, createContext } from 'react'

export const contextTask = createContext()




function App() {
  const [completed, setCompleted] = useState(true)


  return (
    <div className='app'>
      <contextTask.Provider
        value={{
          completed: completed, setCompleted: setCompleted
        }}
      >
        <Container style={{ width: '104%' }}>
          <h1>New Task</h1>
          <TodoList />
        </Container>
      </contextTask.Provider>
    </div>
  );
}

export default App;
