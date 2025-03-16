// your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image at ${image.url}`);
    img.src = image.url;
  });
}

function downloadImages() {
  const loadingDiv = document.createElement("div");
  loadingDiv.id = "loading";
  loadingDiv.textContent = "Loading...";
  document.body.appendChild(loadingDiv);

  const downloadPromises = images.map((image) => downloadImage(image));

  Promise.all(downloadPromises)
    .then((downloadedImages) => {
      document.body.removeChild(loadingDiv);
      downloadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      document.body.removeChild(loadingDiv);
      const errorDiv = document.createElement("div");
      errorDiv.id = "error";
      errorDiv.textContent = error;
      document.body.appendChild(errorDiv);
    });
}

btn.addEventListener("click", downloadImages);
