export const productMap = (product) => {
  const baseImageUrl = "https://cryptotube.ru";

  const thumbUrl =
    product.product_image?.data?.attributes?.formats?.thumbnail.url;

  const image = baseImageUrl + thumbUrl;

  return { ...product, image };
};
