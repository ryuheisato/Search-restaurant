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
  const { id: restaurantId } = req.query;
  const apiKey = process.env.API_KEY;
  const baseUrl = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/';
  const format = 'json';

  try {
    const response = await fetch(
      `${baseUrl}?key=${apiKey}&id=${restaurantId}&format=${format}`
    );
    const data: ApiResponse = await response.json();
    console.log(restaurantId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'サーバー側でエラーが発生しました。' });
  }
}
