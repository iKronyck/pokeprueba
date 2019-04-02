
export function peticionGet(text) {
    fetch("https://pokeapi.co/api/v2/generation/")
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            return Promise.reject(response.status);
            }
        })
        .then(data => console.log(data))
}