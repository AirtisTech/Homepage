
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

// ========== TOAST / CONFIRM ==========
function showToast(msg, type) {
    var el = document.createElement('div');
    el.className = 'toast toast-' + type;
    el.innerHTML = msg;
    document.body.appendChild(el);
    setTimeout(function() { el.classList.add('show'); }, 10);
    setTimeout(function() { el.classList.remove('show'); setTimeout(function() { el.remove(); }, 300); }, 3500);
}
function showConfirm(msg) {
    return new Promise(function(resolve) {
        var overlay = document.createElement('div');
        overlay.className = 'confirm-overlay';
        overlay.innerHTML =
            '<div class="confirm-box glass-panel">' +
            '<p>' + msg + '</p>' +
            '<div class="confirm-actions">' +
            '<button class="btn btn-outline confirm-cancel">取消</button>' +
            '<button class="btn confirm-ok">确定</button>' +
            '</div></div>';
        document.body.appendChild(overlay);
        overlay.querySelector('.confirm-ok').addEventListener('click', function() { overlay.remove(); resolve(true); });
        overlay.querySelector('.confirm-cancel').addEventListener('click', function() { overlay.remove(); resolve(false); });
        overlay.addEventListener('click', function(e) { if (e.target === overlay) { overlay.remove(); resolve(false); } });
    });
}

// ========== AUTH ==========
var loginEl = document.getElementById('login-container');
var dashEl = document.getElementById('admin-dashboard');
var loginForm = document.getElementById('login-form');
var logoutBtn = document.getElementById('logout-btn');
var errMsg = document.getElementById('login-error');

if (localStorage.getItem('artistech_admin') === 'true') showDashboard();

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (document.getElementById('admin-password').value === 'admin123') {
        localStorage.setItem('artistech_admin', 'true');
        showDashboard();
    } else {
        errMsg.style.display = 'block';
    }
});

logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('artistech_admin');
    loginEl.style.display = 'block';
    dashEl.style.display = 'none';
});

function showDashboard() {
    loginEl.style.display = 'none';
    dashEl.style.display = 'block';
    loadPortfolio();
    loadInquiries();
}

// ========== TABS ==========
document.querySelectorAll('.admin-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.admin-tab').forEach(function(t) { t.classList.remove('active'); });
        document.querySelectorAll('.tab-content').forEach(function(c) { c.classList.remove('active'); });
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// ========== FORM LANGUAGE TOGGLE ==========
document.querySelectorAll('.lang-field-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var lang = btn.dataset.lang;
        document.querySelectorAll('.lang-field-btn').forEach(function(b) { b.classList.toggle('active', b.dataset.lang === lang); });
        document.querySelectorAll('.field-zh').forEach(function(el) { el.style.display = lang === 'zh' ? '' : 'none'; });
        document.querySelectorAll('.field-en').forEach(function(el) { el.style.display = lang === 'en' ? '' : 'none'; });
        document.getElementById('p-title').required = (lang === 'zh');
        document.getElementById('p-title-en').required = (lang === 'en');
    });
});
document.getElementById('p-title-en').removeAttribute('required');

// ========== PORTFOLIO FORM ==========
var addForm = document.getElementById('add-portfolio-form');
var saveBtn = document.getElementById('save-btn');
var cancelBtn = document.getElementById('cancel-edit-btn');
var loadedItems = {};

function cancelEdit() {
    document.getElementById('p-id').value = '';
    addForm.reset();
    if (cancelBtn) cancelBtn.style.display = 'none';
    saveBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> 保存并发布';
    document.querySelectorAll('.lang-field-btn').forEach(function(b) { b.classList.toggle('active', b.dataset.lang === 'zh'); });
    document.querySelectorAll('.field-en').forEach(function(el) { el.style.display = 'none'; });
    document.querySelectorAll('.field-zh').forEach(function(el) { el.style.display = ''; });
}
if (cancelBtn) cancelBtn.addEventListener('click', cancelEdit);

function getFormData() {
    return {
        title: document.getElementById('p-title').value,
        titleEn: document.getElementById('p-title-en').value,
        category: document.getElementById('p-category').value,
        url: document.getElementById('p-url').value,
        clientName: document.getElementById('p-client').value,
        clientNameEn: document.getElementById('p-client-en').value,
        industry: document.getElementById('p-industry').value,
        industryEn: document.getElementById('p-industry-en').value,
        techStack: document.getElementById('p-tech').value,
        results: document.getElementById('p-results').value,
        resultsEn: document.getElementById('p-results-en').value,
        testimonial: document.getElementById('p-testimonial').value,
        testimonialEn: document.getElementById('p-testimonial-en').value,
        testimonialAuthor: document.getElementById('p-testimonial-author').value,
        testimonialAuthorEn: document.getElementById('p-testimonial-author-en').value,
        description: document.getElementById('p-desc').value,
        descriptionEn: document.getElementById('p-desc-en').value
    };
}

