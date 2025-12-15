(function(){
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS User ID
})();

document.getElementById('emailForm').addEventListener('submit', function(event){
    event.preventDefault();

    const to_email = document.getElementById('to_email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const attachmentFile = document.getElementById('attachment').files[0];

    const reader = new FileReader();

    reader.onload = function(event) {
        const base64Attachment = event.target.result.split(',')[1]; // get base64 content

        const templateParams = {
            to_email: to_email,
            subject: subject,
            message: message,
            attachment: base64Attachment
        };

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                document.getElementById('status').innerText = "Email sent successfully!";
            }, function(error) {
                document.getElementById('status').innerText = "Failed to send email: " + error.text;
            });
    };

    if(attachmentFile){
        reader.readAsDataURL(attachmentFile);
    } else {
        reader.onload({target:{result:','}}); // Send without attachment
    }
});
