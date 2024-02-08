async function fetchData(id) {
    const response = await fetch(`https://project-heist-rahulv07.vercel.app/characters/${id}`, {
        mode: 'cors',
    });
    const characterData = await response.json();
    return characterData;
}

export async function fetchAll(maxId) {
    const promises = [];
    for (let i = 1; i <= maxId; i++) {
        promises.push(fetchData(i));
    }
    const data = await Promise.all(promises);
    if (data.length !== maxId) return fetchAll(maxId);
    return data;
}
