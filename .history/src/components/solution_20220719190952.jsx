import React, { Fragment, useState, useRef, useEffect } from 'react'

function Solution() {
  const [timer, setTimer] = useState(null)
  const timerRef = useRef()

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1)
    }, 1000)

    return () => {
      clearInterval(timerRef.current)
    }
  }, [])

  return (
    <Fragment>
      <label>
        <input type="number" />
        Minutes
      </label>
      <label>
        <input type="number" />
        Seconds
      </label>

      <button>START</button>
      <button>PAUSE / RESUME</button>
      <button>RESET</button>

      <h1 data-testid="running-clock">{timer}</h1>
    </Fragment>
  )
}

export default Solution
