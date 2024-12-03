const bodyTag = document.querySelector('body');
const htmlTag = document.querySelector('html');
const menuToggle = document.querySelector('.menu__toggle');
const menuClose = document.querySelector('.menu__close');
const menuContainer = document.querySelector('.menu__container');
const overlay = document.querySelector('.overlay');

menuToggle.addEventListener('click', () => {
  menuContainer.style.animation = 'menu-entrance 200ms ease-in';
  menuContainer.style.display = 'block';
  overlay.style.display = 'block';
  bodyTag.style.overflowY = 'hidden';
  htmlTag.style.overflowY = 'hidden';
});

menuClose.addEventListener('click', () => {
  menuContainer.style.animation = 'menu-leaves 200ms ease-out';
  menuContainer.style.display = 'none';
  overlay.style.display = 'none';
  bodyTag.style.overflowY = 'initial';
  htmlTag.style.overflowY = 'initial';
});
