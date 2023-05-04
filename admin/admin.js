
let isLoggedIn = false; //tạo 1 biến kiểm tra với trạng thái ban đầu là false

function loginAdmin(e) {
  e.preventDefault()
  let admin = {
    email: "admin@admin.admin",
    password: "28020711.Hh"
  };
  let adminEmail = document.getElementById('email-admin').value
  let adminPass = document.getElementById('pass-admin').value
  if (adminEmail === admin.email && adminPass == admin.password) { //kiểm tra xem có đúng là tài khoản admin hay k
    isLoggedIn = true; //nếu đúng là tài khoản admin thì set cho biết kiểm tra thành true
    localStorage.setItem("isLoggedIn", "true"); // và lưu biến vào local
    window.location.href = "/admin/admin.html";// r chuyển hướng tới trang admin
  } else {
    alert("Bạn không phải là admin"); // nếu đăng nhập sai thì chứng tỏ nó là 1 thằng user quèn
  }
}

if (localStorage.getItem("isLoggedIn") === "true") { // lấy sữ liệ từ local xuống để kiểm tra kỹ 1 lần nữa
  isLoggedIn = true;
}

if (location.pathname.endsWith('/admin/admin.html')) {
  if (!isLoggedIn) { // nếu như biến kiểm là false thì thực hiện login
    location.href = '/admin-login-form/learn.html'; // Chuyển hướng về trang đăng nhập riêng của admin
  } else {// còn ngược lại nếu nó nó là false thì thực hiện logic
    isLoggedIn = true;
    localStorage.setItem("isLoggedIn", "true"); //khi đã đăng nhập đúng thì set biến kiểm tra thành true và lưu lên local
  }
}
window.addEventListener('beforeunload', function (e) {
  if (isLoggedIn) {
    let confirmationMessage = 'Bạn có chắc chắn muốn đăng xuất khỏi trang web?';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  }
});
function logoutAdmin() {
  localStorage.removeItem("isLoggedIn"); // Xóa biến kiểm tra khỏi local storage
  isLoggedIn = false; // Cập nhật biến kiểm tra của script thành false
  window.location.href = "/admin-login-form/learn.html"; // Chuyển hướng về trang đăng nhập của admin
}

renderProducts();

function submitForm() {
  let fileInput = document.getElementById("myFileInput");
  let productName = document.getElementById("productName").value;
  let productPrice = document.getElementById("productPrice").value;

  // Kiểm tra xem người dùng đã chọn tệp ảnh hay chưa
  if (fileInput.files.length == 0) {
    document.getElementById("error").style.display = "block";
    return;
  }

  // Đọc tệp ảnh và chuyển đổi thành chuỗi Base64
  let reader = new FileReader();
  reader.onload = function (event) {
    let base64Image = event.target.result;
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let id = 0
    if (products.length === 0) {
      id = 1
    } else {
      id = products[products.length - 1].id + 1;
    }
    console.log(id);

    // Lưu thông tin sản phẩm và chuỗi Base64 vào localStorage
    let product = { id: id, name: productName, price: productPrice, image: base64Image };
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    // Hiển thị danh sách sản phẩm
    renderProducts();
  };
  reader.readAsDataURL(fileInput.files[0]);
}
function renderProducts() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let tableContent = "";

  products.forEach((product, index) => {
    tableContent += `
          <tr data-id="${product.id}">
          <th>${index + 1}</th>
          <td id=${product.id + "img"}><img width="30px" src="${product.image}" alt=""></td>
          <td id=${product.id + "name"} data-name>${product.name}</td>
          <td id=${product.id + "price"} data-price>${product.price}$</td>
          <td>
            <button id=${product.id + "data-edit"} onclick="editProduct(${product.id})">Edit</button>
            <button id=${product.id + "data-delete"} onclick="deleteProduct(${product.id})">Delete</button>
          </td>
        </tr>
      `;
  });

  let table = `
      <table border="1" class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          ${tableContent}
        </tbody>
      </table>
    `;

  document.getElementById("productTable").innerHTML = table;
}
// renderPage();

