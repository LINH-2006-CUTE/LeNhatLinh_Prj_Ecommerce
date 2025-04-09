// document.addEventListener("DOMContentLoaded", function () {
//     // Lấy danh sách người dùng từ localStorage
//     let users = JSON.parse(localStorage.getItem("users")) || [];
  
//     // Xử lý form Đăng nhập
//     document.querySelector(".container-box").addEventListener("submit", function (e) {
//       e.preventDefault();
  
//       const email = document.getElementById("email").value.trim();
//       const password = document.getElementById("password").value.trim();
  
//       // Xóa thông báo lỗi cũ
//       clearErrors();
  
//       let isValid = true;
  
//       // Validate dữ liệu
//       if (!email) {
//         showError("emailError", "Email không được để trống");
//         isValid = false;
//       }
  
//       if (!password) {
//         showError("passwordError", "Mật khẩu không được để trống");
//         isValid = false;
//       }
  
//       // Kiểm tra thông tin đăng nhập
//       if (isValid) {
//         const user = users.find((u) => u.email === email && u.password === password);
//         if (user) {
//           Swal.fire({
//             icon: "success",
//             title: "Đăng nhập thành công!",
//             showConfirmButton: false,
//             timer: 1500,
//           }).then(() => {
//             // Lưu trạng thái đăng nhập
//             localStorage.setItem("isLoggedIn", "true");
//             window.location.href = "../html/dashboard.html";
//           });
//         } else {
//           showError("emailError", "Email hoặc mật khẩu không đúng");
//         }
//       }
//     });
  
//     // Hàm hiển thị lỗi
//     function showError(elementId, message) {
//       const errorElement = document.getElementById(elementId);
//       errorElement.textContent = message;
//       errorElement.style.display = "block"; // Hiển thị thông báo lỗi
//     }
  
//     // Hàm xóa thông báo lỗi cũ
//     function clearErrors() {
//       const emailError = document.getElementById("emailError");
//       const passwordError = document.getElementById("passwordError");
//       emailError.textContent = "";
//       emailError.style.display = "none"; // Ẩn thông báo lỗi
//       passwordError.textContent = "";
//       passwordError.style.display = "none"; // Ẩn thông báo lỗi
//     }
//   });


const form = document.querySelector(".container_box");
const email = document.getElementById("email");
const password = document.getElementById("password");

const errorEmail = document.getElementById("error-email");
const errorPassword = document.getElementById("error-password");

// Hàm kiểm tra email hợp lệ
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Xử lý sự kiện khi submit form
form.addEventListener("submit", function (event) {
  event.preventDefault(); 
  let isValid = true;

  // Reset các thông báo lỗi
  errorEmail.style.display = "none";
  errorPassword.style.display = "none";

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

  // Nếu tất cả hợp lệ, hiển thị thông báo và chuyển hướng
  if (isValid) {
    alert("Đăng nhập thành công!");
    window.location.href = "../html/dashboard.html";// Chuyển hướng đến trang chủ
  }
});