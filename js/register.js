const form = document.querySelector(".container_box");
const firstName = document.getElementById("firstName");
const userName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const checkbox = document.getElementById("input-chb");

const errorFirstName = document.getElementById("error-firstName");
const errorName = document.getElementById("error-name");
const errorEmail = document.getElementById("error-email");
const errorPassword = document.getElementById("error-password");
const errorConfirmPassword = document.getElementById("error-confirm-password");
const errorCheckbox = document.getElementById("error-checkbox");

// Viết hoa cho họ và tên
function capital(str) {
  if (!str) return "";

  str = str.trim().replace(/\s+/g, " ");

  // Chuyển chữ cái đầu mỗi từ thành in hoa
  const words = str.split(" ");
  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return capitalizedWords.join(" ");
}

// kiểm tra email hợp lệ
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

//  hiển thị lỗi và viền đỏ
function showError(element, errorElement, message) {
  errorElement.textContent = message;
  errorElement.style.display = "block";
  element.classList.add("error-border");
}

// ẩn lỗi và xóa viền đỏ
function hideError(element, errorElement) {
  errorElement.style.display = "none";
  element.classList.remove("error-border");
}

// Kiểm tra khi ô input mất focus ( dùng blur)
firstName.addEventListener("blur", function () {
  const value = firstName.value?.trim();
  if (firstName.value.trim() === "") {
    // const value = firstName.value.trim();
    showError(firstName, errorFirstName, "Vui lòng nhập họ và tên đệm!");
  } else {
    firstName.value = capital(value);
    hideError(firstName, errorFirstName);
  }
});

userName.addEventListener("blur", function () {
  const value = userName.value?.trim();
  if (userName.value.trim() === "") {
    // const value = userName.value.trim();
    showError(userName, errorName, "Vui lòng nhập tên!");
  } else {
    userName.value = capital(value);
    hideError(userName, errorName);
  }
});

email.addEventListener("blur", function () {
  if (email.value.trim() === "") {
    showError(email, errorEmail, "Vui lòng nhập email!");
  } else if (!isValidEmail(email.value.trim())) {
    showError(email, errorEmail, "Email không đúng định dạng!");
  } else {
    hideError(email, errorEmail);
  }
});

password.addEventListener("blur", function () {
  if (password.value.trim() === "") {
    showError(password, errorPassword, "Vui lòng nhập mật khẩu!");
  } else if (password.value.length < 8) {
    showError(password, errorPassword, "Mật khẩu phải có ít nhất 8 ký tự!");
  } else {
    hideError(password, errorPassword);
  }
});

confirmPassword.addEventListener("blur", function () {
  if (confirmPassword.value.trim() === "") {
    showError(
      confirmPassword,
      errorConfirmPassword,
      "Vui lòng nhập xác nhận mật khẩu!"
    );
  } else if (confirmPassword.value !== password.value) {
    showError(
      confirmPassword,
      errorConfirmPassword,
      "Mật khẩu không trùng khớp!"
    );
  } else {
    hideError(confirmPassword, errorConfirmPassword);
  }
});

checkbox.addEventListener("change", function () {
  if (!checkbox.checked) {
    errorCheckbox.textContent = "Vui lòng đồng ý với chính sách và điều khoản!";
    errorCheckbox.style.display = "block";
  } else {
    errorCheckbox.style.display = "none";
  }
});
// Thêm sự kiện submit cho form
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Ngăn form submit

  let error = false;

  // Kiểm tra họ và tên đệm
  if (firstName.value.trim() === "") {
    showError(firstName, errorFirstName, "Vui lòng nhập họ và tên đệm!");
    error = true;
  } else {
    hideError(firstName, errorFirstName);
  }

  // Kiểm tra tên
  if (userName.value.trim() === "") {
    showError(userName, errorName, "Vui lòng nhập tên!");
    error = true;
  } else {
    hideError(userName, errorName);
  }

  // Kiểm tra email
  if (email.value.trim() === "") {
    showError(email, errorEmail, "Vui lòng nhập email!");
    error = true;
  } else if (!isValidEmail(email.value.trim())) {
    showError(email, errorEmail, "Email không đúng định dạng!");
    error = true;
  } else {
    hideError(email, errorEmail);
  }

  // Kiểm tra mật khẩu
  if (password.value.trim() === "") {
    showError(password, errorPassword, "Vui lòng nhập mật khẩu!");
    error = true;
  } else if (password.value.length < 8) {
    showError(password, errorPassword, "Mật khẩu phải có ít nhất 8 ký tự!");
    error = true;
  } else {
    hideError(password, errorPassword);
  }

  // Kiểm tra xác nhận mật khẩu
  if (confirmPassword.value.trim() === "") {
    showError(
      confirmPassword,
      errorConfirmPassword,
      "Vui lòng nhập xác nhận mật khẩu!"
    );
    error = true;
  } else if (confirmPassword.value !== password.value) {
    showError(
      confirmPassword,
      errorConfirmPassword,
      "Mật khẩu không trùng khớp!"
    );
    error = true;
  } else {
    hideError(confirmPassword, errorConfirmPassword);
  }

  // Kiểm tra checkbox
  if (!checkbox.checked) {
    errorCheckbox.textContent = "Vui lòng đồng ý với chính sách và điều khoản!";
    errorCheckbox.style.display = "block";
    error = true;
  } else {
    errorCheckbox.style.display = "none";
  }
  error = true;

  if (!error) {
    alert("Đăng ký thành công!");
    window.location.href = "../html/login.html";
  }
});

////
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let error = false;

  if (!error) {
    const newUser = {
      firstName: firstName.value.trim(),
      userName: userName.value.trim(),
      email: email.value.trim(),
      password: password.value,
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    window.location.href = "../html/login.html";
  }
});