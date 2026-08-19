// Navbar scroll shrink
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile hamburger toggle
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks  = document.getElementById('navLinks');

if (mobileBtn && navLinks) {
  mobileBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    mobileBtn.classList.toggle('active', open);
  });

  // Mobile sub-dropdown toggle (tap on items with arrows)
  document.querySelectorAll('.has-dropdown .nav-link').forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        link.closest('.has-dropdown').classList.toggle('open-sub');
      }
    });
  });
}

// Intersection Observer for Animations (Fade Up)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Animate counters if present
          if (entry.target.classList.contains('stats-strip')) {
              animateCounters();
          }
      }
  });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => {
  observer.observe(el);
});

// Number Counter Animation
const animateCounters = () => {
  const counters = document.querySelectorAll('.counter');
  const speed = 200;

  counters.forEach(counter => {
      const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const inc = target / speed;

          if (count < target) {
              counter.innerText = Math.ceil(count + inc);
              setTimeout(updateCount, 15);
          } else {
              counter.innerText = target + (counter.getAttribute('data-plus') ? '+' : '');
          }
      };
      // Only start if it hasn't been started
      if(counter.innerText === "0") {
          updateCount();
      }
  });
};

// Particles (Geometric Shapes in Hero)
const createParticles = () => {
  const container = document.getElementById('particles');
  if(!container) return;
  
  const colors = ['#2563EB', '#06B6D4', '#22C55E'];
  const count = 15;

  for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      
      const size = Math.random() * 20 + 10;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 5;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Mix of circles and squares
      if(Math.random() > 0.5) particle.style.borderRadius = '50%';
      
      particle.style.background = color;
      particle.style.opacity = Math.random() * 0.2 + 0.05;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      
      particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite alternate`;

      container.appendChild(particle);
  }
};

// Inject particle animation keyframes
const style = document.createElement('style');
style.innerHTML = `
@keyframes floatParticle {
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(360deg); }
}
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initTrustCarousels();
});

// Image Manifest for Pointer Educational Trust Page Carousels (All 45 images)
const TRUST_IMAGE_MANIFEST = {
  "our-projects": [
    "../our%20project%20image/1-mv0P3kJzJ2cnxWg8.jpg",
    "../our%20project%20image/2-AR01Z53KKgCG7z8W.jpg",
    "../our%20project%20image/whatsapp-image-2025-08-30-at-19.16.47_477b6d51-AR01Z53ObgT52JZ2.jpg",
    "../our%20project%20image/whatsapp-image-2025-08-30-at-19.16.47_ea90d288-A0xvkojZxofJeepb.jpg",
    "../our%20project%20image/whatsapp-image-2025-08-30-at-19.16.49_7ad7101a-AMqDrV83pDuMw516.jpg",
    "../our%20project%20image/whatsapp-image-2025-08-30-at-19.16.50_5abd85fb-AQEe0QZax5F7ZN0A.jpg",
    "../our%20project%20image/whatsapp-image-2025-08-30-at-19.16.50_d4374dba-AMqDrV8oLxHnBRLX.jpg",
    "../our%20project%20image/whatsapp-image-2025-08-30-at-19.16.50_edef0e3f-d95ZeW4j69F2MxGj%20(1).jpg",
    "../our%20project%20image/whatsapp-image-2025-08-30-at-19.16.50_edef0e3f-d95ZeW4j69F2MxGj.avif",
    "../our%20project%20image/whatsapp-image-2025-08-30-at-19.16.50_edef0e3f-d95ZeW4j69F2MxGj.jpg"
  ],
  "computer-lab": [
    "../Computer%20Lab/WhatsApp%20Image%202026-07-23%20at%2011.59.38%20(1).jpeg",
    "../Computer%20Lab/WhatsApp%20Image%202026-07-23%20at%2011.59.38%20(2).jpeg",
    "../Computer%20Lab/WhatsApp%20Image%202026-07-23%20at%2011.59.39%20(1).jpeg",
    "../Computer%20Lab/WhatsApp%20Image%202026-07-23%20at%2011.59.40%20(1).jpeg",
    "../Computer%20Lab/WhatsApp%20Image%202026-07-23%20at%2011.59.40%20(2).jpeg",
    "../Computer%20Lab/WhatsApp%20Image%202026-07-23%20at%2011.59.40.jpeg",
    "../Computer%20Lab/WhatsApp%20Image%202026-07-23%20at%2011.59.41%20(1).jpeg",
    "../Computer%20Lab/WhatsApp%20Image%202026-07-23%20at%2011.59.42.jpeg"
  ],
  "hardware-lab": [
    "../Hardware%20&%20Networking%20Lab/WhatsApp%20Image%202026-07-23%20at%2009.35.00.jpeg",
    "../Hardware%20&%20Networking%20Lab/WhatsApp%20Image%202026-07-23%20at%2009.35.01.jpeg",
    "../Hardware%20&%20Networking%20Lab/WhatsApp%20Image%202026-07-23%20at%2009.35.25%20(1).jpeg",
    "../Hardware%20&%20Networking%20Lab/WhatsApp%20Image%202026-07-23%20at%2009.35.51%20(2).jpeg",
    "../Hardware%20&%20Networking%20Lab/WhatsApp%20Image%202026-07-23%20at%2009.35.53.jpeg",
    "../Hardware%20&%20Networking%20Lab/WhatsApp%20Image%202026-07-23%20at%2009.35.57%20(1).jpeg",
    "../Hardware%20&%20Networking%20Lab/WhatsApp%20Image%202026-07-23%20at%2009.35.59%20(1).jpeg"
  ],
  "computer-classroom": [
    "../Classroom%20-%20for%20Computer%20Sessions/WhatsApp%20Image%202026-07-23%20at%2009.34.33%20(1).jpeg",
    "../Classroom%20-%20for%20Computer%20Sessions/WhatsApp%20Image%202026-07-23%20at%2009.34.35%20(1).jpeg",
    "../Classroom%20-%20for%20Computer%20Sessions/WhatsApp%20Image%202026-07-23%20at%2009.34.35.jpeg",
    "../Classroom%20-%20for%20Computer%20Sessions/WhatsApp%20Image%202026-07-23%20at%2009.34.36%20(1).jpeg",
    "../Classroom%20-%20for%20Computer%20Sessions/WhatsApp%20Image%202026-07-23%20at%2009.34.36.jpeg",
    "../Classroom%20-%20for%20Computer%20Sessions/WhatsApp%20Image%202026-07-23%20at%2009.34.42.jpeg",
    "../Classroom%20-%20for%20Computer%20Sessions/WhatsApp%20Image%202026-07-23%20at%2009.34.44.jpeg",
    "../Classroom%20-%20for%20Computer%20Sessions/WhatsApp%20Image%202026-07-23%20at%2009.34.53.jpeg"
  ],
  "training-classroom": [
    "../Classroom%20for%20Training%20Classes/WhatsApp%20Image%202026-07-23%20at%2009.34.36.jpeg",
    "../Classroom%20for%20Training%20Classes/WhatsApp%20Image%202026-07-23%20at%2009.34.58.jpeg",
    "../Classroom%20for%20Training%20Classes/WhatsApp%20Image%202026-07-23%20at%2009.35.00.jpeg",
    "../Classroom%20for%20Training%20Classes/WhatsApp%20Image%202026-07-23%20at%2009.35.24%20(1).jpeg",
    "../Classroom%20for%20Training%20Classes/WhatsApp%20Image%202026-07-23%20at%2009.35.25%20(1).jpeg",
    "../Classroom%20for%20Training%20Classes/WhatsApp%20Image%202026-07-23%20at%2009.35.25.jpeg",
    "../Classroom%20for%20Training%20Classes/WhatsApp%20Image%202026-07-23%20at%2009.35.27%20(2).jpeg",
    "../Classroom%20for%20Training%20Classes/WhatsApp%20Image%202026-07-23%20at%2009.35.28%20(2).jpeg",
    "../Classroom%20for%20Training%20Classes/WhatsApp%20Image%202026-07-23%20at%2009.35.47.jpeg",
    "../Classroom%20for%20Training%20Classes/WhatsApp%20Image%202026-07-23%20at%2009.35.48.jpeg",
    "../Classroom%20for%20Training%20Classes/WhatsApp%20Image%202026-07-23%20at%2009.35.49.jpeg",
    "../Classroom%20for%20Training%20Classes/WhatsApp%20Image%202026-07-23%20at%2009.35.59%20(2).jpeg"
  ]
};

