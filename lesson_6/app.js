let cartItem = document.getElementById('catalogItem');
let basketItem = document.getElementById('basketItem');

class Product {
    constructor(id, name, price, description, rating, discount, srcMini) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.rating = rating;
        this.discount = discount;
        this.srcMini = srcMini;
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
        catalogTitle.className = 'catalog__title';
        catalogTitle.textContent = 'Каталог товаров: ';

        cartItem.appendChild(catalogTitle);
    }

    //Создаем карточку товара
    drawDescriptionProd(product, cartBox) {

        const cart = document.createElement('div');
        cart.className = 'cart';

        const imageMin = document.createElement('img');
        imageMin.className = 'cart__img';
        imageMin.setAttribute('src', product.srcMini);
        imageMin.setAttribute('alt', product.name);

        const cartTitle = document.createElement('h3');
        cartTitle.className = 'cart__title';

        const descriptProduct = document.createElement('p');
        descriptProduct.className = 'cart__text';

        const btn = document.createElement('button');
        btn.className = 'btn  plus';
        btn.setAttribute('data-id', product.id);

        cartTitle.textContent = product.name;
        descriptProduct.textContent = product.description;
        btn.textContent = 'Добавить';

        cart.appendChild(imageMin);
        cart.appendChild(cartTitle);
        cart.appendChild(descriptProduct);
        cart.appendChild(btn);

        cartBox.appendChild(cart);

        cartItem.appendChild(cartBox);
    } 

    //Если каталог пустой, скажем об этом
    drawCatalogEmpty(messages) {
        const wrap = document.createElement('p');
        wrap.textContent = messages;

        cartItem.appendChild(wrap);
    }

    //Отрисовываем каталог
    showCatalogNamePrice() {
        if (this.products.length == 0) {
            this.drawCatalogTitle();
            this.drawCatalogEmpty('Каталог пустой. Добавьте товары в каталог!');
        } else {
            cartItem.textContent = '';
            this.drawCatalogTitle();

            const cartBox = document.createElement('div');
            cartBox.className = 'catalog__cart-box';

            this.products.forEach(el => {
                this.drawDescriptionProd(el, cartBox);
            });
        }
    }
};

class Basket {
    constructor(){
        this.shopCart = {};
    };

    basketPrice() {
        //Цена корзины без скидки
        let result = 0;
        for ( let el in this.shopCart ) {
            result += this.shopCart[el]['price'] * this.shopCart[el]['counter'] ;
        }
        return result;
    };

    countBasket() {
        // кол-во товара в корзине
        let count = 0;
        for ( let el in this.shopCart ) {
            count += this.shopCart[el]['counter'];
        }
        return count;
    }

    drawBasketTitle() {
        //Рисуем заголовок корзины
        const basketTitle = document.createElement('h2');
        basketTitle.classList.add('basket__title');
        basketTitle.textContent = 'Корзина: ';

        basketItem.appendChild(basketTitle);
    };

    //Если корзина пустая, скажем об этом
    drawBasketEmpty(messages) {
        
    }

    createBasketProduct(product) {
        let goods = {};
        goods.name = product.name;
        goods.price = product.price;
        goods.counter = 1;

        return goods;
    }

    addBasketProduct(product){
        // Корзина пустая?
        if ( Object.keys( this.shopCart ).length == 0 ) {
            let goods = this.createBasketProduct(product);
            this.shopCart[product.id] = goods;
        } else {
            // Не пустая
            let bol = true; // Предположим, товара нет в корзине 
            for ( let el in this.shopCart ) {
                if ( el == product.id ) {
                    this.shopCart[el]['counter']++;
                    bol = false; // Оказывается есть!
                };
            };

            if (bol) {
                let goods = this.createBasketProduct(product);
                this.shopCart[product.id] = goods;
            };
        };
    };

    drawBasket() {
        //Выводим "состояние" корзины

        // В шапку
        let count = document.getElementById('cartCounter');
        count.textContent = '';

        let price = document.getElementById('headerPrice');
        price.textContent = '';

        if ( Object.keys(this.shopCart).length == 0 ) {
            count.textContent = 0;
            price.textContent = '0 руб.'
        } else {
            count.textContent = this.countBasket();
            price.textContent = `${this.basketPrice()} руб.`;
        } 

        // В тело
        

        if ( Object.keys( this.shopCart).length == 0 ){
            this.drawBasketTitle();

            const wrap = document.createElement('p');
            wrap.textContent = 'Ваша корзина пуста!';

            basketItem.appendChild(wrap);

        } else {
            basketItem.textContent = '';
            this.drawBasketTitle();

            let cartElement = document.createElement('p');
            cartElement.className = 'basket__text';
    
            cartElement.textContent = `В корзине ${this.countBasket()} товар, на сумму ${this.basketPrice()} руб.`;
    
            basketItem.appendChild(cartElement);
        }
        
    };

};


// Создаем товары
let prod1 = new Product('1001', 'Хлеб', 80, 'Самый свежий хлеб', 4.8, 15, 'assets/img/small/1.jpg');
let prod2 = new Product('1002', 'Шоколад', 100, 'Горький шоколад 90%', 5.0, 20, 'assets/img/small/2.jpg');
let prod3 = new Product('1003', 'Молоко', 70, 'Цельное коровье молоко', 4.9, 50, 'assets/img/small/3.jpg');
let prod4 = new Product('1004', 'Мясо', 220, 'Куриная грудка', 4.9, 10, 'assets/img/small/4.jpg');
let prod5 = new Product('1005', 'Колбаса', 110, 'Докторская', 4.9, 10, 'assets/img/small/5.jpg');
let prod6 = new Product('1006', 'Сыр', 110, 'Российский', 4.5, 40, 'assets/img/small/6.jpg');


// Проверяем вывод пустого каталога
let directory = new Catalog();
directory.showCatalogNamePrice();

setTimeout(() => {
    directory.products.push(prod1);
    directory.products.push(prod2);
    directory.products.push(prod3);
    directory.showCatalogNamePrice();
});

setTimeout(() => {
    directory.products.push(prod4);
    directory.products.push(prod5);
    directory.products.push(prod6);
    directory.showCatalogNamePrice();
});


let shopBasket = new Basket();
shopBasket.drawBasket();


document.onclick = e => {
    if ( e.target.classList.contains('btn') ){
        let idProd = e.target.dataset.id;
        
        let lenObj = Object.keys(directory.products).length;

        for (var i = 0; i < lenObj; i++) {
            if ( directory.products[i].id == idProd ) {
                shopBasket.addBasketProduct(directory.products[i]);
                shopBasket.drawBasket();
            };
          };
    };
};
