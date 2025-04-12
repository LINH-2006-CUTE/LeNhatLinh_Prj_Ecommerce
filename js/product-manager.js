// // Lần 1
// document.addEventListener("DOMContentLoaded", function () {
//   // Khởi tạo danh sách sản phẩm từ localStorage hoặc mặc định
//   let products = JSON.parse(localStorage.getItem("products")) || [
//     {
//       code: "SP001",
//       name: "iPhone 12 Pro",
//       price: 12000000,
//       quantity: 10,
//       discount: 0,
//       status: "active",
//       createdAt: "2025-04-01T10:00:00",
//     },
//     {
//       code: "SP002",
//       name: "Samsung Galaxy X20",
//       price: 21000000,
//       quantity: 100,
//       discount: 5,
//       status: "inactive",
//       createdAt: "2025-04-02T12:00:00",
//     },
//     {
//       code: "SP003",
//       name: "iPhone 8 Plus",
//       price: 5000000,
//       quantity: 10,
//       discount: 0,
//       status: "active",
//       createdAt: "2025-04-03T14:00:00",
//     },
//     {
//       code: "SP004",
//       name: "iPhone 14 Pro max",
//       price: 25000000,
//       quantity: 20,
//       discount: 2,
//       status: "inactive",
//       createdAt: "2025-04-04T16:00:00",
//     },
//     {
//       code: "SP005",
//       name: "Oppx X3",
//       price: 2000000,
//       quantity: 10,
//       discount: 5,
//       status: "inactive",
//       createdAt: "2025-04-05T18:00:00",
//     },
//     {
//       code: "SP006",
//       name: "iPhone 16",
//       price: 20000000,
//       quantity: 20,
//       discount: 3,
//       status: "inactive",
//       createdAt: "2025-04-06T20:00:00",
//     },
//     {
//       code: "SP007",
//       name: "iPhone 7 Plus",
//       price: 4000000,
//       quantity: 10,
//       discount: 4,
//       status: "active",
//       createdAt: "2025-04-07T22:00:00",
//     },
//     {
//       code: "SP008",
//       name: "Samsung S20 Ultra",
//       price: 30000000,
//       quantity: 15,
//       discount: 2,
//       status: "inactive",
//       createdAt: "2025-04-08T09:00:00",
//     },
//   ];

//   let filteredProducts = [...products];
//   const itemsPerPage = 5;
//   let currentPage = 1;

//   // Lấy các phần tử HTML
//   const productTableBody = document.querySelector(".product-table tbody");
//   const pagination = document.createElement("div");
//   pagination.id = "pagination";
//   pagination.className = "pagination";
//   document.querySelector(".product-table").after(pagination);
//   const statusFilter = document.querySelector(".filter-bar select:nth-child(2)");
//   const searchInput = document.querySelector(".filter-bar input");

//   // Hàm hiển thị danh sách sản phẩm
//   function renderProducts() {
//     productTableBody.innerHTML = "";
//     const start = (currentPage - 1) * itemsPerPage;
//     const end = Math.min(start + itemsPerPage, filteredProducts.length);
//     const paginatedProducts = filteredProducts.slice(start, end);

//     paginatedProducts.forEach((product) => {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//         <td>${product.code}</td>
//         <td>${product.name}</td>
//         <td>${product.price.toLocaleString("vi-VN")} đ</td>
//         <td>${product.quantity}</td>
//         <td>${product.discount}%</td>
//         <td><span class="status ${product.status}">${
//           product.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động"
//         }</span></td>
//         <td>
//           <button class="edit-btn" data-code="${product.code}" data-bs-toggle="modal" data-bs-target="#editProductModal">
//             <img src="../assets/icons/pen.png" alt="Edit" />
//           </button>
//           <button class="delete-btn" data-code="${product.code}" data-bs-toggle="modal" data-bs-target="#deleteProductModal">
//             <img src="../assets/icons/trash.png" alt="Delete" />
//           </button>
//         </td>
//       `;
//       productTableBody.appendChild(row);
//     });

//     renderPagination();
//   }