function deleteProduct(id) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products = products.filter(product => product.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}
function editProduct(id) {
  document.querySelector(".form").style.display = "none"
  document.querySelector(".table-product").style.width = "100%"
  // Lấy các phần tử HTML liên quan đến sản phẩm cần chỉnh sửa
  let nameTd = document.getElementById(`${id + "name"}`);
  console.log(nameTd)
  let priceTd = document.getElementById(`${id + "price"}`);
  console.log(priceTd)
  let imageTd = document.getElementById(`${id + "img"}`);
  console.log(imageTd)


  // Tạo các ô input mới để thay thế các ô td hiện tại
  let nameInput = document.createElement('input');
  nameInput.setAttribute('id', `${id + "namenew"}`)
  nameInput.classList.add("inputEdit")
  nameInput.value = nameTd.textContent;
  nameTd.innerHTML = '';
  nameTd.appendChild(nameInput);
  console.log(nameInput)

  let priceInput = document.createElement('input');
  priceInput.setAttribute('id', `${id + "pricenew"}`)
  priceInput.classList.add("inputEdit")
  priceInput.value = priceTd.textContent.replace('$', '');
  priceTd.innerHTML = '';
  priceTd.appendChild(priceInput);
  console.log(priceInput)


  let imageInput = document.createElement('input');
  imageInput.setAttribute('id', `${id + "imgnew"}`)
  imageInput.classList.add("inputEdit")
  imageInput.value = imageTd.querySelector('img').src;
  imageTd.innerHTML = '';
  imageTd.appendChild(imageInput);
  console.log(imageInput)


  // Thay đổi nội dung của các nút
  let editBtn = document.getElementById(`${id + 'data-edit'}`);
  editBtn.textContent = 'Save';
  editBtn.setAttribute('onclick', `saveProduct(${id})`);

  let deleteBtn = document.getElementById(`${id + 'data-delete'}`);
  deleteBtn.textContent = 'Cancel';
  deleteBtn.setAttribute('onclick', `cancelEditProduct(${id})`);
}

function saveProduct(id) {
  document.querySelector(".form").style.display = "block"
  // Lấy các phần tử HTML liên quan đến sản phẩm cần lưu
  let nameInput = document.getElementById(`${id + "namenew"}`);
  let priceInput = document.getElementById(`${id + "pricenew"}`);
  let imageInput = document.getElementById(`${id + "imgnew"}`);

  // Lấy giá trị từ các ô input
  let newName = nameInput.value;
  let newPrice = parseFloat(priceInput.value).toFixed(2);
  let newImage = imageInput.value;

  // Cập nhật sản phẩm trong cơ sở dữ liệu
  // Ví dụ: sử dụng localStorage để lưu trữ dữ liệu
  let products = JSON.parse(localStorage.getItem('products')) || [];
  let index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products[index].name = newName;
    products[index].price = newPrice;
    products[index].image = newImage;
    localStorage.setItem('products', JSON.stringify(products));
  }

  // Cập nhật lại nội dung của các ô td
  let nameTd = document.querySelector(`tr[data-id="${id}"] td[data-name]`);
  nameTd.innerHTML = newName;

  let priceTd = document.querySelector(`tr[data-id="${id}"] td[data-price]`);
  priceTd.innerHTML = `${newPrice}$`;

  let imageTd = document.getElementById(`${id + "img"}`);
  console.log(imageTd)
  imageTd.innerHTML = `<img width="30px" src="${newImage}" alt="">`;

  // Thay đổi nội dung của các nút
  let editBtn = document.getElementById(`${id + 'data-edit'}`);
  editBtn.textContent = 'Edit';
  editBtn.setAttribute('onclick', `saveProduct(${id})`);

  let deleteBtn = document.getElementById(`${id + 'data-delete'}`);
  deleteBtn.textContent = 'Delete';
  deleteBtn.setAttribute('onclick', `cancelEditProduct(${id})`);


}

