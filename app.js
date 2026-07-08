/**
 * ==========================================================================
 * JUSTMARKETS MOCK FACE ID - JAVASCRIPT CONTROLLER
 * ==========================================================================
 */

// 1. DEFAULT AND PERSISTED CONFIGURATION SETTINGS
const DEFAULT_SETTINGS = {
  accountNumber: "1200034286",
  balanceAmount: "$2.60",
  balanceFontSize: 38,
  balanceRight: 24,
  balanceTop: 9,
  balanceMiddleHeight: 47,
  faceIdWidth: 220,
  faceIdHeight: 220,
  faceIdRadius: 36,
  faceIdTop: 50, // in percentage (%)
  headerHeight: 42, // Exact native image scale height
  headerTop: 10, // in pixels (px)
  actionsWidth: 76, // Scaled down to match layout naturally (from 89)
  actionsTop: 28,
  indicatorTop: 24,
  tabsTop: 24,
  emptyStateTop: 0 // padding top offset
};

let appSettings = {};

const CURRENT_VERSION = "3.2";

// Load settings from localStorage or fallback to defaults
function loadAppSettings() {
  const saved = localStorage.getItem('justmarkets_mock_settings');
  const savedVer = localStorage.getItem('justmarkets_mock_version');
  
  if (saved && savedVer === CURRENT_VERSION) {
    try {
      appSettings = JSON.parse(saved);
      console.log("Settings successfully loaded from localStorage:", appSettings);
    } catch (e) {
      console.error("Failed to parse saved settings, falling back to defaults.", e);
      appSettings = { ...DEFAULT_SETTINGS };
    }
  } else {
    console.log("Forcing settings reset to defaults for version", CURRENT_VERSION);
    appSettings = { ...DEFAULT_SETTINGS };
    saveAppSettings();
    localStorage.setItem('justmarkets_mock_version', CURRENT_VERSION);
  }
}

// Save settings to localStorage
function saveAppSettings() {
  localStorage.setItem('justmarkets_mock_settings', JSON.stringify(appSettings));
}

// Apply settings directly to the DOM elements in real-time
function applyAppSettings() {
  // 1. Texts
  const headerAcc = document.getElementById('header-account-number');
  if (headerAcc) headerAcc.innerText = appSettings.accountNumber;

  const balanceAmount = document.getElementById('balance-amount');
  if (balanceAmount) {
    balanceAmount.innerText = appSettings.balanceAmount;
    balanceAmount.style.fontSize = appSettings.balanceFontSize + 'px';
    balanceAmount.style.right = appSettings.balanceRight + 'px';
    balanceAmount.style.top = appSettings.balanceTop + 'px';
  }

  const balanceSection = document.querySelector('.middle-balance-section');
  if (balanceSection) {
    balanceSection.style.height = appSettings.balanceMiddleHeight + 'px';
  }

  // 2. Header
  const header = document.getElementById('main-header');
  if (header) {
    header.style.height = appSettings.headerHeight + 'px';
    header.style.marginTop = appSettings.headerTop + 'px';
  }

  // 3. Action Buttons Slices (Scaled proportionally with exact 268/222 aspect ratio)
  const actionSection = document.querySelector('.action-buttons-section');
  if (actionSection) {
    actionSection.style.marginTop = appSettings.actionsTop + 'px';
  }
  const actionBtns = document.querySelectorAll('.action-item-btn');
  actionBtns.forEach(btn => {
    btn.style.width = appSettings.actionsWidth + 'px';
    btn.style.height = (appSettings.actionsWidth / 1.207) + 'px'; // Scale height proportionally
  });

  // 4. Page Indicator Dots margin
  const indicator = document.getElementById('page-indicator-container');
  if (indicator) {
    indicator.style.marginTop = appSettings.indicatorTop + 'px';
  }

  // 5. Tabs Section margin
  const tabsSection = document.querySelector('.positions-tabs-section');
  if (tabsSection) {
    tabsSection.style.marginTop = appSettings.tabsTop + 'px';
  }

  // 6. Empty State padding offset
  const emptyState = document.querySelector('.empty-state-section');
  if (emptyState) {
    emptyState.style.paddingTop = appSettings.emptyStateTop + 'px';
  }
}

