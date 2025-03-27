//your JS code here. If required.document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("DOMContentLoaded", function () {
    const output = document.getElementById("output");
    const loadingDiv = document.createElement("div");
    loadingDiv.id = "loading";
    loadingDiv.innerText = "Loading...";
    loadingDiv.style.display = "none"; // Initially hidden
    output.appendChild(loadingDiv);

    const errorDiv = document.createElement("div");
    errorDiv.id = "error";
    errorDiv.style.color = "red";
    output.appendChild(errorDiv);

    const images = [
        { url: "https://picsum.photos/id/237/200/300" },
        { url: "https://picsum.photos/id/238/200/300" },
        { url: "https://picsum.photos/id/239/200/300" }
    ];
    function downloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(img); 
				img.onerror = () => reject(`Failed to load image: ${url}`); 
        });
    }
    async function downloadImages() {
        errorDiv.innerText = ""; 
        output.innerHTML = ""; 
        output.appendChild(loadingDiv);
        loadingDiv.style.display = "block"; 

        try {
            const imagePromises = images.map(image => downloadImage(image.url));
            const loadedImages = await Promise.all(imagePromises); 
            loadingDiv.style.display = "none"; 
            loadedImages.forEach(img => output.appendChild(img));
        } catch (error) {
            loadingDiv.style.display = "none"; 
            errorDiv.innerText = error; 
        }
    }
    const btn = document.createElement("button");
    btn.id = "download-images-button";
    btn.innerText = "Download Images";
    btn.addEventListener("click", downloadImages);
    output.appendChild(btn);
});
