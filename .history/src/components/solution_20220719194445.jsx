import React, { Fragment, useState, useEffect } from 'react'

function Solution() {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  //const [timer, setTimer] = useState(null)
  //const timerRef = useRef()

  useEffect(() => {
    /* timerRef.current = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1)
    }, 1000)

    return () => {
      clearInterval(timerRef.current)
    } */
  }, [])

  const handleMinutesChange = minutes => {
    setMinutes(minutes)
  }

  const handleSecondsChange = seconds => {
    setSeconds(seconds)
  }

  const handleStart = () => {
    setInterval(() => {
      setMinutes(prevMinutes => prevMinutes - 1)
    }, 60000)
    setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1)
    }, 1000)
  }

  const handlePause = () => {}

  const handleReset = () => {}

  return (
    <Fragment>
      <label>
        <input
          type="number"
          onChange={event => handleMinutesChange(event.target.value)}
          value={minutes}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          onChange={event => handleSecondsChange(event.target.value)}
          value={seconds}
        />
        Seconds
      </label>

      <button onClick={handleStart}>START</button>
      <button onClick={handlePause}>PAUSE / RESUME</button>
      <button onClick={handleReset}>RESET</button>

      <h1 data-testid="running-clock">{`${minutes}:${seconds}`}</h1>
    </Fragment>
  )
}

export default Solution
