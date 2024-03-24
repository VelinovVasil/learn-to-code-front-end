const url = 'http://localhost:8080/' + 'api/donate'

export const donate = async (amount) => {

    const obj = {amount: amount};

    const response = await fetch (url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    
                                },
                                body: JSON.stringify(obj)
                            });

    return response;
};