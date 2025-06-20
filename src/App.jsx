import { useState } from 'react'
import './App.css'
import logo from './assets/logo-main.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className = "titleContainer">
        <div className = "logo"><img src={logo} alt="Logo" /></div>
        <div className = "title">Pattern Pulse</div>
      </div>
    </>
  )
}

export default App
