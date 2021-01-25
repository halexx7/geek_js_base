const body = document.querySelector('.body');
const cartItem = document.getElementById('catalogItem');
const basketItem = document.getElementById('basketItem');
const modalGoods = document.getElementById('goodsModal');

const modal = document.querySelector('#basketModal');
const modalBasket = document.createElement('div');
modalBasket.className = 'basket-modal__content';

const modalThanks = document.createElement('div');
modalThanks.classList.add('modal__thanks');


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
    
    //Возвращает цену товара со скидкой
    priceDiscount() {
        let priceDiscount = this.price * ((100 - this.discount) / 100);
        return priceDiscount; 
    };

    //Возвращает полное описание товара
    prodDescription() {
        return `${this.name} стоимостью = ${this.price}`;
    };

    //Возвращает полное описание товара
    fullDescription() {
        return `Название: ${this.name} \nЦена: ${this.price} \nОписание: ${this.description} \nРейтинг: ${this.rating} \nЦена со скидкой: ${this.priceDiscount()}`
    };
};

class Catalog {
    constructor(){
        this.products = Array();
    }

    //Выводит заголовок каталога
    drawCatalogTitle() { 
        const html = `<h2 class="catalog__title">Каталог товаров: </h2>`;

        cartItem.insertAdjacentHTML('beforeend', html);
    };

    //Создаем карточку товара
    drawDescriptionProd(product, cartBox) {

        const html = `<div class="cart">
            <img class="cart__img" src="${product.srcMini}" alt="${product.name}">
            <h3 class="cart__title">${product.name}</h3>
            <p class="cart__text">${product.description}</p>
            <div class="cart__button">
                <button class="btn  btn--plus" data-id="${product.id}">Добавить</button>
                <button class="btn  btn--minus" data-id="${product.id}">Удалить</button>
            </div>
        </div>`
        
        cartBox.insertAdjacentHTML('beforeend', html)

        cartItem.appendChild(cartBox);

    };

    //Если каталог пустой, скажем об этом
    drawCatalogEmpty(messages) {
        const wrap = document.createElement('p');
        wrap.textContent = messages;

        cartItem.appendChild(wrap);
    };

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
    };
};

class Basket {
    constructor(){
        this.shopCart = {};
        this.orderInfo = { 'idx': 1000 };
    };
    
    //Цена корзины без скидки
    basketPrice() {
        let result = 0;
        for ( let el in this.shopCart ) {
            result += this.shopCart[el]['price'] * this.shopCart[el]['counter'] ;
        }
        return result;
    };
  
    // кол-во товара в корзине
    countBasket() {
        let count = 0;
        for ( let el in this.shopCart ) {
            count += this.shopCart[el]['counter'];
        }
        return count;
    };

    //Рисуем заголовок корзины
    drawBasketTitle(message) {
        const basketTitle = document.createElement('h2');
        basketTitle.classList.add('basket__title');
        basketTitle.textContent = message;

        modalBasket.appendChild(basketTitle);
    };

    //Если корзина пустая, скажем об этом
    drawBasketEmpty(messages) {
        const wrap = document.createElement('p');
        wrap.textContent = messages;

        modalBasket.appendChild(wrap);
    };

    //Создаем товар для корзины
    createBasketProduct(product) {
        let goods = {};
        goods.name = product.name;
        goods.price = product.price;
        goods.img = product.srcMini;
        goods.counter = 1;

        return goods;
    };

    //Добавляем товар в корзину
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

    //Убираем товар из корзины
    removeBasketProduct(product) {
    
        for ( let el in this.shopCart ) {
            if ( el == product.id ) {
                if ( this.shopCart[el]['counter'] > 1 ){
                    this.shopCart[el]['counter']--;
                } else {
                    delete this.shopCart[el];
                };
            };
        };
    };