function cancelEditProduct(id) {
  // Lấy các phần tử HTML liên quan đến sản phẩm cần hủy chỉnh sửa
  let nameInput = document.querySelector(`tr[data-id="${id}"] input[data-name]`);
  let priceInput = document.querySelector(`tr[data-id="${id}"] input[data-price]`);
  let imageInput = document.getElementById(`${id + "img"}`);

  // Lấy giá trị ban đầu của sản phẩm
  let products = JSON.parse(localStorage.getItem('products')) || [];
  let product = products.find((product) => product.id === id);
  let originalName = product.name;
  let originalPrice = product.price;
  let originalImage = product.image;

  // Khôi phục giá trị ban đầu của các ô td
  let nameTd = document.querySelector(`tr[data-id="${id}"] td[data-name]`);
  nameTd.innerHTML = originalName;

  let priceTd = document.querySelector(`tr[data-id="${id}"] td[data-price]`);
  priceTd.innerHTML = `${originalPrice}$`;

  let imageTd = document.getElementById(`${id + "img"}`);
  imageTd.innerHTML = `<img width="30px" src="${originalImage}" alt="">`;

  let editBtn = document.getElementById(`${id + 'data-edit'}`);
  editBtn.textContent = 'Edit';
  editBtn.setAttribute('onclick', `saveProduct(${id})`);


  //hiển thị nút Edit và Delete

  let deleteBtn = document.getElementById(`${id + 'data-delete'}`);
  deleteBtn.textContent = 'Delete';
  deleteBtn.setAttribute('onclick', `cancelEditProduct(${id})`);

  // Xóa các ô input

  nameInput.remove();
  priceInput.remove();
  imageInput.remove();

}

function renderUserList() {
  let user = JSON.parse(localStorage.getItem("user")) || []
  let userTable = document.getElementById('content-table-user');
  let userHTML = '';
  for (let i = 0; i < user.length; i++) {
    let users = user[i];
    userHTML += `
      <tr class="table-content-user">
        <td class="table-user-content STT">${i + 1}</td>
        <td class="table-user-content">${users.email}</td>
        <td class="table-user-content userName">${users.username}</td>
        <td class="table-user-content PassWord">${users.password}</td>
        <td id=${users.id + "check"} class="table-user-content Online">${users.status}</td>
        <td class="table-user-content setting">
          <button class="block btn-setting" id="${users.id + 1}" onclick="blockUser(${users.id})">Block</button>
          <button class="delete btn-setting" id="${users.id + 2}" onclick="deleteUser(${users.id})">Delete</button>
          <button class="unlock btn-setting" id="${users.id + 3}" onclick="unlockUser(${users.id})">Unlock</button>
        </td>
      </tr>
    `;
  }
  userTable.innerHTML = userHTML;
}


function deleteUser(id) {
  let users = JSON.parse(localStorage.getItem('user')) || [];
  users = users.filter(user => user.id !== id);
  localStorage.setItem('user', JSON.stringify(users));
  renderUserList();
}

function check(userId) {
  let user = JSON.parse(localStorage.getItem("user")) || [];
  let statusCell = document.getElementById(`${userId}check`);
  let userIndex = user.findIndex((u) => u.id == userId);
  if (user[userIndex].status) {
    statusCell.innerText = "true";
    statusCell.classList.add("check");
    statusCell.classList.remove("check-w");
  } else {
    statusCell.innerText = "false";
    statusCell.classList.add("check-w");
    statusCell.classList.remove("check");
  }
}

function blockUser(userId) {
  let user = JSON.parse(localStorage.getItem("user")) || [];
  let userIndex = user.findIndex((u) => u.id == userId);
  if (userIndex === -1) {
    console.error("User not found!");
    return;
  }
  user[userIndex].status = false;
  localStorage.setItem("user", JSON.stringify(user));
  check(userId);
}

function unlockUser(userId) {
  let user = JSON.parse(localStorage.getItem("user")) || [];
  let userIndex = user.findIndex((u) => u.id == userId);
  if (userIndex === -1) {
    console.error("User not found!");
    return;
  }
  user[userIndex].status = true;
  localStorage.setItem("user", JSON.stringify(user));
  check(userId);
}

