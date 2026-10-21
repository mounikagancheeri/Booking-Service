import { Category, NavItem, Provider } from '../models';

// Sample content from the Stitch "1. Home - Discover" screen, used by stories and specs.

export const CATEGORIES: Category[] = [
  { id: 'ac-repair', label: 'AC Repair', icon: 'mode_fan', caption: '12 Pros' },
  { id: 'electrician', label: 'Electrician', icon: 'offline_bolt', caption: '24 Pros' },
  { id: 'cleaning', label: 'Deep Clean', icon: 'cleaning_services', caption: '18 Pros' },
  { id: 'electronics', label: 'Electronics', icon: 'laptop_mac', caption: 'On-site diagnosis' },
  { id: 'fitness', label: 'Fitness', icon: 'fitness_center', caption: 'Personal Coach' },
  { id: 'tutors', label: 'Tutors', icon: 'school', caption: 'K-12 & STEM' },
];

export const RAHUL: Provider = {
  id: 'rahul-sharma',
  name: 'Rahul Sharma',
  title: 'AC Technician',
  experienceYears: 7,
  rating: 4.9,
  reviewCount: 124,
  startingPrice: 499,
  verified: true,
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA4r98_iec3PPpQ3Cl-o0AyzTnSielJalF7OSTyx4-GtjdTf8z9Ibt1oME-MEYFprq3OitJ6RnKeubBoNA2lnR7c8A73zAkxCE_xpuZobmLbB7ewpHCsWEAUfX7XkzoSMGkXJsJXPBhrI5SSO4m2nX5Zq2ZbpGikOFxVzRbpWEVwiDVcldun7P0Uue0ivE43Zugshdm22RHaRPKcCh0D7UN4mD_tWn47PcJyuKALL8Vr9LZ8UQJBqvDzA',
  area: 'Banjara Hills',
  distanceKm: 1.4,
  nextSlot: 'Today, 04:00 PM',
  // Profile and results details from Stitch "2. AC Repair Results" and "3. Provider Profile".
  categoryIds: ['ac-repair'],
  role: 'Senior AC Technician',
  bio: 'Experienced AC technician specializing in split and inverter AC servicing, installation, comprehensive inspection, and advanced compressor repair. Formally trained with Daikin, Voltas, and LG systems.',
  skills: ['Inverter', 'Multi-split', 'R32 / R410A Gas', 'PCB Diagnostics', 'Jet Foam Wash'],
  serviceAreas: 'Banjara Hills, Gachibowli, Madhapur & Kondapur',
  trustBadges: [
    { icon: 'local_police', label: 'Police Record Verified' },
    { icon: 'workspace_premium', label: 'SkillConnect Certified' },
    { icon: 'timelapse', label: '100% On-Time Guarantee' },
  ],
  highlights: [
    { icon: 'search_check', label: 'AC Full Diagnosis & Leak Test', price: 499 },
    { icon: 'cleaning_services', label: 'Jet Deep Coil Cleansing (Indoor + Outdoor)', price: 999 },
  ],
  reviews: [
    {
      id: 'r1',
      author: 'Pooja M.',
      area: 'Madhapur',
      when: '2 days ago',
      rating: 5,
      text: 'Rahul was punctual, did thorough jet cleaning. AC cooling like new! Really appreciated that he placed floor covers and left no mess behind.',
      service: 'AC General Service',
    },
    {
      id: 'r2',
      author: 'Kiran K.',
      area: 'Gachibowli',
      when: '1 week ago',
      rating: 5,
      text: 'Identified capacitor issue quickly. Transparent pricing with no hidden charges. Showed me the old burnt capacitor before replacing.',
      service: 'AC Repair • Compressor Issue',
    },
  ],
};

export const VIKRAM: Provider = {
  id: 'vikram-reddy',
  name: 'Vikram Reddy',
  title: 'Cooling & Compressor Tech',
  experienceYears: 5,
  rating: 4.8,
  reviewCount: 98,
  startingPrice: 549,
  verified: true,
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCeFIQk3kIiibLx4G0Yx0LZ9XgyGO4vx7YXUVa29s5nANwVg7Fidvog56pAkiioQ46gBPSQ2s0nJUkhpKqWICETX-L4qx-OhIQrkLfLhmgQFgmkEa8Sh0h1_WNVY8JxDT7mUBn0-r31vmq94HgpzKBujr_FWT1It50qNTyJRNJ2vWSYXakFG54u69GKnTfs5ADd_ScPzyBiPsPVEAL6mKEKxA6ZyqNsTm7ioP_VcMy4j897m43TpFDfXg',
  area: 'Jubilee Hills',
  nextSlot: 'Today, 11:30 AM',
  categoryIds: ['ac-repair'],
  bio: 'Expert PCB board repair, inverter gas leak isolation, and dual-fan condenser overhaul. Carries OEM spare kits.',
};

