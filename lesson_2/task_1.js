// Task 1. Почему код дает именно такие результаты?

var a = 1, b = 1, c, d;
c = ++a; alert(c);           // 2
//потому, что используется префиксная форма унарного оператора

d = b++; alert(d);           // 1
//потому, что используется постфиксная форма унарного оператора

c = (2+ ++a); alert(c);      // 5
//т.к. используется постфикс, значение операнда возвращается, а затем увеличивается на единицу.

d = (2+ b++); alert(d);      // 4
//т.к. используется префикс, значение операнда возвращается увеличенным на единицу.

alert(a);                    // 3
alert(b);                    // 3