import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import personService from './services/persons'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="successful">
      {message}
    </div>
  )
}

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
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filteredName, setFilteredName ] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
        window.alert(`${newName} already exists in the phonebook`)
    } else {
        const newPerson = {
            name: newName,
            number: newPhone
        }
        personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
          setNotificationMessage(
            `'${returnedPerson.name}' successfully added`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 2000)
        })
    }
  }

  const deletePerson = id => {
    if(window.confirm(`Delete ${persons.filter(p => p.id === id)[0].name}?`)) {
      personService.del(id)
      .then(setPersons(persons.filter(p => p.id !== id)))
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
        <Filter filteredName={filteredName} handleFilteredChange={handleFilteredChange}/>
      <h3>Add a new individual</h3>
        <Notification message={notificationMessage} />
        <PersonForm 
            newName={newName} handleNameChange={handleNameChange}
            newPhone={newPhone} handlePhoneChange={handlePhoneChange}
            addPerson={addPerson}
        />
      <h3>Numbers</h3>
        <Persons persons={personsToShow} personDelete={deletePerson}/>
    </div>
  )
}

export default App