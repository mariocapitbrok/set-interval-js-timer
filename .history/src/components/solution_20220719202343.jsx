import React, { Fragment, useState } from 'react'

function Solution() {
  const [configTimer, setConfigTimer] = useState({
    min: 3,
    sec: 10,
  })
  const [timer, setTimer] = useState({
    min: 0,
    sec: 0,
  })

  const startTimer = () => {
    setTimeout(() => {
      setTimer({ min: configTimer.min })
    }, 60000)

    setTimeout(() => {
      setTimer({ sec: configTimer.sec })
    }, 1000)
  }

  const pauseTimer = () => {}

  const resetTimer = () => {
    setTimer({ min: configTimer.min, sec: configTimer.sec })
    //setConfigTimer({ min: 0, sec: 0 })
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

      <h1 data-testid="running-clock">{`${timer.min}:${timer.sec}`}</h1>
    </Fragment>
  )
}

export default Solution
