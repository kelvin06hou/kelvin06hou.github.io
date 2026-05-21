// navbar-footer.js
document.addEventListener("DOMContentLoaded", () => {
  // 1. Inject the Navigation Header Menu
  const headerHTML = `
    <div class="navbar">
      <div class="logo">
        <h1>Travel Log</h1>
        <p>Memories in journey</p>
      </div>
      <nav>
        <a href="index.html">Home</a>
        <a href="2025-1.html">2025-1</a>
        <a href="2025-12.html">2025-12</a>
      </nav>
    </div>
  `;
  
  // Find or create the header element
  let headerElement = document.querySelector("header");
  if (!headerElement) {
    headerElement = document.createElement("header");
    document.body.insertBefore(headerElement, document.body.firstChild);
  }
  headerElement.innerHTML = headerHTML;

  // 2. Inject the Footer Layout
  const footerHTML = `© 2026 Kelvin Ho • Peaceful Travel Storytelling`;
  
  let footerElement = document.querySelector("footer");
  if (!footerElement) {
    footerElement = document.createElement("footer");
    document.body.appendChild(footerElement);
  }
  footerElement.innerHTML = footerHTML;
  
  const exploreButton = document.querySelector('.btn-dark');
  const galleryButton = document.querySelector('.btn-light');
  
  const exploreSection = document.getElementById('explore');
  const gallerySection = document.getElementById('gallery');

  // 2. Bind smooth scroll behavior to the Explore Button
  if (exploreButton && exploreSection) {
    exploreButton.addEventListener('click', () => {
      exploreSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    });
  }

  // 3. Bind smooth scroll behavior to the Gallery Button
  if (galleryButton && gallerySection) {
    galleryButton.addEventListener('click', () => {
      gallerySection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    });
  }
});
