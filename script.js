
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

 
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            
            nav.classList.remove('active');
        });
    });

    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
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

    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            if (isElementInViewport(bar)) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }
        });
    };

    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                
                if (entry.target.classList.contains('project-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
            }
        });
    }, observerOptions);

    
    document.querySelectorAll('.project-card, .skills-column, .contact-content > *').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('senderName').value;
        const email = document.getElementById('senderEmail').value;
        const message = document.getElementById('senderMessage').value;
        
        const subject = encodeURIComponent(`Message de ${name} via le portfolio`);
        const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        
        window.location.href = `mailto:edemkpogo07@gmail.com?subject=${subject}&body=${body}`;
    });

    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });

    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    
    window.addEventListener('scroll', animateSkillBars);
});


const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

footerObserver.observe(document.querySelector('.footer'));

const themeSwitch = document.getElementById('themeSwitch');
const body = document.body;

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeSwitch.classList.add('light');
} else {
    body.classList.remove('light-theme');
    themeSwitch.classList.remove('light');
}

themeSwitch.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        themeSwitch.classList.remove('light');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-theme');
        themeSwitch.classList.add('light');
        localStorage.setItem('theme', 'light');
    }
    
    document.body.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 600);
});


document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        themeSwitch.click();
    }
});