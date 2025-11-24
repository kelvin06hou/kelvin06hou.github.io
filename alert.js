alert("This is an external JS file!");
function saveData() {
    const value = document.getElementById("userInput").value;

    // store in localStorage
    localStorage.setItem("savedValue", value);

    // display on screen
    document.getElementById("result").textContent = "Saved: " + value;
}

// load saved data when page refreshes
window.onload = function() {
    const storedValue = localStorage.getItem("savedValue");
    if (storedValue) {
        document.getElementById("result").textContent = "Saved: " + storedValue;
    }
};