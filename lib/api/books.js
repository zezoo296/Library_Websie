import { API_BASE_URL, DEFAULT_MAX_RESULTS } from "../apiConfig";

export async function searchBooks(query, startIndex) {
    const response = await fetch(`${API_BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${DEFAULT_MAX_RESULTS}&startIndex=${startIndex}`);

    if (!response.ok) {
        throw new Error("Couldn't fetch books. Please try again!")
    }
    const data = await response.json();

    return data || [];
}

export async function getBookDetails(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error("Couldn't fetch book details. Please try again!")
    }
    const data = await response.json();

    return data;
}