import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import './app.scss';

function App() {
  const [el, setEl] = useState(0);
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    $(window).on('load resize', function() {
      var $thisnav = $('.is-active').offset().left;
      $('.menu-item').hover(function() {
        var $left = $(this).offset().left - $thisnav;
        var $width = $(this).outerWidth();
        var $start = 0;
        setWidth($width);
        setLeft($left);
        $('.wee').css({
          left: $left,
          width: $width,
          height: '4rem'
        });
      }, function() {
        var $initwidth = $('.current-menu-item').width();
        $('.wee').css({
          left: 0,
          width: $initwidth,
        });
      });
    });
  }, []);

  const selectedMenuItem = (_index) => {
    const isActiveEl = document.querySelector('.is-active');
    setEl(_index);
    if (_index === el) {
      return;
    }
    const els = document.querySelector('.nav-container ul').childNodes;
    els.forEach((_el, elIndex) => {
      if (_index === elIndex) {
        _el.classList.add('is-active');
        isActiveEl.classList.remove('is-active');
      }
    });
  };

  const style = {
    left,
    width: '100%',
    height: '4rem',
  };

  return (
    <main className="container">
      <header className="header-container">
        <span className="header-text">Demo App</span>
      </header>
      <nav className="nav-container">
        <ul className="menu">
          <li className="menu-item is-active">
            <i className="icon-coffee nav-icons cursor-pointer" onClick={() => selectedMenuItem(0)} />
            <div className="wee" style={style} />
          </li>
          <li className="menu-item">
            <i className="icon-cutlery nav-icons cursor-pointer" onClick={() => selectedMenuItem(1)} />
          </li>
          <li className="menu-item">
            <i className="icon-percent nav-icons cursor-pointer" onClick={() => selectedMenuItem(2)} />
          </li>
          <li className="menu-item">
            <i className="icon-search nav-icons cursor-pointer" onClick={() => selectedMenuItem(3)} />
          </li>
        </ul>
      </nav>
    </main>
  );
}

export default App;
