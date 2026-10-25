import { useState } from 'react'
import { WeatherResult } from '../components/WeatherResult'

export default function Home() {
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    async function handleSearch(e) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setWeather(null)

        try {
            const res = await fetch(`/api/weather?city=${city}`)
            const data = await res.json()

            if (!res.ok) {
                setError(data.error)
            } else {
                setWeather(data)
            }
        } catch {
            setError('Network error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main style={{
            maxWidth: '500px',
            margin: '3rem auto',
            padding: '2rem',
            borderRadius: '12px',
            backgroundColor: '#f7f7f7',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                Weather App
            </h1>

            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
                <input
                    placeholder="Enter a city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #ccc'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#0078ff',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    Search
                </button>
            </form>

            {loading && <p style={{ textAlign: 'center' }}>Loading…</p>}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <WeatherResult data={weather} />
        </main>
    )
}
