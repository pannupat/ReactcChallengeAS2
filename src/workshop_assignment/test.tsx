// version1
const handleWordClick = (word: Word) => {
    if (selectedWord && selectedWord.id === word.id) {
        setSelectedWord(null);
        return;
    }

    if (words.find(item => item.id === word.id)) {
        setWords(prevState => prevState.filter(item => item.id !== word.id));

        if (word.lang === 'TH') {
            setThaiWords(prevState => [...prevState, word]);
        } else {
            setEnglishWords(prevState => [...prevState, word]);
        }
    } else {
        let targetWords;

        if (thaiWords.find(thaiWord => thaiWord.id === word.id)) {
            targetWords = setThaiWords;
        } else if (englishWords.find(englishWord => englishWord.id === word.id)) {
            targetWords = setEnglishWords;
        } else {
            return;
        }

        targetWords(prevState => [...prevState, word]);
        setWords(prevState => [...prevState.filter(item => item.id !== word.id)]);
    }

    if (!countdownTimers[word.id]) {
        startCountdownTimer(word);
    }
};

// version2
const handleWordClick = (word: Word) => {
    if (selectedWord && selectedWord.id === word.id) {
        setSelectedWord(null);
        return;
    }

    setSelectedWord(word);

    // เลือกช่องที่ต้องการนำคำศัพท์กลับไป
    let targetWords;
    if (thaiWords.find(thaiWord => thaiWord.id === word.id)) {
        targetWords = setThaiWords;
    } else if (englishWords.find(englishWord => englishWord.id === word.id)) {
        targetWords = setEnglishWords;
    } else {
        return; // ถ้าไม่มีในภาษาไทยหรืออังกฤษจะไม่ทำอะไร
    }

    // ย้ายคำศัพท์กลับไปยังช่องคำศัพท์หลัก
    targetWords(prevState => [...prevState, word]);
    setWords(prevState => [...prevState.filter(item => item.id !== word.id)]);

    // หลังย้ายศัพท์ก็นับถอยหลัง
    if (!countdownTimers[word.id]) {
        startCountdownTimer(word);
    }
};


<div
    key={word.id}
    className={`word ${selectedWord && selectedWord.id === word.id ? 'selected' : ''}`}
    onClick={() => handleWordClick(word)}
    onContextMenu={(e) => {
        e.preventDefault();
        lockWord(word);
    }}
>
    {word.word}
</div>