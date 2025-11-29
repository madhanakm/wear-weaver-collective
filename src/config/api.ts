export const API_BASE_URL = 'https://ai.thinkaside.com';

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  SAVE_QUOTE: `${API_BASE_URL}/save-quote.php`,
  SAVE_CONTACT: `${API_BASE_URL}/save-contact.php`,
  BLOG_POSTS: `${API_BASE_URL}/blog-api.php?path=posts`,
  BLOG_POST: (slug: string) => `${API_BASE_URL}/blog-api.php?path=post/${slug}`,
  TESTIMONIALS: `${API_BASE_URL}/testimonials-api.php?path=all`,
  GALLERY: `${API_BASE_URL}/gallery-api.php?path=public`,
  GALLERY_FILTERS: `${API_BASE_URL}/product-filters-api.php?path=public`,
  PRODUCTS: `${API_BASE_URL}/products-api.php?path=public`,
  PRODUCT_GALLERY: (id: string) => `${API_BASE_URL}/products-api.php?path=gallery/${id}`,
  CLIENTS: `${API_BASE_URL}/clients-api.php`,
};