class FaceUnlockOverlay {
  constructor() {
    this.overlayElement = null;
    this.blurLayer = document.getElementById('screen-blur-layer');
    this.mainScreen = document.getElementById('main-screen');
    this.pinScreen = document.getElementById('pin-screen');
    this.activeTimeouts = [];
  }

  clearAllTimeouts() {
    this.activeTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    this.activeTimeouts = [];
  }

  show() {
    if (this.overlayElement) {
      this.overlayElement.remove();
    }

    console.log(`[${new Date().toLocaleTimeString()}] Face ID overlay initiated.`);

    this.overlayElement = document.createElement('div');
    this.overlayElement.className = 'face-id-overlay-box';
    this.overlayElement.innerHTML = `
      <div class="face-id-icons-wrapper">
        <!-- Face ID Scanner SVG -->
        <div class="face-id-icon face-id-scan-svg">
          <svg viewBox="0 0 80 80" width="84" height="84" fill="none">
            <g fill="#FFFFFF">
              <g id="Corners" fill-rule="nonzero">
                <g id="Corner">
                  <path d="M4.11428571,21.9428571 L4.11428571,13.0285714 C4.11428571,7.99327149 7.99327149,4.11428571 13.0285714,4.11428571 L21.9428571,4.11428571 C23.0789858,4.11428571 24,3.19327149 24,2.05714286 C24,0.921014229 23.0789858,0 21.9428571,0 L13.0285714,0 C5.72101423,0 0,5.72101423 0,13.0285714 L0,21.9428571 C0,23.0789858 0.921014229,24 2.05714286,24 C3.19327149,24 4.11428571,23.0789858 4.11428571,21.9428571 Z"></path>
                </g>
                <g id="Corner" transform="translate(68.070175, 11.929825) scale(-1, 1) translate(-68.070175, -11.929825) translate(56.140351, 0.000000)">
                  <path d="M4.11428571,21.9428571 L4.11428571,13.0285714 C4.11428571,7.99327149 7.99327149,4.11428571 13.0285714,4.11428571 L21.9428571,4.11428571 C23.0789858,4.11428571 24,3.19327149 24,2.05714286 C24,0.921014229 23.0789858,0 21.9428571,0 L13.0285714,0 C5.72101423,0 0,5.72101423 0,13.0285714 L0,21.9428571 C0,23.0789858 0.921014229,24 2.05714286,24 C3.19327149,24 4.11428571,23.0789858 4.11428571,21.9428571 Z"></path>
                </g>
                <g id="Corner" transform="translate(11.929825, 68.070175) scale(1, -1) translate(-11.929825, -68.070175) translate(0.000000, 56.140351)">
                  <path d="M4.11428571,21.9428571 L4.11428571,13.0285714 C4.11428571,7.99327149 7.99327149,4.11428571 13.0285714,4.11428571 L21.9428571,4.11428571 C23.0789858,4.11428571 24,3.19327149 24,2.05714286 C24,0.921014229 23.0789858,0 21.9428571,0 L13.0285714,0 C5.72101423,0 0,5.72101423 0,13.0285714 L0,21.9428571 C0,23.0789858 0.921014229,24 2.05714286,24 C3.19327149,24 4.11428571,23.0789858 4.11428571,21.9428571 Z"></path>
                </g>
                <g id="Corner" transform="translate(68.070175, 68.070175) scale(-1, -1) translate(-68.070175, -68.070175) translate(56.140351, 56.140351)">
                  <path d="M4.11428571,21.9428571 L4.11428571,13.0285714 C4.11428571,7.99327149 7.99327149,4.11428571 13.0285714,4.11428571 L21.9428571,4.11428571 C23.0789858,4.11428571 24,3.19327149 24,2.05714286 C24,0.921014229 23.0789858,0 21.9428571,0 L13.0285714,0 C5.72101423,0 0,5.72101423 0,13.0285714 L0,21.9428571 C0,23.0789858 0.921014229,24 2.05714286,24 C3.19327149,24 4.11428571,23.0789858 4.11428571,21.9428571 Z"></path>
                </g>
              </g>
              <g id="Eye" transform="translate(21.754386, 28.070175)" fill-rule="nonzero">
                <path d="M0,2.14285714 L0,7.86037654 C0,9.04384386 0.8954305,10.0032337 2,10.0032337 C3.1045695,10.0032337 4,9.04384386 4,7.86037654 L4,2.14285714 C4,0.959389822 3.1045695,0 2,0 C0.8954305,0 0,0.959389822 0,2.14285714 Z"></path>
              </g>
              <g id="Eye" transform="translate(54.736842, 28.070175)" fill-rule="nonzero">
                <path d="M0,2.14285714 L0,7.86037654 C0,9.04384386 0.8954305,10.0032337 2,10.0032337 C3.1045695,10.0032337 4,9.04384386 4,7.86037654 L4,2.14285714 C4,0.959389822 3.1045695,0 2,0 C0.8954305,0 0,0.959389822 0,2.14285714 Z"></path>
              </g>
              <path d="M25.9319616,59.0829234 C29.8331111,62.7239962 34.5578726,64.5614035 40,64.5614035 C45.4421274,64.5614035 50.1668889,62.7239962 54.0680384,59.0829234 C54.9180398,58.2895887 54.9639773,56.9574016 54.1706427,56.1074002 C53.377308,55.2573988 52.0451209,55.2114613 51.1951195,56.0047959 C48.0787251,58.9134307 44.382434,60.3508772 40,60.3508772 C35.617566,60.3508772 31.9212749,58.9134307 28.8048805,56.0047959 C27.9548791,55.2114613 26.622692,55.2573988 25.8293573,56.1074002 C25.0360227,56.9574016 25.0819602,58.2895887 25.9319616,59.0829234 Z" id="Mouth" fill-rule="nonzero"></path>
              <path d="M40,30.1754386 L40,44.9122807 C40,45.85537 39.539042,46.3157895 38.5912711,46.3157895 L37.1929825,46.3157895 C36.0302777,46.3157895 35.0877193,47.2583479 35.0877193,48.4210526 C35.0877193,49.5837574 36.0302777,50.5263158 37.1929825,50.5263158 L38.5912711,50.5263158 C41.8633505,50.5263158 44.2105263,48.1818819 44.2105263,44.9122807 L44.2105263,30.1754386 C44.2105263,29.0127339 43.2679679,28.0701754 42.1052632,28.0701754 C40.9425584,28.0701754 40,29.0127339 40,30.1754386 Z" id="Nose" fill-rule="nonzero"></path>
            </g>
          </svg>
        </div>
        <!-- Success Checkmark SVG -->
        <div class="face-id-icon face-id-success-svg">
          <svg viewBox="0 0 70 70" width="84" height="84">
            <circle cx="35" cy="35" r="24" stroke="#FFFFFF" stroke-width="3" fill="none" />
            <path d="M 26 35 L 32 41 L 45 28" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          </svg>
        </div>
      </div>
      <span class="face-id-text">بصمة الوجه</span>
    `;

    // Apply custom settings to the Face ID overlay box in real-time
    this.overlayElement.style.width = appSettings.faceIdWidth + 'px';
    this.overlayElement.style.height = appSettings.faceIdHeight + 'px';
    this.overlayElement.style.borderRadius = appSettings.faceIdRadius + 'px';
    this.overlayElement.style.top = appSettings.faceIdTop + '%';

    const appWrapper = document.querySelector('.app-wrapper');
    appWrapper.appendChild(this.overlayElement);

    // Keep PIN screen visible and Main screen hidden so that PIN screen is blurred as the Face ID background
    this.pinScreen.classList.remove('hidden');
    this.mainScreen.classList.add('hidden');
    this.blurLayer.classList.add('active');
  }

