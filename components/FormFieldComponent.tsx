// //FormFieldComponent.tsx
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { NodeViewWrapper } from "@tiptap/react";
// import { Button } from "@/components/ui/button";
// import { Trash2 } from "lucide-react";
// import "@/styles/global.css";

// interface FormFieldComponentProps {
//   node: any;
//   updateAttributes: (attrs: any) => void;
//   deleteNode: () => void;
//   editor: any;
// }

// const FormFieldComponent: React.FC<FormFieldComponentProps> = ({
//   node,
//   updateAttributes,
//   deleteNode,
//   editor,
// }) => {
//   const fieldType = node.attrs.fieldType;
//   const [isRequired, setIsRequired] = useState(node.attrs.isRequired || false);
//   const [showLabel, setShowLabel] = useState(true);
//   const [showField, setShowField] = useState(true);
//   const [label, setLabel] = useState(node.attrs.label || "");
//   const [fieldContent, setFieldContent] = useState(node.attrs.fieldContent || "");
//   const labelRef = useRef<HTMLDivElement>(null);
//   const fieldRef = useRef<HTMLDivElement>(null);
//   const [lastUpdated, setLastUpdated] = useState<'label' | 'field' | null>(null);
//   const [isShaking, setIsShaking] = useState(false);
  
//   useEffect(() => {
//     updateAttributes({
//       isRequired,
//       label,
//       fieldContent,
//     });
//     console.log("Component updated. Current node attrs:", node.attrs);
//   }, [isRequired, label, fieldContent, updateAttributes, node.attrs]);

//   useEffect(() => {
//     if (fieldRef.current) {
//       fieldRef.current.focus(); // Set focus back to the field when it mounts
//     }
//   }, []);

//   // useEffect(() => {
//   //   const handleKeyDown = (event: KeyboardEvent) => {
//   //     if (event.key === 'Backspace' && editor.state.selection.$anchor.pos === editor.state.selection.$anchor.start()) {
//   //       const node = editor.state.selection.$anchor.node();
//   //       if (node.type.name === 'formField' && node.textContent.length === 0) {
//   //         event.preventDefault();
//   //         setIsShaking(true);
//   //         setTimeout(() => setIsShaking(false), 500);
//   //       }
//   //     }
//   //   };

//   //   editor.view.dom.addEventListener('keydown', handleKeyDown);

//   //   return () => {
//   //     editor.view.dom.removeEventListener('keydown', handleKeyDown);
//   //   };
//   // }, [editor]);

//   const handleDeleteLabel = useCallback(() => {
//     setShowLabel(false);
//     updateAttributes({ labelDeleted: true });
//     console.log("Label deleted");
//   }, [updateAttributes]);

//   const handleDeleteField = useCallback(() => {
//     setShowField(false);
//     updateAttributes({ fieldDeleted: true });
//     console.log("Field deleted");
//   }, [updateAttributes]);

//   const handleLabelChange = useCallback((event: React.FormEvent<HTMLDivElement>) => {
//     const newLabel = event.currentTarget.textContent || "";
//     setLabel(newLabel);
//   }, []);

//   const handleFieldChange = useCallback((event: React.FormEvent<HTMLDivElement>) => {
//     const newContent = event.currentTarget.textContent || "";
//     setFieldContent(newContent);
//   }, []);

//   const toggleRequired = useCallback(() => {
//     setIsRequired((prev: boolean) => !prev);
//   }, []);

//   const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
//     // Prevent the editor from taking focus when typing in the content-editable div
//     event.stopPropagation();
//   }, []);

//   const renderField = () => {
//     let placeholder = "Type your answer here";
//     let className = "content-editable-block field-input w-full min-h-[2em] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

//     switch (fieldType) {
//       case "longText":
//         placeholder = "Type a long answer";
//         className += " longText min-h-[100px]";
//         break;
//       case "email":
//         placeholder = "Enter your email";
//         className += " email-input";
//         break;
//       case "phone":
//         placeholder = "Enter your phone number";
//         break;
//       case "date":
//         placeholder = "Select a date";
//         break;
//       case "time":
//         placeholder = "Select a time";
//         break;
//       case "multipleChoice":
//       case "checkbox":
//       case "multiSelect":
//       case "dropdown":
//         placeholder = "Add options (one per line)";
//         className += " min-h-[100px]";
//         break;
//     }

