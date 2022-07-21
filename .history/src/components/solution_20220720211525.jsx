import React, { Fragment, useState, useEffect } from 'react'

const calculateTime = prevSeconds => {
  const minutes = Math.floor(prevSeconds / 60)
  const seconds = prevSeconds - minutes * 60

  return { minutes, seconds }
}

const twoDigits = number => {
  return number < 10 ? '0' + number : String(number)
}

function Solution() {
  const [config, setConfig] = useState({ minutes: 0, seconds: 1 })
  const [configHistory, setConfigHistory] = useState([])

  const [time, setTime] = useState(null)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const [timerId, setTimerId] = useState(null)
  const [timerIsRunning, setTimerIsRunning] = useState(false)

  const countDown = () => {
    setTime(time => {
      while (time > 0) {
        return time - 1
      }
      return null
    })

    if (time === 0) {
      clearInterval(timerId)
      setTimerId(null)
      setTimerIsRunning(false)
      setTime(0)
      return
    }
  }

  const setTimer = () => {
    const newTimerId = setInterval(countDown, 100)
    setConfigHistory([...configHistory, config])
    return newTimerId
  }

  useEffect(() => {
    const newTime = config.minutes * 60 + config.seconds
    setTime(newTime)
    setTimerId(setTimer())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setMinutes(calculateTime(time).minutes)
    setSeconds(calculateTime(time).seconds)

    if (minutes === 0 && seconds === 0) {
      if (timerId) stopTimer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])

  const differentValues = () => {
    return config !== configHistory[configHistory.length - 1]
  }

  const startTimer = () => {
    if (differentValues()) {
      console.log('different values')
      resetTimer()
      if (!time) return
      setTimerId(setTimer())
    } else {
      console.log('else')
      if (timerIsRunning) return
      if (minutes === 0 && seconds === 0) resetTimer()
      if (timerId) setTimerId(setTimer())
    }

    setTimerIsRunning(true)
  }

  const pauseTimer = () => {
    if (!time) return
    if (timerIsRunning) stopTimer()
    if (!timerIsRunning) startTimer()
  }

  const resetTimer = () => {
    stopTimer()
    console.log(config)
    const newTime = config.minutes * 60 + config.seconds
    setTime(newTime)

    setMinutes(config.minutes)
    setSeconds(config.seconds)

    return
  }

  const stopTimer = () => {
    if (timerId) clearInterval(timerId)

    setTimerIsRunning(false)
  }

  const handleMinutesChange = minutes => {
    setConfig({ ...config, minutes: Number(minutes) })
  }

  const handleSecondsChange = seconds => {
    setConfig({ ...config, seconds: Number(seconds) })
  }

  return (
    <Fragment>
      <label>
        <input
          type="number"
          onChange={({ target }) => handleMinutesChange(target.value)}
          value={config.minutes}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          onChange={({ target }) => handleSecondsChange(target.value)}
          value={config.seconds}
        />
        Seconds
      </label>

      <button onClick={startTimer}>START</button>
      <button onClick={pauseTimer}>PAUSE / RESUME</button>
      <button onClick={resetTimer}>RESET</button>

      <h1 data-testid="running-clock">{`${twoDigits(minutes)}:${twoDigits(
        seconds
      )}`}</h1>
    </Fragment>
  )
}

export default Solution
