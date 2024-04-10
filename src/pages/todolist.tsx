import React, { FC, useState } from "react";

let nextId = 0;

export default function ToDoList() {
    const [name, setName] = useState("");
    const [listMembers, setListMembers] = useState([]);

    const handleAdd = () => {
        if (name.trim() !== "") {
            const newMember = {
                id: nextId++,
                name: name.trim()
            };
            setListMembers([...listMembers, newMember]);
            setName("");
        }
    };

    const handleDelete = (id) => {
        setListMembers(listMembers.filter(member => member.id !== id));
    };

    return (
        <>
            <div>
                <h1>To Do List</h1>
                <input 
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <button onClick={handleAdd}>เพิ่ม</button>
                <ul>
                    {listMembers.map((member) => (
                        <li key={member.id}>
                            <span>{member.name}</span>
                            <button onClick={() => handleDelete(member.id)}>ลบ</button>
                        </li>
                    ))}
                </ul>
                    
                
            </div>
        </>
    );
}
type ListMemberItemProps={
    item:string,
    index:number,
    remove:(index:number)=>void}

const ListMemberItem: FC<ListMemberItemProps> = ({remove, item,index}) => {
    return(
        <li>
            {item}
            <button onClick={() =>{
                remove(index)
            }}></button>
        </li>
    )
}




