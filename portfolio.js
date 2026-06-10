
const firebaseConfig = {
    apiKey: "AIzaSyBC49v7s4RbFSjblR0xLP66vWX7nxNO1nY",
    authDomain: "artistech-portfolio.firebaseapp.com",
    projectId: "artistech-portfolio",
    storageBucket: "artistech-portfolio.firebasestorage.app",
    messagingSenderId: "1059592321021",
    appId: "1:1059592321021:web:4edcb8b7bfaa0bc0edcb94"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var loadedData = {};

function processUrl(url) {
    var embedUrl = '', isVideo = false, tiktokVideoId = '';
    var ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    var vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/);
    var biliMatch = url.match(/bilibili\.com\/video\/(BV[a-zA-Z0-9]+)/);
    var tiktokMatch = url.match(/tiktok\.com\/.*video\/(\d+)/);
    if (ytMatch && ytMatch[1]) { embedUrl = 'https://www.youtube.com/embed/' + ytMatch[1]; isVideo = true; }
    else if (vimeoMatch && vimeoMatch[3]) { embedUrl = 'https://player.vimeo.com/video/' + vimeoMatch[3]; isVideo = true; }
    else if (biliMatch && biliMatch[1]) { embedUrl = 'https://player.bilibili.com/player.html?bvid=' + biliMatch[1] + '&page=1'; isVideo = true; }
    else if (tiktokMatch && tiktokMatch[1]) { tiktokVideoId = tiktokMatch[1]; embedUrl = 'tiktok:' + tiktokVideoId; isVideo = true; }
    else { embedUrl = url; isVideo = false; }
    return { embedUrl: embedUrl, isVideo: isVideo, tiktokVideoId: tiktokVideoId };
}

function getCatLabel(cat) {
    var catKey = 'filter_' + cat;
    var lang = window.currentLang || 'zh';
    if (window.i18nData && window.i18nData[lang] && window.i18nData[lang][catKey] !== undefined) return window.i18nData[lang][catKey];
    var labels = { design: 'UI/UX 设计', dev: '技术开发', brand: '品牌创意', photo: '商业摄影 / 视频' };
    return labels[cat] || cat;
}

function t(key) {
    var lang = window.currentLang || 'zh';
    if (window.i18nData && window.i18nData[lang] && window.i18nData[lang][key]) return window.i18nData[lang][key];
    return key;
}

function loc(data, field) {
    var lang = window.currentLang || 'zh';
    if (lang === 'en') { var enField = field + 'En'; if (data[enField]) return data[enField]; }
    return data[field] || '';
}

