import React, { Fragment, useState } from 'react'

function Solution() {
  const [configTimer, setConfigTimer] = useState({
    minutes: 3,
    seconds: 10,
  })
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const startTimer = () => {
    setInterval(() => {
      setMinutes(prevMinutes => prevMinutes - 1)
    }, 60000)

    setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1)
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
          value={configTimer.min}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          onChange={({ target }) =>
            setConfigTimer({ ...configTimer, seconds: target.value })
          }
          value={configTimer.sec}
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
