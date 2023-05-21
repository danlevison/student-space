import { setGreetingHtml, displayDate } from "./components/hero.js"
import { fetchWeather } from "./components/weather.js"
import { openSetClassName, openAddStudentForm, openStudentSettings, removeStudent, handleAvatarClick, handlePointsClick, getGridHtml } from "./components/grid.js"
import { openRandomiser, closeRandomiser, getRandomStudent } from "./components/randomiser.js"
import { openTimer, closeTimer, timer } from "./components/timer.js"
import { openTodoBtn } from "./components/todo.js"

window.onload = () => {
    displayDate()
    fetchWeather()
    render()
}

// looks for clicks on the document
document.addEventListener("click", function(e) {
    if (e.target.dataset.avatar) {
        handleAvatarClick(e.target.dataset.avatar)
    }
    if (e.target.dataset.point) {
        handlePointsClick(e.target.dataset.point)
    }
    if (e.target.id === "add-student-btn") {
        openAddStudentForm()
    }
    if (e.target.id === "set-class-btn") {
        openSetClassName()
    }
    if(e.target.dataset.settings) {
        openStudentSettings()
        removeStudent(e.target.dataset.settings)
    }
})

function render() {
    document.getElementById("points-grid").innerHTML = getGridHtml()
}

export { render }


