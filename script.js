import { Stack } from "./stack.js";

const conatiner = document.getElementsByClassName("grid-container")[0];
const input = document.getElementsByTagName("input")[0]



const st = new Stack()








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
                input.value = st.resiprocal(input.value) ?? "Can't divide by zero"
                break
                

        }
    } else if(type === "bracket") {
        input.value += e.target.dataset.bracket
    } else if(type === "equal") {
        try {
            console.log('before token');
            
            const token = st.arrConvert(input.value)
            console.log(token);
            console.log('after token');
            
            const post = st.postfix(token)
            console.log(post);
            const res = st.evaluatePostfix(post)
            console.log(res);
            input.value = res[0]
        } catch (error) {
            console.log(error);
            
            input.value = error.message
        }
    }
})
