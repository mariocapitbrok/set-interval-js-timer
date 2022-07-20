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
  const [config, setConfig] = useState({
    minutes: 1,
    seconds: 30,
  })

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
    const newTimerId = setInterval(countDown, 1000)
    return newTimerId
  }

  useEffect(() => {
    const newTime = config.minutes * 60 + config.seconds
    setTime(newTime)
    setTimerId(setTimer())
  }, [])

  useEffect(() => {
    setMinutes(calculateTime(time).minutes)
    setSeconds(calculateTime(time).seconds)

    if (minutes === 0 && seconds === 0) {
      if (timerId) stopTimer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])

  const startTimer = () => {
    if (start && !stop) return

    if (minutes === 0 && seconds === 0) resetTimer()
    if (timerId) setTimerId(setTimer())

    setStart(true)
    setStop(false)
  }

  const pauseTimer = () => {
    if (!time) return
    if (!stop) stopTimer()
    if (!start) startTimer()

    setPause(!pause)
  }

  const resetTimer = () => {
    stopTimer()

    const newTime = config.minutes * 60 + config.seconds
    setTime(newTime)

    setMinutes(config.minutes)
    setSeconds(config.seconds)
    return
  }

  const stopTimer = () => {
    if (timerId) clearInterval(timerId)

    setStop(true)
    setStart(false)
  }

  return (
    <Fragment>
      <label>
        <input
          type="number"
          onChange={({ target }) =>
            setConfig({ ...config, minutes: Number(target.value) })
          }
          value={config.minutes}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          onChange={({ target }) =>
            setConfig({ ...config, seconds: Number(target.value) })
          }
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
