// document.addEventListener("DOMContentLoaded", function () {
//     let filteredCategories = JSON.parse(localStorage.getItem("categories")) || [
//       { code: "DM001", name: "Quần áo", status: "active", createdAt: "2025-04-01T10:00:00" },
//       { code: "DM002", name: "Kính mắt", status: "inactive", createdAt: "2025-04-02T12:00:00" },
//       { code: "DM003", name: "Giày dép", status: "active", createdAt: "2025-04-03T14:00:00" },
//       { code: "DM004", name: "Thời trang nam", status: "inactive", createdAt: "2025-04-04T16:00:00" },
//       { code: "DM005", name: "Thời trang nữ", status: "inactive", createdAt: "2025-04-05T18:00:00" },
//       { code: "DM006", name: "Hoa quả", status: "active", createdAt: "2025-04-06T20:00:00" },
//       { code: "DM007", name: "Rau", status: "active", createdAt: "2025-04-07T22:00:00" },
//       { code: "DM008", name: "Điện thoại", status: "inactive", createdAt: "2025-04-08T09:00:00" },
//     ];

  
//     let categories = JSON.parse(localStorage.getItem("categories")) || [];
//     // let filteredCategories = [...categories];
  
//     // Phân trang
//     // const itemsPerPage = 5;
//     // let currentPage = 1;
    
//     const categoryTableBody = document.getElementById("categoryTableBody");
//     const pagination = document.getElementById("pagination");
//     const statusFilter = document.getElementById("statusFilter");
//     const searchInput = document.getElementById("searchInput");
//     const sortOption = document.getElementById("sortOption");
  
//     let itemsPerPage  = 5;
//     let currentPage = 1;

//     // Hàm hiển thị danh sách danh mục
    
//       function renderCategories() {
//         const categoryTableBody = document.getElementById("categoryTableBody");
//         categoryTableBody.innerHTML = "";
      
//         filteredCategories.forEach((category) => {
//           const row = document.createElement("tr");
//           row.innerHTML = `
//             <td>${category.code}</td>
//             <td>${category.name}</td>
//             <td>${new Date(category.createdAt).toLocaleString()}</td>
//             <td>${category.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động"}</td>
            
//            <td>
//               <button class="delete-btn" data-code="${category.code}" data-bs-toggle="modal" data-bs-target="#deleteModal">
//                 <img src="../assets/icons/trash.png" alt="Xóa" />
//               </button>
//               <button class="edit-btn" data-code="${category.code}" data-bs-toggle="modal" data-bs-target="#editModal">
//                 <img src="../assets/icons/pen.png" alt="Sửa" />
//               </button>
//             </td>
//           `;
//           categoryTableBody.appendChild(row);
//         });
//       }

//       // let filteredCategories = JSON.parse(localStorage.getItem("categories")) || []

//       const start = (currentPage  - 1) * itemsPerPage ;
//       const end = start + itemsPerPage  ;
//       const paginatedCategories = filteredCategories.slice(start, end);
  
//       categoryTableBody.innerHTML = "";
//       paginatedCategories.forEach((category) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//           <td>${category.code}</td>
//           <td>${category.name}</td>
//           <td>${new Date(category.createdAt).toLocaleString()}</td>
//           <td><span class="status ${category.status}">${
//             category.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động"
//           }</span></td>
//           <td>
//             <button class="delete-btn" data-code="${category.code}" data-bs-toggle="modal" data-bs-target="#deleteModal">
//               <img src="../assets/icons/trash.png" alt="Delete" />
//             </button>
//             <button class="edit-btn" data-code="${category.code}" data-bs-toggle="modal" data-bs-target="#editModal">
//               <img src="../assets/icons/pen.png" alt="Edit" />
//             </button>
//           </td>
//         `;
//         categoryTableBody.appendChild(row);
//       });
  
//       renderPagination();
    
  
//     // Hàm hiển thị phân trang
//     function renderPagination() {
//       const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
//       pagination.innerHTML = "";
  
//       // Nút Previous
//       const prevBtn = document.createElement("button");
//       prevBtn.textContent = "←";
//       prevBtn.disabled = currentPage === 1;
//       prevBtn.addEventListener("click", () => {
//         if (currentPage > 1) {
//           currentPage--;
//           renderCategories();
//         }
//       });
//       pagination.appendChild(prevBtn);
  
