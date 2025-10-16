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
      // gsap.to(techBg, {

      //    ease: "none",
      //    scrollTrigger: {
      //       trigger: tech,
      //       start: `top 10%`,
      //       end: () => `+=600px`,
      //       scrub: 0.1,
      //       invalidateOnRefresh: true,
      //       // markers: true,
      //       onUpdate: (self) => {

      //       },
      //    },
      // });
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
         if (!e.target.closest(".modal__content")) {
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