//   // Hàm hiển thị phân trang
//   function renderPagination() {
//     pagination.innerHTML = "";
//     const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//     // Nút Previous
//     const prevBtn = document.createElement("button");
//     prevBtn.textContent = "←";
//     prevBtn.className = "btn btn-light";
//     prevBtn.disabled = currentPage === 1;
//     prevBtn.addEventListener("click", () => {
//       if (currentPage > 1) {
//         currentPage--;
//         renderProducts();
//       }
//     });
//     pagination.appendChild(prevBtn);

//     // Các nút số trang
//     for (let i = 1; i <= totalPages; i++) {
//       const pageBtn = document.createElement("button");
//       pageBtn.textContent = i;
//       pageBtn.className = `btn btn-light ${i === currentPage ? "active" : ""}`;
//       pageBtn.addEventListener("click", () => {
//         currentPage = i;
//         renderProducts();
//       });
//       pagination.appendChild(pageBtn);
//     }

//     // Nút Next
//     const nextBtn = document.createElement("button");
//     nextBtn.textContent = "→";
//     nextBtn.className = "btn btn-light";
//     nextBtn.disabled = currentPage === totalPages;
//     nextBtn.addEventListener("click", () => {
//       if (currentPage < totalPages) {
//         currentPage++;
//         renderProducts();
//       }
//     });
//     pagination.appendChild(nextBtn);
//   }

//   // Hàm lọc và tìm kiếm
//   function applyFilters() {
//     filteredProducts = [...products];

//     // Lọc theo trạng thái
//     const status = statusFilter.value;
//     if (status && status !== "Lọc theo trạng thái") {
//       filteredProducts = filteredProducts.filter(
//         (product) => product.status === status
//       );
//     }

//     // Tìm kiếm theo tên
//     const searchTerm = searchInput.value.trim().toLowerCase();
//     if (searchTerm) {
//       filteredProducts = filteredProducts.filter((product) =>
//         product.name.toLowerCase().includes(searchTerm)
//       );
//     }

//     currentPage = 1;
//     renderProducts();
//   }

//   // Gắn sự kiện lọc và tìm kiếm
//   statusFilter.addEventListener("change", applyFilters);
//   searchInput.addEventListener("input", applyFilters);

//   // Thêm sản phẩm mới
//   document.getElementById("addProductBtn").addEventListener("click", function () {
//     const code = document.getElementById("productCode").value.trim();
//     const name = document.getElementById("productName").value.trim();
//     const price = parseFloat(document.getElementById("productPrice").value);
//     const quantity = parseInt(document.getElementById("productQuantity").value);
//     const discount = parseInt(document.getElementById("productDiscount").value);
//     const status = document.getElementById("productStatus").value;

//     // Xác thực
//     let hasError = false;
//     document.getElementById("codeHelp").textContent = "";
//     document.getElementById("nameHelp").textContent = "";

//     if (!code) {
//       document.getElementById("codeHelp").textContent =
//         "Mã sản phẩm không được để trống";
//       hasError = true;
//     } else if (products.some((product) => product.code === code)) {
//       document.getElementById("codeHelp").textContent = "Mã sản phẩm đã tồn tại";
//       hasError = true;
//     }

//     if (!name) {
//       document.getElementById("nameHelp").textContent =
//         "Tên sản phẩm không được để trống";
//       hasError = true;
//     }

//     if (isNaN(price) || price < 0) {
//       document.getElementById("nameHelp").textContent = "Giá không hợp lệ";
//       hasError = true;
//     }

//     if (isNaN(quantity) || quantity < 0) {
//       document.getElementById("nameHelp").textContent = "Số lượng không hợp lệ";
//       hasError = true;
//     }

//     if (isNaN(discount) || discount < 0 || discount > 100) {
//       document.getElementById("nameHelp").textContent = "Giảm giá không hợp lệ";
//       hasError = true;
//     }

//     if (hasError) return;

//     const newProduct = {
//       code,
//       name,
//       price,
//       quantity,
//       discount,
//       status,
//       createdAt: new Date().toISOString(),
//     };

//     products.push(newProduct);
//     localStorage.setItem("products", JSON.stringify(products));
//     filteredProducts = [...products];
//     applyFilters();

//     const modal = bootstrap.Modal.getInstance(
//       document.getElementById("addProductModal")
//     );
//     modal.hide();

//     Swal.fire({
//       icon: "success",
//       title: "Thêm sản phẩm thành công!",
//       showConfirmButton: false,
//       timer: 1500,
//     });

