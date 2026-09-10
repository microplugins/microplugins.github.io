document.addEventListener("DOMContentLoaded", function () {
    const PRICING_CONFIG = {
        '1': { licenses: 1, pricing_id: '87057', annual: 47.88, lifetime: 149.99 },
        '3': { licenses: 3, pricing_id: '87060', annual: 83.99, lifetime: 259.99 },
        '1000': { licenses: 1000, pricing_id: '87062', annual: 323.99, lifetime: 979.99 }
    };

    let fsCheckoutInstance = null;

    function getSelectedBillingCycle() {
        const toggle = document.querySelector('#pricingBillingToggle');
        return toggle && toggle.classList.contains('checked') ? 'lifetime' : 'annual';
    }

    // Clean up all Freemius loaders, wrappers, iframes and scroll locks
    function cleanupFreemiusCheckout() {
        // 1. Remove all Freemius loading spinners and overlays immediately
        document.querySelectorAll('[id^="fs-loader-"], .fs-loader').forEach(el => {
            el.classList.remove('show');
            el.style.display = 'none';
            el.remove();
        });

        // 2. Remove all Freemius iframe wrappers and iframes
        document.querySelectorAll('[id*="fs-checkout-page"], [data-testid*="fs-checkout-page"], iframe[src*="checkout.freemius.com"]').forEach(el => el.remove());

        // 3. Remove exit intent overlay
        document.querySelectorAll('[id^="fs-exit-intent-"]').forEach(el => el.remove());

        // 4. Restore body & html scrolling and remove lock classes
        document.body.className = document.body.className.replace(/\bis-fs-checkout-open[^\s]*/g, '').trim();
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';

        // 5. Clean up any Freemius injected styles that lock scroll
        document.querySelectorAll('style').forEach(s => {
            if (s.textContent && (s.textContent.includes('is-fs-checkout-open') || s.textContent.includes('fs-loader-'))) {
                s.remove();
            }
        });

        // 6. Reset handler instance so subsequent clicks get a clean, fresh instance
        fsCheckoutInstance = null;
    }

    // Auto-dismiss Freemius loading spinner
    function setupLoaderAutoDismiss() {
        // If we are on a real server (HTTP/HTTPS), we trust Freemius's native postMessage ('loaded') 
        // to dismiss the spinner exactly when the modal is ready. This prevents any visual gaps.
        if (window.location.protocol !== 'file:') {
            return;
        }

        // ONLY for file:/// protocol (where postMessage fails), we aggressively remove it
        // after the iframe loads, adding a delay for the internal React app to render.
        const observer = new MutationObserver(() => {
            const iframe = document.querySelector('iframe[id*="fs-checkout-page"]');
            if (iframe) {
                iframe.addEventListener('load', () => {
                    setTimeout(() => {
                        document.querySelectorAll('[id^="fs-loader-"], .fs-loader').forEach(el => el.remove());
                    }, 800);
                }, { once: true });
                observer.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Global listener for ESC key to close checkout natively
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            const hasOpenModal = document.querySelector('[id*="fs-checkout-page"], [id^="fs-loader-"]');
            if (hasOpenModal) {
                cleanupFreemiusCheckout();
            }
        }
    });

    // Global listener for postMessages from Freemius
    window.addEventListener('message', (event) => {
        let data = event.data;
        if (typeof data === 'string' && data.charAt(0) === '{') {
            try {
                data = JSON.parse(data);
            } catch (err) { }
        }
        if (data && typeof data === 'object') {
            // Native Freemius close / cancel / afterClose events
            if (data.type === 'canceled' || data.type === 'close' || data.type === 'afterClose') {
                cleanupFreemiusCheckout();
            }
            // When iframe signals loaded, dismiss the spinner immediately
            if (data.type === 'loaded') {
                document.querySelectorAll('[id^="fs-loader-"], .fs-loader').forEach(el => el.remove());
            }
        }
    }, true);

    function openCheckout(licensesCount, pricingId) {
        const cycle = getSelectedBillingCycle();
        const plan = PRICING_CONFIG[String(licensesCount)] || PRICING_CONFIG['1'];
        const activePricingId = pricingId || plan.pricing_id;

        // Synchronize dropdown
        const licenseSelect = document.getElementById('licenses');
        if (licenseSelect) {
            licenseSelect.value = String(plan.licenses);
        }

        // Ensure any previous checkout state is completely cleaned up
        cleanupFreemiusCheckout();

        // Automatically dismiss the loading spinner so it never gets stuck
        setupLoaderAutoDismiss();

        // Create a fresh FS.Checkout instance
        fsCheckoutInstance = new FS.Checkout({
            product_id: '39157',
            plan_id: '65639',
            public_key: 'pk_fad84b814e3809fb848ea78c461c0',
            image: 'https://microplugins.com/assets/images/favicon-128.png'
        });

        fsCheckoutInstance.open({
            name: 'Ultimate Media Player and Playlist',
            licenses: plan.licenses,
            pricing_id: activePricingId,
            cycle: cycle,
            billing_cycle: cycle,
            cancel: () => {
                cleanupFreemiusCheckout();
            },
            afterClose: () => {
                cleanupFreemiusCheckout();
            },
            purchaseCompleted: (response) => {
                // The logic here will be executed immediately after the purchase confirmation
                console.log('Purchase completed:', response);
                if (response && response.user) console.log('User email:', response.user.email);
                if (response && response.license) console.log('License key:', response.license.key);
            },
            success: (response) => {
                // The logic here will be executed after the customer closes the checkout, 
                // after a successful purchase
                console.log('Checkout closed after successful purchase:', response);
                if (response && response.user) console.log('User email:', response.user.email);
                if (response && response.license) console.log('License key:', response.license.key);
                cleanupFreemiusCheckout();
            }
        });
    }

    // Synchronize select dropdown labels when Annual / Lifetime toggle changes
    function updateSelectLabels() {
        const isLifetime = document.querySelector('#pricingBillingToggle')?.classList.contains('checked');
        const sel = document.getElementById('licenses');
        if (!sel) return;
        const opt1 = sel.querySelector('option[value="1"]');
        const opt3 = sel.querySelector('option[value="3"]');
        const opt1000 = sel.querySelector('option[value="1000"]');
        if (isLifetime) {
            if (opt1) opt1.textContent = 'Single Site License — $149.99 Lifetime';
            if (opt3) opt3.textContent = '3-Site License — $259.99 Lifetime';
            if (opt1000) opt1000.textContent = '1,000-Site License — $979.99 Lifetime';
        } else {
            if (opt1) opt1.textContent = 'Single Site License — $47.88/yr';
            if (opt3) opt3.textContent = '3-Site License — $83.99/yr';
            if (opt1000) opt1000.textContent = '1,000-Site License — $323.99/yr';
        }
    }

    const billingToggle = document.querySelector('#pricingBillingToggle');
    if (billingToggle) {
        billingToggle.addEventListener('click', () => {
            setTimeout(updateSelectLabels, 50);
        });
    }

    const purchaseBtn = document.getElementById('purchase');
    if (purchaseBtn) {
        purchaseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const licenseSelect = document.getElementById('licenses');
            const licVal = licenseSelect ? licenseSelect.value : 1;
            const opt = licenseSelect ? licenseSelect.selectedOptions[0] : null;
            const pid = opt ? opt.getAttribute('data-pricing-id') : null;
            openCheckout(licVal, pid);
        });
    }

    // Connect individual tier card buttons
    document.querySelectorAll('.fs-buy-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lic = btn.getAttribute('data-licenses');
            const pid = btn.getAttribute('data-pricing-id');
            openCheckout(lic, pid);
        });
    });

});