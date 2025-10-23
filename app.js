// Global Variables
let lessonsData = [];
let userProgress = {};
let currentLesson = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupTheme();
    setupLanguageButtons();
});

function initializeApp() {
    loadLessons();
    loadProgress();
    renderLessons();
    updateProgressBar();
}

function loadLessons() {
    // Ders verilerini yükle
    const lessonsJSON = `{
  "lessons": [
    {
      "id": 1,
      "title": "Ders 1: İsimler (Nouns)",
      "titleEn": "Lesson 1: Nouns",
      "description": "Temel isimleri öğrenin",
      "icon": "📚",
      "color": "#FF6B6B",
      "words": [
        { "english": "Book", "turkish": "Kitap", "emoji": "📖" },
        { "english": "Table", "turkish": "Masa", "emoji": "🪑" },
        { "english": "Cat", "turkish": "Kedi", "emoji": "🐱" },
        { "english": "House", "turkish": "Ev", "emoji": "🏠" },
        { "english": "Apple", "turkish": "Elma", "emoji": "🍎" },
        { "english": "Water", "turkish": "Su", "emoji": "💧" },
        { "english": "Friend", "turkish": "Arkadaş", "emoji": "👫" },
        { "english": "City", "turkish": "Şehir", "emoji": "🏙️" }
      ],
      "testQuestions": [
        { "question": "Aşağıdakilerden hangisi bir isimdir?", "options": ["Run", "Beautiful", "Cat", "Quickly"], "correct": 2, "explanation": "Cat (kedi) bir isimdir." },
        { "question": "'Happiness' kelimesi ne tür bir isimdir?", "options": ["Somut isim", "Soyut isim", "Özel isim", "Topluluk ismi"], "correct": 1, "explanation": "Happiness soyut bir isimdir." },
        { "question": "Aşağıdaki cümledeki ismi bulun: 'The dog is barking.'", "options": ["The", "dog", "is", "barking"], "correct": 1, "explanation": "'Dog' cümledeki isimdir." },
        { "question": "Hangi kelime somut bir isimdir?", "options": ["Joy", "Table", "Courage", "Freedom"], "correct": 1, "explanation": "Table somut bir isimdir." },
        { "question": "'London' ne tür bir isimdir?", "options": ["Cins isim", "Özel isim", "Soyut isim", "Topluluk ismi"], "correct": 1, "explanation": "London özel bir isimdir." },
        { "question": "Aşağıdakilerden hangisi soyut bir isimdir?", "options": ["Chair", "Love", "Apple", "Car"], "correct": 1, "explanation": "Love soyut bir isimdir." },
        { "question": "İsimler cümlede ne işlevi görür?", "options": ["Hareket belirtir", "Nesne veya özne olur", "Sıfat görevi görür", "Bağlaç görevi görür"], "correct": 1, "explanation": "İsimler cümlede özne veya nesne olarak kullanılır." },
        { "question": "'Water' kelimesi ne tür bir isimdir?", "options": ["Sayılabilir isim", "Sayılamaz isim", "Özel isim", "Soyut isim"], "correct": 1, "explanation": "Water sayılamaz bir isimdir." },
        { "question": "Aşağıdakilerden hangisi cins isimdir?", "options": ["Paris", "book", "Microsoft", "Emma"], "correct": 1, "explanation": "Book genel bir isimdir." },
        { "question": "Hangi cümledeki isim doğru kullanılmıştır?", "options": ["She is run.", "The happiness is here.", "I see a cat.", "He very quick."], "correct": 2, "explanation": "'I see a cat.' doğru kullanılmıştır." }
      ]
    },
    {
      "id": 2,
      "title": "Ders 2: Fiiller (Verbs)",
      "titleEn": "Lesson 2: Verbs",
      "description": "Fiilleri ve hareketleri öğrenin",
      "icon": "🏃",
      "color": "#4ECDC4",
      "words": [
        { "english": "Run", "turkish": "Koşmak", "emoji": "🏃" },
        { "english": "Eat", "turkish": "Yemek", "emoji": "🍽️" },
        { "english": "Sleep", "turkish": "Uyumak", "emoji": "😴" },
        { "english": "Write", "turkish": "Yazmak", "emoji": "✍️" },
        { "english": "Read", "turkish": "Okumak", "emoji": "📖" },
        { "english": "Jump", "turkish": "Atlamak", "emoji": "🦘" },
        { "english": "Sing", "turkish": "Şarkı söylemek", "emoji": "🎵" },
        { "english": "Dance", "turkish": "Dans etmek", "emoji": "💃" }
      ],
      "testQuestions": [
        { "question": "Aşağıdakilerden hangisi bir fiildir?", "options": ["Beautiful", "Run", "Table", "Happy"], "correct": 1, "explanation": "Run bir fiildir." },
        { "question": "'She _____ to school every day.' Boşluğa hangi fiil gelmelidir?", "options": ["walk", "walks", "walking", "walked"], "correct": 1, "explanation": "'walks' kullanılır." },
        { "question": "Geçmiş zaman fiil hangisidir?", "options": ["eat", "eats", "ate", "eating"], "correct": 2, "explanation": "'ate' geçmiş zamandır." },
        { "question": "'I am happy.' cümlesindeki fiil hangisidir?", "options": ["I", "am", "happy", "Fiil yok"], "correct": 1, "explanation": "'am' fiildir." },
        { "question": "Aşağıdakilerden hangisi eylem fiilidir?", "options": ["is", "jump", "was", "are"], "correct": 1, "explanation": "'jump' eylem fiilidir." },
        { "question": "'They will play tomorrow.' Hangi zamandır?", "options": ["Şimdiki zaman", "Geçmiş zaman", "Gelecek zaman", "Geniş zaman"], "correct": 2, "explanation": "Gelecek zamandır." },
        { "question": "'He _____ a book yesterday.' Boşluğa ne gelir?", "options": ["read (şimdiki)", "reads", "read (geçmiş)", "reading"], "correct": 2, "explanation": "Geçmiş zaman 'read' kullanılır." },
        { "question": "Düzenli fiil hangisidir?", "options": ["go-went", "walk-walked", "eat-ate", "run-ran"], "correct": 1, "explanation": "'walk-walked' düzenli fiildir." },
        { "question": "'I am singing.' Hangi zaman kipindedir?", "options": ["Simple present", "Present continuous", "Past continuous", "Simple past"], "correct": 1, "explanation": "Present continuous'dur." },
        { "question": "To be fiilinin üçüncü tekil şahıs hali nedir?", "options": ["am", "is", "are", "be"], "correct": 1, "explanation": "'is' doğru halidir." }
      ]
    },
    {
      "id": 3,
      "title": "Ders 3: Sıfatlar (Adjectives)",
      "titleEn": "Lesson 3: Adjectives",
      "description": "Sıfatları ve özellikleri öğrenin",
      "icon": "✨",
      "color": "#FFE66D",
      "words": [
        { "english": "Big", "turkish": "Büyük", "emoji": "📏" },
        { "english": "Small", "turkish": "Küçük", "emoji": "🤏" },
        { "english": "Beautiful", "turkish": "Güzel", "emoji": "🌸" },
        { "english": "Happy", "turkish": "Mutlu", "emoji": "😊" },
        { "english": "Sad", "turkish": "Üzgün", "emoji": "😢" },
        { "english": "Hot", "turkish": "Sıcak", "emoji": "🔥" },
        { "english": "Cold", "turkish": "Soğuk", "emoji": "❄️" },
        { "english": "Fast", "turkish": "Hızlı", "emoji": "⚡" }
      ],
      "testQuestions": [
        { "question": "Aşağıdakilerden hangisi bir sıfattır?", "options": ["Run", "Beautiful", "Book", "Eat"], "correct": 1, "explanation": "Beautiful bir sıfattır." },
        { "question": "'The _____ cat is sleeping.' Boşluğa ne gelir?", "options": ["run", "beautiful", "eat", "jump"], "correct": 1, "explanation": "'beautiful' sıfat olarak kullanılır." },
        { "question": "Sıfatlar cümlede neyi anlatır?", "options": ["Hareketi", "Özelliği", "Zamanı", "Yeri"], "correct": 1, "explanation": "Sıfatlar özelliği anlatır." },
        { "question": "'Big' kelimesinin zıttı nedir?", "options": ["Small", "Fast", "Happy", "Cold"], "correct": 0, "explanation": "'Small' zıttıdır." },
        { "question": "'Hot' kelimesinin zıttı nedir?", "options": ["Fast", "Cold", "Beautiful", "Happy"], "correct": 1, "explanation": "'Cold' zıttıdır." },
        { "question": "'Happy' sıfatı hangi duyguyu ifade eder?", "options": ["Üzüntü", "Mutluluk", "Korku", "Öfke"], "correct": 1, "explanation": "Mutluluk ifade eder." },
        { "question": "'The fast car' cümlesinde sıfat hangisidir?", "options": ["The", "fast", "car", "Sıfat yok"], "correct": 1, "explanation": "'fast' sıfattır." },
        { "question": "Aşağıdakilerden hangisi sıfat değildir?", "options": ["Beautiful", "Happy", "Run", "Small"], "correct": 2, "explanation": "'Run' fiildir." },
        { "question": "'Sad' sıfatı hangi duyguyu ifade eder?", "options": ["Mutluluk", "Üzüntü", "Korku", "Öfke"], "correct": 1, "explanation": "Üzüntü ifade eder." },
        { "question": "'Beautiful' sıfatının zıttı nedir?", "options": ["Ugly", "Small", "Cold", "Sad"], "correct": 0, "explanation": "'Ugly' zıttıdır." }
      ]
    },
    {
      "id": 4,
      "title": "Ders 4: Zamirler (Pronouns)",
      "titleEn": "Lesson 4: Pronouns",
      "description": "Zamirler ve kullanımlarını öğrenin",
      "icon": "👤",
      "color": "#95E1D3",
      "words": [
        { "english": "I", "turkish": "Ben", "emoji": "👆" },
        { "english": "You", "turkish": "Sen", "emoji": "👉" },
        { "english": "He", "turkish": "O (erkek)", "emoji": "👨" },
        { "english": "She", "turkish": "O (kadın)", "emoji": "👩" },
        { "english": "It", "turkish": "O (şey)", "emoji": "📦" },
        { "english": "We", "turkish": "Biz", "emoji": "👥" },
        { "english": "They", "turkish": "Onlar", "emoji": "👫" },
        { "english": "Me", "turkish": "Beni", "emoji": "🫵" }
      ],
      "testQuestions": [
        { "question": "Aşağıdakilerden hangisi bir zamirdir?", "options": ["Book", "He", "Beautiful", "Run"], "correct": 1, "explanation": "'He' zamirdir." },
        { "question": "'I am happy.' cümlesindeki zamir hangisidir?", "options": ["am", "happy", "I", "Zamir yok"], "correct": 2, "explanation": "'I' zamirdir." },
        { "question": "'She' zamiri kimi temsil eder?", "options": ["Erkek", "Kadın", "Nesne", "Grup"], "correct": 1, "explanation": "Kadını temsil eder." },
        { "question": "'We' zamiri kaç kişiyi temsil eder?", "options": ["Bir kişi", "İki kişi", "Birden fazla kişi", "Bir nesne"], "correct": 2, "explanation": "Birden fazla kişiyi temsil eder." },
        { "question": "'They' zamiri kimi temsil eder?", "options": ["Bir erkek", "Bir kadın", "Birden fazla kişi", "Bir nesne"], "correct": 2, "explanation": "Birden fazla kişiyi temsil eder." },
        { "question": "'It' zamiri neyi temsil eder?", "options": ["Erkek", "Kadın", "Nesne", "Grup"], "correct": 2, "explanation": "Nesneleri temsil eder." },
        { "question": "'You' zamiri kaç kişiye hitap eder?", "options": ["Sadece bir kişiye", "Birden fazla kişiye", "İkisine de", "Hiç kimseye"], "correct": 2, "explanation": "İkisine de hitap edebilir." },
        { "question": "'Me' zamiri hangi durumda kullanılır?", "options": ["Özne olarak", "Nesne olarak", "Sıfat olarak", "Fiil olarak"], "correct": 1, "explanation": "Nesne olarak kullanılır." },
        { "question": "'He is a teacher.' cümlesindeki zamir hangisidir?", "options": ["is", "teacher", "He", "a"], "correct": 2, "explanation": "'He' zamirdir." },
        { "question": "Aşağıdakilerden hangisi zamir değildir?", "options": ["I", "You", "Beautiful", "They"], "correct": 2, "explanation": "'Beautiful' sıfattır." }
      ]
    },
    {
      "id": 5,
      "title": "Ders 5: Sayılar (Numbers)",
      "titleEn": "Lesson 5: Numbers",
      "description": "Sayıları ve saymayı öğrenin",
      "icon": "🔢",
      "color": "#F38181",
      "words": [
        { "english": "One", "turkish": "Bir", "emoji": "1️⃣" },
        { "english": "Two", "turkish": "İki", "emoji": "2️⃣" },
        { "english": "Three", "turkish": "Üç", "emoji": "3️⃣" },
        { "english": "Four", "turkish": "Dört", "emoji": "4️⃣" },
        { "english": "Five", "turkish": "Beş", "emoji": "5️⃣" },
        { "english": "Six", "turkish": "Altı", "emoji": "6️⃣" },
        { "english": "Seven", "turkish": "Yedi", "emoji": "7️⃣" },
        { "english": "Eight", "turkish": "Sekiz", "emoji": "8️⃣" }
      ],
      "testQuestions": [
        { "question": "'One' sayısı kaçtır?", "options": ["1", "2", "3", "4"], "correct": 0, "explanation": "'One' 1'dir." },
        { "question": "'Five' sayısı kaçtır?", "options": ["4", "5", "6", "7"], "correct": 1, "explanation": "'Five' 5'tir." },
        { "question": "'Three' sayısı kaçtır?", "options": ["2", "3", "4", "5"], "correct": 1, "explanation": "'Three' 3'tür." },
        { "question": "'Eight' sayısı kaçtır?", "options": ["7", "8", "9", "10"], "correct": 1, "explanation": "'Eight' 8'dir." },
        { "question": "'Two' sayısı kaçtır?", "options": ["1", "2", "3", "4"], "correct": 1, "explanation": "'Two' 2'dir." },
        { "question": "'Six' sayısı kaçtır?", "options": ["5", "6", "7", "8"], "correct": 1, "explanation": "'Six' 6'dır." },
        { "question": "'Four' sayısı kaçtır?", "options": ["3", "4", "5", "6"], "correct": 1, "explanation": "'Four' 4'tür." },
        { "question": "'Seven' sayısı kaçtır?", "options": ["6", "7", "8", "9"], "correct": 1, "explanation": "'Seven' 7'dir." },
        { "question": "1 + 1 kaçtır?", "options": ["One", "Two", "Three", "Four"], "correct": 1, "explanation": "1 + 1 = 2" },
        { "question": "3 + 2 kaçtır?", "options": ["Three", "Four", "Five", "Six"], "correct": 2, "explanation": "3 + 2 = 5" }
      ]
    },
    {
      "id": 6,
      "title": "Ders 6: Renkler (Colors)",
      "titleEn": "Lesson 6: Colors",
      "description": "Renkleri ve tanımlamalarını öğrenin",
      "icon": "🎨",
      "color": "#AA96DA",
      "words": [
        { "english": "Red", "turkish": "Kırmızı", "emoji": "🔴" },
        { "english": "Blue", "turkish": "Mavi", "emoji": "🔵" },
        { "english": "Green", "turkish": "Yeşil", "emoji": "🟢" },
        { "english": "Yellow", "turkish": "Sarı", "emoji": "🟡" },
        { "english": "Black", "turkish": "Siyah", "emoji": "⚫" },
        { "english": "White", "turkish": "Beyaz", "emoji": "⚪" },
        { "english": "Purple", "turkish": "Mor", "emoji": "🟣" },
        { "english": "Orange", "turkish": "Turuncu", "emoji": "🟠" }
      ],
      "testQuestions": [
        { "question": "'Red' rengi nedir?", "options": ["Mavi", "Kırmızı", "Yeşil", "Sarı"], "correct": 1, "explanation": "'Red' kırmızıdır." },
        { "question": "'Blue' rengi nedir?", "options": ["Kırmızı", "Mavi", "Yeşil", "Sarı"], "correct": 1, "explanation": "'Blue' mavidir." },
        { "question": "'Green' rengi nedir?", "options": ["Kırmızı", "Mavi", "Yeşil", "Sarı"], "correct": 2, "explanation": "'Green' yeşildir." },
        { "question": "'Yellow' rengi nedir?", "options": ["Kırmızı", "Mavi", "Yeşil", "Sarı"], "correct": 3, "explanation": "'Yellow' sarıdır." },
        { "question": "'Purple' rengi nedir?", "options": ["Kırmızı", "Mavi", "Mor", "Sarı"], "correct": 2, "explanation": "'Purple' mordur." },
        { "question": "'Orange' rengi nedir?", "options": ["Kırmızı", "Mavi", "Turuncu", "Sarı"], "correct": 2, "explanation": "'Orange' turuncudur." },
        { "question": "'Black' rengi nedir?", "options": ["Beyaz", "Siyah", "Gri", "Kahverengi"], "correct": 1, "explanation": "'Black' siyahtır." },
        { "question": "'White' rengi nedir?", "options": ["Beyaz", "Siyah", "Gri", "Kahverengi"], "correct": 0, "explanation": "'White' beyazdır." },
        { "question": "Kırmızı rengin İngilizce adı nedir?", "options": ["Blue", "Red", "Green", "Yellow"], "correct": 1, "explanation": "'Red' doğru cevaptır." },
        { "question": "Yeşil rengin İngilizce adı nedir?", "options": ["Blue", "Red", "Green", "Yellow"], "correct": 2, "explanation": "'Green' doğru cevaptır." }
      ]
    },
    {
      "id": 7,
      "title": "Ders 7: Yiyecekler (Foods)",
      "titleEn": "Lesson 7: Foods",
      "description": "Yiyecekleri ve içecekleri öğrenin",
      "icon": "🍎",
      "color": "#FCBAD3",
      "words": [
        { "english": "Apple", "turkish": "Elma", "emoji": "🍎" },
        { "english": "Bread", "turkish": "Ekmek", "emoji": "🍞" },
        { "english": "Milk", "turkish": "Süt", "emoji": "🥛" },
        { "english": "Cheese", "turkish": "Peynir", "emoji": "🧀" },
        { "english": "Egg", "turkish": "Yumurta", "emoji": "🥚" },
        { "english": "Rice", "turkish": "Pirinç", "emoji": "🍚" },
        { "english": "Banana", "turkish": "Muz", "emoji": "🍌" },
        { "english": "Orange", "turkish": "Portakal", "emoji": "🍊" }
      ],
      "testQuestions": [
        { "question": "'Apple' nedir?", "options": ["Ekmek", "Elma", "Süt", "Peynir"], "correct": 1, "explanation": "'Apple' elmadır." },
        { "question": "'Bread' nedir?", "options": ["Ekmek", "Elma", "Süt", "Peynir"], "correct": 0, "explanation": "'Bread' ekmektir." },
        { "question": "'Milk' nedir?", "options": ["Ekmek", "Elma", "Süt", "Peynir"], "correct": 2, "explanation": "'Milk' süttür." },
        { "question": "'Cheese' nedir?", "options": ["Ekmek", "Elma", "Süt", "Peynir"], "correct": 3, "explanation": "'Cheese' peynirdir." },
        { "question": "'Egg' nedir?", "options": ["Ekmek", "Elma", "Yumurta", "Peynir"], "correct": 2, "explanation": "'Egg' yumurtadır." },
        { "question": "'Rice' nedir?", "options": ["Ekmek", "Elma", "Pirinç", "Peynir"], "correct": 2, "explanation": "'Rice' pirinçtir." },
        { "question": "'Banana' nedir?", "options": ["Ekmek", "Muz", "Süt", "Peynir"], "correct": 1, "explanation": "'Banana' muzdur." },
        { "question": "'Orange' nedir?", "options": ["Ekmek", "Portakal", "Süt", "Peynir"], "correct": 1, "explanation": "'Orange' portakaldır." },
        { "question": "Hangi yiyecek sağlıklı bir kahvaltıdır?", "options": ["Bread", "Milk", "Egg", "Hepsi"], "correct": 3, "explanation": "Hepsi sağlıklıdır." },
        { "question": "Elmanın İngilizce adı nedir?", "options": ["Bread", "Apple", "Milk", "Cheese"], "correct": 1, "explanation": "'Apple' doğru cevaptır." }
      ]
    },
    {
      "id": 8,
      "title": "Ders 8: Hayvanlar (Animals)",
      "titleEn": "Lesson 8: Animals",
      "description": "Hayvanları ve seslerini öğrenin",
      "icon": "🐾",
      "color": "#A8D8EA",
      "words": [
        { "english": "Dog", "turkish": "Köpek", "emoji": "🐕" },
        { "english": "Cat", "turkish": "Kedi", "emoji": "🐱" },
        { "english": "Bird", "turkish": "Kuş", "emoji": "🐦" },
        { "english": "Fish", "turkish": "Balık", "emoji": "🐠" },
        { "english": "Lion", "turkish": "Aslan", "emoji": "🦁" },
        { "english": "Elephant", "turkish": "Fil", "emoji": "🐘" },
        { "english": "Monkey", "turkish": "Maymun", "emoji": "🐵" },
        { "english": "Rabbit", "turkish": "Tavşan", "emoji": "🐰" }
      ],
      "testQuestions": [
        { "question": "'Dog' nedir?", "options": ["Kedi", "Köpek", "Kuş", "Balık"], "correct": 1, "explanation": "'Dog' köpektir." },
        { "question": "'Cat' nedir?", "options": ["Kedi", "Köpek", "Kuş", "Balık"], "correct": 0, "explanation": "'Cat' kedidir." },
        { "question": "'Bird' nedir?", "options": ["Kedi", "Köpek", "Kuş", "Balık"], "correct": 2, "explanation": "'Bird' kuştur." },
        { "question": "'Fish' nedir?", "options": ["Kedi", "Köpek", "Kuş", "Balık"], "correct": 3, "explanation": "'Fish' balıktır." },
        { "question": "'Lion' nedir?", "options": ["Aslan", "Fil", "Maymun", "Tavşan"], "correct": 0, "explanation": "'Lion' aslantır." },
        { "question": "'Elephant' nedir?", "options": ["Aslan", "Fil", "Maymun", "Tavşan"], "correct": 1, "explanation": "'Elephant' fildir." },
        { "question": "'Monkey' nedir?", "options": ["Aslan", "Fil", "Maymun", "Tavşan"], "correct": 2, "explanation": "'Monkey' maymundur." },
        { "question": "'Rabbit' nedir?", "options": ["Aslan", "Fil", "Maymun", "Tavşan"], "correct": 3, "explanation": "'Rabbit' tavşandır." },
        { "question": "Köpeğin İngilizce adı nedir?", "options": ["Cat", "Dog", "Bird", "Fish"], "correct": 1, "explanation": "'Dog' doğru cevaptır." },
        { "question": "Hangi hayvan uçabilir?", "options": ["Dog", "Cat", "Bird", "Fish"], "correct": 2, "explanation": "'Bird' uçabilir." }
      ]
    }
  ]
}`;

    try {
        const data = JSON.parse(lessonsJSON);
        lessonsData = data.lessons;
    } catch (e) {
        console.error('Ders verileri yüklenemedi:', e);
    }
}

