const appState = {
    score: 0,
    currentTest: 0,
    maxScore: 2,
    testComplete: false,
    tests: [
        {
            title: 'I added One Piece bosses to Minecraft for REVENGE',
            thumbs: [
                { src: 'assets/images/thumb-1.png', ctr: '7.81%', views: '25,572' },
                { src: 'assets/images/thumb-2.png', ctr: '4.88%', views: '15,634' },
            ],
            correctIndex: 0,
        },
        {
            title: '1v1ing EVERY Rank In Rainbow Six Siege',
            thumbs: [
                { src: 'assets/images/thumb-3.png', ctr: '4.02%', views: '13,352' },
                { src: 'assets/images/thumb-4.png', ctr: '4.42%', views: '22,850' },
            ],
            correctIndex: 1,
        },
    ],
};

// Elements
const card1 = document.querySelector('.card-1');
const card2 = document.querySelector('.card-2');
const thumb1 = document.getElementById('thumbnail-1');
const thumb2 = document.getElementById('thumbnail-2');
const title1 = document.getElementById('title-1');
const title2 = document.getElementById('title-2');
const ctr1 = document.getElementById('ctr-value-1');
const ctr2 = document.getElementById('ctr-value-2');
const views1 = document.getElementById('views-value-1');
const views2 = document.getElementById('views-value-2');
const userScore = document.getElementById('user-score');

thumb1.addEventListener('click', () => {
    handleThumbnailClick(0);
});
thumb2.addEventListener('click', () => {
    handleThumbnailClick(1);
});

incrementTest(true);

function handleThumbnailClick(index) {
    const { tests, currentTest, score, testComplete } = appState;

    if (testComplete) {
        return;
    }

    const test = tests[currentTest];

    if (index === test.correctIndex) {
        appState.score = score + 1;
        userScore.textContent = appState.score;
    }

    showAnswers(test.correctIndex);

    if (appState.score === appState.maxScore || currentTest === tests.length - 1) {
        // test complete
        completeTest();
    } else {
        setTimeout(() => {
            incrementTest();
        }, 3000);
    }
}

function incrementTest(intialize) {
    const { tests, currentTest } = appState;
    const nextTest = tests[intialize ? 0 : currentTest + 1];
    appState.currentTest = intialize ? 0 : currentTest + 1;

    hideAnswers();

    thumb1.setAttribute('src', nextTest.thumbs[0].src);
    thumb2.setAttribute('src', nextTest.thumbs[1].src);

    title1.textContent = nextTest.title;
    title2.textContent = nextTest.title;

    ctr1.textContent = nextTest.thumbs[0].ctr;
    ctr2.textContent = nextTest.thumbs[1].ctr;

    views1.textContent = nextTest.thumbs[0].views;
    views2.textContent = nextTest.thumbs[1].views;
}

function showAnswers(correctThumb) {
    if (correctThumb === 0) {
        card1.classList.add('correct-thumb');
        card2.classList.add('wrong-thumb');
    } else {
        card2.classList.add('correct-thumb');
        card1.classList.add('wrong-thumb');
    }
}

function hideAnswers() {
    card1.classList.remove('correct-thumb');
    card1.classList.remove('wrong-thumb');
    card2.classList.remove('correct-thumb');
    card2.classList.remove('wrong-thumb');
}

function completeTest() {
    console.log('Test completed');
    const { score, tests } = appState;
    appState.testComplete = true;

    if (score === tests.length) {
        // show success popup
        console.log('Sending success message');
        window.parent.postMessage('test-success', '*');
    } else {
        // show fail popup
        console.log('Sending fail message');
        window.parent.postMessage('test-fail', '*');
    }
}
