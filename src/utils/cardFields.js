const cardFields = (card) => {
  return {
    title: card.title,
    subTitle: card.subTitle,
    description: card.description,
    web: card.web,
    state: card.state,
    country: card.country,
    city: card.city,
    street: card.street,
    houseNumber: card.houseNumber,
    phone: card.phone,
    email: card.email,
    alt: card.alt || card.image.alt,
    url: card.url || card.image.url,
  };
};

export default cardFields;
