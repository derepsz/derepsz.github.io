// Define your works here - easy to edit!
const works = [
    {
        id: 'work-1',
        title: 'Project Title One',
        type: 'image',
        media: './media/example1.jpg',
        description: 'Description of the first project goes here. You can write as much or as little as you want.'
    },
    {
        id: 'work-2',
        title: 'Audio Piece',
        type: 'audio',
        media: './media/ambient.mp3',
        description: 'An audio work exploring spatial sound.'
    },
    {
        id: 'work-3',
        title: 'Video Documentation',
        type: 'video',
        media: './media/demo-clip.mp4',
        description: 'Video documentation of an installation.'
    },
    {
        id: 'work-4',
        title: 'Slideshow Example',
        type: 'slideshow',
        media: [
            './media/slide1.jpg',
            './media/slide2.jpg',
            './media/slide3.jpg'
        ],
        description: 'A series of images from the project.'
    },
    // Add more works here...
    {
        id: 'work-5',
        title: 'Work Five',
        type: 'image',
        media: './media/example5.jpg',
        description: 'Fifth project description.'
    },
    {
        id: 'work-6',
        title: 'Work Six',
        type: 'image',
        media: './media/example6.jpg',
        description: 'Sixth project description.'
    },
    {
        id: 'work-7',
        title: 'Work Seven',
        type: 'image',
        media: './media/example7.jpg',
        description: 'Seventh project description.'
    },
    {
        id: 'work-8',
        title: 'Work Eight',
        type: 'image',
        media: './media/example8.jpg',
        description: 'Eighth project description.'
    },
    {
        id: 'work-9',
        title: 'Work Nine',
        type: 'image',
        media: './media/example9.jpg',
        description: 'Ninth project description.'
    },
    {
        id: 'work-10',
        title: 'Work Ten',
        type: 'image',
        media: './media/example10.jpg',
        description: 'Tenth project description.'
    }
];

// Render media based on type
function renderMedia(work) {
    switch(work.type) {
        case 'image':
            return `<img src="${work.media}" alt="${work.title}" class="w-full max-w-2xl border-2 border-black">`;
        
        case 'audio':
            return `
                <audio controls class="w-full max-w-2xl">
                    <source src="${work.media}" type="audio/mpeg">
                </audio>
            `;
        
        case 'video':
            return `
                <video controls class="w-full max-w-2xl border-2 border-black">
                    <source src="${work.media}" type="video/mp4">
                </video>
            `;
        
        case 'slideshow':
            const slideshowId = `slideshow-${work.id}`;
            return `
                <div class="max-w-2xl">
                    <div id="${slideshowId}" class="border-2 border-black mb-2">
                        <img src="${work.media[0]}" alt="${work.title}" class="w-full slideshow-img">
                    </div>
                    <div class="flex gap-2">
                        <button onclick="prevSlide('${slideshowId}', ${JSON.stringify(work.media)})" 
                                class="px-4 py-2 border-2 border-black hover:bg-black hover:text-white">←</button>
                        <button onclick="nextSlide('${slideshowId}', ${JSON.stringify(work.media)})" 
                                class="px-4 py-2 border-2 border-black hover:bg-black hover:text-white">→</button>
                    </div>
                </div>
            `;
        
        default:
            return '';
    }
}

// Render all works
function renderWorks() {
    const container = document.getElementById('works-container');
    container.innerHTML = works.map(work => `
        <div id="${work.id}" class="border-b-2 border-black pb-16 last:border-b-0">
            <h2 class="text-2xl md:text-4xl mb-6">${work.title}</h2>
            <div class="mb-6">
                ${renderMedia(work)}
            </div>
            <p class="text-base md:text-lg max-w-2xl">${work.description}</p>
        </div>
    `).join('');
    
    // Initialize slideshow states
    works.filter(w => w.type === 'slideshow').forEach(work => {
        const slideshowId = `slideshow-${work.id}`;
        if (!window.slideshowStates) window.slideshowStates = {};
        window.slideshowStates[slideshowId] = 0;
    });
}

// Slideshow navigation
function nextSlide(slideshowId, images) {
    if (!window.slideshowStates[slideshowId]) window.slideshowStates[slideshowId] = 0;
    window.slideshowStates[slideshowId] = (window.slideshowStates[slideshowId] + 1) % images.length;
    const img = document.querySelector(`#${slideshowId} img`);
    img.src = images[window.slideshowStates[slideshowId]];
}

function prevSlide(slideshowId, images) {
    if (!window.slideshowStates[slideshowId]) window.slideshowStates[slideshowId] = 0;
    window.slideshowStates[slideshowId] = (window.slideshowStates[slideshowId] - 1 + images.length) % images.length;
    const img = document.querySelector(`#${slideshowId} img`);
    img.src = images[window.slideshowStates[slideshowId]];
}

// Handle section navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Show/hide works subnav
    const worksSubnav = document.getElementById('works-subnav');
    if (sectionId === 'works') {
        worksSubnav.classList.add('show');
    } else {
        worksSubnav.classList.remove('show');
    }
}

// Scroll to a specific work within the works section
function scrollToWork(workId) {
    const workElement = document.getElementById(workId);
    const worksSection = document.getElementById('works');
    
    if (workElement && worksSection) {
        // Make sure works section is active
        showSection('works');
        
        // Wait a bit for the section to show, then scroll
        setTimeout(() => {
            worksSection.scrollTo({
                top: workElement.offsetTop - 100, // Offset for navbars
                behavior: 'smooth'
            });
        }, 100);
    }
}

// Handle work navigation clicks
document.addEventListener('DOMContentLoaded', function() {
    const workNavLinks = document.querySelectorAll('.work-nav-link');
    workNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const workId = this.getAttribute('href').substring(1);
            scrollToWork(workId);
        });
    });
});

// Listen for hash changes
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1); // Remove the #
    if (hash) {
        showSection(hash);
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    renderWorks();
    const hash = window.location.hash.substring(1);
    showSection(hash || 'home'); // Default to home if no hash
});