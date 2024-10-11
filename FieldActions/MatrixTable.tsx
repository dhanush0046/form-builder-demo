// import { useState } from 'react';
// import { Trash2, Edit, Plus } from 'lucide-react'; // Assuming you're using lucide-react for icons

// export const MatrixTable = () => {
//   const [rows, setRows] = useState([{ id: 1, name: 'Question 1' }]);
//   const [columns, setColumns] = useState([{ id: 1, name: 'Strongly Disagree' }, { id: 2, name: 'Disagree' }, { id: 3, name: 'Agree' }]);
//   const [selectedValues, setSelectedValues] = useState({});
//   const [isEditingRow, setIsEditingRow] = useState(null);
//   const [isEditingColumn, setIsEditingColumn] = useState(null);

//   const handleSelectionChange = (rowId: number, columnId: number) => {
//     setSelectedValues((prev) => ({
//       ...prev,
//       [rowId]: columnId,
//     }));
//   };

//   // Add a new row
//   const addRow = () => {
//     setRows([...rows, { id: rows.length + 1, name: `Question ${rows.length + 1}` }]);
//   };

//   // Add a new column
//   const addColumn = () => {
//     setColumns([...columns, { id: columns.length + 1, name: `Option ${columns.length + 1}` }]);
//   };

//   // Edit row or column name
//   const editRowName = (rowId: number, newName: string) => {
//     setRows((prevRows) => prevRows.map((row) => (row.id === rowId ? { ...row, name: newName } : row)));
//     setIsEditingRow(null); // Reset editing state
//   };

//   const editColumnName = (columnId: number, newName: string) => {
//     setColumns((prevColumns) => prevColumns.map((column) => (column.id === columnId ? { ...column, name: newName } : column)));
//     setIsEditingColumn(null); // Reset editing state
//   };

//   // Remove row or column
//   const removeRow = (rowId: number) => {
//     setRows(rows.filter((row) => row.id !== rowId));
//   };

//   const removeColumn = (columnId: number) => {
//     setColumns(columns.filter((column) => column.id !== columnId));
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold">Dynamic Matrix Table</h2>
//         <div className="flex space-x-2">
//           <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={addRow}>
//             Add Row <Plus className="inline-block ml-1" size={16} />
//           </button>
//           <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={addColumn}>
//             Add Column <Plus className="inline-block ml-1" size={16} />
//           </button>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="border border-gray-300 px-4 py-2">Row/Column</th>
//               {columns.map((column, columnIndex) => (
//                 <th key={column.id} className="border border-gray-300 px-4 py-2 text-center">
//                   {isEditingColumn === column.id ? (
//                     <input
//                       type="text"
//                       defaultValue={column.name}
//                       onBlur={(e) => editColumnName(column.id, e.target.value)}
//                       autoFocus
//                       className="border p-1"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center">
//                       {column.name}
//                       <Edit className="ml-2 cursor-pointer" size={16} onClick={() => setIsEditingColumn(column.id)} />
//                       <Trash2 className="ml-2 text-red-500 cursor-pointer" size={16} onClick={() => removeColumn(column.id)} />
//                     </div>
//                   )}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row, rowIndex) => (
//               <tr key={row.id}>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {isEditingRow === row.id ? (
//                     <input
//                       type="text"
//                       defaultValue={row.name}
//                       onBlur={(e) => editRowName(row.id, e.target.value)}
//                       autoFocus
//                       className="border p-1"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-between">
//                       {row.name}
//                       <Edit className="ml-2 cursor-pointer" size={16} onClick={() => setIsEditingRow(row.id)} />
//                       <Trash2 className="ml-2 text-red-500 cursor-pointer" size={16} onClick={() => removeRow(row.id)} />
//                     </div>
//                   )}
//                 </td>
//                 {columns.map((column, columnIndex) => (
//                   <td key={column.id} className="border border-gray-300 px-4 py-2 text-center">
//                     <input
//                       type="radio"
//                       name={`row-${row.id}`}
//                       checked={selectedValues[row.id] === column.id}
//                       onChange={() => handleSelectionChange(row.id, column.id)}
//                       className="cursor-pointer"
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

