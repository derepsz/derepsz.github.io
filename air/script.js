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
                <img 
                    id="${imageId}"
                    src="${item.path}" 
                    alt="" 
                    class="lightbox-trigger border-2 border-black cursor-pointer hover:opacity-80 transition-opacity"
                    style="height: 350px; width: auto; object-fit: cover;"
                    data-full-src="${item.path}"
                >
            `;

        case 'audio':
            return `
                <audio controls class="w-full max-w-2xl">
                    <source src="${item.path}" type="audio/mpeg">
                </audio>
            `;

        case 'video':
            return `
                <video controls class="w-full max-w-2xl border-1 border-black">
                    <source src="${item.path}" type="video/mp4">
                </video>
            `;

        case 'slideshow': {
            const slideshowId = `slideshow-${workId}-${Math.random().toString(36).slice(2)}`;

            // initialize state
            if (!window.slideshowStates) window.slideshowStates = {};
            window.slideshowStates[slideshowId] = { index: 0, images: item.path };

            return `
                <div class="max-w-2xl">
                    <div id="${slideshowId}" class="border-2 border-black mb-2 relative flex items-center justify-center" style="min-height: 400px;">
                        <img 
                            src="${item.path[0]}" 
                            class="w-full h-full object-contain"
                        >
                    </div>
                    <div class="flex gap-2">
                        <button
                            data-slideshow="${slideshowId}"
                            data-direction="prev"
                            class="slideshow-btn px-4 py-2 border-2 border-black hover:bg-black hover:text-white"
                        >←</button>
                        <button
                            data-slideshow="${slideshowId}"
                            data-direction="next"
                            class="slideshow-btn px-4 py-2 border-2 border-black hover:bg-black hover:text-white"
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
        <div id="${work.id}" class="border-b-2 border-black pb-16 last:border-b-0">
            <h2 class="text-2xl md:text-4xl mb-6">${work.title}</h2>

            ${work.media.map(item => `
                <div class="mb-6">
                    ${renderMediaItem(item, work.id)}
                </div>
            `).join('')}

            <p class="text-base md:text-lg max-w-2xl">
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
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
    }
}


// ===============================
// SLIDESHOW NAVIGATION
// ===============================

function navigateSlideshow(slideshowId, direction) {
    if (!window.slideshowStates || !window.slideshowStates[slideshowId]) return;

    const state = window.slideshowStates[slideshowId];
    const images = state.images;

    if (direction === 'next') {
        state.index = (state.index + 1) % images.length;
    } else {
        state.index = (state.index - 1 + images.length) % images.length;
    }

    const img = document.querySelector(`#${slideshowId} img`);
    if (img) img.src = images[state.index];
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
        if (e.target.classList.contains('lightbox-trigger')) {
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
        if (e.target.classList.contains('slideshow-btn')) {
            const slideshowId = e.target.getAttribute('data-slideshow');
            const direction = e.target.getAttribute('data-direction');
            navigateSlideshow(slideshowId, direction);
        }
    });

    document.querySelectorAll('.work-nav-link').forEach(link => {
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