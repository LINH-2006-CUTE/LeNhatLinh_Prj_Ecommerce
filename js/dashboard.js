
  //   btn-buyIP để chuyển trang đăng kí tài khoản
  document.getElementById('btn-buyIP').addEventListener('click', function () {
   
      alert('Vào trang đăng kí');
      window.location.href = '../html/register.html';
    }
  );

  
  document.querySelectorAll('.buy-now').forEach(function (button) {
    button.addEventListener('click', function () {
        alert('Vào trang đăng kí');
        window.location.href = '../html/register.html';
      
    });
  });


  // btn-saleBanner để chuyển trang đăng kí
   document.getElementById('btn-saleBanner').addEventListener('click', function () {
    alert('Vào trang đăng kí');
    window.location.href = '../html/register.html'
   });

//    document.querySelectorAll('.btn-saleBanner').forEach(function (button) {
//     button.addEventListener('click', function () {
//         alert('Vào trang đăng kí');
//         window.location.href ='../html/register.html';
//     }) 
//    })  // xung đột 2 trị nên chỉ 1 cái dùng query




// Đăng xuất 
// const userImg = document.getElementById("log-out");
// const userSelect = document.getElementById("user-select");

// userImg.addEventListener("click", function () {
//   if (userSelect.style.display === "none" || userSelect.style.display === "" ) {
//     userSelect.style.display = "block"; 
//     console.log("Đã nhấn vào hình ảnh"); 
//   } else {
//     userSelect.style.display = "none";
//   }
// });


// userSelect.addEventListener("change", function () {
//   const selectedValue = userSelect.value;

//   if (selectedValue === "logout") {
//     // Xóa trạng đăng nhập
//     localStorage.removeItem("isLoggedIn");

//     alert("Bạn đã đăng xuất thành công!");

//     // Chuyển hướng về trang đăng nhập
//     window.location.href = "login.html";
//   }
// });
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
  // Nếu muốn bảo vệ trang, bật đoạn này lên
  // if (localStorage.getItem("isLoggedIn") !== "true") {
  //   window.location.href = "login.html";
  // }
});