function openCaseModal(data) {
    var modal = document.getElementById('case-modal');
    var body = document.getElementById('case-modal-body');
    if (!modal || !body) return;
    var pu = processUrl(data.url), catLabel = getCatLabel(data.category), mediaHtml = '';
    if (pu.tiktokVideoId) {
        mediaHtml = '<div style="text-align:center;padding:40px;"><i class="fa-brands fa-tiktok" style="font-size:3rem;"></i><p style="margin-top:12px;">TikTok</p><a href="https://www.tiktok.com/video/' + pu.tiktokVideoId + '" target="_blank" class="btn btn-outline" style="margin-top:12px;display:inline-flex;">' + t('modal_view_video') + '</a></div>';
    } else if (pu.isVideo) {
        mediaHtml = '<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;"><iframe src="' + pu.embedUrl + '" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div>';
    } else {
        mediaHtml = '<div style="width:100%;height:350px;background-image:url(\'' + pu.embedUrl + '\');background-size:cover;background-position:center;border-radius:12px;"></div>';
    }
    var extraDetails = '';
    if (loc(data, 'clientName')) extraDetails += '<div class="modal-detail-item"><span class="modal-detail-label">' + t('modal_client') + '</span><span>' + loc(data, 'clientName') + '</span></div>';
    if (loc(data, 'industry')) extraDetails += '<div class="modal-detail-item"><span class="modal-detail-label">' + t('modal_industry') + '</span><span>' + loc(data, 'industry') + '</span></div>';
    if (data.techStack) extraDetails += '<div class="modal-detail-item"><span class="modal-detail-label">' + t('modal_tech') + '</span><span>' + data.techStack + '</span></div>';
    if (loc(data, 'results')) extraDetails += '<div class="modal-detail-item"><span class="modal-detail-label">' + t('modal_results') + '</span><span style="color:var(--color-accent);font-weight:600;">' + loc(data, 'results') + '</span></div>';
    var testimonialHtml = '';
    if (loc(data, 'testimonial')) testimonialHtml = '<div class="modal-testimonial"><i class="fa-solid fa-quote-left" style="color:var(--color-primary);opacity:0.3;font-size:1.5rem;margin-bottom:8px;"></i><p style="font-style:italic;color:var(--text-muted);line-height:1.7;">' + loc(data, 'testimonial') + '</p>' + (loc(data, 'testimonialAuthor') ? '<p style="margin-top:8px;font-weight:500;color:var(--text-main);">— ' + loc(data, 'testimonialAuthor') + '</p>' : '') + '</div>';
    body.innerHTML = '<div class="modal-case-media">' + mediaHtml + '</div><div class="modal-case-info"><span class="portfolio-cat">' + catLabel + '</span><h2 style="margin:12px 0 8px;font-family:var(--font-title);font-size:1.6rem;">' + loc(data, 'title') + '</h2>' + (loc(data, 'description') ? '<p style="color:var(--text-muted);line-height:1.7;margin-bottom:20px;">' + loc(data, 'description') + '</p>' : '') + (extraDetails ? '<div class="modal-details-grid">' + extraDetails + '</div>' : '') + testimonialHtml + '<button class="btn btn-primary inquiry-trigger-btn" data-case-id="' + (data.id || '') + '" data-case-title="' + loc(data, 'title') + '" data-case-category="' + data.category + '"><i class="fa-solid fa-paper-plane"></i> ' + t('modal_inquiry_btn') + '</button></div>';
    modal.style.display = 'flex'; document.body.style.overflow = 'hidden';
    var trigBtn = body.querySelector('.inquiry-trigger-btn');
    if (trigBtn) trigBtn.addEventListener('click', function() { closeCaseModal(); openInquiryModal(trigBtn.dataset.caseId, trigBtn.dataset.caseTitle, trigBtn.dataset.caseCategory); });
}

function closeCaseModal() { var m = document.getElementById('case-modal'); if (m) { m.style.display = 'none'; document.body.style.overflow = ''; } }
function openInquiryModal(caseId, caseTitle, caseCategory) {
    var m = document.getElementById('inquiry-modal'); if (!m) return;
    document.getElementById('inq-case-id').value = caseId || '';
    document.getElementById('inq-case-title').value = caseTitle || '';
    document.getElementById('inq-service').value = caseTitle ? '「' + getCatLabel(caseCategory) + '」' + caseTitle : (getCatLabel(caseCategory) || '综合咨询');
    document.getElementById('inquiry-form').reset();
    document.getElementById('inq-case-id').value = caseId || '';
    document.getElementById('inq-case-title').value = caseTitle || '';
    var s = document.getElementById('inquiry-status'); if (s) { s.className = 'status-msg hide'; s.textContent = ''; }
    m.style.display = 'flex'; document.body.style.overflow = 'hidden';
}
function closeInquiryModal() { var m = document.getElementById('inquiry-modal'); if (m) { m.style.display = 'none'; document.body.style.overflow = ''; } }

function initInquiryForm() {
    var form = document.getElementById('inquiry-form'), sb = document.getElementById('btn-inquiry-submit'), se = document.getElementById('inquiry-status');
    if (!form || !sb || !se) return;
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        var data = { name: document.getElementById('inq-name').value, email: document.getElementById('inq-email').value,
            phone: document.getElementById('inq-phone').value || '', serviceInterest: document.getElementById('inq-service').value,
            caseId: document.getElementById('inq-case-id').value || '', caseTitle: document.getElementById('inq-case-title').value || '',
            message: document.getElementById('inq-message').value, status: 'new', createdAt: firebase.firestore.FieldValue.serverTimestamp() };
        sb.disabled = true; sb.textContent = '发送中...';
        try {
            await db.collection("inquiries").add(data);
            se.textContent = '询价提交成功！我们会在24小时内与您联系。'; se.className = 'status-msg success';
            form.reset(); if (data.serviceInterest) document.getElementById('inq-service').value = data.serviceInterest;
            setTimeout(closeInquiryModal, 2500);
        } catch (error) { se.textContent = '提交失败，请稍后再试。'; se.className = 'status-msg error'; }
        finally { sb.disabled = false; sb.textContent = '提交询价'; setTimeout(function() { se.className = 'status-msg hide'; }, 4000); }
    });
}

