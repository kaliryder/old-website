// Event delegation to handle clicks on both images and videos
console.log("additional-media-block: " + document.querySelector('.additional-media-block'))

document.querySelector('.additional-media-block').addEventListener('click', function(event) {
    console.log("click event ocurred");
    // Check if the clicked element is an image
    if (event.target.classList.contains('image-content')) {
        changeMainImage(event.target.src);
        console.log("changeMainImage(" + event.target.src + ") called (image)");
    }
    // Check if the clicked element is a video
    else if (event.target.classList.contains('video-content')) {
        changeMainImage(event.target.querySelector('source').src);
        console.log("changeMainImage(" + event.target.querySelector('source').src + ") called (video)");
    }
});

function changeMainImage(source) {
    const mainContent = document.querySelector('item-block');
    console.log("changeMainImage() called, mainContent = " + mainContent);
    if (mainContent) {
        // Clear the current content
        mainContent.innerHTML = '';
        console.log("emptied mainContent innerHTML : " + mainContent.innerHTML);

        // Determine the type of media and create the element
        if (source.endsWith('.mp4')) {
            const video = document.createElement('video');
            video.controls = true;
            const sourceElem = document.createElement('source');
            sourceElem.src = source;
            sourceElem.type = 'video/mp4';
            video.appendChild(sourceElem);
            mainContent.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = source;
            mainContent.appendChild(img);
        }
    }
}