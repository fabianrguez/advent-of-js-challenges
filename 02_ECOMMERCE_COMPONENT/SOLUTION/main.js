const addToCartButtons = document.querySelectorAll('.menu-item .btn');
const cartWrapper = document.querySelector('.cart .wrapper');
const cartItemTemplate = document.querySelector('#cart-item-template');
const cartDetailsTemplate = document.querySelector('#cart-details-template');

let store;

function createCart() {
  const cart = {
    items: [],
    subtotal: 0,
    tax: 1.96,
    total: 0,
  };

  function findItemIndex(item) {
    return cart.items.findIndex(({ id }) => id === item.id);
  }

  function isItemAdded(item) {
    const itemIndex = findItemIndex(item);
    return itemIndex !== -1;
  }

  function updateTotals() {
    cart.subtotal = cart.items.reduce(
      (accumulator, item) => (accumulator = accumulator + +item.price * item.quantity),
      0
    );
    cart.total = +(cart.subtotal + cart.tax).toFixed(2);
  }

  function removeItem(id) {
    let itemsNumber = 0;
    const itemIndex = findItemIndex({ id });

    if (this.cart.items[itemIndex].quantity > 1) {
      this.cart.items[itemIndex] = { ...this.cart.items[itemIndex], quantity: this.cart.items[itemIndex].quantity - 1 };
      itemsNumber = +this.cart.items[itemIndex].quantity;
    } else {
      this.cart.items.splice(itemIndex, 1);
    }

    updateTotals();

    return itemsNumber;
  }

  function addItem(item) {
    let itemsNumber = 1;
    if (isItemAdded(item)) {
      const itemIndex = findItemIndex(item);
      this.cart.items[itemIndex] = { ...this.cart.items[itemIndex], quantity: this.cart.items[itemIndex].quantity + 1 };
      itemsNumber = +this.cart.items[itemIndex].quantity;
    } else {
      this.cart.items = [...this.cart.items, { ...item, quantity: 1 }];
    }
    updateTotals();

    return itemsNumber;
  }

  return {
    cart,
    addItem,
    removeItem,
  };
}

function removeElementFromDom(element) {
  element.addEventListener('animationend', (e) => e.target.remove());
  element.classList.add('fade-down');
}

function createCartItem({ item, price, image, quantity, id }) {
  const totalPrice = +quantity * +price;
  cartItemTemplate.content.querySelector('.cart-item').dataset.id = id;
  cartItemTemplate.content.querySelector('.cart-item').dataset.quantity = quantity;
  cartItemTemplate.content.querySelector('.cart-item__content .text').innerText = item;
  cartItemTemplate.content.querySelector('.cart-item__image img').src = image;
  cartItemTemplate.content.querySelector('.cart-item__content-item-price').innerText = price;
  cartItemTemplate.content.querySelector('.cart-item__quantity').innerText = quantity;
  cartItemTemplate.content.querySelector('.cart-item__total').innerText = totalPrice;

  return document.importNode(cartItemTemplate.content, true);
}

function addCartDetails({ subtotal, tax, total }) {
  cartDetailsTemplate.content.querySelector('.subtotal .quantity').innerText = subtotal;
  cartDetailsTemplate.content.querySelector('.tax .quantity').innerText = tax;
  cartDetailsTemplate.content.querySelector('.total .quantity').innerText = total;

  return document.importNode(cartDetailsTemplate.content, true);
}

function modifyQuantity() {
  const { action } = this.dataset;
  const cartItem = this.closest('.cart-item');
  const { id } = cartItem.dataset;
  let quantity = 0;
  if (action === 'add') {
    quantity = store.addItem({ id });
  } else {
    quantity = store.removeItem(id);
  }

  cartItem.querySelector('.cart-item__quantity').innerText = quantity;
  updateCartTotal(store.cart);

  if (quantity === 0) {
    removeElementFromDom(cartItem);
    const menuItem = document.querySelector(`.menu-item[data-id="${id}"] .btn`);
    menuItem.classList.remove('btn-check');
    menuItem.innerText = 'Add to Card';
  }
}

function addCartItemToDom(cartItem) {
  const cartItems = cartWrapper.querySelector('.cart-items');
  cartItem
    .querySelectorAll('.cart-item__quantity-wrapper .btn')
    .forEach((button) => button.addEventListener('click', modifyQuantity));
  cartItems.appendChild(cartItem);
}

function updateCartTotal({ subtotal, tax, total, items }) {
  const cartTotal = cartWrapper.querySelector('.cart-total');
  if (items.length > 0) {
    if (!cartTotal.firstElementChild) {
      cartTotal.appendChild(addCartDetails({ subtotal, tax, total }));
    } else {
      const cartDetails = document.querySelector('.cart-details');
      cartDetails.querySelector('.subtotal .quantity').innerText = subtotal;
      cartDetails.querySelector('.total .quantity').innerText = total;
    }
  } else {
    removeElementFromDom(cartTotal.firstElementChild);
    cartWrapper.querySelector('.empty-message').classList.remove('hidden');
  }
}

function addItemToCart() {
  const { price, item, id, image } = this.closest('.menu-item').dataset;
  const itemsNumber = store.addItem({ price, item, id });

  this.innerText = 'In Cart';
  this.classList.add('btn-check');

  if (store.cart.items.length > 0) {
    cartWrapper.querySelector('.empty-message').classList.add('hidden');
  }
  if (itemsNumber === 1) {
    const cartItem = createCartItem({ price, id, item, image, quantity: itemsNumber });
    addCartItemToDom(cartItem);
    updateCartTotal(store.cart);
  }
}

function initCart() {
  store = createCart();
}

addToCartButtons.forEach((addToCartButton) => addToCartButton.addEventListener('click', addItemToCart));
document.addEventListener('DOMContentLoaded', initCart);
