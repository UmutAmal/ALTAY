let gameState = {
    cards: [],
    selected: [],
    matched: [],
    attempts: 0,
    correctMatches: 0,
    totalMatches: 0
};

function initializeGame() {
    if (!currentLesson) return;

    gameState = {
        cards: [],
        selected: [],
        matched: [],
        attempts: 0,
        correctMatches: 0,
        totalMatches: currentLesson.words.length
    };

    const board = document.getElementById('gameBoard');
    board.innerHTML = '';

    // Kartları oluştur
    const cardData = [];
    currentLesson.words.forEach(word => {
        cardData.push({
            id: `en-${word.english}`,
            content: word.english,
            type: 'english',
            pair: `tr-${word.turkish}`
        });
        cardData.push({
            id: `tr-${word.turkish}`,
            content: word.turkish,
            type: 'turkish',
            pair: `en-${word.english}`
        });
    });

    // Kartları karıştır
    gameState.cards = cardData.sort(() => Math.random() - 0.5);

    // Kartları render et
    gameState.cards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'game-card';
        cardEl.innerHTML = `<div class="game-card-content">${card.content}</div>`;
        cardEl.onclick = () => selectCard(index, cardEl);
        board.appendChild(cardEl);
    });
}

function selectCard(index, element) {
    if (gameState.matched.includes(index)) return;
    if (gameState.selected.includes(index)) return;
    if (gameState.selected.length >= 2) return;

    gameState.selected.push(index);
    element.classList.add('selected');

    if (gameState.selected.length === 2) {
        gameState.attempts++;
        document.getElementById('attempts').textContent = gameState.attempts;
        
        checkMatch();
    }
}

function checkMatch() {
    const [index1, index2] = gameState.selected;
    const card1 = gameState.cards[index1];
    const card2 = gameState.cards[index2];

    const isMatch = card1.pair === card2.id && card2.pair === card1.id;

    const elements = document.querySelectorAll('.game-card');

    if (isMatch) {
        gameState.correctMatches++;
        gameState.matched.push(index1, index2);
        elements[index1].classList.add('matched');
        elements[index2].classList.add('matched');
        
        updateAccuracy();

        if (gameState.correctMatches === gameState.totalMatches) {
            setTimeout(() => {
                completeGame();
            }, 500);
        }
    } else {
        elements[index1].classList.add('wrong');
        elements[index2].classList.add('wrong');

        setTimeout(() => {
            elements[index1].classList.remove('wrong', 'selected');
            elements[index2].classList.remove('wrong', 'selected');
            gameState.selected = [];
            updateAccuracy();
        }, 600);
    }

    gameState.selected = [];
}

function updateAccuracy() {
    const accuracy = gameState.attempts > 0 
        ? Math.round((gameState.correctMatches / gameState.attempts) * 100) 
        : 0;
    document.getElementById('accuracy').textContent = accuracy + '%';
}

function resetGame() {
    initializeGame();
    document.getElementById('attempts').textContent = '0';
    document.getElementById('accuracy').textContent = '0%';
}

function completeGame() {
    userProgress[currentLesson.id].gameCompleted = true;
    saveProgress();

    const accuracy = Math.round((gameState.correctMatches / gameState.attempts) * 100);
    
    document.getElementById('gameCompleteMessage').textContent = 
        `Tüm kelimeleri başarıyla eşleştirdiniz! Harika iş çıkardınız! 🎉`;
    document.getElementById('totalAttempts').textContent = gameState.attempts;
    document.getElementById('finalAccuracy').textContent = accuracy + '%';
    
    document.getElementById('gameCompleteModal').classList.add('active');
}

function closeGameCompleteModal() {
    document.getElementById('gameCompleteModal').classList.remove('active');
    renderLessons();
    updateProgressBar();
}

