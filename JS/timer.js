let countdownInput = document.getElementById("countdown-input")
let time = countdownInput.value * 60 // set countdown time
let countdownInterval = ""

document.getElementById("open-timer").addEventListener("click", openTimer)
document.getElementById("close-timer-btn").addEventListener("click", closeTimer) 

function openTimer() {
    document.getElementById("timer").classList.remove("display-none")
    document.getElementById("points-grid").style.opacity = 0.6
}

function closeTimer() {
    document.getElementById("timer").classList.add("display-none")
    document.getElementById("points-grid").style.opacity = 1
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
       countdownInterval = setInterval(updateCountdown, 1000)
       startBtn.style.display = "none"
       pauseBtn.style.display = "inline-block"
    })

    pauseBtn.addEventListener("click", () => {
      clearInterval(countdownInterval)
      startBtn.style.display = "inline-block"
      pauseBtn.style.display = "none"

    })

    resetBtn.addEventListener("click", () => {
      time =  countdownInput.value * 60
    })
}

function updateCountdown() {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    
    if(time === 0) {
      clearInterval(countdownInterval)
      document.getElementById("countdown").innerHTML = `00:00`
    } else {
      time--
      seconds = seconds < 10 ? "0" + seconds : seconds
      document.getElementById("countdown").innerHTML = `${minutes}:${seconds}`
    }
  }

export {openTimer, closeTimer, timer}