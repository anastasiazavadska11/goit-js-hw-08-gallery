import {galleryItems} from './img_array.js';

const gallery = document.querySelector(".gallery");
const lightbox = document.querySelector(".js-lightbox")
const lightboxButton = document.querySelector(".lightbox__button");
const lightboxOverlay = document.querySelector(".lightbox__overlay");
const lightboxImg = document.querySelector(".lightbox__image")

console.log(gallery);

const items = galleryItems
  .map(
    galleryItem =>
      `<li class="gallery__item">
        <a class="gallery__link" href="${galleryItem.original}">
          <img class="gallery__image" src="${galleryItem.preview}" data-source="${galleryItem.original}" alt="${galleryItem.description}" />
        </a>
      </li>`
  )
  .join('');
gallery.innerHTML = items;

gallery.addEventListener('click',fullImg);


let idxGalImg = undefined;

function fullImg(event) {
  event.preventDefault();
  console.log(event)
  if (!event.target.classList.contains('gallery__image')) {
    return
  }
  
  lightbox.classList.add("is-open");
  console.log(lightbox);
  
  lightboxImg.setAttribute('src', event.target.getAttribute('data-source'))
  lightboxImg.setAttribute('alt', event.target.getAttribute('alt'))

  idxGalImg = galleryItems.findIndex(elem => elem.original === event.target.getAttribute('data-source'));

  window.addEventListener('keydown', keySwitcher)
}

const closeFullImg = () => {
  lightbox.classList.remove("is-open")
  lightboxImg.removeAttribute('src');
  lightboxImg.removeAttribute('alt');
  window.removeEventListener('keydown', keySwitcher)
  idxGalImg = undefined;
}

function keySwitcher(event) {
  if(event.code === 'ArrowRight') {
    if(idxGalImg === galleryItems.length -1) return;
    idxGalImg++;
  } else if(event.code === 'ArrowLeft') {
    if(idxGalImg === 0 ) return;
    idxGalImg--;
  } else if(event.code === 'Escape') {
    closeFullImg();
    return;
  } else {
    return;
  }

  lightboxImg.setAttribute('src', galleryItems[idxGalImg].original)
  lightboxImg.setAttribute('alt', galleryItems[idxGalImg].description)
}
  
lightboxButton.addEventListener('click', () => closeFullImg());
lightboxOverlay.addEventListener('click', () => closeFullImg());