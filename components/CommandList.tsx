import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Check, ChevronRight } from "lucide-react";

interface CommandItem {
  title: string;
  description: string;
  type: string;
  icon: React.ReactNode;
  attrs?: Record<string, any>;
}

interface CommandListProps {
  items: CommandItem[];
  command: (item: CommandItem) => void;
}

const CommandList = forwardRef<unknown, CommandListProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items = props.items || [];
  console.log("items", items);

  const selectItem = (index: number) => {
    const item = items[index];
    console.log("item", item);
    if (item) {
      props.command(item);
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + items.length - 1) % items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {

      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }
      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }
      if (event.key === "Enter") {
        enterHandler();
        return true;
      }
      return false;
    },
  }));

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden max-h-80 overflow-y-auto border border-gray-200">
      {items.map((item: CommandItem, index: number) => (
        <button
          className={`flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
            index === selectedIndex ? "bg-blue-50" : ""
          }`}
          key={index}
          onClick={() => selectItem(index)}
          aria-selected={index === selectedIndex}
          role="option"
        >
          <div className="flex-shrink-0 w-6 h-6 mr-3 text-gray-500">
            {item.icon}
          </div>
          <div className="flex-grow">
            <div className="font-medium text-gray-900">{item.title}</div>
            <div className="text-sm text-gray-500">{item.description}</div>
          </div>
          {index === selectedIndex && (
            <div className="flex-shrink-0 ml-3 text-blue-500">
              <Check size={18} />
            </div>
          )}
          {item.type === "submenu" && (
            <div className="flex-shrink-0 ml-3 text-gray-400">
              <ChevronRight size={30} />
            </div>
          )}
        </button>
      ))}
    </div>
  );
});

CommandList.displayName = "CommandList";

export default CommandList;