//       // Các nút số trang
//       for (let i = 1; i <= totalPages; i++) {
//         const pageBtn = document.createElement("button");
//         pageBtn.textContent = i;
//         pageBtn.classList.toggle("active", i === currentPage);
//         pageBtn.addEventListener("click", () => {
//           currentPage = i;
//           renderCategories();
//         });
//         pagination.appendChild(pageBtn);
//       }
  
//       // Nút Next
//       const nextBtn = document.createElement("button");
//       nextBtn.textContent = "→";
//       nextBtn.disabled = currentPage === totalPages;
//       nextBtn.addEventListener("click", () => {
//         if (currentPage < totalPages) {
//           currentPage++;
//           renderCategories();
//         }
//       });
//       pagination.appendChild(nextBtn);
//     }
  
//     // Hàm lọc, tìm kiếm và sắp xếp
//     function applyFilters() {
//       let tempCategories = [...filteredCategories];
  
//       // Lọc theo trạng thái
//       const status = statusFilter.value;
//       if (status) {
//         tempCategories = tempCategories.filter((category) => category.status === status);
//       }
  
//       // Tìm kiếm theo tên
//       const searchTerm = searchInput.value.trim().toLowerCase();
//       if (searchTerm) {
//         tempCategories = tempCategories.filter((category) =>
//           category.name.toLowerCase().includes(searchTerm)
//         );
//       }
  
//       // Sắp xếp
//       const sortValue = sortOption.value;
//       if (sortValue === "name-asc") {
//         tempCategories.sort((a, b) => a.name.localeCompare(b.name));
//       } else if (sortValue === "name-desc") {
//         tempCategories.sort((a, b) => b.name.localeCompare(a.name));
//       } else if (sortValue === "date-asc") {
//         tempCategories.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//       } else if (sortValue === "date-desc") {
//         tempCategories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       }
  
//       filteredCategories = tempCategories;
//       currentPage = 1; // Reset về trang đầu tiên
//       renderCategories();
//     }
  
//     // Sự kiện lọc, tìm kiếm và sắp xếp
//     statusFilter.addEventListener("change", applyFilters);
//     searchInput.addEventListener("input", applyFilters);
//     sortOption.addEventListener("change", applyFilters);
  
//     // Thêm danh mục mới
//     document.getElementById("addCategoryBtn").addEventListener("click", function () {
//       const code = document.getElementById("categoryCode").value.trim();
//       const name = document.getElementById("categoryName").value.trim();
//       const status = document.getElementById("categoryStatus").checked ? "active" : "inactive";
  
//       // Validate 
//       let hasError = false;
//       document.getElementById("codeHelp").textContent = "";
//       document.getElementById("nameHelp").textContent = "";
  
//       if (!code) {
//         document.getElementById("codeHelp").textContent = "Mã danh mục không được để trống";
//         hasError = true;
//       } else if (filteredCategories.some((categories) => categories.code === code)) {
//         document.getElementById("codeHelp").textContent = "Mã danh mục đã tồn tại";
//         hasError = true;
//       }
  
//       if (!name) {
//         document.getElementById("nameHelp").textContent = "Tên danh mục không được để trống";
//         hasError = true;
//       }
  
//       if (hasError) return;
  
//       // Thêm danh mục
//       const newCategory = {
//         code,
//         name,
//         status,
//         createdAt: new Date().toISOString(),
//       };


//       // categories.push(newCategory);
//       localStorage.setItem("categories", JSON.stringify(categories));
//       filteredCategories = [...categories];
//       applyFilters();
  
//       // Đóng modal 
//       const modal = bootstrap.Modal.getInstance(document.getElementById("myModal"));
//       modal.hide();
//       Swal.fire({
//         icon: "success",
//         title: "Thêm danh mục thành công!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
  
//       // Reset 
//       document.getElementById("addCategoryForm").reset();
//       document.getElementById("categoryStatus").checked = true;
//     });
  
//     // Cập nhật danh mục
//     let categoryToEdit = null;
//     categoryTableBody.addEventListener("click", function (edit) {
//       if (edit.target.closest(".edit-btn")) {
//         const code = edit.target.closest(".edit-btn").dataset.code;
//         categoryToEdit = categories.find((category) => category.code === code);
  
//         document.getElementById("editCategoryCode").value = categoryToEdit.code;
//         document.getElementById("editCategoryName").value = categoryToEdit.name;
//         document.getElementById("editCategoryStatus").checked = categoryToEdit.status === "active";
//       }
//     });
  
