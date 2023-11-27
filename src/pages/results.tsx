import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

interface Restaurant {
  id: string;
  name: string;
  access: string;
  logo_image: string;
}

export default function SearchResults() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchRestaurants = async () => {
      const { lat, lng, range } = router.query;
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/search?lat=${lat}&lng=${lng}&range=${range}`
        );
        const data = await response.json();
        setRestaurants(data.results.shop);
      } catch (error) {
        console.error('レストランの検索に失敗しました。', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (router.isReady) {
      fetchRestaurants();
    }
  }, [router.isReady, router.query]);

  const handleCardClick = (id: string) => {
    router.push(`/restaurant/${id}`);
  };

  const handleSearchChange = () => {
    router.push('/');
  };

  if (isLoading) {
    return <p>検索中です...</p>;
  }

  return (
    <div className='container mx-auto mt-8'>
      <div className='flex justify-center items-center'>
        <h1 className='text-2xl font-semibold text-gray-800 mr-4'>店舗一覧</h1>
        <button
          onClick={handleSearchChange}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          条件を変更
        </button>
      </div>
      {restaurants.length === 0 ? (
        <p>見つかりませんでした。</p>
      ) : (
        <div className='mt-4'>
          {restaurants.map((shop) => (
            <div key={shop.id} className='my-4 mx-auto max-w-2xl'>
              <Card
                onClick={() => handleCardClick(shop.id)}
                className='shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300'
              >
                <CardContent className='flex items-center p-4'>
                  <img
                    className='object-cover h-16 w-16 mr-4 rounded-full'
                    src={shop.logo_image}
                    alt={shop.name}
                  />
                  <div>
                    <CardTitle className='text-lg font-bold'>
                      {shop.name}
                    </CardTitle>
                    <CardDescription className='text-sm text-gray-600 mt-1'>
                      {shop.access}
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
