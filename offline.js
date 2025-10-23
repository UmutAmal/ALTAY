// Service Worker Kaydı
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => {
        console.log('Service Worker kaydı başarısız:', err);
    });
}

// Offline Durumu Takibi
window.addEventListener('online', () => {
    removeOfflineIndicator();
});

window.addEventListener('offline', () => {
    showOfflineIndicator();
});

function showOfflineIndicator() {
    let indicator = document.getElementById('offlineIndicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'offlineIndicator';
        indicator.className = 'offline-indicator';
        indicator.textContent = '📡 Çevrimdışı Mod';
        document.body.appendChild(indicator);
    }
}

function removeOfflineIndicator() {
    const indicator = document.getElementById('offlineIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// Sayfa yüklendiğinde çevrimdışı durumunu kontrol et
document.addEventListener('DOMContentLoaded', () => {
    if (!navigator.onLine) {
        showOfflineIndicator();
    }
});

// Manifest dosyası
const manifestData = {
    "name": "LingoPlay A1",
    "short_name": "LingoPlay",
    "description": "İngilizce öğrenme oyunu",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#FF6B6B",
    "icons": [
        {
            "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><rect fill='%23FF6B6B' width='192' height='192'/><text x='50%' y='50%' font-size='100' fill='white' text-anchor='middle' dominant-baseline='middle'>🎮</text></svg>",
            "sizes": "192x192",
            "type": "image/svg+xml"
        }
    ]
};

// Manifest dosyasını oluştur
const manifestBlob = new Blob([JSON.stringify(manifestData)], { type: 'application/json' });
const manifestUrl = URL.createObjectURL(manifestBlob);

// Manifest linkini ekle
if (!document.querySelector('link[rel="manifest"]')) {
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = 'manifest.json';
    document.head.appendChild(link);
}