  success() {
    if (!this.overlayElement) return;
    this.overlayElement.classList.add('success-active');

    // Immediately transition to the inside dashboard, hiding the PIN screen and blur layer
    // while the Face ID box with the success checkmark stays on top for a brief moment
    this.pinScreen.classList.add('hidden');
    this.mainScreen.classList.remove('hidden');
    this.blurLayer.classList.remove('active');
  }

  hide() {
    if (!this.overlayElement) return;

    this.overlayElement.classList.add('dismiss-animation');

    const t = setTimeout(() => {
      if (this.overlayElement) {
        this.overlayElement.remove();
        this.overlayElement = null;
      }
    }, 250);
    this.activeTimeouts.push(t);
  }

  startVerificationSequence() {
    this.clearAllTimeouts();

    // Reset views
    this.pinScreen.classList.remove('hidden');
    this.mainScreen.classList.add('hidden');
    this.blurLayer.classList.remove('active');
    
    document.getElementById('trade-chart-screen').classList.add('hidden');
    document.getElementById('settings-screen').classList.add('hidden');
    
    // Switch active bottom navigation image style
    resetBottomNavTabs();
    document.getElementById('nav-btn-accounts').classList.add('active');

    if (this.overlayElement) {
      this.overlayElement.remove();
      this.overlayElement = null;
    }

    // Trigger Face ID overlay after 80ms (less than 0.1 seconds)
    let t1 = setTimeout(() => {
      this.show();

      let t3 = setTimeout(() => {
        this.success();

        let t4 = setTimeout(() => {
          this.hide();
        }, 500);

        this.activeTimeouts.push(t4);
      }, 1500);

      this.activeTimeouts.push(t3);
    }, 80);

    this.activeTimeouts.push(t1);
  }
}

