// ===============================
// GLITCH CONFIG
// ===============================

const GLITCH_CONFIG = {
    enabled: true,              // Master kill switch

    chromatic: {
        enabled: true,
        intensity: 2.0,         // CRANKED UP for testing
    },

    screenTear: {
        enabled: true,
        minInterval: 5000,      // Every 2-5 seconds for testing
        maxInterval: 20000,
        intensity: 0.5,         // CRANKED UP
    },

    textCorruption: {
        enabled: true,
        minInterval: 100,      // Every 2-5 seconds for testing
        maxInterval: 5000,
        intensity: 7.0,         // Corrupt more chars
    },

    jitter: {
        enabled: true,
        minInterval: 2000,      // Every 1-3 seconds for testing
        maxInterval: 6000,
        intensity: 3.0,        // Multiplier for jitter displacement
    }
};


// ===============================
// CATALOG
// ===============================

const works = [
    {
        id: 'work-1',
        title: 'Project Title One',
        media: [
            {
                type: 'image',
                path: './works/01.png'
            }
        ],
        description: 'Description of the first project goes here.'
    },
    {
        id: 'work-2',
        title: 'Audio Piece (with image)',
        media: [
            {
                type: 'image',
                path: './works/02.png'
            },
            {
                type: 'audio',
                path: './works/dowedo_DER1_v0_251211.mp3'
            }
        ],
        description: 'An audio work exploring spatial sound.'
    },
    {
        id: 'work-3',
        title: 'Video Documentation',
        media: [
            {
                type: 'video',
                path: './works/a06_talking2_Trim.mp4'
            }
        ],
        description: 'Video documentation of an installation.'
    },
    {
        id: 'work-4',
        title: 'Slideshow',
        media: [
            {
                type: 'slideshow',
                // New format: items array supports mixed image/video
                // items: [
                //     { type: 'image', path: './works/04/04a.png' },
                //     { type: 'video', path: './works/04/04b.mp4', poster: './works/04/04b-thumb.jpg' },
                //     { type: 'image', path: './works/04/04c.png' }
                // ]
                // Old format still works:
                path: [
                    './works/04/04a.png',
                    './works/04/04b.png',
                    './works/04/04c.png',
                    './works/04/04d.png'
                ]
            }
        ],
        description: 'A series of images.'
    },
        {
        id: 'work-5',
        title: 'Mixed Slideshow',
        media: [
            {
                type: 'slideshow',
                // New format: items array supports mixed image/video
                items: [
                    { type: 'image', path: './works/04/04a.png' },
                    { type: 'video', path: './works/a06_talking2_Trim.mp4', poster: './works/04/04b.png' },
                    { type: 'image', path: './works/04/04c.png' }
                ]
            }
        ],
        description: 'A series of images.'
    }
    // Add more works here...
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
            return `
                <audio controls class="media media--audio">
                    <source src="${item.path}" type="audio/mpeg">
                </audio>
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

            const renderThumb = (media) => {
                const thumbSrc = media.type === 'video' ? media.poster : media.path;
                if (!thumbSrc) return '';
                return `
                    <img
                        src="${thumbSrc}"
                        class="slideshow__thumb${media.type === 'video' ? ' slideshow__thumb--video' : ''}"
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
                        ${mediaItems.map(renderThumb).join('')}
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
                ${work.description}
            </p>
        </div>
    `).join('');
}


// ===============================
// LIGHTBOX
// ===============================

function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (lightbox && lightboxImg) {
        lightboxImg.src = imageSrc;
        lightbox.classList.add('lightbox--open');
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('lightbox--open');
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

    // Populate subnav tooltips with work titles
    document.querySelectorAll('.works-subnav__link').forEach((link, index) => {
        if (works[index]) {
            link.setAttribute('data-title', works[index].title);
        }
    });

    // Lightbox event delegation
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('media__img--lightbox') ||
            e.target.classList.contains('slideshow__image--lightbox')) {
            const fullSrc = e.target.getAttribute('data-full-src');
            openLightbox(fullSrc);
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

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
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

    // Revert after visible moment (longer for testing)
    setTimeout(() => {
        element.textContent = original;
    }, 300 + Math.random() * 400);
}

function triggerTextCorruption() {
    if (!GLITCH_CONFIG.enabled || !GLITCH_CONFIG.textCorruption.enabled) return;

    // Select random text element
    const candidates = document.querySelectorAll('.section__title, .work__title, .nav__link, .work__description');
    if (candidates.length === 0) return;

    const target = candidates[Math.floor(Math.random() * candidates.length)];
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