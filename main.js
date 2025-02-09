document.addEventListener('DOMContentLoaded', function() {
  /*==================== REMOVE MENU ON LINK CLICK ====================*/
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Hide mobile menu if present
      navMenu.classList.remove('show-menu');
    });
  });

  /*==================== PROJECT CARD CLICK TO VISIT ====================*/
  const projectCards = document.querySelectorAll('.hero-projects .card');
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const url = card.getAttribute('data-link');
      if (url) {
        window.open(url, '_blank');
      }
    });
  });

  /*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
  const sections = document.querySelectorAll('section[id]');
  function scrollActive() {
    sections.forEach(current => {
      const sectionHeight = current.clientHeight;
      const sectionTop = current.getBoundingClientRect().top;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector('.nav__link[href*=' + sectionId + ']');
      if (sectionTop <= window.innerHeight / 2 &&
          sectionTop + sectionHeight >= window.innerHeight / 2) {
        navLink.classList.add('active-link');
      } else {
        navLink.classList.remove('active-link');
      }
    });
  }
  window.addEventListener('scroll', scrollActive);

  /*==================== CHANGE BACKGROUND HEADER ====================*/
  function scrollHeader() {
    const header = document.getElementById('header');
    if (window.scrollY >= 80) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header');
  }
  window.addEventListener('scroll', scrollHeader);

  /*==================== SHOW SCROLL UP ====================*/
  function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (window.scrollY >= 560) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
  }
  window.addEventListener('scroll', scrollUp);

  /*==================== DARK/LIGHT THEME TOGGLE ====================*/
  const themeButton = document.getElementById('theme-button');
  const darkTheme = 'dark-theme';
  const iconTheme = 'uil-sun';
  const selectedTheme = localStorage.getItem('selected-theme');
  const selectedIcon = localStorage.getItem('selected-icon');
  const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? 'dark' : 'light';
  const getCurrentIcon = () =>
    themeButton && themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';
  if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    if (themeButton) {
      themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
    }
  }
  if (themeButton) {
    themeButton.addEventListener('click', () => {
      document.body.classList.toggle(darkTheme);
      themeButton.classList.toggle(iconTheme);
      localStorage.setItem('selected-theme', getCurrentTheme());
      localStorage.setItem('selected-icon', getCurrentIcon());
    });
  }

  /*==================== MOBILE CAROUSEL FOR PROJECT CARDS ====================*/
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  const dots = document.querySelectorAll('.carousel-dots .dot');

  if (carouselWrapper && dots.length) {
    carouselWrapper.addEventListener('scroll', function() {
      const index = Math.round(carouselWrapper.scrollLeft / carouselWrapper.clientWidth);
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        carouselWrapper.scrollTo({
          left: i * carouselWrapper.clientWidth,
          behavior: 'smooth'
        });
      });
    });
  }
});