function setFormData(d) {
    document.getElementById('p-title').value = d.title || '';
    document.getElementById('p-title-en').value = d.titleEn || '';
    document.getElementById('p-category').value = d.category || 'design';
    document.getElementById('p-url').value = d.url || '';
    document.getElementById('p-client').value = d.clientName || '';
    document.getElementById('p-client-en').value = d.clientNameEn || '';
    document.getElementById('p-industry').value = d.industry || '';
    document.getElementById('p-industry-en').value = d.industryEn || '';
    document.getElementById('p-tech').value = d.techStack || '';
    document.getElementById('p-results').value = d.results || '';
    document.getElementById('p-results-en').value = d.resultsEn || '';
    document.getElementById('p-testimonial').value = d.testimonial || '';
    document.getElementById('p-testimonial-en').value = d.testimonialEn || '';
    document.getElementById('p-testimonial-author').value = d.testimonialAuthor || '';
    document.getElementById('p-testimonial-author-en').value = d.testimonialAuthorEn || '';
    document.getElementById('p-desc').value = d.description || '';
    document.getElementById('p-desc-en').value = d.descriptionEn || '';
}

addForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    var pId = document.getElementById('p-id').value;
    var formData = getFormData();

    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 保存中...';

    try {
        if (pId) {
            await db.collection("portfolio").doc(pId).update(formData);
            showToast('✅ 作品更新成功！', 'success');
        } else {
            await db.collection("portfolio").add(Object.assign({}, formData, { createdAt: firebase.firestore.FieldValue.serverTimestamp() }));
            showToast('✅ 作品发布成功！返回首页即可查看。', 'success');
        }
        cancelEdit();
        loadPortfolio();
    } catch (error) {
        console.error("Error:", error);
        showToast('❌ 保存失败：' + (error.message || '请确认 Firestore 已开通'), 'error');
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = pId ? '<i class="fa-solid fa-cloud-arrow-up"></i> 更新发布' : '<i class="fa-solid fa-cloud-arrow-up"></i> 保存并发布';
    }
});

