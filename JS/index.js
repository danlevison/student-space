import studentData from "../data.js"
import { setGreetingHtml, displayDate, getBdayHtml } from "./displays.js"
import { fetchWeather, renderWeather } from "./weather.js"
import { handleAvatarClick, handlePointsClick, removeStudent, getStudentHtml } from "./points.js"
import { openRandomiser, closeRandomiser, getRandomStudent } from "./monitors.js"
import { openTimer, closeTimer, timer } from "./timer.js"
import { openTodoBtn } from "./todo.js"

window.onload = () => {
    setGreetingHtml()
    displayDate()
    renderWeather()
    getBdayHtml()
    timer()
    render()
}

// looks for clicks on the document
document.addEventListener("click", function(e) {
    if(e.target.dataset.avatar) {
        handleAvatarClick(e.target.dataset.avatar)
    }
    if(e.target.dataset.point) {
        handlePointsClick(e.target.dataset.point)
    }
    if(e.target.dataset.remove) {
        removeStudent(e.target.dataset.remove)
    }
})

function render() {
    document.getElementById("points-grid").innerHTML = getStudentHtml()
}

export { render }


