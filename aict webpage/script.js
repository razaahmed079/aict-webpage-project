document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Automated Hero Slider ---
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slideCounter = document.querySelector('.slide-counter');
    const progressBar = document.querySelector('.progress-bar');
    
    let currentSlide = 0;
    const slideIntervalTime = 6000;
    let slideInterval;

    const updateSlider = () => {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
        if(slideCounter) slideCounter.textContent = `0${currentSlide + 1} / 0${slides.length}`;
        resetProgressBar();
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    };

    const resetProgressBar = () => {
        if(progressBar) {
            progressBar.style.width = '0%';
            setTimeout(() => {
                progressBar.style.transition = `width ${slideIntervalTime}ms linear`;
                progressBar.style.width = '100%';
            }, 50);
        }
    };

    const startAutoSlide = () => {
        slideInterval = setInterval(nextSlide, slideIntervalTime);
        resetProgressBar();
    };

    const stopAutoSlide = () => {
        clearInterval(slideInterval);
        if(progressBar) {
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
        }
    };

    if(slides.length > 0) {
        if(nextBtn) nextBtn.addEventListener('click', () => { stopAutoSlide(); nextSlide(); startAutoSlide(); });
        if(prevBtn) prevBtn.addEventListener('click', () => { stopAutoSlide(); prevSlide(); startAutoSlide(); });
        startAutoSlide();
    }

    // --- 2. Theme Toggle ---
    const themeBtn = document.getElementById('theme-btn');
    const body = document.body;
    const icon = themeBtn ? themeBtn.querySelector('i') : null;
    
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.replace('light-theme', 'dark-theme');
        if(icon) icon.classList.replace('fa-moon', 'fa-sun');
    }

    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (body.classList.contains('dark-theme')) {
                body.classList.replace('dark-theme', 'light-theme');
                if(icon) icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.replace('light-theme', 'dark-theme');
                if(icon) icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- 3. Mobile Menu ---
    const mobileBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const i = mobileBtn.querySelector('i');
            i.classList.toggle('fa-bars');
            i.classList.toggle('fa-times');
        });
    }

    // --- 4. Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

    // --- 5. 3D Tilt Effect ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y - rect.height / 2) / rect.height / 2) * -10;
            const rotateY = ((x - rect.width / 2) / rect.width / 2) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // --- 6. Navbar Scroll ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
});