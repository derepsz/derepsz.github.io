// ===============================
// GLITCH CONFIG
// ===============================

const GLITCH_CONFIG = {
    enabled: true,

    chromatic: {
        enabled: true,
        intensity: 2.0,
    },

    screenTear: {
        enabled: true,
        minInterval: 7000,
        maxInterval: 20000,
        intensity: 0.5,
    },

    textCorruption: {
        enabled: true,
        minInterval: 100,
        maxInterval: 6000,
        intensity: 7.0,
    },

    jitter: {
        enabled: true,
        minInterval: 3000,
        maxInterval: 10000,
        intensity: 3.0,
    }
};


// ===============================
// DIY GALLERY
// ===============================

const diyImages = [
    'IMG_0112.JPG',
    'IMG_0218.JPG',
    'IMG_1304.JPG',
    'IMG_1310.JPG',
    'IMG_1433.JPG',
    'R0014587.JPG',
    'R0014593.JPG',
    'R0014594.JPG',
    'R0014605.JPG',
    'R0014606.JPG',
    'R0014609.JPG',
    'R0014623.JPG',
];

const diyBasePath = 'works/archives/happydog/';

function renderDiyGrid() {
    const container = document.querySelector('.diy-grid');
    if (!container) return;

    container.innerHTML = diyImages.map(filename => {
        const src = diyBasePath + filename;
        return `<img src="${src}" class="diy-grid__img media__img--lightbox" data-full-src="${src}" alt="">`;
    }).join('');
}


// ===============================
// CATALOG
// ===============================

const works = [
    {
        id: 'xor',
        title: 'XOR (eXtended Organic Reality) - 2023',
        media: [
            {
                type: 'slideshow',
                path: [
                    './works/vr/xor-editor.png',
                    './works/vr/xor-site.png',
                    './works/vr/xor-qr.png',
                ]
            }
        ],
        description: 'Proof of concept for a mobile-friendly gallery experience. \
        <br> Follow link below to launch an interactive session in browser. If on desktop, \
        use the mouse to move the joysticks. Or scan the QR to visit on mobile. \
        <br><br><a href="https://repsz.de/xor" target="_blank" rel="noopener">Visit XOR</a>'
    },
    {
        id: 'dntbd',
        title: 'Hylic Resources - 2024',
        media: [
            {
                type: 'audio',
                path: './works/DNTBD.mp3',
                poster: './works/DNTBD.png'
            }
        ],
        description: 'Visual score, audio edit of live electronics performance. Collaboration with Todd Hochradel.'
    },
    {
        id: `shaderman`,
        title: 'NOE - 2026',
        media: [
            {
                type: 'slideshow',
                items: [
                    { type: 'video', path: './works/job/enter-the-void.mp4', poster: './works/job/void-thumb.png' },
                    { type: 'video', path: './works/job/projector.mp4', poster: './works/job/proj-thumb.png' },
                ]
            }
        ],
        description: 'Bespoke application for runtime shader compilation and texture streaming \
        over NDI network protocol.'
    },
    {
        id: 'afterlife',
        title: 'Afterlife - 2025',
        media: [
            {
                type: 'image',
                path: './works/vr/afterlife.gif'
            }
        ],
        description: 'Virtual prototpe for realtime audio-reactive installation. \
        Procedural graphics and networked lighting control.'
    },
    {
        id: 'archives',
        title: 'Relics ~ 2010',
        media: [
            {
                type: 'slideshow',
                items: [
                    { type: 'image', path: './works/archives/readers-digest.jpg' },
                    { type: 'video', path: './works/archives/shadows.m4v', poster: './works/archives/shadows-thumb.png' },
                    { type: 'image', path: './works/archives/tape.JPG' },
                    { type: 'image', path: './works/archives/being-there2.JPG' },
                ]
            }
        ],
        description: 'Selections from the Chicago archives. Explorations in personal distance \
        and technological mediation.'
    }
];


