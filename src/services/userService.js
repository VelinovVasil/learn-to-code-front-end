const url = 'http://localhost:8080/' + 'api/users/';

export const getOneUser = async (token, userId) => {

    const userResponse = await fetch(url + userId, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!userResponse.ok) {
        throw new Error('Failed to fetch author');
    }
    return userResponse.json();
}

export const fetchAuthor = async (token, authorId) => {

    const authorResponse = await fetch(url + `${authorId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    return await authorResponse.json();
}

export const getUserByEmail = async (userEmail) => {

    console.log('Useremail');
    console.log(userEmail);

    console.log(url + 'email/' + userEmail);

    const response = await fetch(url + 'email/' + userEmail, {
        headers: {
            // Authorization: `Bearer ${token}`,
            'Content-Type': 'Application/JSON'
        },
    });

    // if (!response.ok) {
    //     throw new Error('Failed to fetch user info');
    // }

    console.log('response');
    console.log(response);

    return await response.json();
}

// TODO: FIX backend and export to question service
export const getQuestionsByUserId = async (token, userId) => {
    try {

        const askedQuestionsResponse = await fetch(`${url}questions/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        return await askedQuestionsResponse.json();

    } catch (error) {
        console.log(error);
    }
}