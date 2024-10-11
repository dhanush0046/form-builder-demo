import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { BarChart2, Edit2, CheckCircle, Trash2, PlusCircle } from 'lucide-react';
import { nanoid } from 'nanoid';
import { SortableItem } from '../FieldActions/SortableItem'; // Ensure you have this component

const RankingField = () => {
  const [items, setItems] = useState<{ id: string; text: string; isEditing: boolean }[]>([]);
  const [newOption, setNewOption] = useState('');
  const [error, setError] = useState('');

  // Handle reordering of items
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Add new option and set it into editing mode immediately
  const handleAddOption = () => {
    if (newOption.trim() === '') {
      setError('Option cannot be empty');
      return;
    }
    if (items.some((item) => item.text === newOption.trim())) {
      setError('Duplicate option not allowed');
      return;
    }
    setItems((prevItems) => [
      ...prevItems,
      { id: nanoid(), text: newOption.trim(), isEditing: true }, // Set the new item to editing mode
    ]);
    setNewOption('');
    setError('');
  };

  // Handle change in the input field
  const handleInputChange = (id: string, value: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: value } : item
      )
    );
  };

  // Delete an item
  const handleDelete = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Rank the following:</label>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={items.map((item) => item.id)}>
          <div className="space-y-2">
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                <div className="p-4 border border-gray-300 rounded-lg flex justify-between items-center space-x-4 hover:shadow-lg transition-shadow">
                  <BarChart2 size={18} className="cursor-move" />
                  {item.isEditing ? (
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => handleInputChange(item.id, e.target.value)}
                      className="w-full p-2 border rounded-md"
                      autoFocus
                    />
                  ) : (
                    <span className="flex-grow">{item.text}</span>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Add new option"
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={handleAddOption}
          className="text-blue-500 hover:text-blue-700 flex items-center"
        >
          <PlusCircle size={18} className="mr-1" />
          Add
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default RankingField;

//-----------------22222222222222222222222

// import { useState } from 'react';
// import { DndContext, closestCenter } from '@dnd-kit/core';
// import { arrayMove, SortableContext } from '@dnd-kit/sortable';
// import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
// import { BarChart2, Edit2, CheckCircle, Trash2, PlusCircle } from 'lucide-react';
// import { nanoid } from 'nanoid';
// import { SortableItem } from '../FieldActions/SortableItem';
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent } from "@/components/ui/card"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// export default function RankingField() {
//   const [items, setItems] = useState<{ id: string; text: string; isEditing: boolean }[]>([]);
//   const [newOption, setNewOption] = useState('');
//   const [error, setError] = useState('');

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;
//     if (active.id !== over?.id) {
//       setItems((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over?.id);
//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   const handleEditClick = (id: string) => {
//     setItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, isEditing: !item.isEditing } : item
//       )
//     );
//   };

//   const handleSaveClick = (id: string) => {
//     setItems((prevItems) =>
//       prevItems.map((item) => {
//         if (item.id === id) {
//           if (item.text.trim() === '') {
//             setError('Option cannot be empty');
//             return { ...item, isEditing: true };
//           }
//           const isDuplicate = prevItems.some(
//             (otherItem) => otherItem.id !== id && otherItem.text === item.text.trim()
//           );
//           if (isDuplicate) {
//             setError('Duplicate option not allowed');
//             return { ...item, isEditing: true };
//           }
//           return { ...item, isEditing: false, text: item.text.trim() };
//         }
//         return item;
//       })
//     );
//     setError('');
//   };

//   const handleInputChange = (id: string, value: string) => {
//     setItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, text: value } : item
//       )
//     );
//   };

//   const handleDeleteClick = (id: string) => {
//     setItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   const handleAddOption = () => {
//     if (newOption.trim() === '') {
//       setError('Option cannot be empty');
//       return;
//     }
//     if (items.some((item) => item.text === newOption.trim())) {
//       setError('Duplicate option not allowed');
//       return;
//     }
//     setItems((prevItems) => [
//       ...prevItems,
//       { id: nanoid(), text: newOption.trim(), isEditing: false },
//     ]);
//     setNewOption('');
//     setError('');
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardContent className="p-6 space-y-4">
//         <Label htmlFor="ranking-field" className="text-lg font-semibold">Rank the following:</Label>
        
