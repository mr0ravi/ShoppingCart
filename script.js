const products = [
  {
    id: 1,
    category: "وافل",
    name: "وافل توت و خامه",
    price: 650000,
    image: "./assets/452069_berry_waffle.jpg"
  },
  {
    id: 2,
    category: "کرم کارامل",
    name: "کرم بروله وانیلی",
    price: 700000,
    image: "./assets/photo-1470324161839-ce2bb6fa6bc3.webp"
  },
  {
    id: 3,
    category: "ماکارون",
    name: "ماکارون رنگارنگ",
    price: 800000,
    image: "./assets/photo-1569864358642-9d1684040f43.webp"
  },
  {
    id: 4,
    category: "تیرامیسو",
    name: "تیرامیسوی کلاسیک",
    price: 550000,
    image: "./assets/photo-1571877227200-a0d98ea607e9.webp"
  },
  {
    id: 5,
    category: "باقلوا",
    name: "باقلوا پسته‌ای",
    price: 400000,
    image: "./assets/baklava-1-4.jpg.webp"
  },
  {
    id: 6,
    category: "پای",
    name: "پای لیمو و مرنگ",
    price: 500000,
    image: "./assets/5544933769.webp"
  },
  {
    id: 7,
    category: "کیک",
    name: "کیک ردولوت",
    price: 450000,
    image: "./assets/images.jfif"
  },
  {
    id: 8,
    category: "براونی",
    name: "براونی شکلاتی",
    price: 550000,
    image: "./assets/211698_4__40701.jpg"
  },
  {
    id: 9,
    category: "پاناکوتا",
    name: "پاناکوتای وانیلی",
    price: 650000,
    image: "./assets/photo-1488477181946-6428a0291777.webp"
  }
];

const cart = {};
const faDigits = "۰۱۲۳۴۵۶۷۸۹";

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const cartSummary = document.getElementById("cartSummary");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

function toFaDigits(value) {
  return String(value).replace(/\d/g, digit => faDigits[digit]);
}

function money(value) {
  return new Intl.NumberFormat("fa-IR").format(value) + " ریال";
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
}

function changeQuantity(id, delta) {
  cart[id] += delta;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
}

function removeFromCart(id) {
  delete cart[id];
  renderCart();
}

function renderProducts() {
  productGrid.innerHTML = products.map(product => `
    <div class="col">
      <article class="product-card">
        <div class="product-image-wrap position-relative overflow-visible">
          <img
            class="product-image w-100 object-fit-cover d-block"
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.style.objectFit='contain';this.src='./assets/8e776d.svg';"
          >
          <button class="add-btn position-absolute start-50 bg-white fw-semibold" onclick="addToCart(${product.id})" type="button">
            <i class="bi bi-cart-plus"></i> افزودن به سبد
          </button>
        </div>
        <div class="product-info">
          <p class="category">${product.category}</p>
          <h3 class="product-name fw-bold">${product.name}</h3>
          <p class="price m-0 fw-bold">${money(product.price)}</p>
        </div>
      </article>
    </div>
  `).join("");
}

function renderCart() {
  const ids = Object.keys(cart).map(Number);
  const totalItems = ids.reduce((sum, id) => sum + cart[id], 0);
  const totalPrice = ids.reduce((sum, id) => {
    const product = products.find(p => p.id === id);
    return sum + product.price * cart[id];
  }, 0);

  cartCount.textContent = `(${toFaDigits(totalItems)})`;

  if (!ids.length) {
    emptyCart.classList.remove("d-none");
    cartItems.classList.add("d-none");
    cartSummary.classList.add("d-none");
    cartItems.innerHTML = "";
    return;
  }

  emptyCart.classList.add("d-none");
  cartItems.classList.remove("d-none");
  cartSummary.classList.remove("d-none");

  cartItems.innerHTML = ids.map(id => {
    const product = products.find(p => p.id === id);
    return `
      <div class="cart-item d-grid gap-1 align-items-center">
        <img src="${product.image}" alt="${product.name}" class="object-fit-cover">
        <div>
          <div class="cart-item-name fw-bold lh-base">${product.name}</div>
          <div class="cart-item-price fw-semibold">${money(product.price * cart[id])}</div>
          <div class="qty-control mt-2 d-flex align-items-center gap-1">
            <button onclick="changeQuantity(${id}, -1)" aria-label="کاهش تعداد" type="button" class="p-0 rounded-circle bg-white lh-1">−</button>
            <span class="text-center">${toFaDigits(cart[id])}</span>
            <button onclick="changeQuantity(${id}, 1)" aria-label="افزایش تعداد" type="button">+</button>
          </div>
        </div>
        <button class="remove-btn border-0 bg-transparent p-0" onclick="removeFromCart(${id})" aria-label="حذف محصول" type="button">
          <i class="bi bi-trash3"></i>
        </button>
      </div>
    `;
  }).join("");

  cartTotal.textContent = money(totalPrice);
}

renderProducts();
renderCart();
