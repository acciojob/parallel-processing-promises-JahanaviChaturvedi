document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const btn = document.getElementById("download-images-button");

  const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" },
  ];

  function downloadImage(image, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const timer = setTimeout(() => reject(`Timeout: Failed to load image at ${image.url}`), timeout);

      img.onload = () => {
        clearTimeout(timer);
        resolve(img);
      };
      img.onerror = () => {
        clearTimeout(timer);
        reject(`Failed to load image at ${image.url}`);
      };
      img.src = image.url;
    });
  }

  function downloadImages() {
    if (document.getElementById("loading")) return; // Prevent multiple simultaneous clicks

    const loadingDiv = document.createElement("div");
    loadingDiv.id = "loading";
    loadingDiv.textContent = "Loading...";
    document.body.appendChild(loadingDiv);

    const downloadPromises = images.map((image) => downloadImage(image));

    Promise.all(downloadPromises)
      .then((downloadedImages) => {
        downloadedImages.forEach((img) => {
          output.appendChild(img);
        });
      })
      .catch((error) => {
        const errorDiv = document.createElement("div");
        errorDiv.id = "error";
        errorDiv.textContent = error;
        document.body.appendChild(errorDiv);
      })
      .finally(() => {
        // Always remove the loading spinner
        document.body.removeChild(loadingDiv);
      });
  }

  btn.addEventListener("click", downloadImages);
});