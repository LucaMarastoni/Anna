(() => {
  const galleryConfig = {
    legno: {
      title: "Legno inciso",
      description:
        "Incisioni su legno di diverse essenze: targhe commemorative, insegne per attività, bomboniere e decorazioni su misura.",
      caption: "Incisioni su legno con finitura naturale e dettagli personalizzati.",
      images: [
        "legno1.jpeg",
        "legno2.jpeg",
        "legno3.jpeg",
        "legno4.jpeg",
        "legno5.jpeg",
        "legno6.jpeg",
        "legno7.jpeg",
        "legno8.jpeg",
        "legno9.jpeg",
        "legno10.jpeg",
        "legno11.jpeg",
        "legno12.jpeg",
        "legno13.jpeg",
        "legno14.jpeg",
        "legno15.jpeg",
        "legno16.jpeg",
        "legno17.jpeg"
      ]
    },
    metallo: {
      title: "Metallo inciso",
      description:
        "Acciaio e alluminio diventano supporti scenografici per loghi, targhe, gadget tecnici e pezzi decorativi ad alto contrasto.",
      caption: "Incisioni nette su metallo, perfette per targhe e accessori industrial chic.",
      images: [
        "metallo1.jpeg",
        "metallo2.jpeg",
        "metallo3.jpeg",
        "metallo4.jpeg",
        "metallo5.jpeg",
        "metallo6.jpeg",
        "metallo7.jpeg",
        "metallo8.jpeg",
        "metallo9.jpeg",
        "metallo10.jpeg",
        "metallo11.jpeg",
        "metallo12.jpeg",
        "metallo13.jpeg",
        "metallo14.jpeg"
      ]
    },
    vetro: {
      title: "Vetro inciso",
      description:
        "Incisioni su vetro trasparente o satinato che riflettono la luce e valorizzano forme e pattern personalizzati.",
      caption: "Lavorazioni su vetro con incisioni luminose e dettagliate.",
      images: ["vetro1.jpeg"]
    },
    bicchieri: {
      title: "Bicchieri incisi",
      description:
        "Set di bicchieri incisi a mano per eventi speciali, collezioni limitate e regali unici con grafiche su misura.",
      caption: "Bicchieri incisi per eventi, cerimonie e regali personalizzati.",
      images: ["bicchiere1.jpeg", "bicchiere2.jpeg", "bicchiere3.jpeg"]
    },
    bottiglie: {
      title: "Bottiglie con lampada",
      description:
        "Bottiglie recuperate trasformate in lampade poetiche: incisioni e luce calda per un effetto scenografico.",
      caption: "Bottiglie trasformate in lampade con incisioni decorative.",
      images: ["bottoglia1.jpeg"]
    }
  };

  let lightboxEl = null;
  let lightboxImage = null;
  let lightboxCaption = null;
  let lightboxCloseBtn = null;
  let lastFocusedElement = null;
  let privacyModalEl = null;
  let privacyCloseBtn = null;
  let lastPrivacyTrigger = null;

  const padIndex = (index) => String(index + 1).padStart(2, "0");

  function ensureLightbox() {
    if (lightboxEl) {
      return lightboxEl;
    }

    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-hidden", "true");

    overlay.innerHTML = `
      <div class="lightbox__inner" role="document">
        <button type="button" class="lightbox__close" aria-label="Chiudi immagine">&times;</button>
        <img class="lightbox__image" src="" alt="">
        <p class="lightbox__caption"></p>
      </div>
    `;

    document.body.appendChild(overlay);

    lightboxEl = overlay;
    lightboxImage = overlay.querySelector(".lightbox__image");
    lightboxCaption = overlay.querySelector(".lightbox__caption");
    lightboxCloseBtn = overlay.querySelector(".lightbox__close");

    if (lightboxCloseBtn) {
      lightboxCloseBtn.addEventListener("click", () => {
        closeLightbox();
      });
    }

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeLightbox();
      }
    });

    const inner = overlay.querySelector(".lightbox__inner");
    if (inner) {
      inner.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    }

    return overlay;
  }

  function openLightbox(item, triggerElement) {
    const overlay = ensureLightbox();
    if (!overlay || !lightboxImage) {
      return;
    }

    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt || "";

    if (lightboxCaption) {
      if (item.caption) {
        lightboxCaption.textContent = item.caption;
        lightboxCaption.classList.remove("is-hidden");
      } else {
        lightboxCaption.textContent = "";
        lightboxCaption.classList.add("is-hidden");
      }
    }

    lastFocusedElement = triggerElement || document.activeElement || null;
    overlay.classList.add("is-active");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-lightbox-open");

    if (lightboxCloseBtn && typeof lightboxCloseBtn.focus === "function") {
      lightboxCloseBtn.focus();
    }
  }

  function closeLightbox() {
    if (!lightboxEl || !lightboxEl.classList.contains("is-active")) {
      return false;
    }

    lightboxEl.classList.remove("is-active");
    lightboxEl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-lightbox-open");

    if (lightboxImage) {
      lightboxImage.removeAttribute("src");
      lightboxImage.alt = "";
    }

    if (lightboxCaption) {
      lightboxCaption.textContent = "";
      lightboxCaption.classList.remove("is-hidden");
    }

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
    lastFocusedElement = null;
    return true;
  }

  function ensurePrivacyModal() {
    if (privacyModalEl) {
      return privacyModalEl;
    }

    const overlay = document.createElement("div");
    overlay.className = "privacy-modal";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-hidden", "true");

    overlay.innerHTML = `
      <div class="privacy-modal__inner" role="document">
        <button type="button" class="privacy-modal__close" aria-label="Chiudi Privacy Policy">&times;</button>
        <header class="privacy-modal__header">
          <h2 class="section-title">Privacy Policy</h2>
          <p class="section-subtitle">
            Trasparenza totale: qui scopri come vengono raccolti, utilizzati e protetti i tuoi dati personali quando
            navighi sul sito o richiedi informazioni.
          </p>
        </header>
        <div class="privacy-grid">
          <article class="privacy-card">
            <h3>Dati raccolti</h3>
            <p>Quando contatti Anna vengono trattati nome, indirizzo e-mail, telefono (se fornito) e il contenuto della tua richiesta. Non vengono raccolti dati sensibili.</p>
          </article>
          <article class="privacy-card">
            <h3>Finalità e durata</h3>
            <p>I dati sono utilizzati esclusivamente per rispondere, predisporre preventivi e gestire ordini o consegne. Sono conservati solo per il tempo necessario a queste attività.</p>
          </article>
          <article class="privacy-card">
            <h3>Condivisione</h3>
            <p>Le informazioni non vengono vendute né cedute. Possono essere condivise con fornitori strettamente necessari alla realizzazione del progetto, sempre sotto accordi di riservatezza.</p>
          </article>
          <article class="privacy-card">
            <h3>Diritti dell’interessato</h3>
            <p>Puoi richiedere accesso, rettifica o cancellazione dei dati scrivendo a <a href="mailto:brizzianna83@gmail.com">brizzianna83@gmail.com</a>. Riceverai risposta entro 30 giorni.</p>
          </article>
        </div>
        <p class="privacy-note">Ultimo aggiornamento: 1 giugno 2024. Per approfondimenti o segnalazioni contatta brizzianna83@gmail.com.</p>
      </div>
    `;

    document.body.appendChild(overlay);

    privacyModalEl = overlay;
    privacyCloseBtn = overlay.querySelector(".privacy-modal__close");

    if (privacyCloseBtn) {
      privacyCloseBtn.addEventListener("click", () => closePrivacyModal());
    }

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closePrivacyModal();
      }
    });

    const inner = overlay.querySelector(".privacy-modal__inner");
    if (inner) {
      inner.addEventListener("click", (event) => event.stopPropagation());
    }

    return overlay;
  }

  function openPrivacyModal(triggerElement) {
    const overlay = ensurePrivacyModal();
    if (!overlay) {
      return;
    }

    lastPrivacyTrigger = triggerElement || document.activeElement || null;
    overlay.classList.add("is-active");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-modal-open");

    if (privacyCloseBtn && typeof privacyCloseBtn.focus === "function") {
      privacyCloseBtn.focus();
    }
  }

  function closePrivacyModal() {
    if (!privacyModalEl || !privacyModalEl.classList.contains("is-active")) {
      return false;
    }

    privacyModalEl.classList.remove("is-active");
    privacyModalEl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-modal-open");

    if (privacyCloseBtn) {
      privacyCloseBtn.blur();
    }

    if (lastPrivacyTrigger && typeof lastPrivacyTrigger.focus === "function") {
      lastPrivacyTrigger.focus();
    }
    lastPrivacyTrigger = null;
    return true;
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
      closePrivacyModal();
    }
  });

  const createGalleryItems = (category) => {
    const config = galleryConfig[category];
    if (!config) {
      return [];
    }
    return config.images.map((filename, index) => ({
      category,
      src: `assets/img/${filename}`,
      title: `${config.title} ${padIndex(index)}`,
      alt: `${config.title} ${padIndex(index)}`,
      caption: config.caption
    }));
  };

  const populateGalleries = () => {
    const roots = Array.from(document.querySelectorAll("[data-gallery-root]"));
    if (!roots.length) {
      return;
    }

    roots.forEach((root) => {
      const context = root.dataset.galleryContext || "category";
      const targetCategory = root.dataset.category || null;
      let items = [];

      if (context === "homepage") {
        Object.keys(galleryConfig).forEach((key) => {
          items = items.concat(createGalleryItems(key));
        });
      } else if (targetCategory) {
        items = createGalleryItems(targetCategory);
      }

      if (!items.length) {
        return;
      }

      const fragment = document.createDocumentFragment();
      items.forEach((item, index) => {
        const card = document.createElement("article");
        card.className = "product-card";
        card.dataset.category = item.category;
        card.setAttribute("data-reveal", "fade-up");
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute(
          "aria-label",
          item.title ? `Apri ${item.title} a schermo intero` : "Apri immagine a schermo intero"
        );
        const delay = (index % 4) * 60;
        if (delay) {
          card.setAttribute("data-reveal-delay", String(delay));
        }

        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.alt;
        img.loading = "lazy";
        img.decoding = "async";
        card.appendChild(img);

        const handleOpen = () => openLightbox(item, card);
        card.addEventListener("click", handleOpen);
        card.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleOpen();
          }
        });
        fragment.appendChild(card);
      });

      root.innerHTML = "";
      root.appendChild(fragment);
    });
  };

  populateGalleries();

  const pageCategory = (document.body && document.body.dataset.galleryPage) || null;
  if (pageCategory && galleryConfig[pageCategory]) {
    const descriptionEl = document.querySelector("[data-gallery-description]");
    if (descriptionEl && descriptionEl.textContent.trim().length === 0) {
      descriptionEl.textContent = galleryConfig[pageCategory].description;
    }
    const captionEl = document.querySelector("[data-gallery-caption]");
    if (captionEl && captionEl.textContent.trim().length === 0) {
      captionEl.textContent = galleryConfig[pageCategory].caption;
    }
  }

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const revealElements = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach((el) => {
      const delay = el.getAttribute("data-reveal-delay");
      if (delay) {
        el.style.transitionDelay = `${parseInt(delay, 10)}ms`;
      }
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  const navbar = document.querySelector(".navbar");
  const root = document.documentElement;
  const productSection = document.getElementById("prodotti");
  const parallaxItems = Array.from(document.querySelectorAll("[data-parallax]"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let scrollFrame = null;
  let navbarHeight = 0;

  const carouselRoot = document.querySelector("[data-carousel]");
  if (carouselRoot) {
    const slides = Array.from(carouselRoot.querySelectorAll("[data-carousel-item]"));
    const stage = carouselRoot.closest(".hero-carousel__stage");
    const indicators = stage ? Array.from(stage.querySelectorAll("[data-carousel-indicator]")) : [];
    const slideCount = slides.length;
    if (slideCount > 1) {
      let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
      if (activeIndex < 0) {
        activeIndex = 0;
      }
      const autoplayDelay = 5000;
      let timerId = null;

      const clearAutoplay = () => {
        if (timerId) {
          window.clearInterval(timerId);
          timerId = null;
        }
      };

      const syncSlides = (nextIndex) => {
        slides.forEach((slide, index) => {
          slide.classList.toggle("is-active", index === nextIndex);
        });
        indicators.forEach((indicator, index) => {
          const isCurrent = index === nextIndex;
          indicator.classList.toggle("is-active", isCurrent);
          indicator.setAttribute("aria-current", isCurrent ? "true" : "false");
        });
        activeIndex = nextIndex;
      };

      const goTo = (index) => {
        const nextIndex = ((index % slideCount) + slideCount) % slideCount;
        if (nextIndex === activeIndex) {
          return;
        }
        syncSlides(nextIndex);
      };

      const stepForward = () => {
        goTo(activeIndex + 1);
      };

      const startAutoplay = () => {
        if (prefersReducedMotion.matches || slideCount <= 1) {
          clearAutoplay();
          return;
        }
        clearAutoplay();
        timerId = window.setInterval(stepForward, autoplayDelay);
      };

      const pauseAutoplay = () => {
        clearAutoplay();
      };

      const resumeAutoplay = () => {
        startAutoplay();
      };

      syncSlides(activeIndex);
      startAutoplay();

      if (stage) {
        stage.addEventListener("mouseenter", pauseAutoplay);
        stage.addEventListener("mouseleave", resumeAutoplay);
        stage.addEventListener("focusin", pauseAutoplay);
        stage.addEventListener("focusout", (event) => {
          const nextTarget = event.relatedTarget;
          if (!nextTarget || (stage && !stage.contains(nextTarget))) {
            resumeAutoplay();
          }
        });
      }

      indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
          syncSlides(index);
          resumeAutoplay();
        });
        indicator.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            syncSlides(index);
            resumeAutoplay();
          }
        });
      });

      const handleReducedMotionChange = () => {
        if (prefersReducedMotion.matches) {
          pauseAutoplay();
        } else {
          resumeAutoplay();
        }
      };

      if (typeof prefersReducedMotion.addEventListener === "function") {
        prefersReducedMotion.addEventListener("change", handleReducedMotionChange);
      } else if (typeof prefersReducedMotion.addListener === "function") {
        prefersReducedMotion.addListener(handleReducedMotionChange);
      }
    }
  }

  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");
  if (navToggle && navMenu) {
    const toggleLabel = navToggle.querySelector(".sr-only");
    const closeMenu = () => {
      navMenu.classList.remove("is-open");
      navToggle.classList.remove("is-active");
      navToggle.setAttribute("aria-expanded", "false");
      if (toggleLabel) {
        toggleLabel.textContent = "Apri il menu";
      }
      setNavbarHeight();
    };

    const openMenu = () => {
      navMenu.classList.add("is-open");
      navToggle.classList.add("is-active");
      navToggle.setAttribute("aria-expanded", "true");
      if (toggleLabel) {
        toggleLabel.textContent = "Chiudi il menu";
      }
      setNavbarHeight();
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.contains("is-open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navMenu.addEventListener("click", (event) => {
      if (!(event.target instanceof HTMLElement)) {
        return;
      }
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 720 && navMenu.classList.contains("is-open")) {
        closeMenu();
      } else {
        setNavbarHeight();
      }
    });
  }

  function setNavbarHeight() {
    if (!navbar || !root) {
      return;
    }
    const nextHeight = Math.round(navbar.getBoundingClientRect().height);
    if (!Number.isFinite(nextHeight) || nextHeight <= 0 || nextHeight === navbarHeight) {
      return;
    }
    navbarHeight = nextHeight;
    root.style.setProperty("--navbar-height", `${navbarHeight}px`);
  }

  const smoothScrollTo = (element, extraOffset = 16) => {
    if (!element) {
      return;
    }
    const navHeight = navbarHeight || (navbar ? Math.round(navbar.getBoundingClientRect().height) : 0);
    const targetPosition =
      element.getBoundingClientRect().top + window.pageYOffset - navHeight - extraOffset;
    window.scrollTo({
      top: targetPosition < 0 ? 0 : targetPosition,
      behavior: prefersReducedMotion.matches ? "auto" : "smooth"
    });
  };

  const anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]:not([href="#"])'));
  anchorLinks.forEach((link) => {
    const hash = link.getAttribute("href");
    if (!hash || hash.length < 2) {
      return;
    }
    const targetId = hash.slice(1);
    const targetEl = document.getElementById(targetId);
    if (!targetEl) {
      return;
    }
    link.addEventListener("click", (event) => {
      event.preventDefault();
      smoothScrollTo(targetEl);
      if (window.history && typeof window.history.replaceState === "function") {
        window.history.replaceState(null, "", `#${targetId}`);
      }
    });
  });

  const updateNavbarState = () => {
    if (!navbar) {
      return;
    }
    const shouldCondense = (window.scrollY || window.pageYOffset || 0) > 18;
    const wasCondensed = navbar.classList.contains("is-condensed");
    if (shouldCondense !== wasCondensed) {
      navbar.classList.toggle("is-condensed", shouldCondense);
      setNavbarHeight();
    }
  };

  const updateParallax = () => {
    if (!parallaxItems.length) {
      return;
    }
    if (prefersReducedMotion.matches) {
      parallaxItems.forEach((el) => el.style.setProperty("--parallax-offset", "0px"));
      return;
    }
    const scrollY = window.scrollY || window.pageYOffset || 0;
    parallaxItems.forEach((el) => {
      const strength = parseFloat(el.dataset.parallaxStrength || "0.08");
      if (!Number.isFinite(strength) || strength === 0) {
        el.style.setProperty("--parallax-offset", "0px");
        return;
      }
      const offset = Math.max(Math.min(scrollY * strength, 160), -160);
      el.style.setProperty("--parallax-offset", `${offset}px`);
    });
  };

  const handleScroll = () => {
    if (scrollFrame !== null) {
      return;
    }
    scrollFrame = window.requestAnimationFrame(() => {
      updateNavbarState();
      updateParallax();
      scrollFrame = null;
    });
  };

  setNavbarHeight();
  updateNavbarState();
  updateParallax();

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", () => {
    setNavbarHeight();
    updateParallax();
  });
  window.addEventListener("load", setNavbarHeight);
  if (typeof prefersReducedMotion.addEventListener === "function") {
    prefersReducedMotion.addEventListener("change", updateParallax);
  } else if (typeof prefersReducedMotion.addListener === "function") {
    prefersReducedMotion.addListener(updateParallax);
  }

  const privacyTriggers = Array.from(document.querySelectorAll("[data-privacy-trigger]"));
  if (privacyTriggers.length) {
    privacyTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        openPrivacyModal(trigger);
      });
    });
  }

  const filterButtons = Array.from(document.querySelectorAll("[data-filter-control]"));
  const productCards = Array.from(document.querySelectorAll(".product-card[data-category]"));

  if (filterButtons.length && productCards.length) {
    let activeFilter = "all";

    const applyFilter = (category) => {
      activeFilter = category;
      filterButtons.forEach((button) => {
        const isActive = button.dataset.filterControl === category;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      productCards.forEach((card) => {
        const matches = category === "all" || card.dataset.category === category;
        card.classList.toggle("is-filtered", !matches);
      });
    };

    const handleFilter = (targetFilter, options = {}) => {
      const nextFilter = targetFilter || "all";
      if (nextFilter !== activeFilter) {
        applyFilter(nextFilter);
      } else if (!targetFilter && activeFilter !== "all") {
        applyFilter("all");
      }

      if (options.shouldScroll && productSection) {
        smoothScrollTo(productSection);
      }
    };

    const activateFilter = (targetCategory, options = {}) => {
      handleFilter(targetCategory, options);
    };

    filterButtons.forEach((button) => {
      button.addEventListener("click", () =>
        activateFilter(button.dataset.filterControl, { shouldScroll: true })
      );
      button.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activateFilter(button.dataset.filterControl, { shouldScroll: true });
        }
      });
    });

    const filterLinks = Array.from(document.querySelectorAll("[data-filter-link]"));
    if (filterLinks.length) {
      filterLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          const targetFilter = link.getAttribute("data-filter-link") || "all";
          activateFilter(targetFilter, { shouldScroll: true });
        });
      });
    }

    applyFilter(activeFilter);
  }
})();
