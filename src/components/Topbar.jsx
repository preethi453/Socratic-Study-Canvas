import "../styles/topbar.css";
import {
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Topbar() {

  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [search, setSearch] = useState("");

  const inputRef = useRef(null);

  const notifications = [
    {
      id:1,
      title:"Knowledge Graph generated successfully."
    },
    {
      id:2,
      title:"3 new Socratic questions available."
    },
    {
      id:3,
      title:"AI Insights updated."
    }
  ];

  /* Ctrl + K */

  useEffect(() => {

    const handler=(e)=>{

      if(e.ctrlKey && e.key.toLowerCase()==="k"){

        e.preventDefault();

        inputRef.current.focus();

      }

    };

    window.addEventListener("keydown",handler);

    return ()=>window.removeEventListener("keydown",handler);

  },[]);

  /* Theme */

  useEffect(()=>{

    if(theme==="light"){

      document.body.classList.add("light-theme");

    }else{

      document.body.classList.remove("light-theme");

    }

    localStorage.setItem("theme",theme);

  },[theme]);

  const toggleTheme=()=>{

    setTheme(prev=>prev==="dark" ? "light":"dark");

  };

  const logout=()=>{

    navigate("/");

  };

  return (

    <header className="topbar">

      <div className="search-container">

        <Search size={18}/>

        <input

          ref={inputRef}

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          placeholder="Search notes, concepts..."

        />

        <span className="shortcut">
          Ctrl + K
        </span>

      </div>

      <div className="topbar-right">

        <button
          className="top-icon"
          onClick={toggleTheme}
        >
          {theme==="dark"
            ? <Moon size={18}/>
            : <Sun size={18}/>
          }
        </button>

        <div className="notification-wrapper">

          <button

            className="top-icon notification"

            onClick={()=>setShowNotifications(!showNotifications)}

          >

            <Bell size={18}/>

            <span className="dot">
              {notifications.length}
            </span>

          </button>

          {showNotifications && (

            <div className="dropdown">

              <h4>Notifications</h4>

              {notifications.map(item=>(

                <div
                  key={item.id}
                  className="menu-item"
                >
                  {item.title}
                </div>

              ))}

            </div>

          )}

        </div>

        <div className="profile-wrapper">

          <div

            className="user-profile"

            onClick={()=>setShowProfile(!showProfile)}

          >

            <div className="user-avatar">
              A
            </div>

            <span>Amrutha</span>

            <ChevronDown size={16}/>

          </div>

          {showProfile && (

            <div className="dropdown">

              <div className="menu-item">

                <User size={16}/>

                My Profile

              </div>

              <div className="menu-item">

                <Settings size={16}/>

                Settings

              </div>

              <div
                className="menu-item logout"
                onClick={logout}
              >

                <LogOut size={16}/>

                Logout

              </div>

            </div>

          )}

        </div>

      </div>

    </header>

  );

}

export default Topbar;