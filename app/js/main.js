window.addEventListener('DOMContentLoaded',()=>{

const menuBtn = document.querySelector('.menu__btn');
const menuBlock = document.querySelector('.menu__block');
const goTop = document.querySelector('.go-top');

/* Кнопка открытия и закрытия меню */
menuBtn.addEventListener('click', ()=>{
  menuBtn.classList.toggle('menu__btn--active');
  openMenu()
});

/* Кнопка НА ВЕРХ */
goTop.addEventListener('click', (e)=>{
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
})

/* Открытие меню */
const openMenu = () => {
  document.body.classList.toggle('lock');
  menuBlock.classList.toggle('menu__block--active');
}

/* При скроле меняется цвет хедера и активация кнопки НА ВЕРХ */
const headerScroll = () => {
  const headerWrapper = document.querySelector('.header__wrapper');
  const headerHeight = headerWrapper.offsetHeight;
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;

  if(scrollPosition > headerHeight + 50 ){
    headerWrapper.classList.add('header__wrapper--active');
    goTop.classList.add('go-top--active');
  } else {
     headerWrapper.classList.remove('header__wrapper--active');
     goTop.classList.remove('go-top--active');
  }

}
window.addEventListener('scroll', headerScroll);

/* Счетчик */
const startAddonNumber = (elements)=> {
  const time = 2000;  // Общее время анимации в миллисекундах
    
    elements.forEach(item => {
        let startTime;
        let num = parseInt(item.dataset.addonNum) || 0;

        const updateNumber = (timestamp) => {
            if (!startTime) startTime = timestamp;
            let progress = Math.min((timestamp - startTime) / time, 1);
            item.textContent = Math.floor(progress * num);

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };

        requestAnimationFrame(updateNumber);
    });
}

/* Слежу когда счетчик попадёт в поле видимости, чтобы его запустить */
const addonElement = document.querySelector('.addon');
  if (addonElement) {
    const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const elements = document.querySelectorAll('.addon__number');
            startAddonNumber(elements);
            observer.disconnect(); // Отключаем после первого срабатывания
        }
    });
    
    }, { threshold: 0.25 });

    observer.observe(addonElement); // Слежу за нужным или любым другим элементом в конце страницы
  }

  new WOW().init();
})