//         <DndContext
//           collisionDetection={closestCenter}
//           onDragEnd={handleDragEnd}
//           modifiers={[restrictToVerticalAxis]}
//         >
//           <SortableContext items={items.map((item) => item.id)}>
//             <div className="space-y-2">
//               {items.map((item) => (
//                 <SortableItem key={item.id} id={item.id}>
//                   <div className="p-3 bg-secondary rounded-lg flex justify-between items-center space-x-2 hover:shadow-md transition-shadow">
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger>
//                           <BarChart2 size={18} className="cursor-move text-primary" />
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Drag to reorder</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     {item.isEditing ? (
//                       <Input
//                         type="text"
//                         value={item.text}
//                         onChange={(e) => handleInputChange(item.id, e.target.value)}
//                         className="flex-grow"
//                         autoFocus
//                       />
//                     ) : (
//                       <span className="flex-grow">{item.text}</span>
//                     )}
//                     <div className="flex space-x-1">
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button
//                               size="icon"
//                               variant="ghost"
//                               onClick={() => item.isEditing ? handleSaveClick(item.id) : handleEditClick(item.id)}
//                             >
//                               {item.isEditing ? <CheckCircle size={18} /> : <Edit2 size={18} />}
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>{item.isEditing ? 'Save' : 'Edit'}</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button
//                               size="icon"
//                               variant="ghost"
//                               onClick={() => handleDeleteClick(item.id)}
//                             >
//                               <Trash2 size={18} />
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>Delete</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     </div>
//                   </div>
//                 </SortableItem>
//               ))}
//             </div>
//           </SortableContext>
//         </DndContext>

//         <div className="flex items-center space-x-2">
//           <Input
//             type="text"
//             value={newOption}
//             onChange={(e) => setNewOption(e.target.value)}
//             placeholder="Add new option"
//             className="flex-grow"
//           />
//           <Button onClick={handleAddOption} variant="outline">
//             <PlusCircle size={18} className="mr-2" />
//             Add
//           </Button>
//         </div>

//         {error && <p className="text-destructive text-sm">{error}</p>}
//       </CardContent>
//     </Card>
//   );
// }

//---------------333333333333333333333333333333

// import { useState } from 'react';
// import { DndContext, closestCenter } from '@dnd-kit/core';
// import { arrayMove, SortableContext } from '@dnd-kit/sortable';
// import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
// import { BarChart2, Edit2, CheckCircle, Trash2, PlusCircle } from 'lucide-react';
// import { nanoid } from 'nanoid';
// import { SortableItem } from '../FieldActions/SortableItem';

// export default function RankingField() {
//   const [items, setItems] = useState<{ id: string; text: string; isEditing: boolean }[]>([]);
//   const [newOption, setNewOption] = useState('');
//   const [error, setError] = useState('');

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;
//     if (active.id !== over?.id) {
//       setItems((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over?.id);
//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   const handleEditClick = (id: string) => {
//     setItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, isEditing: !item.isEditing } : item
//       )
//     );
//   };

//   const handleSaveClick = (id: string) => {
//     setItems((prevItems) =>
//       prevItems.map((item) => {
//         if (item.id === id) {
//           if (item.text.trim() === '') {
//             setError('Option cannot be empty');
//             return { ...item, isEditing: true };
//           }
//           const isDuplicate = prevItems.some(
//             (otherItem) => otherItem.id !== id && otherItem.text === item.text.trim()
//           );
//           if (isDuplicate) {
//             setError('Duplicate option not allowed');
//             return { ...item, isEditing: true };
//           }
//           return { ...item, isEditing: false, text: item.text.trim() };
//         }
//         return item;
//       })
//     );
//     setError('');
//   };

//   const handleInputChange = (id: string, value: string) => {
//     setItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, text: value } : item
//       )
//     );
//   };

//   const handleDeleteClick = (id: string) => {
//     setItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   const handleAddOption = () => {
//     if (newOption.trim() === '') {
//       setError('Option cannot be empty');
//       return;
//     }
//     if (items.some((item) => item.text === newOption.trim())) {
//       setError('Duplicate option not allowed');
//       return;
//     }
//     setItems((prevItems) => [
//       ...prevItems,
//       { id: nanoid(), text: newOption.trim(), isEditing: false },
//     ]);
//     setNewOption('');
//     setError('');
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
//       <label htmlFor="ranking-field" className="block text-lg font-semibold text-gray-700">
//         Rank the following:
//       </label>
      
//       <DndContext
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//         modifiers={[restrictToVerticalAxis]}
//       >
//         <SortableContext items={items.map((item) => item.id)}>
//           <div className="space-y-2">
//             {items.map((item) => (
//               <SortableItem key={item.id} id={item.id}>
//                 <div className="p-3 bg-gray-100 rounded-lg flex justify-between items-center space-x-2 hover:shadow-md transition-shadow">
//                   <div className="cursor-move text-gray-500" title="Drag to reorder">
//                     <BarChart2 size={18} />
//                   </div>
//                   {item.isEditing ? (
//                     <input
//                       type="text"
//                       value={item.text}
//                       onChange={(e) => handleInputChange(item.id, e.target.value)}
//                       className="flex-grow p-1 border rounded"
//                       autoFocus
//                     />
//                   ) : (
//                     <span className="flex-grow">{item.text}</span>
//                   )}
//                   <div className="flex space-x-1">
//                     <button
//                       className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
//                       onClick={() => item.isEditing ? handleSaveClick(item.id) : handleEditClick(item.id)}
//                       title={item.isEditing ? 'Save' : 'Edit'}
//                     >
//                       {item.isEditing ? <CheckCircle size={18} /> : <Edit2 size={18} />}
//                     </button>
//                     <button
//                       className="p-1 text-red-500 hover:text-red-700 transition-colors"
//                       onClick={() => handleDeleteClick(item.id)}
//                       title="Delete"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </div>
//               </SortableItem>
//             ))}
//           </div>
//         </SortableContext>
//       </DndContext>

//       <div className="flex items-center space-x-2">
//         <input
//           type="text"
//           value={newOption}
//           onChange={(e) => setNewOption(e.target.value)}
//           placeholder="Add new option"
//           className="flex-grow p-2 border rounded"
//         />
//         <button
//           onClick={handleAddOption}
//           className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center"
//         >
//           <PlusCircle size={18} className="mr-2" />
//           Add
//         </button>
//       </div>

//       {error && <p className="text-red-500 text-sm">{error}</p>}
//     </div>
//   );
// }





// export default RankingField;

// import { useState } from 'react';
// import { DndContext, closestCenter } from '@dnd-kit/core';
// import { arrayMove, SortableContext } from '@dnd-kit/sortable';
// import { SortableItem } from '../FieldActions/SortableItem'; // Ensure you have a SortableItem component
// import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
// import { BarChart2, Edit2, CheckCircle } from 'lucide-react'; // Icons from lucide-react

// const RankingField = () => {
//   const [items, setItems] = useState([
//     { id: 'Option 1', text: 'Option 1', isEditing: false },
//     { id: 'Option 2', text: 'Option 2', isEditing: false },
//     { id: 'Option 3', text: 'Option 3', isEditing: false },
//     { id: 'Option 4', text: 'Option 4', isEditing: false },
//   ]);

//   // Handle drag end event
//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;
//     if (active.id !== over.id) {
//       setItems((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over.id);
//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   // Handle edit click
//   const handleEditClick = (index: number) => {
//     const newItems = [...items];
//     newItems[index].isEditing = true;
//     setItems(newItems);
//   };

//   // Handle save after editing
//   const handleSaveClick = (index: number) => {
//     const newItems = [...items];
//     newItems[index].isEditing = false;
//     setItems(newItems);
//   };

//   // Handle change in the input field
//   const handleInputChange = (index: number, value: string) => {
//     const newItems = [...items];
//     newItems[index].text = value;
//     setItems(newItems);
//   };

//   return (
//     <div className="space-y-4">
//       <label className="block text-sm font-medium text-gray-700">Rank the following:</label>
//       <DndContext
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//         modifiers={[restrictToVerticalAxis]}
//       >
//         <SortableContext items={items.map((item) => item.id)}>
//           <div className="space-y-2">
//             {items.map((item, index) => (
//               <SortableItem key={item.id} id={item.id}>
//                 <div className="p-4 border border-gray-300 rounded-lg flex justify-between items-center space-x-4">
//                   <BarChart2 size={18} className="cursor-move" />
//                   {item.isEditing ? (
//                     <input
//                       type="text"
//                       value={item.text}
//                       onChange={(e) => handleInputChange(index, e.target.value)}
//                       className="w-full p-2 border rounded-md"
//                     />
//                   ) : (
//                     <span className="flex-grow">{item.text}</span>
//                   )}
//                   {item.isEditing ? (
//                     <button
//                       onClick={() => handleSaveClick(index)}
//                       className="text-green-500 hover:text-green-700"
//                     >
//                       <CheckCircle size={18} />
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleEditClick(index)}
//                       className="text-gray-500 hover:text-gray-700"
//                     >
//                       <Edit2 size={18} />
//                     </button>
//                   )}
//                 </div>
//               </SortableItem>
//             ))}
//           </div>
//         </SortableContext>
//       </DndContext>
//     </div>
//   );
// };


// import { useState } from 'react';
// import { DndContext, closestCenter } from '@dnd-kit/core';
// import { arrayMove, SortableContext } from '@dnd-kit/sortable';
// import { SortableItem } from '../FieldActions/SortableItem'; // Ensure you have a SortableItem component
// import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
// import { BarChart2, Edit2, CheckCircle, Trash2, PlusCircle } from 'lucide-react'; // Icons from lucide-react
// import { nanoid } from 'nanoid'; // Unique ID generator for options

// const RankingField = () => {
//   const [items, setItems] = useState<{ id: string; text: string; isEditing: boolean }[]>([]);
//   const [newOption, setNewOption] = useState('');
//   const [error, setError] = useState('');

//   // Handle drag end event
//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;
//     if (active.id !== over?.id) {
//       setItems((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over?.id);
//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   // Handle edit click
//   const handleEditClick = (index: number) => {
//     const newItems = [...items];
//     newItems[index].isEditing = true;
//     setItems(newItems);
//   };

//   // Handle save after editing
//   const handleSaveClick = (index: number) => {
//     const newItems = [...items];
//     newItems[index].isEditing = false;
//     setItems(newItems);
//   };

//   // Handle change in the input field
//   const handleInputChange = (index: number, value: string) => {
//     const newItems = [...items];
//     newItems[index].text = value;
//     setItems(newItems);
//   };

//   // Handle delete item
//   const handleDeleteClick = (index: number) => {
//     const newItems = items.filter((_, idx) => idx !== index);
//     setItems(newItems);
//   };

//   // Handle adding a new option
//   const handleAddOption = () => {
//     if (newOption.trim() === '') {
//       setError('Option cannot be empty');
//       return;
//     }
//     if (items.some((item) => item.text === newOption.trim())) {
//       setError('Duplicate option not allowed');
//       return;
//     }
//     setItems((prevItems) => [
//       ...prevItems,
//       { id: nanoid(), text: newOption.trim(), isEditing: false },
//     ]);
//     setNewOption(''); // Clear the input field after adding
//     setError(''); // Clear the error message
//   };

//   return (
//     <div className="space-y-4">
//       <label className="block text-sm font-medium text-gray-700">Rank the following:</label>
      
//       <DndContext
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//         modifiers={[restrictToVerticalAxis]}
//       >
//         <SortableContext items={items.map((item) => item.id)}>
//           <div className="space-y-2">
//             {items.map((item, index) => (
//               <SortableItem key={item.id} id={item.id}>
//                 <div className="p-4 border border-gray-300 rounded-lg flex justify-between items-center space-x-4 hover:shadow-lg transition-shadow">
//                   <BarChart2 size={18} className="cursor-move" />
//                   {item.isEditing ? (
//                     <input
//                       type="text"
//                       value={item.text}
//                       onChange={(e) => handleInputChange(index, e.target.value)}
//                       className="w-full p-2 border rounded-md"
//                     />
//                   ) : (
//                     <span className="flex-grow">{item.text}</span>
//                   )}
//                   {item.isEditing ? (
//                     <button
//                       onClick={() => handleSaveClick(index)}
//                       className="text-green-500 hover:text-green-700"
//                     >
//                       <CheckCircle size={18} />
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleEditClick(index)}
//                       className="text-gray-500 hover:text-gray-700"
//                     >
//                       <Edit2 size={18} />
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleDeleteClick(index)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               </SortableItem>
//             ))}
//           </div>
//         </SortableContext>
//       </DndContext>

