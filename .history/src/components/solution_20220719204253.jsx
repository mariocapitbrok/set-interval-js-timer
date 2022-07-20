import React, { Fragment, useState } from 'react'

function Solution() {
  const [configTimer, setConfigTimer] = useState({
    minutes: 3,
    seconds: 3,
  })
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const startTimer = () => {
    setMinutes(configTimer.minutes)
    setSeconds(configTimer.seconds)

    setInterval(() => {
      setMinutes(prevMinutes => prevMinutes - 1)
    }, 60000)

    setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 0) return 59
        return prevSeconds - 1
      })
    }, 1000)
  }

  const pauseTimer = () => {}

  const resetTimer = () => {
    setMinutes(configTimer.minutes)
    setSeconds(configTimer.seconds)
  }

  return (
    <Fragment>
      <label>
        <input
          type="number"
          onChange={({ target }) =>
            setConfigTimer({ ...configTimer, minutes: target.value })
          }
          value={configTimer.minutes}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          onChange={({ target }) =>
            setConfigTimer({ ...configTimer, seconds: target.value })
          }
          value={configTimer.seconds}
        />
        Seconds
      </label>

      <button onClick={startTimer}>START</button>
      <button onClick={pauseTimer}>PAUSE / RESUME</button>
      <button onClick={resetTimer}>RESET</button>

      <h1 data-testid="running-clock">{`${minutes}:${seconds}`}</h1>
    </Fragment>
  )
}

export default Solution