// ===============================
// RENDER MEDIA ITEMS
// ===============================

function renderMediaItem(item, workId) {
    switch (item.type) {

        case 'image':
            const imageId = `img-${workId}-${Math.random().toString(36).slice(2)}`;
            return `
                <div class="media media--image">
                    <img
                        id="${imageId}"
                        src="${item.path}"
                        alt=""
                        class="media__img media__img--lightbox"
                        data-full-src="${item.path}"
                    >
                </div>
            `;

        case 'audio':
            const audioPoster = item.poster || item.image;
            return `
                <div class="media media--audio">
                    ${audioPoster ? `
                        <img
                            src="${audioPoster}"
                            alt=""
                            class="media__audio-poster"
                        >
                    ` : ''}
                    <audio controls class="audio-controls">
                        <source src="${item.path}" type="audio/mpeg">
                    </audio>
                </div>
            `;

        case 'video':
            return `
                <video controls class="media media--video">
                    <source src="${item.path}" type="video/mp4">
                </video>
            `;

        case 'slideshow': {
            const slideshowId = `slideshow-${workId}-${Math.random().toString(36).slice(2)}`;

            // Support both old format (path array) and new format (items array)
            const mediaItems = item.items || item.path.map(p => ({ type: 'image', path: p }));

            const renderSlide = (media) => {
                if (media.type === 'video') {
                    return `
                        <video
                            controls
                            class="slideshow__video"
                            ${media.poster ? `poster="${media.poster}"` : ''}
                        >
                            <source src="${media.path}" type="video/mp4">
                        </video>
                    `;
                }
                return `
                    <img
                        src="${media.path}"
                        class="slideshow__image slideshow__image--lightbox"
                        data-full-src="${media.path}"
                    >
                `;
            };

            const renderThumb = (media, index) => {
                const thumbSrc = media.type === 'video' ? media.poster : media.path;
                if (!thumbSrc) return '';
                return `
                    <img
                        src="${thumbSrc}"
                        class="slideshow__thumb${media.type === 'video' ? ' slideshow__thumb--video' : ''}"
                        data-slideshow="${slideshowId}"
                        data-slide-index="${index}"
                        alt=""
                        aria-hidden="true"
                    >
                `;
            };

            return `
                <div class="slideshow">
                    <div class="slideshow__wrapper">
                        <div id="${slideshowId}" class="slideshow__container">
                            ${mediaItems.map(renderSlide).join('')}
                        </div>

                        <div class="slideshow__controls">
                            <button
                                data-slideshow="${slideshowId}"
                                data-direction="prev"
                                class="slideshow__btn slideshow__btn--prev"
                            >←</button>
                            <button
                                data-slideshow="${slideshowId}"
                                data-direction="next"
                                class="slideshow__btn slideshow__btn--next"
                            >→</button>
                        </div>
                    </div>

                    <div class="slideshow__filmstrip">
                        ${mediaItems.map((media, index) => renderThumb(media, index)).join('')}
                    </div>
                </div>
            `;
        }

        default:
            return '';
    }
}


// ===============================
// RENDER ALL WORKS
// ===============================

function wrapLinks(html) {
    return html.replace(/<a\s/g, '<span class="no-corrupt"><a ').replace(/<\/a>/g, '</a></span>');
}

function renderWorks() {
    const container = document.getElementById('works-container');

    container.innerHTML = works.map(work => `
        <div id="${work.id}" class="work">
            <h2 class="work__title">${work.title}</h2>

            ${work.media.map(item => `
                <div class="work__media">
                    ${renderMediaItem(item, work.id)}
                </div>
            `).join('')}

            <p class="work__description">
                ${wrapLinks(work.description)}
            </p>
        </div>
    `).join('');
}


// ===============================
// LIGHTBOX
// ===============================

let currentLightboxGallery = [];
let currentLightboxIndex = 0;

