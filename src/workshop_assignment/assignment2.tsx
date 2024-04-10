import React, { useState, useEffect, useRef } from 'react';
import data from './word.json';
import './assignment.css';

interface Word {
    id: number;
    word: string;
    lang: string;
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


    // ////////////////////////////////////////////////////////////////////////////countdown/////////////////////////////////////////////////
    const startCountdownTimer = (word: Word) => {
        // เริ่มนับในช่องไทยอิ้งตอนย้ายคำไป
        if (!countdownTimers[word.id]) {
            setCountdownTimers(prevState => ({ ...prevState, [word.id]: 5 }));
    
            const intervalId = setInterval(() => {
                setCountdownTimers(prevState => ({
                    ...prevState,
                    [word.id]: prevState[word.id] - 1
                }));
            }, 1000);
    
            // time เหลือ 0 ย้ายคำไทยอิ้งไปช่องคำศัพท์
            const timeoutId = setTimeout(() => {
                handleWordAutoRemove(word);
                clearInterval(intervalId);
            }, 5000);
    
            timerRefs.current[word.id] = { intervalId, timeoutId };
        }
    };
    const stopCountdownTimer = (wordId: number) => {
        // หยุดcooldownหลังเมื่อคำไทยอิ้งถูกย้ายไปช่องคำศัพท์
        const timer = timerRefs.current[wordId];
        if (timer) {
            clearInterval(timer.intervalId);
            clearTimeout(timer.timeoutId);
            delete timerRefs.current[wordId];
        }
    };
    // //////////////////////////////////////////////////////////////////////คลิก/////////////////////////////////////////////////////////////////
    // คลิกคำ
    const handleWordClick = (word: Word) => {
        if (selectedWord && selectedWord.id === word.id) {
            setSelectedWord(null);
            return;
        }
    
        setSelectedWord(word);
    
        // อัพเดตสถานะของคำศัพท์ในทุกๆ ช่อง
        setWords(prevState => prevState.filter(item => item.id !== word.id));
        setThaiWords(prevState => prevState.filter(item => item.id !== word.id));
        setEnglishWords(prevState => prevState.filter(item => item.id !== word.id));
    
        if (thaiWords.find(thaiWord => thaiWord.id === word.id)) {
            setWords(prevState => [...prevState, word]);
            setThaiWords(prevState => prevState.filter(item => item.id !== word.id));
        } else if (englishWords.find(englishWord => englishWord.id === word.id)) {
            setWords(prevState => [...prevState, word]);
            setEnglishWords(prevState => prevState.filter(item => item.id !== word.id));
        } else {
            // หาว่าเป็นคำไทยหรืออิ้ง
            if (word.lang === 'TH') {
                setThaiWords(prevState => [...prevState, word]);
            } else {
                setEnglishWords(prevState => [...prevState, word]);
            }
        }
       
        // หลังย้ายคำศัพท์ก็นับถอยหลัง
        if (!countdownTimers[word.id]) {
            startCountdownTimer(word);
        }
    
    };
// /////////////////////////////////////////////////////////////////////////////ย้ายกลับเอง////////////////////////////////////////////////

    // ย้ายคำอัตโนมัติ
    const handleWordAutoRemove = (word: Word) => {
        if (word.lang === 'TH') {
            setThaiWords(prevState => [...prevState, word]);
            setThaiWords(prevState => prevState.filter(item => item.id !== word.id));
            setWords(prevState => [...prevState, word]); // เซ็ตคำศัพท์ไปที่ช่องคำศัพท์
        } else {
            setEnglishWords(prevState => [...prevState, word]); 
            setEnglishWords(prevState => prevState.filter(item => item.id !== word.id)); 
            setWords(prevState => [...prevState, word]); // เหมือนข้างบนแต่เป็นอิ้ง
        }
        stopCountdownTimer(word.id); 
        delete countdownTimers[word.id]; 

    };
    // ////////////////////////////////////////////////////////////////////////////////////interface////////////////////////////////////////////////////////////
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
                            className="word"
                            onClick={() => handleWordClick(word)}
                        >
                            {word.word} ({countdownTimers[word.id]})
                        </div>
                    ))}
                </div>
                <div className="english-list">
                    {englishWords.map(word => (
                        <div
                            key={word.id}
                            className="word"
                            onClick={() => handleWordClick(word)}
                        >
                            {word.word} ({countdownTimers[word.id]})
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default WordCheckList;