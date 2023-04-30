const overlay = document.getElementById('overlay');

function showOverlay() {
  overlay.style.display = "block"
  overlay.style.pointerEvents = "auto"
}


function hideOverlay() {
  overlay.style.display = "none"
  overlay.style.pointerEvents = "none"
}

export {showOverlay, hideOverlay}