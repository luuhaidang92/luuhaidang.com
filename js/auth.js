document.addEventListener('DOMContentLoaded', () => {
    // 1. Xử lý Đăng ký
    const registerForm = document.querySelector('#register-form form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            
            const fullName = registerForm.querySelector('input[type="text"]').value;
            const email = registerForm.querySelector('input[type="email"]').value;
            const password = registerForm.querySelector('input[type="password"]').value;

            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: password,
                options: { data: { full_name: fullName } }
            });

            if (error) {
                alert('Lỗi đăng ký: ' + error.message);
            } else {
                alert('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
                // Chuyển về form đăng nhập
                document.querySelectorAll('.form-container').forEach(el => el.classList.remove('active'));
                document.getElementById('login-form').classList.add('active');
            }
        });
    }

    // 2. Xử lý Đăng nhập
    const loginForm = document.querySelector('#login-form form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                alert('Đăng nhập thất bại: ' + error.message);
            } else {
                alert('Đăng nhập thành công!');
                window.location.href = 'dashboard.html'; 
            }
        });
    }
});