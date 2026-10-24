/* Vishpala theme: apply the font preference before render to prevent a flash.
   Loaded without defer in <head>; a file rather than inline, so the
   Content Security Policy needs no hash for it. */
try { if (localStorage.getItem('vishpala-font') === 'atkinson') { document.documentElement.setAttribute('data-font', 'atkinson'); } } catch (e) {}
