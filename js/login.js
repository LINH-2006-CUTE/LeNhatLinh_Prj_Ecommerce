
document.querySelector('.container-box').addEventListener('submit', function(event) {
  event.preventDefault(); 

  //` giá trị từ input
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

 
  emailError.style.display = 'none';
  passwordError.style.display = 'none';
  emailInput.classList.remove('error-border');
  passwordInput.classList.remove('error-border');

  //Validate dữ liệu
  // Kiểm tra email không được để trống
  if (email === '') {
      emailError.textContent = "Vui lòng nhập email!";
      emailError.style.display = 'block';
      
      emailInput.classList.add('error-border');
      return;
  }

  // Kiểm tra định dạng email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
      emailError.textContent = "Vui lòng nhập email hợp lệ!";
      emailError.style.display = 'block';
      emailInput.classList.add('error-border');
      return;
  }

  // Validate mật khẩu
  // Mật khẩu không được để trống
  if (password === '') {
      passwordError.textContent = "Vui lòng nhập mật khẩu!";
      passwordError.style.display = 'block';
      passwordInput.classList.add('error-border');
      return;
  }

  // Mật khẩu tối thiểu 8 ký tự
  if (password.length < 8) {
      passwordError.textContent = "Mật khẩu phải có ít nhất 8 ký tự!";
      passwordError.style.display = 'block';
      passwordInput.classList.add('error-border');
      return;
  }

  // Mật khẩu không được trùng với email
  if (password === email) {
      passwordError.textContent = "Mật khẩu không được trùng với email!";
      passwordError.style.display = 'block';
      passwordInput.classList.add('error-border');
      return;
  }

  //email và mật khẩu có khớp với dữ liệu đã đăng ký
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
      emailError.textContent = "Email không đúng!";
      emailError.style.display = 'block';
      emailError.style.marginBottom = '10px';
      
      passwordError.textContent = "Mật khẩu không đúng!";
      passwordError.style.display = 'block';
      passwordError.style.marginBottom = '10px';
      emailInput.classList.add('error-border');
      passwordInput.classList.add('error-border');
      return;
  }

  //chuyển hướng đến trang Dashboard
  Swal.fire({
      icon: 'success',
      title: 'Đăng nhập thành công!',
      showConfirmButton: false,
      timer: 1500
  }).then(() => {
      window.location.href = "dashboard.html";
});

})