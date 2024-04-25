import { useContext } from 'react'
import './App.css'
import { useState } from 'react'
import MainScreen from './components/MainScreen'
import { GameContext } from './context/GameContext'

function App() {
  const {
    gameState,
    connected,
    login
  } = useContext(GameContext)
  const [username, setUsername] = useState('')

  function handleSubmit(evt) {
    evt.preventDefault()
    login(username)
  }

  return (
    <div>
    {
      (connected)
      ? 'connected'
      : 'disconnected'
    }
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(evt) => setUsername(evt.target.value)}/>
      <button type="submit">submit</button>
    </form>
    <button>logout</button>
    <MainScreen gameState={gameState} />
    </div>
  )
}

export default App
