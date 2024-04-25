export const productMap = (product) => {
  const baseImageUrl = "http://localhost:1337";

  const thumbUrl =
    product.product_image?.data?.attributes?.formats?.thumbnail.url;

  const image = baseImageUrl + thumbUrl;

  return { ...product, image };
};
