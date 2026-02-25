import { useState } from "react";

const Filter = ({ persons }) => {
  const [filterValue, setFilterValue] = useState('')
  
  const handleNewValue = (e) => {
    setFilterValue(e.target.value)
  }
  
  const filterPersons = persons.filter((p) => p.name.toLowerCase().includes(filterValue.toLowerCase()) || p.number.includes(filterValue))
  
  return (
    <div>
      <h2>Search</h2>
      <form>
        Filter with: <input value={filterValue} onChange={handleNewValue}/>
      </form>
      <ul>
        {filterPersons.map(f => <li key={f.id}>{f.name} {f.number}</li>)}
      </ul>
    </div>
  )
}

export default Filter