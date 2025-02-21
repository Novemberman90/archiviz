window.addEventListener('DOMContentLoaded',()=>{


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



const startAddonNumber = (elements)=> {
  const time = 2000;  // Общее время анимации в миллисекундах
  const step = 1; // Шаг увеличения числа

    elements.forEach(item => {
      
      let n = 0; // Начальное значение счётчик
      let num = parseInt(item.dataset.addonNum) || 0; // значение в атрибуте 
      let t = Math.round(time / num); // Вычисляем интервал обновления числа

      let interval = setInterval(() => {
        n += step; // Увеличиваем текущее число на 1
        item.innerHTML = n; // Обновляю текст в элементе

        if (n >= num) { //Остановка, когда достигнем нужного числа
          clearInterval(interval)
        } 
      }, t);
      
    });
    
}
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elements = document.querySelectorAll('.addon__number');
                startAddonNumber(elements);
                observer.disconnect(); // Отключаем после первого срабатывания
            }
        });
    }, { threshold: 0.25 });

    observer.observe(document.querySelector('.addon')); // Слежу за нужным или любым другим элементом в конце страницы

})

