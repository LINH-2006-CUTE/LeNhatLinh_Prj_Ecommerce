// Dữ liệu mẫu
let categories = [
    { code: "DM001", name: "Quần áo", status: "inactive" },
    { code: "DM002", name: "Kính mắt", status: "inactive" },
    { code: "DM003", name: "Giày dép", status: "active" },
    { code: "DM004", name: "Thời trang nam", status: "inactive" },
    { code: "DM005", name: "Thời trang nữ", status: "inactive" },
    { code: "DM006", name: "Hoa quả", status: "inactive" },
    { code: "DM007", name: "Rau", status: "active" },
    { code: "DM008", name: "Điện thoại", status: "inactive" }
  ];

  // phân trang
  const itemsPerPage = 3; // Số danh mục mỗi trang
  let currentPage = 1; // Trang hiện tại, mặc định là trang 1
  let totalItems = categories.length; // Tổng số danh mục
  let totalPages = Math.ceil(totalItems / itemsPerPage); // Tổng số trang

  // Hiển thị danh sách danh mục theo trang
  function displayCategories() {
    const tableBody = document.getElementById("categoryTable");
    tableBody.innerHTML = "";

    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    // Hiển thị dữ liệu cho trang hiện tại
    for (let i = startIndex; i < endIndex; i++) {
      const category = categories[i];
      const row = `
        <tr>
          <td>${category.code}</td>
          <td>${category.name}</td>
          <td>
            <span class="${category.status === 'active' ? 'status-active' : 'status-inactive'}">
             ${category.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
            </span>
          </td>
          <td>
            <button class="btn btn-sm btn-danger" onclick="deleteCategory('${category.code}')"><i class="fas fa-trash"></i></button>
            <button class="btn btn-sm btn-warning" onclick="openEditModal('${category.code}')"><i class="fas fa-edit"></i></button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    }

    // Cập nhật phân trang
    updatePagination();
  }

  function updatePagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    // Nút Previous
    pagination.innerHTML += `
      <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changePage(${currentPage - 1}); /a>
      </li>
    `;

    // Các nút số trang
    for (let i = 1; i <= totalPages; i++) {
      pagination.innerHTML += `
        <li class="page-item ${currentPage === i ? 'active' : ''}">
<a class="page-link" href="" onclick="changePage(${i}); 
        </li>
      `;
    }

    // Nút Next
    pagination.innerHTML += `
      <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">»</a>
      </li>
    `;
  }

  // Chuyển trang
  function changePage(page) {
    if (page < 1 || page > totalPages) return; // Không cho phép chuyển trang ngoài phạm vi
    currentPage = page; // Cập nhật trang hiện tại
    displayCategories(); // Hiển thị lại danh sách danh mục
  }

  // Thêm danh mục
  function addCategory() {
    const code = document.getElementById("categoryCode").value;
    const name = document.getElementById("categoryName").value;
    const status = document.getElementById("categoryStatus").value;
  
    categories.push({ code, name, status });
    totalItems = categories.length; 
    totalPages = Math.ceil(totalItems / itemsPerPage); // Cập nhật tổng số trang
    displayCategories();
   
  }

  // Xóa danh mục
  function deleteCategory(code) {
    categories = categories.filter(category => category.code !== code);
    totalItems = categories.length; 
    totalPages = Math.ceil(totalItems / itemsPerPage); 

    if ((currentPage - 1) * itemsPerPage >= categories.length && currentPage > 1) {
      currentPage--;// cho chuyển về trang trước
    }
    displayCategories();
  }

  // xchỉnh sửa
  function openEditModal(code) {
    const category = categories.find(cat => cat.code === code);
    document.getElementById("editCategoryCode").value = category.code;
    document.getElementById("editCategoryName").value = category.name;
    document.getElementById("editCategoryStatus").value = category.status;
    new bootstrap.Modal(document.getElementById("editCategoryModal")).show();
  }

  //danh mục sau khi cập nhật
  function updateCategory() {
    const code = document.getElementById("editCategoryCode").value;
    const name = document.getElementById("editCategoryName").value;
    const status = document.getElementById("editCategoryStatus").value;

    const index = categories.findIndex(cat => cat.code === code);
    categories[index] = { code, name, status };
    displayCategories();
    bootstrap.Modal.getInstance(document.getElementById("editCategoryModal")).hide();
  }
//bước cuối
  displayCategories();