function renderPortfolioItem(data) {
    var pu = processUrl(data.url), catLabel = getCatLabel(data.category);
    var iconClass = { design: 'fa-solid fa-wand-magic-sparkles', dev: 'fa-solid fa-server', brand: 'fa-solid fa-bezier-curve', photo: 'fa-solid fa-camera' }[data.category] || 'fa-solid fa-star';
    var div = document.createElement('div');
    div.className = 'portfolio-item glass-card' + (pu.tiktokVideoId ? ' tiktok-card' : '');
    div.setAttribute('data-category', data.category); div.setAttribute('data-id', data.id);
    var mediaHtml = '';
    if (pu.tiktokVideoId) {
        mediaHtml = '<div style="padding:0;position:relative;"><blockquote class="tiktok-embed" cite="https://www.tiktok.com/video/' + pu.tiktokVideoId + '" data-video-id="' + pu.tiktokVideoId + '" style="max-width:100%;min-width:0;margin:0;padding:0;border:none;background:transparent;"><section></section></blockquote></div>';
        setTimeout(function() { var o = document.getElementById('tiktok-embed-script'); if (o) o.remove(); var s = document.createElement('script'); s.id = 'tiktok-embed-script'; s.src = 'https://www.tiktok.com/embed.js'; s.async = true; document.body.appendChild(s); }, 150);
    } else if (pu.isVideo) {
        var h = data.url.indexOf('/shorts/') >= 0 ? '560px' : '220px';
        mediaHtml = '<iframe src="' + pu.embedUrl + '" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen style="width:100%;height:' + h + ';border-radius:12px 12px 0 0;display:block;"></iframe>';
    } else {
        mediaHtml = '<div style="width:100%;height:220px;background-image:url(\'' + pu.embedUrl + '\');background-size:cover;background-position:center;border-radius:12px 12px 0 0;"></div>';
        if (!pu.embedUrl.match(/\.(jpeg|jpg|gif|png)$/i)) mediaHtml += '<div class="portfolio-placeholder-img img-' + data.category + '" style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;"><i class="' + iconClass + '"></i></div>';
    }
    var badges = '';
    if (loc(data, 'clientName')) badges += '<span class="p-badge"><i class="fa-solid fa-user"></i> ' + loc(data, 'clientName') + '</span>';
    if (loc(data, 'industry')) badges += '<span class="p-badge"><i class="fa-solid fa-tag"></i> ' + loc(data, 'industry') + '</span>';
    if (loc(data, 'results')) badges += '<span class="p-badge p-badge-accent"><i class="fa-solid fa-chart-line"></i> ' + loc(data, 'results') + '</span>';
    var tstPrev = '';
    if (loc(data, 'testimonial')) { var tst = loc(data, 'testimonial'); tstPrev = '<div class="p-testimonial-preview"><i class="fa-solid fa-quote-left" style="color:var(--color-primary);opacity:0.4;font-size:0.8rem;"></i> ' + (tst.length > 80 ? tst.slice(0, 80) + '...' : tst) + '</div>'; }
    var desc = loc(data, 'description');
    div.innerHTML = '<div style="position:relative;">' + mediaHtml + '</div><div class="portfolio-info" style="padding:20px 22px 22px;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><span class="portfolio-cat">' + catLabel + '</span>' + (data.techStack ? '<span style="font-size:0.75rem;color:var(--text-muted);"><i class="fa-solid fa-code"></i> ' + data.techStack + '</span>' : '') + '</div><h3 style="margin-top:6px;margin-bottom:8px;font-size:1.15rem;font-weight:600;">' + loc(data, 'title') + '</h3>' + (desc ? '<p style="color:var(--text-muted);font-size:0.9rem;line-height:1.5;margin-bottom:10px;">' + (desc.length > 100 ? desc.slice(0, 100) + '...' : desc) + '</p>' : '') + (badges ? '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;">' + badges + '</div>' : '') + tstPrev + '<div style="display:flex;gap:8px;margin-top:14px;"><button class="btn btn-outline view-detail-btn" data-id="' + data.id + '" style="flex:1;padding:8px 16px;font-size:0.85rem;"><i class="fa-solid fa-eye"></i> ' + t('modal_view_detail') + '</button><button class="btn btn-primary inquiry-btn" data-id="' + data.id + '" data-title="' + loc(data, 'title') + '" data-category="' + data.category + '" style="flex:1;padding:8px 16px;font-size:0.85rem;"><i class="fa-solid fa-paper-plane"></i> ' + t('modal_inquiry_btn2') + '</button></div></div>';
    return div;
}

