import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Firebase configuration from user
const firebaseConfig = {
    apiKey: "AIzaSyBC49v7s4RbFSjblR0xLP66vWX7nxNO1nY",
    authDomain: "airtis-portfolio.firebaseapp.com",
    projectId: "airtis-portfolio",
    storageBucket: "airtis-portfolio.firebasestorage.app",
    messagingSenderId: "1059592321021",
    appId: "1:1059592321021:web:4edcb8b7bfaa0bc0edcb94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const portfolioRef = collection(db, "portfolio");

// Simple frontend auth
const loginContainer = document.getElementById('login-container');
const dashboardContainer = document.getElementById('admin-dashboard');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const errorMsg = document.getElementById('login-error');

// Check login status
if (localStorage.getItem('airtis_admin') === 'true') {
    showDashboard();
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pwd = document.getElementById('admin-password').value;
    if (pwd === 'airtis2026') { // 简单密码保护
        localStorage.setItem('airtis_admin', 'true');
        showDashboard();
    } else {
        errorMsg.style.display = 'block';
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('airtis_admin');
    loginContainer.style.display = 'block';
    dashboardContainer.style.display = 'none';
});

function showDashboard() {
    loginContainer.style.display = 'none';
    dashboardContainer.style.display = 'block';
    loadPortfolio();
}

// Portfolio Form Handling
const addForm = document.getElementById('add-portfolio-form');
const saveBtn = document.getElementById('save-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
let loadedItems = {};

function cancelEdit() {
    document.getElementById('p-id').value = '';
    addForm.reset();
    if(cancelEditBtn) cancelEditBtn.style.display = 'none';
    saveBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> 保存并发布';
}

if(cancelEditBtn) {
    cancelEditBtn.addEventListener('click', cancelEdit);
}

addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const pId = document.getElementById('p-id').value;
    const title = document.getElementById('p-title').value;
    const category = document.getElementById('p-category').value;
    const url = document.getElementById('p-url').value;
    const desc = document.getElementById('p-desc').value;
    
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 保存中...';

    try {
        if (pId) {
            await updateDoc(doc(db, "portfolio", pId), {
                title: title,
                category: category,
                url: url,
                description: desc
            });
            alert('作品更新成功！');
        } else {
            await addDoc(portfolioRef, {
                title: title,
                category: category,
                url: url,
                description: desc,
                createdAt: serverTimestamp()
            });
            alert('作品发布成功！返回首页即可查看。');
        }
        
        cancelEdit();
        loadPortfolio();
    } catch (error) {
        console.error("Error saving document: ", error);
        alert('保存失败：' + error.message);
    } finally {
        saveBtn.disabled = false;
        if (!document.getElementById('p-id').value) {
            saveBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> 保存并发布';
        } else {
            saveBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> 更新发布';
        }
    }
});

// Load and display portfolio items
async function loadPortfolio() {
    const listContainer = document.getElementById('portfolio-list');
    listContainer.innerHTML = '<div class="loading">正在加载数据...</div>';
    
    try {
        const q = query(portfolioRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        listContainer.innerHTML = '';
        
        if (querySnapshot.empty) {
            listContainer.innerHTML = '<div style="color: #a0a0b0;">暂无发布的作品</div>';
            return;
        }

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const id = docSnap.id;
            loadedItems[id] = data;
            
            let catName = '';
            if(data.category === 'design') catName = 'UI/UX 设计';
            else if(data.category === 'dev') catName = '技术开发';
            else if(data.category === 'brand') catName = '品牌创意';
            else if(data.category === 'photo') catName = '商业摄影 / 视频';
            
            const div = document.createElement('div');
            div.className = 'p-item';
            div.innerHTML = `
                <div class="p-item-info">
                    <h4>${data.title}</h4>
                    <span>${catName}</span>
                </div>
                <div>
                    <button class="edit-btn" data-id="${id}" title="编辑"><i class="fa-solid fa-pen"></i></button>
                    <button class="del-btn" data-id="${id}" title="删除"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            listContainer.appendChild(div);
        });

        // Attach edit events
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const data = loadedItems[id];
                document.getElementById('p-id').value = id;
                document.getElementById('p-title').value = data.title;
                document.getElementById('p-category').value = data.category;
                document.getElementById('p-url').value = data.url;
                document.getElementById('p-desc').value = data.description || '';
                
                if(cancelEditBtn) cancelEditBtn.style.display = 'block';
                saveBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> 更新发布';
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        // Attach delete events
        document.querySelectorAll('.del-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                if (confirm('确定要删除这个作品吗？')) {
                    await deleteDoc(doc(db, "portfolio", id));
                    loadPortfolio();
                }
            });
        });

    } catch (error) {
        console.error("Error loading portfolio: ", error);
        listContainer.innerHTML = '<div style="color: #ff4d4d;">加载失败。请检查数据库权限或网络连接。</div>';
    }
}
