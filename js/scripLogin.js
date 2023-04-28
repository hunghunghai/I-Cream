const form = document.getElementById('register-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const repasswordInput = document.getElementById('repassword');


form.addEventListener('submit', () => {

    // Kiểm tra tên bắt buộc
    if (!nameInput.value) {
        alert('Please enter your name.');
        return;
    }

    // Kiểm tra email bắt buộc và đúng định dạng
    if (!emailInput.value) {
        alert('Please enter your email address.');
        return;
    }
    if (!isValidEmail(emailInput.value)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Kiểm tra mật khẩu bắt buộc và trùng khớp
    if (!passwordInput.value) {
        alert('Please enter a password.');
        return;
    }
    if (passwordInput.value !== repasswordInput.value) {
        alert('Passwords do not match.');
        return;
    }

    // Lưu thông tin đăng ký vào local storage
    const user = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        address: form.address.value,
        phone: form.phone.value
    };
    localStorage.setItem('user', JSON.stringify(user));

    // Điều hướng sang trang khác
    window.location.href = '/index.html';
});

// Hàm kiểm tra định dạng email
function isValidEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}