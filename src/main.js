import './styles'


document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("cardsWrapper");
  const loadMoreButton = document.getElementById("loadCards");
  let cards = [];
  let visibleCards = 10;
  
  async function fetchCards() {
    const response = await fetch("https://39916d64f80ad0ea.mokky.dev/cards");
    cards = await response.json();
    renderCards();
  }
  
  function renderCards() {
    container.innerHTML = "";
    cards.slice(0, visibleCards).forEach((card) => {
      const cardElement = document.createElement("article");
      cardElement.className = "card";
      cardElement.innerHTML = `
        <img class="card__image" src="../src/assets/images/bitmap.jpg" alt=""/>
        <div class="card__body">
          <span class="card__slug">${card.slug}</span>
          <h2 class="card__title">${card.title}</h2>
          <p class="card__text">${card.text}</p>
          <address class="card__author">Posted by <b>Eugenia</b>, on <time>July  08, 2025</time></address>
          <button class="card__button">Continue reading</button>
        </div>
        
      `;
      container.appendChild(cardElement);
    });
    loadMoreButton.style.display = visibleCards < cards.length ? "block" : "none";
  }
  
  loadMoreButton.addEventListener("click", () => {
    visibleCards = Math.min(visibleCards + 5, cards.length);
    renderCards();
  });
  
  await fetchCards();
});
