import React from 'react';  
import { 
  Heading1, Heading2, List, ListOrdered, Type, AlignLeft, CheckSquare, ToggleLeft, 
  ChevronDown, Calendar, Clock, Upload, Star, BarChart, Mail, Phone, LinkIcon, Grid, PenTool, BarChart2
} from 'lucide-react';
import { CommandItem } from './TypeSuggestion';

export const questionFields: CommandItem[] = [
  { title: "Heading 1", description: "Add a large heading", icon: React.createElement(Type, { size: 18 }), type: "heading", attrs: { level: 1 } },
  { title: "Heading 2", description: "Add a medium heading", icon: React.createElement(Type, { size: 18 }), type: "heading", attrs: { level: 2 } },
  { title: "Bullet List", description: "Create a bulleted list", icon: React.createElement(List, { size: 18 }), type: "bulletList" },
  { title: "Numbered List", description: "Create a numbered list", icon: React.createElement(ListOrdered, { size: 18 }), type: "orderedList" },
  { title: "Short Text", description: "Single line text input", icon: React.createElement(Type, { size: 18 }), type: "formField", attrs: { fieldType: 'shortText' } },
  { title: "Long Text", description: "Multi-line text input", icon: React.createElement(AlignLeft, { size: 18 }), type: "formField", attrs: { fieldType: 'longText' } },
  { title: "Email", description: "Email input field", icon: React.createElement(Mail, { size: 18 }), type: "formField", attrs: { fieldType: 'email' } },
  { title: "Phone Number", description: "Phone number input", icon: React.createElement(Phone, { size: 18 }), type: "formField", attrs: { fieldType: 'phone' } },
  { title: "Link", description: "URL input", icon: React.createElement(LinkIcon, { size: 18 }), type: "formField", attrs: { fieldType: 'link' } },
  { title: "Checkbox", description: "Multiple selection from options", icon: React.createElement(CheckSquare, { size: 18 }), type: "formField", attrs: { fieldType: 'checkbox' } },
  { title: "Multi-Select", description: "Multiple selection from options", icon: React.createElement(CheckSquare, { size: 18 }), type: "formField", attrs: { fieldType: 'multiSelect' }},
  { title: "Dropdown", description: "Select from a list of options", icon: React.createElement(ChevronDown, { size: 18 }), type: "formField", attrs: { fieldType: 'dropdown' } },
  { title: "Multiple Choice", description: "Single selection from multiple options", icon: React.createElement(ToggleLeft, { size: 18 }), type: "formField", attrs: { fieldType: 'multipleChoice' } },
  { title: "Date", description: "Date picker input", icon: React.createElement(Calendar, { size: 18 }), type: "formField", attrs: { fieldType: 'date' } },
  { title: "Time", description: "Time picker input", icon: React.createElement(Clock, { size: 18 }), type: "formField", attrs: { fieldType: 'time' } },
  { title: "File Upload", description: "Allow file uploads", icon: React.createElement(Upload, { size: 18 }), type: "formField", attrs: { fieldType: 'fileUpload' } },
  { title: "Rating", description: "Star rating input", icon: React.createElement(Star, { size: 18 }), type: "formField", attrs: { fieldType: 'rating' } },
  { title: "Linear Scale", description: "Numerical scale input", icon: React.createElement(BarChart, { size: 18 }), type: "formField", attrs: { fieldType: 'linearScale' } },
  { title: "Matrix Table", description: "Matrix selection input", icon: React.createElement(Grid, { size: 18 }), type: "formField", attrs: { fieldType: 'matrixTable' } },
  { title: "Signature",description: "Capture user's handwritten signature", icon: React.createElement(PenTool, { size: 18 }), type: "formField", attrs: { fieldType: 'signature' }},
  { title: "Ranking", description: "Rank items in order of preference", icon: React.createElement(BarChart2, { size: 18 }), type: "formField", attrs: { fieldType: 'ranking' }},
  
];