function loadProgress() {
    const saved = localStorage.getItem('userProgress');
    if (saved) {
        userProgress = JSON.parse(saved);
    } else {
        lessonsData.forEach(lesson => {
            userProgress[lesson.id] = {
                notesViewed: false,
                gameCompleted: false,
                testCompleted: false,
                testScore: 0
            };
        });
        saveProgress();
    }
}

function saveProgress() {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
}

function renderLessons() {
    const grid = document.getElementById('lessonsGrid');
    grid.innerHTML = '';

    lessonsData.forEach((lesson, index) => {
        const isLocked = index > 0 && !userProgress[lessonsData[index - 1].id].gameCompleted;
        const progress = userProgress[lesson.id];
        const completionPercent = (
            (progress.notesViewed ? 33 : 0) +
            (progress.gameCompleted ? 33 : 0) +
            (progress.testCompleted ? 34 : 0)
        );

        const card = document.createElement('div');
        card.className = `lesson-card ${isLocked ? 'locked' : ''}`;
        card.innerHTML = `
            <div class="lesson-header" style="background: linear-gradient(135deg, ${lesson.color}, #FF9FF3);">
                <div class="lesson-icon">${lesson.icon}</div>
                <h3 class="lesson-title">${lesson.title}</h3>
                <p class="lesson-number">${getLanguage() === 'tr' ? 'Ders' : 'Lesson'} ${lesson.id}</p>
                ${progress.gameCompleted && progress.testCompleted ? '<div class="completed-badge">✓</div>' : ''}
            </div>
            <div class="lesson-body">
                <p class="lesson-description">${lesson.description}</p>
                <div class="lesson-progress">
                    <div class="progress-small">
                        <div class="progress-small-fill" style="width: ${completionPercent}%"></div>
                    </div>
                </div>
                <div class="lesson-actions">
                    <button class="btn-action btn-notes" onclick="openLesson(${lesson.id}, 'notes')">📖 ${t('notes')}</button>
                    <button class="btn-action btn-game" onclick="openLesson(${lesson.id}, 'game')">🎮 ${t('game')}</button>
                    <button class="btn-action btn-test" onclick="openLesson(${lesson.id}, 'test')">✏️ ${t('test')}</button>
                </div>
            </div>
        `;

        if (isLocked) {
            card.innerHTML = `
                <div class="lesson-header" style="background: linear-gradient(135deg, #999, #666);">
                    <div class="lesson-icon">🔒</div>
                    <h3 class="lesson-title">${lesson.title}</h3>
                    <p class="lesson-number">${getLanguage() === 'tr' ? 'Kilitli' : 'Locked'}</p>
                </div>
                <div class="lesson-body">
                    <p class="lesson-description">${lesson.description}</p>
                    <div class="lesson-actions">
                        <button class="btn-action btn-locked" disabled>🔒 ${t('unlockPrevious')}</button>
                    </div>
                </div>
            `;
        }

        grid.appendChild(card);
    });
}

