document.getElementById('cleaning-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0]; // Get the first file if available

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Image = e.target.result;

            // Send email with the image data
            emailjs.send("service_2zy89uv", "template_d6p36og", {
                user_email: email,
                image_base64: base64Image
            }).then(function(response) {
                document.getElementById('status').innerText = "Email sent successfully!";
            }, function(error) {
                document.getElementById('status').innerText = "Failed to send email.";
            });
        };

        // Read the image file as base64
        reader.readAsDataURL(file);
    } else {
        document.getElementById('status').innerText = "Please upload an image.";
    }
});
