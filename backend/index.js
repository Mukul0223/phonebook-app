require('dotenv').config()
const express = require('express')
const Phone = require('./models/phone')

const app = express()

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  
  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformated  id'})
  }
  next(error)
}

app.use(express.json())
app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/api/phonebook', (request, response) => {
  Phone.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/phonebook/:id', (request, response, next) => {
  Phone.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person) 
    }
    else {
      response.status(404).end()
    }
  })
  .catch(error=>next(error))
})

app.delete('/api/phonebook/:id', (req, res) => {
  Phone.findByIdAndDelete(req.params.id).then((result) => {
    res.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/phonebook', (request, response) => {
  try {
    const body = request.body
    console.log(body)

    if (!body.name || !body.number) {
      return response.status(400).json({ error: 'name or number missing' })
    }

    const newPerson = new Phone ({
      name: body.name,
      number: body.number,
    })


    newPerson.save().then(savedPerson => {
      response.json(savedPerson)
    })

  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'something went wrong' })
  }
})

app.put('/api/phonebook/:id', (request, response, next) => {
  const { name, number } = request.body
  Phone.findById(request.params.id).then((person) => {
    if (!person) {
      return response.status(404).end()
    }
    person.name = name
    person.number = number
    
    return person.save().then((updatedPerson) => {
      response.json(updatedPerson)
    })
  })
  .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  Phone.countDocuments({}).then(count => {
    const date = new Date()
    res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${date}</p>
    `)
  })
  .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})