document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                await axios.post('/api/users/login', { username, password });
                window.location.href = '/profile';
            } catch (error) {
                console.error('Login failed', error);
            }
        });
    }

    if (window.location.pathname === '/profile') {
        (async () => {
            try {
                const response = await axios.get('/api/users/profile');
                document.getElementById('username').textContent = response.data.username;
                document.getElementById('email').textContent = response.data.email;
            } catch (error) {
                console.error('Failed to fetch profile', error);
            }
        })();
    }

  if (document.getElementById('registerForm')) {
              document.getElementById('registerForm').addEventListener('submit', async (e) => {
                  e.preventDefault();

                  const user = {
                       name : document.getElementById('first_name'+'last_name').value,
                      username: document.getElementById('username').value,
                      password: document.getElementById('password').value,
                      email: document.getElementById('email').value,

                  };

                  try {
                      const response = await axios.post('/users/registro', user);
                      window.location.href = '/users/login'; // Redirect to login page after successful registration
                  } catch (error) {
                      console.error('Registration failed', error);
                  }
              });
          }

        if (document.getElementById('loginForm')) {
            document.getElementById('loginForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                try {
                    await axios.post('/api/users/login', { username, password });
                    window.location.href = '/profile';
                } catch (error) {
                    console.error('Login failed', error);
                }
            });
        }

        if (window.location.pathname === '/profile') {
            (async () => {
                try {
                    const response = await axios.get('/api/users/profile');
                    document.getElementById('username').textContent = response.data.username;
                    document.getElementById('email').textContent = response.data.email;
                } catch (error) {
                    console.error('Failed to fetch profile', error);
                }
            })();
        }
});