async function loadPortfolio() {
    var listEl = document.getElementById('portfolio-list');
    listEl.innerHTML = '<div class="loading">正在加载数据...</div>';

    try {
        var snap = await db.collection("portfolio").orderBy("createdAt", "desc").get();
        listEl.innerHTML = '';

        if (snap.empty) {
            listEl.innerHTML = '<div style="color: #a0a0b0; text-align:center; padding:40px;">暂无发布的作品</div>';
            return;
        }

        snap.forEach(function(docSnap) {
            var d = docSnap.data();
            var id = docSnap.id;
            loadedItems[id] = d;

            var catName = { design: 'UI/UX 设计', dev: '技术开发', brand: '品牌创意', photo: '商业摄影 / 视频' }[d.category] || d.category;
            var hasExtra = d.clientName || d.industry || d.techStack || d.testimonial;

            var div = document.createElement('div');
            div.className = 'p-item';
            div.innerHTML =
                '<div class="p-item-info">' +
                '<h4>' + d.title + '</h4>' +
                '<span>' + catName + '</span>' +
                (hasExtra ? '<i class="fa-solid fa-circle-info" style="color:var(--color-secondary);margin-left:8px;font-size:0.8rem;" title="含扩展信息"></i>' : '') +
                (d.clientName ? '<small style="color:var(--text-secondary);display:block;margin-top:4px;">👤 ' + d.clientName + '</small>' : '') +
                '</div>' +
                '<div>' +
                '<button class="edit-btn" data-id="' + id + '" title="编辑"><i class="fa-solid fa-pen"></i></button>' +
                '<button class="del-btn" data-id="' + id + '" title="删除"><i class="fa-solid fa-trash"></i></button>' +
                '</div>';
            listEl.appendChild(div);
        });

        document.querySelectorAll('.edit-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                var id = e.currentTarget.getAttribute('data-id');
                var d = loadedItems[id];
                document.getElementById('p-id').value = id;
                setFormData(d);
                if (cancelBtn) cancelBtn.style.display = 'block';
                saveBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> 更新发布';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
        document.querySelectorAll('.del-btn').forEach(function(btn) {
            btn.addEventListener('click', async function(e) {
                if (await showConfirm('确定要删除这个作品吗？')) {
                    await db.collection("portfolio").doc(e.currentTarget.getAttribute('data-id')).delete();
                    showToast('🗑️ 作品已删除', 'success');
                    loadPortfolio();
                }
            });
        });
    } catch (error) {
        console.error("Error:", error);
        listEl.innerHTML = '<div style="color: #ff4d4d; text-align:center; padding:40px;">加载失败。请确认 Firestore 已开通。</div>';
    }
}

// ========== INQUIRIES ==========
var allInquiries = [];
var inquiryFilter = 'all';

function getStatusText(s) { return { new: '未读', contacted: '已联系', closed: '已关闭' }[s] || s; }
function getStatusClass(s) { return { new: 'status-new', contacted: 'status-contacted', closed: 'status-closed' }[s] || ''; }

async function loadInquiries() {
    var listEl = document.getElementById('inquiry-list');
    listEl.innerHTML = '<div class="loading">正在加载数据...</div>';
    try {
        var snap = await db.collection("inquiries").orderBy("createdAt", "desc").get();
        allInquiries = [];
        snap.forEach(function(docSnap) { allInquiries.push(Object.assign({ id: docSnap.id }, docSnap.data())); });
        renderInquiries();
        updateBadge();
    } catch (error) {
        console.error("Error:", error);
        listEl.innerHTML = '<div style="color: #ff4d4d; text-align:center; padding:40px;">加载询价列表失败。</div>';
    }
}

function renderInquiries() {
    var listEl = document.getElementById('inquiry-list');
    var filtered = inquiryFilter === 'all' ? allInquiries : allInquiries.filter(function(i) { return i.status === inquiryFilter; });

    if (filtered.length === 0) {
        listEl.innerHTML = '<div style="color: #a0a0b0; text-align:center; padding:40px;">暂无询价记录</div>';
        return;
    }

    listEl.innerHTML = filtered.map(function(inq) {
        var date = inq.createdAt && inq.createdAt.toDate ? inq.createdAt.toDate().toLocaleString('zh-CN') : '刚刚';
        return '<div class="inq-card ' + (inq.status === 'new' ? 'inq-new' : '') + '">' +
            '<div class="inq-header"><strong>' + inq.name + '</strong><span class="inq-status ' + getStatusClass(inq.status) + '">' + getStatusText(inq.status) + '</span></div>' +
            '<div class="inq-meta"><span><i class="fa-solid fa-envelope"></i> ' + inq.email + '</span>' +
            (inq.phone ? '<span><i class="fa-solid fa-phone"></i> ' + inq.phone + '</span>' : '') +
            '<span><i class="fa-solid fa-clock"></i> ' + date + '</span></div>' +
            (inq.serviceInterest ? '<div class="inq-service">感兴趣：' + inq.serviceInterest + '</div>' : '') +
            (inq.message ? '<div class="inq-message">' + inq.message + '</div>' : '') +
            '<div class="inq-actions">' +
            (inq.status !== 'contacted' ? '<button class="inq-action-btn contact-btn" data-id="' + inq.id + '" data-action="contacted"><i class="fa-solid fa-check"></i> 标记已联系</button>' : '') +
            (inq.status !== 'closed' ? '<button class="inq-action-btn close-btn" data-id="' + inq.id + '" data-action="closed"><i class="fa-solid fa-check-double"></i> 标记已关闭</button>' : '') +
            '</div></div>';
    }).join('');

    document.querySelectorAll('.inq-action-btn').forEach(function(btn) {
        btn.addEventListener('click', async function(e) {
            var id = e.currentTarget.getAttribute('data-id');
            var action = e.currentTarget.getAttribute('data-action');
            await db.collection("inquiries").doc(id).update({ status: action });
            loadInquiries();
        });
    });
}

function updateBadge() {
    var unread = allInquiries.filter(function(i) { return i.status === 'new'; }).length;
    var badge = document.getElementById('inquiry-count-badge');
    var unreadBadge = document.getElementById('unread-badge');
    if (badge) { badge.textContent = unread; badge.style.display = unread > 0 ? 'inline' : 'none'; }
    if (unreadBadge) { unreadBadge.textContent = unread; unreadBadge.style.display = unread > 0 ? 'inline-flex' : 'none'; }
}

document.querySelectorAll('.inq-filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.inq-filter-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        inquiryFilter = btn.getAttribute('data-status');
        renderInquiries();
    });
});

