const url = 'http://localhost:8080/api/users/'

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