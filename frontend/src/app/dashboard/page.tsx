// "use client";
// import { useEffect, useState } from 'react';
// import { fetchSpoilableValue } from '../../utils/fetchSpoilableValue';

// export default function InventoryPage() {
//   const [spoilableValue, setSpoilableValue] = useState(0);

//   useEffect(() => {
//     async function fetchData() {
//       const spoilable = await fetchSpoilableValue();
//       setSpoilableValue(spoilable.totalValue);
//     }

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Inventory Overview</h1>
//       <p>💰 Total Value of Spoilable Items: ₹{spoilableValue}</p>
//     </div>
//   );
// }
