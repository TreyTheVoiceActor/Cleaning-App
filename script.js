// script.js

(function() {
    emailjs.init("-wyt9mSgpdN6z28YS");
  })();

  document.getElementById('cleaning-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (!file) {
      document.getElementById('status').innerText = "Please upload a picture.";
      return;
    }

    emailjs.send("service_2zy89uv", "template_d6p36og", {
        user_email: email,  // Send the email from the form
        file_name: file.name  // Send the file name
    })
    .then(function(response) {
        document.getElementById('status').innerText = "Email sent successfully!";
    }, function(error) {
        console.log("Email sending failed:", error);  // Log error details
        document.getElementById('status').innerText = "Failed to send email.";
    });

})