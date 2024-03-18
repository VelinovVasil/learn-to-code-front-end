const url = 'http://localhost:8080/api/tags/'

export const getOneTag = async(token, tagId) => {
    const tagResponse = await fetch(url + tagId, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!tagResponse.ok) {
        throw new Error('Failed to fetch tag');
    }

    return tagResponse.json();
}