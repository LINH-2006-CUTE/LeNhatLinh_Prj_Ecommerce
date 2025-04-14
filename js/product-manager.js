

document.addEventListener("DOMContentLoaded", function () {
  let products = JSON.parse(localStorage.getItem("products")) || [
    {
      code: "SP001",
      name: "iPhone 12 Pro",
      price: 12000000,
      quantity: 10,
      discount: 0,
      status: "active",
      category: "DM008", // Điện thoại
      image: "",
      detail: "",
      createdAt: "2025-04-01T10:00:00",
    },
    {
      code: "SP002",
      name: "Samsung Galaxy X20",
      price: 21000000,
      quantity: 100,
      discount: 5,
      status: "inactive",
      category: "DM008", // Điện thoại
      image: "",
      detail: "",
      createdAt: "2025-04-02T12:00:00",
    },
    {
      code: "SP003",
      name: "iPhone 8 Plus",
      price: 5000000,
      quantity: 10,
      discount: 0,
      status: "active",
      category: "DM008", // Điện thoại
      image: "",
      detail: "",
      createdAt: "2025-04-03T14:00:00",
    },
    {
      code: "SP004",
      name: "iPhone 14 Pro Max",
      price: 25000000,
      quantity: 20,
      discount: 2,
      status: "inactive",
      category: "DM008", // Điện thoại
      image: "",
      detail: "",
      createdAt: "2025-04-04T16:00:00",
    },
    {
      code: "SP005",
      name: "Oppo X3",
      price: 2000000,
      quantity: 10,
      discount: 5,
      status: "inactive",
      category: "DM008", // Điện thoại
      image: "",
      detail: "",
      createdAt: "2025-04-05T18:00:00",
    },
    {
      code: "SP006",
      name: "iPhone 16",
      price: 20000000,
      quantity: 20,
      discount: 3,
      status: "inactive",
      category: "DM008", // Điện thoại
      image: "",
      detail: "",
      createdAt: "2025-04-06T20:00:00",
    },
    {
      code: "SP007",
      name: "iPhone 7 Plus",
      price: 4000000,
      quantity: 10,
      discount: 4,
      status: "active",
      category: "DM008", // Điện thoại
      image: "",
      detail: "",
      createdAt: "2025-04-07T22:00:00",
    },
    {
      code: "SP008",
      name: "Samsung S20 Ultra",
      price: 30000000,
      quantity: 15,
      discount: 2,
      status: "inactive",
      category: "DM008", // Điện thoại
      image: "",
      detail: "",
      createdAt: "2025-04-08T09:00:00",
    },
  ];

  let filteredProducts = [...products];
  const itemsPerPage = 5;
  let currentPage = 1;

  const productTableBody = document.querySelector(".product-table tbody");
  const pagination = document.createElement("div");
  pagination.id = "pagination";
  pagination.className = "pagination";
  document.querySelector(".product-table").after(pagination);
  const categoryFilter = document.getElementById("categoryFilter");
  const statusFilter = document.getElementById("statusFilter");
  const searchInput = document.getElementById("searchInput");

  // Thêm select cho sắp xếp (tương tự category_manager.js)
  const filterBar = document.querySelector(".filter-bar");
  const sortOption = document.createElement("select");
  sortOption.id = "sortOption";
  sortOption.innerHTML = `
    <option value="">Sắp xếp</option>
    <option value="name-asc">Tên (A-Z)</option>
    <option value="date-asc">Ngày tạo (Cũ nhất)</option>
  `;
  filterBar.appendChild(sortOption);

  // Hàm hiển thị danh sách sản phẩm với phân trang
  function renderProducts() {
    productTableBody.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(start, end);

    paginatedProducts.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.code}</td>
        <td>${product.name}</td>
        <td>${product.price.toLocaleString("vi-VN")} đ</td>
        <td>${product.quantity}</td>
        <td>${product.discount}%</td>
        <td><span class="status ${product.status}">${
          product.status === "active" ? "• Đang hoạt động" : "• Ngừng hoạt động"
        }</span></td>
        <td>
          <button class="edit-btn" data-code="${product.code}" data-bs-toggle="modal" data-bs-target="#addProductModal">
            <img src="../assets/icons/pen.png" alt="Sửa" />
          </button>
          <button class="delete-btn" data-code="${product.code}" data-bs-toggle="modal" data-bs-target="#deleteProductModal">
            <img src="../assets/icons/trash.png" alt="Xóa" />
          </button>
        </td>
      `;
      productTableBody.appendChild(row);
    });

    renderPagination();
  }

  // Hàm hiển thị phân trang
  function renderPagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    pagination.innerHTML = "";

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "←";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderProducts();
      }
    });
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.textContent = i;
      pageBtn.classList.toggle("active", i === currentPage);
      pageBtn.addEventListener("click", () => {
        currentPage = i;
        renderProducts();
      });
      pagination.appendChild(pageBtn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "→";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
      }
    });
    pagination.appendChild(nextBtn);
  }

  // Hàm lọc, tìm kiếm và sắp xếp
  function applyFilters() {
    filteredProducts = [...products];

    // Lọc theo danh mục
    const category = categoryFilter.value;
    if (category) {
      filteredProducts = filteredProducts.filter((product) => product.category === category);
    }

    // Lọc theo trạng thái
    const status = statusFilter.value;
    if (status) {
      filteredProducts = filteredProducts.filter((product) => product.status === status);
    }

    // Tìm kiếm theo tên
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }

    // Sắp xếp
    const sortValue = sortOption.value;
    if (sortValue === "name-asc") {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "date-asc") {
      filteredProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    currentPage = 1;
    renderProducts();
  }

  // Sự kiện lọc, tìm kiếm và sắp xếp
  categoryFilter.addEventListener("change", applyFilters);
  statusFilter.addEventListener("change", applyFilters);
  searchInput.addEventListener("input", applyFilters);
  sortOption.addEventListener("change", applyFilters);

  // Hàm load danh mục vào dropdown
  function loadCategories() {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    categoryFilter.innerHTML = '<option value="">Lọc theo danh mục</option>';
    const productCategoryInput = document.getElementById("productCategory");

    // Thay vì dropdown, productCategory là input text, nên chỉ cần hiển thị danh sách trong categoryFilter
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.code;
      option.textContent = category.name;
      categoryFilter.appendChild(option);
    });
  }

  // Thêm/sửa sản phẩm
  const addProductForm = document.getElementById("addProductForm");
  let editIndex = -1;
  addProductForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const code = document.getElementById("productCode").value.trim();
    const name = document.getElementById("productName").value.trim();
    const category = document.getElementById("productCategory").value.trim();
    const price = parseFloat(document.getElementById("productPrice").value);
    const quantity = parseInt(document.getElementById("productQuantity").value);
    const discount = parseInt(document.getElementById("productDiscount").value);
    const active = document.getElementById("active").checked;
    const inactive = document.getElementById("inactive").checked;
    const image = document.getElementById("img-dashed").value.trim();
    const detail = document.getElementById("detail").value.trim();

    let status = active ? "active" : inactive ? "inactive" : null;

    // Validate
    let hasError = false;
    document.getElementById("codeHelp").textContent = "";
    document.getElementById("nameHelp").textContent = "";

    if (!code) {
      document.getElementById("codeHelp").textContent = "Mã sản phẩm không được để trống";
      hasError = true;
    } else if (editIndex === -1 && products.some((product) => product.code === code)) {
      document.getElementById("codeHelp").textContent = "Mã sản phẩm đã tồn tại";
      hasError = true;
    }

    if (!name) {
      document.getElementById("nameHelp").textContent = "Tên sản phẩm không được để trống";
      hasError = true;
    }

    if (!category) {
      document.getElementById("nameHelp").textContent = "Vui lòng nhập danh mục";
      hasError = true;
    }

    if (isNaN(price) || price < 0) {
      document.getElementById("nameHelp").textContent = "Giá không hợp lệ";
      hasError = true;
    }

    if (isNaN(quantity) || quantity < 0) {
      document.getElementById("nameHelp").textContent = "Số lượng không hợp lệ";
      hasError = true;
    }

    if (isNaN(discount) || discount < 0 || discount > 100) {
      document.getElementById("nameHelp").textContent = "Giảm giá không hợp lệ";
      hasError = true;
    }

    if (!status) {
      document.getElementById("nameHelp").textContent = "Vui lòng chọn trạng thái";
      hasError = true;
    }

    if (hasError) return;

    const productData = {
      code,
      name,
      category,
      price,
      quantity,
      discount,
      status,
      image,
      detail,
      createdAt: editIndex !== -1 ? products[editIndex].createdAt : new Date().toISOString(),
    };

    if (editIndex !== -1) {
      products[editIndex] = productData;
      Swal.fire({
        icon: "success",
        title: "Cập nhật sản phẩm thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      products.push(productData);
      Swal.fire({
        icon: "success",
        title: "Thêm sản phẩm thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    localStorage.setItem("products", JSON.stringify(products));
    filteredProducts = [...products];
    applyFilters();
    currentPage = 1;

    const modal = bootstrap.Modal.getInstance(document.getElementById("addProductModal"));
    modal.hide();
    addProductForm.reset();
    document.getElementById("active").checked = true;
    document.getElementById("inactive").checked = false;
    editIndex = -1;
    document.querySelector(".modal-title").textContent = "Thêm mới sản phẩm";
  });

  // Checkbox logic
  const activeCheckbox = document.getElementById("active");
  const inactiveCheckbox = document.getElementById("inactive");
  activeCheckbox.addEventListener("change", function () {
    if (activeCheckbox.checked) {
      inactiveCheckbox.checked = false;
    }
  });
  inactiveCheckbox.addEventListener("change", function () {
    if (inactiveCheckbox.checked) {
      activeCheckbox.checked = false;
    }
  });

  // Chỉnh sửa sản phẩm
  productTableBody.addEventListener("click", function (e) {
    if (e.target.closest(".edit-btn")) {
      const code = e.target.closest(".edit-btn").dataset.code;
      editIndex = products.findIndex((product) => product.code === code);
      const product = products[editIndex];

      document.getElementById("productCode").value = product.code;
      document.getElementById("productName").value = product.name;
      document.getElementById("productCategory").value = product.category;
      document.getElementById("productPrice").value = product.price;
      document.getElementById("productQuantity").value = product.quantity;
      document.getElementById("productDiscount").value = product.discount;
      document.getElementById("active").checked = product.status === "active";
      document.getElementById("inactive").checked = product.status === "inactive";
      document.getElementById("img-dashed").value = product.image || "";
      document.getElementById("detail").value = product.detail || "";
      document.querySelector(".modal-title").textContent = "Chỉnh sửa sản phẩm";
    }
  });

  // Xóa sản phẩm
  let deleteIndex = -1;
  productTableBody.addEventListener("click", function (e) {
    if (e.target.closest(".delete-btn")) {
      const code = e.target.closest(".delete-btn").dataset.code;
      deleteIndex = products.findIndex((product) => product.code === code);
    }
  });

  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  confirmDeleteBtn.addEventListener("click", function () {
    products.splice(deleteIndex, 1);
    localStorage.setItem("products", JSON.stringify(products));
    filteredProducts = [...products];
    applyFilters();

    const modal = bootstrap.Modal.getInstance(document.getElementById("deleteProductModal"));
    modal.hide();
    Swal.fire({
      icon: "success",
      title: "Xóa sản phẩm thành công!",
      showConfirmButton: false,
      timer: 1500,
    });
  });

  

  // render lại
  loadCategories();
  renderProducts();
});

 // Đăng xuất khi nhấn avatar
const logoutIcon = document.getElementById("avt-log-out");

logoutIcon.addEventListener("click", function () {
    if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
        // Xóa trạng thái đăng nhập
        localStorage.removeItem("isLoggedIn");
        Swal.fire("Đăng xuất thành công!", "", "success");

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1500);
    }
});

window.addEventListener("load", function () {
// chuyển hướng về trang đăng nhập
//     if (!localStorage.getItem("isLoggedIn")) {
//         window.location.href = "login.html";
//     }
// });
});