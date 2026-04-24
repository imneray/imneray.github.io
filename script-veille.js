// --- GESTION DU THÈME NUIT ---
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
    themeBtn.onclick = () => {
        document.body.classList.toggle('dark-mode');
        themeBtn.innerText = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    };
}

// --- BASE DE DONNÉES DES SITES ---
const sitesVeille = [
    { name: "Le Monde Informatique - Cloud", url: "https://www.lemondeinformatique.fr/actualites/cloud-computing-128.html" },
    { name: "ZDNet - Infrastructure & Data Centers", url: "https://www.zdnet.fr/actualites/infrastructure-et-data-center-3900000003.htm" },
    { name: "Linux France - Actualités", url: "https://www.linuxfrance.org/" },
    { name: "ANSSI - Sécurité & Souveraineté", url: "https://www.ssi.gouv.fr/" },
    { name: "DataCenter Magazine", url: "https://datacentermagazine.fr/" }
];

// --- LOGIQUE DES SUGGESTIONS ---
function maVeilleAuto(val) {
    const box = document.getElementById('suggestions-box');
    if (!box) return;
    
    box.innerHTML = '';
    if (val.length < 2) { box.style.display = 'none'; return; }

    let matches = sitesVeille.filter(s => s.name.toLowerCase().includes(val.toLowerCase()));

    if (matches.length > 0) {
        box.style.display = 'block';
        matches.forEach(s => {
            let d = document.createElement('div');
            d.className = 'suggestion-item';
            d.innerText = s.name;
            d.onclick = () => { window.open(s.url, '_blank'); box.style.display = 'none'; };
            box.appendChild(d);
        });
    } else { box.style.display = 'none'; }
}

// --- RECHERCHE GLOBALE AVEC ANIMATION ---
function searchWithAnimation() {
    const q = document.getElementById('veille-search').value;
    const s = document.getElementById('search-status');
    if(!q) return;
    
    s.innerHTML = '<div class="loading-bar"></div><p style="font-size:0.7rem;">Analyse du web en cours...</p>';
    
    setTimeout(() => {
        s.innerHTML = '';
        window.open("https://www.google.com/search?q=" + encodeURIComponent(q + " datacenter geopolitique"), "_blank");
    }, 1000);
}

// Fermer suggestions si clic extérieur
document.addEventListener('click', (e) => {
    const box = document.getElementById('suggestions-box');
    if (box && e.target.id !== 'veille-search') box.style.display = 'none';
});

// --- LOGIQUE DU CALENDRIER ---
const grid = document.getElementById('calendarGrid');
const mDisplay = document.getElementById('monthDisplay');
let curr = new Date();

function renderCal() {
    if (!grid || !mDisplay) return;
    grid.innerHTML = '';
    mDisplay.innerText = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(curr);
    
    let firstDay = new Date(curr.getFullYear(), curr.getMonth(), 1).getDay();
    firstDay = (firstDay === 0) ? 6 : firstDay - 1; // Ajustement pour commencer par Lundi
    
    const daysInMonth = new Date(curr.getFullYear(), curr.getMonth() + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        let empty = document.createElement('div');
        empty.className = 'calendar-day-empty';
        grid.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        let el = document.createElement('div');
        el.className = 'calendar-day-cell';
        el.innerText = d;
        el.onclick = () => window.open(`https://www.google.com/search?q=datacenter+souveraineté&tbs=cdr:1,cd_min:${curr.getMonth()+1}/${d}/${curr.getFullYear()}&tbm=nws`, '_blank');
        grid.appendChild(el);
    }
}

function changeMonth(v) { 
    curr.setMonth(curr.getMonth() + v); 
    renderCal(); 
}

// Lancement au chargement
document.addEventListener('DOMContentLoaded', renderCal);
