import React from 'react'

const Persons = ({persons, personDelete}) => persons.map(person =>
    <Person
        key={person.id}
        person={person}
        personDelete={() => personDelete(person.id)}
    />
)

const Person = ({ person, personDelete }) => {
    return (
        <>
            {person.name} {person.number} 
            <button onClick={personDelete}>delete</button> <br/>
        </>
        )
}

export default Persons