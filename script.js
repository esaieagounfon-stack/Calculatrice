class Calculator {
    constructor(previousEl, currentEl) {
        this.previousEl = previousEl;
        this.currentEl = currentEl;
        this.clear();
    }

    clear() {
        this.current = "";
        this.previous = "";
        this.operation = null;
        this.updateDisplay();
    }

    delete() {
        this.current = this.current.slice(0, -1);
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === "." && this.current.includes(".")) return;
        this.current += number;
        this.updateDisplay();
    }

    chooseOperation(op) {
        if (this.current === "") return;
        if (this.previous !== "") this.compute();

        this.operation = op;
        this.previous = this.current;
        this.current = "";
        this.updateDisplay();
    }

    compute() {
        const prev = parseFloat(this.previous);
        const curr = parseFloat(this.current);
        if (isNaN(prev) || isNaN(curr)) return;

        let result;
        switch (this.operation) {
            case "+":
                result = prev + curr;
                break;
            case "-":
                result = prev - curr;
                break;
            case "×":
                result = prev * curr;
                break;
            case "÷":
                if (curr === 0) {
                    alert("Division par zéro impossible");
                    this.clear();
                    return;
                }
                result = prev / curr;
                break;
            default:
                return;
        }

        this.current = result.toString();
        this.operation = null;
        this.previous = "";
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentEl.innerText = this.current || "0";
        this.previousEl.innerText = this.operation
            ? `${this.previous} ${this.operation}`
            : "";
    }
}

/* Initialisation */
const previousEl = document.getElementById("previous-operand");
const currentEl = document.getElementById("current-operand");
const calculator = new Calculator(previousEl, currentEl);

/* Gestion des boutons */
document.querySelectorAll("[data-number]").forEach(btn =>
    btn.addEventListener("click", () =>
        calculator.appendNumber(btn.innerText)
    )
);

document.querySelectorAll("[data-operation]").forEach(btn =>
    btn.addEventListener("click", () =>
        calculator.chooseOperation(btn.dataset.operation)
    )
);

document.querySelector("[data-action='clear']")
    .addEventListener("click", () => calculator.clear());

document.querySelector("[data-action='delete']")
    .addEventListener("click", () => calculator.delete());

document.querySelector("[data-action='equals']")
    .addEventListener("click", () => calculator.compute());