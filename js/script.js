window.addEventListener('DOMContentLoaded',()=>{


const menuBtn = document.querySelector('.menu__btn');
const menuBlock = document.querySelector('.menu__block');
const goTop = document.querySelector('.go-top');

menuBtn.addEventListener('click', ()=>{
  menuBtn.classList.toggle('menu__btn--active');
  openMenu()
});

const toTop = ()=>{
  const header = document.getElementById('header');
  
  goTop.addEventListener('click', (e)=>{
    e.preventDefault();
    const top = header.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top,
      behavior: "smooth"
    });
  })
}

const openMenu = () => {
  document.body.classList.toggle('lock');
  menuBlock.classList.toggle('menu__block--active');
}

const headerScroll = () => {
  const headerWrapper = document.querySelector('.header__wrapper');
  const headerHeight = headerWrapper.offsetHeight;
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;

  if(scrollPosition > headerHeight + 50 ){
    headerWrapper.classList.add('header__wrapper--active');
    goTop.classList.add('go-top--active');
    toTop();
  } else {
     headerWrapper.classList.remove('header__wrapper--active');
     goTop.classList.remove('go-top--active');
  }

}
window.addEventListener('scroll', headerScroll);

const startAddonNumber = (elements)=> {
  const time = 2000;  // Общее время анимации в миллисекундах

    elements.forEach(item => {
      
      let n = 0; // Начальное значение счётчик
      let num = parseInt(item.dataset.addonNum) || 0; // значение в атрибуте 
      let stepTime = Math.round(time / num); // Вычисляем интервал обновления числа

      let interval = setInterval(() => {
        item.textContent = ++n; // Обновляю текст в элементе

        if (n >= num) { //Остановка, когда достигнем нужного числа
          clearInterval(interval)
        } 
      }, stepTime);
      
    });
    
}
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

})

