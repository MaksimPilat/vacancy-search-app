export default async function fetchFavorites(ids) {
    let url = "https://startup-summer-2023-proxy.onrender.com/2.0/v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948/vacancies/?";
    ids.forEach(id => {
        if (!id) return;
        url = url += `&ids[]=${id}`;
    });
    try {
        var response = await fetch(url, {
            method: 'GET',
            headers: { 'x-secret-key': 'GEU4nvd3rej*jeh.eqp' }
        });
        response = await response.json();
    } catch(err) {
        response = []
    } return response;
}