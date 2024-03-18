const url = 'http://localhost:8080/api/questions/'

export const getQuestions = async (token) => {
    const response = await fetch(url , {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch questions');
    }
    return response.json();
}
