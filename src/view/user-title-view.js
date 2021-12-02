export const createUserTitleTemplate = (values) => (
  `
  <section class="header__profile profile">
      <p class="profile__rating">${values.raiting}</p>
      <img class="profile__avatar" src="${values.bitmap}" alt="Avatar" width="35" height="35">
    </section>
`);
