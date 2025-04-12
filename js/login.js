// const form = document.querySelector(".container_box");
// const email = document.getElementById("email");
// const password = document.getElementById("password");

// const errorEmail = document.getElementById("error-email");
// const errorPassword = document.getElementById("error-password");

// // Hàm kiểm tra email hợp lệ
// function isValidEmail(email) {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// // Xử lý sự kiện khi submit form
// form.addEventListener("submit", function (event) {
//   event.preventDefault(); 
//   let isValid = true;

//   // Reset các thông báo lỗi
//   errorEmail.style.display = "none";
//   errorPassword.style.display = "none";

//   // Kiểm tra Email
//   if (!email.value.trim()) {
//     errorEmail.textContent = "Vui lòng nhập email!";
//     errorEmail.style.display = "block";
//     isValid = false;
//   } else if (!isValidEmail(email.value)) {
//     errorEmail.textContent = "Email không đúng định dạng!";
//     errorEmail.style.display = "block";
//     isValid = false;
//   }

//   // Kiểm tra Mật khẩu
//   if (!password.value.trim()) {
//     errorPassword.textContent = "Vui lòng nhập mật khẩu!";
//     errorPassword.style.display = "block";
//     isValid = false;
//   } else if (password.value.length < 8) {
//     errorPassword.textContent = "Mật khẩu phải tối thiểu 8 ký tự!";
//     errorPassword.style.display = "block";
//     isValid = false;
//   }
// // Chuyển trang 
//   if (isValid) {
//     alert("Đăng nhập thành công!");
//     window.location.href = "../html/dashboard.html";
//   }
// });


const form = document.querySelector(".container_box");
const email = document.getElementById("email");
const password = document.getElementById("password");

const errorEmail = document.getElementById("error-email");
const errorPassword = document.getElementById("error-password");

// Hàm kiểm tra định dạng email
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Hiển thị lỗi
function showError(element, errorElement, message) {
  errorElement.textContent = message;
  errorElement.style.display = "block";
  element.classList.add("error-border");
}

// Ẩn lỗi
function hideError(element, errorElement) {
  errorElement.style.display = "none";
  element.classList.remove("error-border");
}

// Kiểm tra khi blur - EMAIL
email.addEventListener("blur", function () {
  const value = email.value.trim();
  if (value === "") {
    showError(email, errorEmail, "Email không được để trống");
  } else if (!isValidEmail(value)) {
    showError(email, errorEmail, "Email không đúng định dạng");
  } else {
    hideError(email, errorEmail);
  }
});

// Kiểm tra khi blur - PASSWORD
password.addEventListener("blur", function () {
  const value = password.value.trim();
  if (value === "") {
    showError(password, errorPassword, "Mật khẩu không được để trống");
  } else if (value.length < 8) {
    showError(password, errorPassword, "Mật khẩu phải tối thiểu 8 ký tự");
  } else {
    hideError(password, errorPassword);
  }
});

// Xử lý khi submit form
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const emailValue = email.value.trim();
  const passwordValue = password.value;

  let isValid = true;

  // Kiểm tra email
  if (emailValue === "") {
    showError(email, errorEmail, "Email không được để trống");
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    showError(email, errorEmail, "Email không đúng định dạng");
    isValid = false;
  } else {
    hideError(email, errorEmail);
  }

  // Kiểm tra password
  if (passwordValue === "") {
    showError(password, errorPassword, "Mật khẩu không được để trống");
    isValid = false;
  } else if (passwordValue.length < 8) {
    showError(password, errorPassword, "Mật khẩu phải tối thiểu 8 ký tự");
    isValid = false;
  } else {
    hideError(password, errorPassword);
  }

  // Nếu dữ liệu hợp lệ thì kiểm tra trong localStorage
  if (isValid) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      user => user.email === emailValue && user.password === passwordValue
    );

    if (matchedUser) {
      alert("Đăng nhập thành công!");
      window.location.href = "../html/dashboard.html";
    } else {
      showError(email, errorEmail, "Email hoặc mật khẩu không đúng");
      showError(password, errorPassword, "");
    }
  }
});