//       {/* Input to add new option */}
//       <div className="flex items-center space-x-2">
//         <input
//           type="text"
//           value={newOption}
//           onChange={(e) => setNewOption(e.target.value)}
//           placeholder="Add new option"
//           className="w-full p-2 border rounded-md"
//         />
//         <button
//           onClick={handleAddOption}
//           className="text-blue-500 hover:text-blue-700 flex items-center"
//         >
//           <PlusCircle size={18} className="mr-1" />
//           Add
//         </button>
//       </div>

//       {/* Display error message if exists */}
//       {error && <p className="text-red-500 text-sm">{error}</p>}
//     </div>
//   );
// };

// export default RankingField;

// import { useState } from 'react';
// import { DndContext, closestCenter } from '@dnd-kit/core';
// import { arrayMove, SortableContext } from '@dnd-kit/sortable';
// import { SortableItem } from '../FieldActions/SortableItem'; // Ensure you have a SortableItem component
// import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
// import { BarChart2, Edit2, CheckCircle, Trash2, PlusCircle } from 'lucide-react'; // Icons from lucide-react
// import { nanoid } from 'nanoid'; // Unique ID generator for options

// const RankingField = () => {
//   const [items, setItems] = useState<{ id: string; text: string; isEditing: boolean }[]>([]);
//   const [newOption, setNewOption] = useState('');
//   const [error, setError] = useState('');

