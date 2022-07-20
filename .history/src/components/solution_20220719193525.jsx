import React, { Fragment, useState, useRef, useEffect } from 'react'

function Solution() {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [timer, setTimer] = useState(null)
  const timerRef = useRef()

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1)
    }, 1000)

    return () => {
      clearInterval(timerRef.current)
    }
  }, [])

  const handleMinutesChange = minutes => {
    setMinutes(minutes)
  }

  const handleSecondsChange = seconds => {
    setSeconds(seconds)
  }

  const handleStart = () => {
    console.log(minutes, seconds)
  }

  const handlePause = () => {}

  const handleReset = () => {}

  return (
    <Fragment>
      <label>
        <input
          type="number"
          onMinutesChange={event => handleMinutesChange(event.target.value)}
          value={minutes}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          onSecondsChange={({ target }) => handleSecondsChange(target.value)}
          value={seconds}
        />
        Seconds
      </label>

      <button onClick={handleStart}>START</button>
      <button onClick={handlePause}>PAUSE / RESUME</button>
      <button onClick={handleReset}>RESET</button>

      <h1 data-testid="running-clock">{timer}</h1>
    </Fragment>
  )
}

export default Solution
