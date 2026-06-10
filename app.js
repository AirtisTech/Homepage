/**
 * ARTISTECH CREATIVE ENTERPRISE - Interactive Scripts
 * with i18n Chinese/English language switcher
 */

// ==========================================
// i18n Translation System
// ==========================================
const i18n = {
    zh: {
        nav_home: "首页",
        nav_services: "服务",
        nav_about: "关于我们",
        nav_founder: "创始人",
        nav_portfolio: "案例展示",
        nav_contact: "联系我们",

        hero_tagline: "设计未来，科技赋能",
        hero_title1: "用创意重塑",
        hero_title2: "数字世界",
        hero_desc: "我们是一家专注于高水准交互设计、视觉传达及前沿软件工程的创新企业。致力于将您的商业灵感转化为极致的数字化体验。",
        hero_btn_explore: "浏览案例",
        hero_btn_contact: "与我们聊聊",

        services_title: "核心服务",
        services_subtitle: "以 AI 为核心驱动，融合创意设计与前沿技术，为您的品牌打造面向未来的数字化解决方案。",

        service_ai_dev_title: "AI 应用开发",
        service_ai_dev_desc: "基于大语言模型与前沿 AI 技术，为企业定制智能客服、自动化流程、数据分析等 AI 解决方案，驱动业务智能化升级。",
        service_ai_media_title: "AI 音乐与视频制作",
        service_ai_media_desc: "利用 AI 生成技术创作原创音乐、品牌宣传视频、产品演示动画等多媒体内容，以低成本实现高品质创意输出。",
        service_ai_ad_title: "AI 广告营销",
        service_ai_ad_desc: "为客户打造 AI 驱动的广告创意——从脚本生成、多语言配音到 AI 虚拟主播、动态广告投放，让品牌营销更高效。",
        service_uiux_title: "UI/UX 体验设计",
        service_uiux_desc: "以用户为中心，雕琢每一个交互细节，提供极致、直观且具备高转化率的数字化界面设计，让产品既有颜值又好用。",
        service_dev_title: "定制化软件开发",
        service_dev_desc: "前端与后端的深度融合。采用现代技术栈（React, Node.js, Flutter 等）构建高性能、高安全性的 Web 与移动端应用。",
        service_photo_title: "商业摄影",
        service_photo_desc: "提供专业产品静物、企业形象等拍摄服务，用高水准镜头语言呈现您的品牌故事。（此业务逐步过渡中）",

        about_title: "关于 ARTISTECH Creative",
        about_p1: "ARTISTECH Creative Enterprise 成立的初衷是打破创意与技术之间的壁垒。我们",
        about_p2: "不单单提供代码，更提供能触动人心的视觉体验；我们不单单提供视觉，更提供能稳定运行、弹性扩展的技术架构。",
        about_quote: "创意是连接技术与人文的桥梁。真正的数字化创新，源于对用户深刻的理解与对美学极致的追求。",
        about_quote_author: "— ARTISTECH Creative Design Team",

        founder_title: "创始人",
        founder_desc: "作为 ARTISTECH Creative 的创始人，在数字化转型、UI/UX 设计及企业技术架构领域深耕多年，致力于将最前沿的设计美学与工程实践带给每一位合作伙伴。",

        portfolio_title: "案例展示",
        portfolio_subtitle: "每一个作品都是创意与技术的结晶。以下是我们引以为豪的部分案例。",

        filter_all: "全部作品",
        filter_design: "UI/UX 设计",
        filter_dev: "技术开发",
        filter_brand: "品牌创意",
        filter_photo: "摄影 / 视频",

        contact_title: "联系我们",
        contact_desc: "无论您是想要咨询业务、提出建议，还是开启一个全新的合作项目，我们的创意专家随时在这里倾听。",
        contact_email_label: "联系邮箱",
        contact_phone_label: "WhatsApp 咨询",
        contact_address_label: "办公地址",

        form_title: "留言咨询",
        form_name_label: "您的姓名",
        form_name_placeholder: "例如：张先生",
        form_email_label: "您的邮箱",
        form_email_placeholder: "例如：client@example.com",
        form_message_label: "您的需求简述",
        form_message_placeholder: "请简要描述您的项目需求或咨询问题...",
        form_submit: "发送留言",

        footer_rights: "All Rights Reserved.",
        footer_back_top: "返回顶部",

        form_sending: "发送中...",
        form_success: "您的留言已成功送达！我们会尽快与您联系。",
        form_error_network: "网络连接发生错误，请检查您的网络后重试。",
        form_error_generic: "非常抱歉，发送留言时遇到问题，请稍后再试。",
        inquiry_title: "获取类似方案报价",
        inquiry_desc: "填写以下信息，我们的团队会在24小时内与您联系，为您提供定制化的解决方案。",
        inquiry_service_label: "感兴趣的服务",
        inquiry_name_label: "您的姓名",
        inquiry_email_label: "联系邮箱",
        inquiry_phone_label: "联系电话",
        inquiry_message_label: "您的需求简述",
        inquiry_submit: "提交询价",

        portfolio_empty: "暂无展示项目，请到后台添加。",
        portfolio_load_error: "加载作品集失败，请稍后再试。",
        about_extra1: "我们由一群对设计充满热忱、对技术执着追求的跨界专家组成。",
        about_extra2: "无论是初创公司需要建立首个数字化品牌，还是成熟企业需要重构复杂的业务系统，我们都能作为您最可靠的创意与技术伙伴，共同探索商业增长的新空间。",
        about_stats_projects: "交付项目",
        about_stats_satisfaction: "客户满意度",
        about_stats_experience: "行业经验",
        about_design_title: "设计理念",
        about_design_quote: "\"让每一像素都有它存在的理由，让每一行代码都有它跃动的生命力。\"",

        founder_section_title: "创始人简介",
        founder_section_subtitle: "聆听技术与创意背后的掌舵人故事。",
        founder_name: "Vince Chan 曾天旺",
        founder_role: "创始人 & 首席执行官",
        founder_quote: "\"在数字浪潮的潮头，我们不仅在构建网页与系统，更在用科技与设计的交织，为企业绘制未来的蓝图。\"",

        portfolio_subtitle_zh: "精选我们在不同领域所创作的数字化体验与创新成果。",
        portfolio_loading: "正在加载最新作品...",
        filter_photo: "商业摄影 / 视频",

        contact_section_title: "开始您的项目",
        contact_address: "Flat F2/14C, Taman Setia Jaya<br>Jalan Langgar, 05460 Alor Setar, Kedah",

        modal_client: "客户",
        modal_industry: "行业",
        modal_tech: "技术栈",
        modal_results: "成果",
        modal_view_video: "查看视频",
        modal_inquiry_btn: "咨询类似方案",
        modal_view_detail: "查看详情",
        modal_inquiry_btn2: "咨询报价",

    },
    en: {
        nav_home: "Home",
        nav_services: "Services",
        nav_about: "About Us",
        nav_founder: "Founder",
        nav_portfolio: "Portfolio",
        nav_contact: "Contact",

        hero_tagline: "Design the Future, Empower with Tech",
        hero_title1: "Reimagine the",
        hero_title2: "Digital World",
        hero_desc: "We are an innovative enterprise specializing in high-end interaction design, visual communication, and cutting-edge software engineering. Dedicated to transforming your business vision into extraordinary digital experiences.",
        hero_btn_explore: "Explore Portfolio",
        hero_btn_contact: "Let's Talk",

        services_title: "Core Services",
        services_subtitle: "AI-driven digital solutions — blending creative design with cutting-edge technology to build a future-proof brand experience.",

        service_ai_dev_title: "AI Application Development",
        service_ai_dev_desc: "Custom AI solutions powered by LLMs and cutting-edge AI — intelligent chatbots, workflow automation, data analytics, and more.",
        service_ai_media_title: "AI Music & Video Production",
        service_ai_media_desc: "Leverage generative AI to create original music, brand videos, product demo animations, and multimedia content at a fraction of traditional cost.",
        service_ai_ad_title: "AI Advertising & Marketing",
        service_ai_ad_desc: "AI-driven ad campaigns — from script generation and multilingual voiceovers to AI virtual anchors and dynamic ad placements.",
        service_uiux_title: "UI/UX Experience Design",
        service_uiux_desc: "User-centered design that crafts every interaction detail into an intuitive, high-conversion digital experience.",
        service_dev_title: "Custom Software Development",
        service_dev_desc: "Full-stack development with React, Node.js, Flutter and more — building high-performance, secure web and mobile applications.",
        service_photo_title: "Commercial Photography",
        service_photo_desc: "Professional product and corporate photography that tells your brand story through exceptional visuals. (Phasing out gradually)",

        about_title: "About ARTISTECH Creative",
        about_p1: "ARTISTECH Creative Enterprise was founded to break down the barriers between creativity and technology.",
        about_p2: "We don't just deliver code — we create visual experiences that move people. We don't just provide visuals — we build stable, scalable technical architectures.",
        about_quote: "Creativity is the bridge between technology and humanity. True digital innovation stems from deep user understanding and the relentless pursuit of aesthetic excellence.",
        about_quote_author: "— ARTISTECH Creative Design Team",

        founder_title: "Founder",
        founder_desc: "As the founder of ARTISTECH Creative, with years of deep experience in digital transformation, UI/UX design, and enterprise technology architecture, committed to bringing cutting-edge design aesthetics and engineering practices to every partner.",

        portfolio_title: "Portfolio",
        portfolio_subtitle: "Every project is the culmination of creativity and technology. Here are some of our proudest works.",

        filter_all: "All Works",
        filter_design: "UI/UX Design",
        filter_dev: "Development",
        filter_brand: "Branding",
        filter_photo: "Photo / Video",

        contact_title: "Contact Us",
        contact_desc: "Whether you want to discuss a project, share an idea, or start a new collaboration, our creative experts are always here to listen.",
        contact_email_label: "Email",
        contact_phone_label: "WhatsApp",
        contact_address_label: "Office Address",

        form_title: "Get In Touch",
        form_name_label: "Your Name",
        form_name_placeholder: "e.g. John Smith",
        form_email_label: "Your Email",
        form_email_placeholder: "e.g. client@example.com",
        form_message_label: "Your Message",
        form_message_placeholder: "Briefly describe your project needs or inquiry...",
        form_submit: "Send Message",

        footer_rights: "All Rights Reserved.",
        footer_back_top: "Back to Top",

        form_sending: "Sending...",
        form_success: "Your message has been sent! We will get back to you shortly.",
        form_error_network: "Network error. Please check your connection and try again.",
        form_error_generic: "Sorry, something went wrong. Please try again later.",

        portfolio_empty: "No projects to display yet. Please add from the admin panel.",
        about_extra1: "We are a team of cross-disciplinary experts passionate about design and dedicated to technology.",
        about_extra2: "Whether you are a startup building your first digital brand or an established enterprise restructuring complex business systems, we are your most reliable creative and technical partner on your path of business growth.",
        about_stats_projects: "Projects Delivered",
        about_stats_satisfaction: "Client Satisfaction",
        about_stats_experience: "Years of Experience",
        about_design_title: "Design Philosophy",
        about_design_quote: "\"Every pixel must have its reason to exist, every line of code must have its vibrant life.\"",

        founder_section_title: "Our Founder",
        founder_section_subtitle: "The story behind the vision of technology and creativity.",
        founder_name: "Vince Chan",
        founder_role: "Founder & CEO",
        founder_quote: "\"At the forefront of the digital wave, we are not just building websites and systems, but crafting the future blueprint for enterprises through the fusion of technology and design.\"",

        portfolio_subtitle_zh: "A curated selection of our digital experiences and creative innovations across diverse industries.",
        portfolio_loading: "Loading latest works...",
        filter_photo: "Photography / Video",

        contact_section_title: "Start Your Project",
        contact_address: "Flat F2/14C, Taman Setia Jaya<br>Jalan Langgar, 05460 Alor Setar, Kedah",

        modal_client: "Client",
        modal_industry: "Industry",
        modal_tech: "Tech Stack",
        modal_results: "Results",
        modal_view_video: "View Video",
        modal_inquiry_btn: "Get a Similar Solution",
        modal_view_detail: "View Details",
        modal_inquiry_btn2: "Get a Quote",

        portfolio_load_error: "Failed to load portfolio. Please try again later.",
    }
};

