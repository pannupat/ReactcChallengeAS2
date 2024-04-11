import React, { useState } from 'react';
import data from './word.json';
import './assignment.css';
import WordItem from '@components/WordItem';


export interface Word {
    id: number;
    word: string;
    lang: string;
    locked?: boolean;
}

const WordCheckList: React.FC = () => {
    const [words, setWords] = useState<Word[]>(data.map(w => ({ ...w, locked: false })));
    const [thaiWords, setThaiWords] = useState<Word[]>([]);
    const [englishWords, setEnglishWords] = useState<Word[]>([]);

    const addToRight = (word: Word) => {
        setWords(prev => prev.filter(w => w.id !== word.id))
        if (word.lang === "TH") {
            setThaiWords(prev => [...prev, word])
        } else if (word.lang === "EN") {
            setEnglishWords(prev => [...prev, word])
        }
    }

    const addThaiToLeft = (word: Word) => {
        setThaiWords(prev => prev.filter(w => w.id !== word.id))
        setWords(prev => [...prev, word])
    }

    const addEnglishToLeft = (word: Word) => {
        setEnglishWords(prev => prev.filter(w => w.id !== word.id))
        setWords(prev => [...prev, word])
    }

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
                            className={`word`}
                            onClick={() => { addToRight(word) }}
                        >
                            {word.word}
                        </div>
                    ))}
                </div>
                <div className="thai-list">
                    {thaiWords.map(word => (
                        <WordItem
                            key={word.id}
                            word={word}
                            handle={() => { addThaiToLeft(word) }}
                        />
                    ))}
                </div>
                <div className="english-list">
                    {englishWords.map(word => (
                        <WordItem
                            key={word.id}
                            word={word}
                            handle={() => { addEnglishToLeft(word) }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WordCheckList;
