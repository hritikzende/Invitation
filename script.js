/* ============================================================
   MAHARASHTRIAN ENGAGEMENT INVITATION
   Vanilla JavaScript
============================================================ */


/* ============================================================
   1. CONFIGURATION
   ------------------------------------------------------------
   EDIT THIS SECTION ONLY FOR MOST CUSTOMIZATION.
============================================================ */

const CONFIG = {

  couple: {
    brideName: "Aarti",
    groomName: "Rohan",

    brideBio:
      "Graceful, warm-hearted and always ready with a smile, Aarti brings sunshine wherever she goes.",

    groomBio:
      "Kind, cheerful and forever curious, Rohan believes the best moments are the ones shared."
  },


  families: {
    brideParents: "Mr. & Mrs. Deshmukh",
    groomParents: "Mr. & Mrs. Patil"
  },


  event: {

    /*
      IMPORTANT:

      Use the actual event date/time here.

      Format:
      YYYY-MM-DDTHH:MM:SS+05:30

      Example:
      12 December 2026, 6:00 PM IST
    */

    countdownDate:
      "2026-12-12T18:00:00+05:30",

    displayDate:
      "Saturday, 12 December 2026",

    day:
      "Saturday",

    date:
      "12",

    monthYear:
      "December 2026",

    time:
      "6:00 PM"

  },


  venue: {

    name:
      "The Grand Celebration",

    shortName:
      "The Grand Celebration",

    address:
      "Koregaon Park, Pune, Maharashtra",

    city:
      "Pune, Maharashtra",

    /*
      Replace with your actual Google Maps link.
    */

    mapUrl:
      "https://maps.google.com/?q=Koregaon+Park+Pune"

  },


  contact: {

    /*
      IMPORTANT:
      Use digits only for WhatsApp.

      Example:
      919876543210
    */

    whatsappNumber:
      "919876543210",

    /*
      Include country code.

      Example:
      +919876543210
    */

    phoneNumber:
      "+919876543210",

    whatsappMessage:
      "Hello! I would love to attend the engagement ceremony of Aarti & Rohan. Looking forward to celebrating with you! ❤️"

  },


  images: {

    /*
      You can replace these later with:

      assets/bride.jpg
      assets/groom.jpg
      assets/gallery-1.jpg

      etc.
    */

    bride:
      "https://images.unsplash.com/photo-1771992230505-97e0c3d38213?auto=format&fit=crop&w=900&q=85",

    groom:
      "https://images.unsplash.com/photo-1722952934661-dde241aeb591?auto=format&fit=crop&w=900&q=85",

    gallery: [

      {
        src:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=85",

        alt:
          "Wedding celebration"
      },

      {
        src:
          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85",

        alt:
          "Floral wedding decoration"
      },

      {
        src:
          "https://images.unsplash.com/photo-1722952934661-dde241aeb591?auto=format&fit=crop&w=1000&q=85",

        alt:
          "Indian wedding couple"
      },

      {
        src:
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",

        alt:
          "Wedding celebration"
      },

      {
        src:
          "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1400&q=85",

        alt:
          "Wedding ceremony"
      },

      {
        src:
          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85",

        alt:
          "Traditional floral wedding detail"
      }

    ]

  },


  audio: {

    /*
      Put your audio file here later:

      assets/shehnai.mp3
    */

    src:
      "assets/shehnai.mp3"

  }

};


/* ============================================================
   2. DOM HELPERS
============================================================ */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];


/* ============================================================
   3. CONFIG → HTML
============================================================ */

