// Event delegation to handle clicks on both images and videos
console.log("additional-media-block: ", document.querySelector('.additional-media-block'));

document.querySelector('.additional-media-block').addEventListener('click', function(event) {
    console.log("click event occurred");
    // check if clicked element is an image
    if (event.target.classList.contains('image-content')) {
        changeMainContent(event.target.src);
        console.log("changeMainContent(" + event.target.src + ") called (image)");
    }
    // check if clicked element is a video
    else if (event.target.classList.contains('video-content')) {
        changeMainContent(event.target.querySelector('source').src);
        console.log("changeMainContent(" + event.target.querySelector('source').src + ") called (video)");
    }
    else {
        console.log("clicked element did not match expected media content classes");
    }
});

function changeMainContent(source) {
    const mainContent = document.querySelector('.item-block .content'); // The container for the main image or video
    if (mainContent) {
        // Clear the current content
        mainContent.innerHTML = '';

        // Determine the type of media and create the element
        if (source.endsWith('.mp4')) {
            console.log("source is a video");
            const video = document.createElement('video');
            video.controls = true;
            const sourceElem = document.createElement('source');
            sourceElem.src = source;
            sourceElem.type = 'video/mp4';
            video.appendChild(sourceElem);
            mainContent.appendChild(video);
        } else {
            console.log("source is an image");
            const img = document.createElement('img');
            img.src = source;
            mainContent.appendChild(img);
        }
    } else {
        console.error("Main content container not found");
    }
}