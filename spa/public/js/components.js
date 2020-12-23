class Component {
  static newCard() {
    const card = document.createElement('div');
    card.classList.add(...['uk-card', 'uk-card-body', 'uk-card-default']);
    return card;
  }

}
