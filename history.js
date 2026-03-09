class History {
    constructor() {
        this.calHistory = document.getElementsByClassName("cal-history")[0]
        this.clearBtn = document.getElementsByClassName("clear-his")[0]

        this.clearBtn.addEventListener("click", () => {
            if(localStorage.getItem("calculator")) {
                localStorage.removeItem("calculator")
                this.calHistory.replaceChildren()
            }
        })
    }


    appendHistory(expression, res) {
        const div = document.createElement('div')
        div.classList.add("history-div")
        const textNode = document.createTextNode(`${expression} = ${res}`)
        div.append(textNode)
        this.calHistory.prepend(div)
        if(!localStorage.getItem("calculator")) {
            localStorage.setItem("calculator", JSON.stringify([{expression, res}]))
        } else {
            const arr = JSON.parse(localStorage.getItem("calculator"))
            arr.unshift({expression, res})
            localStorage.setItem("calculator", JSON.stringify(arr))
        }
        
    }


    loadLocal() {
        if(localStorage.getItem("calculator")) {
            const arr = JSON.parse(localStorage.getItem("calculator"))
            for (const element of arr) {
                const div = document.createElement('div')
                div.classList.add("history-div")
                const textNode = document.createTextNode(`${element.expression} = ${element.res}`)
                div.append(textNode)
                this.calHistory.append(div)
            }
        } 
    }

}

export { History }