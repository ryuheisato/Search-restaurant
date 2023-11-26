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
  const { lat, lng, range } = req.query as {
    lat: string;
    lng: string;
    range: string;
  };
  const apiKey = process.env.API_KEY;
  const baseUrl = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/';
  const format = 'json';
  const count = 50;
  const parking = 1;

  try {
    const response = await fetch(
      `${baseUrl}?key=${apiKey}&lat=${lat}&lng=${lng}&range=${range}&count=${count}&band=1&format=${format}`
    );
    const data: ApiResponse = await response.json();
    console.log(range);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'サーバー側でエラーが発生しました。' });
  }
}
