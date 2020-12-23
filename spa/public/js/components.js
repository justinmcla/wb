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
    img.setAttribute('data-src', source);
    img.setAttribute('alt', alt)
    return img;
  }

}
