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
        <td>Action</td>
      `;
      tableBody.appendChild(row);
    });
  
    backButton.addEventListener('click', () => {
      window.location.href = 'admin.html';
    });
  });
  