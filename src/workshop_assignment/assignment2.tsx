import React, { useState, useEffect, useRef } from 'react';
import data from './word.json';
import './assignment.css';
import LockImage from './cloudlock.png';
import UnlockImage from './cloudunlock.png';


interface Word {
    id: number;
    word: string;
    lang: string;
    locked?: boolean;
}

const WordCheckList: React.FC = () => {
    const [words, setWords] = useState<Word[]>([]);
    const [thaiWords, setThaiWords] = useState<Word[]>([]);
    const [englishWords, setEnglishWords] = useState<Word[]>([]);
    const [selectedWord, setSelectedWord] = useState<Word | null>(null);
    const [countdownTimers, setCountdownTimers] = useState<{ [key: number]: number }>({});
    const timerRefs = useRef<{ [key: number]: NodeJS.Timeout }>({});


    useEffect(() => {
        setWords(data);
    }, []);

    //////////////////////////////////////////// // cooldown//////////////////////////////////////////////////////////////////

    const startCountdownTimer = (word: Word) => {
        if (!countdownTimers[word.id]) {
            console.log("countdownTimers")
            setCountdownTimers(prevState => ({ ...prevState, [word.id]: 5 }));

            const intervalId = setInterval(() => {
                setCountdownTimers(prevState => ({
                    ...prevState,
                    [word.id]: prevState[word.id] - 1
                }));
            }, 1000);
            const timeoutId = setTimeout(() => {
                handleWordAutoRemove(word);
                clearInterval(intervalId);
            }, 5000);

            timerRefs.current[word.id] = { intervalId, timeoutId };
        }else{
            console.log("what")
            
        }
    };

    // หยุดนับถอยหลัง
    const stopCountdownTimer = (wordId: number) => {
        const timer = timerRefs.current[wordId];
        if (timer) {
            clearInterval(timer.intervalId);
            clearTimeout(timer.timeoutId);
            delete timerRefs.current[wordId];
        }
    };

    // ///////////////////////////////////////////////////////// Click คำ ///////////////////////////////////////////////////////////////

    // Click sub shubshub
    const handleWordClick = (word: Word) => {
        if (selectedWord && selectedWord.id === word.id) {
            setSelectedWord(null);
            return;
        }

        if (word.locked) {
            return;
        }
        setSelectedWord(word);
        // ลบทิ้งทั้ง 3 ที่
        setWords(prevState => prevState.filter(item => item.id !== word.id));
        setThaiWords(prevState => prevState.filter(item => item.id !== word.id));
        setEnglishWords(prevState => prevState.filter(item => item.id !== word.id));
        // เซ็ตส่วนของช่อง 'คำศัพท์' 
        if (thaiWords.find(thaiWord => thaiWord.id === word.id)) {
            setWords(prevState => [...prevState, word]);
            setThaiWords(prevState => prevState.filter(item => item.id !== word.id));
        } else if (englishWords.find(englishWord => englishWord.id === word.id)) {
            setWords(prevState => [...prevState, word]);
            setEnglishWords(prevState => prevState.filter(item => item.id !== word.id));
        } else {

            // เช็ค lang ย้ายไปช่องตามที่เซ็ค
            if (word.lang === 'TH') {
                setThaiWords(prevState => [...prevState, word]);
            } else {
                setEnglishWords(prevState => [...prevState, word]);
            }
        }
        //    เริ่ม countdown
        if (!countdownTimers[word.id]) {
            startCountdownTimer(word);
        }
    };

    // //////////////////////////////////////////////////// Auto Move คำ //////////////////////////////////////////////////////////////////

    // ย้ายคำอัตโนมัติ  ลบ หา ย้ายไป
    const handleWordAutoRemove = (word: Word) => {
        if (word.lang === 'TH') {
            setThaiWords(prevState => [...prevState, word]);
            setThaiWords(prevState => prevState.filter(item => item.id !== word.id));
            setWords(prevState => [...prevState, word]);
        } else {
            setEnglishWords(prevState => [...prevState, word]);
            setEnglishWords(prevState => prevState.filter(item => item.id !== word.id));
            setWords(prevState => [...prevState, word]);
        }
        stopCountdownTimer(word.id);
        delete countdownTimers[word.id];
    };

    // //////////////////////////////////////LOCKED ON OH YEAHHH/////////////////////////////////////////////////////////

    // ล็อก&ปลดล็อก
    const lockWord = (word: Word) => {
        if (word.locked) {
            word.locked = false;
            console.log("unlocked");
            // if (!countdownTimers[word.id]) {
                startCountdownTimer(word);
            // else{
            // }
        } else {
            word.locked = true;
            if (countdownTimers[word.id]) {
                stopCountdownTimer(word.id);
            }
        }
        // setSelectedWord(null);
    };

    // //////////////////////////////////////////////// Returnค่า /////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="App">
            <div className="header">
                <div>คำศัพท์</div>
                <div>ภาษาไทย</div>
                <div>ภาษาอังกฤษ</div>
            </div>
            <div className="content">
                <div className="word-list">
                    {words.map(word => (
                        <div
                            key={word.id}
                            className={`word ${selectedWord && selectedWord.id === word.id ? 'selected' : ''}`}
                            onClick={() => handleWordClick(word)}
                        >
                            {word.word}
                        </div>
                    ))}
                </div>
                <div className="thai-list">
                    {thaiWords.map(word => (
                        <div
                            key={word.id}
                            className={`word ${word.locked ? 'locked' : ''}`}
                            onClick={() => !word.locked && handleWordClick(word)}
                        >
                            {word.word} ({countdownTimers[word.id]})
                            <img
                                src={word.locked ? LockImage : UnlockImage}
                                alt={word.locked ? 'Locked' : 'Unlocked'}
                                className="lock-icon"
                                onClick={() => lockWord(word)}
                            />
                        </div>
                    ))}
                </div>
                <div className="english-list">
                    {englishWords.map(word => (
                        <div
                            key={word.id}
                            className={`word ${word.locked ? 'locked' : ''}`}
                            onClick={() => !word.locked && handleWordClick(word)}
                        >
                            {word.word} ({countdownTimers[word.id]})
                            <img
                                src={word.locked ? LockImage : UnlockImage}
                                alt={word.locked ? 'Locked' : 'Unlocked'}
                                className="lock-icon"
                                onClick={() => lockWord(word)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WordCheckList;
