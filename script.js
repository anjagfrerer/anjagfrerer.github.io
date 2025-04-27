const mediaItems = document.querySelectorAll('.gallery img, .gallery video');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const closeBtn = document.getElementById('close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;

function showLightbox(index) {
    currentIndex = index;
    const item = mediaItems[index];
    const type = item.dataset.type;
    const src = item.src || item.getAttribute('src');

    lightbox.style.display = 'flex';

    if (type === 'image') {
        lightboxImg.src = src;
        lightboxImg.style.display = 'block';
        lightboxVideo.style.display = 'none';
        lightboxVideo.pause();
    } else if (type === 'video') {
        lightboxVideo.src = src;
        lightboxVideo.style.display = 'block';
        lightboxImg.style.display = 'none';
    }
}

mediaItems.forEach((item, index) => {
    item.addEventListener('click', () => showLightbox(index));
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    lightboxVideo.pause();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % mediaItems.length;
    showLightbox(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    showLightbox(currentIndex);
});

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'Escape') closeBtn.click();
    }
});
