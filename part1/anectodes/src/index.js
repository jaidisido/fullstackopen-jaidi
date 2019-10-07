import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = (props) => {
    return (
        <>
            {props.anecdote} <br/>
            has {props.numVotes} votes <br/>
        </>
    )
}
const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))
  const [highestVote, setHighestVote] = useState(0)
  
  const selectRandom = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  const cumulateVotes = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)

    setHighestVote(newVotes.indexOf(Math.max(...newVotes)))
  }

  return (
    <div>
      <h1> Anectode of the Day </h1>
      <Anecdote anecdote={props.anecdotes[selected]} numVotes={votes[selected]} />
      <Button handleClick={cumulateVotes} text="vote" />      
      <Button handleClick={selectRandom} text="next anecdote" />
      <h1> Anectode with Most Votes </h1>
      <Anecdote anecdote={props.anecdotes[highestVote]} numVotes={votes[highestVote]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
