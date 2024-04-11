import { Word } from '@workshop_assignment/assignment2';
import IconLock from './IconLock';
import { useEffect, useRef, useState } from 'react';
import '@workshop_assignment/assignment.css';

const WordItem = ({ word, handle }:
    { word: Word, handle: (word: Word) => void }) => {
    const [lock, setLock] = useState(false);
    const [count, setCount] = useState(5)
    const interval = useRef<NodeJS.Timeout>()

    useEffect(() => {
        interval.current = setInterval(() => {
            if (!lock) {
                setCount(prev => prev - 1)
            }
        }, 1000)
        return () => {
            clearInterval(interval.current)
        }
    }, [lock])

    useEffect(() => {
        if (count <= 0) {
            handle(word)
        }
    }, [count])

    return (
        <div
            className={`word ${word.locked ? 'locked' : ''}`}
            onClick={() => { handle(word) }}
        >
            {word.word} {count}
            <IconLock lock={lock} lockWord={() => {
                setLock(!lock);
                setCount(5)
            }} />

        </div>
    );
};

export default WordItem;