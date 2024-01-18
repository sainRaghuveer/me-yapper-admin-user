document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('back');
    const tableBody = document.querySelector('tbody');
  
    const users = JSON.parse(localStorage.getItem('users'));
  
    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.userId}</td>
        <td>${user.profile.name}</td>
        <td><img src="${user.profile.photo}" alt="User Photo" id="userPhoto"></td>
        <td>
          <button class="approve-button" data-user-id="${user.userId}">Done</button>
          <button class="reject-button" data-user-id="${user.userId}">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  
    tableBody.addEventListener('click', async (event) => {
      if (event.target.classList.contains('approve-button')) {
        const userId = event.target.getAttribute('data-user-id');
        await manageUser(userId, 'approve');
        alert("user status changed to approved")
      }
    });
  
    tableBody.addEventListener('click', async (event) => {
      if (event.target.classList.contains('reject-button')) {
        const userId = event.target.getAttribute('data-user-id');
        removeUserFromLocalStorage(userId);
        event.target.closest('tr').remove();
        await manageUser(userId, 'reject');
      }
    });
  
    backButton.addEventListener('click', () => {
      window.location.href = 'admin.html';
    });
  
    async function manageUser(userId, action) {
      try {
        const adminToken = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/admin/manage', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': adminToken,
          },
          body: JSON.stringify({ userId, action }),
        });
  
        if (!response.ok) {
          throw new Error(`Error managing user: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Manage user error:', error.message);
      }
    }
  
    function removeUserFromLocalStorage(userId) {
      const storedUsers = JSON.parse(localStorage.getItem('users'));
      const updatedUsers = storedUsers.filter(user => user.userId !== userId);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  });
  