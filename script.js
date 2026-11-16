let calendarMain = document.querySelector("#calendarBody")
let date = new Date()
let tasks = JSON.parse(localStorage.getItem("calendarTasks")) || {}

let monthTitle = document.querySelector("#monthTitle")

let monthName = date.toLocaleString("en-US", {
    month: "long"
})

monthTitle.textContent = `${monthName} ${date.getFullYear()}`


let daysInMonth = function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}
let getDays = daysInMonth(date.getFullYear(), date.getMonth() + 1)

let firstDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
).getDay()
let emptyDays = (firstDay + 6) % 7
for (let i = 0; i < emptyDays; i++) {
    let emptySquare = document.createElement("div")
    calendarMain.appendChild(emptySquare)
}
for (let i = 1; i <= getDays; i++) {
    if (!tasks[i]) {
        tasks[i] = []
    }
    let monthDaySquare = document.createElement("div")
    monthDaySquare.classList.add("square")

    let taskBody = document.createElement("ul")
    taskBody.classList.add("taskBody")

    tasks[i].forEach((task) => {
        let taskItem = document.createElement("li")
        let delTask = document.createElement("p")
        let done = document.createElement("input")

        done.type = "checkbox"
        delTask.textContent = " ❌"

        taskItem.textContent = task
        taskItem.prepend(done)
        taskItem.appendChild(delTask)

        taskBody.appendChild(taskItem)

        delTask.addEventListener("click", () => {
            let taskIndex = tasks[i].indexOf(task)
            tasks[i].splice(taskIndex, 1)

            localStorage.setItem("calendarTasks", JSON.stringify(tasks))
            taskItem.remove()
        })

        done.addEventListener("change", () => {
            if (done.checked) {
                taskItem.style.textDecoration = "line-through"
            } else {
                taskItem.style.textDecoration = "none"
            }
        })
    })

    let dayNum = document.createElement("span")
    dayNum.classList.add("monthDay")
    dayNum.textContent = i


    calendarMain.appendChild(monthDaySquare)
    monthDaySquare.appendChild(dayNum)
    monthDaySquare.appendChild(taskBody)

    monthDaySquare.style.width = "100px"
    monthDaySquare.style.height = "100px"
    monthDaySquare.style.border = " 1px solid #000"
    monthDaySquare.style.borderRadius = "10px"
    monthDaySquare.style.margin = "5px"
    monthDaySquare.style.padding = "5px"
    monthDaySquare.style.cursor = "pointer"

    monthDaySquare.addEventListener("click", (event) => {
        let currentShowedSquare = document.querySelector(".squareShow")
        if (event.target.tagName === "INPUT"
            || event.target.tagName === "BUTTON"
            || event.target.tagName === "P"
        ) {
            return
        }
        if (currentShowedSquare) {
            currentShowedSquare.classList.remove("squareShow")

            let oldInput = currentShowedSquare.querySelector("input")
            let oldSubmit = currentShowedSquare.querySelector("button")

            if (oldInput) {
                currentShowedSquare.removeChild(oldInput)
                currentShowedSquare.removeChild(oldSubmit)
                // monthDaySquare.removeChild(taskBody)
            }
        }

        if (currentShowedSquare !== monthDaySquare) {
            let input = document.createElement("input")
            let submit = document.createElement("button")

            input.placeholder = "add new task"
            submit.textContent = "add"

            monthDaySquare.classList.add("squareShow")
            monthDaySquare.appendChild(input)
            monthDaySquare.appendChild(submit)
            monthDaySquare.appendChild(taskBody)

            submit.addEventListener("click", () => {
                let newTask = monthDaySquare.querySelector("input").value
                if (newTask.trim() === "") {
                    return
                }
                tasks[i].push(newTask)
                localStorage.setItem("calendarTasks", JSON.stringify(tasks))
                let taskItem = document.createElement("li")
                let newTaskItem = taskBody.appendChild(taskItem)
                let delTask = document.createElement("p")
                let done = document.createElement("input")
                done.type = "checkbox"
                delTask.textContent = " ❌"
                newTaskItem.textContent = newTask
                newTaskItem.appendChild(delTask)
                newTaskItem.prepend(done)

                delTask.addEventListener("click", () => {
                    let taskIndex = tasks[i].indexOf(newTask)

                    tasks[i].splice(taskIndex, 1)

                    localStorage.setItem("calendarTasks", JSON.stringify(tasks))
                    newTaskItem.remove()
                })
                done.addEventListener("change", () => {
                    if (done.checked) {
                        newTaskItem.style.textDecoration = "line-through"
                    } else {
                        newTaskItem.style.textDecoration = "none"
                    }
                })
            })
        }
    })
}