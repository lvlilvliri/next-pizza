const CDN_BASE = process.env.NEXT_PUBLIC_IMAGE_CDN;

const withCdn = (url: string) => {
  if (!CDN_BASE) return url;
  return `${CDN_BASE}${encodeURIComponent(url)}`;
};

export const categories = [
  { name: "Pizzas" },
  { name: "Breakfast" },
  { name: "Appetizers" },
  { name: "Cocktails" },
  { name: "Drinks" },
];

export const rawIngredients = [
  {
    name: "Cheese side",
    price: 179,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png",
  },
  {
    name: "Creamy mozzarella",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png",
  },
  {
    name: "Cheddar and Parmesan cheeses",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796",
  },
  {
    name: "Hot jalapeno pepper",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png",
  },
  {
    name: "Tender chicken",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A",
  },
  {
    name: "Champignons",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324",
  },
  {
    name: "Ham",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61",
  },
  {
    name: "Spicy pepperoni",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3",
  },
  {
    name: "Spicy chorizo",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027",
  },
  {
    name: "Marinated cucumbers",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B",
  },
  {
    name: "Fresh tomatoes",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67",
  },
  {
    name: "Red onion",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C",
  },
  {
    name: "Juicy pineapples",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0",
  },
  {
    name: "Italian herbs",
    price: 39,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png",
  },
  {
    name: "Sweet pepper",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B",
  },
  {
    name: "Cheese cubes",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349",
  },
  {
    name: "Meatballs",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png",
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const rawProducts = [
  {
    name: "Omelette with ham and mushrooms",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp",
    categoryId: 2,
  },
  {
    name: "Omelette with pepperoni",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp",
    categoryId: 2,
  },
  {
    name: "Coffee Latte",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp",
    categoryId: 2,
  },
  {
    name: "Danwich ham and cheese",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp",
    categoryId: 3,
  },
  {
    name: "Chicken nuggets",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp",
    categoryId: 3,
  },
  {
    name: "Oven potatoes with sauce 🌱",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp",
    categoryId: 3,
  },
  {
    name: "Dodster 🔥",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp",
    categoryId: 3,
  },
  {
    name: "Spicy Dodster 🌶️🌶️",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp",
    categoryId: 3,
  },
  {
    name: "Banana milkshake",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EEE20B8772A72A9B60CFB20012C185.webp",
    categoryId: 4,
  },
  {
    name: "Caramel apple milkshake",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp",
    categoryId: 4,
  },
  {
    name: "Oreo milkshake 🍪",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp",
    categoryId: 4,
  },
  {
    name: "Classic milkshake 👶",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp",
    categoryId: 4,
  },
  {
    name: "Irish Cappuccino",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp",
    categoryId: 5,
  },
  {
    name: "Coffee Caramel Cappuccino",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp",
    categoryId: 5,
  },
  {
    name: "Coffee Coconut Latte",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp",
    categoryId: 5,
  },
  {
    name: "Coffee Americano",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp",
    categoryId: 5,
  },
  {
    name: "Coffee Latte",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp",
    categoryId: 5,
  },
];

export const rawStories = [
  {
    previewImageUrl:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/stories-pizza-design-template-4ff0a23ee1d13a92b60f6680e58fa085_screen.jpg?ts=1637011817",
  },
  {
    previewImageUrl:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/stories-pizza-delivery-design-template-4bb453a5fdf93a8f363899b00b77ac39_screen.jpg?ts=1637008325",
  },
  {
    previewImageUrl:
      "https://img.freepik.com/free-psd/food-menu-delicious-pizza-instagram-facebook-story-template_120329-6316.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    previewImageUrl:
      "https://tjstakeandbakepizza.com/wp-content/uploads/2022/07/totally-pizza-by-mark-masker.jpg",
  },
  {
    previewImageUrl:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/instagram-stories-pizza-design-template-bede39db873f529569beb47410328aa2_screen.jpg?ts=1637019209",
  },
  {
    previewImageUrl:
      "https://p16-capcut-sign-useast5.capcutcdn-us.com/tos-useast5-v-2795c799-tx/oYrByAFiTYgkarWARVAqdIQAEA04XIrpABPia~tplv-4d650qgzx3-1:250:0.webp?lk3s=44acef4b&x-expires=1800155148&x-signature=y2cEJ4FdNtP3ZIRhHj2A7imJslg%3D",
  },
];

export const ingredients = rawIngredients.map((obj) => ({
  ...obj,
  imageUrl: withCdn(obj.imageUrl),
}));

export const products = rawProducts.map((obj) => ({
  ...obj,
  imageUrl: withCdn(obj.imageUrl),
}));

export const stories = rawStories.map((obj) => ({
  ...obj,
  previewImageUrl: withCdn(obj.previewImageUrl),
}));