//     document.getElementById("addProductForm").reset();
//   });

//   // Cập nhật sản phẩm
//   let editIndex = -1;
//   productTableBody.addEventListener("click", function (e) {
//     if (e.target.closest(".edit-btn")) {
//       const code = e.target.closest(".edit-btn").dataset.code;
//       editIndex = products.findIndex((product) => product.code === code);
//       const product = products[editIndex];

//       document.getElementById("editProductCode").value = product.code;
//       document.getElementById("editProductName").value = product.name;
//       document.getElementById("editProductPrice").value = product.price;
//       document.getElementById("editProductQuantity").value = product.quantity;
//       document.getElementById("editProductDiscount").value = product.discount;
//       document.getElementById("editProductStatus").value = product.status;
//     }
//   });

//   document
//     .getElementById("updateProductBtn")
//     .addEventListener("click", function () {
//       const name = document.getElementById("editProductName").value.trim();
//       const price = parseFloat(
//         document.getElementById("editProductPrice").value
//       );
//       const quantity = parseInt(
//         document.getElementById("editProductQuantity").value
//       );
//       const discount = parseInt(
//         document.getElementById("editProductDiscount").value
//       );
//       const status = document.getElementById("editProductStatus").value;

//       // Xác thực
//       document.getElementById("editNameHelp").textContent = "";
//       let hasError = false;

//       if (!name) {
//         document.getElementById("editNameHelp").textContent =
//           "Tên sản phẩm không được để trống";
//         hasError = true;
//       }

//       if (isNaN(price) || price < 0) {
//         document.getElementById("editNameHelp").textContent = "Giá không hợp lệ";
//         hasError = true;
//       }

//       if (isNaN(quantity) || quantity < 0) {
//         document.getElementById("editNameHelp").textContent =
//           "Số lượng không hợp lệ";
//         hasError = true;
//       }

//       if (isNaN(discount) || discount < 0 || discount > 100) {
//         document.getElementById("editNameHelp").textContent =
//           "Giảm giá không hợp lệ";
//         hasError = true;
//       }

//       if (hasError) return;

//       products[editIndex] = {
//         ...products[editIndex],
//         name,
//         price,
//         quantity,
//         discount,
//         status,
//       };
//       localStorage.setItem("products", JSON.stringify(products));
//       filteredProducts = [...products];
//       applyFilters();

//       const modal = bootstrap.Modal.getInstance(
//         document.getElementById("editProductModal")
//       );
//       modal.hide();

//       Swal.fire({
//         icon: "success",
//         title: "Cập nhật sản phẩm thành công!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     });

//   // Xóa sản phẩm
//   let deleteIndex = -1;
//   productTableBody.addEventListener("click", function (e) {
//     if (e.target.closest(".delete-btn")) {
//       const code = e.target.closest(".delete-btn").dataset.code;
//       deleteIndex = products.findIndex((product) => product.code === code);
//     }
//   });

//   document
//     .getElementById("confirmDeleteBtn")
//     .addEventListener("click", function () {
//       products.splice(deleteIndex, 1);
//       localStorage.setItem("products", JSON.stringify(products));
//       filteredProducts = [...products];
//       applyFilters();

//       const modal = bootstrap.Modal.getInstance(
//         document.getElementById("deleteProductModal")
//       );
//       modal.hide();

//       Swal.fire({
//         icon: "success",
//         title: "Xóa sản phẩm thành công!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     });

//   // Khởi tạo hiển thị
//   renderProducts();
// });
// LẤN 2:

// document.addEventListener("DOMContentLoaded", function () {
//   let categories = JSON.parse(localStorage.getItem("categories")) || [
//     { code: "DM001", name: "Quần áo", status: "active", createdAt: "2025-04-01T10:00:00" },
//     { code: "DM002", name: "Kính mắt", status: "inactive", createdAt: "2025-04-02T12:00:00" },
//     { code: "DM003", name: "Giày dép", status: "active", createdAt: "2025-04-03T14:00:00" },
//     { code: "DM004", name: "Thời trang nam", status: "inactive", createdAt: "2025-04-04T16:00:00" },
//     { code: "DM005", name: "Thời trang nữ", status: "inactive", createdAt: "2025-04-05T18:00:00" },
//     { code: "DM006", name: "Hoa quả", status: "active", createdAt: "2025-04-06T20:00:00" },
//     { code: "DM007", name: "Rau", status: "active", createdAt: "2025-04-07T22:00:00" },
//     { code: "DM008", name: "Điện thoại", status: "inactive", createdAt: "2025-04-08T09:00:00" },
//   ];
//   let filteredCategories = [...categories];

