// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelector("form").addEventListener("submit", function (element) {
//     element.preventDefault();

//     const firstName = document.getElementById("firstName");
//     const name = document.getElementById("name");
//     const email = document.getElementById("email");
//     const password = document.getElementById("password");
//     const confirmPassword = document.getElementById("confirm-password");
//     const checkbox = document.getElementById("input-chb");

//     let error = false;


//     document.querySelectorAll(".error-message").forEach((element) => (element.style.display = "none"));
//     document.querySelectorAll("input").forEach((input) => input.classList.remove("error"));

//     // Họ và tên đệm
//     if (!firstName.value.trim()) {
//       document.getElementById("error-firstName").style.display = "block";
//       firstName.classList.add("error");
//       error = true;
//     }

//     // Tên
//     if (!name.value.trim()) {
//       document.getElementById("error-name").style.display = "block";
//       name.classList.add("error");
//       error = true;
//     }
// confirm lại email
//     // Email
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email.value.trim()) {
//       document.getElementById("error-email").textContent = "Vui lòng nhập email hợp lệ!";
//       document.getElementById("error-email").style.display = "block";
//       email.classList.add("error");
//       error = true;
//     } else if (!emailRegex.test(email.value)) {
//       document.getElementById("error-email").textContent = "Email không đúng định dạng!";
//       document.getElementById("error-email").style.display = "block";
//       email.classList.add("error");
//       error = true;
//     }

//     // Mật khẩu
//     if (!password.value.trim()) {
//       document.getElementById("error-password").textContent = "Vui lòng nhập mật khẩu!";
//       document.getElementById("error-password").style.display = "block";
//       password.classList.add("error");
//       error = true;
//     } else if (password.value.length < 8) {
//       document.getElementById("error-password").textContent = "Mật khẩu tối thiểu 8 ký tự!";
//       document.getElementById("error-password").style.display = "block";
//       password.classList.add("error");
//       error = true;
//     }

//     // Xác nhận mật khẩu
//     if (!confirmPassword.value.trim()) {
//       document.getElementById("error-confirm-password").textContent = "Vui lòng nhập xác nhận mật khẩu!";
//       document.getElementById("error-confirm-password").style.display = "block";
//       confirmPassword.classList.add("error");
//       error = true;
//     } else if (password.value !== confirmPassword.value) {
//       document.getElementById("error-confirm-password").textContent = "Mật khẩu không trùng khớp!";
//       document.getElementById("error-confirm-password").style.display = "block";
//       confirmPassword.classList.add("error");
//       error = true;
//     }

//     // Checkbox
//     if (!checkbox.checked) {
//       document.getElementById("error-checkbox").style.display = "block";
//       error = true;
//     }

//    // Chuyển trang
//     if (!error) {
//       alert("Đăng ký thành công! Chuyển về trang đăng nhập...");
//       window.location.href = "../html/login.html";
//     }
//   });
// });


// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelector("form").addEventListener("submit", function (element) {
//     element.preventDefault();

//   const firstName = document.getElementById("firstName");
//   const nameUser = document.getElementById("name");
//   const email = document.getElementById("email");
//   const password = document.getElementById("password");
//   const confirmPassword = document.getElementById("confirm-password");
//   const checkbox = document.getElementById("input-chb");
//   let error = true;
  
//   document.querySelectorAll(".error-message").forEach((element) => (element.style.display = "none"));
//   document.querySelectorAll("input").forEach((input) => input.classList.remove("error"));

//     // Họ tên đệm
//   if (firstName.value.trim() === "") {
//     error = true;
//     document.getElementById("error-firstName").style.display = "block"; 
//     firstName.style.border = "1px solid red";
//   } else {
//     document.getElementById("error-firstName").style.display = "none";
//     firstName.style.border = "1px solid #D0D5DD"; 
//   }
//   // Tên người  dùng
//   if (nameUser.value.trim() === "") {
//     error = true;
//     document.getElementById("error-name").style.display = "block"; 
//     nameUser.style.border = "1px solid red";
//   } else {
//     document.getElementById("error-name").style.display = "none";
//     nameUser.style.border = "1px solid #D0D5DD"; 
//   }
//   // // Email
//   // if (email.value.trim() == "" ) {
//   //   error = true;
//   //   document.getElementById("error-email").style.display="block";
//   //   email.style.border= " 1px solid red"
//   // }else {
//   //   document.getElementById("error-email").style.display = "none";
//   //   nameUser.style.border = "1px solid #D0D5DD"; 
//   // }
//   // // Password
//   // if (password.value.trim() == "" ) {
//   //   error = true;
//   //   document.getElementById("error-password").style.display="block";
//   //   password.style.border= " 1px solid red"
//   // }else {
//   //   document.getElementById("error-password").style.display = "none";
//   //   nameUser.style.border = "1px solid #D0D5DD"; 
//   // }
//   // // Confirm
//   // if (confirmPassword.value.trim() == "" ) {
//   //   error = true;
//   //   document.getElementById("error-confirm-password").style.display="block";
//   //   confirmPassword.style.border= " 1px solid red"
//   // }else {
//   //   document.getElementById("error-confirm-password").style.display = "none";
//   //   nameUser.style.border = "1px solid #D0D5DD"; 
//   // }


// //Email
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email.value.trim()) {
//       document.getElementById("error-email").textContent = "Vui lòng nhập email hợp lệ!";
//       document.getElementById("error-email").style.display = "block";
//       email.classList.add("error");
//       error = true;
//     } else if (!emailRegex.test(email.value)) {
//       document.getElementById("error-email").textContent = "Email không đúng định dạng!";
//       document.getElementById("error-email").style.display = "block";
//       email.classList.add("error");
//       error = true;
//     }

//     // Mật khẩu
//     if (!password.value.trim()) {
//       document.getElementById("error-password").textContent = "Vui lòng nhập mật khẩu!";
//       document.getElementById("error-password").style.display = "block";
//       password.classList.add("error");
//       error = true;
//     } else if (password.value.length < 8) {
//       document.getElementById("error-password").textContent = "Mật khẩu tối thiểu 8 ký tự!";
//       document.getElementById("error-password").style.display = "block";
//       password.classList.add("error");
//       error = true;
//     }

//     // Xác nhận mật khẩu
//     if (!confirmPassword.value.trim()) {
//       document.getElementById("error-confirm-password").textContent = "Vui lòng nhập xác nhận mật khẩu!";
//       document.getElementById("error-confirm-password").style.display = "block";
//       confirmPassword.classList.add("error");
//       error = true;
//     } else if (password.value !== confirmPassword.value) {
//       document.getElementById("error-confirm-password").textContent = "Mật khẩu không trùng khớp!";
//       document.getElementById("error-confirm-password").style.display = "block";
//       confirmPassword.classList.add("error");
//       error = true;
//     }


//  // Checkbox
//     if (!checkbox.checked) {
//       document.getElementById("error-checkbox").style.display = "block";
//       error = true;
//     }

//   //Chuyển trang
//     if (!error) {
//       alert("Đăng ký thành công! Chuyển về trang đăng nhập...");
//       window.location.href = "../html/login.html";
//     }
//   });
//   });


const form = document.querySelector(".container_box");
const firstName = document.getElementById("firstName");
const nameUser = document.getElementById("name");
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

// Hàm kiểm tra email hợp lệ
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//khi submit form
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Ngăn form submit mặc định
  let isValid = true;

  // Reset các thông báo lỗi
  errorFirstName.style.display = "none";
  errorName.style.display = "none";
  errorEmail.style.display = "none";
  errorPassword.style.display = "none";
  errorConfirmPassword.style.display = "none";
  errorCheckbox.style.display = "none";

  // Kiểm tra Họ và tên đệm
  if (!firstName.value.trim()) {
    errorFirstName.textContent = "Vui lòng nhập họ và tên đệm!";
    errorFirstName.style.display = "block";
    isValid = false;
  }

  // Kiểm tra Tên
  if (!nameUser.value.trim()) {
    errorName.textContent = "Vui lòng nhập tên!";
    errorName.style.display = "block";
    isValid = false;
  }

  // Kiểm tra Email
  if (!email.value.trim()) {
    errorEmail.textContent = "Vui lòng nhập email!";
    errorEmail.style.display = "block";
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    errorEmail.textContent = "Email không đúng định dạng!";
    errorEmail.style.display = "block";
    isValid = false;
  }

  // Kiểm tra Mật khẩu
  if (!password.value.trim()) {
    errorPassword.textContent = "Vui lòng nhập mật khẩu!";
    errorPassword.style.display = "block";
    isValid = false;
  } else if (password.value.length < 8) {
    errorPassword.textContent = "Mật khẩu phải tối thiểu 8 ký tự!";
    errorPassword.style.display = "block";
    isValid = false;
  }

  // Kiểm tra Xác nhận mật khẩu
  if (!confirmPassword.value.trim()) {
    errorConfirmPassword.textContent = "Vui lòng nhập lại mật khẩu!";
    errorConfirmPassword.style.display = "block";
    isValid = false;
  } else if (confirmPassword.value !== password.value) {
    errorConfirmPassword.textContent = "Mật khẩu không trùng khớp!";
    errorConfirmPassword.style.display = "block";
    isValid = false;
  }

  // Kiểm tra Checkbox
  if (!checkbox.checked) {
    errorCheckbox.textContent = "Vui lòng đồng ý với chính sách và điều khoản!";
    errorCheckbox.style.display = "block";
    isValid = false;
  }

 
  if (isValid) {
    alert("Đăng ký thành công!");
    window.location.href = "../html/login.html";
  }
});
  