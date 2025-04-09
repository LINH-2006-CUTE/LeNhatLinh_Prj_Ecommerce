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
  
    // Phân trang
    // const itemsPerPage = 5;
    // let currentPage = 1;
    
  
    // Lấy các phần tử DOM
    const categoryTableBody = document.getElementById("categoryTableBody");
    const pagination = document.getElementById("pagination");
    const statusFilter = document.getElementById("statusFilter");
    const searchInput = document.getElementById("searchInput");
    const sortOption = document.getElementById("sortOption");
  
    // Hàm hiển thị danh sách danh mục
    function renderCategories() {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedCategories = filteredCategories.slice(start, end);
  
      categoryTableBody.innerHTML = "";
      paginatedCategories.forEach((category) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${category.code}</td>
          <td>${category.name}</td>
          <td>${new Date(category.createdAt).toLocaleString()}</td>
          <td><span class="status ${category.status}">${
            category.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động"
          }</span></td>
          <td>
            <button class="delete-btn" data-code="${category.code}" data-bs-toggle="modal" data-bs-target="#deleteModal">
              <img src="../assets/icons/trash.png" alt="Delete" />
            </button>
            <button class="edit-btn" data-code="${category.code}" data-bs-toggle="modal" data-bs-target="#editModal">
              <img src="../assets/icons/pen.png" alt="Edit" />
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
  
      // Nút Previous
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
  
      // Các nút số trang
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
  
      // Nút Next
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
      let tempCategories = [...categories];
  
      // Lọc theo trạng thái
      const status = statusFilter.value;
      if (status) {
        tempCategories = tempCategories.filter((category) => category.status === status);
      }
  
      // Tìm kiếm theo tên
      const searchTerm = searchInput.value.trim().toLowerCase();
      if (searchTerm) {
        tempCategories = tempCategories.filter((category) =>
          category.name.toLowerCase().includes(searchTerm)
        );
      }
  
      // Sắp xếp
      const sortValue = sortOption.value;
      if (sortValue === "name-asc") {
        tempCategories.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortValue === "name-desc") {
        tempCategories.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortValue === "date-asc") {
        tempCategories.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (sortValue === "date-desc") {
        tempCategories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
  
      filteredCategories = tempCategories;
      currentPage = 1; // Reset về trang đầu tiên
      renderCategories();
    }
  
    // Sự kiện lọc, tìm kiếm và sắp xếp
    statusFilter.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);
    sortOption.addEventListener("change", applyFilters);
  
    // Thêm danh mục mới
    document.getElementById("addCategoryBtn").addEventListener("click", function () {
      const code = document.getElementById("categoryCode").value.trim();
      const name = document.getElementById("categoryName").value.trim();
      const status = document.getElementById("categoryStatus").checked ? "active" : "inactive";
  
      // Validate
      let hasError = false;
      document.getElementById("codeHelp").textContent = "";
      document.getElementById("nameHelp").textContent = "";
  
      if (!code) {
        document.getElementById("codeHelp").textContent = "Mã danh mục không được để trống";
        hasError = true;
      } else if (categories.some((categories) => categories.code === code)) {
        document.getElementById("codeHelp").textContent = "Mã danh mục đã tồn tại";
        hasError = true;
      }
  
      if (!name) {
        document.getElementById("nameHelp").textContent = "Tên danh mục không được để trống";
        hasError = true;
      }
  
      if (hasError) return;
  
      // Thêm danh mục
      const newCategory = {
        code,
        name,
        status,
        createdAt: new Date().toISOString(),
      };
      categories.push(newCategory);
      localStorage.setItem("categories", JSON.stringify(categories));
      
      applyFilters();
  
      // Đóng modal và thông báo
      const modal = bootstrap.Modal.getInstance(document.getElementById("myModal"));
      modal.hide();
      Swal.fire({
        icon: "success",
        title: "Thêm danh mục thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
  
      // Reset form
      document.getElementById("addCategoryForm").reset();
      document.getElementById("categoryStatus").checked = true;
    });
  
    // Cập nhật danh mục
    let categoryToEdit = null;
    categoryTableBody.addEventListener("click", function (edit) {
      if (edit.target.closest(".edit-btn")) {
        const code = edit.target.closest(".edit-btn").dataset.code;
        categoryToEdit = categories.find((categories) => categories.code === code);
  
        document.getElementById("editCategoryCode").value = categoryToEdit.code;
        document.getElementById("editCategoryName").value = categoryToEdit.name;
        document.getElementById("editCategoryStatus").checked = categoryToEdit.status === "active";
      }
    });
  
    document.getElementById("updateCategoryBtn").addEventListener("click", function () {
      const name = document.getElementById("editCategoryName").value.trim();
      const status = document.getElementById("editCategoryStatus").checked ? "active" : "inactive";
  
      // Validate
      if (!name) {
        document.getElementById("editNameHelp").textContent = "Tên danh mục không được để trống";
        return;
      }
  
      // Cập nhật danh mục
      categoryToEdit.name = name;
      categoryToEdit.status = status;
      localStorage.setItem("categories", JSON.stringify(categories));
      filteredCategories = [...categories];
      applyFilters();
  
      // Đóng modal và thông báo
      const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
      modal.hide();
      Swal.fire({
        icon: "success",
        title: "Cập nhật danh mục thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  
    // Xóa danh mục
    let categoryToDelete = null;
    categoryTableBody.addEventListener("click", function (element) {
      if (element.target.closest(".delete-btn")) {
        const code = element.target.closest(".delete-btn").dataset.code;
        categoryToDelete = code;
      }
    });
  
    document.getElementById("confirmDeleteBtn").addEventListener("click", function () {
      categories = categories.filter((categories) => categories.code !== categoryToDelete);
      localStorage.setItem("categories", JSON.stringify(categories));
      filteredCategories = [...categories];
      applyFilters();
  
      // Đóng modal và thông báo
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
  });