import { useState } from 'react';
import { CheckCircle, Trash2, Edit2, PlusCircle } from 'lucide-react';
import { nanoid } from 'nanoid';

const MultipleChoiceField = () => {
  const [items, setItems] = useState<{ id: string; text: string; isEditing: boolean; tempText: string }[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [newOption, setNewOption] = useState('');
  const [error, setError] = useState('');

  const handleAddOption = () => {
    if (newOption.trim() === '') {
      setError('Option cannot be empty');
      return;
    }
    setItems((prevItems) => [
      ...prevItems,
      { id: nanoid(), text: newOption.trim(), isEditing: false, tempText: newOption.trim() },
    ]);
    setNewOption('');
    setError('');
  };

  const handleEdit = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  const handleSave = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: item.tempText, isEditing: false } : item
      )
    );
  };

  const handleChange = (id: string, value: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, tempText: value } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Multiple Choice:</label>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <input
              type="radio"
              name="multipleChoice"
              checked={selected === item.id}
              onChange={() => setSelected(item.id)}
              className="mr-2"
            />
            {item.isEditing ? (
              <input
                type="text"
                value={item.tempText}
                onChange={(e) => handleChange(item.id, e.target.value)}
                className="p-2 border rounded-md"
              />
            ) : (
              <span>{item.text}</span>
            )}
            {item.isEditing ? (
              <button onClick={() => handleSave(item.id)}>
                <CheckCircle size={18} className="text-green-500" />
              </button>
            ) : (
              <button onClick={() => handleEdit(item.id)}>
                <Edit2 size={18} className="text-gray-500" />
              </button>
            )}
            <button onClick={() => handleDelete(item.id)}>
              <Trash2 size={18} className="text-red-500" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Add new option"
          className="w-full p-2 border rounded-md"
        />
        <button onClick={handleAddOption} className="text-blue-500">
          <PlusCircle size={18} />
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default MultipleChoiceField;
