/**
 * Premium Portfolio - Vanilla JavaScript
 * Typing animation, smooth scroll, scroll reveal, form validation, mobile nav
 */

(function () {
  'use strict';

  // ---------- Typing Animation (Hero) ----------
  const typingEl = document.getElementById('typing-text');
  const phrases = [
    'CSE Student | Web Developer',
    'Problem Solver | Clean Code Advocate',
    'React & Java | Building Real Projects',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 120;
  const deleteSpeed = 70;
  const pauseAfterType = 2500;
  const pauseAfterDelete = 1000;

  function type() {
    if (!typingEl) return;
    const current = phrases[phraseIndex];

    if (isDeleting) {
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, pauseAfterDelete);
        return;
      }
      charIndex--;
      typingEl.textContent = current.slice(0, charIndex);
      setTimeout(type, deleteSpeed);
      return;
    }

    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, pauseAfterType);
      return;
    }
    setTimeout(type, typeSpeed);
  }

  if (typingEl) setTimeout(type, 500);

  // ---------- Smooth Scroll (anchor links) ----------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navMenu.classList.contains('is-open')) {
          navMenu.classList.remove('is-open');
          if (navToggle) navToggle.classList.remove('is-active');
        }
      }
    });
  });

  // ---------- Active Section Highlight (Nav) ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function setActiveLink() {
    const scrollY = window.scrollY;
    let current = 'hero';
    sections.forEach((section) => {
      const top = section.offsetTop - 100;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  // ---------- Scroll progress bar ----------
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    function updateScrollProgress() {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = height > 0 ? (winScroll / height) * 100 : 0;
      scrollProgress.style.width = pct + '%';
    }
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
  }

  // ---------- Scroll Reveal (Intersection Observer) ----------
  const revealEls = document.querySelectorAll('.reveal');
  const revealOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, revealOptions);

  revealEls.forEach((el) => revealObserver.observe(el));

  // ---------- Mobile Hamburger Menu ----------
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-active');
      document.body.style.overflow = navMenu.classList.contains('is-open') ? 'hidden' : '';
    });
  }

  // ---------- Contact Form Validation & Success ----------
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const formSuccess = document.getElementById('form-success');

  function showError(input, errorEl, message) {
    if (input && errorEl) {
      input.classList.add('error');
      errorEl.textContent = message;
    }
  }

  function clearError(input, errorEl) {
    if (input && errorEl) {
      input.classList.remove('error');
      errorEl.textContent = '';
    }
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (form) {
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', function () {
          clearError(this, document.getElementById(this.id + '-error'));
        });
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      clearError(nameInput, nameError);
      clearError(emailInput, emailError);
      clearError(messageInput, messageError);
      if (formSuccess) formSuccess.textContent = '';

      if (!nameInput.value.trim()) {
        showError(nameInput, nameError, 'Please enter your name.');
        valid = false;
      }
      if (!emailInput.value.trim()) {
        showError(emailInput, emailError, 'Please enter your email.');
        valid = false;
      } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Please enter a valid email.');
        valid = false;
      }
      if (!messageInput.value.trim()) {
        showError(messageInput, messageError, 'Please enter a message.');
        valid = false;
      }

      if (!valid) return;

      // Simulate submit success (no backend)
      if (formSuccess) {
        formSuccess.textContent = 'Thank you! Your message has been sent.';
        formSuccess.style.animation = 'none';
        formSuccess.offsetHeight; // reflow
        formSuccess.style.animation = 'fadeIn 0.4s ease';
      }
      form.reset();
    });
  }

  // ---------- Footer Year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
