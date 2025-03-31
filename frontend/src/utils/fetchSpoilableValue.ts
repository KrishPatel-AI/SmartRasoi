// import { supabase } from '../lib/supabase';

// export async function fetchSpoilableValue() {
//   const { data, error } = await supabase
//     .from('inventory')
//     .select('Amount, Quantity') // Use correct column names (case-sensitive in Supabase)
//     .eq('Status', 'Expiring Soon'); // Filtering spoilable items

//   if (error) {
//     console.error('Error fetching spoilable items:', error);
//     return { totalValue: 0, error };
//   }

//   const totalValue = data.reduce((sum, item) => sum + (item.Amount || 0) * (item.Quantity || 0), 0);
//   return { totalValue, data };
// }
