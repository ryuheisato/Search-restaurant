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
      //lat: '35.658034',
      //lng: '139.701636',
      range,
      wifi: wifi ? '1' : '0',
      parking: parking ? '1' : '0',
      child: child ? '1' : '0',
      pet: pet ? '1' : '0',
      card: card ? '1' : '0',
    };

    const queryString = new URLSearchParams(queryParameters).toString();
    //router.push(`results?${queryString}`);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`緯度: ${latitude}, 経度: ${longitude}`);
        router.push(
          `/results?lat=${latitude}&lng=${longitude}&${queryString}}`
        );
      },
      (error) => {
        setIsLoading(false);
        console.error('位置情報の取得に失敗しました。', error);
      }
    );
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-lg font-semibold text-center text-gray-800 mb-4'>
          レストラン検索
        </h2>

        <label
          htmlFor='rangeSelect'
          className='block text-sm font-medium text-gray-700'
        >
          検索半径
        </label>
        <select
          id='rangeSelect'
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className='mt-1 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
        >
          <option value='1'>300m</option>
          <option value='2'>500m</option>
          <option value='3'>1000m</option>
          <option value='4'>2000m</option>
          <option value='5'>3000m</option>
        </select>

        <div className='flex items-center mt-3'>
          <input
            type='checkbox'
            checked={wifi}
            onChange={() => setWifi(!wifi)}
            className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
          />
          <label className='ml-2 block text-sm text-gray-700'>Wi-Fiあり</label>
        </div>

        <div className='flex items-center mt-3'>
          <input
            type='checkbox'
            checked={parking}
            onChange={() => setParking(!parking)}
            className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
          />
          <label className='ml-2 block text-sm text-gray-700'>駐車場あり</label>
        </div>

        <div className='flex items-center mt-3'>
          <input
            type='checkbox'
            checked={child}
            onChange={() => setChild(!child)}
            className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
          />
          <label className='ml-2 block text-sm text-gray-700'>子供OK</label>
        </div>

        <div className='flex items-center mt-3'>
          <input
            type='checkbox'
            checked={pet}
            onChange={() => setPet(!pet)}
            className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
          />
          <label className='ml-2 block text-sm text-gray-700'>ペットOK</label>
        </div>

        <div className='flex items-center mt-3'>
          <input
            type='checkbox'
            checked={card}
            onChange={() => setCard(!card)}
            className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
          />
          <label className='ml-2 block text-sm text-gray-700'>カードOK</label>
        </div>

        <button
          onClick={handleLocation}
          disabled={isLoading}
          className='mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          {isLoading ? '検索中...' : '現在地から検索'}
        </button>
      </div>
    </div>
  );
}
