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