import React from 'react'

const Course = ({course}) => {
    return (
        <>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </>
      )
}
 
const Header = (props) => {
   return (
    <h1>{props.course}</h1>
   )
}

const Content = ({parts}) => parts.map(part =>
    <Part
        key={part.id} 
        part={part.name} exercises={part.exercises}
    />
)

const Part = (props) => {
    return (
    <p> {props.part} {props.exercises} </p>
    )
}

const Total = (props) => {
    return (
      <p> <strong> Number of exercises {props.parts.map(part => part.exercises).reduce((a, b) => a + b, 0)} </strong> </p>
    )
}

export default Course