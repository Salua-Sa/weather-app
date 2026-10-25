import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const city = req.query.city as string

    if (!city) {
        return res.status(400).json({ error: 'City is required' })
    }

    // Simple geocoding API (Open-Meteo)
    const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    )
    const geoData = await geoRes.json()

    if (!geoData.results || geoData.results.length === 0) {
        return res.status(404).json({ error: 'City not found' })
    }

    const { latitude, longitude } = geoData.results[0]

    // Weather API
    const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    )
    const weatherData = await weatherRes.json()

    return res.status(200).json({
        city,
        temperature: weatherData.current_weather.temperature,
        wind: weatherData.current_weather.windspeed
    })
}
