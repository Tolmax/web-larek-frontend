# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src\scss\styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Данные и типы данных, используемые в приложении

Карточка товара
```
export interface IGood {
	id: string;
    description: string;
    image: String;
    title: string;
    category: string;
    price: number | null;
}
```
Индивидуальные данные заказа

```
export interface IOrder {
    payment: TOrderPayment;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

```
Данные карточки товара для отображения на сайте
```
export interface CardMiniNodes {
    card: HTMLButtonElement;
    cardCategory: HTMLElement;
    cardTitle: HTMLElement;
    cardImage: HTMLImageElement;
    cardPrice: HTMLElement;
    cardDescription: HTMLElement;
}
```
Интерфейс для класса MODAL который наследуется в каждое конкретное модальное окно
```
export interface ModalNodes {
    modal: HTMLElement;
    modalClose: HTMLButtonElement;
    modalContent: HTMLElement;
}
```
Модальное окно с выбранной карточкой и кнопкой "В КОРЗИНУ"
```
export interface ModalProductNodes {
    modalProduct: HTMLElement;
    modalProductImage: HTMLImageElement;
    modalProductCategory: HTMLElement;
    modalProductTitle: HTMLElement;
    modalProductDescription: HTMLElement;
    modalProductButton: HTMLButtonElement;
    modalProductPrice: HTMLElement;
}
```
Модальное окно корзины с выбранными товарами и кнопкой "ОФОРМИТЬ"
```
export interface ModalBasketNodes {
    modalBasket: HTMLElement;
    modalBasketSubmit: HTMLButtonElement;
    modalBasketPrice: HTMLElement;
}
```
Модальное окно окно с первой формой оформления заказа с добавлением метода платежа, адреса доставки и кнопкой "ДАЛЕЕ"
```
export interface ModalOrderNodes {
    modalOrder: HTMLElement;
    modalOrderForm: HTMLFormElement;
    modalOrderErrors: HTMLSpanElement;
    modalOrderCashButton: HTMLButtonElement;
    modalOrderCardButton: HTMLButtonElement;
    modalOrderInput: HTMLInputElement;
    modalOrderSubmitButton: HTMLButtonElement;
}

export type TOrderPayment = 'online' | 'offline';
```

