import React, { useState } from "react";
import "./workshop.css";
import user from './user.png';

let nextId = 0;

export default function ToDoList() {
    const [name, setName] = useState("");
    const [listMembers, setListMembers] = useState([]);
    const [editingIds, setEditingIds] = useState({});

    const Add = () => {
        if (name.trim() !== "") {
            const newMember = { id: nextId++, name: name.trim() };
            setListMembers([...listMembers, newMember]);
            setName("");
        }
    };

    const Delete = (id) => {
        setListMembers(listMembers.filter(member => member.id !== id));
    };

    const Edit = (id) => {
        setEditingIds((prevEditingIds) => ({
            ...prevEditingIds,
            [id]: !prevEditingIds[id]
        }));
    };

    const EditChange = (event, id) => {
        const newName = event.target.value;
        setListMembers(listMembers.map(member => (
            member.id === id ? { ...member, name: newName } : member
        )));
    };

    return (
        <div className="divall">
            <h1 className="p1">To Do List</h1>

            {/* เพิ่มรายชื่อ */}
            <div className="divinput">
            <img src={user} alt="User" /> 
            <input className="input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                
            />
            <button className="addbtn" onClick={Add}>เพิ่ม</button>
            </div>
            {/* แสดงชื่อ แก้ไข ลบ */}
            
            <dl >
                <h1 className="postlist">Post List</h1>
                {listMembers.map((member) => (
                    <dt className="liprofile" key={member.id}> 
                    <img src={user} alt="User" />    
                        {editingIds[member.id] ? (
                            <input className="inputmem"
                                value={member.name}
                                onChange={(event) => EditChange(event, member.id)}
                            />
                        ) : (
                           <div className="memname">{member.name} </div>
                        )}
                        <div className="btnall">
                        <button className="editbtn" onClick={() => Edit(member.id)}>
                            {editingIds[member.id] ? "บันทึก" : "แก้ไข"}
                        </button>
                        <button className="deletebtn" onClick={() => Delete(member.id)}>ลบ</button>
                        </div>
                    </dt>
                    
                ))}
            </dl>

        </div>
    );
}
