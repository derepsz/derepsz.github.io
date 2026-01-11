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
                path: [
                    './works/04/04a.png',
                    './works/04/04b.png',
                    './works/04/04c.png',
                    './works/04/04d.png'
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

            return `
                <div class="slideshow">
                    <div class="slideshow__wrapper">
                        <div id="${slideshowId}" class="slideshow__container">
                            ${item.path.map(imgPath => `
                                <img
                                    src="${imgPath}"
                                    class="slideshow__image slideshow__image--lightbox"
                                    data-full-src="${imgPath}"
                                >
                            `).join('')}
                        </div>
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
});

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash) showSection(hash);
});