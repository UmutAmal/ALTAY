let testState = {
    currentQuestion: 0,
    answers: [],
    score: 0
};

function initializeTest() {
    if (!currentLesson) return;

    testState = {
        currentQuestion: 0,
        answers: [],
        score: 0
    };

    renderTestQuestion();
}

function renderTestQuestion() {
    const testContent = document.getElementById('testContent');
    const questions = currentLesson.testQuestions;
    
    if (testState.currentQuestion >= questions.length) {
        showTestResults();
        return;
    }

    const question = questions[testState.currentQuestion];
    const questionNumber = testState.currentQuestion + 1;

    let html = `
        <div class="question-card">
            <div class="question-number">Soru ${questionNumber}/${questions.length}</div>
            <div class="question-text">${question.question}</div>
            <div class="options">
    `;

    question.options.forEach((option, index) => {
        const isSelected = testState.answers[testState.currentQuestion] === index;
        html += `
            <div class="option ${isSelected ? 'selected' : ''}" onclick="selectAnswer(${index})">
                ${option}
            </div>
        `;
    });

    html += `
            </div>
        </div>
        <div class="test-navigation">
            ${testState.currentQuestion > 0 ? `<button class="btn-secondary" onclick="previousQuestion()">← Önceki</button>` : ''}
            ${testState.currentQuestion < questions.length - 1 ? `<button class="btn-primary" onclick="nextQuestion()">Sonraki →</button>` : ''}
            ${testState.currentQuestion === questions.length - 1 ? `<button class="btn-submit" onclick="submitTest()">Testi Gönder</button>` : ''}
        </div>
    `;

    testContent.innerHTML = html;
}

function selectAnswer(optionIndex) {
    testState.answers[testState.currentQuestion] = optionIndex;
    renderTestQuestion();
}

function nextQuestion() {
    if (testState.currentQuestion < currentLesson.testQuestions.length - 1) {
        testState.currentQuestion++;
        renderTestQuestion();
    }
}

function previousQuestion() {
    if (testState.currentQuestion > 0) {
        testState.currentQuestion--;
        renderTestQuestion();
    }
}

function submitTest() {
    const questions = currentLesson.testQuestions;
    let score = 0;

    questions.forEach((question, index) => {
        if (testState.answers[index] === question.correct) {
            score++;
        }
    });

    testState.score = score;
    userProgress[currentLesson.id].testCompleted = true;
    userProgress[currentLesson.id].testScore = score;
    saveProgress();

    showTestResults();
}

function showTestResults() {
    const score = testState.score;
    const total = currentLesson.testQuestions.length;
    const percent = Math.round((score / total) * 100);

    let feedback = '';
    if (percent >= 80) {
        feedback = 'Harika! Çok başarılısın! 🌟';
    } else if (percent >= 60) {
        feedback = 'İyi! Daha da iyileşebilirsin! 💪';
    } else if (percent >= 40) {
        feedback = 'Fena değil! Biraz daha çalış! 📚';
    } else {
        feedback = 'Biraz daha pratik yapmalısın! 🎯';
    }

    document.getElementById('testScore').textContent = score;
    document.getElementById('testFeedback').textContent = feedback;
    document.getElementById('testCompleteModal').classList.add('active');
}

function closeTestCompleteModal() {
    document.getElementById('testCompleteModal').classList.remove('active');
    goHome();
}

