const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    link.classList.add('active');
    const sectionId = link.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    if (section) {
      setTimeout(() => {
        section.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        triggerAnimations(section);
      }, 100);
    }
  });
});

document.querySelectorAll('a[data-section]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const targetSection = btn.getAttribute('data-section');
    navLinks.forEach(l => l.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    const newActiveLink = Array.from(navLinks).find(l => l.getAttribute('data-section') === targetSection);
    if (newActiveLink) newActiveLink.classList.add('active');
    const section = document.getElementById(targetSection);
    if (section) {
      setTimeout(() => {
        section.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        triggerAnimations(section);
      }, 100);
    }
  });
});

document.querySelectorAll('a[href="#contact"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  });
});

const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

function triggerAnimations(section) {
  const elements = section.querySelectorAll('.animate-on-scroll');
  elements.forEach(el => observer.observe(el));
}

triggerAnimations(document.getElementById('home'));

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
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});