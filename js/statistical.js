  const menuItems = document.querySelectorAll(".sidebar-menu li");
  menuItems.forEach(item => {
    item.addEventListener("click", function () {
      // Xoá active khỏi tất cả item
      menuItems.forEach(i => i.classList.remove("active"));
      // active khi được click
      this.classList.add("active");
    });
  });
