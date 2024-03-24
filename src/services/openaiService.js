const url = 'https://learn-to-code-server.azurewebsites.net/' + 'api/openai/chat'

export const questionSubmit = async (token, obj) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: obj,
        });
        if (!response.ok) {
            throw new Error('Failed to submit question');
        }

        return response.json();

    } catch (error) {
        console.error('Error submitting question:', error);
    }
};