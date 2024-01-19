const image = document.getElementById("image");
const nameInput = document.getElementById("name");
const img_upload = document.getElementById("img-upload");
let cropper;

//Function for appear spinner
function showSpinner(spinnerId) {
  document.getElementById(spinnerId).style.display = 'inline-block';
}

// Function to hide the spinner
function hideSpinner(spinnerId) {
  document.getElementById(spinnerId).style.display = 'none';
}


//Function for cropping image
img_upload.addEventListener("change", (e) => {
  img_upload.innerText="wait...";
  const selectedFile = img_upload.files[0];
  console.log(selectedFile)

  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = function (e) {
      console.log(e.target.result)
      image.src = e.target.result;
      image.style.display = 'block';

      cropper = new Cropper(image, {
        aspectRatio: 0,
        viewMode: 0,
      });
      document.getElementById("label-btn").style.display = "none";
      document.getElementById("upload-button").style.display = "block";

    };

    reader.readAsDataURL(selectedFile);
  } else {
    image.src = '';
    image.style.display = 'none';
    document.getElementById("label-btn").style.display = "block";
    document.getElementById("upload-button").style.display = "none";
  }
})



//Logic for uploading URl to database and creating image url from cloudinary platform
const button = document.getElementById("upload-button");

button.addEventListener("click", async () => {
  showSpinner('upload-spinner')
  try {
    var croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");

    let myUrl = await image_upload_cloudinary(croppedImage);
    image.src = myUrl.secure_url;

    cropper.destroy();

    const name = nameInput.value;
    if (!name) {
      alert("Please enter a name.");
      return;
    }

    await updateUserData(name, myUrl.secure_url);
  } catch (error) {
    console.error('Upload failed:', error.message);
  } finally {
    hideSpinner('upload-spinner');
  }
})

function openNav() {
  document.getElementById("mySidenav").style.width = "500px";
  document.querySelector(".container").style.opacity = "0.3"
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.querySelector(".container").style.opacity = "1"
}

document.addEventListener('DOMContentLoaded', () => {
  const viewButton = document.getElementById('view');
  const nameSide = document.getElementById('name-side');
  const imageSide = document.getElementById('image-side');
  const statusSide = document.getElementById('status-side');

  viewButton.addEventListener('click', async () => {
    const userId = localStorage.getItem("user");

    try {
      const response = await fetch(`http://localhost:8080/singleUser/${userId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error fetching user data: ${response.statusText}`);
      }

      const userData = await response.json();
      console.log(userData)

      // Updating the UI with user data according to specific needs
      nameSide.innerText = userData.profile.name;
      imageSide.src = userData.profile.photo;
      statusSide.innerText = userData.profile.approvalStatus == "approved" ? "Accepted by Admin" : "Not Accepted by Admin";
      statusSide.style.color = userData.profile.approvalStatus == "approved" ? "green" : "red"

      // Opening the sidebar
      openNav();
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      // Handling error (show a message, etc.)
    }
  });
});



//Function for making URL form cloudinary
async function image_upload_cloudinary(pic) {
  try {
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "Chat-app");
    data.append("cloud_name", "dr9ygmyh3");
    let response = await fetch("https://api.cloudinary.com/v1_1/dr9ygmyh3/image/upload", {
      method: "post",
      body: data,
    });

    res = await response.json();
    return res;
  } catch (error) {
    console.log(error)
  }
}


//Function for updating name and photo
async function updateUserData(name, imageData) {
  try {
    const userId = localStorage.getItem("user");

    const response = await fetch(`http://localhost:8080/user/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        userId,
        name,
        imageData,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error updating user data: ${response.statusText}`);
    }

    const result = await response.json();
    alert(result.message)

  } catch (error) {
    console.error('Error updating user data:', error.message);
  }
}