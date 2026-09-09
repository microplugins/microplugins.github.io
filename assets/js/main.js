/**
 * MicroPlugins — Interactive Features
 * Lightweight, zero-dependency vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      const icon = mobileToggle.querySelector('svg');
      if (icon) {
        if (isOpen) {
          icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
        } else {
          icon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
        }
      }
    });
  }

  // 2. Sticky Header Scroll State
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 3. FAQ Accordion Interaction
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      if (!item) return;

      const isExpanded = item.classList.contains('active');
      
      // Optional: close other accordions in the same group if needed
      const parentAccordion = item.closest('.accordion');
      if (parentAccordion && parentAccordion.dataset.allowMultiple !== 'true') {
        parentAccordion.querySelectorAll('.accordion-item.active').forEach(openItem => {
          if (openItem !== item) {
            openItem.classList.remove('active');
            openItem.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
          }
        });
      }

      item.classList.toggle('active', !isExpanded);
      trigger.setAttribute('aria-expanded', !isExpanded);
    });
  });

  // 4. Code Block Copy to Clipboard
  const copyButtons = document.querySelectorAll('.code-box-copy, .btn-copy');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetSelector = btn.getAttribute('data-copy-target');
      let textToCopy = '';
      if (targetSelector) {
        const targetEl = document.querySelector(targetSelector);
        if (targetEl) textToCopy = targetEl.innerText || targetEl.textContent;
      } else {
        const codeBox = btn.closest('.code-box');
        if (codeBox) {
          const pre = codeBox.querySelector('pre');
          if (pre) textToCopy = pre.innerText || pre.textContent;
        }
      }

      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy.trim());
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('badge-green');
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('badge-green');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    });
  });

  // 5. Plugin Filtering & Search (on plugins.html)
  const filterTabs = document.querySelectorAll('.filter-tab');
  const searchInput = document.querySelector('#pluginSearch');
  const pluginCards = document.querySelectorAll('.plugin-filterable-item');

  function applyFilters() {
    if (!pluginCards.length) return;

    const activeTab = document.querySelector('.filter-tab.active');
    const selectedCategory = activeTab ? activeTab.getAttribute('data-category') : 'all';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    let visibleCount = 0;
    pluginCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardTitle = card.querySelector('.plugin-name')?.textContent.toLowerCase() || '';
      const cardDesc = card.querySelector('.plugin-tagline')?.textContent.toLowerCase() || '';

      const matchesCategory = selectedCategory === 'all' || cardCategory.includes(selectedCategory);
      const matchesSearch = !query || cardTitle.includes(query) || cardDesc.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const noResults = document.querySelector('#noPluginsFound');
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (filterTabs.length) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active', 'btn-primary'));
        filterTabs.forEach(t => t.classList.add('btn-secondary'));
        tab.classList.add('active', 'btn-primary');
        tab.classList.remove('btn-secondary');
        applyFilters();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  // 6. Pricing Annual / Lifetime Toggle (on product landing pages)
  const pricingToggle = document.querySelector('#pricingBillingToggle');
  if (pricingToggle) {
    pricingToggle.addEventListener('click', () => {
      pricingToggle.classList.toggle('checked');
      const isLifetime = pricingToggle.classList.contains('checked');

      // Update active label style
      const labelAnnual = document.querySelector('#labelAnnual');
      const labelLifetime = document.querySelector('#labelLifetime');
      if (labelAnnual && labelLifetime) {
        labelAnnual.classList.toggle('active', !isLifetime);
        labelLifetime.classList.toggle('active', isLifetime);
      }

      // Update prices on cards
      document.querySelectorAll('[data-price-annual]').forEach(el => {
        const annualPrice = el.getAttribute('data-price-annual');
        const lifetimePrice = el.getAttribute('data-price-lifetime');
        el.textContent = isLifetime ? lifetimePrice : annualPrice;
      });

      document.querySelectorAll('[data-period-annual]').forEach(el => {
        const annualPeriod = el.getAttribute('data-period-annual');
        const lifetimePeriod = el.getAttribute('data-period-lifetime');
        el.textContent = isLifetime ? lifetimePeriod : annualPeriod;
      });
    });
  }

  // 7. Interactive Contact / Support Form
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const alertSuccess = document.querySelector('#contactSuccessAlert');
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending message...';
      }

      setTimeout(() => {
        if (alertSuccess) {
          alertSuccess.style.display = 'block';
          alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Message Sent Successfully';
          setTimeout(() => {
            submitBtn.textContent = 'Send Message';
          }, 4000);
        }
      }, 700);
    });
  }

  // 8. Hero Showcase Interactive Tab Switcher
  const heroTabs = document.querySelectorAll('.hero-tab-btn');
  const heroPanes = document.querySelectorAll('.hero-showcase-pane');
  if (heroTabs.length > 0 && heroPanes.length > 0) {
    heroTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-tab-target');
        heroTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        heroPanes.forEach(p => {
          p.classList.remove('active');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const activePane = document.getElementById(targetId);
        if (activePane) {
          activePane.classList.add('active');
        }
      });
    });
  }
});
