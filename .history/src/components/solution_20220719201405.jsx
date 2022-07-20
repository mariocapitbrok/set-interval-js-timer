import React, { Fragment, useState, useEffect } from 'react'

function Solution() {
  const [configTimer, setConfigTimer] = useState({
    min: 0,
    sec: 0,
  })
  const [timer, setTimer] = useState({
    min: 0,
    sec: 0,
  })

  const startTimer = () => {}

  const pauseTimer = () => {}

  const resetTimer = () => {}

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

      <h1 data-testid="running-clock">{`${timer.min}:${timer.sec}`}</h1>
    </Fragment>
  )
}

export default Solution
