import { OrderPayload } from '@shared/types';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import api from 'utils/api';

interface OrdersProps {}

const OrderPage = ({}: RouteComponentProps) => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderPayload | null>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.orders.fetchOrder(id);
        setOrder(res.data);
      } catch (error) {}
    };
    fetchProduct();
  }, [id]);

  return <>{id}</>;
};

export default OrderPage;
