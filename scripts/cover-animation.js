document.querySelectorAll('.cover-container').forEach(container => {

  const imgs = container.querySelectorAll('.cover-pic-left, .cover-pic-right');
  const text = container.querySelector('.cover-text-stress, .cover-text-eleph, .cover-text-covid');
  
  imgs.forEach(img => {
    
    img.addEventListener('mouseenter', function() {
      
      if (img.offsetParent === null) return; /* ignores hidden images (display: none) */
      imgs.forEach(i => i.classList.add('moved'));
    
      if (text) {
        text.classList.add('visible');
      }
    });
  });
});