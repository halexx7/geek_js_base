// 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.

let count = 2;
let number = [0, 1];
let simple = [];

while (count < 101) {
    number.push(count);
    simple.push(count);
    let i = 2;
    while (i < (number.length - 1)) {
        if (count > 1 && (count % number[i] == 0)) {
            simple.pop();
            break;
        } else {
            i++;
            continue;
        };
    }
    count++;
}

console.log(simple);

