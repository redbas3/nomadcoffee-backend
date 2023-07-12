export const processCategories = (categories) => {
  categories = categories.split(",");
  return categories.map((category) => ({
    where: {
      name: category,
    },
    create: {
      name: category,
      slug: category.trim().replace(" ", "_"),
    },
  }));
};

export const processPhotos = (categories) => {
  categories = categories.split(",");
  return categories.map((category) => ({
    where: {
      url: photo,
    },
    create: {
      url: photo,
    },
  }));
};
