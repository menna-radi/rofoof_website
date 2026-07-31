import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/shared/components/navigation/sidebar';
import { Header } from '@/shared/components/navigation/header';
import { NotificationPopover } from '@/shared/components/navigation/NotificationPopover';

import { AddProductModal } from '@/shared/components/modals/AddProductModal';
import { CreateOfferModal } from '@/shared/components/modals/CreateOfferModal';
import { CreateOrderModal } from '@/shared/components/modals/CreateOrderModal';
import { AddDriverModal } from '@/shared/components/modals/AddDriverModal';
import { SendNotificationModal } from '@/shared/components/modals/SendNotificationModal';

export const AdminLayout: React.FC = () => {
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [createOfferOpen, setCreateOfferOpen] = useState(false);
  const [createOrderOpen, setCreateOrderOpen] = useState(false);
  const [addDriverOpen, setAddDriverOpen] = useState(false);
  const [sendNotificationOpen, setSendNotificationOpen] = useState(false);
  const [notifPopoverOpen, setNotifPopoverOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#FAFAFA] text-[#0F1629]">
      <Sidebar
        onOpenAddProduct={() => setAddProductOpen(true)}
        onOpenCreateOffer={() => setCreateOfferOpen(true)}
        onOpenCreateOrder={() => setCreateOrderOpen(true)}
        onOpenAddDriver={() => setAddDriverOpen(true)}
        onOpenNotification={() => setSendNotificationOpen(true)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onOpenNotifications={() => setNotifPopoverOpen(prev => !prev)}
        />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet context={{ onOpenAddProduct: () => setAddProductOpen(true) }} />
        </main>
      </div>

      {/* Header Notification Popover Panel */}
      <NotificationPopover isOpen={notifPopoverOpen} onClose={() => setNotifPopoverOpen(false)} />

      {/* Global Quick Action Modals */}
      <AddProductModal isOpen={addProductOpen} onClose={() => setAddProductOpen(false)} />
      <CreateOfferModal isOpen={createOfferOpen} onClose={() => setCreateOfferOpen(false)} />
      <CreateOrderModal isOpen={createOrderOpen} onClose={() => setCreateOrderOpen(false)} />
      <AddDriverModal isOpen={addDriverOpen} onClose={() => setAddDriverOpen(false)} />
      <SendNotificationModal isOpen={sendNotificationOpen} onClose={() => setSendNotificationOpen(false)} />
    </div>
  );
};
