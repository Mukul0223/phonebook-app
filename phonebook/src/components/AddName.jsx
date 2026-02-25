import { useState } from "react"

const AddName = ({persons, addNewPerson, updatePerson}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const addPersons = (e) => {
    e.preventDefault()
  
    const existingPerson = persons.find(
      p => p.name.toLowerCase() === newName.toLowerCase()
    )
  
    if (existingPerson) {
      if (window.confirm(
        `${existingPerson.name} is already in the phonebook. Replace the old number with a new one?`
      )) {
  
        if (!newNumber) {
          alert('number missing')
          return
        }
  
        const updatedPerson = {
          ...existingPerson,
          number: newNumber
        }
  
        updatePerson(existingPerson.id, updatedPerson)
  
        setNewName('')
        setNewNumber('')
      }
  
      return
    }
  
    if (!newName || !newNumber) {
      alert('name or number missing')
      return
    }
  
    const personObject = {
      name: newName,
      number: newNumber,
    }
  
    addNewPerson(personObject)
  
    setNewName('')
    setNewNumber('')
  }
  
  const handleNewName = (e) => {
    setNewName(e.target.value)
  }
  
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }
  
  return (
    <div>
      <h2>Add New</h2>
      <form onSubmit={addPersons}>
        Name: <input value={newName} onChange={handleNewName}/>
        Number: <input value={newNumber} onChange={handleNewNumber} />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AddName