document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                window.location.href = 'profile.html';
            } else {
                alert('Login failed');
            }
        });
    }

    const profileInfo = document.getElementById('profileInfo');
    if (profileInfo) {
        const userId = 1; // Replace with dynamic user ID
        fetch(`/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                profileInfo.innerHTML = `
                    <p>Username: ${data.username}</p>
                    <p>Role: ${data.role}</p>
                `;
            });
    }
});
