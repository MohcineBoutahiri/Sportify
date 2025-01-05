function previewImage() {
    const input = document.getElementById('photoInput');
    const image = document.getElementById('profileImage');
    const file = input.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        image.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    }
}

function removePhoto() {
    document.getElementById('profileImage').src = 'https://via.placeholder.com/120';
}