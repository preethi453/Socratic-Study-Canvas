import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Pin,
  FileText,
} from "lucide-react";

import "../styles/mynotes.css";

export default function MyNotes() {
  const [notes, setNotes] =useState([]);
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  const [search,setSearch]=useState("");

  useEffect(() => {
    const saved = localStorage.getItem("myNotes");
    if(saved){
      setNotes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myNotes",JSON.stringify(notes));
  }, [notes]);

  const addNote=()=>{

    if(!title.trim() || !content.trim()) return;

    const newNote={
      id:Date.now(),
      title,
      content,
      pinned:false,
      date:new Date().toLocaleDateString(),
    };

    setNotes([newNote,...notes]);
    setTitle("");
    setContent("");
  };

  const deleteNote=(id)=>{
    setNotes(notes.filter(note=>note.id!==id));
  };

  const pinNote=(id)=>{
    setNotes(notes.map(note=>
      note.id===id
      ? {...note,pinned:!note.pinned}
      : note
    ));
  };

  const filtered=notes.filter(note=>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  return(
    <div className="notes-page">

      <div className="notes-header">

        <div>
          <h1> My Notes</h1>
          <p>Create, organize and revisit your study notes.</p>
        </div>

        <div className="search-box">
          <Search size={18}/>
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>

      </div>

      <div className="note-editor">

        <input
          placeholder="Note title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <textarea
          rows={6}
          placeholder="Write your notes..."
          value={content}
          onChange={(e)=>setContent(e.target.value)}
        />

        <button onClick={addNote}>
          <Plus size={18}/>
          Add Note
        </button>

      </div>

      <div className="notes-grid">

        {filtered.map(note=>(

          <div
            className={`note-card ${note.pinned?"pinned":""}`}
            key={note.id}
          >

            <div className="note-top">

              <FileText size={22}/>

              <div className="note-actions">

                <button onClick={()=>pinNote(note.id)}>
                  <Pin size={18}/>
                </button>

                <button onClick={()=>deleteNote(note.id)}>
                  <Trash2 size={18}/>
                </button>

              </div>

            </div>

            <h3>{note.title}</h3>

            <p>{note.content}</p>

            <span>{note.date}</span>

          </div>

        ))}

      </div>

    </div>
  );
}