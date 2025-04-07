import React from 'react';

const BillingPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Billing</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        Aquí se mostrará la configuración de Stripe y facturación.
      </div>
    </div>
  );
};

export default BillingPage;
