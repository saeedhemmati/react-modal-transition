import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import './app.scss';

function App() {
  const [el, setEl] = useState(0);
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState(0);

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

  /**
   * 
   * @param {Number} _index 
   */
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

  /**
   *
   * @param {Number} _index 
   */
  const selectedSubCategoryHandler = (_e, _index) => {
    setSelectedSubCategory(_index);
    const el = document.querySelector('.sub-category-items');
    const elStyle = el.style;
    const oldSelected = document.querySelector('.selected-sub-category');
    oldSelected.classList.remove('selected-sub-category');
    switch (_index) {
      case 0:
        elStyle.transform = 'translateX(72px)';
        break;
      case 1:
        elStyle.transform = 'translateX(0)';
        break;
      case 2:
        elStyle.transform = 'translateX(-72px)';
        break;
    }

    _e.target.classList.add('selected-sub-category');
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

      <section className="sub-category-container">
        <div className="sub-category-items">
          <span
            className="sub-category-item selected-sub-category"
            onClick={(e) => selectedSubCategoryHandler(e, 0)}
          >
            ALL
          </span>
          <span
            className="sub-category-item middle-item"
            onClick={(e) => selectedSubCategoryHandler(e, 1)}
          >
            PIZZA
          </span>
          <span
            className="sub-category-item"
            onClick={(e) => selectedSubCategoryHandler(e, 2)}
          >
            STEAK
          </span>
        </div>
      </section>

      <section className="content">

      </section>
    </main>
  );
}

export default App;
