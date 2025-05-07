import React from 'react';
import '../styles/components/Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-container">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/29/Yadro_logo.svg"
            alt="Yadro Logo"
            className="company-logo"
          />
        </div>
        <div className="author-info">
          <p>Еремеев Дмитрий Андреевич</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
