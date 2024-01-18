const image = document.getElementById("image");

const cropper = new Cropper(image, {
    aspectRatio:0,
    viewMode:0,
});


const button = document.getElementById("btn");

button.addEventListener("click",()=>{
    var croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");
    console.log(croppedImage)
    let newImage = document.createElement("img");
    newImage.src = croppedImage;

    document.querySelector("body").append(newImage);
})

function openNav() {
    document.getElementById("mySidenav").style.width = "500px";
    document.querySelector(".container").style.opacity="0.3"
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.querySelector(".container").style.opacity="1"
  }

  document.addEventListener('DOMContentLoaded', () => {
    const viewButton = document.getElementById('view');
    const nameSide = document.getElementById('name-side');
    const imageSide = document.getElementById('image-side');
    const statusSide = document.getElementById('status-side');
  
    viewButton.addEventListener('click', async () => {
      const userId = '1234';  // Replace this with the actual user ID
  
      try {
        const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error fetching user data: ${response.statusText}`);
        }
  
        const userData = await response.json();
  
        // Update the UI with user data
        nameSide.textContent = userData.profile.name;
        imageSide.src = userData.profile.photo;
        statusSide.textContent = userData.profile.approvalStatus;
  
        // Open the sidebar
        openNav();
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        // Handle error (show a message, etc.)
      }
    });
  });