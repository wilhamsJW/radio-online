interface RadioStation {
  name: string;
  url: string;
  votes: number;
  country: string;
  language: string;
  countrycode: string;
}

interface StationsData {
  stations: RadioStation[];
  total: number;
}

export const fetchStationsApi = async (page: number, limit: number = 80): Promise<RadioStation[] | null> => {
  try {
    const response = await fetch(`https://de1.api.radio-browser.info/json/stations/search?limit=${limit}&page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar estações');
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error('Erro ao buscar estações:', error);
    return null;
  }
};

  