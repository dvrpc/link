const API_USER = process.env.REACT_APP_API_USER;
const API_PASSWORD = process.env.REACT_APP_API_PASSWORD;

export const makeAuthenticatedRequest = async (url, options = {}) => {
  const credentials = btoa(`${API_USER}:${API_PASSWORD}`);
  const headers = new Headers({
    Authorization: `Basic ${credentials}`,
    ...options.headers,
  });

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("Error making authenticated request:", error);
  }
};

export default makeAuthenticatedRequest;
