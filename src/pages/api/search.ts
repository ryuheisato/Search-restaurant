import type { NextApiRequest, NextApiResponse } from 'next';

interface ApiResponse {
  results: {
    shop: Array<{
      id: string;
      name: string;
      address: string;
    }>;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { message: string }>
) {
  const { lat, lng, range, wifi, parking, child, pet, card } = req.query as {
    lat: string;
    lng: string;
    range: string;
    wifi: string;
    parking: string;
    child: string;
    pet: string;
    card: string;
  };
  const apiKey = process.env.API_KEY;
  const baseUrl = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/';
  const format = 'json';
  const count = '50';

  try {
    const queryParams = new URLSearchParams({
      key: apiKey as string,
      lat,
      lng,
      range,
      count,
      format,
      wifi,
      parking,
      child,
      pet,
      card,
    });
    const response = await fetch(`${baseUrl}?${queryParams.toString()}`);
    const data: ApiResponse = await response.json();
    console.log(range);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'サーバー側でエラーが発生しました。' });
  }
}