function openLesson(lessonId, tab) {
    currentLesson = lessonsData.find(l => l.id === lessonId);
    document.getElementById('homePage').classList.remove('active');
    document.getElementById('lessonPage').classList.add('active');
    document.getElementById('lessonTitle').textContent = currentLesson.title;
    
    renderNotes();
    initializeGame();
    initializeTest();
    
    switchTab(tab);
}

function goHome() {
    document.getElementById('lessonPage').classList.remove('active');
    document.getElementById('homePage').classList.add('active');
    renderLessons();
    updateProgressBar();
}

function renderNotes() {
    const container = document.getElementById('notesContainer');
    container.innerHTML = '';

    const notesHTML = `
        <div class="note-card">
            <div class="note-title">📚 ${currentLesson.title}</div>
            <div class="note-content">
                <p>${currentLesson.description}</p>
            </div>
        </div>
        <div class="note-card">
            <div class="note-title">📖 ${t('notes')}</div>
            <div class="words-grid">
                ${currentLesson.words.map(word => `
                    <div class="word-card">
                        <div class="word-emoji">${word.emoji}</div>
                        <div class="word-english">${word.english}</div>
                        <div class="word-turkish">${word.turkish}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    container.innerHTML = notesHTML;
    userProgress[currentLesson.id].notesViewed = true;
    saveProgress();
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

function updateProgressBar() {
    const completed = Object.values(userProgress).filter(p => p.gameCompleted && p.testCompleted).length;
    const total = lessonsData.length;
    const percent = Math.round((completed / total) * 100);

    document.getElementById('progressFill').style.width = percent + '%';
    document.getElementById('progressPercent').textContent = percent;
    document.getElementById('completedLessons').textContent = completed;
    document.getElementById('totalLessons').textContent = total;
}

function setupTheme() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

function setupLanguageButtons() {
    document.getElementById('langBtn').addEventListener('click', () => {
        document.getElementById('languageModal').classList.add('active');
    });
    document.getElementById('langBtn2').addEventListener('click', () => {
        document.getElementById('languageModal').classList.add('active');
    });
    document.getElementById('themeBtn').addEventListener('click', toggleTheme);
    document.getElementById('themeBtn2').addEventListener('click', toggleTheme);
}

function closeLanguageModal() {
    document.getElementById('languageModal').classList.remove('active');
}

// Modal kapatma
document.addEventListener('click', (e) => {
    const modal = document.getElementById('languageModal');
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

