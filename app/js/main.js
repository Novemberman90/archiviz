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
  const contactWiget = document.querySelector('.contact-wiget');

  if(scrollPosition > headerHeight + 50 ){
    headerWrapper.classList.add('header__wrapper--active');
    goTop.classList.add('go-top--active');
    contactWiget.classList.add('contact-wiget--active'); 
  } else {
     headerWrapper.classList.remove('header__wrapper--active');
     goTop.classList.remove('go-top--active');
     contactWiget.classList.remove('contact-wiget--active'); 
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



  const cookie = document.getElementById('cookie');
  
    if (cookie) {
      const acceptBtn = cookie.querySelector('.cookie__button--accept');
      const closeBtn = cookie.querySelector('.cookie__button--decline');
      const COOKIE_KEY = 'cookieConsent';
  
      if (localStorage.getItem(COOKIE_KEY) === null) {
        setTimeout(() => cookie.classList.add('is-show'), 4000);
      }
  
      acceptBtn?.addEventListener('click', () => {
        localStorage.setItem(COOKIE_KEY, 'true');
        cookie.classList.remove('is-show');
      });
  
      closeBtn?.addEventListener('click', () => {
        localStorage.setItem(COOKIE_KEY, 'false');
        cookie.classList.remove('is-show');
      });
    }


    /* Лайтбокс */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    if (lightbox && lightboxImg && lightboxClose) {

      function closeLightbox() {
        lightbox.classList.remove('is-open-lightbox');
        document.body.style.overflow = '';
      }

      document.querySelectorAll('.js-lightbox-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
          lightboxImg.src = trigger.dataset.src;
          lightboxImg.alt = trigger.dataset.alt;
          lightbox.classList.add('is-open-lightbox');
          document.body.style.overflow = 'hidden';
        });
      });

      lightboxClose.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
      });

    }


    /* Аккордеоны */
    const accordeons = document.querySelectorAll("[data-accordion]");

      accordeons.forEach(item => {
        const btn = item.querySelector(".faq__button");
        const content = item.querySelector("[data-accordion-content]");
        const icon = item.querySelector(".faq__icon");

        btn.addEventListener("click", () => {
          const isOpening = !item.classList.contains("is-open");

          // Закрываем все
          accordeons.forEach(acc => {
            acc.classList.remove("is-open");

            const inner = acc.querySelector("[data-accordion-content]");
            inner.style.maxHeight = null;

            acc.querySelector(".faq__icon")
              .classList.remove("faq__icon--open");
          });

          // Открываем текущий
          if (isOpening) {
            item.classList.add("is-open");
            content.style.maxHeight = content.scrollHeight + "px";
            icon.classList.add("faq__icon--open");
            btn.setAttribute("aria-expanded", "true");
          }
        });
      });

      /* Анимация */ 
      new WOW().init();
});