function populateContent() {

  const fields = {

    brideName:
      CONFIG.couple.brideName,

    groomName:
      CONFIG.couple.groomName,

    brideBio:
      CONFIG.couple.brideBio,

    groomBio:
      CONFIG.couple.groomBio,

    brideParents:
      CONFIG.families.brideParents,

    groomParents:
      CONFIG.families.groomParents,

    displayDate:
      CONFIG.event.displayDate,

    displayTime:
      CONFIG.event.time,

    eventDate:
      CONFIG.event.date,

    eventMonthYear:
      CONFIG.event.monthYear,

    eventDay:
      CONFIG.event.day,

    eventTime:
      CONFIG.event.time,

    venueName:
      CONFIG.venue.name,

    venueShort:
      CONFIG.venue.shortName,

    venueAddress:
      CONFIG.venue.address,

    city:
      CONFIG.venue.city,

    year:
      new Date(CONFIG.event.countdownDate).getFullYear()

  };


  Object.entries(fields).forEach(([key, value]) => {

    $$(`[data-field="${key}"]`).forEach(element => {

      element.textContent = value;

    });

  });


  /*
    Couple images
  */

  $$("[data-image='bride']").forEach(image => {

    image.src =
      CONFIG.images.bride;

  });


  $$("[data-image='groom']").forEach(image => {

    image.src =
      CONFIG.images.groom;

  });


  /*
    Google Maps
  */

  const mapButton =
    $("#mapButton");

  if (mapButton) {

    mapButton.href =
      CONFIG.venue.mapUrl;

  }


  /*
    Phone
  */

  const callButton =
    $("#callButton");

  if (callButton) {

    callButton.href =
      `tel:${CONFIG.contact.phoneNumber}`;

  }


  /*
    WhatsApp
  */

  const whatsappButton =
    $("#whatsappButton");

  if (whatsappButton) {

    const message =
      encodeURIComponent(
        CONFIG.contact.whatsappMessage
      );

    whatsappButton.href =
      `https://wa.me/${CONFIG.contact.whatsappNumber}?text=${message}`;

  }


  /*
    Social sharing image
  */

  const ogImage =
    $("#ogImage");

  if (ogImage) {

    ogImage.setAttribute(
      "content",
      CONFIG.images.couple ||
      CONFIG.images.bride
    );

  }


  /*
    Audio source
  */

  const audio =
    $("#backgroundMusic");

  if (audio) {

    const source =
      $("source", audio);

    if (source) {

      source.src =
        CONFIG.audio.src;

      audio.load();

    }

  }

}


/* ============================================================
   4. SCROLL REVEAL
   ------------------------------------------------------------
   Uses IntersectionObserver.
============================================================ */

function setupScrollReveal() {

  const elements =
    $$(".reveal");

  if (!elements.length) {
    return;
  }


  /*
    Accessibility / reduced motion:
    reveal everything immediately.
  */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (prefersReducedMotion) {

    elements.forEach(element => {

      element.classList.add(
        "is-visible"
      );

    });

    return;
  }


  const observer =
    new IntersectionObserver(
      (entries, observerInstance) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }


          entry.target.classList.add(
            "is-visible"
          );


          observerInstance.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12,

        rootMargin:
          "0px 0px -50px 0px"
      }
    );


  elements.forEach(element => {

    observer.observe(element);

  });

}


/* ============================================================
   5. SCROLL PROGRESS BAR
============================================================ */

function setupScrollProgress() {

  const progress =
    $("#scrollProgress");

  if (!progress) {
    return;
  }


  let ticking =
    false;


  function updateProgress() {

    const scrollTop =
      window.scrollY;

    const scrollable =
      document.documentElement.scrollHeight -
      window.innerHeight;


    const percentage =
      scrollable > 0
        ? (scrollTop / scrollable) * 100
        : 0;


    progress.style.width =
      `${percentage}%`;

    ticking = false;

  }


  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        window.requestAnimationFrame(
          updateProgress
        );

        ticking = true;

      }

    },
    { passive: true }
  );


  updateProgress();

}


/* ============================================================
   6. HERO PARALLAX
============================================================ */

function setupHeroParallax() {

  const hero =
    $(".hero");

  const background =
    $(".hero-background");

  if (!hero || !background) {
    return;
  }


  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (reducedMotion) {
    return;
  }


  let ticking = false;


  function updateParallax() {

    const rect =
      hero.getBoundingClientRect();


    /*
      Only animate while hero is visible.
    */

    if (
      rect.bottom > 0 &&
      rect.top < window.innerHeight
    ) {

      const offset =
        Math.max(
          -25,
          Math.min(
            25,
            rect.top * -0.08
          )
        );


      background.style.setProperty(
        "--parallax-offset",
        `${offset}px`
      );

    }


    ticking = false;

  }


  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        window.requestAnimationFrame(
          updateParallax
        );

        ticking = true;

      }

    },
    { passive: true }
  );

}


/* ============================================================
   7. PETAL GENERATOR
============================================================ */

function createPetals() {

  const container =
    $("#petals");

  if (!container) {
    return;
  }


  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (reducedMotion) {
    return;
  }


  /*
    Keep this deliberately small for performance.
  */

  const count =
    window.innerWidth < 600
      ? 12
      : 20;


  for (
    let i = 0;
    i < count;
    i++
  ) {

    const petal =
      document.createElement("span");

    petal.className =
      "petal";


    const left =
      Math.random() * 100;

    const duration =
      7 + Math.random() * 8;

    const delay =
      Math.random() * -12;

    const drift =
      `${-80 + Math.random() * 160}px`;


    petal.style.left =
      `${left}%`;

    petal.style.animationDuration =
      `${duration}s`;

    petal.style.animationDelay =
      `${delay}s`;

    petal.style.setProperty(
      "--drift",
      drift
    );


    container.appendChild(petal);

  }

}


