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
    document.querySelector(".container").style.opacity="0.4"
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.querySelector(".container").style.opacity="1"
  }