// Helper to remove active classes and filters from all navigation tabs
function resetBottomNavTabs() {
  const items = document.querySelectorAll('.nav-item');
  items.forEach(item => {
    item.classList.remove('active', 'active-blue', 'inactive-accounts');
  });
}

// Instantiate globally
let faceUnlockOverlayInstance;

document.addEventListener('DOMContentLoaded', () => {
  // Load and apply the saved localStorage dimensions
  loadAppSettings();
  applyAppSettings();

  faceUnlockOverlayInstance = new FaceUnlockOverlay();
  
  // Trigger Face ID overlay sequence automatically on load
  faceUnlockOverlayInstance.startVerificationSequence();

  // Setup interactive locks and settings panel
  setupInteractiveControls(faceUnlockOverlayInstance);
  setupSettingsUI();
});

/**
 * Keypad click triggers, bottom navigation routing, and chart render timers
 */
function setupInteractiveControls(overlayInstance) {
  let enteredPin = [];
  const dots = document.querySelectorAll('.pin-dot');
  const keypadButtons = document.querySelectorAll('.keypad-btn:not(.bio-btn):not(.delete-btn)');
  const deleteBtn = document.querySelector('.delete-btn');
  const bioTrigger = document.getElementById('keypad-bio-trigger');
  const resetBtn = document.getElementById('demo-reset-btn');

  // Screen View Selectors
  const mainScreen = document.getElementById('main-screen');
  const tradeChartScreen = document.getElementById('trade-chart-screen');
  const settingsScreen = document.getElementById('settings-screen');
  
  // Bottom Nav links
  const navBtnAccounts = document.getElementById('nav-btn-accounts');
  const navBtnTrade = document.getElementById('nav-btn-trade');
  const navBtnMarkets = document.getElementById('nav-btn-markets');
  const navBtnIdeas = document.getElementById('nav-btn-ideas');
  const openPosMainBtn = document.getElementById('btn-open-position-main');
  const chartBackBtn = document.getElementById('chart-back-btn');

  function updatePinDots() {
    dots.forEach((dot, index) => {
      if (index < enteredPin.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled');
      }
    });
  }

  // Keypad press handler
  keypadButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (enteredPin.length < 4) {
        enteredPin.push(btn.getAttribute('data-value'));
        updatePinDots();

        if (enteredPin.length === 4) {
          setTimeout(() => {
            overlayInstance.pinScreen.classList.add('hidden');
            overlayInstance.mainScreen.classList.remove('hidden');
            overlayInstance.blurLayer.classList.remove('active');
            enteredPin = [];
            updatePinDots();
          }, 300);
        }
      }
    });
  });

  // Delete key handler
  deleteBtn.addEventListener('click', () => {
    if (enteredPin.length > 0) {
      enteredPin.pop();
      updatePinDots();
    }
  });

  // Keypad Face ID icon click (re-runs biometric flow)
  bioTrigger.addEventListener('click', () => {
    enteredPin = [];
    updatePinDots();
    overlayInstance.startVerificationSequence();
  });

  // Floating reload button click
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      enteredPin = [];
      updatePinDots();
      overlayInstance.startVerificationSequence();
    });
  }

  // Tab switcher effect on Accounts Screen
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  /* ==========================================================================
     NAVIGATION ROUTER (Accounts <-> Trade Chart <-> Settings Panel)
     ========================================================================== */
  function showDashboardView() {
    tradeChartScreen.classList.add('hidden');
    settingsScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    
    // Hide HTML bottom nav on main dashboard view
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) bottomNav.style.display = 'none';
    
    // Reset filters
    resetBottomNavTabs();
    navBtnAccounts.classList.add('active');
  }

  function showTradeChartView() {
    mainScreen.classList.add('hidden');
    settingsScreen.classList.add('hidden');
    tradeChartScreen.classList.remove('hidden');
    
    // Show HTML bottom nav on other views
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) bottomNav.style.display = 'flex';
    
    // Set active filters (tint Trade blue, fade Accounts to gray)
    resetBottomNavTabs();
    navBtnAccounts.classList.add('inactive-accounts');
    navBtnTrade.classList.add('active-blue');

    renderChart('M5');
  }

  function showSettingsView() {
    mainScreen.classList.add('hidden');
    tradeChartScreen.classList.add('hidden');
    settingsScreen.classList.remove('hidden');

    // Show HTML bottom nav on other views
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) bottomNav.style.display = 'flex';

    // Populate the form fields with latest loaded settings values
    populateSettingsFormFields();

    // Set active filters (tint Ideas blue, fade Accounts to gray)
    resetBottomNavTabs();
    navBtnAccounts.classList.add('inactive-accounts');
    navBtnIdeas.classList.add('active-blue');
  }

  // Navigation Event Listeners
  navBtnAccounts.addEventListener('click', (e) => {
    e.preventDefault();
    showDashboardView();
  });

  navBtnTrade.addEventListener('click', (e) => {
    e.preventDefault();
    showTradeChartView();
  });

  navBtnIdeas.addEventListener('click', (e) => {
    e.preventDefault();
    showSettingsView();
  });

  openPosMainBtn.addEventListener('click', () => {
    showTradeChartView();
  });

  chartBackBtn.addEventListener('click', () => {
    showDashboardView();
  });

  // Dummy highlight for Markets tab
  navBtnMarkets.addEventListener('click', (e) => {
    e.preventDefault();
    resetBottomNavTabs();
    navBtnAccounts.classList.add('inactive-accounts');
    navBtnMarkets.classList.add('active-blue');
    
    tradeChartScreen.classList.add('hidden');
    settingsScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) bottomNav.style.display = 'none';
  });

  // Navigation Event Listeners (Transparent Dashboard overlays)
  const overlayBtnAccounts = document.getElementById('overlay-nav-btn-accounts');
  const overlayBtnMarkets = document.getElementById('overlay-nav-btn-markets');
  const overlayBtnTrade = document.getElementById('overlay-nav-btn-trade');
  const overlayBtnIdeas = document.getElementById('overlay-nav-btn-ideas');

  if (overlayBtnAccounts) {
    overlayBtnAccounts.addEventListener('click', (e) => {
      e.preventDefault();
      showDashboardView();
    });
  }
  if (overlayBtnTrade) {
    overlayBtnTrade.addEventListener('click', (e) => {
      e.preventDefault();
      showTradeChartView();
    });
  }
  if (overlayBtnIdeas) {
    overlayBtnIdeas.addEventListener('click', (e) => {
      e.preventDefault();
      showSettingsView();
    });
  }
  if (overlayBtnMarkets) {
    overlayBtnMarkets.addEventListener('click', (e) => {
      e.preventDefault();
      resetBottomNavTabs();
      navBtnAccounts.classList.add('inactive-accounts');
      navBtnMarkets.classList.add('active-blue');
      
      tradeChartScreen.classList.add('hidden');
      settingsScreen.classList.add('hidden');
      mainScreen.classList.remove('hidden');
      
      const bottomNav = document.querySelector('.bottom-nav');
      if (bottomNav) bottomNav.style.display = 'none';
    });
  }

  /* ==========================================================================
     TIMEFRAME SELECTORS AND SVG CHART RENDER LOGIC
     ========================================================================== */
  const tfButtons = document.querySelectorAll('.tf-btn');
  tfButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tfButtons.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      
      const selectedFrame = btn.getAttribute('data-frame');
      renderChart(selectedFrame);
    });
  });

  function generateChartPoints(timeframe) {
    switch (timeframe) {
      case 'M1':
        return [120, 140, 95, 115, 130, 85, 105, 95, 115, 100, 125, 110, 135, 120, 145, 110, 130, 115, 120, 122];
      case 'M5':
        return [130, 120, 145, 110, 125, 105, 120, 95, 110, 85, 100, 75, 90, 65, 80, 50, 65, 70, 55, 50];
      case 'M15':
        return [150, 145, 135, 140, 125, 130, 115, 120, 105, 110, 95, 98, 85, 90, 80, 85, 70, 72, 60, 58];
      case 'H1':
        return [160, 155, 120, 125, 90, 95, 130, 135, 100, 105, 70, 75, 110, 115, 80, 85, 50, 55, 30, 26];
      case 'D1':
        return [180, 170, 160, 150, 140, 130, 120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 25, 20, 15, 10];
      default:
        return [120, 110, 130, 105, 115, 95, 110, 85, 90, 75, 85, 60, 70, 50, 65, 45, 55, 60, 48, 52];
    }
  }

  function renderChart(timeframe) {
    const points = generateChartPoints(timeframe);
    const width = 400;
    const height = 200;
    const step = width / (points.length - 1);
    
    let pathD = `M 0 ${points[0]}`;
    for (let i = 1; i < points.length; i++) {
      const x = i * step;
      const y = points[i];
      pathD += ` L ${x} ${y}`;
    }
    
    const linePath = document.getElementById('chart-line-path');
    const areaPath = document.getElementById('chart-area-path');
    const trackerDot = document.getElementById('chart-tracker-dot');
    const trackerGlow = document.getElementById('chart-tracker-dot-glow');
    
    if (linePath && areaPath) {
      linePath.setAttribute('d', pathD);
      
      const areaD = `${pathD} L 400 200 L 0 200 Z`;
      areaPath.setAttribute('d', areaD);
      
      const lastX = width;
      const lastY = points[points.length - 1];
      
      trackerDot.setAttribute('cx', lastX - 3);
      trackerDot.setAttribute('cy', lastY);
      trackerGlow.setAttribute('cx', lastX - 3);
      trackerGlow.setAttribute('cy', lastY);
    }
  }

  /* ==========================================================================
     LIVE TRADING PRICE TICKER SIMULATION
     ========================================================================== */
  let basePrice = 1.08456;
  const livePriceEl = document.getElementById('chart-live-price');
  const priceChangeEl = document.getElementById('chart-price-change');
  const orderPriceSellEl = document.getElementById('order-price-sell');
  const orderPriceBuyEl = document.getElementById('order-price-buy');

  setInterval(() => {
    const tickChange = (Math.floor(Math.random() * 9) - 4) * 0.00001;
    const oldPrice = basePrice;
    basePrice += tickChange;

    const formattedPrice = basePrice.toFixed(5);
    const sellPrice = (basePrice - 0.00004).toFixed(5);
    const buyPrice = (basePrice + 0.00004).toFixed(5);

    if (livePriceEl) {
      livePriceEl.innerText = formattedPrice;
      orderPriceSellEl.innerText = sellPrice;
      orderPriceBuyEl.innerText = buyPrice;

      if (basePrice > oldPrice) {
        livePriceEl.style.color = '#4CAF50';
        priceChangeEl.innerText = "+0.15%";
        priceChangeEl.className = "chart-price-change positive";
      } else if (basePrice < oldPrice) {
        livePriceEl.style.color = '#E53935';
        priceChangeEl.innerText = "+0.09%";
        priceChangeEl.className = "chart-price-change negative";
      }

      setTimeout(() => {
        livePriceEl.style.color = '#000000';
      }, 200);
    }
  }, 1500);
}

