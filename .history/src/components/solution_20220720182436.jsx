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
  const [config, setConfig] = useState({ minutes: 1, seconds: 30 })
  const [configHistory, setConfigHistory] = useState([])

  const [time, setTime] = useState(null)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const [timerId, setTimerId] = useState(null)
  const [start, setStart] = useState(false)
  const [pause, setPause] = useState(false)
  const [stop, setStop] = useState(false)

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
      setStart(false)
      setStop(true)
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
      resetTimer()
      setTimerId(setTimer())
      console.log('different values')
    } else {
      if (start && !stop) return
      if (minutes === 0 && seconds === 0) resetTimer()
      if (timerId) setTimerId(setTimer())
    }

    setStart(true)
    setStop(false)
    setPause(false)
  }

  const pauseTimer = () => {
    console.log('start:', start, 'stop:', stop, 'pause:', pause)

    if (!time) return
    if (!stop) stopTimer()
    if (!start) startTimer()
  }

  const resetTimer = () => {
    stopTimer()

    const newTime = config.minutes * 60 + config.seconds
    setTime(newTime)

    setMinutes(config.minutes)
    setSeconds(config.seconds)
    setStart(false)
    return
  }

  const stopTimer = () => {
    if (timerId) clearInterval(timerId)

    setStop(true)
    setStart(false)
    setPause(true)
  }

  const handleMinutesChange = minutes => {
    setConfig({ ...config, minutes: Number(minutes) })
    setStart(false)
  }

  const handleSecondsChange = seconds => {
    setConfig({ ...config, seconds: Number(seconds) })
    setStart(false)
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
