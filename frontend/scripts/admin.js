document.addEventListener('DOMContentLoaded', () => {
    const userIdInput = document.getElementById('userIdInput');
    const passwordInput = document.getElementById('passwordInput');
    const createButton = document.querySelector('.create-button');

    createButton.addEventListener('click', async () => {
        const adminToken = localStorage.getItem('token');

        const response = await createUser(adminToken, userIdInput.value, passwordInput.value);
        // console.log(response)

        if (response.message === "User account is created successfully") {
            alert('User created successfully!');
        } else {
            console.error('Create user failed:', response.message);
            alert('Create user failed:');
        }
    });

    async function createUser(adminToken, userId, password) {
        try {
            const response = await fetch('http://localhost:8080/api/admin/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': adminToken,
                },
                body: JSON.stringify({ userId, password, role: 'admin' }),
            });

            return response.json();
        } catch (error) {
            console.error('Create user error:', error.message);
            return { message: 'Create user failed' };
        }
    }



    const userId = document.getElementById('userId');
    const userPasswordInput = document.getElementById('userPassword');
    const viewButton = document.querySelector('.userFindButton');
  
    viewButton.addEventListener('click', async () => {
      const adminToken = localStorage.getItem('token');
      const userId1 = userId.value;
      const userId2 = userPasswordInput.value;

      if(userId1=="" || userId2==""){
        return alert("please enter both userId");
      }
  
      const response = await getUsers(adminToken, [userId1, userId2]);
    //   console.log(response);
  
      if (response.users) {
        localStorage.setItem('users', JSON.stringify(response.users));
  
        window.location.href = 'userView.html';
      } else {
        console.error('Get users failed:', response.message);
      }
    });
  
    async function getUsers(adminToken, userIds) {
      try {
        const response = await fetch('http://localhost:8080/api/admin/getUsers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': adminToken,
          },
          body: JSON.stringify({ userIds }),
        });
  
        return response.json();
      } catch (error) {
        console.error('Get users error:', error.message);
        return { message: 'Get users failed' };
      }
    }
});

