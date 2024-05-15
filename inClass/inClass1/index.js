function Operation(sign) {
    const num1 = prompt("Enter number 1?");
    const num2 = prompt("Enter number 2?");
    let result = 0;
    if (sign === '+') {
        result = parseInt(num1) + parseInt(num2);
    } else {
        result = parseInt(num1) % parseInt(num2);
    }
    const textResult = document.createElement('p');
    const text = document.createTextNode(`${num1} ${sign} ${num2} = ${result}`);
    textResult.appendChild(text);
    document.getElementById('Result').appendChild(textResult);
}