function openLightbox(imageSrc, gallery = null, index = 0) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (lightbox && lightboxImg) {
        lightboxImg.src = imageSrc;
        lightbox.classList.add('lightbox--open');

        // Store gallery context for navigation
        if (gallery && gallery.length > 1) {
            currentLightboxGallery = gallery;
            currentLightboxIndex = index;
        } else {
            currentLightboxGallery = [];
            currentLightboxIndex = 0;
        }

        updateLightboxNav();
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('lightbox--open');
        currentLightboxGallery = [];
        currentLightboxIndex = 0;
    }
}

function navigateLightbox(direction) {
    if (currentLightboxGallery.length === 0) return;

    if (direction === 'prev' && currentLightboxIndex > 0) {
        currentLightboxIndex--;
    } else if (direction === 'next' && currentLightboxIndex < currentLightboxGallery.length - 1) {
        currentLightboxIndex++;
    }

    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) {
        lightboxImg.src = currentLightboxGallery[currentLightboxIndex];
    }

    updateLightboxNav();
}

function updateLightboxNav() {
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (prevBtn && nextBtn) {
        // Hide nav if no gallery or single image
        const showNav = currentLightboxGallery.length > 1;
        prevBtn.style.display = showNav ? '' : 'none';
        nextBtn.style.display = showNav ? '' : 'none';

        if (showNav) {
            prevBtn.disabled = currentLightboxIndex === 0;
            nextBtn.disabled = currentLightboxIndex === currentLightboxGallery.length - 1;
        }
    }
}


// ===============================
// SLIDESHOW NAVIGATION
// ===============================

function navigateSlideshow(slideshowId, direction) {
    const container = document.getElementById(slideshowId);
    if (!container) return;

    const scrollAmount = container.clientWidth;

    if (direction === 'next') {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}


// ===============================
// SECTION NAVIGATION
// ===============================

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    const worksSubnav = document.getElementById('works-subnav');
    if (worksSubnav) {
        worksSubnav.classList.toggle('show', sectionId === 'works');
    }
}


// ===============================
// SCROLL TO WORK
// ===============================

function scrollToWork(workId) {
    const workElement = document.getElementById(workId);
    const worksSection = document.getElementById('works');

    if (workElement && worksSection) {
        showSection('works');

        setTimeout(() => {
            worksSection.scrollTo({
                top: workElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }, 100);
    }
}


// ===============================
// EVENT LISTENERS
// ===============================

document.addEventListener('DOMContentLoaded', () => {
    renderWorks();
    renderDiyGrid();

    // Populate subnav with work titles (only for first N links that match works count)
    document.querySelectorAll('.works-subnav__link').forEach((link, index) => {
        if (works[index]) {
            link.setAttribute('data-title', works[index].title);
            link.style.display = ''; // Show link
        } else {
            link.style.display = 'none'; // Hide unused links
        }
    });

    // Lightbox event delegation
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('media__img--lightbox') ||
            e.target.classList.contains('slideshow__image--lightbox')) {
            const fullSrc = e.target.getAttribute('data-full-src');

            // Check if this image is part of the DIY grid
            if (e.target.classList.contains('diy-grid__img')) {
                const gallery = diyImages.map(f => diyBasePath + f);
                const index = gallery.indexOf(fullSrc);
                openLightbox(fullSrc, gallery, index >= 0 ? index : 0);
            } else {
                openLightbox(fullSrc);
            }
        }
    });

    // Close lightbox on background click or close button
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target.id === 'lightbox' || e.target.id === 'lightbox-close') {
                closeLightbox();
            }
        });
    }

    // Lightbox navigation buttons
    document.getElementById('lightbox-prev')?.addEventListener('click', () => navigateLightbox('prev'));
    document.getElementById('lightbox-next')?.addEventListener('click', () => navigateLightbox('next'));

    // Close lightbox with Escape, navigate with arrow keys
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox('prev');
        } else if (e.key === 'ArrowRight') {
            navigateLightbox('next');
        }
    });

    // Slideshow button event delegation
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('slideshow__btn')) {
            const slideshowId = e.target.getAttribute('data-slideshow');
            const direction = e.target.getAttribute('data-direction');
            navigateSlideshow(slideshowId, direction);
        }
    });

    // Filmstrip thumbnail click navigation
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('slideshow__thumb')) {
            const slideshowId = e.target.getAttribute('data-slideshow');
            const slideIndex = parseInt(e.target.getAttribute('data-slide-index'), 10);
            const container = document.getElementById(slideshowId);
            if (container) {
                const scrollAmount = container.clientWidth * slideIndex;
                container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    });

    document.querySelectorAll('.works-subnav__link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const workId = link.getAttribute('href').substring(1);
            scrollToWork(workId);
        });
    });

    const hash = window.location.hash.substring(1);
    showSection(hash || 'home');

    // Initialize glitch effects
    initGlitchEffects();
});

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash) showSection(hash);
});


