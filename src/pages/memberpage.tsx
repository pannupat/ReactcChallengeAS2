import { eventNames } from "process";
import { useState } from "react";

let nextId = 0;


export default function ToDoList() {
    const [name, setName] = useState("");
    const [List_Member, setListMember] = useState([])

    const Add = () => {
        setListMember([...List_Member, name])
    };


    return (
        <>
            <div>
                <h1>To Do List</h1>
                <input onChange={(event) => { setName(event.target.value) }}
                />
                <button onClick={Add}>เพิ่ม</button>
                <ul>
                    {List_Member.map((item, index) => {
                        return (
                            <li>

                                <span>{item}</span>
                                <button onClick={() => {
                                    setListMember(
                                        List_Member.filter(a =>
                                            a.id !== List_Member.id
                                        )
                                    );
                                }}>
                                    ลบ
                                </button>
                            </li>
                        )
                    }
                    )}</ul>
                
            </div>
        </>
    );
}
