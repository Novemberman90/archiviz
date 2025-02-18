const menuBtn = document.querySelector('.menu__btn');
const menuBlock = document.querySelector('.menu__block');


menuBtn.addEventListener('click', ()=>{
  menuBtn.classList.toggle('menu__btn--active');
  openMenu()
});


const closeMune = () => {
  document.body.classList.remove('lock');
  menuBtn.classList.remove('menu__btn--active');
  menuList.classList.remove('menu__list--active');
}

const openMenu = () => {
  document.body.classList.toggle('lock');
  menuBlock.classList.toggle('menu__block--active');
}
