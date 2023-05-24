export default async function fetchVacancies(args) {
    let url = "https://startup-summer-2023-proxy.onrender.com/2.0/v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948/vacancies/?count=4";
    const params = ['page', 'catalogues', 'payment_from', 'payment_to', 'keyword'];
    params.forEach((param, index) => {
        if (args[index]) url = url += `&${param}=${args[index]}`;
    });
    try {
        var response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
                'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
            }
        });
        response = await response.json();
    } catch(err) {
        response = []
    } return response;
}