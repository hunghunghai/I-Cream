// Get the modal
var modal = document.querySelector(".custom-modal");

// Get the button that opens the modal
var btn = document.querySelector("#open-modal-btn");

// Get the <span> element that closes the modal
var span = document.querySelector(".custom-modal-close");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block"; // Hiển thị modal
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.animation = "fadeOut 0.3s ease forwards"; // Thêm animation fade out
  setTimeout(function() {
    modal.style.display = "none"; // Ẩn modal sau khi kết thúc animation
    modal.style.animation = "none"; // Reset animation của modal
  }, 300);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.animation = "fadeOut 0.3s ease forwards"; // Thêm animation fade out
    setTimeout(function() {
      modal.style.display = "none"; // Ẩn modal sau khi kết thúc animation
      modal.style.animation = "none"; // Reset animation của modal
    }, 300);
  }
}
