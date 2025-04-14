  const menuItems = document.querySelectorAll(".sidebar-menu li");
  menuItems.forEach(item => {
    item.addEventListener("click", function () {
      // Xoá active khỏi tất cả item
      menuItems.forEach(i => i.classList.remove("active"));
      // active khi được click
      this.classList.add("active");
    });
  });



// Đăng xuất khi nhấn avatar
const logoutIcon = document.getElementById("avt-log-out");

logoutIcon.addEventListener("click", function (event) {
  event.preventDefault(); // Ngăn hành vi mặc định nếu có
  // Hiển thị modal đăng xuất
  const logoutModal = new bootstrap.Modal(document.getElementById("logoutModal"));
  logoutModal.show();
});

// Xử lý khi nhấn nút "Đăng Xuất" trong modal
const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");
confirmLogoutBtn.addEventListener("click", function () {
  // Xóa trạng thái đăng nhập
  localStorage.removeItem("isLoggedIn");

  // Ẩn modal
  const logoutModal = bootstrap.Modal.getInstance(document.getElementById("logoutModal"));
  logoutModal.hide();

  // Hiển thị thông báo đăng xuất thành công
  Swal.fire({
    icon: "success",
    title: "Đăng xuất thành công!",
    showConfirmButton: false,
    timer: 1500,
  });

  // Chuyển hướng về trang đăng nhập sau 1.5 giây
  setTimeout(function () {
    window.location.href = "login.html";
  }, 1500);
});