// Universal Trust Page Carousel Initializer
const initTrustCarousels = () => {
  const carousels = document.querySelectorAll('.trust-carousel-container');
  
  carousels.forEach(carousel => {
    const category = carousel.getAttribute('data-category');
    const track = carousel.querySelector('.trust-carousel-track');
    const prevBtn = carousel.querySelector('.trust-carousel-btn.prev');
    const nextBtn = carousel.querySelector('.trust-carousel-btn.next');
    const indicatorsContainer = carousel.querySelector('.trust-carousel-indicators');

    if (!track) return;

    // Dynamically populate images from manifest if data-category is present
    if (category && TRUST_IMAGE_MANIFEST[category]) {
      const images = TRUST_IMAGE_MANIFEST[category];
      track.innerHTML = images.map((src, idx) => `
        <div class="trust-carousel-slide">
          <img src="${src}" alt="${category} photo ${idx + 1}" loading="lazy" onerror="this.closest('.trust-carousel-slide')?.remove();">
        </div>
      `).join('');
    }

    let slides = carousel.querySelectorAll('.trust-carousel-slide');
    if (slides.length === 0) return;

    let currentIndex = 0;
    let autoPlayTimer = null;

    // Build indicators dynamically based on valid slides
    const renderIndicators = () => {
      slides = carousel.querySelectorAll('.trust-carousel-slide');
      if (!indicatorsContainer) return;
      indicatorsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('trust-carousel-dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(dot);
      });
    };

    renderIndicators();

    const updateDots = () => {
      if (!indicatorsContainer) return;
      const dots = indicatorsContainer.querySelectorAll('.trust-carousel-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    };

    const goToSlide = (index) => {
      slides = carousel.querySelectorAll('.trust-carousel-slide');
      if (slides.length === 0) return;

      if (index < 0) {
        currentIndex = slides.length - 1;
      } else if (index >= slides.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots();
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetAutoPlay();
      });
    }

    // Auto Play (every 4 seconds)
    const startAutoPlay = () => {
      stopAutoPlay();
      autoPlayTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 4000);
    };

    const stopAutoPlay = () => {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    };

    const resetAutoPlay = () => {
      startAutoPlay();
    };

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    }, { passive: true });

    carousel.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        goToSlide(currentIndex + 1);
      } else if (touchEndX - touchStartX > 50) {
        goToSlide(currentIndex - 1);
      }
      startAutoPlay();
    }, { passive: true });

    startAutoPlay();
  });
};