// Expose globally for modules
window.i18nData = i18n;

// Current language state
let currentLang = localStorage.getItem("artistech_lang") || "zh";

// ==========================================
// i18n Functions
// ==========================================
function applyTranslations(lang) {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.documentElement.dir = "ltr";

    // Update html lang attribute for SEO
    const canonicalLink = document.querySelector('link[rel="alternate"][hreflang="en"]');
    if (canonicalLink) {
        const search = lang === "en" ? "?lang=en" : "";
        canonicalLink.href = "/index.html" + search;
    }

    // Apply data-i18n to text content
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (i18n[lang] && i18n[lang][key] !== undefined) {
            el.textContent = i18n[lang][key];
        }
    });

    // Apply data-i18n-placeholder to input/textarea
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (i18n[lang] && i18n[lang][key] !== undefined) {
            el.placeholder = i18n[lang][key];
        }
    });

    // Apply data-i18n-aria to aria-labels
    document.querySelectorAll("[data-i18n-aria]").forEach(el => {
        const key = el.getAttribute("data-i18n-aria");
        if (i18n[lang] && i18n[lang][key] !== undefined) {
            el.setAttribute("aria-label", i18n[lang][key]);
        }
    });

    // Update lang toggle button visual state
    document.querySelectorAll(".lang-option").forEach(opt => {
        opt.classList.toggle("active", opt.dataset.lang === lang);
    });

    // Save preference
    localStorage.setItem("artistech_lang", lang);
    currentLang = lang;
    window.currentLang = lang;
}

