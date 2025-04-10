// Đăng xuất khi nhấn icon
const logoutIcon = document.getElementById("log-out");

logoutIcon.addEventListener("click", function () {
  console.log("Đã nhấn vào icon đăng xuất"); 
  localStorage.removeItem("isLoggedIn");
  alert("Bạn đã đăng xuất thành công!");
  window.location.href = "login.html";
});

// ktra trạng thái đăng nhập
window.addEventListener("load", function () {
});