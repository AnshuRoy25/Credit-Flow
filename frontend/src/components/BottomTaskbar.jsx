 import React from 'react';
 import { useNavigate } from 'react-router-dom';
 import { Home, Search, Plus, FileText, User } from 'lucide-react';
import './BottomTaskbar.css';


export default function BottomTaskbar() {
    const navigate = useNavigate();
  return (
    <div className="bottom-nav-bar">
      {/* Nav Dot 1 - Active */}
      <div className="nav-dot nav-dot-active" title='Home'>
        <Home/>
      </div>
      
      {/* Nav Dot 2 - Inactive */}
      <div className="nav-dot nav-dot-active" title='Find Banks'>
       <Search/>
      </div>
      
      {/* Nav Dot 3 - Inactive */}
      <div className="nav-dot nav-dot-active" 
            title="Apply for Loan"
            onClick={() => (navigate('/loan-types'))}>
        <Plus size={30}/>
      </div>
      
      {/* Nav Dot 4 - My Applications */}
      <div className="nav-dot nav-dot-active" title='My Applications'>
        <FileText size={25}/>
      </div>
      
      {/* Nav Dot 5 - Profile */}
      <div className="nav-dot nav-dot-active" title='Profile'>
        <User size={28}/>
      </div>
    </div>
  );
}