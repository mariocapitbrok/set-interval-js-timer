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

  const calculateTime = prevSeconds => {
    const minutes = Math.floor(prevSeconds / 60)
    const seconds = prevSeconds - minutes * 60

    return { minutes, seconds }
  }

  const twoDigits = number => {
    return number < 10 ? '0' + number : String(number)
  }

  useEffect(() => {
    setMinutes(calculateTime(totalSeconds).minutes)
    setSeconds(calculateTime(totalSeconds).seconds)
    if (minutes === 0 && seconds === 0) stopTimer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSeconds])

  const startTimer = () => {
    const totalSeconds = configTimer.minutes * 60 + configTimer.seconds
    setTotalSeconds(totalSeconds)

    const timer = setInterval(() => {
      setTotalSeconds(prevSeconds => {
        if (prevSeconds === 0) return 0
        return prevSeconds - 1
      })
    }, 100)

    if (timer) setTimerId(timer)
  }

  const pauseTimer = () => {}

  const resetTimer = () => {
    setMinutes(configTimer.minutes)
    setSeconds(configTimer.seconds)
  }

  const stopTimer = () => {
    if (timer) console.log(timerId)
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

      <h1 data-testid="running-clock">{`${twoDigits(minutes)}:${twoDigits(
        seconds
      )}`}</h1>
    </Fragment>
  )
}

export default Solution