async function loadPortfolio() {
    var grid = document.getElementById('portfolio-grid'); if (!grid) return;
    try {
        var snap = await db.collection("portfolio").orderBy("createdAt", "desc").get();
        grid.innerHTML = '';
        if (snap.empty) { grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:60px 0;">暂无展示项目，请到后台添加。</div>'; return; }
        var docs = [];
        snap.forEach(function(docSnap) { var data = Object.assign({ id: docSnap.id }, docSnap.data()); loadedData[docSnap.id] = data; docs.push(data); });
        docs.forEach(function(data) { grid.appendChild(renderPortfolioItem(data)); });
        initializeFilters();
        document.querySelectorAll('.view-detail-btn').forEach(function(btn) { btn.addEventListener('click', function(e) { e.stopPropagation(); var id = e.currentTarget.getAttribute('data-id'); if (loadedData[id]) openCaseModal(loadedData[id]); }); });
        document.querySelectorAll('.inquiry-btn').forEach(function(btn) { btn.addEventListener('click', function(e) { e.stopPropagation(); openInquiryModal(e.currentTarget.getAttribute('data-id'), e.currentTarget.getAttribute('data-title'), e.currentTarget.getAttribute('data-category')); }); });
    } catch (error) { console.error("Portfolio error:", error); grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#ff4d4d;padding:60px 0;">加载失败，请确认 Firestore 已开通。</div>'; }
}

function initializeFilters() {
    document.querySelectorAll('.filter-btn').forEach(function(btn) { btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); }); btn.classList.add('active');
        var val = btn.getAttribute('data-filter');
        document.querySelectorAll('.portfolio-item').forEach(function(item) {
            if (val === 'all' || item.getAttribute('data-category') === val) { item.style.display = 'block'; setTimeout(function() { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 50); }
            else { item.style.opacity = '0'; item.style.transform = 'translateY(20px)'; setTimeout(function() { item.style.display = 'none'; }, 300); }
        });
    }); });
}

function updatePortfolioLang() {
    document.querySelectorAll('[data-i18n^="filter_"]').forEach(function(el) {
        var key = el.getAttribute('data-i18n'), lang = window.currentLang || 'zh';
        if (window.i18nData && window.i18nData[lang] && window.i18nData[lang][key] !== undefined) el.textContent = window.i18nData[lang][key];
    });
}
window.updatePortfolioLang = updatePortfolioLang;

document.addEventListener('DOMContentLoaded', function() {
    loadPortfolio(); initInquiryForm();
    var cc = document.getElementById('case-modal-close'), ic = document.getElementById('inquiry-modal-close');
    if (cc) cc.addEventListener('click', closeCaseModal); if (ic) ic.addEventListener('click', closeInquiryModal);
    var cm = document.getElementById('case-modal'), im = document.getElementById('inquiry-modal');
    if (cm) cm.addEventListener('click', function(e) { if (e.target === e.currentTarget) closeCaseModal(); });
    if (im) im.addEventListener('click', function(e) { if (e.target === e.currentTarget) closeInquiryModal(); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') { closeCaseModal(); closeInquiryModal(); } });
});
