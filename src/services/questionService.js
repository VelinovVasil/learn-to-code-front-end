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

export const publishQuestion = async (token, publishObj) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: publishObj,
        });
        if (!response.ok) {
            throw new Error(`Failed to publish question: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Error publishing question:', error);
    }
};


