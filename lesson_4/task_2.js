// 2. Продолжить работу с интернет-магазином:
//      a. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
//      b. Реализуйте такие объекты.
//      c. Перенести функционал подсчета корзины на объектно-ориентированную базу.

function Product(name, price, description, rating, discount) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.rating = rating;
    this.discount = discount;
};

let item1 = new Product('Milk', 80, 'Good Milk', 4.8, .15);
let item2 = new Product('Chocolate', 100, 'Cool chocolate', 5.0, .20);
let item3 = new Product('Bread', 70, 'Delicious bread', 4.9, .50);

let basket = {
    products: Array(),

    countBasketPrice: function() {
        let result = this.products.reduce(function(sum, current) {
            return sum + (current.price - (current.price * current.discount));
        }, 0);
        return console.log(result);
    },



}

basket.products.push(item1);
basket.products.push(item2);
basket.products.push(item3);
basket.countBasketPrice();