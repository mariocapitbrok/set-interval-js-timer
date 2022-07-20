import React, { Fragment, useState, useEffect } from 'react'

function Solution() {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
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

  const handleMinutesChange = minutes => {
    setMinutes(minutes)
  }

  const handleSecondsChange = seconds => {
    setSeconds(seconds)
  }

  const handleStart = () => {
    setInterval(() => {
      let prevMinutes = minutes
      if (prevMinutes - 1 === -1) setMinutesB(59)
      setMinutesB(prevSeconds => prevSeconds - 1)
    }, 60000)

    setInterval(() => {
      let prevSeconds = seconds
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

      <h1 data-testid="running-clock">{`${minutesB}:${secondsB}`}</h1>
    </Fragment>
  )
}

export default Solution
