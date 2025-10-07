document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__nav');
  
  if (burger && nav) {
    burger.addEventListener('click', function() {
      const isOpen = nav.style.display === 'block';
      nav.style.display = isOpen ? 'none' : 'block';
      burger.setAttribute('aria-expanded', !isOpen);
      
      if (!isOpen) {
        nav.classList.add('nav--open');
      } else {
        nav.classList.remove('nav--open');
      }
    });
    
    const navLinks = nav.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        nav.style.display = 'none';
        nav.classList.remove('nav--open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
    
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.style.display = 'none';
        nav.classList.remove('nav--open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const range = document.getElementById('progress');
  const valueSpan = document.getElementById('rangeValue');
  
  if (range && valueSpan) {
    function updateValue() {
      valueSpan.textContent = range.value;
    }
    
    updateValue();
    range.addEventListener('input', updateValue);
  }

  const customSelects = document.querySelectorAll('.custom-select');
  
  customSelects.forEach(select => {
    const trigger = select.querySelector('.custom-select__trigger');
    const dropdown = select.querySelector('.custom-select__dropdown');
    const options = select.querySelectorAll('.custom-select__option');
    const valueElement = select.querySelector('.custom-select__value');
    const hiddenInput = select.querySelector('input[type="hidden"]');
    
    if (trigger) {
      trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        customSelects.forEach(s => {
          if (s !== select) s.classList.remove('open');
        });
        select.classList.toggle('open');
      });
    }
    
    options.forEach(option => {
      option.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        const text = this.textContent;
        
        if (valueElement) valueElement.textContent = text;
        if (hiddenInput) hiddenInput.value = value;
        
        options.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        
        select.classList.remove('open');
      });
    });
  });
  
  document.addEventListener('click', function() {
    customSelects.forEach(select => {
      select.classList.remove('open');
    });
  });
});