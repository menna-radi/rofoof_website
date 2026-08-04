import { useState, useEffect } from 'react';
import { orderRepository } from '../../data/repositories/OrderRepositoryImpl';
import { OrderEntity, OrderStatus } from '../../domain/entities/OrderEntity';

export const useOrdersController = (initialTab: string = 'all') => {
  const [orders, setOrders] = useState<OrderEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<OrderEntity | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await orderRepository.getOrders();
      setOrders(data);
      if (data.length > 0) {
        setSelectedOrder(data[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: OrderStatus) => {
    const updated = await orderRepository.updateOrderStatus(id, newStatus);
    setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
    if (selectedOrder?.id === id) {
      setSelectedOrder(updated);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      !searchQuery ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.driverName && o.driverName.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeTab === 'active') return o.status === 'active';
    if (activeTab === 'pending') return o.status === 'pending';
    if (activeTab === 'delivered') return o.status === 'delivered';
    if (activeTab === 'cancelled') return o.status === 'cancelled';
    return true;
  });

  const activeCount = orders.filter((o) => o.status === 'active').length;
  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;
  const cancelledCount = orders.filter((o) => o.status === 'cancelled').length;

  return {
    orders: filteredOrders,
    rawOrders: orders,
    loading,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedOrder,
    setSelectedOrder,
    handleStatusChange,
    counts: {
      active: activeCount,
      pending: pendingCount,
      delivered: deliveredCount,
      cancelled: cancelledCount,
      all: orders.length,
    },
  };
};
