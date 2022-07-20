import React, { Fragment, useState } from 'react'

function Solution() {
  const [configTimer, setConfigTimer] = useState({
    min: 3,
    sec: 10,
  })
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const startTimer = () => {
    setTimeout(() => {
      setMinutes(prevMinutes => prevMinutes - 1)
    }, 60000)

    setTimeout(() => {
      setSeconds(prevSeconds => prevSeconds - 1)
    }, 1000)
  }

  const pauseTimer = () => {}

  const resetTimer = () => {
    setMinutes(configTimer.min)
    setSeconds(configTimer.seconds)
  }

  return (
    <Fragment>
      <label>
        <input
          type="number"
          onChange={({ target }) =>
            setConfigTimer({ ...configTimer, min: target.value })
          }
          value={configTimer.min}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          onChange={({ target }) =>
            setConfigTimer({ ...configTimer, sec: target.value })
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
