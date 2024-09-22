document.getElementById('cleaning-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (!file) {
        document.getElementById('status').innerText = "Please upload a file.";
        return;
    }

    const maxFileSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxFileSize) {
        document.getElementById('status').innerText = "File size exceeds 5 MB. Please upload a smaller file.";
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function() {
            const maxWidth = 800;
            const maxHeight = 800;

            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Resize while maintaining aspect ratio
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.floor((height * maxWidth) / width);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.floor((width * maxHeight) / height);
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Convert resized image to base64
            const resizedBase64 = canvas.toDataURL(file.type === 'image/png' ? 'image/jpeg' : file.type, 0.8);

            emailjs.send("your_service_id", "your_template_id", {
                user_email: email,
                image_base64: resizedBase64
            }).then(function(response) {
                document.getElementById('status').innerText = "Email sent successfully!";
            }, function(error) {
                console.error("Email sending failed:", error);
                document.getElementById('status').innerText = "Failed to send email: " + error.text;
            });
        };
    };
    reader.readAsDataURL(file);
});
