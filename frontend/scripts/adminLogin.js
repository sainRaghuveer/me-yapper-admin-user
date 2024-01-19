document.addEventListener('DOMContentLoaded', () => {
    const userIdInput = document.getElementById('inputEmail3');
    const passwordInput = document.getElementById('inputPassword3');
    const loginButton = document.querySelector('.btn-primary');
  
    loginButton.addEventListener('click', async () => {
      const response = await login(userIdInput.value, passwordInput.value);
      if (response.token) {
        localStorage.setItem('token', response.token);
  
        if (response.user.role === 'admin') {
          window.location.href = 'admin.html';
        } else if (response.user.role === 'user') {
            alert("You are not authorized here to login");
        }
      } else {
        console.error('Login failed:', response.message);
      }
    });
  
    async function login(userId, password) {
      try {
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, password }),
        });
  
        if (!response.ok) {
          throw new Error('Invalid credentials');
        }
  
        return response.json();
      } catch (error) {
        console.error('Login error:', error.message);
        return { message: 'Login failed' };
      }
    }
  });
  