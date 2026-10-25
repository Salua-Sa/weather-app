export function WeatherResult({ data }: { data: any }) {
    if (!data) return null

    return (
        <div>
        <h2>Weather in { data.city } </h2>
        < p > Temperature: { data.temperature }°C </p>
            < p > Wind: { data.wind } km / h </p>
                </div>
  )
}
