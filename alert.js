alert("This is an external JS file!");
function saveData() {
    const value = document.getElementById("userInput").value;
    localStorage.setItem("myData", value);
}

window.onload = function() {
    const saved = localStorage.getItem("myData");
    if (saved) document.getElementById("result").textContent = saved;
};