//   // Phân trang
//   const itemsPerPage = 5;
//   let currentPage = 1;

//   const categoryTableBody = document.getElementById("categoryTableBody");
//   const pagination = document.getElementById("pagination");
//   const statusFilter = document.getElementById("statusFilter");
//   const searchInput = document.getElementById("searchInput");
//   const sortOption = document.getElementById("sortOption");

//   // Hàm hiển thị danh sách danh mục với phân trang
//   function renderCategories() {
//     categoryTableBody.innerHTML = "";
//     const start = (currentPage - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     const paginatedCategories = filteredCategories.slice(start, end);

//     paginatedCategories.forEach((category) => {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//         <td>${category.code}</td>
//         <td>${category.name}</td>
//         <td>${new Date(category.createdAt).toLocaleString()}</td>
//         <td><span class="status ${category.status}">${
//           category.status === "active" ? "•  Đang hoạt động" : "•  Ngừng hoạt động"
//         }</span></td>
//         <td>
//           <button class="delete-btn" data-code="${category.code}" data-bs-toggle="modal" data-bs-target="#deleteModal">
//             <img src="../assets/icons/trash.png" alt="Xóa" />
//           </button>
//           <button class="edit-btn" data-code="${category.code}" data-bs-toggle="modal" data-bs-target="#editModal">
//             <img src="../assets/icons/pen.png" alt="Sửa" />
//           </button>
//         </td>
//       `;
//       categoryTableBody.appendChild(row);
//     });

//     renderPagination();
//   }

//   // Hàm hiển thị phân trang
//   function renderPagination() {
//     const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
//     pagination.innerHTML = "";

//     const prevBtn = document.createElement("button");
//     prevBtn.textContent = "←";
//     prevBtn.disabled = currentPage === 1;
//     prevBtn.addEventListener("click", () => {
//       if (currentPage > 1) {
//         currentPage--;
//         renderCategories();
//       }
//     });
//     pagination.appendChild(prevBtn);

//     for (let i = 1; i <= totalPages; i++) {
//       const pageBtn = document.createElement("button");
//       pageBtn.textContent = i;
//       pageBtn.classList.toggle("active", i === currentPage);
//       pageBtn.addEventListener("click", () => {
//         currentPage = i;
//         renderCategories();
//       });
//       pagination.appendChild(pageBtn);
//     }

//     const nextBtn = document.createElement("button");
//     nextBtn.textContent = "→";
//     nextBtn.disabled = currentPage === totalPages;
//     nextBtn.addEventListener("click", () => {
//       if (currentPage < totalPages) {
//         currentPage++;
//         renderCategories();
//       }
//     });
//     pagination.appendChild(nextBtn);
//   }

//   // Hàm lọc, tìm kiếm và sắp xếp
//   function applyFilters() {
//     filteredCategories = [...categories];

//     // Lọc theo trạng thái
//     const status = statusFilter.value;
//     if (status) {
//       filteredCategories = filteredCategories.filter((category) => category.status === status);
//     }

//     // Tìm kiếm theo tên
//     const searchTerm = searchInput.value.trim().toLowerCase();
//     if (searchTerm) {
//       filteredCategories = filteredCategories.filter((category) =>
//         category.name.toLowerCase().includes(searchTerm)
//       );
//     }

//     // Sắp xếp
//     const sortValue = sortOption.value;
//     if (sortValue === "name-asc") {
//       filteredCategories.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortValue === "date-asc") {
//       filteredCategories.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//     }

//     currentPage = 1;
//     renderCategories();
//   }

//   // Sự kiện lọc, tìm kiếm và sắp xếp
//   statusFilter.addEventListener("change", applyFilters);
//   searchInput.addEventListener("input", applyFilters);
//   sortOption.addEventListener("change", applyFilters);

//   // Thêm danh mục mới
//   const addCategoryBtn = document.getElementById("addCategoryBtn");
//   addCategoryBtn.addEventListener("click", function () {
//     const code = document.getElementById("categoryCode").value.trim();
//     const name = document.getElementById("categoryName").value.trim();
//     const active = document.getElementById("categoryActive").checked;
//     const inactive = document.getElementById("categoryInactive").checked;

