
// Handle navbar clicks to switch visible sections
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    // Remove active from all links & sections
    navLinks.forEach(l => l.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    // Add active to clicked link
    link.classList.add('active');

    // Show corresponding section
    const sectionId = link.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    if (section) {
      section.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll up
    }
  });
});

// Also support buttons inside sections (like "Learn More") that switch sections
document.querySelectorAll('a[data-section]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();

    // Same logic as navbar
    const targetSection = btn.getAttribute('data-section');

    navLinks.forEach(l => l.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    const newActiveLink = Array.from(navLinks).find(l => l.getAttribute('data-section') === targetSection);
    if (newActiveLink) newActiveLink.classList.add('active');

    const section = document.getElementById(targetSection);
    if (section) section.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
// Smooth scroll for anchor links that point to #contact
document.querySelectorAll('a[href="#contact"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('#contact').scrollIntoView({
      behavior: 'smooth'
    });
  });
});
