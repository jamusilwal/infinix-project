export const PHONE_VARIANTS = {
  colors: [
    { id: 'midnight', name: 'Midnight Black', hex: '#1a1a2e' },
    { id: 'ocean', name: 'Ocean Blue', hex: '#0066cc' },
    { id: 'aurora', name: 'Aurora Purple', hex: '#9333ea' },
    { id: 'forest', name: 'Forest Green', hex: '#059669' },
    { id: 'sunset', name: 'Sunset Gold', hex: '#f97316' }
  ],
  storage: [
    { id: '256gb', capacity: '256GB', label: '256GB' },
    { id: '512gb', capacity: '512GB', label: '512GB', priceIncrease: 5000 },
    { id: '1tb', capacity: '1TB', label: '1TB', priceIncrease: 15000 }
  ],
  basePrice: 45000
};

export function getStoragePrice(storageId) {
  const storage = PHONE_VARIANTS.storage.find(s => s.id === storageId);
  return PHONE_VARIANTS.basePrice + (storage?.priceIncrease || 0);
}
