const translations = {
    tr: {
        appTitle: 'LingoPlay A1',
        appSubtitle: 'İngilizce öğrenmeye rahatlatıcı bir başlangıç yapın!',
        generalProgress: 'Genel İlerleme',
        completed: 'Tamamlandı',
        lessons: 'Ders',
        notes: 'Notlar',
        game: 'Oyun',
        test: 'Test',
        locked: 'Kilitli',
        unlockPrevious: 'Önceki dersi tamamlayın',
        wordMatching: 'Kelime Eşleştirme Oyunu',
        matchWords: 'İngilizce kelimeleri Türkçe karşılıklarıyla eşleştirin!',
        attempts: 'Denemeler',
        accuracy: 'Doğruluk',
        resetGame: 'Oyunu Sıfırla',
        congratulations: 'Tebrikler!',
        allWordsMatched: 'Tüm kelimeleri başarıyla eşleştirdiniz!',
        totalAttempts: 'Toplam Deneme',
        finalAccuracy: 'Son Doğruluk',
        testResult: 'Test Sonucu',
        yourScore: 'Puanınız',
        excellent: 'Harika! Çok başarılısın! 🌟',
        good: 'İyi! Daha da iyileşebilirsin! 💪',
        fair: 'Fena değil! Biraz daha çalış! 📚',
        needsPractice: 'Biraz daha pratik yapmalısın! 🎯',
        selectLanguage: 'Dil Seç',
        turkish: 'Türkçe',
        english: 'English',
        close: 'Kapat',
        back: 'Geri',
        home: 'Ana Sayfa',
        submit: 'Gönder',
        next: 'Sonraki',
        previous: 'Önceki',
        finish: 'Bitir',
        continue: 'Devam Et',
        darkMode: 'Koyu Tema',
        lightMode: 'Açık Tema',
        offline: 'Çevrimdışı Mod',
        online: 'Çevrimiçi'
    },
    en: {
        appTitle: 'LingoPlay A1',
        appSubtitle: 'Start learning English in a comfortable way!',
        generalProgress: 'General Progress',
        completed: 'Completed',
        lessons: 'Lesson',
        notes: 'Notes',
        game: 'Game',
        test: 'Test',
        locked: 'Locked',
        unlockPrevious: 'Complete previous lesson',
        wordMatching: 'Word Matching Game',
        matchWords: 'Match English words with their Turkish translations!',
        attempts: 'Attempts',
        accuracy: 'Accuracy',
        resetGame: 'Reset Game',
        congratulations: 'Congratulations!',
        allWordsMatched: 'You successfully matched all words!',
        totalAttempts: 'Total Attempts',
        finalAccuracy: 'Final Accuracy',
        testResult: 'Test Result',
        yourScore: 'Your Score',
        excellent: 'Excellent! You are very successful! 🌟',
        good: 'Good! You can do better! 💪',
        fair: 'Not bad! Keep practicing! 📚',
        needsPractice: 'You need more practice! 🎯',
        selectLanguage: 'Select Language',
        turkish: 'Türkçe',
        english: 'English',
        close: 'Close',
        back: 'Back',
        home: 'Home',
        submit: 'Submit',
        next: 'Next',
        previous: 'Previous',
        finish: 'Finish',
        continue: 'Continue',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        offline: 'Offline Mode',
        online: 'Online'
    }
};

let currentLanguage = localStorage.getItem('language') || 'tr';

function t(key) {
    return translations[currentLanguage][key] || key;
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    location.reload();
}

function getLanguage() {
    return currentLanguage;
}

