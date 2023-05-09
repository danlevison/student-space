// import studentData from "./data.js"
import { setGreetingHtml, displayDate } from "./components/displays.js"
import { fetchWeather } from "./components/weather.js"
import { openAddStudentForm, handleAvatarClick, handlePointsClick, removeStudent, getGridHtml } from "./components/points.js"
import { openRandomiser, closeRandomiser, getRandomStudent } from "./components/monitors.js"
import { openTimer, closeTimer, timer } from "./components/timer.js"
import { openTodoBtn } from "./components/todo.js"

window.onload = () => {
    setGreetingHtml()
    displayDate()
    fetchWeather()
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
    if(e.target.id === "add-student-btn") {
        openAddStudentForm()
    }
})

function render() {
    document.getElementById("points-grid").innerHTML = getGridHtml()
}

export { render }