//     let status = active ? "active" : inactive ? "inactive" : null;

//     // Validate
//     let hasError = false;

//     if (!code) {
//       Swal.fire({
//         icon: "error",
//         title: "Lỗi",
//         text: "Mã danh mục không được để trống",
//       });
//       hasError = true;
//     } else if (categories.some((category) => category.code === code)) {
//       Swal.fire({
//         icon: "error",
//         title: "Lỗi",
//         text: "Mã danh mục đã tồn tại",
//       });
//       hasError = true;
//     }

//     if (!name) {
//       Swal.fire({
//         icon: "error",
//         title: "Lỗi",
//         text: "Tên danh mục không được để trống",
//       });
//       hasError = true;
//     }

//     if (!status) {
//       Swal.fire({
//         icon: "error",
//         title: "Lỗi",
//         text: "Vui lòng chọn trạng thái",
//       });
//       hasError = true;
//     }

//     if (hasError) return;

//     const newCategory = {
//       code,
//       name,
//       status,
//       createdAt: new Date().toISOString(),
//     };

//     categories.push(newCategory);
//     localStorage.setItem("categories", JSON.stringify(categories));
//     filteredCategories = [...categories];
//     applyFilters();
//     currentPage = 1; 

//     const modal = bootstrap.Modal.getInstance(document.getElementById("myModal"));
//     modal.hide();
//     Swal.fire({
//       icon: "success",
//       title: "Thêm danh mục thành công!",
//       showConfirmButton: false,
//       timer: 1500,
//     });

//     document.getElementById("addCategoryForm").reset();
//     document.getElementById("categoryActive").checked = true;
//     document.getElementById("categoryInactive").checked = false;
//   });

//   // Checkbox logic
//   const categoryActiveCheckbox = document.getElementById("categoryActive");
//   const categoryInactiveCheckbox = document.getElementById("categoryInactive");
//   categoryActiveCheckbox.addEventListener("change", function () {
//     if (categoryActiveCheckbox.checked) {
//       categoryInactiveCheckbox.checked = false;
//     }
//   });
//   categoryInactiveCheckbox.addEventListener("change", function () {
//     if (categoryInactiveCheckbox.checked) {
//       categoryActiveCheckbox.checked = false;
//     }
//   });

//   // Cập nhật danh mục
//   let editIndex = -1;
//   document.getElementById("categoryTableBody").addEventListener("click", function (e) {
//     if (e.target.closest(".edit-btn")) {
//       const code = e.target.closest(".edit-btn").dataset.code;
//       editIndex = categories.findIndex((category) => category.code === code);

//       const category = categories[editIndex];
//       document.getElementById("editCategoryCode").value = category.code;
//       document.getElementById("editCategoryName").value = category.name;
//       document.getElementById("categoryActive").checked = category.status === "active";
//       document.getElementById("categoryInactive").checked = category.status === "inactive";
//     }
//   });

//   const updateCategoryBtn = document.getElementById("updateCategoryBtn");
//   updateCategoryBtn.addEventListener("click", function () {
//     const name = document.getElementById("editCategoryName").value.trim();
//     const active = document.getElementById("categoryActive").checked;
//     const inactive = document.getElementById("categoryInactive").checked;

//     let status = active ? "active" : inactive ? "inactive" : null;

//     // Validate
//     if (!name) {
//       Swal.fire({
//         icon: "error",
//         title: "Lỗi",
//         text: "Tên danh mục không được để trống",
//       });
//       return;
//     }
//     if (!status) {
//       Swal.fire({
//         icon: "error",
//         title: "Lỗi",
//         text: "Vui lòng chọn trạng thái",
//       });
//       return;
//     }

//     categories[editIndex].name = name;
//     categories[editIndex].status = status;
//     localStorage.setItem("categories", JSON.stringify(categories));
//     filteredCategories = [...categories];
//     applyFilters();

//     const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
//     modal.hide();
//     Swal.fire({
//       icon: "success",
//       title: "Cập nhật danh mục thành công!",
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   });

