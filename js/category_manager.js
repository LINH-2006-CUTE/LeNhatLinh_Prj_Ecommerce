document.addEventListener("DOMContentLoaded", function () {
  
    let categories = JSON.parse(localStorage.getItem("categories")) || [
      { code: "DM001", name: "Quần áo", status: "active", createdAt: "2025-04-01T10:00:00" },
      { code: "DM002", name: "Kính mắt", status: "inactive", createdAt: "2025-04-02T12:00:00" },
      { code: "DM003", name: "Giày dép", status: "active", createdAt: "2025-04-03T14:00:00" },
      { code: "DM004", name: "Thời trang nam", status: "inactive", createdAt: "2025-04-04T16:00:00" },
      { code: "DM005", name: "Thời trang nữ", status: "inactive", createdAt: "2025-04-05T18:00:00" },
      { code: "DM006", name: "Hoa quả", status: "active", createdAt: "2025-04-06T20:00:00" },
      { code: "DM007", name: "Rau", status: "active", createdAt: "2025-04-07T22:00:00" },
      { code: "DM008", name: "Điện thoại", status: "inactive", createdAt: "2025-04-08T09:00:00" },
    ];
    let filteredCategories = [...categories];
  
    // Phân trang
    const itemsPerPage = 5;
    let currentPage = 1;
  
    const categoryTableBody = document.getElementById("categoryTableBody");
    const pagination = document.getElementById("pagination");
    const statusFilter = document.getElementById("statusFilter");
    const searchInput = document.getElementById("searchInput");
    const sortOption = document.getElementById("sortOption");
  
    // Hàm hiển thị danh sách danh mục với phân trang
    function renderCategories() {
      categoryTableBody.innerHTML = "";
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedCategories = filteredCategories.slice(start, end);
  
      paginatedCategories.forEach((category) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${category.code}</td>
          <td>${category.name}</td>
          <td>${new Date(category.createdAt).toLocaleString()}</td>
          <td><span class="status ${category.status}">${
            category.status === "active" ? "&#8226;  Đang hoạt động" : "&#8226;  Ngừng hoạt động"
          }</span></td>
          <td>
            <button class="delete-btn" data-code="${category.code}" data-bs-toggle="modal" data-bs-target="#deleteModal">
              <img src="../assets/icons/trash.png" alt="Xóa" />
            </button>
            <button class="edit-btn" data-code="${category.code}" data-bs-toggle="modal" data-bs-target="#editModal">
              <img src="../assets/icons/pen.png" alt="Sửa" />
            </button>
          </td>
        `;
        categoryTableBody.appendChild(row);
      });
  
      renderPagination();
    }
  
    // Hàm hiển thị phân trang
    function renderPagination() {
      const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
      pagination.innerHTML = "";
  
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "←";
      prevBtn.disabled = currentPage === 1;
      prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          renderCategories();
        }
      });
      pagination.appendChild(prevBtn);
  
      for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.textContent = i;
        pageBtn.classList.toggle("active", i === currentPage);
        pageBtn.addEventListener("click", () => {
          currentPage = i;
          renderCategories();
        });
        pagination.appendChild(pageBtn);
      }
  
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "→";
      nextBtn.disabled = currentPage === totalPages;
      nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderCategories();
        }
      });
      pagination.appendChild(nextBtn);
    }
  
    // Hàm lọc, tìm kiếm và sắp xếp
    function applyFilters() {
      filteredCategories = [...categories];
  
      // Lọc theo trạng thái
      const status = statusFilter.value;
      if (status) {
        filteredCategories = filteredCategories.filter((category) => category.status === status);
      }
  
      // Tìm kiếm theo tên
      const searchTerm = searchInput.value.trim().toLowerCase();
      if (searchTerm) {
        filteredCategories = filteredCategories.filter((category) =>
          category.name.toLowerCase().includes(searchTerm)
        );
      }
  
      // Sắp xếp
      const sortValue = sortOption.value;
      if (sortValue === "name-asc") {
        filteredCategories.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortValue === "date-asc") {
        filteredCategories.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      }
  
      currentPage = 1;
      renderCategories();
    }
  
    // Sự kiện lọc, tìm kiếm và sắp xếp
    statusFilter.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);
    sortOption.addEventListener("change", applyFilters);
  
    // Thêm danh mục mới
    const addCategoryBtn = document.getElementById("addCategoryBtn");
    addCategoryBtn.addEventListener("click", function () {
      const code = document.getElementById("categoryCode").value.trim();
      const name = document.getElementById("categoryName").value.trim();
      const active = document.getElementById("categoryActive").checked;
      const inactive = document.getElementById("categoryInactive").checked;
  
      let status = active ? "active" : inactive ? "inactive" : null;
  
      // Validate
      let hasError = false;
      document.getElementById("codeHelp").textContent = "";
      document.getElementById("nameHelp").textContent = "";
  
      if (!code) {
        document.getElementById("codeHelp").textContent = "Mã danh mục không được để trống";
        hasError = true;
      } else if (categories.some((category) => category.code === code)) {
        document.getElementById("codeHelp").textContent = "Mã danh mục đã tồn tại";
        hasError = true;
      }
  
      if (!name) {
        document.getElementById("nameHelp").textContent = "Tên danh mục không được để trống";
        hasError = true;
      } else if (categories.some((category) => category.name.toLowerCase() === name.toLowerCase())) {
        document.getElementById("nameHelp").textContent = "Tên danh mục đã tồn tại";
        hasError = true;
      }
  
      if (!status) {
        document.getElementById("nameHelp").textContent = "Vui lòng chọn trạng thái";
        hasError = true;
      }
  
      if (hasError) return;
  
      const newCategory = {
        code,
        name,
        status,
        createdAt: new Date().toISOString(),
      };
  
      categories.push(newCategory);
      localStorage.setItem("categories", JSON.stringify(categories));
      filteredCategories = [...categories];
      applyFilters();
      currentPage = 1; // về trang 1 để hiển thị danh mục mới


  
      const modal = bootstrap.Modal.getInstance(document.getElementById("myModal"));
      modal.hide();
      Swal.fire({
        icon: "success",
        title: "Thêm danh mục thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
  
      document.getElementById("addCategoryForm").reset();
      document.getElementById("categoryActive").checked = true;
      document.getElementById("categoryInactive").checked = false;
    });
  
    // Checkbox logic
    const categoryActiveCheckbox = document.getElementById("categoryActive");
    const categoryInactiveCheckbox = document.getElementById("categoryInactive");
    categoryActiveCheckbox.addEventListener("change", function () {
      if (categoryActiveCheckbox.checked) {
        categoryInactiveCheckbox.checked = false;
      }
    });
    categoryInactiveCheckbox.addEventListener("change", function () {
      if (categoryInactiveCheckbox.checked) {
        categoryActiveCheckbox.checked = false;
      }
    });
  
    // Cập nhật danh mục
    let editIndex = -1;
    document.getElementById("categoryTableBody").addEventListener("click", function (e) {
      if (e.target.closest(".edit-btn")) {
        const code = e.target.closest(".edit-btn").dataset.code;
        editIndex = categories.findIndex((category) => category.code === code);
  
        const category = categories[editIndex];
        document.getElementById("editCategoryCode").value = category.code;
        document.getElementById("editCategoryName").value = category.name;
        document.getElementById("categoryActive").checked = category.status === "active";
        document.getElementById("categoryInactive").checked = category.status === "inactive";
      }
    });
  
    const updateCategoryBtn = document.getElementById("updateCategoryBtn");
    updateCategoryBtn.addEventListener("click", function () {
      const name = document.getElementById("editCategoryName").value.trim();
      const active = document.getElementById("categoryActive").checked;
      const inactive = document.getElementById("categoryInactive").checked;
  
      let status = active ? "active" : inactive ? "inactive" : null;
  
      // Validate
      const editNameHelp = document.getElementById('editNameHelp');
      document.getElementById("editNameHelp").textContent = "";
      if (!name) {
        document.getElementById("editNameHelp").textContent = "Tên danh mục không được để trống";
        return;
      }
      if (!status) {
        document.getElementById("editNameHelp").textContent = "Vui lòng chọn trạng thái";
        return;
      }
  
      categories[editIndex].name = name;
      categories[editIndex].status = status;
      localStorage.setItem("categories", JSON.stringify(categories));
      filteredCategories = [...categories];
      applyFilters();
  
      const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
      modal.hide();
      Swal.fire({
        icon: "success",
        title: "Cập nhật danh mục thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  
    // Checkbox logic cho form cập nhật
    const editCategoryActiveCheckbox = document.getElementById("categoryActive");
    const editCategoryInactiveCheckbox = document.getElementById("categoryInactive");
    editCategoryActiveCheckbox.addEventListener("change", function () {
      if (editCategoryActiveCheckbox.checked) {
        editCategoryInactiveCheckbox.checked = false;
      }
    });
    editCategoryInactiveCheckbox.addEventListener("change", function () {
      if (editCategoryInactiveCheckbox.checked) {
        editCategoryActiveCheckbox.checked = false;
      }
    });
  
    // Xóa danh mục
    let deleteIndex = -1;
    document.getElementById("categoryTableBody").addEventListener("click", function (e) {
      if (e.target.closest(".delete-btn")) {
        const code = e.target.closest(".delete-btn").dataset.code;
        deleteIndex = categories.findIndex((category) => category.code === code);
      }
    });
  
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    confirmDeleteBtn.addEventListener("click", function () {
             // Kiểm tra nếu danh mục có sản phẩm thì không cho xóa
    if (categories[deleteIndex].products && categories[deleteIndex].products.length > 0) {
        Swal.fire('Lỗi!', 'Danh mục này đang có sản phẩm, không thể xóa.', 'error');
        return;
    }
      categories.splice(deleteIndex, 1);
      localStorage.setItem("categories", JSON.stringify(categories));
      filteredCategories = [...categories];
      applyFilters();
  
      const modal = bootstrap.Modal.getInstance(document.getElementById("deleteModal"));
      modal.hide();
      Swal.fire({
        icon: "success",
        title: "Xóa danh mục thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  
    renderCategories();

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

  });