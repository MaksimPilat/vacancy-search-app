export default async function fetchCatalogues() {
    try {
        var response = await fetch('https://startup-summer-2023-proxy.onrender.com/2.0/catalogues', {
            method: 'GET',
            headers: { 'x-secret-key': 'GEU4nvd3rej*jeh.eqp'}
        });
        response = await response.json();
    } catch(err) {
        response = []
    } return response;
}