/**
 * Visual Editor configuration controls (Real-time live settings updates)
 */
function setupSettingsUI() {
  const saveBtn = document.getElementById('settings-save-btn');
  const resetBtn = document.getElementById('settings-reset-btn');

  // Text fields dynamic input updating
  const inputAcc = document.getElementById('set-account-number');
  const inputBal = document.getElementById('set-balance-amount');
  
  if (inputAcc) {
    inputAcc.addEventListener('input', () => {
      appSettings.accountNumber = inputAcc.value;
      applyAppSettings();
      saveAppSettings(); // Auto-save on every keystroke
    });
  }
  
  if (inputBal) {
    inputBal.addEventListener('input', () => {
      appSettings.balanceAmount = inputBal.value;
      applyAppSettings();
      saveAppSettings(); // Auto-save on every keystroke
    });
  }

  // Sliders range settings mapping
  const rangeControls = [
    { id: 'set-balance-font-size', valId: 'val-balance-font-size', suffix: 'px', key: 'balanceFontSize' },
    { id: 'set-balance-right', valId: 'val-balance-right', suffix: 'px', key: 'balanceRight' },
    { id: 'set-balance-top', valId: 'val-balance-top', suffix: 'px', key: 'balanceTop' },
    { id: 'set-balance-middle-height', valId: 'val-balance-middle-height', suffix: 'px', key: 'balanceMiddleHeight' },
    { id: 'set-header-height', valId: 'val-header-height', suffix: 'px', key: 'headerHeight' },
    { id: 'set-header-top', valId: 'val-header-top', suffix: 'px', key: 'headerTop' },
    { id: 'set-actions-width', valId: 'val-actions-width', suffix: 'px', key: 'actionsWidth' },
    { id: 'set-actions-top', valId: 'val-actions-top', suffix: 'px', key: 'actionsTop' },
    { id: 'set-indicator-top', valId: 'val-indicator-top', suffix: 'px', key: 'indicatorTop' },
    { id: 'set-tabs-top', valId: 'val-tabs-top', suffix: 'px', key: 'tabsTop' },
    { id: 'set-empty-top', valId: 'val-empty-top', suffix: 'px', key: 'emptyStateTop' },
    { id: 'set-face-id-width', valId: 'val-face-id-width', suffix: 'px', key: 'faceIdWidth' },
    { id: 'set-face-id-height', valId: 'val-face-id-height', suffix: 'px', key: 'faceIdHeight' },
    { id: 'set-face-id-radius', valId: 'val-face-id-radius', suffix: 'px', key: 'faceIdRadius' },
    { id: 'set-face-id-top', valId: 'val-face-id-top', suffix: '%', key: 'faceIdTop' }
  ];

  // Dynamic slider indicators + real-time theme updates
  rangeControls.forEach(control => {
    const slider = document.getElementById(control.id);
    const indicator = document.getElementById(control.valId);
    if (slider && indicator) {
      slider.addEventListener('input', () => {
        indicator.innerText = slider.value + control.suffix;
        
        // Update model and inject styles dynamically as you slide
        appSettings[control.key] = parseInt(slider.value, 10);
        applyAppSettings();
        saveAppSettings(); // Auto-save on slider drag
      });
    }
  });

  // Save Settings Click Handler
  saveBtn.addEventListener('click', () => {
    saveAppSettings();
    showToast("تم حفظ الإعدادات بنجاح!");
  });

  // Reset to Defaults Click Handler
  resetBtn.addEventListener('click', () => {
    localStorage.removeItem('justmarkets_mock_settings');
    appSettings = { ...DEFAULT_SETTINGS };
    applyAppSettings();
    populateSettingsFormFields();
    showToast("تمت إعادة تعيين القيم الافتراضية!");
  });
}

