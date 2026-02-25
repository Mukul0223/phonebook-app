const express = require('express')
const app = express()

let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": "1"
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": "2"
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": "3"
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": "4"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/api/phonebook', (request, response) => {
  response.json(persons)
})

app.get('/api/phonebook/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/phonebook/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)
  
  res.status(204).end()
})


const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => Number(p.id)))
    : 0
  return String(maxId + 1)
}

app.use(express.json())
app.post('/api/phonebook', (request, response) => {
  try {
    const body = request.body
    console.log(body)

    if (!body.name || !body.number) {
      return response.status(400).json({ error: 'name or number missing' })
    }

    const newPerson = {
      name: body.name,
      number: body.number,
      id: generateId()
    }

    persons = persons.concat(newPerson)
    response.json(newPerson)

  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'something went wrong' })
  }
})

app.put('/api/phonebook/:id', (request, response) => {
  const id = request.params.id
  const body = request.body
  
  persons = persons.map(p => p.id === id ? { ...p, number: body.number } : p)
  const updatedPerson = persons.find(p => p.id === id)
  response.json(updatedPerson)
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})