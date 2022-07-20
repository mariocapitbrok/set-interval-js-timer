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

  useEffect(() => {
    /* timerRef.current = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1)
    }, 1000)

    return () => {
      clearInterval(timerRef.current)
    } */
  }, [])

  const handleStart = () => {}

  const handlePause = () => {}

  const handleReset = () => {}

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

      <button onClick={handleStart}>START</button>
      <button onClick={handlePause}>PAUSE / RESUME</button>
      <button onClick={handleReset}>RESET</button>

      <h1 data-testid="running-clock">{`${timer.min}:${timer.sec}`}</h1>
    </Fragment>
  )
}

export default Solution
