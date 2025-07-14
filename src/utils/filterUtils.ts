export const filterBySearchTerm = <T extends Record<string, any>>(
  items: T[],
  searchTerm: string
): T[] => {
  if (!searchTerm.trim()) return items;
  
  return items.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
};

export const filterTransmissionsByType = (transmissions: any[], type: string) => {
  switch (type) {
    case "Type Get":
      return transmissions.filter(t => t.fileSent.includes("0019574") && !t.zipped && t.status === 'Success');
    case "Type Put":
      return transmissions.filter(t => t.zipped && t.status === 'Success');
    case "Type Get Extern":
      return transmissions.filter(t => t.fileSent.includes("0019574") && t.status === 'Success');
    case "Type Put Extern":
      return transmissions.filter(t => t.fileSent.includes("0019574") && t.status === 'Error');
    default:
      return [];
  }
};