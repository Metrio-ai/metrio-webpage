const API_URL = 'https://sierrapablo.duckdns.org/api/posts'

export const getPosts = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

export const getPostById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`Error fetching post by ID: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching post by ID:', error)
    throw error
  }
}
