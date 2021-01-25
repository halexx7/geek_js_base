// Task 7. Сравнить null и 0. Объяснить результат.

let param1 = null;
let param2 = 0;

console.log(param1 == param2);
console.log(typeof(param1));
console.log(typeof(param2));

// При сравнении получаем false;
// 0 - это число, а null - это "ничто". Это совершенно разные сущности, они не могут быть равны.