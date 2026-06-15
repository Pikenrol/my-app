import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const dbPath = path.join(__dirname, 'db.json')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
const users = db.users || []

const loginHandler = (req, res) => {
  console.log('=== LOGIN ENDPOINT ===')
  console.log('Request body:', JSON.stringify(req.body))
  const { email, password } = req.body
  
  if (!email || !password) {
    console.log('Missing email or password')
    return res.status(400).json({ error: 'Email and password required' })
  }
  
  const user = users.find(u => u.email === email && u.password === password)
  
  if (!user) {
    console.log('User not found for email:', email)
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  
  console.log('Login successful for user:', user.email)
  res.json({
    accessToken: `token_${user.id}_access_${Date.now()}`,
    refreshToken: `token_${user.id}_refresh_${Date.now()}`
  })
}

const registerHandler = (req, res) => {
  const { email, password } = req.body
  
  if (users.some(u => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' })
  }
  
  const newUser = {
    id: Math.max(...users.map(u => u.id || 0), 0) + 1,
    email,
    password,
    role: 'Guest'
  }
  
  users.push(newUser)
  res.status(201).json({
    accessToken: `token_${newUser.id}_access_${Date.now()}`,
    refreshToken: `token_${newUser.id}_refresh_${Date.now()}`
  })
}

const refreshHandler = (req, res) => {
  const { refreshToken } = req.body
  
  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token' })
  }
  
  res.json({
    accessToken: `token_${Date.now()}_access_${Date.now()}`,
    refreshToken: `token_${Date.now()}_refresh_${Date.now()}`
  })
}

const meHandler = (req, res) => {
  const authHeader = req.get('Authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No authorization' })
  }
  
  const token = authHeader.substring(7)
  const userIdMatch = token.match(/token_(\d+)_/)
  
  if (!userIdMatch) {
    return res.status(401).json({ error: 'Invalid token' })
  }
  
  const userId = parseInt(userIdMatch[1], 10)
  const user = users.find(u => u.id === userId)
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  
  res.json({
    id: user.id,
    email: user.email,
    role: user.role
  })
}

app.post('/auth/login', loginHandler)
app.post('/api/auth/login', loginHandler)
app.post('/auth/register', registerHandler)
app.post('/api/auth/register', registerHandler)
app.post('/auth/refresh', refreshHandler)
app.post('/api/auth/refresh', refreshHandler)
app.get('/auth/me', meHandler)
app.get('/api/auth/me', meHandler)

const calendarEvents = db.calendarEvents || []

app.get('/api/calendarEvents', (req, res) => {
  res.json(calendarEvents)
})

app.post('/api/calendarEvents', (req, res) => {
  const newEvent = { id: Math.max(...calendarEvents.map(e => e.id || 0), 0) + 1, ...req.body }
  calendarEvents.push(newEvent)
  res.status(201).json(newEvent)
})

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  console.log('Available users:', users.map(u => ({ email: u.email, password: u.password })))
})