// Populates form elements with saved settings values
function populateSettingsFormFields() {
  document.getElementById('set-account-number').value = appSettings.accountNumber;
  document.getElementById('set-balance-amount').value = appSettings.balanceAmount;

  const rangeControls = [
    { id: 'set-balance-font-size', valId: 'val-balance-font-size', suffix: 'px', key: 'balanceFontSize' },
    { id: 'set-balance-right', valId: 'val-balance-right', suffix: 'px', key: 'balanceRight' },
    { id: 'set-balance-top', valId: 'val-balance-top', suffix: 'px', key: 'balanceTop' },
    { id: 'set-balance-middle-height', valId: 'val-balance-middle-height', suffix: 'px', key: 'balanceMiddleHeight' },
    { id: 'set-header-height', valId: 'val-header-height', suffix: 'px', key: 'headerHeight' },
    { id: 'set-header-top', valId: 'val-header-top', suffix: 'px', key: 'headerTop' },
    { id: 'set-actions-width', valId: 'val-actions-width', suffix: 'px', key: 'actionsWidth' },
    { id: 'set-actions-top', valId: 'val-actions-top', suffix: 'px', key: 'actionsTop' },
    { id: 'set-indicator-top', valId: 'val-indicator-top', suffix: 'px', key: 'indicatorTop' },
    { id: 'set-tabs-top', valId: 'val-tabs-top', suffix: 'px', key: 'tabsTop' },
    { id: 'set-empty-top', valId: 'val-empty-top', suffix: 'px', key: 'emptyStateTop' },
    { id: 'set-face-id-width', valId: 'val-face-id-width', suffix: 'px', key: 'faceIdWidth' },
    { id: 'set-face-id-height', valId: 'val-face-id-height', suffix: 'px', key: 'faceIdHeight' },
    { id: 'set-face-id-radius', valId: 'val-face-id-radius', suffix: 'px', key: 'faceIdRadius' },
    { id: 'set-face-id-top', valId: 'val-face-id-top', suffix: '%', key: 'faceIdTop' }
  ];

  rangeControls.forEach(control => {
    const slider = document.getElementById(control.id);
    const indicator = document.getElementById(control.valId);
    if (slider && indicator) {
      slider.value = appSettings[control.key];
      indicator.innerText = appSettings[control.key] + control.suffix;
    }
  });
}

// Display toast message
function showToast(message) {
  const toast = document.getElementById('toast-msg');
  if (toast) {
    toast.innerText = message;
    toast.classList.add('show');
    
    if (toast.timeoutId) {
      clearTimeout(toast.timeoutId);
    }
    
    toast.timeoutId = setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }
}
