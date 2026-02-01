// ==================== 导航栏滚动效果 ====================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // 添加滚动阴影
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==================== 移动端菜单 ====================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

// 切换菜单
function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

// 关闭菜单
function closeMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', closeMenu);

// 点击链接后关闭菜单
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(closeMenu, 300);
    });
});

// ==================== 平滑滚动 ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== 返回顶部按钮 ====================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== 滚动动画 ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有section
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// ==================== 技能条动画 ====================
const skillBars = document.querySelectorAll('.level-bar');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fillBar 1.5s ease-out forwards';
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ==================== 动态打字效果(可选) ====================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 页面加载后执行
window.addEventListener('load', () => {
    // 可以为hero标题添加打字效果(可选)
    // const heroTitle = document.querySelector('.title-name');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 150);
    // }
});

// ==================== 鼠标跟随效果(可选) ====================
let mouseX = 0;
let mouseY = 0;
let ballX = 0;
let ballY = 0;
const speed = 0.1;

// 创建鼠标跟随光标(可选)
const createCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.4), transparent);
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        const distX = mouseX - ballX;
        const distY = mouseY - ballY;
        
        ballX += distX * speed;
        ballY += distY * speed;
        
        cursor.style.left = ballX - 10 + 'px';
        cursor.style.top = ballY - 10 + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
};

// 如果想启用自定义光标，取消下面的注释
// createCursor();

// ==================== 性能优化：图片懒加载 ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== 添加页面加载动画 ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==================== 防止iOS Safari滚动卡顿 ====================
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    document.addEventListener('touchmove', (e) => {
        if (e.scale !== 1) {
            e.preventDefault();
        }
    }, { passive: false });
}

// ==================== 控制台彩蛋 ====================
console.log('%c👋 嘿，你好！', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%c正在查看源代码？欢迎一起交流技术！', 'font-size: 14px; color: #64748b;');
console.log('%c📧 17339073536@163.com', 'font-size: 12px; color: #94a3b8;');