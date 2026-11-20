
const display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value;

        if (!expression || !/^[0-9+\-*/%.() ]+$/.test(expression)) {
            display.value = "Error";
            return;
        }

        // Prevent division by zero
        if (/\/\s*0+(?:\.0*)?(?![\d.])/.test(expression)) {
            display.value = "Cannot divide by 0";
            return;
        }

        let result = Function('"use strict"; return (' + expression + ')')();

        if (!Number.isFinite(result)) {
            display.value = "Error";
            return;
        }

        display.value = Number(result.toFixed(10));

    } catch {
        display.value = "Error";
    }
}
