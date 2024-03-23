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

export const getAllTags = async (token) => {
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tags');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching tags:', error);
    }
};