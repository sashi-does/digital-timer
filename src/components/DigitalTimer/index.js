import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor() {
    super()
    this.state = {
      minutes: 25,
      seconds: 0,
      setMinutes: 25,
      startTimer: false,
      message: '',
    }
  }

  startTime = () => {
    const {startTimer} = this.state
    if (startTimer === false) {
      this.setState({startTimer: true})
      this.timerId = setInterval(() => {
        const {seconds, minutes} = this.state
        if (minutes === 0 && (seconds === 1 || seconds === 0)) {
          clearInterval(this.timerId)
          this.setState({message: "Time's up", startTimer: true})
        }
        if (seconds === 0) {
          this.setState({startTimer: true, minutes: minutes - 1, seconds: 59})
        } else {
          this.setState({
            startTimer: true,
            seconds: seconds - 1,
          })
        }
      }, 1000)
    } else {
      clearInterval(this.timerId)
      this.setState({startTimer: false})
    }
  }

  resetTime = () => {
    clearInterval(this.timerId)
    this.setState(prevState => ({
      minutes: prevState.setMinutes,
      seconds: 0,
      startTimer: false,
      message: '',
    }))
  }

  incState = () => {
    const {startTimer} = this.state
    if (!startTimer) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        setMinutes: prevState.setMinutes + 1,
      }))
    }
  }

  decState = () => {
    const {startTimer} = this.state
    if (!startTimer) {
      this.setState(prevState => ({
        minutes: prevState.minutes === 0 ? 0 : prevState.minutes - 1,
        setMinutes: prevState.setMinutes === 0 ? 0 : prevState.setMinutes - 1,
      }))
    }
  }

  render() {
    const {minutes, seconds, setMinutes, message, startTimer} = this.state
    let min = minutes
    let sec = seconds
    let display
    if (message !== '') {
      display = message
    } else {
      if (minutes < 10) min = `0${minutes}`
      if (seconds < 10) sec = `0${seconds}`
      display = `${min}:${sec}`
    }
    return (
      <div className="timer">
        <h1>Digital Timer</h1>
        <div className="digital-timer">
          <div className="timer-display">
            <div className="timer-section">
              <h1 className="time">{display}</h1>
              <p className="timer-state">
                {startTimer === true ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div>
            <div className="align-btns">
              <div className="btn-section">
                <button
                  onClick={this.startTime}
                  className="start-stop-btn"
                  type="submit"
                >
                  <img
                    className="btn-icon"
                    alt={startTimer === false ? 'play icon' : 'pause icon'}
                    src={
                      startTimer === false
                        ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                    }
                  />
                  {startTimer === false ? 'Start' : 'Pause'}
                </button>
              </div>
              <div className="btn-section">
                <button
                  onClick={this.resetTime}
                  className="start-stop-btn"
                  type="submit"
                >
                  <img
                    className="btn-icon"
                    alt="reset icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  />
                  Reset
                </button>
              </div>
            </div>
            <div className="set-timer">
              <p className="set-timer-context">Set Timer Limit</p>
              <div className="set-timer-section">
                <button
                  onClick={this.incState}
                  className="inc-dec-btn"
                  type="button"
                >
                  +
                </button>
                <p className="set-time-display">{setMinutes}</p>
                <button
                  onClick={this.decState}
                  className="inc-dec-btn"
                  type="button"
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
