export const fetchData = (url: string) => async (questionTopic: string) => {
  console.log(questionTopic);
  try {
    const response = await fetch(url, {
      method: "GET", // or 'POST', 'PUT', 'DELETE', etc.
      headers: {
        "Content-Type": "application/json",
        // Add any other headers your API needs
      },
      // If your API requires a body, uncomment the following line
      // body: JSON.stringify(yourData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
};
