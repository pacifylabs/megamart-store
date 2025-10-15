// src/components/profile/ProfileContent.jsx
import React from "react";
import ProfileHeader from "./ProfileHeader";
import OrderHistory from "./OrderHistory";
import WishlistSection from "./WishlistSection";
import PaymentMethods from "./PaymentMethods";
import AddressesSection from "./AddressesSection";
import SettingsPanel from "./SettingsPanel";

/**
 * Compose content. The smaller sections are shown as cards under header.
 * This file purposefully imports all modules but each module is small and focused.
 */
export default function ProfileContent() {
  return (
    <section>
      <ProfileHeader />

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        <OrderHistory />
        <WishlistSection />
        <PaymentMethods />
        <AddressesSection />
      </div>

      <div className="mt-6">
        <SettingsPanel />
      </div>
    </section>
  );
}
