// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
});

closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close mobile menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Sticky Header on Scroll
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100; // Trigger point

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
};

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load to show elements already in view
revealOnScroll();

// =============================================
// Google Apps Script Connection
// =============================================
// Paste your Google Apps Script Web App URL below:
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxvBZ1g7m0iWbBuxptb8V0bhTso_iUl7IKhXljuu2saBpGQ4a2Tjc7_oaDemeA34gC_/exec'; 

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = 'Sending...';
        btn.style.opacity = '0.8';
        btn.disabled = true;

        if (!APPS_SCRIPT_URL) {
            // Fallback for demo when URL is not configured yet
            console.warn("Apps Script URL is not configured. Simulating form submission.");
            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.backgroundColor = '#4caf50';
                btn.style.color = '#fff';
                btn.style.borderColor = '#4caf50';
                
                contactForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
            return;
        }

        // Serialize and submit via URLSearchParams to support CORS redirects
        const searchParams = new URLSearchParams(new FormData(contactForm));
        
        fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            body: searchParams,
            mode: 'no-cors'
        })
        .then(() => {
            btn.textContent = 'Message Sent!';
            btn.style.backgroundColor = '#4caf50';
            btn.style.color = '#fff';
            btn.style.borderColor = '#4caf50';
            
            contactForm.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style = '';
                btn.disabled = false;
            }, 3000);
        })
        .catch(err => {
            console.error('Error submitting form:', err);
            btn.textContent = 'Error sending!';
            btn.style.backgroundColor = '#f44336';
            btn.style.color = '#fff';
            btn.style.borderColor = '#f44336';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style = '';
                btn.disabled = false;
            }, 3000);
        });
    });
}

// Typewriter Effect for Hero Section
const typeWriterTarget = document.getElementById('typewriter-text');
const nameText = "Deepinder Singh";
let typeIndex = 0;

if (typeWriterTarget) {
    function type() {
        if (typeIndex < nameText.length) {
            typeWriterTarget.textContent += nameText.charAt(typeIndex);
            typeIndex++;
            setTimeout(type, 120);
        }
    }
    setTimeout(type, 800);
}

// =============================================
// Scroll Progress Bar
// =============================================
const progressBar = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// =============================================
// Custom Cursor
// =============================================
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        cursor.style.display = 'block';
        follower.style.display = 'block';
    }

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .service-card, .skill-category-card, .portfolio-item, .btn, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '16px';
            cursor.style.height = '16px';
            follower.style.width = '60px';
            follower.style.height = '60px';
            follower.style.borderColor = 'rgba(168, 85, 247, 0.6)';
            follower.style.background = 'rgba(168, 85, 247, 0.05)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.borderColor = 'rgba(168, 85, 247, 0.3)';
            follower.style.background = 'transparent';
        });
    });
}

// =============================================
// Particle Network Background
// =============================================
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.4 + 0.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
        this.ctx.fill();
    }
}

const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;

    function resizeCanvas() {
        const hero = canvas.parentElement;
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    function initParticles() {
        const count = Math.min(Math.floor(canvas.width * canvas.height / 9000), 90);
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(canvas));
        }
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const opacity = (1 - dist / 150) * 0.18;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        if (mouseX && mouseY) {
            for (let i = 0; i < particles.length; i++) {
                const dx = particles[i].x - mouseX;
                const dy = particles[i].y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                    const opacity = (1 - dist / 180) * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        requestAnimationFrame(animate);
    }

    canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
        mouseX = 0;
        mouseY = 0;
    });

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// =============================================
// Counter Animation (Intersection Observer)
// =============================================
const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    if (isNaN(target)) return;
    const duration = 2000;
    const step = Math.max(1, Math.floor(target / 60));
    let current = 0;
    const update = () => {
        current += step;
        if (current >= target) {
            counter.textContent = target;
            return;
        }
        counter.textContent = current;
        requestAnimationFrame(() => setTimeout(update, 30));
    };
    update();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// =============================================
// Skill Bar Animation (Intersection Observer)
// =============================================
const skillFills = document.querySelectorAll('.skill-bar .fill');

const animateSkillBar = (fill) => {
    const progress = parseInt(fill.getAttribute('data-progress'));
    if (isNaN(progress)) return;
    fill.style.width = progress + '%';
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBar(entry.target);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// =============================================
// 3D Tilt Effect on Cards
// =============================================
const tiltCards = document.querySelectorAll('.service-card, .skill-category-card, .portfolio-item');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

// =============================================
// Floating Orbs
// =============================================
const orbsContainer = document.createElement('div');
orbsContainer.innerHTML = `
    <div class="floating-orb orb-1"></div>
    <div class="floating-orb orb-2"></div>
    <div class="floating-orb orb-3"></div>
`;
document.body.prepend(orbsContainer);

// =============================================
// Magnetic Button Effect
// =============================================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// =============================================
// Floating Scroll-To-Top Button Visibility
// =============================================
const scrollTopBtn = document.getElementById('scroll-top-btn');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
}