export const MANOJ: Provider = {
  id: 'manoj-kumar',
  name: 'Manoj Kumar',
  title: 'Cooling Systems Specialist',
  experienceYears: 4,
  rating: 4.7,
  reviewCount: 64,
  startingPrice: 499,
  verified: true,
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAFsGaaiczGfjl3jo4ijUxjxxL55HA8I2IPCLRy7F_Xf7wAQniFcAj-dEmcAgCHPdcQJWQGbuzsmX1AL8l3I8Aor73MObrX3Kk6Ox9WobYQdHAKVd_Qvlplc05Ocf2bLmbkuM83_nN--cRuvKMMcI5FjatqFcKC6PjkbAJgaDqXqp8-D3lFYmZDibqi5LuDoQZ2G-8wE_GrtoaNcy4p6coDC3K2WAunXNXOiIbmQEnZJi_vbbd4aA7-_Q',
  area: 'Madhapur',
  nextSlot: 'Tomorrow, 08:30 AM',
  categoryIds: ['ac-repair'],
  bio: 'Daikin & Voltas authorized background. Specializes in quiet vibration dampening, drain block removals, and filter sanitization.',
};

export const SURESH: Provider = {
  id: 'suresh-kumar',
  name: 'Suresh Kumar',
  title: 'Master Electrician',
  experienceYears: 9,
  rating: 4.8,
  reviewCount: 98,
  startingPrice: 349,
  verified: true,
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuACxOnDn3PEZZ6uMTtB3Cn0P0TkT6DLfxSubWHUKGcjYJKexoGrgl7jcyOj3biCyDbgUPthf52s4YBSIz8gEA5cffVfUX6wBbFMksMC3cs3Y8MogaMyBl-r5wpBFEEvxvi8MdLOsc0hZ-gwi9eE0pC6QAgaZm3c-rNszXN7PKV1SHu-HYpkJOSmWKnf-vAjN5oj_4Puwx1e7Rg_HXc_f3CFdhrGtoGPIc1uTPsf4nsKlVF9j2t0dMde6g',
  nextSlot: 'Tomorrow 10 AM',
};

export const ANANYA: Provider = {
  id: 'ananya-rao',
  name: 'Ananya Rao',
  title: 'Deep Cleaning & Sanitization',
  experienceYears: 5,
  rating: 4.95,
  reviewCount: 210,
  startingPrice: 799,
  verified: true,
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCvqRbSs65CoOfFzXvsQGVvIid1FCnawn8AZHFvzeKsRL6C4uMqAs7N-oZ41wAbZEuCXmV5IeU0wKcN3JrVyj_zaBN7XA8JCexHiHwyoXWoXp8Pfjh8z6UupNQMuFOp9oMZ4ABo5D9aqPoKnExsBD4mMCTq2FEthhoREAAEfjq0QQ7B08msdl1_4IQnXISq5j-uRDldh21IigHWv6IIGNOex8JkFeyEyiwFUiTSVygKEtlq1bI0vhqMYQ',
  nextSlot: 'Today 6 PM',
};

export const PROVIDERS: Provider[] = [RAHUL, SURESH, ANANYA];

/** Every mock provider, including those only listed on the results screen. */
export const ALL_PROVIDERS: Provider[] = [
  RAHUL,
  { ...SURESH, categoryIds: ['electrician'] },
  { ...ANANYA, categoryIds: ['cleaning'] },
  VIKRAM,
  MANOJ,
];

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'home', route: '/' },
  { id: 'bookings', label: 'Bookings', icon: 'calendar_today', route: '/bookings' },
  { id: 'messages', label: 'Messages', icon: 'chat_bubble', route: '/messages' },
  { id: 'profile', label: 'Profile', icon: 'person', route: '/profile' },
];
