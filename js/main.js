/**
 * Main JavaScript File
 * Handles Lucide icons initialization, tab switching,
 * and copy-to-clipboard toast feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide line icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Accessible tab navigation
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Update button state
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Update panel visibility
      tabPanels.forEach(panel => {
        if (panel.id === `panel-${targetTab}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      // Refresh icons if needed
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  });

  // Copy email with toast feedback
  const copyEmailBtn = document.getElementById('btn-copy-email');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  let toastTimer;

  function triggerToast(message) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2600);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'nazmunnahar.codeware@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        triggerToast('Email copied to clipboard');
      } catch (err) {
        const input = document.createElement('input');
        input.value = email;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        triggerToast('Email copied to clipboard');
      }
    });
  }
});