//     return (
//       <div className="relative">
//         <div
//           ref={fieldRef}
//           className={className}
//           data-placeholder={placeholder}
//           contentEditable
//           onInput={handleFieldChange}
//           onKeyDown={handleKeyDown}
//           onFocus={() => fieldRef.current?.focus()} // Set focus on the field when it is focused
//           tabIndex={0}
//           data-is-folded = "false"
//           data-is-selectable="true"
//           dangerouslySetInnerHTML={{ __html: fieldContent || "" }}
//         />
//       </div>
//     );
//   };

//   return (
//     <NodeViewWrapper>
//       <div className="form-field-content space-y-4 border border-gray-700 p-4 relative">
//         {showLabel && (
//           <div className="flex items-center relative group">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute -left-12 transition-opacity duration-200 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 focus:outline-none opacity-0 group-hover:opacity-100"
//               onClick={handleDeleteLabel}
//               aria-label="Delete label"
//             >
//               <Trash2 className="h-4 w-4" />
//             </Button>

//             <div className="relative w-full">
//               <div
//                 ref={labelRef}
//                 className="bg-transparent border-none flex-grow font-bold text-2xl focus:outline-none placeholder-gray-400 mb-0 pb-0 pr-8"
//                 contentEditable
//                 data-placeholder="Type a question"
//                 tabIndex={0}
//                 data-is-folded = "false"
//                 data-is-selectable="true"
//                 onInput={handleLabelChange}
//                 dangerouslySetInnerHTML={{ __html: label || "" }}
//               />
//               <div className="absolute top-1/2 transform -translate-y-1/2 right-2 text-black font-bold text-xl">
//                 <span
//                   className={`absolute top-1/2 right-2 transform -translate-y-1/2 text-black font-bold text-xl cursor-pointer ${
//                     isRequired ? "opacity-100" : "opacity-50"
//                   }`}
//                   onClick={toggleRequired}
//                 >
//                   *
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}

//         {showField && (
//           <div className="relative group">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute -left-12 transition-opacity duration-200 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 focus:outline-none opacity-0 group-hover:opacity-100"
//               onClick={handleDeleteField}
//               aria-label="Delete field"
//             >
//               <Trash2 className="h-4 w-4" />
//             </Button>
//             {renderField()}
//           </div>
//         )}
//       </div>
//     </NodeViewWrapper>
//   );
// };

// export default FormFieldComponent;
//============================================================cursorrrrrr

// import React, { useState, useCallback, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Trash2, ChevronUp, ChevronDown, ChevronDown as DropdownIcon } from "lucide-react";
// import { NodeViewWrapper, NodeViewContent, NodeViewProps } from "@tiptap/react";

// interface FormFieldComponentProps{
//   node: {
//     attrs: {
//       id: string;
//       fieldType: string;
//       label: string;
//       isRequired: boolean;
//       options?: string[];
//       fieldContent?: string | string[];
//     };
//   };
//   updateAttributes: (attrs: Record<string, any>) => void;
//   deleteNode: () => void;
// }

// const FormFieldComponent: React.FC<NodeViewProps & Omit<FormFieldComponentProps, keyof NodeViewProps>> = ({
//   node,
//   updateAttributes,
//   deleteNode,
// }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [fieldValue, setFieldValue] = useState<string | string[]>('');

//   const handleFocus = useCallback(() => setIsFocused(true), []);
//   const handleBlur = useCallback(() => setIsFocused(false), []);
//   const handleMouseEnter = useCallback(() => setIsHovered(true), []);
//   const handleMouseLeave = useCallback(() => setIsHovered(false), []);

//   const handleChange = useCallback((e: React.FormEvent<HTMLDivElement>) => {
//     const newValue = e.currentTarget.textContent || '';
//     setFieldValue(newValue);
//     updateAttributes({ fieldContent: newValue });
//   }, [updateAttributes]);

//   const handleLabelChange = useCallback((e: React.FormEvent<HTMLSpanElement>) => {
//     const newLabel = e.currentTarget.textContent || '';
//     updateAttributes({ label: newLabel });
//   }, [updateAttributes]);

//   const renderField = useCallback(() => {
//     const { fieldType, options } = node.attrs;

//     const commonProps = {
//       contentEditable: true,
//       onInput: handleChange,
//       onFocus: handleFocus,
//       tabIndex: 0,
//       onBlur: handleBlur,
//       className: `w-full p-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//         isFocused ? 'ring-2 ring-blue-500' : ''
//       }`,
//     };

