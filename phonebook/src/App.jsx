import { useState, useEffect } from "react"
import phoneService from './services/phone'
import AddName from "./components/AddName"
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([])
  
  useEffect(() => {
    phoneService.getAll().then(data => {
        console.log("Returned data:", data)
        console.log("Is array?", Array.isArray(data))
        setPersons(data)
    })
      .catch(error => {
      console.error('Failed to fetch phonebook', error)
    })
  }, [])
  
  const handleNewPerson = (newPerson) => {
    phoneService.create(newPerson).then(data => setPersons(persons=>persons.concat(data)))
  }
  
  const handleDeletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}`)) {
      phoneService.remove(id).then(() => setPersons(persons => persons.filter(p => p.id !== id)))
    }
  }
  
  const updatePerson = (id, updatedPerson) => {
    phoneService.update(id, updatedPerson).then(returnedPerson => {
      setPersons(persons => persons.map(p => p.id !== id ? p: returnedPerson))
    })
  }
  
  return (
    <div>
      <Filter persons={persons} />
      <AddName persons={persons} addNewPerson={handleNewPerson} updatePerson={updatePerson} />
      <h1>Phonebook</h1>
      <ul>
        {persons.map((p) => <li key={p.id}>{p.name} {p.number} <button onClick={() => handleDeletePerson(p.id)}>delete</button></li>)}
      </ul>
    </div>
  )
  
}

export default App
