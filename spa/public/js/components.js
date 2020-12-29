class Component {
  static wrapContent(innerContent, outerTag) {
    const outer = document.createElement(outerTag);
    outer.innerHTML = innerContent;
    return outer;
  }

  static newCard() {
    const card = document.createElement('div');
    card.classList.add(...['uk-card', 'uk-card-body', 'uk-card-default']);
    return card;
  }

  static newImage(source, alt) {
    const img = document.createElement('img');
    img.setAttribute('uk-img', '');
    img.setAttribute('data-src', source);
    img.setAttribute('alt', alt)
    return img;
  }

  static newSlideShow(imageArray) {
    const slideshowItems = document.createElement('ul');
    slideshowItems.classList.add('uk-slideshow-items');

    imageArray.forEach( img => {
      img.setAttribute('uk-img', 'target: !.uk-slideshow-items');
      slideshowItems.appendChild(wrapContent(img, 'li'));
    });

    const leftArrow = document.createElement('a');
    leftArrow.classList.add(...['uk-position-center-left', 'uk-position-small', 'uk-hidden-hover']);
    leftArrow.setAttribute('href', '#');
    leftArrow.setAttribute('uk-slidenav-previous', '');
    leftArrow.setAttribute('uk-slideshow-item', 'previous');

    const rightArrow = document.createElement('a');
    rightArrow.classList.add(...['uk-position-center-right', 'uk-position-small', 'uk-hidden-hover']);
    rightArrow.setAttribute('href', '#');
    rightArrow.setAttribute('uk-slidenav-next', '');
    rightArrow.setAttribute('uk-slideshow-item', 'next');

    const slideshow = document.createElement('div');
    slideshow.setAttribute('uk-slideshow', '');
    slideshow.setAttribute('tabindex', '-1');
    slideshow.append(slideshowItems, leftArrow, rightArrow);

    return slideshow;
  }
}
