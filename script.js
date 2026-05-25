// ===== MANUFACTURER DATA =====
const manufacturers = [
  {
    name: "Victory Energy",
    id: "VictoryEnergy",
    logo: "images/victoryEnergy.jpg",
    desc: "Firetube and Industrial Watertube Boilers, Heat Recovery and Rentals",
    url: "https://victoryenergy.com/"
  },
  {
    name: "Power Flame Inc.",
    id: "PowerFlameInc",
    logo: "images/powerFlame.jpg",
    desc: "Burners for Firetube and Watertube Boilers, Process and Paint Booth and Combustion Control Systems. Ultra Low NOx Burners.",
    url: "https://powerflame.com/"
  },
  {
    name: "Van Packer",
    id: "VanPacker",
    logo: "images/van-packer.jpg",
    desc: "Boiler and Chimney Venting Products & Kitchen Grease Duct Ventilation",
    url: "https://vpstack.com/"
  },
  {
    name: "SCC Inc.",
    id: "SccInc",
    logo: "images/siemens.png",
    desc: "Combustion Solutions with Siemens boiler room controls.",
    url: "https://scccombustion.com/"
  },
  {
    name: "Lockwood Products",
    id: "LockwoodProducts",
    logo: "images/lockwoodProducts.png",
    desc: "Spray and Tray Type Deaerators, Boiler Feed and Condensate Return Systems",
    url: "https://lockwoodproducts.com/"
  },
  {
    name: "Pottstown Eng. Products",
    id: "Pep",
    logo: "images/pep.webp",
    desc: "Hot Water and Steam Boilers with Boiler Feed in both Vertical and Horizontal Configurations",
    url: "https://www.pepboiler.com/"
  },
  {
    name: "Madden Engineered Products",
    id: "MaddenProducts",
    logo: "images/maddenProducts.png",
    desc: "Boiler Heat Recovery Systems and Boiler Blow Down",
    url: "https://www.maddenep.com/"
  },
  {
    name: "Boilerroom Equipment",
    id: "BoilerroomEquipment",
    logo: "images/boilerroomEquipment.png",
    desc: "Heatsponge Economizers for Steam and Hot Water Boilers",
    url: "https://heatsponge.com/"
  },
  {
    name: "Unilux",
    id: "Unilux",
    logo: "images/unilux.png",
    desc: "Bent Tube Watertube Type Boilers",
    url: "https://uniluxam.com/"
  },
  {
    name: "E-Tech",
    id: "Etech",
    logo: "images/etech.png",
    desc: "Heat Recovery Systems and Kentube Replacement Economizers",
    url: "https://etechheatrecovery.com/"
  },
  {
    name: "DuraVent",
    id: "DuraVent",
    logo: "images/duravent.jpg",
    desc: "Flue Exhaust including Polypropylene type",
    url: "https://duravent.com/"
  },
  {
    name: "Pacific Seismic Products",
    id: "PacificSeismicProducts",
    logo: "images/pacificSeismicProducts.jpg",
    desc: "Earthquake Valves",
    url: "https://www.pspvalves.com/"
  },
  {
    name: "Lattner",
    id: "Lattner",
    logo: "images/lattner.jpg",
    desc: "Fuel Fired and Electric Boilers along with Boiler Room Accessories",
    url: "https://www.lattner.com/"
  }
];

// ===== RENDER MANUFACTURER CARDS =====
function buildMfrGrid() {
  const grid = document.getElementById('mfrGrid');
  if (!grid) return;

  manufacturers.forEach(mfr => {
    const card = document.createElement('div');
    card.className = 'mfr-card';
    card.Id = mfr.name + 'Card';

    const img = document.createElement('img');
    img.src = mfr.logo;
    img.alt = mfr.name + ' logo';
    img.id = mfr.id + 'Logo';
    img.className = 'mfr-logo';
    img.onerror = function () {
      // Replace broken image with styled placeholder
      const ph = document.createElement('div');
      ph.className = 'mfr-logo-placeholder';
      ph.textContent = mfr.name;
      this.replaceWith(ph);
    };

    const name = document.createElement('h3');
    name.className = 'mfr-name';
    name.textContent = mfr.name;

    const desc = document.createElement('p');
    desc.className = 'mfr-desc';
    desc.textContent = mfr.desc;

    const link = document.createElement('a');
    link.href = mfr.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'mfr-link';
    link.textContent = 'View Website';

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(desc);
    card.appendChild(link);
    grid.appendChild(card);
  });
}

// ===== STICKY NAV: add shadow on scroll =====
function initNavScroll() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 4px 20px rgba(0,0,0,0.35)'
      : '0 2px 12px rgba(0,0,0,0.25)';
  }, { passive: true });
}

// ===== HAMBURGER MENU =====
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    // Animate spans to X
    const spans = btn.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close when a link is clicked
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });
}

// ===== SCROLL-TRIGGERED FADE-IN FOR CARDS =====
function initScrollReveal() {
  const cards = document.querySelectorAll('.mfr-card');
  if (!('IntersectionObserver' in window)) {
    cards.forEach(c => c.style.opacity = '1');
    return;
  }

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  buildMfrGrid();
  initNavScroll();
  initHamburger();
  // Delay reveal init so cards are in the DOM
  requestAnimationFrame(() => initScrollReveal());
});
