import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchRestaurant() {
  const [range, setRange] = useState<string>('3');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLocation = () => {
    setIsLoading(true);
    router.push(`/results?lat=35.658034&lng=139.701636&range=${range}`);

    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     const { latitude, longitude } = position.coords;
    //     console.log(`緯度: ${latitude}, 経度: ${longitude}`);
    //     router.push(`/results?lat=${latitude}&lng=${longitude}&range=${range}`);
    //   },
    //   (error) => {
    //     setIsLoading(false);
    //     console.error('位置情報の取得に失敗しました。', error);
    //   }
    // );
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
      <button onClick={handleLocation} disabled={isLoading}>
        {isLoading ? '検索中...' : '現在地から検索'}
      </button>
    </div>
  );
}
