import { io } from 'socket.io-client'

const BACKEND_URL = 'http://localhost:3000'

// Autoconnects to the given backend url.
export const socket = io(BACKEND_URL)