//     document.getElementById("updateCategoryBtn").addEventListener("click", function () {
//       const name = document.getElementById("editCategoryName").value.trim();
//       const status = document.getElementById("editCategoryStatus").checked ? "active" : "inactive";
  
//       // Validate
//       if (!name) {
//         document.getElementById("editNameHelp").textContent = "Tên danh mục không được để trống";
//         return;
//       }
  
//       // Cập nhật danh mục
//       categoryToEdit.name = name;
//       categoryToEdit.status = status;
//       localStorage.setItem("categories", JSON.stringify(categories));
//       filteredCategories = [...categories];
//       applyFilters();
  
//       // Đóng modal và thông báo
//       const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
//       modal.hide();
//       Swal.fire({
//         icon: "success",
//         title: "Cập nhật danh mục thành công!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     });
  
//     // Xóa danh mục
//     let categoryToDelete = null;
//     categoryTableBody.addEventListener("click", function (element) {
//       if (event.target.closest(".delete-btn")) {
//         const code = element.target.closest(".delete-btn").dataset.code;
//         categoryToDelete = code;
//       }
//     });
  

//     document.getElementById("confirmDeleteBtn").addEventListener("click", function () {
//       filteredCategories = filteredCategories.filter((category) => category.code !== categoryToDelete);
//       localStorage.setItem("categories", JSON.stringify(filteredCategories));
//       filteredCategories = [...filteredCategories];
//       applyFilters();
      
  
//       // Đóng modal và thông báo
//       const modal = bootstrap.Modal.getInstance(document.getElementById("deleteModal"));
//       modal.hide();
//       Swal.fire({
//         icon: "success",
//         title: "Xóa danh mục thành công!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     });
  
//     renderCategories();
//   });



