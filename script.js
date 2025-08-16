document.addEventListener('DOMContentLoaded', () => {
  try {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const contactLinks = document.querySelectorAll('.contact-link');
    const projectLinks = document.querySelectorAll('.project-link');
    const navToggle = document.querySelector('#nav-toggle');
    const navCloseBtn = document.querySelector('.nav-close-btn');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Show section and update active link
    function showSection(sectionId) {
      try {
        console.log(`Navigating to section: ${sectionId}`);
        sections.forEach(section => {
          section.classList.toggle('active', section.id === sectionId);
        });
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
        triggerAnimations(document.getElementById(sectionId));
        if (navToggle && navToggle.checked) {
          console.log('Closing mobile menu');
          navToggle.checked = false;
          document.body.classList.remove('nav-open');
        }
        // Scroll to section
        const targetSection = document.getElementById(sectionId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
      } catch (error) {
        console.error('Error in showSection:', error);
      }
    }

    // Navigation link click handler
    navLinks.forEach(link => {
      const handleNavClick = (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('href').substring(1);
        console.log(`Clicked/touched nav link: ${sectionId}`);
        showSection(sectionId);
      };
      link.addEventListener('click', handleNavClick);
      link.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleNavClick(e);
      }, { passive: false });
    });

    // Contact link click handler
    contactLinks.forEach(link => {
      const handleContactClick = (e) => {
        e.preventDefault();
        console.log('Clicked/touched contact link');
        showSection('contact');
      };
      link.addEventListener('click', handleContactClick);
      link.addEventListener('touchstart', handleContactClick, { passive: false });
    });

    // Project link click handler
    projectLinks.forEach(link => {
      const handleProjectClick = (e) => {
        e.preventDefault();
        console.log('Clicked/touched project link');
        showSection('projects');
      };
      link.addEventListener('click', handleProjectClick);
      link.addEventListener('touchstart', handleProjectClick, { passive: false });
    });

    // Toggle mobile menu visibility
    if (navToggle) {
      navToggle.addEventListener('change', () => {
        console.log(`Menu toggle state: ${navToggle.checked}`);
        document.body.classList.toggle('nav-open', navToggle.checked);
      });
      navToggle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        console.log('Touched hamburger menu');
        navToggle.checked = !navToggle.checked;
        document.body.classList.toggle('nav-open', navToggle.checked);
      }, { passive: false });
    }

    // Close button for mobile menu
    if (navCloseBtn) {
      navCloseBtn.addEventListener('click', () => {
        console.log('Clicked close button');
        navToggle.checked = false;
        document.body.classList.remove('nav-open');
      });
      navCloseBtn.addEventListener('touchstart', () => {
        console.log('Touched close button');
        navToggle.checked = false;
        document.body.classList.remove('nav-open');
      }, { passive: false });
    }

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

    // Enable JavaScript-specific styles
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js-enabled');
  } catch (error) {
    console.error('Error in DOMContentLoaded:', error);
  }
});