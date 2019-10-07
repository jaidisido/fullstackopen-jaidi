import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

const Statistic = (props) => {
    return (
    <tr> 
        <th> {props.text} </th>
        <th> {props.value} </th> 
    </tr>
    )
}

const Statistics = (props) => {
    let total = props.good + props.neutral + props.bad

    if (total > 0){
        return (
        <table> 
            <tbody>
            <Statistic text="Good:" value={props.good} />
            <Statistic text="Neutral:" value={props.neutral} />
            <Statistic text="Bad:" value={props.bad} />
            <Statistic text="Total:" value={total} />
            <Statistic text="Average:" value={(props.good + props.neutral*0 + props.bad*-1)/total} />
            <Statistic text="Positive:" value={(props.good/total*100).toFixed(1) + '%'} />
            </tbody>
        </table>
    )}
    else {
        return (
        <>
            <p> No Feedback provided </p>
        </>
    )}
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> Give Feedback </h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <h1> Statistics </h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
