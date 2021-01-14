let container = document.getElementById('container');

const cat = document.createElement('div');
cat.setAttribute('class', 'catalog');
container.appendChild(cat);
const listProduct = document.querySelector('.catalog');

const shipCart = document.createElement('div');
shipCart.setAttribute('class', 'basket');
container.appendChild(shipCart);
const basket = document.querySelector('.basket');

class Product {
    constructor(name, price, description, rating, discount) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.rating = rating;
        this.discount = discount;
    };

    priceDiscount() {
        //Возвращает цену товара со скидкой
        let priceDiscount = this.price * ((100 - this.discount) / 100);
        return priceDiscount; 
    }

    fullDescription() {
        //Возвращает полное описание товара
        return `${this.name} стоимостью = ${this.price}`;
    }

    prodDescription() {
        return `Название: ${this.name} \nЦена: ${this.price} \nОписание: ${this.description} \nРейтинг: ${this.rating} \nЦена со скидкой: ${this.priceDiscount()}`
    };
};

class Catalog {
    constructor(){
        this.products = Array();
    }

    //Выводит заголовок каталога
    drawCatalogTitle() { 
        const catalogTitle = document.createElement('h2');
        catalogTitle.setAttribute('class', 'catalog__title');
        catalogTitle.textContent = 'Каталог товаров: ';

        listProduct.appendChild(catalogTitle);
    }

    //Выводит товар с кратким описанием
    drawDescriptionProd(product) {
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'product');
        const name = document.createElement('h3');
        name.setAttribute('class', 'product__title');
        const price = document.createElement('p');
        price.setAttribute('class', 'product__price');

        name.textContent = product.name;
        price.textContent = product.price;

        wrapper.appendChild(name);
        wrapper.appendChild(price);

        listProduct.appendChild(wrapper);
    } 

    //Если каталог пустой, скажем об этом
    drawCatalogEmpty(messages) {
        const wrap = document.createElement('p');
        wrap.textContent = messages;

        listProduct.appendChild(wrap);
    }

    //Показываем товары в каталоге
    showCatalogNamePrice() {
        if (this.products.length == 0) {
            this.drawCatalogTitle();
            this.drawCatalogEmpty('Каталог пустой. Добавьте товары в каталог!');
        } else {
            listProduct.textContent = '';
            this.drawCatalogTitle();
            this.products.forEach(el => {
                this.drawDescriptionProd(el);
            });
        }
    }
}

class Basket {
    constructor(){
        this.shopCart = Array();
    };

    countBasketPrice() {
        //Цена корзины без скидки
        let result = this.shopCart.reduce(function(sum, current) {
            return sum + current.price;
        }, 0);
        return result;
    };

    countBasketDiscount() {
        //Цена корзины со скидкой
        let result = this.shopCart.reduce(function(sum, current) {
            return sum + (current.price - (current.price * current.discount));
        }, 0);
        return result;
    };

    drawBasketTitle() {
        //Рисуем заголовок корзины
        const basketTitle = document.createElement('h2');
        basketTitle.setAttribute('class', 'basket__title');
        basketTitle.textContent = 'Корзина: ';

        basket.appendChild(basketTitle);
    };

    drawBasket() {
        //Выводим "состояние" корзины
        basket.textContent = '';

        this.drawBasketTitle();

        const basketText = document.createElement('p');
        basketText.setAttribute('class', 'basket__text');
        
        if ( this.shopCart.length == 0 ) {
            basketText.textContent = `Ваша корзина пуста!`;
            basket.appendChild(basketText);
        } else {
            basketText.textContent = `В корзине: ${this.shopCart.length} товаров, на сумму ${this.countBasketPrice()} руб.`;
            basket.appendChild(basketText);
        }  
    };

};


let prod1 = new Product('Milk', 80, 'Good Milk', 4.8, 15);
let prod2 = new Product('Chocolate', 100, 'Cool chocolate', 5.0, 20);
let prod3 = new Product('Bread', 70, 'Delicious bread', 4.9, 50);
let prod4 = new Product('Meat', 220, 'Chicken Meat', 4.9, 10);
let prod5 = new Product('Cream', 110, 'Cream Nivea', 4.9, 10);

let catalog = new Catalog();
catalog.showCatalogNamePrice();


setTimeout(() => {
    catalog.products.push(prod1);
    catalog.products.push(prod2);
    catalog.products.push(prod3);
    catalog.showCatalogNamePrice();
}, 3000);

setTimeout(() => {
    catalog.products.push(prod4);
    catalog.products.push(prod5);
    catalog.showCatalogNamePrice();
}, 6000);



let shopBasket = new Basket();
shopBasket.drawBasket();

setTimeout(() => {
    shopBasket.shopCart.push(prod1);
    shopBasket.drawBasket();
}, 9000);

setTimeout(() => {
    shopBasket.shopCart.push(prod2);
    shopBasket.drawBasket();
}, 12000);

setTimeout(() => {
    shopBasket.shopCart.push(prod3);
    shopBasket.drawBasket();
}, 15000);



