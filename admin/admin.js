
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
    const confirmationMessage = 'Bạn có chắc chắn muốn đăng xuất khỏi trang web?';
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
  const products = JSON.parse(localStorage.getItem("products")) || [];
  let tableContent = "";

  products.forEach((product, index) => {
    tableContent += `
          <tr data-id="${product.id}">
          <th>${index + 1}</th>
          <td id=${product.id + "img"}><img width="30px" src="${product.image}" alt=""></td>
          <td id=${product.id + "name"} data-name>${product.name}</td>
          <td id=${product.id + "price"} data-price>${product.price}$</td>
          <td>
            <button data-edit onclick="editProduct(${product.id})">Edit</button>
            <button data-delete onclick="deleteProduct(${product.id})">Delete</button>
          </td>
        </tr>
      `;
  });

  const table = `
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
  const nameTd = document.getElementById(`${id + "name"}`);
  console.log(nameTd)
  const priceTd = document.getElementById(`${id + "price"}`);
  console.log(priceTd)
  const imageTd = document.getElementById(`${id + "img"}`);
  console.log(imageTd)


  // Tạo các ô input mới để thay thế các ô td hiện tại
  const nameInput = document.createElement('input');
  nameInput.setAttribute('id', `${id + "namenew"}`)
  nameInput.classList.add("inputEdit")
  nameInput.value = nameTd.textContent;
  nameTd.innerHTML = '';
  nameTd.appendChild(nameInput);
  console.log(nameInput)

  const priceInput = document.createElement('input');
  priceInput.setAttribute('id', `${id + "pricenew"}`)
  priceInput.classList.add("inputEdit")
  priceInput.value = priceTd.textContent.replace('$', '');
  priceTd.innerHTML = '';
  priceTd.appendChild(priceInput);
  console.log(priceInput)


  const imageInput = document.createElement('input');
  imageInput.setAttribute('id', `${id + "imgnew"}`)
  imageInput.classList.add("inputEdit")
  imageInput.value = imageTd.querySelector('img').src;
  imageTd.innerHTML = '';
  imageTd.appendChild(imageInput);
  console.log(imageInput)


  // Thay đổi nội dung của các nút
  const editBtn = document.querySelector(`tr[data-id="${id}"] button[data-edit]`);
  editBtn.textContent = 'Save';
  editBtn.setAttribute('onclick', `saveProduct(${id})`);

  const deleteBtn = document.querySelector(`tr[data-id="${id}"] button[data-delete]`);
  deleteBtn.textContent = 'Cancel';
  deleteBtn.setAttribute('onclick', `cancelEditProduct(${id})`);
}

function saveProduct(id) {
  document.querySelector(".form").style.display = "block"
  // Lấy các phần tử HTML liên quan đến sản phẩm cần lưu
  const nameInput = document.getElementById(`${id + "namenew"}`);
  const priceInput = document.getElementById(`${id + "pricenew"}`);
  const imageInput = document.getElementById(`${id + "imgnew"}`);

  // Lấy giá trị từ các ô input
  const newName = nameInput.value;
  const newPrice = parseFloat(priceInput.value).toFixed(2);
  const newImage = imageInput.value;

  // Cập nhật sản phẩm trong cơ sở dữ liệu
  // Ví dụ: sử dụng localStorage để lưu trữ dữ liệu
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products[index].name = newName;
    products[index].price = newPrice;
    products[index].image = newImage;
    localStorage.setItem('products', JSON.stringify(products));
  }

  // Cập nhật lại nội dung của các ô td
  const nameTd = document.querySelector(`tr[data-id="${id}"] td[data-name]`);
  nameTd.innerHTML = newName;

  const priceTd = document.querySelector(`tr[data-id="${id}"] td[data-price]`);
  priceTd.innerHTML = `${newPrice}$`;

  const imageTd = document.getElementById(`${id + "img"}`);
  console.log(imageTd)
  imageTd.innerHTML = `<img width="30px" src="${newImage}" alt="">`;

  // Thay đổi nội dung của các nút
  const editBtn = document.querySelector(`tr[data-id="${id}"] button[data-edit]`);
  editBtn.textContent = 'Edit';
  editBtn.setAttribute('onclick', `editProduct(${id})`);

  const deleteBtn = document.querySelector(`tr[data-id="${id}"] button[data-delete]`);
  deleteBtn.textContent = 'Delete';
  deleteBtn.setAttribute('onclick', `deleteProduct(${id})`);


}

function cancelEditProduct(id) {
  // Lấy các phần tử HTML liên quan đến sản phẩm cần hủy chỉnh sửa
  const nameInput = document.querySelector(`tr[data-id="${id}"] input[data-name]`);
  const priceInput = document.querySelector(`tr[data-id="${id}"] input[data-price]`);
  const imageInput = document.querySelector(`tr[data-id="${id}"] input[data-image]`);

  // Lấy giá trị ban đầu của sản phẩm
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const product = products.find((product) => product.id === id);
  const originalName = product.name;
  const originalPrice = product.price;
  const originalImage = product.image;

  // Khôi phục giá trị ban đầu của các ô td
  const nameTd = document.querySelector(`tr[data-id="${id}"] td[data-name]`);
  nameTd.innerHTML = originalName;

  const priceTd = document.querySelector(`tr[data-id="${id}"] td[data-price]`);
  priceTd.innerHTML = `${originalPrice}$`;

  const imageTd = document.querySelector(`tr[data-id="${id}"] td[data-image]`);
  imageTd.innerHTML = `<img width="30px" src="${originalImage}" alt="">`;

  // Xóa các ô input và hiển thị nút Edit và Delete
  nameInput.remove();
  priceInput.remove();
  imageInput.remove();

  const editBtn = document.querySelector(`tr[data-id="${id}"] button[data-edit]`);
  editBtn.textContent = 'Edit';
  editBtn.setAttribute('onclick', `editProduct(${id})`);

  const deleteBtn = document.querySelector(`tr[data-id="${id}"] button[data-delete]`);
  deleteBtn.textContent = 'Delete';
  deleteBtn.setAttribute('onclick', `deleteProduct(${id})`);
}