//   // Handle drag end event
//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;
//     if (active.id !== over?.id) {
//       setItems((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over?.id);
//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   // Handle edit click
//   // const handleEditClick = (id: string) => {
//   //   setItems((prevItems) =>
//   //     prevItems.map((item) =>
//   //       item.id === id ? { ...item, isEditing: !item.isEditing } : { ...item, isEditing: false }
//   //     )
//   //   );
//   // };
//   const handleEditClick = (id: string) => {
//     setItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, isEditing: !item.isEditing } : item
//       )
//     );
//   };
  

//   // Handle save after editing
//   // const handleSaveClick = (id: string) => {
//   //   setItems((prevItems) =>
//   //     prevItems.map((item) =>
//   //       item.id === id ? { ...item, isEditing: false } : item
//   //     )
//   //   );
//   // };
//   const handleSaveClick = (id: string) => {
//     setItems((prevItems) =>
//       prevItems.map((item) => {
//         if (item.id === id) {
//           if (item.text.trim() === '') {
//             // If the text is empty, don't save and keep editing
//             return { ...item, isEditing: true };
//           }
//           // Check for duplicates
//           const isDuplicate = prevItems.some(
//             (otherItem) => otherItem.id !== id && otherItem.text === item.text.trim()
//           );
//           if (isDuplicate) {
//             // If it's a duplicate, don't save and keep editing
//             return { ...item, isEditing: true };
//           }
//           // If valid, save and stop editing
//           return { ...item, isEditing: false, text: item.text.trim() };
//         }
//         return item;
//       })
//     );
//     setError(''); // Clear any existing error messages
//   };

