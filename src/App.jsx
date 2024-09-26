import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { TaskProvider } from './context/TaskContext'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Task from './components/Task/Task'

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/tasks' element={<Task />}/>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
