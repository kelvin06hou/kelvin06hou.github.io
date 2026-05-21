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

  // Select all layout elements that possess the custom data-target attribute
  const travelCards = document.querySelectorAll('.card[data-target]');

  travelCards.forEach(card => {
    // Attach a programmatic redirection event to each card block
    card.addEventListener('click', () => {
      const destinationPage = card.getAttribute('data-target');
      if (destinationPage) {
        window.location.href = destinationPage;
      }
    });
  });


const footerHTML = `
    <div class="footer-content">
      <p>© 2026 Kelvin Ho • Peaceful Travel Storytelling</p>
      
      <div class="footer-socials">
        <!-- Instagram Link Wrapper -->
        <a href="https://www.instagram.com/your_username" target="_blank" class="social-icon-link">
          <img src="image/instagram.png" alt="Instagram" class="social-icon" />
        </a>
        
        <!-- Threads Link Wrapper -->
        <a href="https://www.threads.net/@your_username" target="_blank" class="social-icon-link">
          <img src="image/threads.png" alt="Threads" class="social-icon" />
        </a>
      </div>
    </div>
  `;
  
  let footerElement = document.querySelector("footer");
  if (!footerElement) {
    footerElement = document.createElement("footer");
    document.body.appendChild(footerElement);
  }
  footerElement.innerHTML = footerHTML;


});
