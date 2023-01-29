import React, { useEffect, useState } from 'react'

const Countdown: React.FC = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevState => prevState + 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div>{time}</div>
  )
}

export default Countdown