//     switch (fieldType) {
//       case "shortText":
//       case "email":
//       case "phone":
//       case "date":
//       case "time":
//         return <div {...commonProps} />;
//       case "longText":
//         return <div {...commonProps} className={`${commonProps.className} min-h-[100px]`} />;
//       case "multipleChoice":
//         return (
//           <div className="space-y-2">
//             {options?.map((option: string, index: number) => (
//               <div key={index} className="flex items-center">
//                 <div
//                   className={`w-4 h-4 rounded-full border mr-2 ${fieldValue === option ? 'bg-blue-500' : ''}`}
//                   onClick={() => {
//                     setFieldValue(option);
//                     updateAttributes({ fieldContent: option });
//                   }}
//                 />
//                 <span>{option}</span>
//               </div>
//             ))}
//           </div>
//         );
//       case "checkbox":
//         return (
//           <div className="space-y-2">
//             {options?.map((option: string, index: number) => (
//               <div key={index} className="flex items-center">
//                 <div
//                   className={`w-4 h-4 rounded border mr-2 ${Array.isArray(fieldValue) && fieldValue.includes(option) ? 'bg-blue-500' : ''}`}
//                   onClick={() => {
//                     const newValue = Array.isArray(fieldValue) && fieldValue.includes(option)
//                       ? (fieldValue as string[]).filter((v) => v !== option)
//                       : [...(fieldValue as string[]), option];
//                     setFieldValue(newValue);
//                     updateAttributes({ fieldContent: newValue });
//                   }}
//                 />
//                 <span>{option}</span>
//               </div>
//             ))}
//           </div>
//         );
//       case "dropdown":
//         return (
//           <div className="relative">
//             <div {...commonProps} className={`${commonProps.className} appearance-none`} />
//             <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//               <DropdownIcon className="h-4 w-4 text-gray-400" />
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   }, [node.attrs, fieldValue, handleChange, handleFocus, handleBlur, isFocused, updateAttributes]);

//   return (
//     <NodeViewWrapper className="space-y-2 relative group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//       <div className="flex justify-between items-center">
//         <div className="flex items-center space-x-2 relative">
//           {isHovered && (
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => updateAttributes({ label: '' })}
//               className="absolute -left-10 text-red-600 hover:bg-red-100 hover:text-red-700"
//             >
//               <Trash2 className="h-4 w-4" />
//             </Button>
//           )}
//           <label className="font-semibold">
//             <span
//               contentEditable
//               suppressContentEditableWarning
//               onInput={handleLabelChange}
//             >
//               {node.attrs.label}
//             </span>
//             {node.attrs.isRequired && <span className="text-red-500 ml-1">*</span>}
//           </label>
//         </div>
//         <div className="flex space-x-2">
//           <Button variant="ghost" size="icon" onClick={deleteNode} className="text-red-600 hover:bg-red-100 hover:text-red-700">
//             <Trash2 className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//       <div className="relative">
//         {renderField()}
//         {/* <NodeViewContent>{renderField()}</NodeViewContent> */}
//       </div>
//     </NodeViewWrapper>
//   );
// };

// export default FormFieldComponent;
//----------------------------------

// import React, { useState, useCallback, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Trash2, ChevronUp, ChevronDown, ChevronDown as DropdownIcon } from "lucide-react";
// import { NodeViewWrapper, NodeViewContent, NodeViewProps } from "@tiptap/react";

// interface FormFieldComponentProps{
//   node: {
//     attrs: {
//       id: string;
//       fieldType: string;
//       label: string;
//       isRequired: boolean;
//       options?: string[];
//       fieldContent?: string | string[];
//     };
//   };
//   updateAttributes: (attrs: Record<string, any>) => void;
//   deleteNode: () => void;
// }

// const FormFieldComponent: React.FC<NodeViewProps & Omit<FormFieldComponentProps, keyof NodeViewProps>> = ({
//   node,
//   updateAttributes,
//   deleteNode,
// }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [fieldValue, setFieldValue] = useState<string | string[]>('');

//   const handleFocus = useCallback(() => setIsFocused(true), []);
//   const handleBlur = useCallback(() => setIsFocused(false), []);
//   const handleMouseEnter = useCallback(() => setIsHovered(true), []);
//   const handleMouseLeave = useCallback(() => setIsHovered(false), []);

//   const handleChange = useCallback((e: React.FormEvent<HTMLDivElement>) => {
//     const newValue = e.currentTarget.textContent || '';
//     setFieldValue(newValue);
//     updateAttributes({ fieldContent: newValue });
//   }, [updateAttributes]);

//   const handleLabelChange = useCallback((e: React.FormEvent<HTMLSpanElement>) => {
//     const newLabel = e.currentTarget.textContent || '';
//     updateAttributes({ label: newLabel });
//   }, [updateAttributes]);

