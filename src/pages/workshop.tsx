import { useState } from "react";

let nextId = 0;


export default function List(){
    const [name, setName] = useState('');
    const [artists, setArtits] = useState([]);

    return (
        <h1>To Do List</h1>
    )
}