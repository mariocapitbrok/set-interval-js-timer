import React, { Fragment, useState, useEffect } from 'react'

function Solution() {
  const [configTimer, setConfigTimer] = useState({
    minutes: 1,
    seconds: 30,
  })
  const [timerId, setTimerId] = useState(null)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (seconds === 0) stopTimer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds])

  const startTimer = () => {
    const totalSeconds = configTimer.minutes * 60 + configTimer.seconds
    setSeconds(totalSeconds)

    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        setMinutes((prevSeconds / 60).toFixed(0))
        if (prevSeconds === 0) {
          return 0
        }
        return prevSeconds - 1
      })
    }, 10)

    setTimerId(timer)
  }

  const pauseTimer = () => {}

  const resetTimer = () => {
    setMinutes(configTimer.minutes)
    setSeconds(configTimer.seconds)
  }

  const stopTimer = () => {
    clearInterval(timerId)
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
      <button onClick={stopTimer}>STOP</button>

      <h1 data-testid="running-clock">{`${minutes}:${seconds}`}</h1>
    </Fragment>
  )
}

export default Solution