//   // Handle change in the input field
//   const handleInputChange = (id: string, value: string) => {
//     setItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, text: value } : item
//       )
//     );
//   };

//   // Handle delete item
//   const handleDeleteClick = (id: string) => {
//     setItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   // Handle adding a new option
//   const handleAddOption = () => {
//     if (newOption.trim() === '') {
//       setError('Option cannot be empty');
//       return;
//     }
//     if (items.some((item) => item.text === newOption.trim())) {
//       setError('Duplicate option not allowed');
//       return;
//     }
//     setItems((prevItems) => [
//       ...prevItems,
//       { id: nanoid(), text: newOption.trim(), isEditing: false },
//     ]);
//     setNewOption(''); // Clear the input field after adding
//     setError(''); // Clear the error message
//   };

//   return (
//     <div className="space-y-4">
//       <label className="block text-sm font-medium text-gray-700">Rank the following:</label>
      
//       <DndContext
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//         modifiers={[restrictToVerticalAxis]}
//       >
//         <SortableContext items={items.map((item) => item.id)}>
//           <div className="space-y-2">
//             {items.map((item) => (
//               <SortableItem key={item.id} id={item.id}>
//                 <div className="p-4 border border-gray-300 rounded-lg flex justify-between items-center space-x-4 hover:shadow-lg transition-shadow">
//                   <BarChart2 size={18} className="cursor-move" />
//                   {item.isEditing ? (
//                     <input
//                       type="text"
//                       value={item.text}
//                       onChange={(e) => handleInputChange(item.id, e.target.value)}
//                       className="w-full p-2 border rounded-md"
//                       autoFocus
//                     />
//                   ) : (
//                     <span className="flex-grow">{item.text}</span>
//                   )}
//                   {item.isEditing ? (
//                     <button
//                       onClick={() => handleSaveClick(item.id)}
//                       className="text-green-500 hover:text-green-700"
//                     >
//                       <CheckCircle size={18} />
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleEditClick(item.id)}
//                       className="text-gray-500 hover:text-gray-700"
//                     >
//                       <Edit2 size={18} />
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleDeleteClick(item.id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               </SortableItem>
//             ))}
//           </div>
//         </SortableContext>
//       </DndContext>

//       {/* Input to add new option */}
//       <div className="flex items-center space-x-2">
//         <input
//           type="text"
//           value={newOption}
//           onChange={(e) => setNewOption(e.target.value)}
//           placeholder="Add new option"
//           className="w-full p-2 border rounded-md"
//         />
//         <button
//           onClick={handleAddOption}
//           className="text-blue-500 hover:text-blue-700 flex items-center"
//         >
//           <PlusCircle size={18} className="mr-1" />
//           Add
//         </button>
//       </div>

//       {/* Display error message if exists */}
//       {error && <p className="text-red-500 text-sm">{error}</p>}
//     </div>
//   );
// };

// export default RankingField;

