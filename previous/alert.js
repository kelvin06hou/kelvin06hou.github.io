window.onload = function() {
    const saved = localStorage.getItem("myData");
    if (saved) document.getElementById("result").textContent = saved;
};

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    alert('Data saved locally!');
          // Optionally, redirect or clear the form
    });