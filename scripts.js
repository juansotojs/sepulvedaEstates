// Smooth scroll implementation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(form);

    // Submit the form data using Fetch
    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Optionally, clear the form fields
          form.reset();

          // Display your custom success message
          const lang = getStoredLanguage() || 'en';
          const successMsg = lang === 'es'
            ? "Gracias por su consulta. Nos pondremos en contacto pronto."
            : "Thank you for your inquiry. We will be in touch soon.";
          alert(successMsg);
        } else {
          response.json().then((data) => {
            if (data.hasOwnProperty("errors")) {
              alert(data["errors"].map((error) => error["message"]).join(", "));
            } else {
              const lang = getStoredLanguage() || 'en';
              const errorMsg = lang === 'es'
                ? "¡Ups! Hubo un problema al enviar su formulario."
                : "Oops! There was a problem submitting your form.";
              alert(errorMsg);
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);
        const lang = getStoredLanguage() || 'en';
        const errorMsg = lang === 'es'
          ? "¡Ups! Hubo un problema al enviar su formulario."
          : "Oops! There was a problem submitting your form.";
        alert(errorMsg);
      });
  });
});

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close menu when clicking links
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Close menu on window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      if (targetId === "#home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
});

const reelCards = document.querySelectorAll(".reel-card");

reelCards.forEach((card) => {
  const reelUrl = card.getAttribute("data-reel");
  if (reelUrl) {
    const videoId = reelUrl.split("/reel/")[1].replace("/", "");

    fetch(`https://www.instagram.com/p/${videoId}/?__a=1&__d=dis`)
      .then((response) => response.json())
      .then((data) => {
        const videoUrl = data.graphql.shortcode_media.video_url;
        card.innerHTML = `
                  <video controls playsinline>
                      <source src="${videoUrl}" type="video/mp4">
                      Your browser does not support the video tag.
                  </video>
              `;
      })
      .catch((error) => {
        console.error("Error loading Instagram reel:", error);
        card.innerHTML = "<p>Unable to load reel</p>";
      });
  }
});

// Force metadata loading for testimonial videos on mobile
document.addEventListener("DOMContentLoaded", () => {
  const testimonialVideos = document.querySelectorAll(
    ".testimonial-video-card video"
  );

  testimonialVideos.forEach((video) => {
    // Force load metadata to show thumbnail
    video.load();

    // On mobile, ensure metadata loads by setting currentTime to 0
    if (window.innerWidth <= 768) {
      video.addEventListener("loadedmetadata", () => {
        video.currentTime = 0.1;
      });
    }
  });
});

// Language Translation System
const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About Me",
      testimonials: "Testimonials",
      areas: "Areas We Cover",
      contact: "Contact"
    },
    service: {
      statement: "Specializing in premium properties across the Bay Area."
    },
    button: {
      contact: "CONTACT US",
      homeBuyer: "HOME BUYER GUIDE",
      planAction: "PLAN OF ACTION"
    },
    testimonials: {
      title: "What Our Clients Have to Say"
    },
    social: {
      views: "1M+ Views Across All Social Platforms"
    },
    areas: {
      title: "Areas We Cover"
    },
    form: {
      header: "Fill in the form below and I will contact you soon",
      interestedIn: "Interested In",
      buying: "Buying",
      selling: "Selling",
      propertyType: "Property Type",
      apartment: "Apartment",
      house: "House",
      housePool: "House with Pool",
      commercial: "Commercial Property",
      other: "Other",
      location: "Location",
      priceRange: "Price Range",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone",
      submit: "SUBMIT"
    },
    bio: {
      text: "As a dedicated real estate professional, I bring a unique combination of confidence, passion, and an unwavering commitment to every aspect of your home buying or selling journey. I understand that real estate transactions are not just financial decisions—they are deeply personal milestones in people's lives. That's why I approach every client with care, listening closely to your needs and working relentlessly to ensure your goals are not just met, but exceeded. My work ethic is unmatched, and I'm driven by a genuine desire to see my clients succeed. Whether you're buying your first home, selling an investment property, or navigating a complex market, I'm here to offer guidance, insight, and support every step of the way. I take great pride in the trust my clients place in me, and I make it my mission to make your experience as seamless and stress-free as possible. In this ever-changing real estate landscape, I stay informed and proactive, leveraging the latest market knowledge and technology to ensure you have the best possible outcomes. I'm not just here to close deals—I'm here to build lasting relationships and to be a trusted resource for you, now and in the future. Let me put my expertise, determination, and passion to work for you. Whether you're buying or selling, I'm committed to achieving the results you want and deserve!"
    }
  },
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre Mí",
      testimonials: "Testimonios",
      areas: "Áreas que Cubrimos",
      contact: "Contacto"
    },
    service: {
      statement: "Especializándome en propiedades premium en toda el Área de la Bahía."
    },
    button: {
      contact: "CONTÁCTANOS",
      homeBuyer: "GUÍA PARA COMPRADORES",
      planAction: "PLAN DE ACCIÓN"
    },
    testimonials: {
      title: "Lo Que Dicen Nuestros Clientes"
    },
    social: {
      views: "Más de 1M de Visualizaciones en Todas las Plataformas Sociales"
    },
    areas: {
      title: "Áreas que Cubrimos"
    },
    form: {
      header: "Complete el formulario a continuación y me pondré en contacto con usted pronto",
      interestedIn: "Interesado En",
      buying: "Comprar",
      selling: "Vender",
      propertyType: "Tipo de Propiedad",
      apartment: "Apartamento",
      house: "Casa",
      housePool: "Casa con Piscina",
      commercial: "Propiedad Comercial",
      other: "Otro",
      location: "Ubicación",
      priceRange: "Rango de Precio",
      fullName: "Nombre Completo",
      email: "Correo Electrónico",
      phone: "Teléfono",
      submit: "ENVIAR"
    },
    bio: {
      text: "Como profesional inmobiliario dedicado, aporto una combinación única de confianza, pasión y un compromiso inquebrantable con cada aspecto de su viaje de compra o venta de vivienda. Entiendo que las transacciones inmobiliarias no son solo decisiones financieras: son hitos profundamente personales en la vida de las personas. Por eso me acerco a cada cliente con cuidado, escuchando de cerca sus necesidades y trabajando incansablemente para asegurarme de que sus objetivos no solo se cumplan, sino que se superen. Mi ética de trabajo es inigualable, y me impulsa un deseo genuino de ver a mis clientes tener éxito. Ya sea que esté comprando su primera casa, vendiendo una propiedad de inversión o navegando en un mercado complejo, estoy aquí para ofrecer orientación, información y apoyo en cada paso del camino. Me enorgullece mucho la confianza que mis clientes depositan en mí, y me propongo hacer que su experiencia sea lo más fluida y sin estrés posible. En este panorama inmobiliario en constante cambio, me mantengo informado y proactivo, aprovechando los últimos conocimientos del mercado y la tecnología para asegurarme de que tenga los mejores resultados posibles. No estoy aquí solo para cerrar tratos: estoy aquí para construir relaciones duraderas y ser un recurso confiable para usted, ahora y en el futuro. Permítame poner mi experiencia, determinación y pasión a trabajar para usted. Ya sea que esté comprando o vendiendo, estoy comprometido a lograr los resultados que desea y merece!"
    }
  }
};