Модальное окно окно со второй формой оформления заказа с добавдением электронной почты, телефона и кнопкой "ОФОРМИТЬ"
```
export interface ModalContactsNodes {
    modalContacts: HTMLElement;
    modalContactsForm: HTMLFormElement;
    modalContactsErrors: HTMLSpanElement;
    modalContactsEmailInput: HTMLInputElement;
    modalContactsPhoneInput: HTMLInputElement;
    modalContactsSubmitButton: HTMLButtonElement;
}
```
Модальное окно с уведомлением об успешной оплате и общей списанной суммой оплаты
```
export interface ModalSuccessNodes {
    modalSuccess: HTMLElement;
    modalSuccessDescription: HTMLElement;
    modalSuccessCloseButton: HTMLButtonElement;
}
```
Интерфейс для класса ApiWeblarekService с описанием полей ответа сервера после отправки заказа
``` 
export interface IApiResponseCreateOrder {
    id: string;
    total: number;
}
```
Интерфейс для класса ApiWeblarekService с описанием полей ответа сервера после отправки запроса карточек товара
export interface IApiResponseGetProductList {
    total: number;
    items: IProduct[];
}
```

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVС: 
- слой представления, отвечает за отображение данных на странице, 
- слой данных, отвечает за хранение и изменение данных
- контроллер, отвечает за бизнес-логику и связь представления и данных.

### Слой коммуникации

#### Класс AppApi
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Методы: 
- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс Events
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в контроллере для обработки событий и в слоях приложения для генерации событий.  
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:
- `on` - подписка на событие
- `emit` - инициализация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие   

### Слой данных

#### Класс ProductsStore
Класс отвечает за хранение хранение карточек товара, которые получили с сервера.\

- constructor(events: EventEmitter) Конструктор класса принимает инстант брокера событий

В полях класса хранятся следующие данные:

- _products: IProduct[] = []; - массив карточек товаров.
- _events: EventEmitter; - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

Так же класс предоставляет методы:

- public setAll(products: IProduct[]): void; - создает массив карточек товара при получение ответа от сервера при загрузки сайта

- public getAll(): IProduct[]  - позволит получить массив карточек товара при необходимости.

- public getOne = (_id: string): IProduct | undefined - получает карточку товара по идентификатору.

#### Класс BasketStore

Класс отвечает за хранение и логику работы с данными корзины товаров. Данные корзины - это только список товаров, выбранных пользователем для покупки и кнопка "Оформить".\

- constructor(events: EventEmitter, productsStore: ProductsStore) Конструктор принимает выбранный пользователем товар из массива товара и экземпляр класса `EventEmitter` для возможности инициации событий.

В полях класса хранятся следующие данные:

- _basket - массив объектов выбранных товаров
- _productsStore: ProductsStore; - данные класса со всеми карточками товаров
- _events: EventEmitter; - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

Так же класс предоставляет набор методов для взаимодействия с этими данными:

- public add(productId: string): void - помогает контроллеру добавить карточку в корзину товаров.
- public delete(productId: string) - удаляет товар из корзины при нажатии кнопки.
- get size(): number - рассчитывает количество товара в корзине.
- public getAllIds(): string[] - возвращает массив ID товаров из корзины.
- public getAll(): IProduct[] - возвращает карточки товаров из корзины.
- public calcSum(): number - возвращает стоимость корзины при ее отрисовке или удалении товара.

#### Класс OrderStore

Класс отвечает за хранение данных текущего покупателя и возврат объекта с данными заказа для отправки на сервер.\

- constructor(basketStore: BasketStore) Конструктор класса принимает данные карточек товаров из BasketStore

В полях класса хранятся следующие данные:

- _payment: TOrderPayment | null - выбранный способ оплаты товара online или при получении.
- _email: string | null - данные об электронном адресе покупателя.
- _phone: string | null - телефон покупателя.
- _address: string | null - почтовый адрес покупателя.
- _basketStore: BasketStore - данные выбранных в корзину товаров.

Так же класс предоставляет набор методов для взаимодействия с этими данными:

- public setPayment(payment: TOrderPayment): void - сохранение способа платежа.
- public setAddress(address: string): void - сохранение адреса доставки.
- public setEmail(email: string): void - сохранение емейла покупателя.
- public setPhone(phone: string): void - сохранение телефона покупателя
- public getOrder(): IOrder - при необходимости, выдаст ошибку что одно из полей заказа пустое.

### Классы представления
Все классы представления отвечают за отображение внутри контейнера (DOM-элемент) передаваемых в них данных.

#### Класс Modal
В проекте сайта присутствуют пять различных шаблонов контента модального окна, которые определены в шаблонах <tamplate> находящихся в файле index.html. Таким образом надо реализовать класс - универсальный контейнер, в конструктор которого будет передаваться готовый контент, полученный при обращении к специальному классу слоя view, собирающему определенный контент по шаблону.\ А также этот универсальный класс будет содержать методы, необходимые для реализации модального окна: `open` и `close` для управления отображением модального окна. Метод `open` устанавливает свойство display контейнера в значение block, что делает его видимым. Метод `close`, наоборот, устанавливает это свойство в none, скрывая окно. (Путем добавления или удаления селектора 'modal_active'). И метод, который устанавливает слушатели для закрытия модального окна по нажатию на кнопку Esc, клику на оверлей и кнопку-крестик для закрытия попапа.

- constructor(_modalNodes: ModalNodes) конструктор создает разметку контейнера для модального окра и объявляет слушетели событий для его закрытия при клике на кнопку закрытия или полю вне окна overley.

Методы

- protected _render(content: HTMLElement): void - вставляет контейнер модального окна в разметку HTML.
- protected _open(): void - открывает модальное окно при нажатии на: карточку товара, конопку "КОРЗИНА", кнопку "ДАЛЕЕ", кнопку "ОПЛАТИТЬ".
- protected _close = (): void => - закрывает модальное окно.
- private _handleEscUp = (evt: KeyboardEvent): void - закрывает модальное окно при нажатии кнопки ESK.

#### Класс ModalProduct
Предназначен для реализации модального окна карточки товара. При инициализации (клике по карточке) находит по переданным через контроллер id нужный шаблон и данные карточки, чтобы сформировать с помощью метода _createHTMLElement готовый элемент разметки и передать его классу Modal для открытия методом `open`\ Добавляет на кнопку обработчик клика\
При нажатии кнопки подтверждения выбора товара вызывает действие брокера событий, передает ИД карточки в массив Корзины товаров и закрывает модальное окно методом `close` сласса Modal.

constructor (events: EventEmitter, templateSelector: string) - Конструктор принимает выбранный селектор шаблона модального окна и экземпляр класса `EventEmitter` для возможности инициации событий.

Поля класса:

- _templateSelector: string; - селектор класса разметки модального окна.
- _events: EventEmitter; - экземпляр класса `EventEmitter` для инициации событий при изменении данных.
- _nodes: ModalProductNodes; - интерфейс с собираемыми полями модального окна.

Методы:

- public open(product: IProduct): void - открывает окно. Сначала создает с помощью метода _createHTMLElement готовый элемент разметки, вставляет его в контейе наследуемого класса. Готовый контейнер помещает в разметку методом _render и делает его видимым наследуемым методом _open().
- _createHTMLElement(product: IProduct): HTMLElement - с помощью утилиты cloneTemplate(this._templateSelector), присваивая значения из свойств объекта переданной карточки товара, создает элемент готовой разметки выбранного модального окна. Вешает слушатель на кнопку закрытия.

#### Класс ModalBasket
Предназначен для реализации модального окна корзины товаров. При инициализации (клике по иконке корзины) находит по переданным через контроллер id нужный шаблон, чтобы сформировать с помощью метода _createHTMLElement готовый элемент разметки и передать его классу Modal для открытия методом `open`\ 
Особенностью класса является то, что он внутри себя принимает данные карточек товара, созданные по его запросу другим классом BasketItemComponent и методом мар создает массив карточек, данные из которого потом вставляет в свою разметку. Добавляет слушатель на кнопку окна ОТПРАВИТЬ, при котором генерируется событие.\

constructor(events: EventEmitter, templateSelector: string, basketStore: BasketStore, basketItemComponent: BasketItemComponent) - Конструктор принимает выбранный селектор шаблона модального окна, экземпляр класса `BasketStore`, экземпляр класса `BasketItemComponent` и экземпляр класса `EventEmitter` для возможности инициации событий.

Поля класса:

- _templateSelector: string - селектор класса разметки модального окна.
- _events: EventEmitter - экземпляр класса `EventEmitter` для инициации событий при изменении данных.
- _nodes: ModalBasketNodes - интерфейс с собираемыми полями модального окна.
- _basketStore: BasketStore - данные класса корзины товаров.
- _basketItemComponent: BasketItemComponent - данные класса с генерируемыми карточками товара в корзине.

Методы:

- public open(): void - открывает окно. Сначала создает с помощью метода _createHTMLElement готовый элемент разметки, вставляет его в контейер наследуемого класса. Готовый контейнер помещает в разметку методом _render и делает его видимым наследуемым методом _open().
- _createHTMLElement(): HTMLElement - с помощью утилиты cloneTemplate(this._templateSelector), присваивая значения аргументам класса, создает элемент готовой разметки выбранного модального окна. Вешает слушатель на кнопку закрытия.
- _calcBasketInfo = () => - рассчитывает общую стоимость товаров в корзине и делает кнопку ОТПРАВИТЬ активной, при наличии товара в корзине.

#### Класс ModalOrder
Предназначен для реализации модального окна с формой содержащей поля ввода адреса и кнопками выбора платежа. Передает готовый элемент разметки в класс Modal. При сабмите инициирует событие передавая в объект класса OrderStore данные из поля ввода формы и выбранным методом платежа. Предоставляет методы для отображения ошибок и управления активностью кнопки сохранения.\

constructor(events: EventEmitter, templateSelector: string,	orderStore: OrderStore) - Конструктор принимает выбранный селектор шаблона модального окна, экземпляр класса `OrderStore` и экземпляр класса `EventEmitter` для возможности инициации событий.
	
Поля класса:

- _templateSelector: string - селектор класса разметки модального окна.
- _events: EventEmitter - экземпляр класса `EventEmitter` для инициации событий при изменении данных.
- _nodes: ModalOrderNodes - интерфейс с собираемыми полями модального окна.
- _orderStore: OrderStore - класс с хранением данных покупателя.
- _paymentMethod: TOrderPayment | null = null - выбранный метод платежа.

Методы:

- public open(): void - открывает окно. Сначала создает с помощью метода _createHTMLElement готовый элемент разметки, вставляет его в контейер наследуемого класса. Готовый контейнер помещает в разметку методом _render и делает его видимым наследуемым методом _open().
- _createHTMLElement(): HTMLElement - с помощью утилиты cloneTemplate(this._templateSelector), присваивая значения аргументам класса, создает элемент готовой разметки выбранного модального окна. Вешает слушатель на кнопку закрытия и сохраняет в класс `OrderStore` значения полей платежа и адреса.
- private _setPayment(payment: TOrderPayment): void - присваивает значение способу платежа, активирую нажатую кнопку и деактивирую другую кнопку.
- private _validate(): void - проверяет валидацию формы.

#### Класс ModalContacts
Предназначен для реализации модального окна с формой содержащей поля ввода емейла и телефона. Передает готовый элемент разметки в класс Modal. При сабмите инициирует событие передавая в объект класса OrderStore данные из полей ввода формы. Вешает слушатель на кнопку ОПЛАТИТЬ с методом отправки запроса на сервер. Предоставляет методы для отображения ошибок и управления активностью кнопки сохранения.\

constructor(events: EventEmitter, templateSelector: string, orderStore: OrderStore, apiWeblarekService: ApiWeblarekService) - Конструктор принимает выбранный селектор шаблона модального окна, экземпляр класса `OrderStore`, экземпляр класса `ApiWeblarekService` для получения данных для отправки заказа на сервер и экземпляр класса `EventEmitter` для возможности инициации событий.

Поля класса:

- _templateSelector: string - селектор класса разметки модального окна.
- _events: EventEmitter - экземпляр класса `EventEmitter` для инициации событий при изменении данных.
- _nodes: ModalContactsNodes - интерфейс с собираемыми полями модального окна.
- _orderStore: OrderStore - класс с хранением данных покупателя.
- _apiWeblarekService: ApiWeblarekService - сервисный класс с методами отправки запроса на сервер.

Методы:
- public open(): void - открывает окно. Сначала создает с помощью метода _createHTMLElement готовый элемент разметки, вставляет его в контейер наследуемого класса. Готовый контейнер помещает в разметку методом _render и делает его видимым наследуемым методом _open().
- _createHTMLElement(): HTMLElement - с помощью утилиты cloneTemplate(this._templateSelector), присваивая значения аргументам класса, создает элемент готовой разметки выбранного модального окна. Вешает слушатель на кнопку закрытия и сохраняет в класс `OrderStore` значения полей емейла и телефона. А также инициирует отправку запроса на сервер с данными заказа.
- private _validate(): void - проверяет валидацию формы.

#### Класс ModalSuccess
Предназначен для реализации модального окна подтверждения оплаты и формирования заказа. Передает готовый элемент разметки в класс Modal. При открытии модального окна получает как аргумент данные из ответа сервера о номере и общей суммы заказа.\

constructor( events: EventEmitter, templateSelector: string) - Конструктор принимает выбранный селектор шаблона модального окна и экземпляр класса `EventEmitter` для возможности инициации событий.

Поля класса:
- _templateSelector: string - селектор класса разметки модального окна.
- _events: EventEmitter - экземпляр класса `EventEmitter` для инициации событий при изменении данных.
- _nodes: ModalSuccessNodes - интерфейс с собираемыми полями модального окна.

Методы:
- public open(): void - открывает окно. Сначала создает с помощью метода _createHTMLElement готовый элемент разметки, вставляет его в контейер наследуемого класса. Готовый контейнер помещает в разметку методом _render и делает его видимым наследуемым методом _open().
- _createHTMLElement(product: IProduct): HTMLElement - с помощью утилиты cloneTemplate(this._templateSelector), присваивая значения аргументам класса беря значения суммы товара из ответа, полученного с сервера, создает элемент готовой разметки выбранного модального окна. Вешает слушатель на кнопку закрытия.

#### Класс Component
Наследуемый класс, содержащий в себе конструктор constructor(events: EventEmitter, templateSelector: string) с создаваемым с помощью метода cloneTemplate(templateSelector) контейнер, куда будут записываться готовый элемент модального окна. И абстрактный метод createHTMLElement(data: T, ...args: any[]): HTMLElement который используется в классах представления для создания готового элемента модального окна.\ 

## Взаимодействие компонентов

#### Класс AppController
Класс контроллер, отвечающий за взаимодействие классов слоя данных с классами слоя представления. Содержит в себе метод init() для отрисовки сайта путем инициализации методов:

- _loadProducts(): void - получает с сервера данные с карточками товаров и отрисовывает их на сайте.
- _listenEvents(): void - с помощью метода on() брокера событий инициализирует работу методов классов данных и представления.

Кроме этого вешает слушатель на кнопку корзины для открытия корзины товаров.

*Список всех событий, которые могут генерироваться в системе:*\
*События изменения данных (генерируются классами моделями данных)*

- `products:changed` - изменение массива карточек товара.
- `basket:changed` - изменение массива карточек товара добавленных в корзину.

*События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)*

- `product:open` - открытие модального окна с формой просмотра карточки товара.
- `basket:add` - добавление товара в корзину и закрытие модального окна с формой просмотра карточки товара.
- `basket:delete` - удаление товара из корзины, при этом пересчитывается общая стоимость.
- `basket:submit` - подтверждение выбора корзины товаров, закрытие модального окна корзины товаров и открытие модального окна способа оплаты.
- `order:submit` - подтверждение выбранных/введенных данных, закрытие модального окна способа оплаты и открытие модального окна адреса/телефона.
- `contacts:submit` - подтверждение введенных данных, закрытие модального окна адреса/телефона, отправка запроса `POST` на сервер и открытие модального окна успех.
- `success:submit` - закрытие модального окна успех и перезагрузка основной страницы сайта.








<!-- задать вопрос в чате -->
<!-- - `basket:open` - открытие модального окна с формой просмотре корзины -->
<!-- - `good:click`, `cash:click` - выбор способа оплаты товара онлайн или при получении -->
<!-- - `address:input` - изменение данных адреса доставки в форме  способа оплаты -->
<!-- - `address:validation` - событие, сообщающее о необходимости валидации поля адреса доставки в форме способа оплаты -->
<!-- - `email:input` - изменение данных емейла в форме адреса/телефона -->
<!-- - `email:validation` - событие, сообщающее о необходимости валидации поля емейла в форме адреса/телефона -->
<!-- - `phone:input` - изменение данных телефона в форме адреса/телефона -->
<!-- - `phone:validation` - событие, сообщающее о необходимости валидации поля телефона в форме адреса/телефона -->