//   const renderField = useCallback(() => {
//     const { fieldType, options } = node.attrs;

//     const commonProps = {
//       contentEditable: true,
//       onInput: handleChange,
//       onFocus: handleFocus,
//       tabIndex: 0,
//       onBlur: handleBlur,
//       className: `w-full p-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//         isFocused ? 'ring-2 ring-blue-500' : ''
//       }`,
//     };

//     switch (fieldType) {
//       case "shortText":
//       case "email":
//       case "phone":
//       case "date":
//       case "time":
//         return <div {...commonProps} />;
//       case "longText":
//         return <div {...commonProps} className={`${commonProps.className} min-h-[100px]`} />;
//       case "multipleChoice":
//         return (
//           <div className="space-y-2">
//             {options?.map((option: string, index: number) => (
//               <div key={index} className="flex items-center">
//                 <div
//                   className={`w-4 h-4 rounded-full border mr-2 ${fieldValue === option ? 'bg-blue-500' : ''}`}
//                   onClick={() => {
//                     setFieldValue(option);
//                     updateAttributes({ fieldContent: option });
//                   }}
//                 />
//                 <span>{option}</span>
//               </div>
//             ))}
//           </div>
//         );
//       case "checkbox":
//         return (
//           <div className="space-y-2">
//             {options?.map((option: string, index: number) => (
//               <div key={index} className="flex items-center">
//                 <div
//                   className={`w-4 h-4 rounded border mr-2 ${Array.isArray(fieldValue) && fieldValue.includes(option) ? 'bg-blue-500' : ''}`}
//                   onClick={() => {
//                     const newValue = Array.isArray(fieldValue) && fieldValue.includes(option)
//                       ? (fieldValue as string[]).filter((v) => v !== option)
//                       : [...(fieldValue as string[]), option];
//                     setFieldValue(newValue);
//                     updateAttributes({ fieldContent: newValue });
//                   }}
//                 />
//                 <span>{option}</span>
//               </div>
//             ))}
//           </div>
//         );
//       case "dropdown":
//         return (
//           <div className="relative">
//             <div {...commonProps} className={`${commonProps.className} appearance-none`} />
//             <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//               <DropdownIcon className="h-4 w-4 text-gray-400" />
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   }, [node.attrs, fieldValue, handleChange, handleFocus, handleBlur, isFocused, updateAttributes]);

//   return (
//     <NodeViewWrapper className="space-y-2 relative group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//       <div className="flex justify-between items-center">
//         <div className="flex items-center space-x-2 relative">
//           {isHovered && (
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => updateAttributes({ label: '' })}
//               className="absolute -left-10 text-red-600 hover:bg-red-100 hover:text-red-700"
//             >
//               <Trash2 className="h-4 w-4" />
//             </Button>
//           )}
//           <label className="font-semibold">
//             <span
//               contentEditable
//               suppressContentEditableWarning
//               onInput={handleLabelChange}
//             >
//               {node.attrs.label}
//             </span>
//             {node.attrs.isRequired && <span className="text-red-500 ml-1">*</span>}
//           </label>
//         </div>
//         <div className="flex space-x-2">
//           <Button variant="ghost" size="icon" onClick={deleteNode} className="text-red-600 hover:bg-red-100 hover:text-red-700">
//             <Trash2 className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//       <div className="relative">
//         {renderField()}
//         {/* <NodeViewContent>{renderField()}</NodeViewContent> */}
//       </div>
//     </NodeViewWrapper>
//   );
// };

// export default FormFieldComponent;

//-------------------------------------------------

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";
import { NodeViewWrapper,NodeViewProps } from "@tiptap/react";

interface FormFieldComponentProps{
  node: {
    attrs: {
      id: string;
      fieldType: string;
      label: string;
      isRequired: boolean;
      options?: string[];
      fieldContent?: string | string[];
      placeholder?: string;
    };
  };
  updateAttributes: (attrs: Record<string, any>) => void;
  deleteNode: () => void;
}

