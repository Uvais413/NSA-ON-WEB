// DARK MODE TOGGLE

const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const body = document.body;

// Load saved preference
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark-mode');
  darkModeIcon.textContent = 'light_mode'; // sun icon for dark mode ON
} else {
  darkModeIcon.textContent = 'dark_mode'; // moon icon for dark mode OFF
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    darkModeIcon.textContent = 'light_mode'; // sun icon
    localStorage.setItem('darkMode', 'enabled');
  } else {
    darkModeIcon.textContent = 'dark_mode'; // moon icon
    localStorage.setItem('darkMode', 'disabled');
  }
});

// Keyboard accessibility for dark mode toggle
darkModeToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    darkModeToggle.click();
  }
});

// IST TIME & DATE DISPLAY

function updateISTTime() {
  // Change to update #istTimeText instead of #datetime
  const datetimeElem = document.getElementById('istTimeText');
  if (!datetimeElem) return;

  // IST = UTC + 5:30
  const now = new Date();

  // Convert to IST by adding offset manually
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istOffset = 5.5 * 60 * 60000; // 5 hours 30 minutes in ms
  const istTime = new Date(utc + istOffset);

  // Format date & time
  const options = {  
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const istStr = istTime.toLocaleString('en-IN', options);

  datetimeElem.textContent = `${istStr}`;
}

// Update every second
setInterval(updateISTTime, 1000);
updateISTTime();

// SMOOTH SCROLL FOR INTERNAL LINKS (OPTIONAL)

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();

    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