// PAGE 2:
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

  const categoryTableBody = document.getElementById("categoryTableBody");
  const pagination = document.getElementById("pagination");
  const statusFilter = document.getElementById("statusFilter");
  const searchInput = document.getElementById("searchInput");
  const sortOption = document.getElementById("sortOption");

  let itemsPerPage = 5;
  let currentPage = 1;

  // Đồng bộ hai checkbox trong modal "Thêm mới"
  const categoryActiveCheckbox = document.getElementById("categoryActive");
  const categoryInactiveCheckbox = document.getElementById("categoryInactive");
  categoryActiveCheckbox.addEventListener("change", function () {
      if (this.checked) categoryInactiveCheckbox.checked = false;
  });
  categoryInactiveCheckbox.addEventListener("change", function () {
      if (this.checked) categoryActiveCheckbox.checked = false;
  });

  // Đồng bộ hai checkbox trong modal "Cập nhật"
  const editCategoryActiveCheckbox = document.getElementById("editCategoryActive");
  const editCategoryInactiveCheckbox = document.getElementById("editCategoryInactive");
  editCategoryActiveCheckbox.addEventListener("change", function () {
      if (this.checked) editCategoryInactiveCheckbox.checked = false;
  });
  editCategoryInactiveCheckbox.addEventListener("change", function () {
      if (this.checked) editCategoryActiveCheckbox.checked = false;
  });

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
              <td><span class="status ${category.status}">${category.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động"}</span></td>
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
      let tempCategories = [...categories];

      const status = statusFilter.value;
      if (status) {
          tempCategories = tempCategories.filter((category) => category.status === status);
      }

      const searchTerm = searchInput.value.trim().toLowerCase();
      if (searchTerm) {
          tempCategories = tempCategories.filter((category) =>
              category.name.toLowerCase().includes(searchTerm)
          );
      }

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
      currentPage = 1;
      renderCategories();
  }

  statusFilter.addEventListener("change", applyFilters);
  searchInput.addEventListener("input", applyFilters);
  sortOption.addEventListener("change", applyFilters);

  // Thêm danh mục mới
  document.getElementById("addCategoryBtn").addEventListener("click", function () {
      const code = document.getElementById("categoryCode").value.trim();
      const name = document.getElementById("categoryName").value.trim();
      const status = categoryActiveCheckbox.checked ? "active" : "inactive";

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
      }

      if (!categoryActiveCheckbox.checked && !categoryInactiveCheckbox.checked) {
          document.getElementById("nameHelp").textContent = "Vui lòng chọn một trạng thái";
          hasError = true;
      }

      if (hasError) return;

      const newCategory = { code, name, status, createdAt: new Date().toISOString() };
      categories.push(newCategory);
      localStorage.setItem("categories", JSON.stringify(categories));
      applyFilters();

      const modal = bootstrap.Modal.getInstance(document.getElementById("myModal"));
      modal.hide();
      Swal.fire({
          icon: "success",
          title: "Thêm danh mục thành công!",
          showConfirmButton: false,
          timer: 1500,
      });

      document.getElementById("addCategoryForm").reset();
      categoryActiveCheckbox.checked = true; // Mặc định "Đang hoạt động" sau khi reset
      categoryInactiveCheckbox.checked = false;
  });

  // Cập nhật danh mục
  let categoryToEdit = null;
  categoryTableBody.addEventListener("click", function (event) {
      if (event.target.closest(".edit-btn")) {
          const code = event.target.closest(".edit-btn").dataset.code;
          categoryToEdit = categories.find((category) => category.code === code);

          document.getElementById("editCategoryCode").value = categoryToEdit.code;
          document.getElementById("editCategoryName").value = categoryToEdit.name;
          editCategoryActiveCheckbox.checked = categoryToEdit.status === "active";
          editCategoryInactiveCheckbox.checked = categoryToEdit.status === "inactive";
      }
  });

  document.getElementById("updateCategoryBtn").addEventListener("click", function () {
      const name = document.getElementById("editCategoryName").value.trim();
      const status = editCategoryActiveCheckbox.checked ? "active" : "inactive";

      let hasError = false;
      document.getElementById("editNameHelp").textContent = "";

      if (!name) {
          document.getElementById("editNameHelp").textContent = "Tên danh mục không được để trống";
          hasError = true;
      }

      if (!editCategoryActiveCheckbox.checked && !editCategoryInactiveCheckbox.checked) {
          document.getElementById("editNameHelp").textContent = "Vui lòng chọn một trạng thái";
          hasError = true;
      }

      if (hasError) return;

      categoryToEdit.name = name;
      categoryToEdit.status = status;
      localStorage.setItem("categories", JSON.stringify(categories));
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

  // Xóa danh mục
  let categoryToDelete = null;
  categoryTableBody.addEventListener("click", function (event) {
      if (event.target.closest(".delete-btn")) {
          categoryToDelete = event.target.closest(".delete-btn").dataset.code;
      }
  });

  document.getElementById("confirmDeleteBtn").addEventListener("click", function () {
      if (categoryToDelete) {
          categories = categories.filter((category) => category.code !== categoryToDelete);
          localStorage.setItem("categories", JSON.stringify(categories));
          applyFilters();

          const modal = bootstrap.Modal.getInstance(document.getElementById("deleteModal"));
          modal.hide();
          Swal.fire({
              icon: "success",
              title: "Xóa danh mục thành công!",
              showConfirmButton: false,
              timer: 1500,
          });
      }
  });

  renderCategories();
});

// PGE 3:
// document.addEventListener("DOMContentLoaded", function () {
//   let categories = JSON.parse(localStorage.getItem("categories")) || [
//       { code: "DM001", name: "Quần áo", status: "active", createdAt: "2025-04-01T10:00:00" },
//       { code: "DM002", name: "Kính mắt", status: "inactive", createdAt: "2025-04-02T12:00:00" },
//       { code: "DM003", name: "Giày dép", status: "active", createdAt: "2025-04-03T14:00:00" },
//       { code: "DM004", name: "Thời trang nam", status: "inactive", createdAt: "2025-04-04T16:00:00" },
//       { code: "DM005", name: "Thời trang nữ", status: "inactive", createdAt: "2025-04-05T18:00:00" },
//       { code: "DM006", name: "Hoa quả", status: "active", createdAt: "2025-04-06T20:00:00" },
//       { code: "DM007", name: "Rau", status: "active", createdAt: "2025-04-07T22:00:00" },
//       { code: "DM008", name: "Điện thoại", status: "inactive", createdAt: "2025-04-08T09:00:00" },
//   ];
//   let filteredCategories = [...categories];

//   const categoryTableBody = document.getElementById("categoryTableBody");
//   const pagination = document.getElementById("pagination");
//   const statusFilter = document.getElementById("statusFilter");
//   const searchInput = document.getElementById("searchInput");
//   const sortOption = document.getElementById("sortOption");

//   let itemsPerPage = 5;
//   let currentPage = 1;

