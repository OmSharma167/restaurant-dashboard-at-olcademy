import React, { useState } from 'react';
import TaxesManager from './TaxesManager';
import ChargesManager from './ChargesManager';


function TaxesAndCharges() {
  const [activeTab, setActiveTab] = useState('taxes');

  return (
    <div className="container mx-auto p-2">
      <div className="grid grid-cols-2 gap-2 rounded-lg mb-4">
        <button
          className={`p-3 text-base font-medium rounded-md ${activeTab === 'taxes' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('taxes')}
        >
          Taxes
        </button>
        <button
          className={`p-3 text-base font-medium rounded-md ${activeTab === 'charges' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('charges')}
        >
          Charges
        </button>
      </div>

      {activeTab === 'taxes' && <TaxesManager />}
      {activeTab === 'charges' && <ChargesManager />}
    </div>
  );
}

export default TaxesAndCharges;