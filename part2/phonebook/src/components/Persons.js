import React from 'react'

const Persons = ({persons}) => persons.map(person =>
    <Person
        key={person.name}
        person={person}
    />
)

const Person = ({person}) => {
    return (
        <>
            {person.name} {person.number} <br/>
        </>
        )
}

export default Persons