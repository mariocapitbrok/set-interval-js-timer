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
  const [config, setConfig] = useState({ minutes: 0, seconds: 0 })
  const [configHistory, setConfigHistory] = useState([])

  const [time, setTime] = useState(null)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const [timerId, setTimerId] = useState(null)
  const [timerHistory, setTimerHistory] = useState([])
  const [timerIsRunning, setTimerIsRunning] = useState(false)
  const [pause, setPause] = useState(false)

  const countDown = newTimerId => {
    if (!time) {
      clearInterval(newTimerId)
      timerHistory.forEach(i => clearInterval(i))
      setTimerId(null)
      setTimerIsRunning(false)
      setTime(0)
      return
    } else {
      setTime(time => {
        while (time > 0) {
          return time - 1
        }
        return null
      })
    }
  }

  const setTimer = () => {
    const newTimerId = setInterval(() => countDown(newTimerId), 100)
    setTimerId(newTimerId)
    setTimerHistory([...timerHistory, newTimerId])
    setConfigHistory([...configHistory, config])
    return newTimerId
  }

  useEffect(() => {
    const newTime = config.minutes * 60 + config.seconds
    setTime(newTime)
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

  const startTimer = origin => {
    if (!time) {
      resetTimer()
      return
    }
    if (differentValues() && origin !== 'pause') {
      resetTimer()
    } else {
      if (timerIsRunning) return
      if (origin !== 'pause') resetTimer()
    }

    setTimerId(setTimer())
    setTimerIsRunning(true)
  }

  const pauseTimer = () => {
    if (!time) return
    if (timerIsRunning) stopTimer()
    if (!timerIsRunning) startTimer('pause')
    setPause(!pause)
  }

  const resetTimer = () => {
    const newTime = config.minutes * 60 + config.seconds
    setTime(newTime)
    if (timerIsRunning) stopTimer()

    setMinutes(config.minutes)
    setSeconds(config.seconds)

    return
  }

  const stopTimer = () => {
    clearInterval(timerId)

    setTimerIsRunning(false)
  }

  const handleMinutesChange = minutes => {
    const newMinutes = minutes < 0 ? 0 : minutes
    setConfig({ ...config, minutes: Number(newMinutes) })
  }

  const handleSecondsChange = seconds => {
    const newSeconds = seconds < 0 ? 0 : seconds
    setConfig({ ...config, seconds: Number(newSeconds) })
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

      <button
        onClick={startTimer}
        disabled={
          !time || timerIsRunning || (!timerIsRunning && !pause) ? true : false
        }
      >
        START
      </button>
      <button onClick={pauseTimer}>PAUSE / RESUME</button>
      <button onClick={resetTimer}>RESET</button>

      <h1 data-testid="running-clock">{`${twoDigits(minutes)}:${twoDigits(
        seconds
      )}`}</h1>
    </Fragment>
  )
}

export default Solution
