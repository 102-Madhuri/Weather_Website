
export default async function abc(req, res) {
    const apiKey = process.env.NEXT_PUBLIC_WEATHERSTACK_API_KEY;
    console.log(req.query,"req...");
    const city = req.query.city || 'London';

    try {
        const response = await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
