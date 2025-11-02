export const API_BASE_URL = 'https://ai.thinkaside.com';

export const API_ENDPOINTS = {
  SAVE_QUOTE: `${API_BASE_URL}/save-quote.php`,
  SAVE_CONTACT: `${API_BASE_URL}/save-contact.php`,
  BLOG_POSTS: `${API_BASE_URL}/blog-api.php?path=posts`,
  BLOG_POST: (slug: string) => `${API_BASE_URL}/blog-api.php?path=post/${slug}`,
  TESTIMONIALS: `${API_BASE_URL}/testimonials-api.php?path=all`,
};