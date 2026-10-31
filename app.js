// Omnexa Wash - Application Logic & Controller
(function() {
  'use strict';

  // Application State
  const state = {
    lang: 'ar', // 'ar' | 'en'
    currentRole: 'customer', // 'customer' | 'captain' | 'admin'
    currentView: 'home', // 'home' | 'booking' | 'tracking' | 'orders' | 'garage' | 'profile' | 'nearby'
    isMobileView: false,
    
    // Booking Form State
    booking: {
      serviceType: 'doorstep', // 'doorstep' | 'station'
      selectedVehicleType: 'sedan',
      selectedCarId: 'car-1',
      selectedPackageId: 'pkg-refresh',
      selectedAddOns: ['addon-wax'],
      selectedAddressId: 'addr-home',
      customAddress: '',
      customCoords: [24.8190, 46.6520],
      selectedStationId: 'st-1',
      parkingNotes: 'السيارة أمام بوابة الفيلا',
      selectedDate: 'today',
      selectedTimeSlot: 'slot-now',
      appliedPromo: null,
      discountRate: 0,
      paymentMethod: 'apple_pay',
      notes: ''
    },

    // Live Tracking Simulation State
    tracking: {
      orderId: 'OMN-88421',
      currentStep: 3, // 0 to 4
      captainMoving: true,
      captainCoords: [24.8250, 46.6590],
      userCoords: [24.8190, 46.6520],
      etaMinutes: 11,
      chatMessages: [
        { sender: 'captain', time: '04:15 م', text: 'السلام عليكم أخي ماجد، أنا الكابتن فهد وفي طريقي إليك الآن بالعدة المجهزة.' },
        { sender: 'user', time: '04:16 م', text: 'أهلاً كابتن فهد، حياك الله، السيارة جاهزة أمام المظلة.' },
        { sender: 'captain', time: '04:18 م', text: 'ممتاز، معي ماء مقطر نقي ومواد حماية النانو. سأبدأ فور وصولي.' }
      ]
    },

    // Maps instances
    maps: {
      nearbyMap: null,
      bookingMap: null,
      trackingMap: null,
      trackingCaptainMarker: null,
      trackingRouteLine: null
    }
  };

  // Expose state for debugging
  window.omnexaState = state;

  // Translation Dictionaries
  const i18n = {
    ar: {
      brand_name: "أومنيسكا لغسيل السيارات",
      tagline: "عناية فائقة بسيارتك عند باب بيتك ومقر عملك",
      nav_home: "الرئيسية",
      nav_services: "الباقات والأسعار",
      nav_nearby: "المغاسل والكباتن",
      nav_track: "تتبع طلبي",
      nav_orders: "طلباتي السابقة",
      nav_garage: "سياراتي",
      nav_profile: "حسابي",
      book_now: "احجز غسيل الآن",
      switch_role: "تبديل الحساب التجريبي",
      role_customer: "عميل: ماجد العتيبي",
      role_captain: "كابتن: فهد الدوسري",
      role_admin: "إدارة: سارة المنصور",
      doorstep_service: "غسيل متنقل (عند موقعك)",
      station_service: "مغاسل الشركاء (محطات قريبة)",
      sar: "ر.س",
      mins: "دقيقة",
      km: "كم",
      included: "المزايا المشمولة في الباقة:",
      addons_title: "خدمات إضافية مميزة",
      select_vehicle: "اختر نوع وفئة سيارتك",
      select_package: "اختر باقة الغسيل المثالية",
      select_location: "حدد موقع السيارة والوقت",
      order_summary: "ملخص الحساب والفاتورة",
      confirm_booking: "تأكيد الحجز والدفع التجريبي",
      back: "السابق",
      next: "المتابعة",
      apply_coupon: "تطبيق الكوبون",
      coupon_placeholder: "أدخل الكود (جرب OMNEXA20)",
      coupon_applied: "تم تطبيق خصم 20% بنجاح!",
      coupon_invalid: "الكوبون غير صحيح",
      subtotal: "المجموع الفرعي",
      vat_label: "ضريبة القيمة المضافة (15%)",
      total_amount: "الإجمالي النهائي",
      payment_method: "طريقة الدفع",
      pay_mada: "مدى (Mada)",
      pay_apple: "Apple Pay",
      pay_card: "بطاقة ائتمانية",
      pay_cash: "نقداً عند إتمام الخدمة",
      booking_success_title: "تم تأكيد حجزك بنجاح!",
      booking_success_desc: "تم تعيين أقرب شاحنة خدمة مجهزة إليك، يمكنك متابعة الكابتن مباشرة عبر الخريطة.",
      track_live_btn: "تتبع حالة الطلب بالخريطة",
      view_orders_btn: "عرض سجل الطلبات",
      order_status_0: "تم تأكيد الحجز",
      order_status_1: "تم تعيين الكابتن",
      order_status_2: "الكابتن في الطريق إليك",
      order_status_3: "جاري الغسيل والمعالجة",
      order_status_4: "تم اكتمال الخدمة بنجاح",
      captain_info: "بيانات كابتن الخدمة",
      contact_captain: "اتصال بالكابتن",
      chat_captain: "محادثة مباشرة",
      before_after_title: "صور فحص السيارة (قبل وبعد الغسيل)",
      drag_slider_hint: "اسحب المؤشر لمقارنة نظافة ولمعان السيارة قبل وبعد الخدمة",
      sim_view_toggle: "محاكي شاشة الجوال",
      desktop_view_toggle: "عرض سطح المكتب الكامل",
      logout: "تسجيل الخروج",
      login: "تسجيل الدخول",
      add_car: "إضافة سيارة جديدة",
      reorder: "إعادة الطلب",
      view_receipt: "عرض الفاتورة الضريبية"
    },
    en: {
      brand_name: "Omnexa Wash",
      tagline: "Premium car care right at your doorstep & workspace",
      nav_home: "Home",
      nav_services: "Packages & Pricing",
      nav_nearby: "Nearby Vans & Stations",
      nav_track: "Track Order",
      nav_orders: "My Orders",
      nav_garage: "My Garage",
      nav_profile: "Profile",
      book_now: "Book Wash Now",
      switch_role: "Switch Demo Account",
      role_customer: "Customer: Majed",
      role_captain: "Captain: Fahad",
      role_admin: "Admin: Sarah",
      doorstep_service: "Doorstep Wash (At Your Location)",
      station_service: "Partner Car Wash Stations",
      sar: "SAR",
      mins: "mins",
      km: "km",
      included: "Included in this package:",
      addons_title: "Premium Add-ons",
      select_vehicle: "Select Your Vehicle",
      select_package: "Choose Wash Package",
      select_location: "Set Location & Timing",
      order_summary: "Order Summary & Invoice",
      confirm_booking: "Confirm & Mock Checkout",
      back: "Back",
      next: "Continue",
      apply_coupon: "Apply Promo",
      coupon_placeholder: "Enter code (try OMNEXA20)",
      coupon_applied: "20% discount applied successfully!",
      coupon_invalid: "Invalid promo code",
      subtotal: "Subtotal",
      vat_label: "VAT (15%)",
      total_amount: "Grand Total",
      payment_method: "Payment Method",
      pay_mada: "Mada Debit Card",
      pay_apple: "Apple Pay",
      pay_card: "Credit Card",
      pay_cash: "Cash upon service",
      booking_success_title: "Booking Confirmed Successfully!",
      booking_success_desc: "The nearest equipped mobile service van is assigned to you. Track the captain live on the map.",
      track_live_btn: "Track Order Live",
      view_orders_btn: "View Order History",
      order_status_0: "Booking Confirmed",
      order_status_1: "Captain Assigned",
      order_status_2: "Captain on the Way",
      order_status_3: "Washing In Progress",
      order_status_4: "Service Completed",
      captain_info: "Service Captain Details",
      contact_captain: "Call Captain",
      chat_captain: "Live Chat",
      before_after_title: "Quality Check Photos (Before & After)",
      drag_slider_hint: "Drag the slider to compare shine before and after service",
      sim_view_toggle: "Mobile Simulator View",
      desktop_view_toggle: "Desktop Full View",
      logout: "Log Out",
      login: "Sign In",
      add_car: "Add New Vehicle",
      reorder: "Reorder Wash",
      view_receipt: "View Tax Invoice"
    }
  };

  // Helper: Get localized string
  function t(key) {
    return (i18n[state.lang] && i18n[state.lang][key]) || key;
  }

  // Toast Notification System
  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    const bgClass = type === 'success' ? 'bg-slate-900 text-white border-l-4 border-emerald-500' :
                    type === 'error' ? 'bg-red-900 text-white border-l-4 border-red-500' :
                    'bg-sky-950 text-white border-l-4 border-sky-400';
    
    toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-2 opacity-0 text-sm font-medium z-50 ${bgClass}`;
    toast.innerHTML = `
      <span class="w-2 h-2 rounded-full ${type === 'success' ? 'bg-emerald-400' : 'bg-sky-400'} animate-ping"></span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
      toast.classList.add('opacity-0', '-translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // Calculate pricing breakdown
  function calculateTotal() {
    const pkg = OMNEXA_DATA.packages.find(p => p.id === state.booking.selectedPackageId) || OMNEXA_DATA.packages[0];
    const veh = OMNEXA_DATA.vehicleTypes.find(v => v.id === state.booking.selectedVehicleType) || OMNEXA_DATA.vehicleTypes[0];
    
    const basePrice = pkg.price_base * veh.price_multiplier;
    
    let addOnsTotal = 0;
    state.booking.selectedAddOns.forEach(addOnId => {
      const item = OMNEXA_DATA.addOns.find(a => a.id === addOnId);
      if (item) addOnsTotal += item.price;
    });

    const subtotalBeforeDiscount = basePrice + addOnsTotal;
    const discountAmount = subtotalBeforeDiscount * state.booking.discountRate;
    const taxableAmount = Math.max(0, subtotalBeforeDiscount - discountAmount);
    const vatAmount = taxableAmount * OMNEXA_DATA.brand.vat_rate;
    const grandTotal = taxableAmount + vatAmount;

    return {
      basePrice: Math.round(basePrice * 100) / 100,
      addOnsTotal: Math.round(addOnsTotal * 100) / 100,
      subtotalBeforeDiscount: Math.round(subtotalBeforeDiscount * 100) / 100,
      discountAmount: Math.round(discountAmount * 100) / 100,
      taxableAmount: Math.round(taxableAmount * 100) / 100,
      vatAmount: Math.round(vatAmount * 100) / 100,
      grandTotal: Math.round(grandTotal * 100) / 100,
      pkg,
      veh
    };
  }

  // Switch Active View
  function navigateTo(viewId) {
    state.currentView = viewId;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update nav links
    document.querySelectorAll('[data-nav-target]').forEach(el => {
      if (el.getAttribute('data-nav-target') === viewId) {
        el.classList.add('text-sky-600', 'font-bold', 'bg-sky-50');
        el.classList.remove('text-slate-600', 'hover:bg-slate-50');
      } else {
        el.classList.remove('text-sky-600', 'font-bold', 'bg-sky-50');
        el.classList.add('text-slate-600', 'hover:bg-slate-50');
      }
    });

    // Toggle view containers
    document.querySelectorAll('.view-section').forEach(section => {
      section.classList.add('hidden');
    });

    const activeSection = document.getElementById(`view-${viewId}`);
    if (activeSection) {
      activeSection.classList.remove('hidden');
    }

    // Initialize or resize maps when views become visible
    if (viewId === 'nearby') {
      setTimeout(initNearbyMap, 150);
    } else if (viewId === 'booking') {
      renderBookingWizard();
      setTimeout(initBookingMap, 150);
    } else if (viewId === 'tracking') {
      renderTrackingView();
      setTimeout(initTrackingMap, 150);
    } else if (viewId === 'orders') {
      renderOrdersView();
    } else if (viewId === 'garage') {
      renderGarageView();
    } else if (viewId === 'profile') {
      renderProfileView();
    }

    // Refresh feather/lucide icons if available
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Switch Language
  function setLanguage(lang) {
    state.lang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const langToggleBtn = document.getElementById('langToggleText');
    if (langToggleBtn) {
      langToggleBtn.textContent = lang === 'ar' ? 'English' : 'العربية';
    }

    // Re-render current view with new language
    renderRoleBanner();
    navigateTo(state.currentView);
  }

  // Switch Demo Role
  function setRole(roleId) {
    state.currentRole = roleId;
    const account = OMNEXA_DATA.demoAccounts.find(a => a.id === roleId);
    
    renderRoleBanner();
    showToast(`${t('switch_role')}: ${state.lang === 'ar' ? account.name_ar : account.name_en}`);

    // If role is captain, navigate to tracking or captain duty
    if (roleId === 'captain') {
      navigateTo('tracking');
    } else if (roleId === 'admin') {
      navigateTo('nearby');
    } else {
      navigateTo(state.currentView);
    }
  }

  // Render Top Role Switcher Banner
  function renderRoleBanner() {
    const banner = document.getElementById('demoRoleBar');
    if (!banner) return;

    const currentAcc = OMNEXA_DATA.demoAccounts.find(a => a.id === state.currentRole);

    banner.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between text-xs font-medium text-slate-200 gap-2">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-400/30">
            تجربة تفاعلية نشطة (Live Demo)
          </span>
          <span class="hidden sm:inline text-slate-400">|</span>
          <span class="text-slate-300">${state.lang === 'ar' ? 'أنت تتصفح بحساب:' : 'Active Demo User:'} 
            <strong class="text-sky-300">${state.lang === 'ar' ? currentAcc.name_ar : currentAcc.name_en}</strong> 
            (${state.lang === 'ar' ? (currentAcc.tier_ar || currentAcc.role_desc_ar || 'كابتن معتمد') : (currentAcc.tier_en || currentAcc.role_desc_en || 'Certified Captain')})
          </span>
        </div>
        
        <div class="flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-xl border border-slate-700/60">
          <span class="text-slate-400 px-2 hidden md:inline">${state.lang === 'ar' ? 'تبديل الدور:' : 'Switch Role:'}</span>
          ${OMNEXA_DATA.demoAccounts.map(acc => `
            <button onclick="window.OmnexaApp.setRole('${acc.id}')" 
              class="px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${state.currentRole === acc.id ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'}">
              <img src="${acc.avatar}" class="w-4 h-4 rounded-full object-cover">
              <span>${state.lang === 'ar' ? (acc.id === 'customer' ? 'عميل' : acc.id === 'captain' ? 'كابتن غسيل' : 'مديرة النظام') : (acc.id === 'customer' ? 'Customer' : acc.id === 'captain' ? 'Washer' : 'Admin')}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Initialize Nearby Map (Leaflet)
  function initNearbyMap() {
    const mapContainer = document.getElementById('nearbyMapContainer');
    if (!mapContainer || !window.L) return;

    if (state.maps.nearbyMap) {
      state.maps.nearbyMap.invalidateSize();
      return;
    }

    // Default center: Riyadh (Al-Narjis / Hittin area)
    const map = L.map('nearbyMapContainer', {
      zoomControl: true,
      scrollWheelZoom: false
    }).setView([24.7800, 46.6500], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add Mobile Vans markers with animated radar
    OMNEXA_DATA.captains.forEach(captain => {
      const vanIcon = L.divIcon({
        className: 'custom-van-marker',
        html: `
          <div class="relative flex items-center justify-center">
            <div class="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-xl border-2 border-white radar-badge">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <span class="absolute -bottom-5 bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">${state.lang === 'ar' ? captain.name_ar : captain.name_en}</span>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const marker = L.marker(captain.coords, { icon: vanIcon }).addTo(map);
      marker.bindPopup(`
        <div class="p-2 text-right">
          <div class="flex items-center gap-2 mb-1">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <strong class="text-sm font-bold">${state.lang === 'ar' ? captain.name_ar : captain.name_en}</strong>
          </div>
          <p class="text-xs text-slate-600 mb-1">${state.lang === 'ar' ? captain.zone_ar : captain.zone_en}</p>
          <div class="text-xs text-sky-700 font-semibold mb-2">⭐ ${captain.rating} (${state.lang === 'ar' ? 'فان مجهز بالكامل' : 'Fully equipped mobile van'})</div>
          <button onclick="window.OmnexaApp.quickBookWithCaptain('${captain.id}')" class="w-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow">
            ${state.lang === 'ar' ? 'طلب هذا الكابتن الآن' : 'Request This Captain'}
          </button>
        </div>
      `);
    });

    // Add Partner Stations
    OMNEXA_DATA.stations.forEach((st, idx) => {
      // Offset coords slightly for demo
      const stCoords = [24.7300 + (idx * 0.04), 46.6700 - (idx * 0.03)];
      const stIcon = L.divIcon({
        className: 'custom-st-marker',
        html: `
          <div class="w-9 h-9 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shadow-xl border-2 border-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const marker = L.marker(stCoords, { icon: stIcon }).addTo(map);
      marker.bindPopup(`
        <div class="p-2 text-right">
          <strong class="text-sm font-bold text-slate-900">${state.lang === 'ar' ? st.name_ar : st.name_en}</strong>
          <p class="text-xs text-slate-600 my-1">${state.lang === 'ar' ? st.address_ar : st.address_en}</p>
          <div class="text-xs text-amber-600 font-bold mb-2">⭐ ${st.rating} (${st.reviews_count} ${state.lang === 'ar' ? 'تقييم' : 'reviews'})</div>
          <button onclick="window.OmnexaApp.quickBookStation('${st.id}')" class="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow">
            ${state.lang === 'ar' ? 'حجز مسار بالمغسلة' : 'Book Bay at Station'}
          </button>
        </div>
      `);
    });

    state.maps.nearbyMap = map;
  }

  // Initialize Booking Map Picker
  function initBookingMap() {
    const container = document.getElementById('bookingMapPicker');
    if (!container || !window.L) return;

    if (state.maps.bookingMap) {
      state.maps.bookingMap.invalidateSize();
      return;
    }

    const defaultCoords = state.booking.customCoords;
    const map = L.map('bookingMapPicker', {
      zoomControl: true,
      scrollWheelZoom: false
    }).setView(defaultCoords, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    const pinIcon = L.divIcon({
      className: 'pin-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl border-2 border-white animate-bounce">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 38]
    });

    const marker = L.marker(defaultCoords, { icon: pinIcon, draggable: true }).addTo(map);

    marker.on('dragend', function(e) {
      const pos = e.target.getLatLng();
      state.booking.customCoords = [pos.lat, pos.lng];
      showToast(state.lang === 'ar' ? 'تم تحديث موقع وقوف السيارة بنجاح' : 'Car parked location updated');
    });

    map.on('click', function(e) {
      marker.setLatLng(e.latlng);
      state.booking.customCoords = [e.latlng.lat, e.latlng.lng];
      showToast(state.lang === 'ar' ? 'تم تحديد الموقع' : 'Location pinned');
    });

    state.maps.bookingMap = map;
  }

  // Render Booking Wizard
  function renderBookingWizard() {
    const pricing = calculateTotal();
    
    // Update summary pane on the side
    const summaryCard = document.getElementById('bookingSummaryPane');
    if (summaryCard) {
      summaryCard.innerHTML = `
        <div class="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 sticky top-28">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 class="font-bold text-slate-900 text-lg">${state.lang === 'ar' ? 'ملخص الحجز' : 'Booking Summary'}</h3>
              <p class="text-xs text-slate-500">${state.lang === 'ar' ? 'تفاصيل الطلب والخدمة المحددة' : 'Selected package & breakdown'}</p>
            </div>
            <span class="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <i data-lucide="receipt"></i>
            </span>
          </div>

          <div class="py-4 space-y-3 text-sm">
            <div class="flex justify-between items-center text-slate-600">
              <span>${state.lang === 'ar' ? 'الباقة الأساسية:' : 'Base Package:'}</span>
              <strong class="text-slate-900">${state.lang === 'ar' ? pricing.pkg.name_ar : pricing.pkg.name_en}</strong>
            </div>

            <div class="flex justify-between items-center text-slate-600">
              <span>${state.lang === 'ar' ? 'فئة السيارة:' : 'Vehicle Category:'}</span>
              <span class="font-semibold text-slate-800">${state.lang === 'ar' ? pricing.veh.name_ar : pricing.veh.name_en} (${pricing.veh.price_multiplier}x)</span>
            </div>

            <div class="flex justify-between items-center text-slate-600">
              <span>${state.lang === 'ar' ? 'سعر الغسيل الأساسي:' : 'Base Wash Price:'}</span>
              <span class="font-bold text-slate-900">${pricing.basePrice} ${t('sar')}</span>
            </div>

            ${state.booking.selectedAddOns.length > 0 ? `
              <div class="pt-2 border-t border-slate-100">
                <span class="text-xs font-bold text-slate-500 block mb-2">${state.lang === 'ar' ? 'الإضافات المختارة:' : 'Selected Add-ons:'}</span>
                ${state.booking.selectedAddOns.map(addOnId => {
                  const item = OMNEXA_DATA.addOns.find(a => a.id === addOnId);
                  return item ? `
                    <div class="flex justify-between text-xs text-slate-600 mb-1">
                      <span>+ ${state.lang === 'ar' ? item.name_ar : item.name_en}</span>
                      <span class="font-semibold">${item.price} ${t('sar')}</span>
                    </div>
                  ` : '';
                }).join('')}
              </div>
            ` : ''}

            ${pricing.discountAmount > 0 ? `
              <div class="flex justify-between items-center text-emerald-600 font-bold bg-emerald-50 px-3 py-2 rounded-xl">
                <span>${state.lang === 'ar' ? 'كوبون الخصم (20%):' : 'Promo Discount (20%):'}</span>
                <span>-${pricing.discountAmount} ${t('sar')}</span>
              </div>
            ` : ''}

            <div class="pt-3 border-t border-slate-100 space-y-2">
              <div class="flex justify-between text-xs text-slate-500">
                <span>${state.lang === 'ar' ? 'الخاضع للضريبة:' : 'Taxable Amount:'}</span>
                <span>${pricing.taxableAmount} ${t('sar')}</span>
              </div>
              <div class="flex justify-between text-xs text-slate-500">
                <span>${t('vat_label')}</span>
                <span>${pricing.vatAmount} ${t('sar')}</span>
              </div>
              <div class="flex justify-between items-center text-lg font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>${t('total_amount')}</span>
                <span class="text-sky-600 text-2xl">${pricing.grandTotal} <span class="text-sm font-bold text-slate-500">${t('sar')}</span></span>
              </div>
            </div>
          </div>

          <!-- Coupon Input -->
          <div class="pt-4 border-t border-slate-100">
            <label class="block text-xs font-semibold text-slate-600 mb-1.5">${state.lang === 'ar' ? 'هل لديك كوبون خصم؟' : 'Have a Promo Code?'}</label>
            <div class="flex gap-2">
              <input type="text" id="couponCodeInput" placeholder="${t('coupon_placeholder')}" 
                value="${state.booking.appliedPromo || ''}"
                class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono uppercase focus:ring-2 focus:ring-sky-500 focus:outline-none">
              <button onclick="window.OmnexaApp.applyCoupon()" class="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition">
                ${t('apply_coupon')}
              </button>
            </div>
          </div>

          <!-- Quick Checkout Trigger -->
          <button onclick="window.OmnexaApp.submitBooking()" class="w-full mt-6 bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-sky-600/25 flex items-center justify-center gap-3 transition transform active:scale-95">
            <span>${t('confirm_booking')}</span>
            <i data-lucide="arrow-left" class="${state.lang === 'ar' ? '' : 'rotate-180'}"></i>
          </button>
          
          <div class="mt-4 flex items-center justify-center gap-3 text-slate-400 text-xs">
            <span class="flex items-center gap-1"><i data-lucide="shield-check" class="w-4 h-4 text-emerald-500"></i> ${state.lang === 'ar' ? 'ضمان الرضا 100%' : '100% Satisfaction Guarantee'}</span>
            <span>•</span>
            <span>${state.lang === 'ar' ? 'إلغاء مجاني حتى 1 ساعة' : 'Free Cancellation'}</span>
          </div>
        </div>
      `;
    }

    if (window.lucide) lucide.createIcons();
  }

  // Booking Form Actions
  function setServiceType(type) {
    state.booking.serviceType = type;
    document.querySelectorAll('.btn-service-type').forEach(btn => {
      if (btn.dataset.type === type) {
        btn.classList.add('bg-sky-600', 'text-white', 'shadow-lg');
        btn.classList.remove('bg-white', 'text-slate-700');
      } else {
        btn.classList.remove('bg-sky-600', 'text-white', 'shadow-lg');
        btn.classList.add('bg-white', 'text-slate-700');
      }
    });

    const doorstepSection = document.getElementById('doorstepLocationSection');
    const stationSection = document.getElementById('stationPickerSection');
    if (doorstepSection && stationSection) {
      if (type === 'doorstep') {
        doorstepSection.classList.remove('hidden');
        stationSection.classList.add('hidden');
      } else {
        doorstepSection.classList.add('hidden');
        stationSection.classList.remove('hidden');
      }
    }

    renderBookingWizard();
  }

  function selectVehicleType(vehId) {
    state.booking.selectedVehicleType = vehId;
    document.querySelectorAll('.vehicle-card').forEach(card => {
      if (card.dataset.id === vehId) {
        card.classList.add('active', 'border-sky-600');
      } else {
        card.classList.remove('active', 'border-sky-600');
      }
    });
    renderBookingWizard();
  }

  function selectPackage(pkgId) {
    state.booking.selectedPackageId = pkgId;
    document.querySelectorAll('.package-card').forEach(card => {
      if (card.dataset.id === pkgId) {
        card.classList.add('active', 'ring-2', 'ring-sky-500');
      } else {
        card.classList.remove('active', 'ring-2', 'ring-sky-500');
      }
    });
    renderBookingWizard();
  }

  function toggleAddOn(addonId) {
    const idx = state.booking.selectedAddOns.indexOf(addonId);
    if (idx > -1) {
      state.booking.selectedAddOns.splice(idx, 1);
    } else {
      state.booking.selectedAddOns.push(addonId);
    }
    
    // Toggle card visually
    const card = document.querySelector(`.addon-card[data-id="${addonId}"]`);
    if (card) {
      card.classList.toggle('active');
    }

    renderBookingWizard();
  }

  function applyCoupon() {
    const input = document.getElementById('couponCodeInput');
    const code = (input ? input.value : '').trim().toUpperCase();

    if (code === 'OMNEXA20' || code === 'WASH20') {
      state.booking.appliedPromo = code;
      state.booking.discountRate = 0.20;
      showToast(t('coupon_applied'));
    } else if (code === '') {
      state.booking.appliedPromo = null;
      state.booking.discountRate = 0;
      showToast(state.lang === 'ar' ? 'تمت إزالة الكوبون' : 'Promo removed', 'info');
    } else {
      showToast(t('coupon_invalid'), 'error');
    }

    renderBookingWizard();
  }

  // Submit Booking & Trigger Live Simulation
  function submitBooking() {
    const pricing = calculateTotal();
    const newOrderId = `OMN-${Math.floor(10000 + Math.random() * 90000)}`;
    
    // Add to active orders
    const newOrder = {
      id: newOrderId,
      date_ar: "اليوم، 31 أكتوبر 2026",
      date_en: "Today, Oct 31, 2026",
      time: "الآن (فوري)",
      status: "assigned",
      status_step: 1,
      status_label_ar: "تم تعيين الكابتن وفي طريقه إليك",
      status_label_en: "Captain Assigned & En Route",
      service_type: state.booking.serviceType,
      package_name_ar: pricing.pkg.name_ar,
      package_name_en: pricing.pkg.name_en,
      vehicle: `${state.booking.selectedVehicleType.toUpperCase()} - ${OMNEXA_DATA.userGarage[0].plate_ar}`,
      location_ar: "حي النرجس، الرياض",
      location_en: "Al-Narjis, Riyadh",
      captain_name_ar: "فهد الدوسري",
      captain_name_en: "Fahad Al-Dossari",
      captain_phone: "+966 50 111 2233",
      captain_rating: 4.96,
      captain_avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      total_sar: pricing.grandTotal,
      payment_method: state.booking.paymentMethod,
      before_photo: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&auto=format&fit=crop&q=80",
      after_photo: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80"
    };

    OMNEXA_DATA.ordersHistory.unshift(newOrder);
    state.tracking.orderId = newOrderId;
    state.tracking.currentStep = 1;

    // Show Celebration Modal
    const modal = document.getElementById('bookingSuccessModal');
    if (modal) {
      document.getElementById('modalBookingId').textContent = `#${newOrderId}`;
      document.getElementById('modalBookingTotal').textContent = `${pricing.grandTotal} ${t('sar')}`;
      modal.classList.remove('hidden');
    } else {
      showToast(t('booking_success_title'));
      navigateTo('tracking');
    }
  }

  // Initialize Tracking Map
  function initTrackingMap() {
    const container = document.getElementById('trackingMapContainer');
    if (!container || !window.L) return;

    if (state.maps.trackingMap) {
      state.maps.trackingMap.invalidateSize();
      return;
    }

    const userLoc = state.tracking.userCoords;
    const captainLoc = state.tracking.captainCoords;

    const map = L.map('trackingMapContainer', {
      zoomControl: true,
      scrollWheelZoom: false
    }).setView(userLoc, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    // User Destination Pin
    const homeIcon = L.divIcon({
      className: 'user-pin-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-2xl border-2 border-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          </div>
          <span class="absolute -bottom-6 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">${state.lang === 'ar' ? 'موقع سيارتك' : 'Your Car'}</span>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });
    L.marker(userLoc, { icon: homeIcon }).addTo(map);

    // Captain Van Marker
    const vanIcon = L.divIcon({
      className: 'captain-tracking-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-2xl border-4 border-white radar-badge">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <span class="absolute -bottom-6 bg-sky-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow whitespace-nowrap">${state.lang === 'ar' ? 'كابتن أومنيسكا' : 'Captain Van'}</span>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 24]
    });
    const captainMarker = L.marker(captainLoc, { icon: vanIcon }).addTo(map);
    state.maps.trackingCaptainMarker = captainMarker;

    // Draw route polyline between captain and user
    const routeLine = L.polyline([captainLoc, [24.8210, 46.6560], userLoc], {
      color: '#0284c7',
      weight: 4,
      dashArray: '8, 8',
      opacity: 0.8
    }).addTo(map);
    state.maps.trackingRouteLine = routeLine;

    // Auto-fit bounds
    map.fitBounds([userLoc, captainLoc], { padding: [50, 50] });
    state.maps.trackingMap = map;

    // Start Live Captain Movement Simulator
    startCaptainMovementSimulator();
  }

  // Simulate Captain Moving on Map
  let movementInterval = null;
  function startCaptainMovementSimulator() {
    if (movementInterval) clearInterval(movementInterval);

    movementInterval = setInterval(() => {
      if (!state.maps.trackingCaptainMarker || state.currentView !== 'tracking') return;

      const cur = state.maps.trackingCaptainMarker.getLatLng();
      const target = state.tracking.userCoords;

      // Small step towards user
      const newLat = cur.lat + (target[0] - cur.lat) * 0.08;
      const newLng = cur.lng + (target[1] - cur.lng) * 0.08;

      state.maps.trackingCaptainMarker.setLatLng([newLat, newLng]);

      // Decrement ETA if still on the way
      if (state.tracking.etaMinutes > 2 && state.tracking.currentStep <= 2) {
        state.tracking.etaMinutes -= 1;
        const etaBadge = document.getElementById('trackingEtaMinutes');
        if (etaBadge) etaBadge.textContent = `${state.tracking.etaMinutes} ${t('mins')}`;
      }
    }, 4000);
  }

  // Render Live Tracking Screen
  function renderTrackingView() {
    const order = OMNEXA_DATA.ordersHistory.find(o => o.id === state.tracking.orderId) || OMNEXA_DATA.ordersHistory[0];
    const step = state.tracking.currentStep;

    const trackerContainer = document.getElementById('trackingStatusSteps');
    if (!trackerContainer) return;

    const steps = [
      { id: 0, title_ar: "تم تأكيد الحجز", title_en: "Booking Confirmed", desc_ar: "تم استلام الطلب وتجهيز الجدول", desc_en: "Order received & scheduled", icon: "check-circle" },
      { id: 1, title_ar: "تم تعيين الكابتن", title_en: "Captain Assigned", desc_ar: "الكابتن فهد الدوسري (تويوتا مجهزة)", desc_en: "Captain Fahad (Equipped Hilux)", icon: "user-check" },
      { id: 2, title_ar: "في الطريق إليك", title_en: "On The Way", desc_ar: "المسافة 1.4 كم • متبقي 11 دقيقة", desc_en: "Distance 1.4 km • ETA 11 mins", icon: "navigation" },
      { id: 3, title_ar: "جاري الغسيل والمعالجة", title_en: "Washing In Progress", desc_ar: "رغوة ثلجية + بخار + تنظيف مقصورة", desc_en: "Snow foam + steam + cabin detail", icon: "droplet" },
      { id: 4, title_ar: "تم اكتمال الخدمة", title_en: "Service Completed", desc_ar: "السيارة جاهزة ولامعة بنسبة 100%", desc_en: "Vehicle pristine & inspection passed", icon: "award" }
    ];

    trackerContainer.innerHTML = steps.map((s, idx) => {
      const isPast = idx < step;
      const isCurrent = idx === step;
      const isFuture = idx > step;

      const circleClass = isCurrent ? 'bg-sky-600 text-white ring-4 ring-sky-100 shadow-lg animate-pulse' :
                          isPast ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 border border-slate-200';

      return `
        <div class="relative flex items-start gap-4">
          ${idx < steps.length - 1 ? `
            <div class="absolute ${state.lang === 'ar' ? 'right-5' : 'left-5'} top-10 bottom-0 w-0.5 ${isPast ? 'bg-emerald-500' : 'bg-slate-200'}"></div>
          ` : ''}
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 ${circleClass}">
            <i data-lucide="${s.icon}" class="w-5 h-5"></i>
          </div>
          <div class="flex-1 pb-6">
            <div class="flex items-center justify-between">
              <h4 class="font-bold text-sm ${isCurrent ? 'text-sky-600' : isPast ? 'text-slate-900' : 'text-slate-400'}">
                ${state.lang === 'ar' ? s.title_ar : s.title_en}
              </h4>
              ${isCurrent ? `
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">
                  ${state.lang === 'ar' ? 'المرحلة الحالية' : 'In Progress'}
                </span>
              ` : isPast ? `
                <span class="text-emerald-600 text-xs font-semibold flex items-center gap-1">
                  <i data-lucide="check" class="w-3.5 h-3.5"></i> ${state.lang === 'ar' ? 'تم' : 'Done'}
                </span>
              ` : ''}
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${state.lang === 'ar' ? s.desc_ar : s.desc_en}</p>
          </div>
        </div>
      `;
    }).join('');

    // Setup interactive Before/After photo comparison slider
    setupBeforeAfterSlider();

    if (window.lucide) lucide.createIcons();
  }

  // Setup Before/After Slider
  function setupBeforeAfterSlider() {
    const handle = document.getElementById('baSliderHandle');
    const overlay = document.getElementById('baSliderOverlay');
    const container = document.getElementById('baSliderContainer');
    if (!handle || !overlay || !container) return;

    let isDragging = false;

    function updateSlider(xPos) {
      const rect = container.getBoundingClientRect();
      let pos = (xPos - rect.left) / rect.width;
      if (pos < 0.05) pos = 0.05;
      if (pos > 0.95) pos = 0.95;

      const percent = pos * 100;
      overlay.style.width = `${percent}%`;
      handle.style.left = `${percent}%`;
    }

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (isDragging) updateSlider(e.clientX);
    });

    // Touch support for mobile
    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) updateSlider(e.touches[0].clientX);
    });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches[0]) updateSlider(e.touches[0].clientX);
    });
  }

  // Step Simulation Controller for Demo Testing
  function advanceTrackingStep(step) {
    state.tracking.currentStep = step;
    renderTrackingView();
    showToast(`${state.lang === 'ar' ? 'تم تحديث مرحلة الطلب إلى:' : 'Order status updated:'} ${t('order_status_' + step)}`);
  }

  // Render Past Orders View
  function renderOrdersView() {
    const list = document.getElementById('ordersListContainer');
    if (!list) return;

    list.innerHTML = OMNEXA_DATA.ordersHistory.map(order => `
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div class="flex items-center gap-3">
            <span class="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-black text-sm">
              <i data-lucide="car"></i>
            </span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-slate-900 text-base">#${order.id}</h4>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${order.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-sky-50 text-sky-700 border border-sky-200 animate-pulse'}">
                  ${state.lang === 'ar' ? order.status_label_ar : order.status_label_en}
                </span>
              </div>
              <p class="text-xs text-slate-500 mt-0.5">${state.lang === 'ar' ? order.date_ar : order.date_en} • ${order.time}</p>
            </div>
          </div>
          <div class="text-right">
            <span class="text-xs text-slate-400 block">${state.lang === 'ar' ? 'قيمة الطلب' : 'Total'}</span>
            <strong class="text-slate-900 text-lg font-black">${order.total_sar} ${t('sar')}</strong>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 text-xs">
          <div>
            <span class="text-slate-400 block mb-1">${state.lang === 'ar' ? 'الباقة:' : 'Package:'}</span>
            <span class="font-bold text-slate-800">${state.lang === 'ar' ? order.package_name_ar : order.package_name_en}</span>
          </div>
          <div>
            <span class="text-slate-400 block mb-1">${state.lang === 'ar' ? 'السيارة:' : 'Vehicle:'}</span>
            <span class="font-bold text-slate-800">${order.vehicle}</span>
          </div>
          <div>
            <span class="text-slate-400 block mb-1">${state.lang === 'ar' ? 'الموقع والكابتن:' : 'Location & Captain:'}</span>
            <span class="font-bold text-slate-800">${state.lang === 'ar' ? order.location_ar : order.location_en} (${state.lang === 'ar' ? order.captain_name_ar : order.captain_name_en})</span>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <button onclick="window.OmnexaApp.openInvoiceModal('${order.id}')" class="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition">
              <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
              <span>${t('view_receipt')}</span>
            </button>
            ${order.status === 'completed' ? `
              <button onclick="window.OmnexaApp.openRateModal('${order.id}')" class="px-3 py-1.5 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100/60 text-amber-800 text-xs font-semibold flex items-center gap-1.5 transition">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-500 text-amber-500"></i>
                <span>${state.lang === 'ar' ? 'تقييم الخدمة' : 'Rate Service'}</span>
              </button>
            ` : ''}
          </div>

          <button onclick="window.OmnexaApp.reorder('${order.id}')" class="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-sky-600/20 transition">
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
            <span>${t('reorder')}</span>
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  // Render Garage View
  function renderGarageView() {
    const list = document.getElementById('garageListContainer');
    if (!list) return;

    list.innerHTML = OMNEXA_DATA.userGarage.map(car => `
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative group hover:border-sky-300 transition">
        ${car.is_default ? `
          <span class="absolute top-4 ${state.lang === 'ar' ? 'left-4' : 'right-4'} bg-sky-100 text-sky-800 text-[10px] font-black px-2.5 py-1 rounded-full">
            ${state.lang === 'ar' ? 'السيارة الافتراضية' : 'Default Car'}
          </span>
        ` : ''}
        <div class="flex items-center gap-4 mb-4">
          <div class="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold">
            <i data-lucide="car" class="w-7 h-7"></i>
          </div>
          <div>
            <h4 class="font-black text-slate-900 text-lg">${car.make} ${car.model}</h4>
            <p class="text-xs text-slate-500">${car.year} • ${state.lang === 'ar' ? car.color_ar : car.color_en}</p>
          </div>
        </div>

        <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200/60 mb-4 flex items-center justify-between">
          <span class="text-xs text-slate-500">${state.lang === 'ar' ? 'رقم اللوحة السعودية:' : 'Saudi License Plate:'}</span>
          <span class="font-mono font-black text-slate-900 tracking-wider">${state.lang === 'ar' ? car.plate_ar : car.plate_en}</span>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="window.OmnexaApp.bookWashForCar('${car.id}')" class="flex-1 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-md shadow-sky-600/20 transition">
            ${state.lang === 'ar' ? 'طلب غسيل لهذه السيارة' : 'Book Wash for this Car'}
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  // Render Profile View
  function renderProfileView() {
    const user = OMNEXA_DATA.demoAccounts[0];
    const profileCard = document.getElementById('userProfileDetails');
    if (profileCard) {
      profileCard.innerHTML = `
        <div class="flex items-center gap-4 pb-6 border-b border-slate-100">
          <img src="${user.avatar}" class="w-20 h-20 rounded-3xl object-cover ring-4 ring-sky-100 shadow-md">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-black text-slate-900 text-xl">${state.lang === 'ar' ? user.name_ar : user.name_en}</h3>
              <span class="bg-amber-100 text-amber-800 text-xs font-black px-2.5 py-0.5 rounded-full border border-amber-200">
                ${state.lang === 'ar' ? user.tier_ar : user.tier_en}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-1">${user.email} • ${user.phone}</p>
          </div>
        </div>

        <!-- Loyalty Stamps Card -->
        <div class="my-6 p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
          <div class="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-sky-500/10 blur-2xl"></div>
          <div class="flex justify-between items-center mb-4">
            <div>
              <span class="text-xs text-sky-300 font-bold uppercase tracking-wider block">${state.lang === 'ar' ? 'بطاقة ولاء أومنيسكا' : 'Omnexa Loyalty Card'}</span>
              <h4 class="font-black text-lg">${state.lang === 'ar' ? 'اغسل 5 مرات واحصل على غسيل مجاني!' : 'Wash 5 Times, Get 1 Free!'}</h4>
            </div>
            <div class="text-right">
              <span class="text-2xl font-black text-sky-400">${user.points}</span>
              <span class="text-[10px] text-slate-300 block">${state.lang === 'ar' ? 'نقطة مكافآت' : 'Points'}</span>
            </div>
          </div>

          <!-- 5 Stamp Badges -->
          <div class="grid grid-cols-5 gap-2 my-4">
            ${[1, 2, 3, 4, 5].map(stampNum => `
              <div class="h-16 rounded-2xl border-2 ${stampNum <= 3 ? 'border-sky-400 bg-sky-500/20 text-sky-300' : 'border-dashed border-slate-700 bg-slate-800/40 text-slate-600'} flex flex-col items-center justify-center">
                <i data-lucide="${stampNum <= 3 ? 'sparkles' : 'gift'}" class="w-5 h-5 mb-1"></i>
                <span class="text-[10px] font-bold">${stampNum <= 3 ? (state.lang === 'ar' ? 'مكتمل' : 'Done') : (stampNum === 5 ? (state.lang === 'ar' ? 'هدية!' : 'Free!') : stampNum)}</span>
              </div>
            `).join('')}
          </div>
          <p class="text-xs text-slate-300 text-center">${state.lang === 'ar' ? 'متبقي لك غسيلان لفتح باقة الشامل المجانية القادمة 🎁' : '2 more washes until your free Full Refresh package 🎁'}</p>
        </div>

        <!-- Wallet and Stats -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-sky-50/60 p-4 rounded-2xl border border-sky-100">
            <span class="text-xs text-sky-800 font-semibold block mb-1">${state.lang === 'ar' ? 'رصيد المحفظة الإلكترونية' : 'Wallet Balance'}</span>
            <strong class="text-2xl font-black text-sky-950">${user.wallet_balance} ${t('sar')}</strong>
          </div>
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
            <span class="text-xs text-slate-600 font-semibold block mb-1">${state.lang === 'ar' ? 'كود الدعوة الخاص بك' : 'Your Referral Code'}</span>
            <div class="flex items-center justify-between">
              <strong class="text-lg font-mono font-black text-slate-900">OMN-MAJED</strong>
              <button onclick="window.OmnexaApp.copyReferral()" class="text-sky-600 hover:text-sky-700 text-xs font-bold underline">
                ${state.lang === 'ar' ? 'نسخ' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      `;
    }

    if (window.lucide) lucide.createIcons();
  }

  // Toggle Device Simulator Frame
  function toggleDeviceSimulator() {
    state.isMobileView = !state.isMobileView;
    const frame = document.getElementById('appSimulationWrapper');
    const toggleBtnText = document.getElementById('simToggleText');

    if (state.isMobileView) {
      frame.classList.add('mobile-device-frame', 'mx-auto', 'my-6');
      if (toggleBtnText) toggleBtnText.textContent = t('desktop_view_toggle');
      showToast(state.lang === 'ar' ? 'تم التبديل إلى محاكي شاشة الجوال' : 'Switched to Mobile Simulator View');
    } else {
      frame.classList.remove('mobile-device-frame', 'mx-auto', 'my-6');
      if (toggleBtnText) toggleBtnText.textContent = t('sim_view_toggle');
      showToast(state.lang === 'ar' ? 'تم التبديل إلى عرض سطح المكتب' : 'Switched to Full Desktop View');
    }

    // Refresh active map sizes
    if (state.maps.nearbyMap) state.maps.nearbyMap.invalidateSize();
    if (state.maps.bookingMap) state.maps.bookingMap.invalidateSize();
    if (state.maps.trackingMap) state.maps.trackingMap.invalidateSize();
  }

  // Chat with Captain Drawer / Modal
  function openChatModal() {
    const modal = document.getElementById('chatWithCaptainModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    renderChatMessages();
  }

  function closeChatModal() {
    const modal = document.getElementById('chatWithCaptainModal');
    if (modal) modal.classList.add('hidden');
  }

  function renderChatMessages() {
    const container = document.getElementById('chatMessagesContainer');
    if (!container) return;

    container.innerHTML = state.tracking.chatMessages.map(msg => `
      <div class="flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} mb-3">
        <div class="max-w-[80%] rounded-2xl px-4 py-2.5 text-xs font-medium ${msg.sender === 'user' ? 'bg-sky-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}">
          ${msg.text}
        </div>
        <span class="text-[10px] text-slate-400 mt-1 px-1">${msg.time}</span>
      </div>
    `).join('');

    container.scrollTop = container.scrollHeight;
  }

  function sendChatMessage(text) {
    if (!text || !text.trim()) return;

    const now = new Date();
    const timeStr = `${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? (state.lang === 'ar' ? 'م' : 'PM') : (state.lang === 'ar' ? 'ص' : 'AM')}`;

    state.tracking.chatMessages.push({
      sender: 'user',
      time: timeStr,
      text: text.trim()
    });

    renderChatMessages();

    // Auto simulated reply from Captain
    setTimeout(() => {
      state.tracking.chatMessages.push({
        sender: 'captain',
        time: timeStr,
        text: state.lang === 'ar' ? 'أبشر أخي الكريم، تم استلام رسالتك وأنا حريص على أدق التفاصيل.' : 'Understood sir, thanks for notifying me!'
      });
      renderChatMessages();
    }, 1500);
  }

  // Invoice Receipt Modal
  function openInvoiceModal(orderId) {
    const order = OMNEXA_DATA.ordersHistory.find(o => o.id === orderId) || OMNEXA_DATA.ordersHistory[0];
    const modal = document.getElementById('invoiceModal');
    if (!modal) return;

    document.getElementById('invOrderId').textContent = `#${order.id}`;
    document.getElementById('invDate').textContent = `${order.date_ar} • ${order.time}`;
    document.getElementById('invPackage').textContent = order.package_name_ar;
    document.getElementById('invVehicle').textContent = order.vehicle;
    document.getElementById('invSubtotal').textContent = `${Math.round((order.total_sar / 1.15) * 100) / 100} ${t('sar')}`;
    document.getElementById('invVat').textContent = `${Math.round((order.total_sar - (order.total_sar / 1.15)) * 100) / 100} ${t('sar')}`;
    document.getElementById('invTotal').textContent = `${order.total_sar} ${t('sar')}`;

    modal.classList.remove('hidden');
  }

  function closeInvoiceModal() {
    const modal = document.getElementById('invoiceModal');
    if (modal) modal.classList.add('hidden');
  }

  // Public Interface for HTML events
  window.OmnexaApp = {
    state,
    t,
    showToast,
    navigateTo,
    setLanguage,
    setRole,
    setServiceType,
    selectVehicleType,
    selectPackage,
    toggleAddOn,
    applyCoupon,
    submitBooking,
    advanceTrackingStep,
    toggleDeviceSimulator,
    openChatModal,
    closeChatModal,
    sendChatMessage,
    openInvoiceModal,
    closeInvoiceModal,
    quickBookWithCaptain: (capId) => {
      state.booking.serviceType = 'doorstep';
      navigateTo('booking');
      showToast(state.lang === 'ar' ? 'تم اختيار الكابتن المتنقل' : 'Mobile captain selected');
    },
    quickBookStation: (stId) => {
      state.booking.serviceType = 'station';
      state.booking.selectedStationId = stId;
      navigateTo('booking');
      showToast(state.lang === 'ar' ? 'تم اختيار محطة الغسيل' : 'Station selected');
    },
    reorder: (orderId) => {
      navigateTo('booking');
      showToast(state.lang === 'ar' ? 'تم تحميل تفاصيل الطلب لإعادة الحجز' : 'Order details reloaded for rebooking');
    },
    bookWashForCar: (carId) => {
      state.booking.selectedCarId = carId;
      navigateTo('booking');
    },
    copyReferral: () => {
      showToast(state.lang === 'ar' ? 'تم نسخ كود الدعوة بنجاح' : 'Referral code copied');
    },
    openRateModal: (orderId) => {
      showToast(state.lang === 'ar' ? 'شكراً لتقييمك! تم منحك 25 نقطة ولاء إضافية ⭐' : 'Thank you for your rating! 25 bonus points awarded ⭐');
    }
  };

  // On DOM Ready initialization
  document.addEventListener('DOMContentLoaded', () => {
    renderRoleBanner();
    navigateTo('home');

    // Auto-bind any data-nav-target clicks
    document.querySelectorAll('[data-nav-target]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = btn.getAttribute('data-nav-target');
        navigateTo(target);
      });
    });

    // Check URL parameters if any
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('view')) {
      navigateTo(urlParams.get('view'));
    }
  });

})();
