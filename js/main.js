function showMessage() {
  const message = document.getElementById("message");
  message.classList.toggle("hidden"); 
  if (!message.classList.contains("hidden")) {
    message.textContent = "JavaScript is working! ✅";
  }
}
