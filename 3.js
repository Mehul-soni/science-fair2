let isLoggedIn = false;
let isFourWheeler = false;
let selectedSignal = '';
let capturedPhotoDataUrl = '';

function login() {
    showPage('vehicleTypePage');
}

function selectVehicleType(isFour) {
    isFourWheeler = isFour;

    if (isFourWheeler) {
        // If the user is in a four-wheeler, proceed to camera access page
        showPage('cameraAccessPage');
        startCamera();
    } else {
        // If not in a four-wheeler, show unauthorized access page
        showPage('unauthorizedAccessPage');
    }
}

function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            const videoElement = document.getElementById('cameraFeed');
            videoElement.srcObject = stream;
        })
        .catch((error) => {
            console.error('Error accessing camera:', error);
        });
}
function downloadPhotoAndProceed() {
    // Create a link element and trigger a download of the captured photo
    const downloadLink = document.createElement('a');
    downloadLink.href = capturedPhotoDataUrl;
    downloadLink.download = 'captured_photo.jpg';
    downloadLink.click();
    // Proceed to the next page
    showPage('selectSignalPage');
}

function capturePhoto() {
    const videoElement = document.getElementById('cameraFeed');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match the video feed
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Draw the current frame from the video onto the canvas
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a data URL representing a JPEG image
    capturedPhotoDataUrl = canvas.toDataURL('image/jpeg');

    // Display the captured photo on the page (you may want to save or send this data)
    const photoContainer = document.getElementById('capturedPhoto');
    photoContainer.innerHTML = `<img src="${capturedPhotoDataUrl}" alt="Captured Photo">`;
}

// function downloadPhoto() {
//     // Create a link element and trigger a download of the captured photo
//     const downloadLink = document.createElement('a');
//     downloadLink.href = capturedPhotoDataUrl;
//     downloadLink.download = 'captured_photo.jpg';
//     downloadLink.click();
// }

function proceedToSignalSelection() {
    showPage('selectSignalPage');
}

function selectSignal(signal) {
    selectedSignal = signal;
    showPage('changeColorPage');
}

function confirmChangeColor(isGreen) {
    if (isGreen) {
        // Display a confirmation pop-up
        const confirmation = confirm(`You have selected to turn ${selectedSignal} signal to GREEN. Proceed?`);
        
        if (confirmation) {
            // Implement traffic signal color change logic here
            console.log(`Changing ${selectedSignal} signal color to green`);

            // Move to the signal green page
            showPage('signalGreenPage');
        }
    } else {
        // Move back to the signal selection page
        showPage('selectSignalPage');
    }
}

function proceedToNextPage() {
    // Move to the next page after turning the signal green
    // You can implement additional logic as needed
    // For now, let's go back to the login page
    showPage('loginPage');
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Show the specified page
    document.getElementById(pageId).style.display = 'block';
}