const FormFieldComponent: React.FC<NodeViewProps & Omit<FormFieldComponentProps, keyof NodeViewProps>> = ({
  node,
  updateAttributes,
  deleteNode,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isRequired, setIsRequired] = useState(node.attrs.isRequired || false);

  const fieldRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  //const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const handleFieldFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    setIsFocused(true);
    // Try stopImmediatePropagation() if stopPropagation() doesn't work
    event?.stopPropagation; 
    event?.preventDefault();
  };

  const handleFieldClick = () => {
    fieldRef.current?.focus(); // Focus the field directly
  };

  const toggleRequired = useCallback(() => {
    setIsRequired((prev: boolean) => !prev);
  }, []);

  const handleChange = useCallback((e: React.FormEvent<HTMLDivElement>, attr: string) => {
    const newValue = e.currentTarget.textContent || '';
    updateAttributes({ [attr]: newValue });
  }, [updateAttributes]);

  useEffect(() => {
    const field = fieldRef.current;
    const label = labelRef.current;
    const placeholder = placeholderRef.current;

    if (field && label && placeholder) {
      field.textContent = Array.isArray(node.attrs.fieldContent) 
      ? node.attrs.fieldContent.join(', ') 
      : node.attrs.fieldContent || ''; 
          label.textContent = node.attrs.label || 'Click to edit label';
      placeholder.textContent = node.attrs.placeholder || 'Click to edit placeholder';
    }
  }, [node.attrs]);

  const renderField = useCallback(() => {
    const { fieldType, options, placeholder, fieldContent } = node.attrs;

    const commonProps = {
      contentEditable: true,
      onInput: (e: React.FormEvent<HTMLDivElement>) => handleChange(e, 'fieldContent'),
      // onFocus: handleFieldFocus,
      onclick: handleFieldClick,
      tabIndex: 0,
      onBlur: handleBlur,
      ref: fieldRef,
      'data-is-folded': "false",
      'data-is-selectable': "true",
      className: `w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        isFocused ? 'ring-2 ring-blue-500' : ''
      } min-h-[40px]`,
    };

    switch (fieldType) {
      case "shortText":
      case "email":
      case "phone":
      case "date":
      case "time":
        return <div {...commonProps} />;
      case "longText":
        return <div {...commonProps} className={`${commonProps.className} min-h-[100px]`} />;
      case "multipleChoice":
        return (
          <div className="space-y-2">
            {options?.map((option:string, index:number) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`${node.attrs.id}-${index}`}
                  name={node.attrs.id}
                  value={option}
                  checked={fieldContent === option}
                  onChange={() => updateAttributes({ fieldContent: option })}
                  className="mr-2"
                />
                <label htmlFor={`${node.attrs.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div className="space-y-2">
            {options?.map((option:string, index:number) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${node.attrs.id}-${index}`}
                  value={option}
                  checked={Array.isArray(fieldContent) && fieldContent.includes(option)}
                  onChange={() => {
                    const newValue = Array.isArray(fieldContent)
                      ? fieldContent.includes(option)
                        ? fieldContent.filter((v) => v !== option)
                        : [...fieldContent, option]
                      : [option];
                    updateAttributes({ fieldContent: newValue });
                  }}
                  className="mr-2"
                />
                <label htmlFor={`${node.attrs.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      case "dropdown":
        return (
          <select
            value={fieldContent as string}
            onChange={(e) => updateAttributes({ fieldContent: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{placeholder}</option>
            {options?.map((option:string, index:number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  }, [node.attrs, handleChange, handleFieldFocus, handleBlur, isFocused, updateAttributes]);

  return (
    <NodeViewWrapper
      className="space-y-2 relative group p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center mb-2">
        <div className="flex items-center space-x-2 w-full">
          <div className="absolute -left-14 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="relative flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={deleteNode}
                className="bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700 focus:outline-none"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
              <GripVertical
                className="text-gray-400 cursor-move"
                data-drag-handle
              />
            </div>
          </div>
          <div className="relative space-y-1 w-full"> {/* Added padding-left for icons */}
            <div
              className="absolute top-1/2 transform -translate-y-1/2 right-2 text-black font-bold text-xl"
            >
              <div
                className={`${
                  isRequired ? "opacity-100" : "opacity-0"
                } w-5 h-5 flex items-center justify-center pt-1.5 rounded-full shadow-sm bg-gray-100 hover:bg-gray-200 hover:text-black-700 focus:outline-none cursor-pointer`}
                onClick={toggleRequired}
                contentEditable={false}
              >
                *
              </div>
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleChange(e, "label")}
              ref={labelRef}
              data-placeholder="Enter the Label"
              tabIndex={0}
              data-is-folded="false"
              data-is-selectable="true"
              dangerouslySetInnerHTML={{
                __html: node.attrs.label || "",
              }}
              className="font-semibold outline-none w-full"
            />
          </div>
        </div>
      </div>
      <div className="relative">{renderField()}</div>
    </NodeViewWrapper>
  );
};

export default FormFieldComponent;