    //Отрисовываем корзину с товарами в виде таблицы
    drawBasketProduct(product, idx, listProduct){
        const goods = document.createElement('li');
        goods.className = 'goods__item';

        const goodsLeft = document.createElement('div');
        goodsLeft.className = 'goods__left';

        const goodsTitle = document.createElement('h3');
        goodsTitle.className = 'goods__title';
        goodsTitle.textContent = product.name;
        const goodsImg = document.createElement('img');
        goodsImg.className = 'goods__img';
        goodsImg.setAttribute('src', product.img);

        goodsLeft.appendChild(goodsTitle);
        goodsLeft.appendChild(goodsImg);

        const goodsRight = document.createElement('div');
        goodsRight.className = 'goods__right';

        const goodsNum = document.createElement('p');
        goodsNum.className = 'goods__number';
        goodsNum.textContent = `${product.counter}`;

        const goodsPlus = document.createElement('button');
        goodsPlus.className = 'btn  goods__btn  goods__btn--add  btn--plus';
        goodsPlus.setAttribute('data-id', idx);
        goodsPlus.textContent = '+';


        const goodsMinus = document.createElement('button');
        goodsMinus.className = 'btn  goods__btn  goods__btn--remove  btn--minus';
        goodsMinus.setAttribute('data-id', idx);
        goodsMinus.textContent = '-';


        goodsRight.appendChild(goodsPlus);
        goodsRight.appendChild(goodsNum);
        goodsRight.appendChild(goodsMinus);

        goods.appendChild(goodsLeft);
        goods.appendChild(goodsRight);

        listProduct.appendChild(goods);

        modalBasket.appendChild(listProduct);

    };

    //Отрисовываем "close" модального окна
    drawBasketClose() {
        const closeModal = document.createElement('button');
        closeModal.setAttribute('class', 'button__close');
        closeModal.setAttribute('type', 'button');

        const closeImg = document.createElement('img');
        closeImg.setAttribute('class', 'close');
        closeImg.setAttribute('src', 'assets/img/close.svg');
        closeImg.setAttribute('alt', 'Close');

        closeModal.appendChild(closeImg);

        modalBasket.appendChild(closeModal);
    };

    //Отрисовываем сепаратор
    drawSeparator() {
        const separator = document.createElement('hr');
        separator.className = 'separator';

        modalBasket.appendChild(separator);
    };

    //Отрисовываем итог корзины
    drawBasketTotal() {
        const total = document.createElement('div');
        total.className = 'total';

        const totalText = document.createElement('p');
        totalText.className = 'total__text';
        totalText.textContent = 'Итого: ';

        const totalNum = document.createElement('div');
        totalNum.className = 'total__num';
        totalNum.textContent = `${this.basketPrice()} руб.`

        total.appendChild(totalText);
        total.appendChild(totalNum);

        modalBasket.appendChild(total);
    };

