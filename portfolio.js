import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Firebase configuration
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

// Function to extract video ID from YouTube/Vimeo URLs, or return image URL
function processUrl(url) {
    let embedUrl = '';
    let isVideo = false;

    // YouTube matches: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    // Vimeo matches: vimeo.com/ID
    const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/);
    // Bilibili matches: b23.tv/xxx or bilibili.com/video/BVxxx
    const biliMatch = url.match(/bilibili\.com\/video\/(BV[a-zA-Z0-9]+)/);
    // TikTok matches: tiktok.com/@user/video/ID
    const tiktokMatch = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);

    if (ytMatch && ytMatch[1]) {
        embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
        isVideo = true;
    } else if (vimeoMatch && vimeoMatch[3]) {
        embedUrl = `https://player.vimeo.com/video/${vimeoMatch[3]}`;
        isVideo = true;
    } else if (biliMatch && biliMatch[1]) {
        embedUrl = `https://player.bilibili.com/player.html?bvid=${biliMatch[1]}&page=1`;
        isVideo = true;
    } else if (tiktokMatch && tiktokMatch[1]) {
        embedUrl = `https://www.tiktok.com/embed/v2/${tiktokMatch[1]}`;
        isVideo = true;
    } else {
        // Assume it's a direct image URL or unsupported video (fallback to just linking or treating as image)
        embedUrl = url;
        isVideo = false;
    }

    return { embedUrl, isVideo };
}

async function loadPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    try {
        const q = query(collection(db, "portfolio"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        grid.innerHTML = ''; // Clear loading state

        if (querySnapshot.empty) {
            grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary);">暂无展示项目，请到后台添加。</div>';
            return;
        }

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const { embedUrl, isVideo } = processUrl(data.url);
            
            let catName = '';
            let iconClass = 'fa-solid fa-star';
            if(data.category === 'design') { catName = 'UI/UX 设计'; iconClass = 'fa-solid fa-wand-magic-sparkles'; }
            else if(data.category === 'dev') { catName = '技术开发'; iconClass = 'fa-solid fa-server'; }
            else if(data.category === 'brand') { catName = '品牌创意'; iconClass = 'fa-solid fa-bezier-curve'; }
            else if(data.category === 'photo') { catName = '商业摄影 / 视频'; iconClass = 'fa-solid fa-camera'; }

            const itemDiv = document.createElement('div');
            itemDiv.className = `portfolio-item glass-card`;
            itemDiv.setAttribute('data-category', data.category);

            // Create media wrapper
            let mediaContent = '';
            if (isVideo) {
                mediaContent = `<iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width: 100%; height: 220px; border-radius: 12px 12px 0 0; display: block;"></iframe>`;
            } else {
                // If it's an image
                mediaContent = `<div style="width: 100%; height: 220px; background-image: url('${embedUrl}'); background-size: cover; background-position: center; border-radius: 12px 12px 0 0;"></div>`;
            }

            itemDiv.innerHTML = `
                <div style="border-radius: 12px 12px 0 0; overflow: hidden; position: relative;">
                    ${mediaContent}
                    ${!isVideo && !embedUrl.match(/\.(jpeg|jpg|gif|png)$/i) ? `<div class="portfolio-placeholder-img img-${data.category}" style="position:absolute; top:0; left:0; right:0; bottom:0; display:flex; justify-content:center; align-items:center;"><i class="${iconClass}"></i></div>` : ''}
                </div>
                <div class="portfolio-info" style="padding: 25px;">
                    <span class="portfolio-cat">${catName}</span>
                    <h3 style="margin-top: 10px; margin-bottom: 10px; font-size: 1.25rem;">${data.title}</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.5;">${data.description}</p>
                </div>
            `;
            
            grid.appendChild(itemDiv);
        });

        // Re-initialize filtering logic (since items are dynamically loaded)
        initializeFilters();

    } catch (error) {
        console.error("Error fetching portfolio: ", error);
        grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: #ff4d4d;">加载作品集失败，请稍后再试。</div>';
    }
}

function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });
}

// Call load function when DOM is ready
document.addEventListener('DOMContentLoaded', loadPortfolio);
