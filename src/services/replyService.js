const url = 'http://localhost:8080/api/replies/'

export const fetchRepliesByQuestionId = async (token, questionId) => {
    try {
        const response = await fetch(url + `question/${questionId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};

export const submitReply = async (token, authorId, text, questionId) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                authorId: authorId,
                text: text,
                questionId: questionId,
            }),
        });

        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export const replyToAReply = async (token, replyToReplyId, authorId, text, questionId) => {
    try {

        const response = await fetch(url + `${replyToReplyId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                authorId: authorId,
                text: text,
                questionId: questionId,
            }),
        });

        return await response.json();

    } catch (error) {
        console.log(error);
    }
}