    //Отрисовываем корзину в шапку
    drawBasketHeader() {

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
        };
        
    };

    //Отрисовка в модальном окне кнопки "Далее"
    drawButtonNext() {
        const basketNext = document.createElement('div');
        basketNext.classList.add('basket__next');

        const buttonNext = document.createElement('button');
        buttonNext.classList.add('next__button');
        buttonNext.setAttribute('data-next', 'next');
        buttonNext.textContent = 'Далее';

        basketNext.appendChild(buttonNext);

        modalBasket.appendChild(basketNext);
    };

    //Отрисовываем корзину в модальное окно
    drawModalBasket() {
        modalBasket.textContent = '';

        this.drawBasketClose();

        if ( Object.keys( this.shopCart ).length == 0 ){
            this.drawBasketTitle('Корзина: ');
            this.drawSeparator();
            this.drawBasketEmpty('Ваша корзина пуста!');
        } else {
            this.drawBasketTitle('Корзина: ');
            this.drawSeparator();

            const listProduct = document.createElement('ul');
            listProduct.className = 'basket__list';
            
            for ( let el in this.shopCart ) {
                this.drawBasketProduct(this.shopCart[el], el, listProduct);
            };

            this.orderInfo['price'] = this.basketPrice();

            this.drawSeparator();
            this.drawBasketTotal();
            this.drawButtonNext();

        };

        modal.appendChild(modalBasket);


    };

    //Отрисовываем окно ввода адреса
    drawModalAddres() {
        modalBasket.textContent = '';

        console.log();
        this.drawBasketClose();
        this.drawBasketTitle('Адрес доставки: ');
        this.drawSeparator();

        const modalAddres = document.createElement('form');
        modalAddres.classList.add('modal__form-addres');

        const addresInput = document.createElement('input');
        addresInput.classList.add('modal__form-input');
        addresInput.setAttribute('placeholder', 'Введите адрес доставки');
        addresInput.setAttribute('data-input', 'addresInput');

        modalAddres.appendChild(addresInput);

        modalBasket.appendChild(modalAddres);

        this.drawSeparator();
        this.drawButtonNext();

        modal.appendChild(modalBasket);
    };

    //Отрисовываем окно ввода комментария
    drawModalComment() {
        modalBasket.textContent = '';

        this.drawBasketClose();
        this.drawBasketTitle('Комментарий: ');
        this.drawSeparator();

        const modalAddres = document.createElement('form');
        modalAddres.classList.add('modal__form-comment');

        const commentInput = document.createElement('textarea');
        commentInput.classList.add('modal__form-input-comment');
        commentInput.setAttribute('placeholder', 'Напишите комментарий: ');
        commentInput.setAttribute('data-input', 'commentInput');


        modalAddres.appendChild(commentInput);

        modalBasket.appendChild(modalAddres);

        this.drawSeparator();
        this.drawButtonNext();

        modal.appendChild(modalBasket);
    };

    //Отрисовываем информацию...
    drawInfoItem(title, value) {
        const wrap = document.createElement('div');
        wrap.classList.add('info__item');

        const infoTitle = document.createElement('h3');
        infoTitle.classList.add('info__title');
        infoTitle.textContent = title;

        const infoValue = document.createElement('p');
        infoValue.classList.add('info__value');
        infoValue.textContent = value;

        wrap.appendChild(infoTitle);
        wrap.appendChild(infoValue);

        modalThanks.appendChild(wrap);
    };
    
    //Отрисовываем окно вывода инфорамции о заказе
    drawModalOrder() {
        modalBasket.textContent = '';
        modalThanks.textContent = '';

        this.drawBasketClose();

        const thanksText = document.createElement('h2');
        thanksText.classList.add('thanks__text');
        thanksText.textContent = 'Спасибо за заказ!';

        

        this.drawBasketTitle('Информация о заказе: ');
        this.drawSeparator();

        for (let el in this.orderInfo) {
            switch (el) {
                case 'idx':
                    this.drawInfoItem('Ваш заказ: ', this.orderInfo[el]);
                    break;
                case 'price':
                    this.drawInfoItem('Сумма заказа: ', this.orderInfo[el]);
                    break;
                case 'address':
                    this.drawInfoItem('Адрес доставки: ', this.orderInfo[el]);
                    break;
                case 'comment':
                    this.drawInfoItem('Комментарий к заказу: ', this.orderInfo[el]);
                    break;
            };
        };

        modalThanks.appendChild(thanksText);
        modalBasket.appendChild(modalThanks);

        this.drawSeparator();

        this.drawButtonContinue();
    };

    //Отрисовка в модальное окно кнопки "Продолжить покупки"
    drawButtonContinue() {
        const html = `<div class="basket__continue">
            <button class="continue__button" data-continue='continue'>Продолжить покупки</button>
        </div>`;

        modalBasket.insertAdjacentHTML('beforeend', html);
    }
};

//Создаем экземпляр каталога
let directory = new Catalog();

//Создаем экземпляр корзины
let shopBasket = new Basket();

