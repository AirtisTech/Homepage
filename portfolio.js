const firebaseConfig = {
    apiKey: "AIzaSyBC49v7s4RbFSjblR0xLP66vWX7nxNO1nY",
    authDomain: "artistech-portfolio.firebaseapp.com",
    projectId: "artistech-portfolio",
    storageBucket: "artistech-portfolio.firebasestorage.app",
    messagingSenderId: "1059592321021",
    appId: "1:1059592321021:web:4edcb8b7bfaa0bc0edcb94"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const loadedData = {};

function processUrl(url) {
    let embedUrl = '';
    let isVideo = false;
    let tiktokVideoId = '';
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/);
    const biliMatch = url.match(/bilibili\.com\/video\/(BV[a-zA-Z0-9]+)/);
    const tiktokMatch = url.match(/tiktok\.com\/.*video\/(\d+)/);
    if (ytMatch && ytMatch[1]) { embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`; isVideo = true; }
    else if (vimeoMatch && vimeoMatch[3]) { embedUrl = `https://player.vimeo.com/video/${vimeoMatch[3]}`; isVideo = true; }
    else if (biliMatch && biliMatch[1]) { embedUrl = `https://player.bilibili.com/player.html?bvid=${biliMatch[1]}&page=1`; isVideo = true; }
    else if (tiktokMatch && tiktokMatch[1]) { tiktokVideoId = tiktokMatch[1]; embedUrl = `tiktok:${tiktokVideoId}`; isVideo = true; }
    else { embedUrl = url; isVideo = false; }
    return { embedUrl, isVideo, tiktokVideoId };
}

function getCatLabel(cat) {
    const catKey = 'filter_' + cat;
    const lang = window.currentLang || 'zh';
    if (window.i18nData && window.i18nData[lang] && window.i18nData[lang][catKey] !== undefined) {
        return window.i18nData[lang][catKey];
    }
    const labels = { design: 'UI/UX 设计', dev: '技术开发', brand: '品牌创意', photo: '商业摄影 / 视频' };
    return labels[cat] || cat;
}

// Get localized field - uses zh field as fallback if en is empty

function t(key) {
    var lang = window.currentLang || 'zh';
    if (window.i18nData && window.i18nData[lang] && window.i18nData[lang][key]) {
        return window.i18nData[lang][key];
    }
    return key;
}

function loc(data, field) {
    const lang = window.currentLang || 'zh';
    if (lang === 'en') {
        const enField = field + 'En';
        if (data[enField]) return data[enField];
    }
    return data[field] || '';
}


// ========== CASE DETAIL MODAL ==========
function openCaseModal(data) {
    const modal = document.getElementById('case-modal');
    const body = document.getElementById('case-modal-body');
    if (!modal || !body) return;

    const { embedUrl, isVideo, tiktokVideoId } = processUrl(data.url);
    const catLabel = getCatLabel(data.category);

    let mediaHtml = '';
    if (tiktokVideoId) {
        mediaHtml = `<div style="text-align:center;padding:40px;color:var(--text-muted);"><i class="fa-brands fa-tiktok" style="font-size:3rem;"></i><p style="margin-top:12px;">TikTok 视频</p><a href="https://www.tiktok.com/video/${tiktokVideoId}" target="_blank" rel="noopener" class="btn btn-outline" style="margin-top:12px;display:inline-flex;">${t('modal_view_video')}</a></div>`;
    } else if (isVideo) {
        mediaHtml = `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;"><iframe src="${embedUrl}" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:12px;"></iframe></div>`;
    } else {
        mediaHtml = `<div style="width:100%;height:350px;background-image:url('${embedUrl}');background-size:cover;background-position:center;border-radius:12px;"></div>`;
    }

    let extraDetails = '';
    if (loc(data, 'clientName')) extraDetails += `<div class="modal-detail-item"><span class="modal-detail-label">${t('modal_client')}</span><span>${loc(data, 'clientName')}</span></div>`;
    if (loc(data, 'industry')) extraDetails += `<div class="modal-detail-item"><span class="modal-detail-label">${t('modal_industry')}</span><span>${loc(data, 'industry')}</span></div>`;
    if (data.techStack) extraDetails += `<div class="modal-detail-item"><span class="modal-detail-label">${t('modal_tech')}</span><span>${data.techStack}</span></div>`;
    if (loc(data, 'results')) extraDetails += `<div class="modal-detail-item"><span class="modal-detail-label">${t('modal_results')}</span><span style="color:var(--color-accent);font-weight:600;">${loc(data, 'results')}</span></div>`;

    let testimonialHtml = '';
    if (loc(data, 'testimonial')) {
        testimonialHtml = `<div class="modal-testimonial">
            <i class="fa-solid fa-quote-left" style="color:var(--color-primary);opacity:0.3;font-size:1.5rem;margin-bottom:8px;"></i>
            <p style="font-style:italic;color:var(--text-muted);line-height:1.7;">${loc(data, 'testimonial')}</p>
            ${loc(data, 'testimonialAuthor') ? `<p style="margin-top:8px;font-weight:500;color:var(--text-main);">— ${loc(data, 'testimonialAuthor')}</p>` : ''}
        </div>`;
    }

    body.innerHTML = `
        <div class="modal-case-media">${mediaHtml}</div>
        <div class="modal-case-info">
            <span class="portfolio-cat">${catLabel}</span>
            <h2 style="margin:12px 0 8px;font-family:var(--font-title);font-size:1.6rem;">${loc(data, 'title')}</h2>
            ${loc(data, 'description') ? `<p style="color:var(--text-muted);line-height:1.7;margin-bottom:20px;">${loc(data, 'description')}</p>` : ''}
            ${extraDetails ? `<div class="modal-details-grid">${extraDetails}</div>` : ''}
            ${testimonialHtml}
            <button class="btn btn-primary inquiry-trigger-btn" data-case-id="${data.id || ''}" data-case-title="${loc(data, 'title')}" data-case-category="${data.category}">
                <i class="fa-solid fa-paper-plane"></i> 咨询类似方案
            </button>
        </div>`;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    body.querySelector('.inquiry-trigger-btn')?.addEventListener('click', () => {
        const btn = body.querySelector('.inquiry-trigger-btn');
        closeCaseModal();
        openInquiryModal(btn.dataset.caseId, btn.dataset.caseTitle, btn.dataset.caseCategory);
    });
}

function closeCaseModal() {
    const modal = document.getElementById('case-modal');
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
}

// ========== INQUIRY MODAL ==========
function openInquiryModal(caseId, caseTitle, caseCategory) {
    const modal = document.getElementById('inquiry-modal');
    if (!modal) return;

    document.getElementById('inq-case-id').value = caseId || '';
    document.getElementById('inq-case-title').value = caseTitle || '';
    document.getElementById('inq-service').value = caseTitle ? `「${getCatLabel(caseCategory)}」${caseTitle}` : (getCatLabel(caseCategory) || '综合咨询');

    document.getElementById('inquiry-form').reset();
    document.getElementById('inq-case-id').value = caseId || '';
    document.getElementById('inq-case-title').value = caseTitle || '';
    const statusEl = document.getElementById('inquiry-status');
    if (statusEl) { statusEl.className = 'status-msg hide'; statusEl.textContent = ''; }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeInquiryModal() {
    const modal = document.getElementById('inquiry-modal');
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
}

// ========== INQUIRY SUBMIT ==========
function initInquiryForm() {
    const form = document.getElementById('inquiry-form');
    const submitBtn = document.getElementById('btn-inquiry-submit');
    const statusEl = document.getElementById('inquiry-status');
    if (!form || !submitBtn || !statusEl) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('inq-name').value,
            email: document.getElementById('inq-email').value,
            phone: document.getElementById('inq-phone').value || '',
            serviceInterest: document.getElementById('inq-service').value,
            caseId: document.getElementById('inq-case-id').value || '',
            caseTitle: document.getElementById('inq-case-title').value || '',
            message: document.getElementById('inq-message').value,
            status: 'new',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        submitBtn.disabled = true;
        submitBtn.textContent = '发送中...';

        try {
            await db.collection("inquiries").add(data);
            statusEl.textContent = '询价提交成功！我们会在24小时内与您联系。';
            statusEl.className = 'status-msg success';
            form.reset();
            if (data.serviceInterest) document.getElementById('inq-service').value = data.serviceInterest;
            setTimeout(closeInquiryModal, 2500);
        } catch (error) {
            console.error("Inquiry error:", error);
            statusEl.textContent = '提交失败，请稍后再试或直接发送邮件给我们。';
            statusEl.className = 'status-msg error';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = '提交询价';
            setTimeout(() => { statusEl.className = 'status-msg hide'; }, 4000);
        }
    });
}

