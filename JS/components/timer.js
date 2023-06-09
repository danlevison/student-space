const timerContainer = document.getElementById("timer")
const countdown = document.getElementById("countdown")
const countdownInput = document.getElementById("countdown-input")
let time = "" // set countdown time
let countdownInterval = ""

// Event listeners
document.getElementById("open-timer-btn").addEventListener("click", openTimer)
document.getElementById("close-timer-btn").addEventListener("click", closeTimer) 

// Functions
function openTimer() {
  timerContainer.showModal()
}

function closeTimer() {
    timerContainer.close()
}

function timer() {
    const startBtn = document.querySelector(".timer-btn-start")
    const pauseBtn = document.querySelector(".timer-btn-pause")
    const resetBtn = document.querySelector(".timer-btn-reset")
  
    countdownInput.addEventListener("input", (e) => {
      time = countdownInput.value * 60 // update countdown time

      if(e.target.value < 0) { //prevents negative numbers being entered into input
        e.target.value = 0
      }
    })

    startBtn.addEventListener("click", () => {
      if(countdownInput.value  < 1) {
        alert("Enter a time in minutes")
      } else {
        countdownInterval = setInterval(updateCountdown, 1000)
        startBtn.style.display = "none"
        pauseBtn.style.display = "inline-block"
      }       
    })

    pauseBtn.addEventListener("click", () => {
      clearInterval(countdownInterval)
      startBtn.style.display = "inline-block"
      pauseBtn.style.display = "none"

    })

    resetBtn.addEventListener("click", () => {
      countdown.innerHTML = `${countdownInput.value}:00`
      if(countdownInput.value == 0) {
        countdown.innerHTML = "00:00"
      }
      time =  countdownInput.value * 60
    })
}

function updateCountdown() {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    
    if(time === 0) {
      clearInterval(countdownInterval)
      countdown.innerHTML = `00:00`
    } else {
      time--
      seconds = seconds < 10 ? "0" + seconds : seconds
      countdown.innerHTML = `${minutes}:${seconds}`
    }
  }

  timer()

export {openTimer, closeTimer, timer}