renderUserList()

function showOrderDetails() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const orderData = JSON.parse(localStorage.getItem(`order_${loggedInUser.id}`));

  if (!orderData) {
    return "<p>chưa có user nào đặt hàng!</p>";
  }

  let orderDetails = "";
  let total = 0; // Thêm biến total để tính tổng tiền món

  orderData.products.forEach((product) => {
    orderDetails += `<tr>
      <td>${product.name}</td>
      <td><img src="${product.image}" width="50" height="50"></td>
      <td>${product.price.toLocaleString()} $</td>
      <td>${product.quantity}</td>
      <td>${(product.price * product.quantity).toLocaleString()}.00 $</td>
      </tr>`
    total += product.price * product.quantity; // Cập nhật giá trị total
  });

  // Thêm hàng tổng tiền
  orderDetails += `<tr>
    <th colspan='4'>Tổng tiền</th>
    <td>${total.toLocaleString()} $</td>
    </tr>`

  // Thêm trường tình trạng đơn hàng
  orderDetails += `<tr>
    <th colspan='4'>Tình trạng đơn hàng</th>
    <td>${orderData.status}</td>
    </tr>`

  orderDetails += `
  <tr class="td-btn">
    <td colspan='5'>
      <button class='btn-status pending' onclick='updateOrderStatus("pending")'>Pending</button>
      <button class='btn-status prepare' onclick='updateOrderStatus("prepare")'>Prepare</button>
      <button class='btn-status delivering' onclick='markOrderAsDelivering("delivering")'>delivering</button>
      <button class='btn-status remote'>remote Order</button>
    </td>
  </tr>`

  return `<tbody>${orderDetails}</tbody>`;
}

const orderDetailsHtml = showOrderDetails();
document.getElementById("order-details").innerHTML = orderDetailsHtml;

function updateOrderStatus(status) {
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  let orderData = JSON.parse(localStorage.getItem(`order_${loggedInUser.id}`));
  orderData.status = status;
  localStorage.setItem(`order_${loggedInUser.id}`, JSON.stringify(orderData));
  alert(`Đã cập nhật trạng thái đơn hàng thành ${status}`);
}

function updateOrderStatusToPrepare() {
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  let orderData = JSON.parse(localStorage.getItem(`order_${loggedInUser.id}`));
  orderData.status = "prepare";
  localStorage.setItem(`order_${loggedInUser.id}`, JSON.stringify(orderData));
  alert("Đã cập nhật trạng thái đơn hàng thành prepare");
}

function markOrderAsDelivering() {
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  let orderData = JSON.parse(localStorage.getItem(`order_${loggedInUser.id}`));
  orderData.status = "delivering";
  localStorage.setItem(`order_${loggedInUser.id}`, JSON.stringify(orderData));
  alert("Đã cập nhật trạng thái đơn hàng thành delivering");
  // 
}


function showProductManagement() {
  document.getElementById('product-admin').style.display = "flex"
  document.getElementById('user-admin').style.display = "none"
  document.getElementById('order-admin').style.display = "none"
}
function showUsersManagement() {
  document.getElementById('product-admin').style.display = "none"
  document.getElementById('user-admin').style.display = "block"
  document.getElementById('order-admin').style.display = "none"
}
function showOrderManagement() {
  document.getElementById('product-admin').style.display = "none"
  document.getElementById('user-admin').style.display = "none"
  document.getElementById('order-admin').style.display = "block"
}


function removeOrder() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const confirmRemove = confirm("Bạn có chắc chắn muốn xoá đơn hàng?");
  if (confirmRemove) {
    localStorage.removeItem(`order_${loggedInUser.id}`);
    alert("Xoá đơn hàng thành công!");
    const orderDetailsHtml = showOrderDetails();
    document.getElementById("order-details").innerHTML = orderDetailsHtml;
  }
}

const removeButton = document.querySelector(".btn-status.remote");
removeButton.addEventListener("click", removeOrder);
