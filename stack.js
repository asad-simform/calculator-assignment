class Stack {
    
    constructor() {
        this.stack = []    
        this.scientificArr = ["sin", "cos", "tan", "log", "ln", "sqrt"]
    }

    #isNumber(ch) {
        return (ch >= "0" && ch <= "9") || ch === "."
    }

    #isCharacter(ch) {
        return ch >= "a" && ch <= "z"
    }

    #priority(ch) {
        if(ch === "+" || ch === "-") return 1
        else if(ch === "/" || ch === "*" || ch === "%") return 2
        else if(ch === "^") return 3
        else if(ch === "!" || ch === "minus") return 4
        else return -1
    }

    #scientificOperator(op, val) {        
        switch(op) {
            case "sin": 
                return Math.sin(val)
            case "cos":
                return Math.cos(val)
            case "tan":
                return Math.tan(val)
            case "log":
                return Math.log10(val)
            case "ln":
                return Math.log(val)
            case "sqrt":
                return Math.sqrt(val)
        }
    }

    #factorial(val) {
        if(val < 0) throw new Error("Can't find the factorial for negative number")
        if(val === 0) return 1
        let res = 1
        for(let i = 1;i<=val;i++) {
            res *= i
        }
        return res
    }

    #isRightAssociative(ch) {
        return ch === "^"
    }

    resiprocal(str) {
        let token = this.arrConvert(str)
        let post = this.postfix(token)
        let res = this.evaluatePostfix(post)[0]    
        if(res === 0) return null
        return 1/res 
    }

    arrConvert(str) {        
        let arrConverter = []
        let idx = 0
        let open = 0, close = 0;
        while(idx < str.length) {  
            let num = ""
            if(idx<str.length && ["+", "-"].includes(str[idx]) && (idx===0 || arrConverter[arrConverter.length - 1] === "(" || ["+", "-", "*", "/", "(", "^", "%"].includes(arrConverter[arrConverter.length - 1]) ) && arrConverter[arrConverter.length - 1] !== "!"){
                let flag = false
                let neg = str[idx]==="+" ? 1 : -1
                idx++
                while(idx<str.length && !this.#isNumber(str[idx]) && ["+", "-"].includes(str[idx])) {
                    if(str[idx] === "-") neg *= -1
                    idx++
                }
                while(idx<str.length && this.#isNumber(str[idx])){
                    if(str[idx]==="." && flag)throw new Error("Multiple decimal point not allowed")
                    if(str[idx]==="." && !flag) flag = true
                    num += str[idx]
                    idx++;
                }
                if(arrConverter.length>0 && (arrConverter[arrConverter.length - 1] === ")" || arrConverter[arrConverter.length - 1] === Math.PI || arrConverter[arrConverter.length - 1] === Math.E )) arrConverter.push("*")
                if(num==="") arrConverter.push(neg)
                else arrConverter.push(neg * Number(num))
                num = ""
            }
            if (idx<str.length && this.#isNumber(str[idx])) {
                let flag = false 
                while (idx < str.length && this.#isNumber(str[idx])) {
                    if(str[idx]==="." && flag)throw new Error("Multiple decimal point not allowed")
                    if(str[idx]==="." && !flag) flag = true
                    num += str[idx];
                    idx++;
                }
                if(num!=="") {
                    if(arrConverter.length>0 && (arrConverter[arrConverter.length - 1] === ")" || arrConverter[arrConverter.length - 1] === Math.PI || arrConverter[arrConverter.length - 1] === Math.E )) arrConverter.push("*")
                    arrConverter.push(Number(num));
                }
                num = ""
            }
            while(idx<str.length && this.#isCharacter(str[idx])) {
                num += str[idx]
                idx++;
            }
            if(this.scientificArr.includes(num)) {
                // console.log(idx);
                
                let evl = ""
                let paran = -1
                let start = -1, end = -1
                while(idx<str.length) {
                    if(str[idx]==="(") {
                        paran = 1
                        end = idx
                        idx++
                        break
                    }
                    idx++
                }
                while(idx<str.length) {
                    if(str[idx] === "(") paran++
                    if(str[idx] === ")") paran--
                    if(paran === 0) {
                        start = idx 
                        break
                    }
                    evl += str[idx]
                    idx++
                }
                // console.log(evl);
                
                // while(idx+1<str.length && str[idx+1] !== ")") {
                //     evl += str[idx+1]
                //     idx++
                // }
                if(paran === 0) {
                    if(arrConverter.length > 0 && (typeof arrConverter[arrConverter.length - 1] === "number")) arrConverter.push("*")
                    let number = this.evaluatePostfix(this.postfix(this.arrConvert(evl)))
                    let result = this.#scientificOperator(num, number)
                     arrConverter.push(result)
                } else {
                    throw new Error("Invalid parantheses")
                }
                num = ""
                idx++
            }
            if(idx<str.length && str[idx] === "π") {
                if(arrConverter.length > 0 && (typeof arrConverter[arrConverter.length - 1] === "number" || arrConverter[arrConverter.length - 1] === ")")) arrConverter.push("*")
                arrConverter.push(Math.PI)
                idx++
            }
            if(idx<str.length && str[idx] === "ℯ") {
                if(arrConverter.length > 0 && (typeof arrConverter[arrConverter.length - 1] === "number" || arrConverter[arrConverter.length - 1] === ")")) arrConverter.push("*")
                arrConverter.push(Math.E)
                idx++
            }
            if(idx<str.length && !this.#isNumber(str[idx]) && !this.#isCharacter(str[idx])) {
                if(str[idx] === "(") {
                    if(arrConverter.length > 0 && (typeof arrConverter[arrConverter.length - 1] === "number" || arrConverter[arrConverter.length - 1] === ")")) arrConverter.push("*")
                    open++
                } 
                else if(str[idx] === ")") {
                    close++
                }
                arrConverter.push(str[idx])
                idx++
            }
        }
        if(open != close) throw new Error("Invalid parantheses")
        return arrConverter
    }

    postfix(arr) {
        const post = []
        let idx = 0;
        this.stack = []

        while(idx < arr.length) {
            if(typeof arr[idx] === "number") post.push(arr[idx])
            else if(arr[idx] === "(") this.stack.push(arr[idx])
            else if(arr[idx] === ")") {
                while(this.stack.length >= 0 && this.stack[this.stack.length - 1] !== "(") {
                    post.push(this.stack.pop())
                }
                this.stack.pop()
            } else {
                while(this.stack.length > 0 && this.stack[this.stack.length - 1] !== "(" && (this.#priority(arr[idx]) < this.#priority(this.stack[this.stack.length - 1]) || (this.#priority(arr[idx]) === this.#priority(this.stack[this.stack.length - 1]) && !this.#isRightAssociative(arr[idx])))) {
                    post.push(this.stack.pop())
                }
                this.stack.push(arr[idx])
            }
            idx++        
        }
        while(this.stack.length > 0) {
            post.push(this.stack.pop())
        }
        return post
    }
 
    evaluatePostfix(arr) {
        this.stack = []
        let idx = 0;
        
        while(idx < arr.length) {
            if(typeof arr[idx] === "number") this.stack.push(arr[idx])
            else if(arr[idx] === "!") {
                let num = this.stack.pop()
                this.stack.push(this.#factorial(num))
            }
            else {
                let op1 = this.stack.pop()
                let op2 = this.stack.pop()
                let operand = arr[idx]
                switch(operand) {
                    case "+":
                        this.stack.push(op2 + op1)
                        break
                    case "-":
                        this.stack.push(op2 - op1)
                        break
                    case "*":
                        this.stack.push(op2 * op1)
                        break
                    case "/":
                        if(op1 === 0) throw new Error("Can't divide by zero")
                        this.stack.push(op2 / op1)
                        break
                    case "^":
                        this.stack.push(Math.pow(op2, op1))
                        break
                    case "%":
                        this.stack.push(op2 % op1)
                        break
                }
            }
            idx++
        }
        return this.stack
    }

    toggleSign(arr) {
        let paran = -1
        let start = -1, end = -1
        let idx = arr.length - 1
        if(arr.length === 0) return "Can't perform operation";        
        if(typeof arr[arr.length - 1] === "number") {
            arr[arr.length - 1] = -1 * arr[arr.length - 1]
        } else {
            while(idx>=0) {
                if(arr[idx] === ")") {
                    paran = 1
                    end = idx
                    idx--
                    break
                }
                idx--
            }
            while(idx>=0) {
                if(arr[idx] === ")") paran++
                if(arr[idx] === "(") paran--
                if(paran === 0) {
                    start = idx 
                    break
                }
                idx--
            }
            if(start !== -1) {
                arr[start] = "-("
            }
        }
        return arr
    }

}


export { Stack }