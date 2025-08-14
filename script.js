document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const contactLinks = document.querySelectorAll('.contact-link');
  const navToggle = document.querySelector('#nav-toggle');
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  // Show section and update active link
  function showSection(sectionId) {
    sections.forEach(section => {
      section.classList.toggle('active', section.id === sectionId);
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
    });
    triggerAnimations(document.getElementById(sectionId));
    if (navToggle.checked) {
      navToggle.checked = false; // Close mobile menu
    }
  }

  // Navigation link click handler
  navLinks.forEach(link => {
    const handleNavClick = (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('href').substring(1);
      showSection(sectionId);
      const targetSection = document.getElementById(sectionId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    };
    link.addEventListener('click', handleNavClick);
    link.addEventListener('touchstart', handleNavClick); // Use touchstart for better mobile responsiveness
  });

  // Contact link click handler for smooth scrolling
  contactLinks.forEach(link => {
    const handleContactClick = (e) => {
      e.preventDefault();
      showSection('contact');
      const contactSection = document.getElementById('contact');
      contactSection.scrollIntoView({ behavior: 'smooth' });
    };
    link.addEventListener('click', handleContactClick);
    link.addEventListener('touchstart', handleContactClick); // Use touchstart for better mobile responsiveness
  });

  // Dark mode toggle
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });

  // Animation observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  function triggerAnimations(section) {
    const elements = section.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));
  }

  // Initialize Home section
  showSection('home');

  // Animated Headline
  const headlines = ['Fullstack Developer', 'AI Enthusiast', 'Problem Solver'];
  let currentHeadline = 0;
  const headlineElement = document.querySelector('.headline-cycle');
  function cycleHeadlines() {
    headlineElement.style.opacity = 0;
    setTimeout(() => {
      headlineElement.textContent = headlines[currentHeadline];
      headlineElement.style.opacity = 1;
      currentHeadline = (currentHeadline + 1) % headlines.length;
    }, 500);
  }
  setInterval(cycleHeadlines, 3000);

  // Animated Counters
  const counterElements = document.querySelectorAll('.counter');
  counterElements.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    let count = 0;
    const increment = Math.ceil(target / 50);
    const updateCounter = () => {
      count += increment;
      if (count > target) count = target;
      counter.textContent = count;
      if (count < target) setTimeout(updateCounter, 50);
    };
    updateCounter();
  });

  // Cursor Effect
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  document.addEventListener('mousemove', e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  document.addEventListener('touchmove', e => {
    const touch = e.touches[0];
    cursor.style.left = `${touch.clientX}px`;
    cursor.style.top = `${touch.clientY}px`;
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    el.addEventListener('touchstart', () => cursor.classList.add('hover'));
    el.addEventListener('touchend', () => cursor.classList.remove('hover'));
  });

  // Fallback for JavaScript-disabled browsers
  document.documentElement.classList.add('js-enabled');
});