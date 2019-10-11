import React, { useState } from 'react'
import Persons from './components/Persons'

const Filter = (props) => {
    return(
        <> 
            filter shown with: <input value={props.filteredName} onChange={props.handleFilteredChange}/>
        </>
    )
}

const PersonForm = (props) => {
    return (
      <form onSubmit={props.addPerson}>
        <div> name: <input value={props.newName} onChange={props.handleNameChange}/> </div>
        <div> number: <input value={props.newPhone} onChange={props.handlePhoneChange}/> </div>
        <div> <button type="submit">add</button> </div>
      </form>
    )
}

const App = () => {
  const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
      ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filteredName, setFilteredName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
        window.alert(`${newName} already exists in the phonebook`)
    } else {
        const newPerson = {
            name: newName,
            number: newPhone
        }
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewPhone('')
    }
  }

  const personsToShow = (filteredName !== '')
    ? persons.filter(person => person.name.toLowerCase() === filteredName.toLowerCase())
    : persons

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilteredChange = (event) => {
    setFilteredName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filteredName={filteredName} handleFilteredChange={handleFilteredChange} persons={persons}/>
      <h3>Add a new individual</h3>
        <PersonForm 
            newName={newName} handleNameChange={handleNameChange}
            newPhone={newPhone} handlePhoneChange={handlePhoneChange}
            addPerson={addPerson}
        />
      <h3>Numbers</h3>
        <Persons persons={personsToShow}/>
    </div>
  )
}

export default App