//   // Đồng bộ hai checkbox trong modal "Thêm mới"
//   const categoryActiveCheckbox = document.getElementById("categoryActive");
//   const categoryInactiveCheckbox = document.getElementById("categoryInactive");
//   categoryActiveCheckbox.addEventListener("change", function () {
//       if (this.checked) categoryInactiveCheckbox.checked = false;
//   });
//   categoryInactiveCheckbox.addEventListener("change", function () {
//       if (this.checked) categoryActiveCheckbox.checked = false;
//   });

//   // Đồng bộ hai checkbox trong modal "Cập nhật"
//   const editCategoryActiveCheckbox = document.getElementById("editCategoryActive");
//   const editCategoryInactiveCheckbox = document.getElementById("editCategoryInactive");
//   editCategoryActiveCheckbox.addEventListener("change", function () {
//       if (this.checked) editCategoryInactiveCheckbox.checked = false;
//   });
//   editCategoryInactiveCheckbox.addEventListener("change", function () {
//       if (this.checked) editCategoryActiveCheckbox.checked = false;
//   });

//   function renderCategories() {
//       const start = (currentPage - 1) * itemsPerPage;
//       const end = start + itemsPerPage;
//       const paginatedCategories = filteredCategories.slice(start, end);

//       categoryTableBody.innerHTML = "";
//       paginatedCategories.forEach((category) => {
//           const row = document.createElement("tr");
//           row.innerHTML = `
//               <td>${category.code}</td>
//               <td>${category.name}</td>
//               <td>${new Date(category.createdAt).toLocaleString()}</td>
//               <td><span class="status ${category.status}">${category.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động"}</span></td>
//               <td>
//                   <button class="delete-btn" data-code="${category.code}" data-bs-toggle="modal" data-bs-target="#deleteModal">
//                       <img src="../assets/icons/trash.png" alt="Xóa" />
//                   </button>
//                   <button class="edit-btn" data-code="${category.code}" data-bs-toggle="modal" data-bs-target="#editModal">
//                       <img src="../assets/icons/pen.png" alt="Sửa" />
//                   </button>
//               </td>
//           `;
//           categoryTableBody.appendChild(row);
//       });

//       renderPagination();
//   }

//   function renderPagination() {
//       const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
//       pagination.innerHTML = "";

//       const prevBtn = document.createElement("button");
//       prevBtn.textContent = "←";
//       prevBtn.disabled = currentPage === 1;
//       prevBtn.addEventListener("click", () => {
//           if (currentPage > 1) {
//               currentPage--;
//               renderCategories();
//           }
//       });
//       pagination.appendChild(prevBtn);

//       for (let i = 1; i <= totalPages; i++) {
//           const pageBtn = document.createElement("button");
//           pageBtn.textContent = i;
//           pageBtn.classList.toggle("active", i === currentPage);
//           pageBtn.addEventListener("click", () => {
//               currentPage = i;
//               renderCategories();
//           });
//           pagination.appendChild(pageBtn);
//       }

//       const nextBtn = document.createElement("button");
//       nextBtn.textContent = "→";
//       nextBtn.disabled = currentPage === totalPages;
//       nextBtn.addEventListener("click", () => {
//           if (currentPage < totalPages) {
//               currentPage++;
//               renderCategories();
//           }
//       });
//       pagination.appendChild(nextBtn);
//   }

//   function applyFilters() {
//       let tempCategories = [...categories];

//       const status = statusFilter.value;
//       if (status) {
//           tempCategories = tempCategories.filter((category) => category.status === status);
//       }

//       const searchTerm = searchInput.value.trim().toLowerCase();
//       if (searchTerm) {
//           tempCategories = tempCategories.filter((category) =>
//               category.name.toLowerCase().includes(searchTerm)
//           );
//       }

//       const sortValue = sortOption.value;
//       if (sortValue === "name-asc") {
//           tempCategories.sort((a, b) => a.name.localeCompare(b.name));
//       } else if (sortValue === "name-desc") {
//           tempCategories.sort((a, b) => b.name.localeCompare(a.name));
//       } else if (sortValue === "date-asc") {
//           tempCategories.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//       } else if (sortValue === "date-desc") {
//           tempCategories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       }

//       filteredCategories = tempCategories;
//       currentPage = 1;
//       renderCategories();
//   }

//   statusFilter.addEventListener("change", applyFilters);
//   searchInput.addEventListener("input", applyFilters);
//   sortOption.addEventListener("change", applyFilters);

