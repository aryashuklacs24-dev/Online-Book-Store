document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const newsletterForm = document.querySelector('#newsletter-form');
  const contactForm = document.querySelector('#contact-form');
  const searchInput = document.querySelector('#book-search');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const bookCards = document.querySelectorAll('.book-card');
  const scrollTopBtn = document.querySelector('#scroll-top');
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (!email || !email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address to subscribe.');
        return;
      }

      alert('Subscribed successfully! Thanks for joining BookVerse.');
      newsletterForm.reset();
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const fullName = contactForm.querySelector('#full-name').value.trim();
      const email = contactForm.querySelector('#email').value.trim();
      const phone = contactForm.querySelector('#phone').value.trim();
      const subject = contactForm.querySelector('#subject').value.trim();
      const message = contactForm.querySelector('#message').value.trim();

      if (!fullName || !email || !phone || !subject || !message) {
        alert('Please fill in all the fields before submitting.');
        return;
      }

      if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
      }

      alert('Your message has been sent successfully. We will contact you shortly!');
      contactForm.reset();
    });
  }

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();

      bookCards.forEach((card) => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const author = card.querySelector('.book-author')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.book-description')?.textContent.toLowerCase() || '';

        const matches = title.includes(query) || author.includes(query) || description.includes(query);
        card.classList.toggle('hidden', !matches);
      });
    });
  }

  const applyFilter = (filter) => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));

    const activeButton = Array.from(filterButtons).find((btn) => btn.dataset.filter === filter);
    if (activeButton) {
      activeButton.classList.add('active');
    }

    bookCards.forEach((card) => {
      const category = card.dataset.category;
      const show = filter === 'all' || category === filter;
      card.classList.toggle('hidden', !show);
    });
  };

  if (initialCategory && Array.from(filterButtons).some((btn) => btn.dataset.filter === initialCategory)) {
    applyFilter(initialCategory);
  } else {
    applyFilter('all');
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      applyFilter(filter);
    });
  });
});