// ========== RENDER PORTFOLIO ITEM ==========
function renderPortfolioItem(data) {
    const { embedUrl, isVideo, tiktokVideoId } = processUrl(data.url);
    const catLabel = getCatLabel(data.category);
    let iconClass = { design: 'fa-solid fa-wand-magic-sparkles', dev: 'fa-solid fa-server', brand: 'fa-solid fa-bezier-curve', photo: 'fa-solid fa-camera' }[data.category] || 'fa-solid fa-star';

    const div = document.createElement('div');
    div.className = 'portfolio-item glass-card' + (tiktokVideoId ? ' tiktok-card' : '');
    div.setAttribute('data-category', data.category);
    div.setAttribute('data-id', data.id);

    let mediaHtml = '';
    if (tiktokVideoId) {
        mediaHtml = `<div style="padding:0;position:relative;"><blockquote class="tiktok-embed" cite="https://www.tiktok.com/video/${tiktokVideoId}" data-video-id="${tiktokVideoId}" style="max-width:100%;min-width:0;margin:0;padding:0;border:none;background:transparent;"><section></section></blockquote></div>`;
        setTimeout(() => {
            const old = document.getElementById('tiktok-embed-script');
            if (old) old.remove();
            const s = document.createElement('script');
            s.id = 'tiktok-embed-script'; s.src = 'https://www.tiktok.com/embed.js'; s.async = true;
            document.body.appendChild(s);
        }, 150);
    } else if (isVideo) {
        const h = data.url.includes('/shorts/') ? '560px' : '220px';
        mediaHtml = `<iframe src="${embedUrl}" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen style="width:100%;height:${h};border-radius:12px 12px 0 0;display:block;"></iframe>`;
    } else {
        mediaHtml = `<div style="width:100%;height:220px;background-image:url('${embedUrl}');background-size:cover;background-position:center;border-radius:12px 12px 0 0;"></div>`;
        if (!embedUrl.match(/\.(jpeg|jpg|gif|png)$/i)) {
            mediaHtml += `<div class="portfolio-placeholder-img img-${data.category}" style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;"><i class="${iconClass}"></i></div>`;
        }
    }

    let badges = '';
    if (loc(data, 'clientName')) badges += `<span class="p-badge"><i class="fa-solid fa-user"></i> ${loc(data, 'clientName')}</span>`;
    if (loc(data, 'industry')) badges += `<span class="p-badge"><i class="fa-solid fa-tag"></i> ${loc(data, 'industry')}</span>`;
    if (loc(data, 'results')) badges += `<span class="p-badge p-badge-accent"><i class="fa-solid fa-chart-line"></i> ${loc(data, 'results')}</span>`;

    let testimonialPreview = '';
    if (loc(data, 'testimonial')) {
        testimonialPreview = `<div class="p-testimonial-preview"><i class="fa-solid fa-quote-left" style="color:var(--color-primary);opacity:0.4;font-size:0.8rem;"></i> ${loc(data, 'testimonial').length > 80 ? loc(data, 'testimonial').slice(0, 80) + '...' : loc(data, 'testimonial')}</div>`;
    }

    div.innerHTML = `
        <div style="position:relative;">${mediaHtml}</div>
        <div class="portfolio-info" style="padding:20px 22px 22px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <span class="portfolio-cat">${catLabel}</span>
                ${data.techStack ? `<span style="font-size:0.75rem;color:var(--text-muted);"><i class="fa-solid fa-code"></i> ${data.techStack}</span>` : ''}
            </div>
            <h3 style="margin-top:6px;margin-bottom:8px;font-size:1.15rem;font-weight:600;">${loc(data, 'title')}</h3>
            ${loc(data, 'description') ? `<p style="color:var(--text-muted);font-size:0.9rem;line-height:1.5;margin-bottom:10px;">${loc(data, 'description').length > 100 ? loc(data, 'description').slice(0, 100) + '...' : loc(data, 'description')}</p>` : ''}
            ${badges ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;">${badges}</div>` : ''}
            ${testimonialPreview}
            <div style="display:flex;gap:8px;margin-top:14px;">
                <button class="btn btn-outline view-detail-btn" data-id="${data.id}" style="flex:1;padding:8px 16px;font-size:0.85rem;"><i class="fa-solid fa-eye"></i> ${t('modal_view_detail')}</button>
                <button class="btn btn-primary inquiry-btn" data-id="${data.id}" data-title="${loc(data, 'title')}" data-category="${data.category}" style="flex:1;padding:8px 16px;font-size:0.85rem;"><i class="fa-solid fa-paper-plane"></i> ${t('modal_inquiry_btn2')}</button>
            </div>
        </div>`;

    return div;
}

// ========== LOAD PORTFOLIO ==========
async function loadPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    try {
        const snap = await db.collection("portfolio").orderBy("createdAt", "desc").get();
        grid.innerHTML = '';

        if (snap.empty) {
            grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:60px 0;">暂无展示项目，请到后台添加。</div>';
            return;
        }

        const docs = [];
        snap.forEach(docSnap => {
            const data = { id: docSnap.id, ...docSnap.data() };
            loadedData[docSnap.id] = data;
            docs.push(data);
        });

        docs.forEach(data => grid.appendChild(renderPortfolioItem(data)));

        initializeFilters();

        document.querySelectorAll('.view-detail-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = e.currentTarget.getAttribute('data-id');
                if (loadedData[id]) openCaseModal(loadedData[id]);
            });
        });
        document.querySelectorAll('.inquiry-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openInquiryModal(
                    e.currentTarget.getAttribute('data-id'),
                    e.currentTarget.getAttribute('data-title'),
                    e.currentTarget.getAttribute('data-category')
                );
            });
        });
    } catch (error) {
        console.error("Portfolio error:", error);
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#ff4d4d;padding:60px 0;">加载作品集失败，请稍后再试。</div>';
    }
}

function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const val = btn.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (val === 'all' || item.getAttribute('data-category') === val) {
                    item.style.display = 'block';
                    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 50);
                } else {
                    item.style.opacity = '0'; item.style.transform = 'translateY(20px)';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });
}

function updatePortfolioLang() {
    document.querySelectorAll('[data-i18n^="filter_"]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const lang = window.currentLang || 'zh';
        if (window.i18nData && window.i18nData[lang] && window.i18nData[lang][key] !== undefined) {
            el.textContent = window.i18nData[lang][key];
        }
    });
}
window.updatePortfolioLang = updatePortfolioLang;

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolio();
    initInquiryForm();

    document.getElementById('case-modal-close')?.addEventListener('click', closeCaseModal);
    document.getElementById('inquiry-modal-close')?.addEventListener('click', closeInquiryModal);
    document.getElementById('case-modal')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeCaseModal(); });
    document.getElementById('inquiry-modal')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeInquiryModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeCaseModal(); closeInquiryModal(); } });
});