function switchLanguage(lang) {
    if (lang === currentLang) return;
    applyTranslations(lang);
    // Re-run portfolio category labels if loaded
    if (typeof updatePortfolioLang === "function") {
        updatePortfolioLang(lang);
    }
    if (typeof loadPortfolio === "function") {
        loadPortfolio();
    }
}

// ==========================================
// DOM Ready
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Expose current language
    window.currentLang = currentLang;

    // Initialize language
    applyTranslations(currentLang);

    // ==========================================
    // 1. Language Toggle
    // ==========================================
    const langToggle = document.getElementById("lang-toggle");
    if (langToggle) {
        langToggle.addEventListener("click", () => {
            const newLang = currentLang === "zh" ? "en" : "zh";
            switchLanguage(newLang);
        });
    }

    // ==========================================
    // 2. 导航栏滚动交互 (Header Scroll Effect)
    // ==========================================
    const header = document.getElementById("main-header");
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll();

    // ==========================================
    // 3. 移动端菜单切换 (Mobile Menu Toggle)
    // ==========================================
    const menuToggle = document.getElementById("mobile-menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const toggleIcon = menuToggle ? menuToggle.querySelector("i") : null;

    if (menuToggle && toggleIcon) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            if (navMenu.classList.contains("open")) {
                toggleIcon.className = "fa-solid fa-xmark";
            } else {
                toggleIcon.className = "fa-solid fa-bars";
            }
        });
    }

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu) navMenu.classList.remove("open");
            if (toggleIcon) toggleIcon.className = "fa-solid fa-bars";
        });
    });

    // ==========================================
    // 4. 滚动活动链接高亮 (Scrollspy)
    // ==========================================
    const sections = document.querySelectorAll("section");
    const handleScrollspy = () => {
        let currentSectionId = "";
        const scrollPosition = window.scrollY + 200;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute("id");
            }
        });
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    };
    window.addEventListener("scroll", handleScrollspy);

    // ==========================================
    // 5. 案例展示过滤 (Portfolio Filter)
    // ==========================================
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const filterValue = button.getAttribute("data-filter");
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute("data-category");
                if (filterValue === "all" || filterValue === itemCategory) {
                    item.style.display = "flex";
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    }, 50);
                } else {
                    item.style.opacity = "0";
                    item.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        item.style.display = "none";
                    }, 300);
                }
            });
        });
    });

    // ==========================================
    // 6. 留言表单 Formspree 提交与交互验证
    // ==========================================
    const contactForm = document.getElementById("contact-form");
    const formSubmitBtn = document.getElementById("btn-submit-form");
    const statusMsg = document.getElementById("form-status-msg");

    if (contactForm && formSubmitBtn && statusMsg) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const originalBtnText = formSubmitBtn.textContent;
            formSubmitBtn.textContent = i18n[currentLang].form_sending || (currentLang === "zh" ? "发送中..." : "Sending...");
            formSubmitBtn.disabled = true;

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            })
            .then(response => {
                if (response.ok) {
                    statusMsg.textContent = i18n[currentLang].form_success;
                    statusMsg.className = "status-msg success";
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (data && data.errors) {
                            statusMsg.textContent = data.errors.map(error => error.message).join(", ");
                        } else {
                            statusMsg.textContent = i18n[currentLang].form_error_generic;
                        }
                    });
                    statusMsg.className = "status-msg error";
                }
            })
            .catch(() => {
                statusMsg.textContent = i18n[currentLang].form_error_network;
                statusMsg.className = "status-msg error";
            })
            .finally(() => {
                formSubmitBtn.textContent = originalBtnText;
                formSubmitBtn.disabled = false;
                setTimeout(() => {
                    statusMsg.className = "status-msg hide";
                }, 4000);
            });
        });
    }
});

