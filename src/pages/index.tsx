import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchRestaurant() {
  const [range, setRange] = useState<string>('3');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [wifi, setWifi] = useState<boolean>(false);
  const [parking, setParking] = useState<boolean>(false);
  const [child, setChild] = useState<boolean>(false);
  const [pet, setPet] = useState<boolean>(false);
  const [card, setCard] = useState<boolean>(false);
  const router = useRouter();

  const handleLocation = () => {
    setIsLoading(true);
    //router.push(`/results?lat=35.658034&lng=139.701636&range=${range}`);

    const queryParameters = {
      lat: '35.658034',
      lng: '139.701636',
      range,
      wifi: wifi ? '1' : '0',
      parking: parking ? '1' : '0',
      child: child ? '1' : '0',
      pet: pet ? '1' : '0',
      card: card ? '1' : '0',
    };

    const queryString = new URLSearchParams(queryParameters).toString();
    router.push(`results?${queryString}`);

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
      <div>
        <input type='checkbox' checked={wifi} onChange={() => setWifi(!wifi)} />
        <label>Wi-Fiあり</label>
      </div>
      <div>
        <input
          type='checkbox'
          checked={parking}
          onChange={() => setParking(!parking)}
        />
        <label>駐車場あり</label>
      </div>
      <div>
        <input
          type='checkbox'
          checked={child}
          onChange={() => setChild(!child)}
        />
        <label>子供OK</label>
      </div>
      <div>
        <input type='checkbox' checked={pet} onChange={() => setPet(!pet)} />
        <label>ペットOK</label>
      </div>
      <div>
        <input type='checkbox' checked={card} onChange={() => setCard(!card)} />
        <label>カードOK</label>
      </div>
      <button onClick={handleLocation} disabled={isLoading}>
        {isLoading ? '検索中...' : '現在地から検索'}
      </button>
    </div>
  );
}
