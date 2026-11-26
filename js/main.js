// Hàm tải danh sách khóa học từ Supabase
async function loadCourses() {
  // Tìm thẻ chứa danh sách khóa học trên trang
  const courseGrid = document.querySelector('.grid-courses');
  if (!courseGrid) return; // Nếu trang không có lưới khóa học thì bỏ qua

  // Lấy dữ liệu từ bảng 'courses'
  const { data: courses, error } = await supabaseClient
    .from('courses')
    .select('*');

  if (error) {
    console.error('Lỗi khi tải khóa học:', error);
    return;
  }

  // Xóa các thẻ HTML tĩnh cũ đi
  courseGrid.innerHTML = '';

  // Duyệt qua từng khóa học trong database và tạo thẻ HTML
  courses.forEach(course => {
    const card = `
      <div class="course-card">
        <img src="${course.image_url}" alt="${course.title}" class="course-img">
        <div class="course-content">
          <h3 class="course-title">${course.title}</h3>
          <p class="course-desc">${course.description}</p>
          <a href="course-detail.html?id=${course.id}" class="btn btn-primary">Xem chi tiết</a>
        </div>
      </div>
    `;
    courseGrid.innerHTML += card;
  });
}

// Chạy hàm này khi trang tải xong
document.addEventListener('DOMContentLoaded', () => {
    // Đợi 1 chút để đảm bảo thư viện Supabase đã tải xong
    setTimeout(loadCourses, 500); 
});