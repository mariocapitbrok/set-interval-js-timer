import React, { Fragment, useState, useEffect } from 'react'

function Solution() {
  const [minutesA, setMinutesA] = useState(0)
  const [secondsA, setSecondsA] = useState(0)
  const [minutesB, setMinutesB] = useState(0)
  const [secondsB, setSecondsB] = useState(0)
  //const [timer, setTimer] = useState(null)

  useEffect(() => {
    /* timerRef.current = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1)
    }, 1000)

    return () => {
      clearInterval(timerRef.current)
    } */
  }, [])

  const handleStart = () => {
    setTimeout(() => {
      let prevMinutes = minutesA
      if (prevMinutes - 1 === -1) setMinutesB(59)
      setMinutesB(prevSeconds => prevSeconds - 1)
    }, 60000)

    setTimeout(() => {
      let prevSeconds = secondsA
      if (prevSeconds - 1 === -1) setSecondsB(59)
      setSecondsB(prevSeconds => prevSeconds - 1)
    }, 1000)
  }

  const handlePause = () => {}

  const handleReset = () => {}

  return (
    <Fragment>
      <label>
        <input
          type="number"
          onChange={event => setMinutesA(event.target.value)}
          value={minutesA}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          onChange={event => setSecondsA(event.target.value)}
          value={secondsA}
        />
        Seconds
      </label>

      <button onClick={handleStart}>START</button>
      <button onClick={handlePause}>PAUSE / RESUME</button>
      <button onClick={handleReset}>RESET</button>

      <h1 data-testid="running-clock">{`${minutesB}:${secondsB}`}</h1>
    </Fragment>
  )
}

export default Solution
