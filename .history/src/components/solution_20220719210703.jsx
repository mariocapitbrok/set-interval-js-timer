import React, { Fragment, useState } from 'react'

function Solution() {
  const [configTimer, setConfigTimer] = useState({
    minutes: 3,
    seconds: 3,
  })
  const [timer, setTimer] = useState(null)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const startTimer = () => {
    const totalSeconds = (configTimer.minutes * 60 + configTimer.seconds) * 10

    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          console.log('Timer is 0')
        }
        return prevSeconds - 1
      })
    }, totalSeconds)

    setTimer(timer)
  }

  const pauseTimer = () => {}

  const resetTimer = () => {
    setMinutes(configTimer.minutes)
    setSeconds(configTimer.seconds)
  }

  const stopTimer = () => {
    clearInterval(timer)
    return 'Timer stoped'
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
