const shop = document.querySelector(".pro-container");
const arrivalProduct = document.querySelector("#arrival-product");
const singlePage = document.querySelector(".single-pro-image");

let basket = JSON.parse(localStorage.getItem("data")) || [];

const bar = document.querySelector("#bar");
const nav = document.querySelector("#navbar");
const close = document.querySelector("#close");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

const generateShop = () => {
  if (arrivalProduct) {
    return (shop.innerHTML = data
      .filter((i) => i.id < 9)
      .map((item) => {
        let { id, brand, name, price, img } = item;
        let quantity = basket.find((item) => item.id === id) || [];
        return `
      <div id="product-id-${id}" class="pro">
      <a href="sproduct${id}.html"><img onclick="singleProduct(${id})" src="${img}" alt="" /></a>
      <div class="des">
        <span>${brand}</span>
        <h5>${name}</h5>
        <div class="star">
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        </div>
        <h4>$${price}</h4>
      </div>
     <div class="button">
     <i onclick="decrement(${id})" class="bi bi-dash-lg card"></i>
     <div id=${id} class="quantity">${
          quantity.item === undefined ? 0 : quantity.item
        }</div>
     <i onclick="increment(${id})" class="bi bi-plus-lg card"></i>
     </div>
    </div>
      `;
      })
      .join(""));
  } else {
    return (shop.innerHTML = data
      .map((item) => {
        let { id, brand, name, price, img } = item;
        let quantity = basket.find((item) => item.id === id) || [];
        return `
      <div id="product-id-${id}" class="pro">
      <img src="${img}" alt="" />
      <div class="des">
        <span>${brand}</span>
        <h5>${name}</h5>
        <div class="star">
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        </div>
        <h4>$${price}</h4>
      </div>
     <div class="button">
     <i onclick="decrement(${id})" class="bi bi-dash-lg card"></i>
     <div id=${id} class="quantity">${
          quantity.item === undefined ? 0 : quantity.item
        }</div>
     <i onclick="increment(${id})" class="bi bi-plus-lg card"></i>
     </div>
    </div>
      `;
      })
      .join(""));
  }
};
generateShop();

const generateArrival = () => {
  if (arrivalProduct) {
    return (arrivalProduct.innerHTML = data
      .filter((i) => i.id > 8)
      .map((item) => {
        let { id, brand, name, price, img } = item;
        let quantity = basket.find((item) => item.id === id) || [];
        return `
      <div id="product-id-${id}" class="pro">
      <img src="${img}" alt="" />
      <div class="des">
        <span>${brand}</span>
        <h5>${name}</h5>
        <div class="star">
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        </div>
        <h4>$${price}</h4>
      </div>
     <div class="button">
     <i onclick="decrement(${id})" class="bi bi-dash-lg card"></i>
     <div id=${id} class="quantity">${
          quantity.item === undefined ? 0 : quantity.item
        }</div>
     <i onclick="increment(${id})" class="bi bi-plus-lg card"></i>
     </div>
    </div>
      `;
      })
      .join(""));
  }
};
generateArrival();

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
  localStorage.setItem("data", JSON.stringify(basket));
};

const update = (id) => {
  const search = basket.find((item) => item.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

const calculation = () => {
  const cartIcon = document.getElementById("cart-amount");
  (cartIcon.innerHTML = basket
    .map((x) => x.item)
    .reduce((prev, acc) => prev + acc, 0)),
    0;
};
calculation();
const check = (id) => {
  console.log(id);
};

const singleProduct = (id) => {
  console.log(id, "id");
  singlePage.innerHTML = data.map((item) => {
    let { id, brand, name, price, img } = item;
    console.log(id);
  });
};

// <img src="/img/products/f1.jpg" width="100%" id="mainimg" />
// <div class="small-image-group">
//   <div class="small-img-col">
//     <img
//       src="/img/products/f1.jpg"
//       width="100%"
//       class="small-img"
//       alt=""
//     />
//   </div>
//   <div class="small-img-col">
//     <img
//       src="/img/products/f2.jpg"
//       width="100%"
//       class="small-img"
//       alt=""
//     />
//   </div>
//   <div class="small-img-col">
//     <img
//       src="/img/products/f3.jpg"
//       width="100%"
//       class="small-img"
//       alt=""
//     />
//   </div>
//   <div class="small-img-col">
//     <img
//       src="/img/products/f4.jpg"
//       width="100%"
//       class="small-img"
//       alt=""
//     />
//   </div>
// </div>
