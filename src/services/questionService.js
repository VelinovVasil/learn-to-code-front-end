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

export const markQuestionAsAnswered = async (token, questionId) => {
    try {

        const response = await fetch(url + questionId, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete question: ${response.status} ${response.statusText}`);
        }

    } catch(error) {
        console.log(error);
    }
}

export const editQuestion = async (token, question) => {
    try {

        console.log('Question:');
        console.log(question);

        const response = await fetch(url + question.id, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question),
        });

        if (!response.ok) {
            throw new Error(`Failed to edit question: ${response.status} ${response.statusText}`)
        }

    } catch (error) {
        console.log(error);
    }
}