// ===============================
// GLITCH EFFECTS
// ===============================

// Throttle helper
function throttle(fn, wait) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

// Random range helper
function randomInRange(min, max) {
    return min + Math.random() * (max - min);
}

// Chromatic aberration - RGB split follows mouse
function initChromaticAberration() {
    if (!GLITCH_CONFIG.enabled || !GLITCH_CONFIG.chromatic.enabled) return;

    // Apply chromatic class to target elements
    const targets = document.querySelectorAll('.section__title, .work__title, .nav__link, .works-subnav__link');
    targets.forEach(el => el.classList.add('glitch-chromatic'));

    // Set intensity
    document.documentElement.style.setProperty('--glitch-intensity', GLITCH_CONFIG.chromatic.intensity);

    // Track mouse movement - radial from center
    document.addEventListener('mousemove', throttle((e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;  // -1 to 1
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        // Radial distance from center (0 at center, 1 at corners)
        const radial = Math.sqrt(x * x + y * y);
        document.documentElement.style.setProperty('--glitch-x', x);
        document.documentElement.style.setProperty('--glitch-y', y);
        document.documentElement.style.setProperty('--glitch-radial', radial);
    }, 16)); // ~60fps
}

// Screen tear - brief horizontal displacement
function triggerScreenTear() {
    if (!GLITCH_CONFIG.enabled || !GLITCH_CONFIG.screenTear.enabled) return;

    const main = document.querySelector('.main');
    if (!main) return;

    document.documentElement.style.setProperty('--glitch-intensity', GLITCH_CONFIG.screenTear.intensity);
    main.classList.add('glitch-tear');

    setTimeout(() => {
        main.classList.remove('glitch-tear');
        // Restore chromatic intensity
        document.documentElement.style.setProperty('--glitch-intensity', GLITCH_CONFIG.chromatic.intensity);
    }, 100);
}

function scheduleScreenTear() {
    if (!GLITCH_CONFIG.enabled || !GLITCH_CONFIG.screenTear.enabled) return;

    const delay = randomInRange(GLITCH_CONFIG.screenTear.minInterval, GLITCH_CONFIG.screenTear.maxInterval);
    setTimeout(() => {
        triggerScreenTear();
        scheduleScreenTear();
    }, delay);
}