//   // Checkbox logic cho form cập nhật
//   const editCategoryActiveCheckbox = document.getElementById("categoryActive");
//   const editCategoryInactiveCheckbox = document.getElementById("categoryInactive");
//   editCategoryActiveCheckbox.addEventListener("change", function () {
//     if (editCategoryActiveCheckbox.checked) {
//       editCategoryInactiveCheckbox.checked = false;
//     }
//   });
//   editCategoryInactiveCheckbox.addEventListener("change", function () {
//     if (editCategoryInactiveCheckbox.checked) {
//       editCategoryActiveCheckbox.checked = false;
//     }
//   });

//   // Xóa danh mục
//   let deleteIndex = -1;
//   document.getElementById("categoryTableBody").addEventListener("click", function (e) {
//     if (e.target.closest(".delete-btn")) {
//       const code = e.target.closest(".delete-btn").dataset.code;
//       deleteIndex = categories.findIndex((category) => category.code === code);
//     }
//   });

//   const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
//   confirmDeleteBtn.addEventListener("click", function () {
   
//     if (categories[deleteIndex].products && categories[deleteIndex].products.length > 0) {
//       Swal.fire({
//         icon: "error",
//         title: "Lỗi",
//         text: "Danh mục này đang có sản phẩm, không thể xóa.",
//       });
//       return;
//     }

//     categories.splice(deleteIndex, 1);
//     localStorage.setItem("categories", JSON.stringify(categories));
//     filteredCategories = [...categories];
//     applyFilters();

//     const modal = bootstrap.Modal.getInstance(document.getElementById("deleteModal"));
//     modal.hide();
//     Swal.fire({
//       icon: "success",
//       title: "Xóa danh mục thành công!",
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   });

//   renderCategories();
// });

