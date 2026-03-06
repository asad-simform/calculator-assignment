import { Stack } from "./stack.js";

const conatiner = document.getElementsByClassName("grid-container")[0];
const input = document.getElementsByTagName("input")[0]
const calHistory = document.getElementsByClassName("cal-history")[0]
const clearBtn = document.getElementsByClassName("clear-his")[0]

const st = new Stack()



function appendHistory(expression, res) {
    const div = document.createElement('div')
    div.classList.add("history-div")
    const textNode = document.createTextNode(`${expression} = ${res}`)
    div.append(textNode)
    calHistory.prepend(div)
    if(!localStorage.getItem("calculator")) {
        localStorage.setItem("calculator", JSON.stringify([{expression, res}]))
    } else {
        const arr = JSON.parse(localStorage.getItem("calculator"))
        arr.unshift({expression, res})
        localStorage.setItem("calculator", JSON.stringify(arr))
    }
    
}

function loadLocal() {
    if(localStorage.getItem("calculator")) {
        const arr = JSON.parse(localStorage.getItem("calculator"))
        for (const element of arr) {
            const div = document.createElement('div')
            div.classList.add("history-div")
            const textNode = document.createTextNode(`${element.expression} = ${element.res}`)
            div.append(textNode)
            calHistory.append(div)
        }
    } 
}

function handleResiprocal() {
    let res = st.resiprocal(input.value) ?? "Can't divide by zero"
    if(typeof res !== "string") {
        appendHistory(input.value, res)
    }
    return res
}


conatiner.addEventListener("click", function(e) {
    let type = Object.keys(e.target.dataset)[0]
    if(type === "number" || type === "operator") {
        input.value += e.target.textContent
    } else if(type === "scientific") {
        if(st.scientificArr.includes(e.target.dataset.scientific)) {
            input.value += e.target.dataset.scientific + "("
        } else {
            input.value += e.target.dataset.scientific
        }
    } else if(type === "func") {        
        switch(e.target.dataset.func) {
            case "ac":
                input.value = ""
                break;
            case "del":                
                input.value = input.value.slice(0, input.value.length - 1)
                break;
            case "!":
                input.value += "!"
                break
            case "res":
                input.value = handleResiprocal()
                break
            case "toggle":
                const token = st.arrConvert(input.value)
                const newInput = st.toggleSign(token)
                input.value = newInput.join('')
                break
        }
    } else if(type === "bracket") {
        input.value += e.target.dataset.bracket
    } else if(type === "equal") {
        try {
            // console.log('before token');
            
            const token = st.arrConvert(input.value)
            console.log(token);
            // console.log('after token');
            
            const post = st.postfix(token)
            console.log(post);
            const res = st.evaluatePostfix(post)
            console.log(res);
            appendHistory(input.value, res[0])
            input.value = res[0]
        } catch (error) {
            console.log(error);
            
            input.value = error.message
        }
    }
})

clearBtn.addEventListener("click", () => {
    if(localStorage.getItem("calculator")) {
        localStorage.removeItem("calculator")
        calHistory.replaceChildren()
    }
})

loadLocal()