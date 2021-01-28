// 4. * Нарисовать пирамиду с 20 рядами с помощью console.log, как показано на рисунке:
// X
// XX
// XXX

let count = 0;

for(let some = []; count < 20; count++) {
    some.push('X');
    console.log(some.join(''));
}