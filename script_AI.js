
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
body.classList.toggle('dark-mode');
const isDarkMode = body.classList.contains('dark-mode');
themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// تحميل الوضع المحفوظ
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
body.classList.add('dark-mode');
themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// بيانات اللغة
const translations = {
ar: {
'home': 'الرئيسية',
'about': 'عن المستشفى',
'services': 'الخدمات',
'login': 'تسجيل الدخول',
'hero-title': 'مستشفى هنا',
'hero-subtitle': 'رعاية صحية بمعايير عالمية',
'hero-cta': 'اكتشف خدماتنا',
'about-title': 'عن مستشفى هنا',
'about-text': 'مستشفى هنا تقدم رعاية صحية متكاملة بأعلى المعايير العالمية. مع فريق من الأطباء المتخصصين وأحدث التقنيات، نحن هنا لضمان سلامتك وراحتك.',
'stat-doctors': '500+',
'stat-doctors-text': 'طبيب متخصص',
'stat-patients': '10,000+',
'stat-patients-text': 'مريض سنويًا',
'stat-emergency': '24/7',
'stat-emergency-text': 'خدمة طوارئ',
'services-title': 'خدماتنا',
'service-cardiology': 'القلب',
'service-cardiology-text': 'علاج أمراض القلب بأحدث التقنيات.',
'service-surgery': 'الجراحة',
'service-surgery-text': 'عمليات دقيقة بأيدي جراحين متميزين.',
'service-emergency': 'الطوارئ',
'service-emergency-text': 'رعاية فورية على مدار الساعة.',
'footer-text': '© 2025 مستشفى هنا. جميع الحقوق محفوظة.'
},
en: {
'home': 'Home',
'about': 'About Us',
'services': 'Services',
'login': 'Login',
'hero-title': 'Hana Hospital',
'hero-subtitle': 'World-Class Healthcare',
'hero-cta': 'Explore Our Services',
'about-title': 'About Hana Hospital',
'about-text': 'Hana Hospital provides comprehensive healthcare with the highest global standards. With a team of specialized doctors and cutting-edge technology, we ensure your safety and comfort.',
'stat-doctors': '500+',
'stat-doctors-text': 'Specialized Doctors',
'stat-patients': '10,000+',
'stat-patients-text': 'Patients Annually',
'stat-emergency': '24/7',
'stat-emergency-text': 'Emergency Services',
'services-title': 'Our Services',
'service-cardiology': 'Cardiology',
'service-cardiology-text': 'Treating heart conditions with the latest technology.',
'service-surgery': 'Surgery',
'service-surgery-text': 'Precise operations by distinguished surgeons.',
'service-emergency': 'Emergency',
'service-emergency-text': 'Immediate care around the clock.',
'footer-text': '© 2025 Hana Hospital. All rights reserved.'
}
};

// تبديل اللغة
const langButtons = document.querySelectorAll('.lang-btn');
let currentLang = 'ar';

function updateContent(lang) {
currentLang = lang;
document.querySelectorAll('[data-key]').forEach(element => {
const key = element.getAttribute('data-key');
element.textContent = translations[lang][key];
});
document.documentElement.setAttribute('lang', lang);
document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
document.body.style.direction = lang === 'ar' ? 'rtl' : 'ltr';
localStorage.setItem('language', lang);
}

langButtons.forEach(button => {
button.addEventListener('click', () => {
const lang = button.getAttribute('data-lang');
updateContent(lang);
closeMobileMenu();
});
});

// تحميل اللغة المحفوظة
const savedLang = localStorage.getItem('language') || 'ar';
updateContent(savedLang);

// قائمة الهامبرغر
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = document.querySelector('.close-menu');

hamburger.addEventListener('click', () => {
mobileMenu.classList.add('active');
});

closeMenu.addEventListener('click', closeMobileMenu);

function closeMobileMenu() {
mobileMenu.classList.remove('active');
}

// التنقل السلس
document.querySelectorAll('.nav-link').forEach(link => {
link.addEventListener('click', function(e) {
if (!this.classList.contains('login-btn')) {
e.preventDefault();
const targetId = this.getAttribute('href').substring(1);
const targetSection = document.getElementById(targetId);
window.scrollTo({
top: targetSection.offsetTop - 70,
behavior: 'smooth'
});
closeMobileMenu();
}
});
});

// الرسوم المتحركة عند التمرير
const animateOnScroll = () => {
const elements = document.querySelectorAll('.about, .services, .service-card');
elements.forEach(el => {
const rect = el.getBoundingClientRect();
if (rect.top < window.innerHeight * 0.8) {
el.classList.add('animate');
if (el.classList.contains('about')) {
const stats = el.querySelectorAll('.stat');
stats.forEach((stat, index) => {
setTimeout(() => {
stat.classList.add('animate');
}, index * 200);
});
}
}
});
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll();