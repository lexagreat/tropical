const maskOptions = {
   mask: "+{7} (000) 000-00-00",
   // lazy: false,  // make placeholder always visible
   // placeholderChar: '0'     // defaults to '_'
};
if (document.querySelectorAll("[data-phone]").length) {
   document.querySelectorAll("[data-phone]").forEach((item) => {
      const mask = IMask(item, maskOptions);
   });
}

const body = document.body;
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
   productsSection();
   home();
   tabs('[name="product-modal-tabs"]', ".product-modal__tabs [data-tab]");
   addressModal();
   validateInputs();
   checkout();
   receipts();
   authModal();
   accordion(
      ".header-menu__links li button",
      ".header-menu__links li .collapse"
   );
   about();
   search();
   contacts();
});

function productsSection() {
   const sliders = document.querySelectorAll(".products-section .swiper");
   if (!sliders.length) return;
   sliders.forEach((slider) => {
      const swiper = new Swiper(slider, {
         spaceBetween: 4,
         mousewheel: {
            enabled: true,
            forceToAxis: true,
         },
         navigation: {
            nextEl: slider
               .closest(".products-section__slider")
               .querySelector(".next"),
            prevEl: slider
               .closest(".products-section__slider")
               .querySelector(".prev"),
         },
         breakpoints: {
            1024: {
               slidesPerView: 3,
            },
            0: {
               slidesPerView: "auto",
            },
         },
      });
   });
}
function home() {
   function hero() {
      const slider = document.querySelector(".home-hero .swiper");
      if (!slider) return;
      const swiper = new Swiper(slider, {
         spaceBetween: 4,
         slidesPerView: 1,
         mousewheel: {
            enabled: true,
            forceToAxis: true,
         },
         navigation: {
            nextEl: slider.querySelector(".next"),
            prevEl: slider.querySelector(".prev"),
         },
         pagination: {
            el: slider.querySelector(".home-hero__pagination"),
            type: "custom",
            renderCustom: function (swiper, current, total) {
               return `<span class="swiper-pagination-current">${current}</span>/<span class="swiper-pagination-total">${total}</span>`;
            },
         },
      });
   }
   function about() {
      const text = document.querySelector(".home-about__title");
      if (!text) return;
      const temp = text.textContent;
      text.innerHTML = "";
      const letters = temp.split("");
      letters.forEach((letter) => {
         const span = document.createElement("span");
         span.textContent = letter;
         text.appendChild(span);
      });
      const count = letters.length;
      const spans = document.querySelectorAll(".home-about__title span");
      gsap.to(text, {
         ease: "none",
         scrollTrigger: {
            trigger: text,
            start: `top 70%`,
            end: () => `top 20%`,
            scrub: 0.1,
            invalidateOnRefresh: true,

            onUpdate: (self) => {
               const current = Math.round(self.progress * count);
               spans.forEach((span, index) => {
                  if (index < current) {
                     span.classList.add("active");
                  } else {
                     span.classList.remove("active");
                  }
               });
            },
         },
      });
   }
   function faq() {
      const slides = document.querySelectorAll(".faq-slide");
      let activeIndex = 0;
      if (!slides.length) return;
      slides.forEach((slide, index) => {
         slide.addEventListener("click", () => {
            slides.forEach((item) => {
               item.classList.remove("active");
               item.style.width = "";
            });
            slide.classList.add("active");
            activeIndex = index;
         });
      });
      if (window.innerWidth > 1024) {
         slides[0].onmouseenter = () => {
            if (activeIndex !== 0) {
               slides[0].style.width = "calc(2 * var(--width))";
            }
         };
         slides[0].onmouseleave = () => {
            if (activeIndex !== 0) {
               slides[0].style.width = "";
            }
         };
         slides[1].onmouseenter = () => {
            if (activeIndex !== 1) {
               slides[1].style.width = "calc(2 * var(--width))";
               if (activeIndex === 0) {
                  slides[0].style.width =
                     "calc(100% - (var(--total) - 1) * var(--width) - var(--width))";
               }
            }
         };
         slides[1].onmouseleave = () => {
            if (activeIndex !== 1) {
               slides[1].style.width = "";
               if (activeIndex === 0) {
                  slides[0].style.width = "";
               }
            }
         };
         slides[2].onmouseenter = () => {
            if (activeIndex !== 2) {
               slides[2].style.width = "calc(2 * var(--width))";
               if (activeIndex === 0) {
                  slides[0].style.width =
                     "calc(100% - (var(--total) - 1) * var(--width) - var(--width))";
               }
               if (activeIndex === 1) {
                  slides[1].style.width =
                     "calc(100% - (var(--total) - 1) * var(--width) - var(--width))";
               }
            }
         };
         slides[2].onmouseleave = () => {
            if (activeIndex !== 2) {
               slides[2].style.width = "";
               if (activeIndex === 0) {
                  slides[0].style.width = "";
               }
               if (activeIndex === 1) {
                  slides[1].style.width = "";
               }
            }
         };
      }
   }
   hero();
   faq();
   about();
}
function search() {
   const input = document.querySelector(
      ".header__wrapper .header__search input"
   );
   const searchModal = document.querySelector(".modal.header-search");
   if (!input) return;
   input.addEventListener("click", () => {
      popupOpen(searchModal);
   });
}
function addressModal() {
   tabs('[name="address-modal-tabs"]', "#address-modal [data-tab]");
   tabs('[name="address-modal-tabs1"]', "#address-modal-choose [data-tab]");
   const pickupWindow = document.querySelector(".address-pickup");
   if (pickupWindow) {
      const closeButton = document.querySelector(".address-pickup__close");
      if (closeButton) {
         closeButton.addEventListener("click", () => {
            pickupWindow.classList.remove("active");
         });
      }
   }
}
function tabs(linkSelector, contentSelector) {
   const inputs = document.querySelectorAll(linkSelector);
   const contents = document.querySelectorAll(contentSelector);
   let value;
   if (inputs.length) {
      inputs.forEach((item) => {
         item.addEventListener("change", () => {
            if (item.checked) {
               value = item.value;
            }
            contents.forEach((item) => {
               item.classList.remove("active");
               if (item.getAttribute("data-tab") == value) {
                  item.classList.add("active");
               }
            });
         });
      });
   }
}
function validateInputs() {
   const labels = document.querySelectorAll(".app-input");
   if (!labels.length) return;
   labels.forEach((label) => {
      let input = label.querySelector("input");
      if (!input) {
         input = label.querySelector("textarea");
      }

      input.oninput = (e) => {
         let value = e.target.value.length;
         if (value > 0) {
            label.classList.add("filled");
         } else {
            label.classList.remove("filled");
         }
      };
   });
}
function checkout() {
   const inputs = document.querySelectorAll('[name="checkout1"]');
   if (!inputs.length) return;
   inputs.forEach((tab) => {
      tab.addEventListener("change", () => {
         const value = tab.value;
         const hidden = document.querySelector("[data-hidden-1]");
         if (value === "1") {
            hidden.classList.add("active");
         } else {
            hidden.classList.remove("active");
         }
      });
   });
   const checkbox = document.querySelector(".checkout-inputs__checkbox input");

   checkbox.addEventListener("change", () => {
      const value = checkbox.checked;
      const hidden = document.querySelector(".checkout-inputs__hidden");

      if (value) {
         hidden.classList.add("active");
      } else {
         hidden.classList.remove("active");
      }
   });
   tabs('[name="checkout2"]', "[data-checkout-2]");
}
function receipts() {
   const moreBtn = document.querySelectorAll(".receipts-aside__item button");

   if (!moreBtn.length) return;
   moreBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
         const parent = btn.closest(".receipts-aside__item");
         const items = parent.querySelectorAll("li");
         if (btn.classList.contains("active")) {
            btn.classList.remove("active");
            items.forEach((item, index) => {
               index > 4
                  ? item.classList.add("hidden")
                  : item.classList.remove("hidden");
            });
         } else {
            btn.classList.add("active");
            items.forEach((item) => {
               item.classList.remove("hidden");
            });
         }
         btn.closest("li").classList.remove("hidden");
      });
   });
   const filtersBtns = document.querySelectorAll(".receipts-filters__item");
   const outs = document.querySelectorAll(".receipts-filters__out");
   filtersBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
         if (btn.classList.contains("active")) {
            btn.classList.remove("active");
            outs[index].classList.remove("active");
            console.log(outs[index]);
            return;
         }
         outs.forEach((out, i) => {
            if (index === i) {
               out.classList.add("active");
            } else {
               out.classList.remove("active");
            }
         });
         filtersBtns.forEach((elem, i) => {
            if (index === i) {
               elem.classList.add("active");
            } else {
               elem.classList.remove("active");
            }
         });
      });
   });
}
function authModal() {
   const backBtn = document.querySelector(".auth-modal__back");
   if (!backBtn) return;
   backBtn.addEventListener("click", () => {
      const currentStep = document.querySelector(".auth-modal__step.active");
      if (!currentStep) return;
      currentStep.classList.remove("active");
      const previousStep = currentStep.previousElementSibling;
      previousStep.classList.add("active");
   });
}
function contacts() {
   function path() {
      const marker = document.querySelector(".contacts-path__marker");
      marker.onclick = () => {
         marker.classList.toggle("active");
      };
   }
   function nav() {
      const links = document.querySelectorAll(
         ".catalog-page__aside a[href^='#']"
      );
      if (!links.length) return;

      links.forEach((link) => {
         link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
               targetSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
               });
            }
         });
      });

      const sections = Array.from(links)
         .map((link) => {
            const id = link.getAttribute("href");
            return document.querySelector(id);
         })
         .filter(Boolean);

      function updateActiveLink() {
         const scrollTop = window.scrollY;
         const offset = 150;
         const windowBottom = scrollTop + window.innerHeight;
         const docHeight = document.documentElement.scrollHeight;

         let currentSection = sections[0];

         if (windowBottom >= docHeight - 50) {
            currentSection = sections[sections.length - 1];
         } else {
            sections.forEach((section) => {
               const sectionTop = section.offsetTop - offset;
               if (scrollTop >= sectionTop) {
                  currentSection = section;
               }
            });
         }

         links.forEach((link) => {
            const targetId = link.getAttribute("href");
            if (currentSection && targetId === `#${currentSection.id}`) {
               link.classList.add("active");
            } else {
               link.classList.remove("active");
            }
         });
      }

      window.addEventListener("scroll", updateActiveLink);
      updateActiveLink();
   }
   path();
   nav();
}
function about() {
   function hero() {
      const images = document.querySelectorAll(".about-hero__image");
      const wrapper = document.querySelector(".about-hero__wrapper");
      if (!images.length) return;

      const wrapperHeight = wrapper.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollDistance = wrapperHeight - viewportHeight;
      const animationDuration = scrollDistance / images.length;

      const gallery = document.querySelector(".about-hero__gallery");
      const overlap = 0.2;

      const tempDiv = document.createElement("div");
      tempDiv.style.width = "var(--container)";
      document.body.appendChild(tempDiv);
      const containerPadding = parseFloat(getComputedStyle(tempDiv).width);
      document.body.removeChild(tempDiv);

      const marginLeft =
         window.innerWidth > 1024
            ? wrapper.clientWidth - gallery.clientWidth + containerPadding
            : containerPadding;

      images.forEach((image, index) => {
         const options = {
            scrollTrigger: {
               trigger: wrapper,
               start: `top -=${index * animationDuration * overlap}`,
               end: `top -=${
                  index * animationDuration * overlap + animationDuration
               }`,
               scrub: 0.1,
               invalidateOnRefresh: true,
               markers: false,
            },
         };

         if (image.classList.contains("last")) {
            gsap.to(gallery, {
               marginRight: `-${containerPadding}`,
               width: "100vw",
               height: "100vh",
               marginLeft: `-${marginLeft}px`,
               borderRadius: "0",
               top: 0,
               ...options,
            });
            gsap.to(image, {
               borderRadius: "0",
               ...options,
            });
         } else {
            gsap.to(image, {
               y: "-90vh",
               x: "-90vw",
               scale: 0.8,
               rotate: "13deg",
               ...options,
            });
         }
      });
   }
   let lastScroll = 0;
   let ticking = false;

   function onScroll() {
      const header = document.querySelector(".header");
      const currentScroll = Math.max(0, window.scrollY);
      if (currentScroll > lastScroll) {
         header.style.translate = "0 -100%";
      } else {
         header.style.translate = "";
      }

      lastScroll = currentScroll;
      ticking = false;
   }
   function cifra() {
      const slider = document.querySelector(".about-cifra .swiper");
      if (!slider) return;

      const swiper = new Swiper(slider, {
         loop: true,
         centeredSlides: true,
         initialSlide: 1,
         navigation: {
            nextEl: document.querySelector(".about-cifra .next"),
            prevEl: document.querySelector(".about-cifra .prev"),
         },
         mousewheel: {
            enabled: true,
            forceToAxis: true,
         },
         breakpoints: {
            0: {
               slidesPerView: 1.5,
            },
            569: {
               slidesPerView: 2,
            },
            1025: {
               slidesPerView: 3,
            },
         },
      });
      setTimeout(() => {
         slider.style.height = slider.offsetHeight + "px";
      }, 500);
   }
   function geo() {
      const sliderElem = document.querySelector(".about-geo .swiper");
      const dots = document.querySelectorAll(".about-geo__dot");
      if (!sliderElem) return;

      let swiper = new Swiper(sliderElem, {
         slidesPerView: 1,
         spaceBetween: 16,
         pagination: {
            el: document.querySelector(".about-geo .about-geo__pagination"),
            type: "custom",
            renderCustom: function (swiper, current, total) {
               return `<span class="swiper-pagination-current">${current}</span><span class="swiper-pagination-total">/${total}</span>`;
            },
         },
         navigation: {
            prevEl: ".about-geo .about-geo__nav .prev",
            nextEl: ".about-geo .about-geo__nav .next",
         },
         on: {
            slideChange(swiper) {
               dots.forEach((item) => item.classList.remove("active"));
               dots[swiper.activeIndex].classList.add("active");
            },
            init() {
               dots[0].classList.add("active");
            },
         },
      });
      dots.forEach((item, index) => {
         item.onclick = () => {
            dots.forEach((dot) => dot.classList.remove("active"));
            item.classList.add("active");
            swiper.slideTo(index);
         };
      });
   }
   function reviews() {
      const sliderElem = document.querySelector(".about-reviews .swiper");

      if (!sliderElem) return;

      let swiper = new Swiper(sliderElem, {
         slidesPerView: "auto",
         mousewheel: {
            enabled: true,
            forceToAxis: true,
         },
         spaceBetween: 4,
         pagination: {
            el: document.querySelector(".about-reviews .about-geo__pagination"),
            type: "custom",
            renderCustom: function (swiper, current, total) {
               return `<span class="swiper-pagination-current">${current}</span><span class="swiper-pagination-total">/${total}</span>`;
            },
         },
         navigation: {
            prevEl: ".about-reviews .about-geo__nav .prev",
            nextEl: ".about-reviews .about-geo__nav .next",
         },
      });
   }
   function label() {
      const image = document.querySelector(".about-label__image");
      const btn = document.querySelector(".about-label__image .btn");
      let width;
      let flexBasis;
      let height;

      if (window.innerWidth > 1024) {
         width = 608;
         flexBasis = 608;
         height = 530;
      } else if (window.innerWidth > 768) {
         width = "100%";
         flexBasis = 634;
         height = 634;
      } else {
         width = "100%";
         flexBasis = 366;
         height = 366;
      }

      if (!image) return;
      gsap.to(image, {
         width,
         height,
         flexBasis,
         scrollTrigger: {
            trigger: image,
            start: `top 70%`,
            end: `top 20%`,
            scrub: 0.1,
            invalidateOnRefresh: true,
            markers: false,
            onUpdate: (self) => {
               if (self.progress > 0.9) {
                  btn.style.opacity = 1;
                  btn.style.pointerEvents = "all";
               } else {
                  btn.style.opacity = 0;
                  btn.style.pointerEvents = "none";
               }
            },
         },
      });
   }
   document.addEventListener("scroll", onScroll);
   hero();
   cifra();
   geo();
   reviews();
   label();
}

function accordion(linkSelector, contentSelector) {
   // получаем линки
   const openLinks = document.querySelectorAll(`${linkSelector}`);
   // контенты
   const contents = document.querySelectorAll(`${contentSelector}`);
   if (openLinks.length > 0) {
      for (let i = 0; i < openLinks.length; i++) {
         let openLink = openLinks[i];
         openLink.addEventListener("click", () => {
            // все прячем
            for (let j = 0; j < contents.length; j++) {
               // если хоть один открывается - return
               if (contents[j].classList.contains("collapsing")) {
                  return;
               } // Иначе
               // все прячем
               slideHide(contents[j]);
            }
            for (let j = 0; j < openLinks.length; j++) {
               openLinks[j].classList.remove("active");
            }
            // записываем в переменную нужный таб
            let content = contents[i];
            // работаем с классами линка
            if (content.classList.contains("collapsing")) {
               return;
            } else if (content.classList.contains("collapse_show")) {
               openLink.classList.remove("active");
            } else {
               openLink.classList.add("active");
            }
            // показываем нужный
            slideShow(content);
         });
      }
   }
}

function slideShow(el, duration = 500) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      el.classList.contains("collapse_show")
   ) {
      return;
   }
   // удаляем класс collapse
   el.classList.remove("collapse");
   // сохраняем текущую высоту элемента в константу height (это значение понадобится ниже)
   const height = el.offsetHeight;
   // устанавливаем высоте значение 0
   el.style["height"] = 0;
   // не отображаем содержимое элемента, выходящее за его пределы
   el.style["overflow"] = "hidden";
   // создание анимации скольжения с помощью CSS свойства transition
   el.style["transition"] = `height ${duration}ms ease`;
   // добавляем класс collapsing
   el.classList.add("collapsing");
   // получим значение высоты (нам этого необходимо для того, чтобы просто заставить браузер выполнить перерасчет макета, т.к. он не сможет нам вернуть правильное значение высоты, если не сделает это)
   el.offsetHeight;
   // установим в качестве значения высоты значение, которое мы сохранили в константу height
   el.style["height"] = `${height}px`;
   // по истечении времени анимации this._duration
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим классы collapse и collapse_show
      el.classList.add("collapse");
      el.classList.add("collapse_show");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
function slideHide(el, duration = 500) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      !el.classList.contains("collapse_show")
   ) {
      return;
   }
   // установим свойству height текущее значение высоты элемента
   el.style["height"] = `${el.offsetHeight}px`;
   // получим значение высоты
   el.offsetHeight;
   // установим CSS свойству height значение 0
   el.style["height"] = 0;
   // обрежем содержимое, выходящее за границы элемента
   el.style["overflow"] = "hidden";
   // добавим CSS свойство transition для осуществления перехода длительностью this._duration
   el.style["transition"] = `height ${duration}ms ease`;
   // удалим классы collapse и collapse_show
   el.classList.remove("collapse");
   el.classList.remove("collapse_show");
   // добавим класс collapsing
   el.classList.add("collapsing");
   // после завершения времени анимации
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим класс collapsing
      el.classList.add("collapse");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
// Popup
const popupLinks = document.querySelectorAll(".modal__link");
const lockPadding = document.querySelectorAll(".lock-padding");
const popupCloseIcon = document.querySelectorAll(".modal__close");

let unlock = true;

const timeout = 500;

if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
         const popupName = popupLink.getAttribute("href").replace("#", "");
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }
}

if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener("click", function (e) {
         popupClose(el.closest(".modal"));
         e.preventDefault();
      });
   }
}

function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector(".modal.open");
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add("open");
      curentPopup.addEventListener("click", function (e) {
         console.log(e);
         if (
            !e.target.closest(".modal__content") &&
            !e.target.closest(".modal__wrapper")
         ) {
            popupClose(e.target.closest(".modal"));
         }
      });
   }
}
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove("open");
      if (doUnlock) {
         bodyUnLock();
      }
   }
}

function bodyLock() {
   const wrapperElement = document.querySelector(".wrapper");
   const lockPaddingValue = wrapperElement
      ? window.innerWidth - wrapperElement.offsetWidth + "px"
      : window.innerWidth - document.body.offsetWidth + "px";

   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
      }
   }
   body.style.paddingRight = lockPaddingValue;
   body.classList.add("lock");
   // lenis.stop();

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = "0px";
         }
      }
      body.style.paddingRight = "0px";
      body.classList.remove("lock");
      // lenis.start();
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

document.addEventListener("keydown", function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector(".modal.open");
      popupClose(popupActive);
   }
});