import { useState } from 'react';
import { Trash2, Edit, Plus } from 'lucide-react'; // Assuming you're using lucide-react for icons

export const MatrixTable = () => {
  interface SelectedValues {
    [key: number]: number;
  }
  const [rows, setRows] = useState([{ id: 1, name: 'Question 1' }]);
  const [columns, setColumns] = useState([{ id: 1, name: 'Strongly Disagree' }, { id: 2, name: 'Disagree' }, { id: 3, name: 'Agree' }]);
  //const [selectedValues, setSelectedValues] = useState({});
  const [isEditingRow, setIsEditingRow] = useState<number | null>(null);
  const [isEditingColumn, setIsEditingColumn] = useState<number | null>(null);
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({});
  const handleSelectionChange = (rowId: number, columnId: number) => {
    setSelectedValues((prev) => ({
      ...prev,
      [rowId]: columnId,
    }));
  };


  
  // Add a new row
  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, name: `Question ${rows.length + 1}` }]);
  };

  // Add a new column
  const addColumn = () => {
    setColumns([...columns, { id: columns.length + 1, name: `Option ${columns.length + 1}` }]);
  };

  // Edit row or column name
  const editRowName = (rowId: number, newName: string) => {
    setRows((prevRows) => prevRows.map((row) => (row.id === rowId ? { ...row, name: newName } : row)));
    setIsEditingRow(null); // Reset editing state
  };

  const editColumnName = (columnId: number, newName: string) => {
    setColumns((prevColumns) => prevColumns.map((column) => (column.id === columnId ? { ...column, name: newName } : column)));
    setIsEditingColumn(null); // Reset editing state
  };

  // Remove row or column
  const removeRow = (rowId: number) => {
    setRows(rows.filter((row) => row.id !== rowId));
  };

  const removeColumn = (columnId: number) => {
    setColumns(columns.filter((column) => column.id !== columnId));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Dynamic Matrix Table</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={addRow}>
            Add Row <Plus className="inline-block ml-1" size={16} />
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={addColumn}>
            Add Column <Plus className="inline-block ml-1" size={16} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Row/Column</th>
              {columns.map((column, columnIndex) => (
                <th key={column.id} className="border border-gray-300 px-4 py-2 text-center">
                  {isEditingColumn === column.id ? (
                    <input
                      type="text"
                      defaultValue={column.name}
                      onBlur={(e) => editColumnName(column.id, e.target.value)}
                      autoFocus
                      className="border p-1"
                    />
                  ) : (
                    <div className="flex items-center justify-center">
                      {column.name}
                      <Edit className="ml-2 cursor-pointer" size={16} onClick={() => setIsEditingColumn(column.id)} />
                      <Trash2 className="ml-2 text-red-500 cursor-pointer" size={16} onClick={() => removeColumn(column.id)} />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {isEditingRow === row.id ? (
                    <input
                      type="text"
                      defaultValue={row.name}
                      onBlur={(e) => editRowName(row.id, e.target.value)}
                      autoFocus
                      className="border p-1"
                    />
                  ) : (
                    <div className="flex items-center justify-between">
                      {row.name}
                      <Edit className="ml-2 cursor-pointer" size={16} onClick={() => setIsEditingRow(row.id)} />
                      <Trash2 className="ml-2 text-red-500 cursor-pointer" size={16} onClick={() => removeRow(row.id)} />
                    </div>
                  )}
                </td>
                {columns.map((column, columnIndex) => (
                  <td key={column.id} className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      type="radio"
                      name={`row-${row.id}`}
                      checked={selectedValues[row.id] === column.id}
                      onChange={() => handleSelectionChange(row.id, column.id)}
                      className="cursor-pointer"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Example usage in a form
// const Form = () => {
//   return (
//     <div className="p-6">
//       <MatrixTable />
//     </div>
//   );
// };

// export default Form;