//Заполняем каталог
directory.products.push(new Product('1001', 'Хлеб', 80, 'Самый свежий хлеб', 4.8, 15, 'assets/img/small/1.jpg'));
directory.products.push(new Product('1002', 'Шоколад', 100, 'Горький шоколад 90%', 5.0, 20, 'assets/img/small/2.jpg'));
directory.products.push(new Product('1003', 'Молоко', 70, 'Цельное коровье молоко', 4.9, 50, 'assets/img/small/3.jpg'));
directory.products.push(new Product('1004', 'Мясо', 220, 'Куриная грудка', 4.9, 10, 'assets/img/small/4.jpg'));
directory.products.push(new Product('1005', 'Колбаса', 110, 'Докторская', 4.9, 10, 'assets/img/small/5.jpg'));
directory.products.push(new Product('1006', 'Сыр', 110, 'Российский', 4.5, 40, 'assets/img/small/6.jpg'));

directory.showCatalogNamePrice();

// Слушает кнопки "Добавить"
document.onclick = e => {
    if ( e.target.classList.contains('btn--plus') ){
        let idProd = e.target.dataset.id;
        let lenObj = Object.keys(directory.products).length;

        for (var i = 0; i < lenObj; i++) {
            if ( directory.products[i].id == idProd ) {
                shopBasket.addBasketProduct(directory.products[i]);
                shopBasket.drawBasketHeader();
                shopBasket.drawModalBasket();
            };
        };
    };
};

// Слушает кнопки "Удалить"
document.addEventListener('click', function(e) {
    if ( e.target.classList.contains('btn--minus') ) {
        let idProd = e.target.dataset.id;
        let lenObj = Object.keys(directory.products).length;

        if ( Object.keys(shopBasket.shopCart).length > 0 ) {
            for (var i = 0; i < lenObj; i++) {
                if ( directory.products[i].id == idProd ) {
                    shopBasket.removeBasketProduct(directory.products[i]);
                    shopBasket.drawModalBasket();
                };
            };
        } else {
            shopBasket.drawModalBasket();
        } 
    };
});

// Слушает кнопку корзина в шапке
document.addEventListener('click', function(e) {
    if ( e.target.classList.contains('header__img') ) {
        goodsModal.setAttribute('style', 'display: block');
        body.classList.add('body__noscroll');
        shopBasket.drawModalBasket();
    };
});

// Слушает кнопку close на странице корзины
document.addEventListener('click', function(e) {
    if ( e.target.classList.contains('close') ) {
        goodsModal.setAttribute('style', 'display: none');
        body.classList.remove('body__noscroll');
        shopBasket.shopCart = {};
        shopBasket.drawBasketHeader();
        currentWindow = 0;
    }
});

// Слушает кнопку "Далее" в модальном окне
let modalWindow = [shopBasket.drawModalAddres, shopBasket.drawModalComment, shopBasket.drawModalOrder];
let currentWindow = 0;
document.addEventListener('click', function(e) {
    if ( (e.target.dataset.next == 'next' ) ) {
        switch (currentWindow) {
            case 0:
                shopBasket.drawModalAddres();
                currentWindow++;
                break;
            case 1:
                shopBasket.drawModalComment();
                currentWindow++;
                break;
            case 2:
                shopBasket.drawModalOrder();
                currentWindow++;
                break;
        }
    };   
});

// Слушает инпут на изменение
document.addEventListener('change', function(e) {
    let item = e.target.value;
    if ( e.target.dataset.input == 'addresInput' ) {
        shopBasket.orderInfo['address'] = item;
    } else if ( e.target.dataset.input == 'commentInput' ) {
        shopBasket.orderInfo['comment'] = item;
    }
});

// Слушает кнопку "Продолжить покупки" в окне информации
document.addEventListener('click', function(e) {
    if ( e.target.dataset.continue == 'continue' ) {
        shopBasket.shopCart = {};
        shopBasket.drawBasketHeader();
        goodsModal.setAttribute('style', 'display: none');
        body.classList.remove('body__noscroll');
        currentWindow = 0;
    }
});
