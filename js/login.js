function login(e) {
  e.preventDefault(); // ngăn sự kiện load trang của form
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === "" || password === "") {
    const errorMsg = document.createElement('div');
    errorMsg.textContent = 'Vui lòng nhập đầy đủ thông tin!';
    errorMsg.classList.add('error-msg');

    document.body.appendChild(errorMsg);

    setTimeout(() => {
      errorMsg.remove();
    }, 1000);
    return false;
  } else {
    const usersList = JSON.parse(localStorage.getItem('user')) || [];
    let isLoggedIn = false;

    for (let i = 0; i < usersList.length; i++) {
      const user = usersList[i];
      if (user.username === username && user.password === password) {
        if (!user.status) { // Kiểm tra xem tài khoản có bị khóa không
          const errorMsg = document.createElement('div');
          errorMsg.textContent = 'Tài khoản của bạn đã bị khóa hoặc không có!';
          errorMsg.classList.add('error-msg');

          document.body.appendChild(errorMsg);

          setTimeout(() => {
            errorMsg.remove();
          }, 1000);
          return false;
        }
        isLoggedIn = true;
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        break;
      }
    }

    if (isLoggedIn) {
      const successMsg = document.createElement('div');
      successMsg.textContent = 'Đăng nhập thành công!';
      successMsg.classList.add('success-msg');

      document.body.appendChild(successMsg);

      setTimeout(() => {
        successMsg.remove();
        // document.querySelector()
        window.location.href = "../product.html";
      }, 1000);

    } else {
      const errorMsg = document.createElement('div');
      errorMsg.textContent = 'Tên đăng nhập hoặc mật khẩu không đúng!';
      errorMsg.classList.add('error-msg');

      document.body.appendChild(errorMsg);

      setTimeout(() => {
        errorMsg.remove();
      }, 1000);
    }
  }
}

document.getElementById('logout').addEventListener('click', logout);

function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = "../login.html";
}