/* ============================================================
   8. COUNTDOWN
============================================================ */

function setupCountdown() {

  const daysElement =
    $("#days");

  const hoursElement =
    $("#hours");

  const minutesElement =
    $("#minutes");

  const secondsElement =
    $("#seconds");

  const countdownGrid =
    $("#countdownGrid");

  const completeMessage =
    $("#countdownComplete");


  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  ) {

    return;

  }


  const target =
    new Date(
      CONFIG.event.countdownDate
    ).getTime();


  function pad(number) {

    return String(number)
      .padStart(2, "0");

  }


  function updateCountdown() {

    const now =
      Date.now();

    const difference =
      target - now;


    if (difference <= 0) {

      daysElement.textContent =
        "00";

      hoursElement.textContent =
        "00";

      minutesElement.textContent =
        "00";

      secondsElement.textContent =
        "00";


      if (countdownGrid) {

        countdownGrid.hidden =
          true;

      }


      if (completeMessage) {

        completeMessage.hidden =
          false;

      }


      return;

    }


    const totalSeconds =
      Math.floor(
        difference / 1000
      );


    const days =
      Math.floor(
        totalSeconds / 86400
      );


    const hours =
      Math.floor(
        (totalSeconds % 86400) / 3600
      );


    const minutes =
      Math.floor(
        (totalSeconds % 3600) / 60
      );


    const seconds =
      totalSeconds % 60;


    daysElement.textContent =
      pad(days);

    hoursElement.textContent =
      pad(hours);

    minutesElement.textContent =
      pad(minutes);

    secondsElement.textContent =
      pad(seconds);

  }


  updateCountdown();


  /*
    Every second is enough for this UI.
  */

  window.setInterval(
    updateCountdown,
    1000
  );

}


/* ============================================================
   9. GALLERY DATA
============================================================ */

let galleryItems =
  CONFIG.images.gallery;


/* ============================================================
   10. GALLERY LIGHTBOX
============================================================ */

function setupLightbox() {

  const lightbox =
    $("#lightbox");

  const lightboxImage =
    $("#lightboxImage");

  const lightboxCaption =
    $("#lightboxCaption");

  const closeButton =
    $("#lightboxClose");

  const previousButton =
    $("#lightboxPrev");

  const nextButton =
    $("#lightboxNext");


  if (
    !lightbox ||
    !lightboxImage ||
    !closeButton
  ) {

    return;

  }


  let currentIndex =
    0;


  function renderImage(index) {

    const item =
      galleryItems[index];

    if (!item) {
      return;
    }


    currentIndex =
      index;


    lightboxImage.src =
      item.src;

    lightboxImage.alt =
      item.alt || "";


    if (lightboxCaption) {

      lightboxCaption.textContent =
        item.alt || "";

    }

  }


  function openLightbox(index) {

    renderImage(index);


    lightbox.classList.add(
      "is-open"
    );

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.classList.add(
      "no-scroll"
    );


    closeButton.focus();

  }


  function closeLightbox() {

    lightbox.classList.remove(
      "is-open"
    );

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.classList.remove(
      "no-scroll"
    );


    lightboxImage.src =
      "";

  }


  function showNext() {

    const nextIndex =
      (currentIndex + 1) %
      galleryItems.length;

    renderImage(nextIndex);

  }


  function showPrevious() {

    const previousIndex =
      (
        currentIndex -
        1 +
        galleryItems.length
      ) %
      galleryItems.length;

    renderImage(previousIndex);

  }


  /*
    Gallery buttons
  */

  $$(".gallery-item").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const index =
            Number(
              button.dataset.galleryIndex
            );

          openLightbox(index);

        }
      );

    }
  );


  closeButton.addEventListener(
    "click",
    closeLightbox
  );


  if (nextButton) {

    nextButton.addEventListener(
      "click",
      showNext
    );

  }


  if (previousButton) {

    previousButton.addEventListener(
      "click",
      showPrevious
    );

  }


  /*
    Click outside image closes viewer.
  */

  lightbox.addEventListener(
    "click",
    event => {

      if (
        event.target === lightbox
      ) {

        closeLightbox();

      }

    }
  );


  /*
    Keyboard controls.
  */

  document.addEventListener(
    "keydown",
    event => {

      if (
        !lightbox.classList.contains(
          "is-open"
        )
      ) {

        return;

      }


      if (
        event.key === "Escape"
      ) {

        closeLightbox();

      }


      if (
        event.key === "ArrowRight"
      ) {

        showNext();

      }


      if (
        event.key === "ArrowLeft"
      ) {

        showPrevious();

      }

    }
  );


  /*
    Basic touch swipe.
  */

  let touchStartX =
    0;

  let touchEndX =
    0;


  lightbox.addEventListener(
    "touchstart",
    event => {

      touchStartX =
        event.changedTouches[0].screenX;

    },
    { passive: true }
  );


  lightbox.addEventListener(
    "touchend",
    event => {

      touchEndX =
        event.changedTouches[0].screenX;


      const difference =
        touchStartX -
        touchEndX;


      if (
        Math.abs(difference) < 50
      ) {

        return;

      }


      if (difference > 0) {

        showNext();

      } else {

        showPrevious();

      }

    },
    { passive: true }
  );

}