//   // Thêm danh mục mới
//   document.getElementById("addCategoryBtn").addEventListener("click", function () {
//       const code = document.getElementById("categoryCode").value.trim();
//       const name = document.getElementById("categoryName").value.trim();
//       const status = categoryActiveCheckbox.checked ? "active" : "inactive";

//       let hasError = false;
//       document.getElementById("codeHelp").textContent = "";
//       document.getElementById("nameHelp").textContent = "";

//       if (!code) {
//           document.getElementById("codeHelp").textContent = "Mã danh mục không được để trống";
//           hasError = true;
//       } else if (categories.some((category) => category.code === code)) {
//           document.getElementById("codeHelp").textContent = "Mã danh mục đã tồn tại";
//           hasError = true;
//       }

//       if (!name) {
//           document.getElementById("nameHelp").textContent = "Tên danh mục không được để trống";
//           hasError = true;
//       }

//       if (!categoryActiveCheckbox.checked && !categoryInactiveCheckbox.checked) {
//           document.getElementById("nameHelp").textContent = "Vui lòng chọn một trạng thái";
//           hasError = true;
//       }

//       if (hasError) return;

//       const newCategory = { code, name, status, createdAt: new Date().toISOString() };
//       categories.push(newCategory);
//       localStorage.setItem("categories", JSON.stringify(categories));
//       applyFilters();

//       const modal = bootstrap.Modal.getInstance(document.getElementById("myModal"));
//       modal.hide();
//       Swal.fire({
//           icon: "success",
//           title: "Thêm danh mục thành công!",
//           showConfirmButton: false,
//           timer: 1500,
//       });

//       document.getElementById("addCategoryForm").reset();
//       categoryActiveCheckbox.checked = true; // Mặc định "Đang hoạt động" sau khi reset
//       categoryInactiveCheckbox.checked = false;
//   });

//   // Cập nhật danh mục
//   let categoryToEdit = null;
//   categoryTableBody.addEventListener("click", function (event) {
//       if (event.target.closest(".edit-btn")) {
//           const code = event.target.closest(".edit-btn").dataset.code;
//           categoryToEdit = categories.find((category) => category.code === code);

//           document.getElementById("editCategoryCode").value = categoryToEdit.code;
//           document.getElementById("editCategoryName").value = categoryToEdit.name;
//           editCategoryActiveCheckbox.checked = categoryToEdit.status === "active";
//           editCategoryInactiveCheckbox.checked = categoryToEdit.status === "inactive";
//       }
//   });

//   document.getElementById("updateCategoryBtn").addEventListener("click", function () {
//       const name = document.getElementById("editCategoryName").value.trim();
//       const status = editCategoryActiveCheckbox.checked ? "active" : "inactive";

//       if (!name) {
//           document.getElementById("editNameHelp").textContent = "Tên danh mục không được để trống";
//           return;
//       }

//       if (!editCategoryActiveCheckbox.checked && !editCategoryInactiveCheckbox.checked) {
//           document.getElementById("editNameHelp").textContent = "Vui lòng chọn một trạng thái";
//           return;
//       }

//       categoryToEdit.name = name;
//       categoryToEdit.status = status;
//       localStorage.setItem("categories", JSON.stringify(categories));
//       applyFilters();

//       const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
//       modal.hide();
//       Swal.fire({
//           icon: "success",
//           title: "Cập nhật danh mục thành công!",
//           showConfirmButton: false,
//           timer: 1500,
//       });
//   });

//   // Xóa danh mục
//   let categoryToDelete = null;
//   categoryTableBody.addEventListener("click", function (event) {
//       if (event.target.closest(".delete-btn")) {
//           categoryToDelete = event.target.closest(".delete-btn").dataset.code;
//       }
//   });

//   document.getElementById("confirmDeleteBtn").addEventListener("click", function () {
//       if (categoryToDelete) {
//           categories = categories.filter((category) => category.code !== categoryToDelete);
//           localStorage.setItem("categories", JSON.stringify(categories));
//           applyFilters();

//           const modal = bootstrap.Modal.getInstance(document.getElementById("deleteModal"));
//           modal.hide();
//           Swal.fire({
//               icon: "success",
//               title: "Xóa danh mục thành công!",
//               showConfirmButton: false,
//               timer: 1500,
//           });
//       }
//   });

//   renderCategories();
// });