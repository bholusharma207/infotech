// Reusable Dynamic Footer Component for Pointer IT Infotech Organization & Pointer Educational Trust
(function () {
  function initReusableFooter() {
    const footerContainer = document.querySelector('footer') || document.getElementById('site-footer');
    if (!footerContainer) return;

    // Detect if current file is inside the /pages/ directory
    const pathname = window.location.pathname.toLowerCase();
    const isPagesDir = pathname.includes('/pages/');

    const rootPath = isPagesDir ? '../' : '';
    const pagesPath = isPagesDir ? '' : 'pages/';

    const footerHTML = `
      <div class="footer-accent-line"></div>
      <div class="container">
        <div class="footer-grid grid grid-4" style="align-items: start;">
          
          <!-- COLUMN 1: BRAND & SOCIAL -->
          <div class="footer-col" style="text-align: left; display: flex; flex-direction: column; align-items: flex-start;">
            <a href="${rootPath}index.html" class="logo" style="margin-bottom: 1.2rem; display: inline-flex; align-items: center; text-decoration: none;">
              <img src="${rootPath}logoofITpointer.png" alt="Pointer IT Infotech Organization" class="logo-img" style="height: 48px; width: auto; object-fit: contain;">
            </a>
            <p style="color: #94A3B8; font-size: 0.95rem; line-height: 1.7; margin-bottom: 1.5rem; text-align: left; width: 100%; padding: 0; margin-left: 0;">
              Transforming youth into successful IT professionals with premium education, practical skill development, and placement support.
            </p>
            <div class="social-icons" style="display: flex; justify-content: flex-start; align-items: center; gap: 0.65rem; width: 100%; padding: 0; margin: 0;">
              <a href="https://wa.me/917208738300" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="social-wa"><i class="fa-brands fa-whatsapp"></i></a>
              <a href="https://www.instagram.com/pointeritinfo/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-ig"><i class="fa-brands fa-instagram"></i></a>
              <a href="https://www.facebook.com/pointeritinfo" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="social-fb"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="https://www.youtube.com/@pointeritinfo" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="social-yt"><i class="fa-brands fa-youtube"></i></a>
              <a href="https://www.linkedin.com/in/pointer-educational-trust-612aa4353" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-li"><i class="fa-brands fa-linkedin-in"></i></a>
            </div>
          </div>

          <!-- COLUMN 2: QUICK LINKS -->
          <div class="footer-col" style="text-align: left; display: flex; flex-direction: column; align-items: flex-start;">
            <h4 class="footer-col-title">Quick Links</h4>
            <ul class="footer-links" style="padding: 0; margin: 0; list-style: none;">
              <li><a href="${rootPath}index.html"><i class="fa-solid fa-chevron-right"></i> Home</a></li>
              <li><a href="${pagesPath}about.html"><i class="fa-solid fa-chevron-right"></i> About Us</a></li>
              <li><a href="${pagesPath}success.html"><i class="fa-solid fa-chevron-right"></i> Student Success</a></li>
              <li><a href="${pagesPath}trust.html"><i class="fa-solid fa-chevron-right"></i> Pointer Educational Trust</a></li>
              <li><a href="${pagesPath}team.html"><i class="fa-solid fa-chevron-right"></i> Meet The Team</a></li>
              <li><a href="${pagesPath}contact.html"><i class="fa-solid fa-chevron-right"></i> Contact Us</a></li>
              <li><a href="${pagesPath}gallery.html"><i class="fa-solid fa-chevron-right"></i> Gallery</a></li>
              <li><a href="${pagesPath}gallery.html"><i class="fa-solid fa-chevron-right"></i> Visual Highlights</a></li>
            </ul>
          </div>

          <!-- COLUMN 3: SUPPORT & INFO -->
          <div class="footer-col" style="text-align: left; display: flex; flex-direction: column; align-items: flex-start;">
            <h4 class="footer-col-title">Support &amp; Info</h4>
            <ul class="footer-links" style="padding: 0; margin: 0; list-style: none;">
              <li><a href="${pagesPath}donation.html"><i class="fa-solid fa-chevron-right"></i> Make a Donation</a></li>
              <li><a href="${pagesPath}certificate.html"><i class="fa-solid fa-chevron-right"></i> Certificate Portal</a></li>
              <li><a href="${pagesPath}companies.html"><i class="fa-solid fa-chevron-right"></i> For Companies</a></li>
              <li><a href="${pagesPath}about.html"><i class="fa-solid fa-chevron-right"></i> Privacy Policy</a></li>
              <li><a href="${pagesPath}about.html"><i class="fa-solid fa-chevron-right"></i> Terms &amp; Conditions</a></li>
            </ul>
          </div>

          <!-- COLUMN 4: GET IN TOUCH -->
          <div class="footer-col" style="text-align: left; display: flex; flex-direction: column; align-items: flex-start;">
            <h4 class="footer-col-title">Get in Touch</h4>
            <ul class="footer-contact-info" style="padding: 0; margin: 0; list-style: none;">
              <li><i class="fa-solid fa-location-dot"></i> <span>HANDIA, JANGHAI, Prayagraj, UP – 212401</span></li>
              <li style="display: flex; align-items: flex-start; gap: 0.75rem;">
                <i class="fa-solid fa-phone" style="margin-top: 4px; color: #22C55E;"></i> 
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                  <a href="tel:+917208738300" style="color: inherit; text-decoration: none; font-weight: 500;">+91 7208738300</a>
                  <a href="tel:+918874522557" style="color: inherit; text-decoration: none; font-weight: 500;">+91 8874522557</a>
                </div>
              </li>
              <li><i class="fa-solid fa-envelope"></i> <span><a href="mailto:pointeritinfo@gmail.com">pointeritinfo@gmail.com</a></span></li>
              <li><i class="fa-solid fa-clock"></i> <span>Mon - Sat: 9:00 AM - 7:00 PM</span></li>
            </ul>
          </div>

        </div>

        <!-- BOTTOM BAR WITH NON-CLICKABLE TRUST BADGES -->
        <div class="footer-bottom">
          <div>&copy; 2026 Pointer IT Infotech Organization &amp; Pointer Educational Trust. All Rights Reserved. | <a href="/admin/login" style="color: #94A3B8; text-decoration: none; font-size: 0.85rem; transition: color 0.3s;" onmouseover="this.style.color='#22C55E'" onmouseout="this.style.color='#94A3B8'">Admin Login</a></div>
          <div class="footer-bottom-badges">
            <span class="footer-trust-badge"><i class="fa-solid fa-check"></i> 12A Registered</span>
            <span class="footer-trust-badge"><i class="fa-solid fa-check"></i> 80G Tax Exempt</span>
            <span class="footer-trust-badge"><i class="fa-solid fa-check"></i> NGO DARPAN Registered</span>
          </div>
        </div>
      </div>
    `;

    footerContainer.innerHTML = footerHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReusableFooter);
  } else {
    initReusableFooter();
  }
})();
