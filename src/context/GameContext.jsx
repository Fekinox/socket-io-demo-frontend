import { createContext, useEffect, useState } from "react";
import { socket } from '../services/socket.js'

export const GameContext = createContext(null)

export function GameContextProvider({ children }) {
  const [connected, setConnected] = useState(socket.connected)
  const [username, setUsername] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [gameState, setGameState] = useState(null)

  function login(username) {
    socket.emit('login', { username }, (resp) => {
      console.log(resp)
      if (resp.message === 'ok') {
        setUsername(username)
        setLoggedIn(true)
      } else {
        setUsername('')
        setLoggedIn(false)
      }
    })
  }

  useEffect(() => {
    function onConnect() {
      setConnected(true)
    }

    function onDisconnect() {
      setConnected(false)
    }

    function handleGameState(state) {
      setGameState(state)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('gamestate', handleGameState)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('gamestate', handleGameState)
    }
  }, [])

  return (
    <GameContext.Provider value={{
      gameState,
      connected,
      loggedIn,
      login,
      username,
    }}>
      {children} 
    </GameContext.Provider>
  )
}
