const registerBtn = document.getElementById('register-btn');
registerBtn.addEventListener('click', function (event) {
    event.preventDefault();

    // Get values from input fields
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repassword = document.getElementById('repassword').value;
    let users_list = JSON.parse(localStorage.getItem('user')) || []
    let count = 1
    let duplicateEmail = false;
    let duplicateUsername = false
    // Check if all fields are valid
    if (validateUserName(username) && email && validatePassword(password) && repassword && password === repassword && validateEmail(email)) {
        // Check for duplicate email
        for (let i = 0; i < users_list.length; i++) {
            if (users_list[i].username === username) {
                duplicateUsername = true;
                break;
            }
            if (users_list[i].email === email) {
                duplicateEmail = true;
                break;
            }
        }
        if (duplicateUsername) {
            alert('Tên đăng nhập đã tồn tại, vui lòng chọn một tên khác.');
        } else if (duplicateEmail) {
            alert('Email đã tồn tại, vui lòng chọn một địa chỉ email khác.');
        } else {
            // Save values to local storage
            count = users_list.length + 1
            let user_info = {
                id: count,
                username: username,
                email: email,
                password: password,
                repassword: repassword,
                status: true
            }
            users_list.push(user_info)
            localStorage.setItem("user", JSON.stringify(users_list))
            alert('Đăng ký thành công');
            renderUserList()
        }
    } else {
        if (!validateEmail(email)) {
            alert('Vui lòng nhập địa chỉ email hợp lệ.');
        } else if (!validateUserName(username)) {
            alert('Vui lòng nhập tên hợp lệ (tên đăng nhập phải có ít nhất 7 ký tự là chữ cái hoặc số');
        } else {
            alert('Điền vào tất cả các trường, đảm bảo mật khẩu khớp và nhập địa chỉ email hợp lệ.');
        }
    }
}); 

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function validateUserName(username) {
    const nameRegex = /^[A-Za-z0-9]{7,}$/;
    return nameRegex.test(username);
}

function validatePassword(password) {
    // Kiểm tra độ dài mật khẩu, nếu nhỏ hơn 8 ký tự thì trả về false
    if (password.length < 8) {
        return false;
    }

    // Kiểm tra mật khẩu có chứa khoảng trắng không, nếu có thì trả về false
    if (/\s/g.test(password)) {
        return false;
    }

    return true;
}