// Text corruption - brief unicode glitches
const corruptionMap = {
    'a': ['ä', 'à', 'á', 'â', 'ã', 'ā', 'ǎ'],
    'b': ['ƀ', 'ḃ', 'ɓ'],
    'c': ['ç', 'ć', 'č', 'ĉ'],
    'd': ['ď', 'đ', 'ḋ'],
    'e': ['ë', 'è', 'é', 'ê', 'ę', 'ē', 'ě'],
    'f': ['ƒ'],
    'g': ['ğ', 'ġ', 'ģ'],
    'h': ['ħ', 'ḣ'],
    'i': ['ï', 'ì', 'í', 'î', 'ı', 'ī', 'ĩ'],
    'j': ['ĵ'],
    'k': ['ķ', 'ḱ'],
    'l': ['ł', 'ľ', 'ļ'],
    'm': ['ṁ', 'ɱ'],
    'n': ['ñ', 'ń', 'ň', 'ņ'],
    'o': ['ö', 'ò', 'ó', 'ô', 'ø', 'ō', 'õ'],
    'p': ['ṗ', 'þ'],
    'r': ['ř', 'ŕ', 'ṙ'],
    's': ['ş', 'ś', 'š', 'ṡ'],
    't': ['ţ', 'ť', 'ṫ'],
    'u': ['ü', 'ù', 'ú', 'û', 'ū', 'ů'],
    'v': ['ṿ'],
    'w': ['ŵ', 'ẁ', 'ẃ'],
    'x': ['ẋ'],
    'y': ['ÿ', 'ý', 'ŷ'],
    'z': ['ž', 'ź', 'ż'],
};

function corruptText(element) {
    if (!element || !element.textContent) return;

    const original = element.textContent;
    const chars = original.split('');

    // Corrupt more characters based on intensity
    const numCorrupt = Math.ceil(GLITCH_CONFIG.textCorruption.intensity * (1 + Math.random() * 2));

    for (let i = 0; i < numCorrupt; i++) {
        const idx = Math.floor(Math.random() * chars.length);
        const char = chars[idx].toLowerCase();
        if (corruptionMap[char]) {
            const replacements = corruptionMap[char];
            chars[idx] = replacements[Math.floor(Math.random() * replacements.length)];
        }
    }

    element.textContent = chars.join('');

    setTimeout(() => {
        element.textContent = original;
    }, 200 + Math.random() * 200);
}

function triggerTextCorruption() {
    if (!GLITCH_CONFIG.enabled || !GLITCH_CONFIG.textCorruption.enabled) return;

    // Select random text element
    const candidates = document.querySelectorAll('.section__title, .work__title, .nav__link, .work__description');

    // Filter out elements that contain .no-corrupt children
    const filtered = Array.from(candidates).filter(el => !el.querySelector('.no-corrupt'));
    if (filtered.length === 0) return;

    const target = filtered[Math.floor(Math.random() * filtered.length)];
    corruptText(target);
}

function scheduleTextCorruption() {
    if (!GLITCH_CONFIG.enabled || !GLITCH_CONFIG.textCorruption.enabled) return;

    const delay = randomInRange(GLITCH_CONFIG.textCorruption.minInterval, GLITCH_CONFIG.textCorruption.maxInterval);
    setTimeout(() => {
        triggerTextCorruption();
        scheduleTextCorruption();
    }, delay);
}

// Micro-jitter - brief positional glitch on random element
function triggerJitter() {
    if (!GLITCH_CONFIG.enabled || !GLITCH_CONFIG.jitter.enabled) return;

    const candidates = document.querySelectorAll('.section__title, .work__title, .nav__link, .media--image');
    if (candidates.length === 0) return;

    const target = candidates[Math.floor(Math.random() * candidates.length)];
    target.style.setProperty('--jitter-intensity', GLITCH_CONFIG.jitter.intensity);
    target.classList.add('glitch-jitter');

    setTimeout(() => {
        target.classList.remove('glitch-jitter');
    }, 80);
}

function scheduleJitter() {
    if (!GLITCH_CONFIG.enabled || !GLITCH_CONFIG.jitter.enabled) return;

    const delay = randomInRange(GLITCH_CONFIG.jitter.minInterval, GLITCH_CONFIG.jitter.maxInterval);
    setTimeout(() => {
        triggerJitter();
        scheduleJitter();
    }, delay);
}

// Initialize all glitch effects
function initGlitchEffects() {
    if (!GLITCH_CONFIG.enabled) return;

    initChromaticAberration();
    scheduleScreenTear();
    scheduleTextCorruption();
    scheduleJitter();
}
