// Task 6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), 
// где arg1, arg2 — значения аргументов, operation — строка с названием операции. 
//В зависимости от переданного значения выполнить одну из арифметических операций (использовать функции из пункта 5) 
// и вернуть полученное значение (применить switch).

function mathOperation(arg1, arg2, operation) {
    let result;
    switch(operation) {
        case 'add':
            result = arg1 + arg2;
            break;
        case 'sub':
            result = arg1 - arg2;
            break;
        case 'mul':
            result = arg1 - arg2;
            break;
        case 'div':
            result = arg1 - arg2;
            break;
    }
    return result;
}

console.log(mathOperation(10, 5, 'add'));
console.log(mathOperation(10, 5, 'sub'));
console.log(mathOperation(10, 5, 'mul'));
console.log(mathOperation(10, 5, 'div'));
