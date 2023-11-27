import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  open: string;
  coupon_urls: any;
  logo_image: string;
}

const RestaurantDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRestaurant = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/restaurant?id=${id}`);
      const data = await response.json();
      setRestaurant(data.results.shop[0]);
    } catch (error) {
      console.error('レストランの検索に失敗しました。', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchRestaurant(id);
    }
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!restaurant) {
    return <p>レストランの情報が見つかりません。</p>;
  }

  console.log(restaurant);
  return (
    <>
      <div key={restaurant.id} className='mx-auto max-w-4xl my-16'>
        <Card className='shadow-lg rounded-lg overflow-hidden py-16'>
          <CardContent className='flex items-center p-4'>
            <img
              className='object-cover h-16 w-16 mr-4'
              src={restaurant.logo_image}
              alt={restaurant.name}
            />
            <div>
              <CardTitle className='text-lg font-bold'>
                {restaurant.name}
              </CardTitle>
              <CardDescription className='text-sm text-gray-600 mt-1'>
                店舗住所：{restaurant.address}
                <br></br>
                営業時間：{restaurant.open}
                <br></br>
                クーポン：
                <a
                  href={restaurant.coupon_urls.pc}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 hover:text-blue-600'
                >
                  こちらをクリック
                </a>
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='flex justify-center'>
        <Button onClick={handleBack}>戻る</Button>
      </div>
    </>
  );
};

export default RestaurantDetail;
