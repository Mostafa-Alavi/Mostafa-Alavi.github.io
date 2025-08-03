/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

/* -----------------------------------------
  Gallery functionality 
 ---------------------------------------- */

// Add error handling for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      console.error('Failed to load image:', this.src);
    });
  });
});

function changeMainImage(clickedThumb, imageSrc) {
  try {
    // Find the main image in the same gallery
    const gallery = clickedThumb.closest('.work__gallery');
    if (!gallery) {
      console.error('Gallery not found');
      return;
    }
    
    const mainImage = gallery.querySelector('.work__gallery-main-image');
    if (!mainImage) {
      console.error('Main image not found');
      return;
    }
    
    // Update the main image source
    mainImage.src = imageSrc;
    
    // Remove active class from all thumbnails in this gallery
    const allThumbs = gallery.querySelectorAll('.work__gallery-thumb');
    allThumbs.forEach(thumb => thumb.classList.remove('active'));
    
    // Add active class to clicked thumbnail
    clickedThumb.classList.add('active');
    
    // Add a subtle animation effect
    mainImage.style.opacity = '0.7';
    setTimeout(() => {
      mainImage.style.opacity = '1';
    }, 150);
  } catch (error) {
    console.error('Error in changeMainImage:', error);
  }
}
