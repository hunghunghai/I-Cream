// Lấy dữ liệu sản phẩm từ local
let products = localStorage.getItem('products');


if (products) {
    products = JSON.parse(products);
} else {
    products = [];
}
// Số sản phẩm trên một trang
const itemsPerPage = 10;

// Trang hiện tại
let currentPage = 1;

// Tính toán số trang tối đa
const totalPages = Math.ceil(products.length / itemsPerPage);

// Hiển thị sản phẩm trên trang hiện tại
renderPage();

// Hiển thị các liên kết phân trang
renderPagination();


renderPagination()





function renderPage() {
    // Lấy dữ liệu sản phẩm từ local
    let products = localStorage.getItem('products');
    if (products) {
        products = JSON.parse(products);
    } else {
        products = [];
    }
    // Tính vị trí bắt đầu và kết thúc của sản phẩm trên trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Lấy ra sản phẩm trên trang hiện tại
    const pageItems = products.slice(startIndex, endIndex);

    // Hiển thị sản phẩm lên trang web
    const productList = document.querySelector("#list-product");
    productList.innerHTML = "";


    pageItems.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-info");
        productElement.innerHTML = `
        <div class="background">
            <b>${product.price}$</b>
        </div>
        <div class="product-img">
            <img src=${product.image} alt="">
        </div>
        <div class="product-title">
            <b>${product.name}</b>
            <button id="${product.id}" class="btn-blue btn-order">Add to Cart</button>
        </div>
    `;

        productList.appendChild(productElement);
    });
}
renderPagination()

function renderPagination() {
    // Hiển thị các liên kết phân trang
    const pagination = document.querySelector("#pagination");
    pagination.innerHTML = "";
    // Lấy dữ liệu sản phẩm từ local
    let products = localStorage.getItem('products');
    if (products) {
        products = JSON.parse(products);
    } else {
        products = [];
    }

    // Tính toán số trang tối đa
    const totalPages = Math.ceil(products.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("button");
        pageLink.textContent = i;
        pageLink.classList.add("btn-page")
        if (i === currentPage) {
            pageLink.disabled = true;
        }
        pageLink.addEventListener("click", () => {
            currentPage = i;
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            renderPage();
            renderPagination();
        });
        pagination.appendChild(pageLink);
    }
}


renderPagination()



// Lấy thông tin người dùng đăng nhập
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

// Nếu có người dùng đăng nhập thì hiển thị tên của họ trong phần dropdown
if (loggedInUser) {
    document.getElementById('user-remove').style.display = "none"
    document.getElementById('icon-user').style.display = 'block'
    let user_login = document.getElementById('User-name-login')
    user_login.textContent = loggedInUser.username;
    user_login.style.color = "#fff"
    user_login.style.fontSize = "20px"

}


// renderCart()
//thêm vào giỏ hàng 
let productList = document.getElementById("list-product")
productList.onclick = function (e) {
    if (e.target.classList.contains("btn-order")) {
        if (localStorage.getItem("loggedInUser")) { // kiểm tra đăng nhập
            const userId = JSON.parse(localStorage.getItem("loggedInUser")); // lấy mã định danh của người dùng
            const productId = parseInt(e.target.id);
            console.log(productId)
            const products = JSON.parse(localStorage.getItem("products"));
            console.log(products)
            const product = products.find(p => p.id === productId);
            console.log(product)
            if (product) {
                const cart = JSON.parse(localStorage.getItem(`cart_${userId.id}`)) || []; // lấy giỏ hàng của người dùng từ local storage
                const cartItem = cart.find(item => item.id === productId);
                if (cartItem) {
                    cartItem.quantity++;
                    alert(`Sản phẩm ${product.name} đã được thêm vào giỏ hàng. Kiểm tra giỏ hàng ở góc màn hình.`);
                } else {
                    alert(`Sản phẩm ${product.name} đã được thêm vào giỏ hàng. Kiểm tra giỏ hàng ở góc màn hình.`);
                    cart.push({ ...product, quantity: 1 });
                }
                localStorage.setItem(`cart_${userId.id}`, JSON.stringify(cart)); // lưu giỏ hàng của người dùng vào local storage
                renderCart();
            }
        } else {
            alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
            // redirect đến trang đăng nhập
        }
    }
}

function renderCart() {
    const userId = JSON.parse(localStorage.getItem("loggedInUser"));
    const cart = JSON.parse(localStorage.getItem(`cart_${userId.id}`)) || [];
    const cartElement = document.getElementById("cart");
    let cartHtml = "";

    cart.forEach(item => {
        cartHtml += `
        <div class="cart-product-shopping">
          <div class="cart-img"><img width="50" src="${item.image}" alt="${item.name}"></div>
          <div class="cart-name">${item.name}</div>
          <div class="cart-price">${item.price}$</div>
          <div class="quantity">
            <button class="btn-minus" data-id="${item.id}">-</button>
            <p>${item.quantity}</p>
            <button class="btn-plus" data-id="${item.id}">+</button>
          </div>
        </div>
      `;
    });

    cartElement.innerHTML = cartHtml;

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalElement = document.querySelector(".total-cart span");
    totalElement.textContent = `${total}$`;

    const btnMinusElements = document.querySelectorAll(".btn-minus");
    btnMinusElements.forEach(btn => {
        btn.addEventListener("click", () => {
            const productId = btn.dataset.id;
            const cart = JSON.parse(localStorage.getItem(`cart_${userId.id}`)) || []
            const item = cart.find(item => item.id === parseInt(productId));
            if (item) {
                item.quantity--;
                if (item.quantity < 0) {
                    cart.splice(cart.indexOf(item), 1);
                }
                localStorage.setItem(`cart_${userId.id}`, JSON.stringify(cart));
                renderCart();
            }
        });
    });

    const btnPlusElements = document.querySelectorAll(".btn-plus");
    btnPlusElements.forEach(btn => {
        btn.addEventListener("click", () => {
            const productId = btn.dataset.id;
            console.log(productId)
            const cart = JSON.parse(localStorage.getItem(`cart_${userId.id}`)) || []
            console.log(cart)
            const item = cart.find(item => item.id === parseInt(productId));
            console.log(item)
            if (item) {
                item.quantity++;
                localStorage.setItem(`cart_${userId.id}`, JSON.stringify(cart));
                renderCart();
            }
        });
    });
}


renderCart()


// Hàm xử lý sự kiện "click" của nút "order"
function saveOrderData() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        alert("Bạn cần đăng nhập để đặt hàng!");
        return;
    }

    const cart = JSON.parse(localStorage.getItem(`cart_${loggedInUser.id}`)) || [];

    if (cart.length === 0) {
        alert("Giỏ hàng của bạn trống!");
        return;
    }

    const orderData = {
        userId: loggedInUser.id,
        status: 'pending', // Fix the typo here
        products: cart.map((product) => ({
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: product.quantity,
        })),
    };

    localStorage.setItem(`order_${loggedInUser.id}`, JSON.stringify(orderData));
    localStorage.removeItem(`cart_${loggedInUser.id}`);
    alert("Đặt hàng thành công! Kiểm tra đơn hàng của bạn ở góc trái bên dưới màn hình.");
}


let btnOrderCheck = document.getElementById("btn-oder-check");
btnOrderCheck.addEventListener('click', function () {
    window.location.href = '../detail.html'
})