// Lần 3 :
document.addEventListener("DOMContentLoaded", function () {
  let products = JSON.parse(localStorage.getItem("products")) || [
    {
      code: "SP001",
      name: "iPhone 12 Pro",
      price: 12000000,
      quantity: 10,
      discount: 0,
      status: "active",
      createdAt: "2025-04-01T10:00:00",
    },
    {
      code: "SP002",
      name: "Samsung Galaxy X20",
      price: 21000000,
      quantity: 100,
      discount: 5,
      status: "inactive",
      createdAt: "2025-04-02T12:00:00",
    },
    {
      code: "SP003",
      name: "iPhone 8 Plus",
      price: 5000000,
      quantity: 10,
      discount: 0,
      status: "active",
      createdAt: "2025-04-03T14:00:00",
    },
    {
      code: "SP004",
      name: "iPhone 14 Pro max",
      price: 25000000,
      quantity: 20,
      discount: 2,
      status: "inactive",
      createdAt: "2025-04-04T16:00:00",
    },
    {
      code: "SP005",
      name: "Oppx X3",
      price: 2000000,
      quantity: 10,
      discount: 5,
      status: "inactive",
      createdAt: "2025-04-05T18:00:00",
    },
    {
      code: "SP006",
      name: "iPhone 16",
      price: 20000000,
      quantity: 20,
      discount: 3,
      status: "inactive",
      createdAt: "2025-04-06T20:00:00",
    },
    {
      code: "SP007",
      name: "iPhone 7 Plus",
      price: 4000000,
      quantity: 10,
      discount: 4,
      status: "active",
      createdAt: "2025-04-07T22:00:00",
    },
    {
      code: "SP008",
      name: "Samsung S20 Ultra",
      price: 30000000,
      quantity: 15,
      discount: 2,
      status: "inactive",
      createdAt: "2025-04-08T09:00:00",
    },
  ];

  let filteredProducts = [...products];
  const itemsPerPage = 5;
  let currentPage = 1;
  let editIndex = -1;
  let deleteIndex = -1;

  const productTableBody = document.querySelector(".product-table tbody");
  const pagination = document.createElement("div");
  pagination.id = "pagination";
  pagination.className = "pagination";
  document.querySelector(".product-table").after(pagination);
  const statusFilter = document.getElementById("statusFilter");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");

  function renderProducts() {
    productTableBody.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, filteredProducts.length);
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
          product.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động"
        }</span></td>
        <td>
          <button class="edit-btn" data-code="${product.code}" data-bs-toggle="modal" data-bs-target="#addProductModal">
            <img src="../assets/icons/pen.png" alt="Edit" />
          </button>
          <button class="delete-btn" data-code="${product.code}" data-bs-toggle="modal" data-bs-target="#deleteProductModal">
            <img src="../assets/icons/trash.png" alt="Delete" />
          </button>
        </td>
      `;
      productTableBody.appendChild(row);
    });

    renderPagination();
  }

  function renderPagination() {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "←";
    prevBtn.className = "btn btn-light";
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
      pageBtn.className = `btn btn-light ${i === currentPage ? "active" : ""}`;
      pageBtn.addEventListener("click", () => {
        currentPage = i;
        renderProducts();
      });
      pagination.appendChild(pageBtn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "→";
    nextBtn.className = "btn btn-light";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
      }
    });
    pagination.appendChild(nextBtn);
  }

  function applyFilters() {
    filteredProducts = [...products];

    const status = statusFilter.value;
    if (status && status !== "") {
      filteredProducts = filteredProducts.filter((product) => product.status === status);
    }

    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }

    const category = categoryFilter.value;
    if (category) {
      filteredProducts = filteredProducts.filter((product) => product.category === category);
    }

    currentPage = 1;
    renderProducts();
  }

  statusFilter.addEventListener("change", applyFilters);
  searchInput.addEventListener("input", applyFilters);
  categoryFilter.addEventListener("change", applyFilters);

  function loadCategories() {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    categoryFilter.innerHTML = '<option value="">Lọc theo danh mục</option>';
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.code;
      option.textContent = category.name;
      categoryFilter.appendChild(option);
    });
  }

  document.getElementById("addProductForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const code = document.getElementById("productCode").value.trim();
    const name = document.getElementById("productName").value.trim();
    const price = parseFloat(document.getElementById("productPrice").value);
    const quantity = parseInt(document.getElementById("productQuantity").value);
    const discount = parseInt(document.getElementById("productDiscount").value);
    const status = document.getElementById("active").checked ? "active" : "inactive";
    const category = document.getElementById("productCategory").value.trim();
    const image = document.getElementById("img-dashed").value.trim();
    const detail = document.getElementById("detail").value.trim();

    let hasError = false;
    document.getElementById("codeHelp").textContent = "";
    document.getElementById("nameHelp").textContent = "";

    if (!code) {
      document.getElementById("codeHelp").textContent = "Mã sản phẩm không được để trống";
      hasError = true;
    } else if (
      editIndex === -1 &&
      products.some((product) => product.code === code)
    ) {
      document.getElementById("codeHelp").textContent = "Mã sản phẩm đã tồn tại";
      hasError = true;
    }

    if (!name) {
      document.getElementById("nameHelp").textContent = "Tên sản phẩm không được để trống";
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

    if (hasError) return;

    const productData = {
      code,
      name,
      price,
      quantity,
      discount,
      status,
      category,
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

    const modal = bootstrap.Modal.getInstance(document.getElementById("addProductModal"));
    modal.hide();
    e.target.reset();
    editIndex = -1;
    document.querySelector(".modal-title").textContent = "Thêm mới sản phẩm";
  });

  productTableBody.addEventListener("click", function (e) {
    if (e.target.closest(".edit-btn")) {
      const code = e.target.closest(".edit-btn").dataset.code;
      editIndex = products.findIndex((product) => product.code === code);
      const product = products[editIndex];

      document.getElementById("productCode").value = product.code;
      document.getElementById("productName").value = product.name;
      document.getElementById("productPrice").value = product.price;
      document.getElementById("productQuantity").value = product.quantity;
      document.getElementById("productDiscount").value = product.discount;
      document.getElementById("productCategory").value = product.category || "";
      document.getElementById("img-dashed").value = product.image || "";
      document.getElementById("detail").value = product.detail || "";
      document.getElementById(product.status).checked = true;

      document.querySelector(".modal-title").textContent = "Chỉnh sửa sản phẩm";
    }

    if (e.target.closest(".delete-btn")) {
      const code = e.target.closest(".delete-btn").dataset.code;
      deleteIndex = products.findIndex((product) => product.code === code);
      const modal = new bootstrap.Modal(document.getElementById("deleteProductModal"));
      modal.show();
    }
  });

  document.getElementById("confirmDeleteBtn").addEventListener("click", function () {
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

  loadCategories();
  renderProducts();
});