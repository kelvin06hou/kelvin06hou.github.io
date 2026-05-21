document.addEventListener("DOMContentLoaded", () => {
  
  // FIX 1: Re-instantiate the missing active document target definition
  // 修正 1：重新宣告遺失的作用中文件目標定義變數
  const currentPage = window.location.pathname.split("/").pop();

  // =========================================================================
  // 1. Inject the Navigation Header Menu / 注入導覽列頂端選單
  // =========================================================================
  if (currentPage !== "under-construction.html" && currentPage !== "index.html") {
    const headerHTML = `
      <div class="navbar">
        <div class="logo">
          <h1>Travel Log</h1>
          <p>Memories in journey</p>
        </div>
        <nav>
          <a href="TravelLog.html">Home</a>
          <a href="2025-1.html">2025-1</a>
          <a href="2025-12.html">2025-12</a>
        </nav>
      </div>
    `;
    
    let headerElement = document.querySelector("header");
    if (!headerElement) {
      headerElement = document.createElement("header");
      document.body.insertBefore(headerElement, document.body.firstChild);
    }
    headerElement.innerHTML = headerHTML;
  } // FIX 2: Correctly isolate the conditional check scope right here!
    // 修正 2：在此處正確隔離條件式檢查的作用域！

  // =========================================================================
  // 2. Inject the Footer Layout with Social Media Icons / 注入含有社群媒體圖標的頁尾版面
  // =========================================================================
  // This section is now freed from the header isolation filter and always executes
  // 此區段現在已從頂端選單的隔離過濾器中釋放，並會始終執行
  const footerHTML = `
    <div class="footer-content">
      <p>© 2026 Kelvin Ho • Peaceful Travel Storytelling</p>
      
      <div class="footer-socials">
        <!-- Instagram Link Wrapper -->
        <a href="https://www.instagram.com/kelvin06hou" target="_blank" class="social-icon-link">
          <img src="image/instagram.png" alt="Instagram" class="social-icon" />
        </a>
        
        <!-- Threads Link Wrapper -->
        <a href="https://www.threads.net/kelvin06hou" target="_blank" class="social-icon-link">
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

  // =========================================================================
  // 3. Bind Smooth Scroll Behavior to Hero Buttons / 綁定主視覺按鈕的平滑捲動行為
  // =========================================================================
  const exploreButton = document.querySelector('.btn-dark');
  const galleryButton = document.querySelector('.btn-light');
  
  const exploreSection = document.getElementById('explore');
  const gallerySection = document.getElementById('gallery');

  if (exploreButton && exploreSection) {
    exploreButton.addEventListener('click', () => {
      exploreSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    });
  }

  if (galleryButton && gallerySection) {
    galleryButton.addEventListener('click', () => {
      gallerySection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    });
  }

  // =========================================================================
  // 4. Programmatic Card Redirection Integration / 整合程式化圖卡重導向
  // =========================================================================
  const travelCards = document.querySelectorAll('.card[data-target]');

  travelCards.forEach(card => {
    card.addEventListener('click', () => {
      const destinationPage = card.getAttribute('data-target');
      if (destinationPage) {
        window.location.href = destinationPage;
      }
    });
  });

});