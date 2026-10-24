/* Vishpala theme: burger menu, font preference and language switcher. */
(function () {
  'use strict';

  function store(action, key, value) {
    try {
      if (action === 'get') return localStorage.getItem(key);
      if (action === 'set') localStorage.setItem(key, value);
      if (action === 'remove') localStorage.removeItem(key);
    } catch (e) { /* storage unavailable: preference lasts for this page only */ }
    return null;
  }

  // Burger menu toggle (narrow screens)
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      if (expanded) { nav.removeAttribute('data-open'); }
      else { nav.setAttribute('data-open', ''); }
    });
  }

  // Shared hover and focus behaviour for the dropdown switchers
  function wireDropdown(container, trigger) {
    if (!container || !trigger) return;
    function setExpanded(val) { trigger.setAttribute('aria-expanded', String(val)); }
    container.addEventListener('mouseenter', function () { setExpanded(true); });
    container.addEventListener('mouseleave', function () { setExpanded(false); });
    container.addEventListener('focusin', function () { setExpanded(true); });
    container.addEventListener('focusout', function (e) {
      if (!container.contains(e.relatedTarget)) { setExpanded(false); }
    });
  }

  // Font preference: system font or Atkinson Hyperlegible
  var fontOptions = document.querySelectorAll('[data-font-choice]');
  function applyFont(choice) {
    if (choice === 'atkinson') {
      document.documentElement.setAttribute('data-font', 'atkinson');
      store('set', 'vishpala-font', 'atkinson');
    } else {
      document.documentElement.removeAttribute('data-font');
      store('remove', 'vishpala-font');
    }
    fontOptions.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-font-choice') === choice ? 'true' : 'false');
    });
  }
  var fontSwitcher = document.querySelector('.font-switcher');
  if (fontSwitcher) {
    applyFont(store('get', 'vishpala-font') || 'system');
    wireDropdown(fontSwitcher, document.getElementById('font-toggle'));
    fontOptions.forEach(function (btn) {
      btn.addEventListener('click', function () { applyFont(btn.getAttribute('data-font-choice')); });
    });
  }

  wireDropdown(document.querySelector('.lang-switcher'), document.querySelector('.lang-switcher-trigger'));
})();
