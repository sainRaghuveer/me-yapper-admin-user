//Function for appear spinner
function showSpinner(spinnerId) {
    document.getElementById(spinnerId).style.display = 'inline-block';
}

// Function to hide the spinner
function hideSpinner(spinnerId) {
    document.getElementById(spinnerId).style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const userIdInput = document.getElementById('userIdInput');
    const passwordInput = document.getElementById('passwordInput');
    const createButton = document.querySelector('.create-button');

    createButton.addEventListener('click', async () => {
        showSpinner("upload-spinner");
        const adminToken = localStorage.getItem('token');

        try {
            await new Promise(resolve => setTimeout(resolve, 50));

            const response = await createUser(adminToken, userIdInput.value, passwordInput.value);

            if (response.message === "User account is created successfully") {
                alert('User created successfully!');
            } else {
                console.error('Create user failed:', response.message);
                alert('Create user failed:');
            }
        } catch (error) {
            console.error('Create user error:', error.message);
            alert('Create user failed:');
        } finally {
            hideSpinner("upload-spinner");
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
});



document.addEventListener('DOMContentLoaded', () => {

    const userId = document.getElementById('userId');
    const userPasswordInput = document.getElementById('userPassword');
    const viewButton = document.querySelector('.userFindButton');

    viewButton.addEventListener('click', async () => {
        const adminToken = localStorage.getItem('token');
        const userId1 = userId.value;
        const userId2 = userPasswordInput.value;

        if (userId1 == "" || userId2 == "") {
            return alert("please enter both userId");
        }
        viewButton.innerText = "wait...";

        const response = await getUsers(adminToken, [userId1, userId2]);

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