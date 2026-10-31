// Omnexa Wash - Data & Configuration
window.OMNEXA_DATA = {
  brand: {
    name_ar: "أومنيسكا لغسيل السيارات",
    name_en: "Omnexa Wash",
    tagline_ar: "عناية فائقة بسيارتك عند باب بيتك ومقر عملك في جميع أنحاء المملكة",
    tagline_en: "Premium mobile car care right at your doorstep and workplace in Saudi Arabia",
    support_phone: "920088991",
    support_email: "care@omnexa.sa",
    cr_number: "1010784920", // Saudi Commercial Registration
    vat_number: "310492817200003",
    currency_ar: "ر.س",
    currency_en: "SAR",
    vat_rate: 0.15
  },

  // Demo Accounts
  demoAccounts: [
    {
      id: "customer",
      role: "customer",
      name_ar: "ماجد العتيبي",
      name_en: "Majed Al-Otaibi",
      email: "majed@omnexa.sa",
      phone: "+966 55 123 4567",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      tier_ar: "عضوية ذهبية VIP",
      tier_en: "Gold VIP Member",
      points: 480,
      wallet_balance: 150
    },
    {
      id: "captain",
      role: "captain",
      name_ar: "الكابتن / فهد الدوسري",
      name_en: "Captain Fahad Al-Dossari",
      email: "fahad@omnexa.sa",
      phone: "+966 50 987 6543",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      rating: 4.95,
      completed_washes: 342,
      vehicle_desc_ar: "شاحنة خدمة متنقلة تويوتا هايلوكس مجهزة بمعدات Kärcher وخزان ماء نقي ومولد هادئ",
      vehicle_desc_en: "Mobile Service Hilux equipped with Kärcher pressure units, DI pure water & silent generator"
    },
    {
      id: "admin",
      role: "admin",
      name_ar: "سارة المنصور",
      name_en: "Sarah Al-Mansoor",
      email: "sarah@omnexa.sa",
      phone: "+966 54 321 0000",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      role_desc_ar: "مديرة عمليات المنطقة الوسطى",
      role_desc_en: "Central Region Operations Director"
    }
  ],

  // Vehicle Categories
  vehicleTypes: [
    {
      id: "sedan",
      name_ar: "سيدان",
      name_en: "Sedan",
      desc_ar: "مثل كامري، مرسيدس C/E، أكورد، النترا",
      desc_en: "E.g. Camry, Mercedes C/E, Accord, Elantra",
      price_multiplier: 1.0,
      icon: "car",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "suv",
      name_ar: "دفع رباعي / عائلية",
      name_en: "SUV / Crossover",
      desc_ar: "مثل لاندكروزر، تاهو، باترول، برادو",
      desc_en: "E.g. Land Cruiser, Tahoe, Patrol, Prado",
      price_multiplier: 1.25,
      icon: "truck",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "truck",
      name_ar: "بيك أب / شاحنة كبيرة",
      name_en: "Pickup / Large Truck",
      desc_ar: "مثل جمس سييرا، فورد F-150، هايلوكس",
      desc_en: "E.g. GMC Sierra, Ford F-150, Hilux",
      price_multiplier: 1.45,
      icon: "shield",
      image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "luxury",
      name_ar: "فارهة / كوبيه رياضية",
      name_en: "Luxury / Sport Coupe",
      desc_ar: "مثل بورش 911، فيراري، مايباخ، بنتلي",
      desc_en: "E.g. Porsche 911, Ferrari, Maybach, Bentley",
      price_multiplier: 1.35,
      icon: "zap",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&auto=format&fit=crop&q=80"
    }
  ],

  // Wash Packages
  packages: [
    {
      id: "pkg-express",
      slug: "express-clean",
      name_ar: "غسيل إكسبريس ساطع",
      name_en: "Express Shine Clean",
      badge_ar: "سريع واقتصادي",
      badge_en: "Quick & Value",
      badge_color: "bg-sky-100 text-sky-800 border-sky-200",
      price_base: 45,
      duration_minutes: 30,
      description_ar: "غسيل يدوي خارجي فائق اللمعان مع تجفيف خالي من البقع وتلميع الجنوط، مثالي للاستخدام اليومي المستعجل.",
      description_en: "Fast exterior hand wash with spot-free blow dry & tire shine, ideal for your everyday quick refresh.",
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=500&auto=format&fit=crop&q=80",
      items_ar: [
        "غسيل خارجي يدوي برغوة الثلج النشطة",
        "تنظيف وتلميع الجنوط والإطارات",
        "تجفيف بمناشف المايكروفايبر فائقة النعومة لمنع الدوائر",
        "تنظيف الزجاج الخارجي بمادة عاكسة للغبار"
      ],
      items_en: [
        "Exterior hand wash with high-density snow foam",
        "Wheel rim cleaning & tire deep shine",
        "Spot-free microfiber drying to prevent swirl marks",
        "Exterior glass streak-free treatment"
      ]
    },
    {
      id: "pkg-refresh",
      slug: "full-refresh",
      name_ar: "غسيل أومنيسكا الشامل",
      name_en: "Omnexa Full Refresh",
      badge_ar: "الأكثر طلباً ⭐",
      badge_en: "Most Popular ⭐",
      badge_color: "bg-amber-100 text-amber-800 border-amber-300",
      is_popular: true,
      price_base: 89,
      duration_minutes: 60,
      description_ar: "العناية المتكاملة داخل وخارج السيارة؛ تنظيف عميق للمقصورة وشفط الأتربة مع تعقيم الأسطح وتلميع البودي الخارجي.",
      description_en: "Complete interior & exterior care: deep cabin vacuum, dash UV conditioning, door jambs & body shine.",
      image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=500&auto=format&fit=crop&q=80",
      items_ar: [
        "جميع مزايا غسيل الإكسبريس الخارجي",
        "شفط عميق للأتربة من المقاعد، الأرضيات والشنطة",
        "مسح وتطهير الطبلون والكونسول الوسطي بمواد واقية من الشمس",
        "تنظيف وتلميع الزجاج والمرايا من الداخل والخارج",
        "غسيل دعاسات السيارة وتطهيرها",
        "تعطير فاخر بنفحات العود أو اللافندر حسب اختيارك"
      ],
      items_en: [
        "Everything in Express Shine package",
        "Deep interior vacuum (seats, carpets, trunk)",
        "Dashboard, console & door card UV wipe-down",
        "Streak-free glass inside and out",
        "Floor mat pressure wash & drying",
        "Signature luxury fragrance mist (Oud or Lavender)"
      ]
    },
    {
      id: "pkg-steam",
      slug: "pro-steam",
      name_ar: "غسيل البخار المتطور والتعقيم",
      name_en: "Pro Steam & Sanitization",
      badge_ar: "تعقيم صحي فائق",
      badge_en: "Health Grade Hygiene",
      badge_color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      price_base: 149,
      duration_minutes: 85,
      description_ar: "غسيل ببخار عالي الضغط والحرارة يقضي على 99.9% من البكتيريا والجراثيم داخل أنظمة التكييف والمقاعد دون تبليل مفرط.",
      description_en: "High-pressure thermal steam cleaning eliminating 99.9% of cabin bacteria, AC ducts & upholstery sanitization.",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=80",
      items_ar: [
        "كل ما تشمله باقة أومنيسكا الشاملة",
        "غسيل المقاعد والأرضيات بالبخار الحار المعقم",
        "تطهير فتحات التكييف ومسارات الهواء بالبخار",
        "إزالة البقع الدهنية المستعصية عن المقاعد والأبواب",
        "معالجة روائح الرطوبة والتكييف نهائياً"
      ],
      items_en: [
        "All features of Full Refresh package",
        "Thermal steam cleaning of all seats and carpets",
        "AC vent & air duct deep sanitization",
        "Stubborn stain extraction from upholstery",
        "Odor and moisture neutralization treatment"
      ]
    },
    {
      id: "pkg-ceramic",
      slug: "showroom-detail",
      name_ar: "تلميع صالة العرض ونانو سيراميك",
      name_en: "Showroom Ceramic & Detail",
      badge_ar: "فخامة استثنائية 💎",
      badge_en: "VIP Luxury Care 💎",
      badge_color: "bg-purple-100 text-purple-800 border-purple-200",
      price_base: 279,
      duration_minutes: 140,
      description_ar: "تجربة تلميع احترافية بالصلصال النقي (Clay Bar) مع طبقة حماية هيدروفوبية تمنح سيارتك لمعاناً زجاجياً فائقاً كأنها خرجت للتو من صالة العرض.",
      description_en: "Deep clay bar decontamination, machine hand wax & hydrophobic ceramic sealant delivering mirror shine.",
      image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=500&auto=format&fit=crop&q=80",
      items_ar: [
        "باقة الغسيل الشامل الداخلي والخارجي الفاخرة",
        "معالجة طلاء السيارة بالصلصال لإزالة الشوائب الدقيقة",
        "تطبيق واكس سائل عالي التركيز لحماية لمعة البودي",
        "طبقة نانو سيراميك هيدروفوبية طاردة للماء والأمطار",
        "ترطيب ومعالجة الجلد الطبيعي بمغذيات متخصصة",
        "تنظيف وتلميع حوض المحرك بمواد آمنة على الحساسات والكهرباء"
      ],
      items_en: [
        "Full Refresh interior & exterior master treatment",
        "Clay bar surface decontamination",
        "Machine hand wax and polymer seal",
        "Hydrophobic ceramic spray coating (rain repellent)",
        "Premium leather conditioner & UV protector",
        "Detailed engine bay cleaning with electrical safety"
      ]
    }
  ],

  // Add-ons
  addOns: [
    {
      id: "addon-engine",
      name_ar: "تنظيف وتلميع حوض المحرك",
      name_en: "Engine Bay Detailing",
      price: 45,
      duration_minutes: 20,
      icon: "settings",
      desc_ar: "إزالة الزيوت والأتربة بمواد آمنة تعيد مظهر المحرك كالوكالة",
      desc_en: "Degreased and dressed, safe for all electronics & sensors"
    },
    {
      id: "addon-wax",
      name_ar: "طبقة نانو واكس حماية إضافية",
      name_en: "Hydrophobic Nano Wax",
      price: 35,
      duration_minutes: 15,
      icon: "sparkles",
      desc_ar: "طبقة تزيد لمعان الطلاء وتمنع التصاق الغبار لعدة أسابيع",
      desc_en: "Protective nano layer enhancing paint depth & repelling dust"
    },
    {
      id: "addon-pet",
      name_ar: "إزالة الأتربة الصعبة وشعر الحيوانات",
      name_en: "Pet Hair & Deep Lint Removal",
      price: 30,
      duration_minutes: 20,
      icon: "feather",
      desc_ar: "فرشاة سحرية ومعدات خاصة لسحب الشعر والوبر العالق بالفرش",
      desc_en: "Specialized brushes extracting stubborn hairs and deep fibers"
    },
    {
      id: "addon-ozone",
      name_ar: "تعقيم الأوزون وعطر ملكي مستورد",
      name_en: "Ozone Deodorize & French Mist",
      price: 25,
      duration_minutes: 10,
      icon: "wind",
      desc_ar: "تطهير الهواء الداخلي والقضاء على البكتيريا المسببة للروائح",
      desc_en: "Ozone air sanitation cycle leaving a long-lasting fresh scent"
    },
    {
      id: "addon-leather",
      name_ar: "عناية المقاعد الجلدية وترطيبها",
      name_en: "Leather Seats Nutrition & Shield",
      price: 40,
      duration_minutes: 15,
      icon: "shield-check",
      desc_ar: "ترطيب يحمي جلد المقاعد من الجفاف والتشققات بفعل حرارة الصيف",
      desc_en: "Moisturizing formula preventing leather cracking from sun heat"
    }
  ],

  // Riyadh Locations / Captains on live duty
  captains: [
    {
      id: "c-101",
      name_ar: "فهد الدوسري",
      name_en: "Fahad Al-Dossari",
      rating: 4.96,
      distance_km: 1.4,
      eta_minutes: 12,
      zone_ar: "حي النرجس / الملقا - الرياض",
      zone_en: "Al-Narjis / Al-Malqa - Riyadh",
      phone: "+966 50 111 2233",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      van_plate: "أ و م 4040",
      equipment_ar: "فان فئة A - ماء مقطر 500 لتر - بخار إيطالي",
      equipment_en: "Class A Van - 500L Pure Water - Italian Steam Unit",
      coords: [24.8190, 46.6520]
    },
    {
      id: "c-102",
      name_ar: "سامي الحربي",
      name_en: "Sami Al-Harbi",
      rating: 4.91,
      distance_km: 2.8,
      eta_minutes: 20,
      zone_ar: "حي حطين / الدرعية - الرياض",
      zone_en: "Hittin / Diriyah - Riyadh",
      phone: "+966 55 444 7788",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      van_plate: "س ع د 8812",
      equipment_ar: "فان فورد ترانزيت مجهز بمواد ألمانية صديقة للبيئة",
      equipment_en: "Ford Transit Eco-equipped with German eco chemicals",
      coords: [24.7650, 46.6210]
    },
    {
      id: "c-103",
      name_ar: "زياد القحطاني",
      name_en: "Ziyad Al-Qahtani",
      rating: 4.89,
      distance_km: 3.5,
      eta_minutes: 25,
      zone_ar: "حي العليا / السليمانية - الرياض",
      zone_en: "Al-Olaya / As-Sulimaniyah - Riyadh",
      phone: "+966 56 333 9900",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
      van_plate: "ن م ر 1920",
      equipment_ar: "وحدة متنقلة سريعة لغسيل السيارات الفارهة",
      equipment_en: "Rapid mobile unit dedicated to luxury vehicles",
      coords: [24.7136, 46.6753]
    }
  ],

  // Partner Car Wash Stations (المحطات الثابتة القريبة)
  stations: [
    {
      id: "st-1",
      name_ar: "مركز أومنيسكا للعناية الفائقة - طريق الملك فهد",
      name_en: "Omnexa Master Center - King Fahd Rd",
      rating: 4.9,
      reviews_count: 1240,
      distance_km: 1.8,
      address_ar: "طريق الملك فهد، مقابل برج المملكة، العليا",
      address_en: "King Fahd Rd, opposite Kingdom Centre, Olaya",
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&auto=format&fit=crop&q=80",
      open_hours_ar: "مفتوح 24 ساعة",
      open_hours_en: "Open 24/7",
      features_ar: ["صالة انتظار VIP مع قهوة مجانية", "خدمة سريعة بدون حجز", "واي فاي سريع"]
    },
    {
      id: "st-2",
      name_ar: "مغسلة واحة النرجس المتطورة",
      name_en: "Al-Narjis Oasis Auto Wash",
      rating: 4.8,
      reviews_count: 860,
      distance_km: 3.2,
      address_ar: "حي النرجس، تقاطع طريق عثمان بن عفان مع أنس بن مالك",
      address_en: "Al-Narjis, Othman bin Affan at Anas bin Malik",
      image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&auto=format&fit=crop&q=80",
      open_hours_ar: "من 7:00 ص إلى 12:00 منتصف الليل",
      open_hours_en: "07:00 AM - 12:00 Midnight",
      features_ar: ["أجهزة غسيل روبوتية بدون لمس", "تلميع داخلي بالبخار"]
    },
    {
      id: "st-3",
      name_ar: "صالة برستيج بوليفارد - حطين",
      name_en: "Prestige Boulevard Wash - Hittin",
      rating: 4.95,
      reviews_count: 2100,
      distance_km: 4.5,
      address_ar: "حي حطين، بالقرب من بوليفارد رياض سيتي",
      address_en: "Hittin, near Boulevard Riyadh City",
      image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=400&auto=format&fit=crop&q=80",
      open_hours_ar: "من 8:00 ص إلى 2:00 فجراً",
      open_hours_en: "08:00 AM - 02:00 AM",
      features_ar: ["متخصصون في النانو سيراميك وحماية PPF", "ضمان 10 أيام"]
    }
  ],

  // Saved User Garage
  userGarage: [
    {
      id: "car-1",
      make: "Mercedes-Benz",
      model: "E350 AMG",
      year: "2024",
      plate_ar: "أ ب ج 1234",
      plate_en: "ABJ 1234",
      type: "sedan",
      color_ar: "أسود نايت إديشن",
      color_en: "Night Black Edition",
      color_hex: "#111827",
      is_default: true
    },
    {
      id: "car-2",
      make: "Toyota",
      model: "Land Cruiser VXR",
      year: "2023",
      plate_ar: "س ص ع 5678",
      plate_en: "SSE 5678",
      type: "suv",
      color_ar: "أبيض لؤلؤي",
      color_en: "Pearl White",
      color_hex: "#F8FAFC",
      is_default: false
    }
  ],

  // Saved User Addresses
  userAddresses: [
    {
      id: "addr-home",
      title_ar: "المنزل (حي النرجس)",
      title_en: "Home (Al-Narjis)",
      city_ar: "الرياض",
      city_en: "Riyadh",
      district_ar: "حي النرجس، شارع الأمير فيصل بن بندر، فيلا 18",
      district_en: "Al-Narjis, Prince Faisal bin Bandar St, Villa 18",
      notes_ar: "السيارة متوقفة بالمظلة الخارجية أمام البوابة الرئيسية",
      notes_en: "Car is parked under the canopy in front of main gate",
      is_default: true,
      coords: [24.8190, 46.6520]
    },
    {
      id: "addr-work",
      title_ar: "مقر العمل (KAFD)",
      title_en: "Workplace (KAFD)",
      city_ar: "الرياض",
      city_en: "Riyadh",
      district_ar: "مركز الملك عبدالله المالي، البرج 4.02، المواقف B2",
      district_en: "King Abdullah Financial District, Tower 4.02, Parking B2",
      notes_ar: "يرجى الاتصال عند الوصول لحاجز الأمن لإصدار تصريح الدخول",
      notes_en: "Please call upon arrival at security barrier for parking pass",
      is_default: false,
      coords: [24.7650, 46.6400]
    }
  ],

  // Available Time Slots for Booking
  timeSlots: [
    { id: "slot-now", time_ar: "خدمة فورية (خلال 35-45 دقيقة)", time_en: "Express Now (in 35-45 mins)", is_immediate: true },
    { id: "slot-0900", time_ar: "09:00 صباحاً - 10:30 صباحاً", time_en: "09:00 AM - 10:30 AM", is_immediate: false },
    { id: "slot-1130", time_ar: "11:30 صباحاً - 01:00 ظهراً", time_en: "11:30 AM - 01:00 PM", is_immediate: false },
    { id: "slot-0230", time_ar: "02:30 ظهراً - 04:00 عصراً", time_en: "02:30 PM - 04:00 PM", is_immediate: false },
    { id: "slot-0430", time_ar: "04:30 عصراً - 06:00 مساءً", time_en: "04:30 PM - 06:00 PM", is_immediate: false },
    { id: "slot-0700", time_ar: "07:00 مساءً - 08:30 مساءً", time_en: "07:00 PM - 08:30 PM", is_immediate: false },
    { id: "slot-0930", time_ar: "09:30 مساءً - 11:00 مساءً", time_en: "09:30 PM - 11:00 PM", is_immediate: false }
  ],

  // Past and Active Bookings History
  ordersHistory: [
    {
      id: "OMN-88421",
      date_ar: "اليوم، 31 أكتوبر 2026",
      date_en: "Today, Oct 31, 2026",
      time: "04:30 PM",
      status: "in_progress", // confirmed, assigned, on_the_way, in_progress, completed
      status_step: 3, // 0: confirmed, 1: assigned, 2: on_the_way, 3: in_progress, 4: completed
      status_label_ar: "جاري الغسيل والمعالجة",
      status_label_en: "Washing In Progress",
      service_type: "doorstep",
      package_name_ar: "غسيل أومنيسكا الشامل",
      package_name_en: "Omnexa Full Refresh",
      vehicle: "Mercedes-Benz E350 (أ ب ج 1234)",
      location_ar: "حي النرجس، الرياض",
      location_en: "Al-Narjis, Riyadh",
      captain_name_ar: "فهد الدوسري",
      captain_name_en: "Fahad Al-Dossari",
      captain_phone: "+966 50 111 2233",
      captain_rating: 4.96,
      captain_avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      total_sar: 102.35,
      payment_method: "apple_pay",
      before_photo: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&auto=format&fit=crop&q=80",
      after_photo: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "OMN-87109",
      date_ar: "24 أكتوبر 2026",
      date_en: "Oct 24, 2026",
      time: "11:30 AM",
      status: "completed",
      status_step: 4,
      status_label_ar: "مكتمل بنجاح",
      status_label_en: "Completed Successfully",
      service_type: "doorstep",
      package_name_ar: "تلميع صالة العرض ونانو سيراميك",
      package_name_en: "Showroom Ceramic & Detail",
      vehicle: "Toyota Land Cruiser (س ص ع 5678)",
      location_ar: "حي النرجس، الرياض",
      location_en: "Al-Narjis, Riyadh",
      captain_name_ar: "سامي الحربي",
      captain_name_en: "Sami Al-Harbi",
      captain_phone: "+966 55 444 7788",
      captain_rating: 5.0,
      captain_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      total_sar: 320.85,
      payment_method: "mada",
      before_photo: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=80",
      after_photo: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "OMN-85430",
      date_ar: "12 أكتوبر 2026",
      date_en: "Oct 12, 2026",
      time: "07:00 PM",
      status: "completed",
      status_step: 4,
      status_label_ar: "مكتمل بنجاح",
      status_label_en: "Completed Successfully",
      service_type: "station",
      package_name_ar: "غسيل إكسبريس ساطع",
      package_name_en: "Express Shine Clean",
      vehicle: "Mercedes-Benz E350 (أ ب ج 1234)",
      location_ar: "مركز أومنيسكا - طريق الملك فهد",
      location_en: "Omnexa Master Center - King Fahd Rd",
      captain_name_ar: "فريق محطة العليا",
      captain_name_en: "Olaya Station Team",
      captain_phone: "920088991",
      captain_rating: 4.9,
      captain_avatar: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=150&auto=format&fit=crop&q=80",
      total_sar: 51.75,
      payment_method: "cash",
      before_photo: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&auto=format&fit=crop&q=80",
      after_photo: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&auto=format&fit=crop&q=80"
    }
  ],

  // Customer Reviews
  reviews: [
    {
      name_ar: "عبدالله السديري",
      name_en: "Abdullah Al-Sudairy",
      city_ar: "الرياض",
      city_en: "Riyadh",
      rating: 5,
      car_ar: "لكزس LX600",
      car_en: "Lexus LX600",
      comment_ar: "تجربة خيالية بكل معنى الكلمة، وصل الكابتن في الموعد بالدقيقة ومعه كل المعدات والماء النقي، غسل السيارة عند باب البيت وكأنها خرجت من الوكالة!",
      comment_en: "Incredible experience! The captain arrived precisely on time with pure water and professional equipment. Car looks brand new!"
    },
    {
      name_ar: "د. ريم الخالدي",
      name_en: "Dr. Reem Al-Khaldi",
      city_ar: "الرياض",
      city_en: "Riyadh",
      rating: 5,
      car_ar: "بورش تايكان",
      car_en: "Porsche Taycan",
      comment_ar: "أفضل ما في أومنيسكا هو احترافية التعامل ومواد العناية الخاصة بالجلد والنانو سيراميك. أطلبهم أسبوعياً وأنا في الدوام.",
      comment_en: "Best part is their gentle touch with leather and ceramic paint. I book them weekly while working at KAFD."
    },
    {
      name_ar: "م. فيصل التميمي",
      name_en: "Eng. Faisal Al-Tamimi",
      city_ar: "الرياض",
      city_en: "Riyadh",
      rating: 5,
      car_ar: "رنج روفر فيلار",
      car_en: "Range Rover Velar",
      comment_ar: "تتبع الطلب بالخريطة ورؤية الكابتن في طريقه إليك يعطيك راحة واطمئنان، وطريقة الدفع بـ Apple Pay سلسة للغاية.",
      comment_en: "Live map tracking the captain on his way gives huge peace of mind. Apple Pay checkout is super frictionless."
    }
  ]
};
