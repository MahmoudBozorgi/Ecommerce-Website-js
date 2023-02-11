let basket = JSON.parse(localStorage.getItem("data")) || [];

// subtotal;
const totalContainer = document.getElementById("shopping-items");
const cartTotals = document.getElementById("subtotal");
const cartAdd = document.getElementById("cart-add");

const calculation = () => {
  const cartIcon = document.getElementById("cart-amount");
  (cartIcon.innerHTML = basket
    .map((x) => x.item)
    .reduce((prev, acc) => prev + acc, 0)),
    0;
};
calculation();

const generateCartItems = () => {
  if (basket.length !== 0) {
    totalContainer.innerHTML = basket
      .map((y) => {
        const { id, item } = y;
        const matchedItem = data.find((x) => x.id === id);
        const { name, price, img } = matchedItem;

        return `
      <tr>
        <td>
          <i onclick="removeItem(${id})" class="bi bi-x-circle close"></i>
        </td>
        <td><img src=${img} alt="" /></td>
        <td>${name}</td>
        <td>$${price}</td>
        <td>
          <div class="quantity-container">
           <i onclick="decrement(${id})" class="bi bi-dash-lg card"></i>
            <div id=${id} class="quantity">${item}</div>
          <i onclick="increment(${id})" class="bi bi-plus-lg card"></i>
         </div>
        </td>
        <td>$${price * item}</td>
      </tr>
      `;
      })
      .join("");
  } else {
    cartAdd.innerHTML = "";
    totalContainer.innerHTML = `
    <div class="empty">
    <h2>Cart is Empty :(</h2>
    <a href="index.html"><button class="normal">Back to home</button> </a>
    </div>
    `;
  }
};

generateCartItems();

const increment = (id) => {
  const selectedItem = id;
  const search = basket.find((item) => item.id === selectedItem);
  if (search === undefined) {
    basket.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem);
  localStorage.setItem("data", JSON.stringify(basket));
};

const decrement = (id) => {
  const selectedItem = id;
  const search = basket.find((item) => item.id === selectedItem);

  if (search === undefined) return;
  else if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }
  update(selectedItem);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();

  localStorage.setItem("data", JSON.stringify(basket));
};

const update = (id) => {
  const search = basket.find((item) => item.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

const removeItem = (id) => {
  basket = basket.filter((x) => x.id !== id);
  generateCartItems();
  totalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

const clearCart = () => {
  basket = [];
  generateCartItems();
  // totalAmount();
  calculation();

  localStorage.setItem("data", JSON.stringify(basket));
};

const totalAmount = () => {
  if (basket.length !== 0) {
    const amount = basket
      .map((x) => {
        const { id, item } = x;
        const search = data.find((x) => x.id === id) || [];
        return item * search.price;
      })
      .reduce((prev, next) => prev + next, 0);
    cartTotals.innerHTML = `
  
  <h3>Cart Totals</h3>
        <table id="cart-totals">
        <tr>
        <td>Cart Subtotal</td>
        <td>$${amount}</td>
      </tr>
      <tr>
        <td>Shipping</td>
        <td>Free</td>
      </tr>
      <tr>
        <td><strong> Total</strong></td>
        <td><strong>$${amount}</strong></td>
      </tr>
        </table>
        <button class="normal checkout">Proceed to checkout</button>
        <button onclick="clearCart()" class="normal clear">Clear list</button>
  `;
  } else return;
};

totalAmount();
