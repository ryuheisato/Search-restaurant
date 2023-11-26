import React, { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

interface Restaurant {
  id: string;
  name: string;
  station_name: string;
  logo_image: string;
}

export default function SearchRestaurant() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [range, setRange] = useState<string>('3');

  const fetchRestaurants = async (
    latitude: number,
    longitude: number,
    range: string
  ) => {
    try {
      const response = await fetch(
        `/api/search?lat=${latitude}&lng=${longitude}&range=${range}`
      );
      const data = await response.json();
      setRestaurants(data.results.shop);
    } catch (error) {
      console.error('レストランの検索に失敗しました。', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocation = () => {
    setIsLoading(true); // ロード開始
    setSearchPerformed(true); // 検索が実行されたことを示す

    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     const { latitude, longitude } = position.coords;
    //     console.log(`緯度: ${latitude}, 経度: ${longitude}`);
    //     fetchRestaurants(latitude, longitude, range);
    //   },
    //   (error) => {
    //     setIsLoading(false); // エラーが発生した場合もロードを終了する
    //     console.error('位置情報の取得に失敗しました。', error);
    //   }
    // );
    fetchRestaurants(35.6812362, 139.7671248, range);
  };

  return (
    <div>
      <div>
        <label htmlFor='rangeSelect'>検索半径:</label>
        <select
          id='rangeSelect'
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value='1'>300m</option>
          <option value='2'>500m</option>
          <option value='3'>1000m</option>
          <option value='4'>2000m</option>
          <option value='5'>3000m</option>
        </select>
      </div>
      <button onClick={handleLocation}>現在地から検索</button>
      {isLoading ? (
        <p>検索中です...</p>
      ) : searchPerformed && restaurants.length === 0 ? (
        <p>見つかりませんでした。</p>
      ) : (
        restaurants.map((shop) => (
          <div key={shop.id} className='my-2 mx-auto max-w-2xl'>
            <Card className='shadow-lg rounded-lg overflow-hidden'>
              <CardContent className='flex items-center p-4'>
                <img
                  className='object-cover h-16 w-16 mr-4'
                  src={shop.logo_image}
                  alt={shop.name}
                />
                <div>
                  <CardTitle className='text-lg font-bold'>
                    {shop.name}
                  </CardTitle>
                  <CardDescription className='text-sm text-gray-600 mt-1'>
                    最寄駅：{shop.station_name}
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          </div>
        ))
      )}
    </div>
  );
}
