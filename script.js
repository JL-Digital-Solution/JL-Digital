/* ---------------------------------------------------------
   WhatsApp — change these two lines and every WhatsApp
   button on the site updates (navbar, hero, floating, footer).
   Number format: country code + number, digits only.
--------------------------------------------------------- */
const WHATSAPP_NUMBER = '27000000000';
const WHATSAPP_MESSAGE = 'Hi JL Digital Solution, I would like a quote for my business.';

document.querySelectorAll('[data-whatsapp]').forEach((link) => {
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
});

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  });
});

const quoteForm = document.querySelector('#quote-form');
const formNote = document.querySelector('#form-note');
const submitBtn = document.querySelector('#submit-btn');

quoteForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  formNote.textContent = '';
  submitBtn.disabled = true;
  submitBtn.firstChild.textContent = 'Sending…';

  try {
    const response = await fetch(quoteForm.action, {
      method: 'POST',
      body: new FormData(quoteForm),
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      formNote.textContent = 'Thanks — your enquiry has been sent. We’ll be in touch shortly.';
      quoteForm.reset();
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    formNote.textContent = 'Sorry, something went wrong. Please try again or email us directly.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.firstChild.textContent = 'Send my enquiry ';
  }
});

const workScreenshots = document.querySelectorAll('.work-screenshot');

const updateWorkScrollDistances = () => {
  workScreenshots.forEach((screenshot) => {
    const viewport = screenshot.closest('.browser-viewport');
    const distance = Math.min(0, viewport.clientHeight - screenshot.offsetHeight);
    screenshot.style.setProperty('--scroll-distance', `${distance}px`);
  });
};

workScreenshots.forEach((screenshot) => {
  if (screenshot.complete) {
    updateWorkScrollDistances();
  } else {
    screenshot.addEventListener('load', updateWorkScrollDistances);
  }
});
window.addEventListener('resize', updateWorkScrollDistances);
updateWorkScrollDistances();
