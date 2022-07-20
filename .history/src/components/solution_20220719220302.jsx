import React, { Fragment, useState, useEffect } from 'react'

function Solution() {
  const [configTimer, setConfigTimer] = useState({
    minutes: 1,
    seconds: 30,
  })
  const [timerId, setTimerId] = useState(null)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (minutes === 0 && seconds === 0) stopTimer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSeconds])

  const startTimer = () => {
    const totalSeconds = configTimer.minutes * 60 + configTimer.seconds
    setTotalSeconds(totalSeconds)

    const timer = setInterval(() => {
      setTotalSeconds(prevSeconds => {
        setMinutes(Math.floor(prevSeconds / 60))
        if (prevSeconds === 0) {
          return 0
        }
        console.log(
          prevSeconds,
          prevSeconds - Math.floor(prevSeconds / 60) * 60 - 1
        )
        if (prevSeconds <= 60) {
          setSeconds(prevSeconds - 1)
          return prevSeconds - 1
        } else {
          setSeconds(prevSeconds - Math.floor(prevSeconds / 60) * 60 - 1)
          return prevSeconds - Math.floor(prevSeconds / 60) - 1
        }
      })
    }, 100)

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

  //console.log(totalSeconds)

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
