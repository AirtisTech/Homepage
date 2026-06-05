/**
 * Airtis Creative Enterprise - Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. 导航栏滚动交互 (Header Scroll Effect)
    // ==========================================
    const header = document.getElementById('main-header');
    
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // 页面加载时执行一次检测


    // ==========================================
    // 2. 移动端菜单切换 (Mobile Menu Toggle)
    // ==========================================
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const toggleIcon = menuToggle.querySelector('i');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        
        // 切换菜单图标 (三条杠 / 关闭叉号)
        if (navMenu.classList.contains('open')) {
            toggleIcon.className = 'fa-solid fa-xmark';
        } else {
            toggleIcon.className = 'fa-solid fa-bars';
        }
    });

    // 点击导航链接后自动关闭移动端菜单
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            toggleIcon.className = 'fa-solid fa-bars';
        });
    });


    // ==========================================
    // 3. 滚动活动链接高亮 (Scrollspy)
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    const handleScrollspy = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200; // 适当偏移量确保提前点亮
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', handleScrollspy);


    // ==========================================
    // 4. 案例展示过滤 (Portfolio Filter)
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 切换按钮高亮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === itemCategory) {
                    // 显示匹配项，附带流畅的淡入缩放动效
                    item.style.display = 'flex';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    // 隐藏非匹配项
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300); // 配合 CSS 过渡动效时长
                }
            });
        });
    });


    // ==========================================
    // 5. 留言表单模拟提交与交互验证
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formSubmitBtn = document.getElementById('btn-submit-form');
    const statusMsg = document.getElementById('form-status-msg');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 改变按钮状态为提交中
            const originalBtnText = formSubmitBtn.textContent;
            formSubmitBtn.textContent = '发送中...';
            formSubmitBtn.disabled = true;
            
            // 模拟 API 延迟请求过程
            setTimeout(() => {
                // 模拟提交成功
                statusMsg.textContent = '您的留言已成功送达！我们会尽快与您联系。';
                statusMsg.className = 'status-msg success';
                
                // 重置表单
                contactForm.reset();
                
                // 恢复提交按钮
                formSubmitBtn.textContent = originalBtnText;
                formSubmitBtn.disabled = false;
                
                // 3秒后自动隐藏成功信息
                setTimeout(() => {
                    statusMsg.className = 'status-msg hide';
                }, 4000);
                
            }, 1500);
        });
    }
});
