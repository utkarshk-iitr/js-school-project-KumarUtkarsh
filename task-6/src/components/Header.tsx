import React from "react";

const Header: React.FC<{ onToggleTheme: () => void }> = ({ onToggleTheme }) => {
  return (
    <header>
      <div className="logo">
        <img src="../../public/imgs/logo.png" width="42" height="42" alt="BMW" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}}/>
        <h1>Timeline App</h1>
      </div>
      <button className="theme" onClick={onToggleTheme}>Change Theme</button>
    </header>
  );
};

export default Header;