/* ============================================================
   11. SMOOTH SCROLL BUTTONS
============================================================ */

function setupScrollButtons() {

  $$("[data-scroll-to]").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const targetSelector =
            button.dataset.scrollTo;

          const target =
            $(targetSelector);


          if (!target) {
            return;
          }


          target.scrollIntoView({
            behavior: window.matchMedia(
              "(prefers-reduced-motion: reduce)"
            ).matches
              ? "auto"
              : "smooth"
          });

        }
      );

    }
  );

}


/* ============================================================
   12. MUSIC CONTROL
============================================================ */

function setupMusic() {

  const audio =
    $("#backgroundMusic");

  const button =
    $("#musicToggle");

  if (!audio || !button) {
    return;
  }


  let isPlaying =
    false;


  function updateButton() {

    const icon =
      $(".music-icon", button);

    const label =
      $(".music-label", button);


    if (isPlaying) {

      if (icon) {
        icon.textContent = "♫";
      }

      if (label) {
        label.textContent = "Mute";
      }

      button.setAttribute(
        "aria-label",
        "Mute background music"
      );

      button.setAttribute(
        "aria-pressed",
        "true"
      );

    } else {

      if (icon) {
        icon.textContent = "♫";
      }

      if (label) {
        label.textContent = "Music";
      }

      button.setAttribute(
        "aria-label",
        "Play background music"
      );

      button.setAttribute(
        "aria-pressed",
        "false"
      );

    }

  }


  button.addEventListener(
    "click",
    async () => {

      try {

        if (audio.paused) {

          await audio.play();

          isPlaying =
            true;

        } else {

          audio.pause();

          isPlaying =
            false;

        }

      } catch (error) {

        /*
          Browser may reject playback if
          audio file is missing or unavailable.
          We intentionally avoid throwing errors.
        */

        isPlaying =
          false;

      }


      updateButton();

    }
  );


  audio.addEventListener(
    "pause",
    () => {

      isPlaying =
        false;

      updateButton();

    }
  );


  updateButton();

}


/* ============================================================
   13. IMAGE ERROR FALLBACK
============================================================ */

function setupImageFallbacks() {

  $$("img").forEach(
    image => {

      image.addEventListener(
        "error",
        () => {

          /*
            Avoid broken image icons.

            The element receives a neutral
            decorative fallback.
          */

          image.style.display =
            "none";

          const parent =
            image.parentElement;

          if (parent) {

            parent.classList.add(
              "image-fallback"
            );

          }

        },
        { once: true }
      );

    }
  );

}


/* ============================================================
   14. ACTIVE HERO OBSERVATION
   ------------------------------------------------------------
   Used to stop expensive decorative effects when
   hero is not visible.
============================================================ */

function setupHeroVisibility() {

  const hero =
    $(".hero");

  const petals =
    $("#petals");

  if (!hero || !petals) {
    return;
  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            petals.style.display =
              "";

          } else {

            petals.style.display =
              "none";

          }

        });

      },
      {
        threshold: 0
      }
    );


  observer.observe(hero);

}


/* ============================================================
   15. PREVENT BROKEN INTERNAL LINKS
============================================================ */

function setupAnchors() {

  $$("a[href='#']").forEach(
    anchor => {

      anchor.addEventListener(
        "click",
        event => {

          event.preventDefault();

        }
      );

    }
  );

}


/* ============================================================
   16. INITIALIZATION
============================================================ */

function init() {

  populateContent();

  setupScrollReveal();

  setupScrollProgress();

  setupHeroParallax();

  createPetals();

  setupCountdown();

  setupLightbox();

  setupScrollButtons();

  setupMusic();

  setupImageFallbacks();

  setupHeroVisibility();

  setupAnchors();

}


/*
  Start after DOM is ready.
*/

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    init
  );

} else {

  init();

}