// Language selection and translation functions
function getStoredLanguage() {
  return localStorage.getItem('preferredLanguage') || null;
}

function setStoredLanguage(lang) {
  localStorage.setItem('preferredLanguage', lang);
}

function translatePage(lang) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (key) {
      const keys = key.split('.');
      let translation = translations[lang];

      if (translation) {
        for (let k of keys) {
          if (translation && translation[k]) {
            translation = translation[k];
          } else {
            translation = null;
            break;
          }
        }
      }

      if (translation) {
        if (element.tagName === 'INPUT' && element.type === 'submit') {
          element.value = translation;
        } else if (element.tagName === 'OPTION') {
          element.textContent = translation;
        } else if (element.tagName === 'SPAN') {
          element.textContent = translation;
        } else {
          element.textContent = translation;
        }
      }
    }
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Update Home Buyer Guide PDF link based on language
  const homeBuyerGuideLink = document.getElementById('home-buyer-guide-link');
  if (homeBuyerGuideLink) {
    if (lang === 'es') {
      homeBuyerGuideLink.href = 'assets/FTHB Guide - Spanish.pdf';
    } else {
      homeBuyerGuideLink.href = 'assets/First time home buyer guide.pdf';
    }
  }

  // Update language toggle active state
  updateLanguageToggle(lang);
}

function updateLanguageToggle(lang) {
  const langOptions = document.querySelectorAll('.lang-option');
  langOptions.forEach(option => {
    option.classList.remove('active');
    if (option.getAttribute('data-lang') === lang) {
      option.classList.add('active');
    }
  });
}

function showLanguageModal() {
  const modal = document.getElementById('language-modal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function hideLanguageModal() {
  const modal = document.getElementById('language-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
  const storedLang = getStoredLanguage();

  if (!storedLang) {
    // First visit - show language modal
    showLanguageModal();
  } else {
    // Not first visit - apply stored language
    translatePage(storedLang);
  }

  // Handle language button clicks in modal
  const languageButtons = document.querySelectorAll('.language-btn');
  languageButtons.forEach(button => {
    button.addEventListener('click', () => {
      const lang = button.getAttribute('data-lang');
      setStoredLanguage(lang);
      translatePage(lang);
      hideLanguageModal();
    });
  });

  // Handle language toggle clicks in header (both desktop and mobile)
  const langOptions = document.querySelectorAll('.lang-option');
  if (langOptions.length > 0) {
    langOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const lang = option.getAttribute('data-lang');
        if (lang) {
          setStoredLanguage(lang);
          translatePage(lang);
          // Close mobile menu after language selection
          if (window.innerWidth <= 768) {
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            if (navLinks) navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
          }
        }
      });
    });
  }

  // Set initial active state
  const currentLang = storedLang || 'en';
  updateLanguageToggle(currentLang);
});
