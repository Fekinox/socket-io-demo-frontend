import { createContext, useEffect, useState } from "react";
import { socket } from '../services/socket.js'

export const GameContext = createContext(null)

/** Provides a reference to the current game state and operations on that
* state to all children. */
export function GameContextProvider({ children }) {
  // Current connection status.
  const [connected, setConnected] = useState(socket.connected)
  // Current username.
  const [username, setUsername] = useState('')
  // Current logged-in state.
  const [loggedIn, setLoggedIn] = useState(false)
  // Current game state.
  const [gameState, setGameState] = useState(null)

  /** Sends a login request to the server. */
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

  // Initialize all event handlers, and automatically dispose of them once
  // we are done.
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
      username,

      login,
    }}>
      {children} 
    </GameContext.Provider>
  )
}
