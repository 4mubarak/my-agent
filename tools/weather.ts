import { tool } from 'ai';
import { z } from 'zod';

const weatherSchema = z.object({
  location: z.string().describe('The location to get the weather for'),
});

async function getWeather({ location }: z.infer<typeof weatherSchema>) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error('OPENWEATHER_API_KEY environment variable is not set');
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (response.status === 404) {
      return `Could not find weather for ${location}. Please check the location and try again.`;
    }
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch weather data: ${errorData.message}`);
    }

    const data = await response.json();

    return `The weather in ${location} is ${data.weather[0].description} with a temperature of ${data.main.temp}°C.`;
  } catch (error) {
    if (error instanceof Error) {
      return `Error getting weather: ${error.message}`;
    }
    return 'An unknown error occurred while fetching the weather.';
  }
}

export const getWeatherTool = tool({
  description: 'Gets the current weather for a given location',
  inputSchema: weatherSchema,
  execute: getWeather,
});
