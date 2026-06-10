// Wait until the DOM is ready before attaching event listeners.
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-list a');
  const backToTop = document.getElementById('backToTop');
  const header = document.querySelector('.site-header');

  // Toggle mobile menu visibility and update aria state.
  menuToggle.addEventListener('click', function () {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('open');
  });

  // Close the mobile menu when a navigation link is clicked.
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Add sticky header effect and show back-to-top button on scroll.
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
      backToTop.classList.add('show');
    } else {
      header.classList.remove('scrolled');
      backToTop.classList.remove('show');
    }
  });

  // Smooth scrolling to anchors for main navigation and buttons.
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      const targetId = anchor.getAttribute('href');
      if (targetId.length > 1) {
        event.preventDefault();
        document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Back to top button behavior.
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Animate elements as they scroll into view using Intersection Observer.
  const animatedElements = document.querySelectorAll('.animate');
  const observerOptions = {
    threshold: 0.18,
  };

  const observer = new IntersectionObserver(function (entries, observerRef) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerRef.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(function (element) {
    observer.observe(element);
  });
});
