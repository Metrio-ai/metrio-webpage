const API_URL = 'http://api.metrio.es:3000/api/posts';

/**
 * Fetches all posts from the API.
 * @returns {Promise<Array>} An array of posts.
 */
export const getPosts = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

/**
 * Fetches a single post by its ID.
 * @param {string} id - The ID of the post to fetch.
 * @returns {Promise<Object>} The post object.
 */
export const getPostById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Error fetching post by ID: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw error;
  }
};
