// "use client";
// import React, { useState, useCallback, useEffect } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import { TypeSuggestion } from "./extensions/TypeSuggestion";
// import { FormField} from "./extensions/FormField";
// import Placeholder from "@tiptap/extension-placeholder";
// import { Button } from "@/components/ui/button";
// import { Bold, Italic, List, ListOrdered } from "lucide-react";
// import "@/styles/global.css";

// const TiptapEditor = () => {
//   const [editorContent, setEditorContent] = useState("");
//   const [previewMode, setPreviewMode] = useState(false);
//   const [formTitle, setFormTitle] = useState("");

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         heading: {
//           levels: [1, 2, 3],
//         },
//       }),
//       TypeSuggestion,
//       FormField,
//       Placeholder.configure({
//         placeholder: "Type / to insert a field...",
//         showOnlyWhenEditable: true,
//         emptyEditorClass: "is-editor-empty",
//         emptyNodeClass: "is-empty",
//       }),
//     ],
//     content: "",
//     onUpdate: ({ editor }) => {
//       const json = editor.getJSON();
//       console.log("Editor content updated:", json);
//     },
//     editorProps: {
//       attributes: {
//         class: "prose max-w-none focus:outline-none tiptapEditor",
//       },
//     },
//   });
//   useEffect(() => {
//     const titleElement = document.querySelector('.content-editable-block') as HTMLDivElement;
//     if (titleElement) {
//       const range = document.createRange();
//       const sel = window.getSelection();
//       range.setStart(titleElement, titleElement.childNodes.length);
//       range.collapse(true);
//       sel?.removeAllRanges();
//       sel?.addRange(range);
//     }
//   }, [formTitle]);

//   const togglePreviewMode = useCallback(() => {
//     setPreviewMode((prev) => !prev);
//   }, []);

//   const handleSubmit = useCallback(
//     (event: React.FormEvent) => {
//       event.preventDefault();
//       console.log("Form submitted:", {
//         title: formTitle,
//         content: editorContent
//       });
//     },
//     [formTitle, editorContent]
//   );

//   if (!editor) {
//     return null;
//   }

//   const handleTitleChange = (e: React.FormEvent<HTMLDivElement>) => {
//     setFormTitle(e.currentTarget.textContent || "");
//     console.log("Form Title:", formTitle);
//   };


//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <div className="flex justify-center items-center border-b border-gray-300">
//          <div
//           className="content-editable-block text-3xl font-bold border-none outline-none text-center w-full max-w-lg"
//           contentEditable={true}
//           data-placeholder="Form Title"
//           onInput={handleTitleChange}
//           onBlur={handleTitleChange}
//           suppressContentEditableWarning={true}
//         >
//           {formTitle}
//         </div>
//       </div>

//       <div className="p-4 max-w-3xl mx-auto border border-gray-300 rounded-lg">
//         {!previewMode && (
//           <div className="mb-4 flex space-x-2">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => editor.chain().focus().toggleBold().run()}
//               className={editor.isActive("bold") ? "is-active" : ""}
//             >
//               <Bold className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => editor.chain().focus().toggleItalic().run()}
//               className={editor.isActive("italic") ? "is-active" : ""}
//             >
//               <Italic className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => editor.chain().focus().toggleBulletList().run()}
//               className={editor.isActive("bulletList") ? "is-active" : ""}
//             >
//               <List className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => editor.chain().focus().toggleOrderedList().run()}
//               className={editor.isActive("orderedList") ? "is-active" : ""}
//             >
//               <ListOrdered className="h-4 w-4" />
//             </Button>
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="cursor relative">
//             {previewMode ? (
//               <div
//                 className="prose max-w-none border border-gray-300 rounded-lg p-4 mt-5"
//                 dangerouslySetInnerHTML={{ __html: editorContent }}
//               />
//             ) : (
//               <EditorContent
//                 editor={editor}
//                 className="prose max-w-none mb-5 tiptapEditor"
//               />
//             )}
//           </div>
//           <div className="mt-8 flex justify-between">
//             <Button type="button" onClick={togglePreviewMode}>
//               {previewMode ? "Edit" : "Preview"}
//             </Button>
//             <Button type="submit">Submit Form</Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TiptapEditor;

// above code is for tiptap editor

"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TypeSuggestion } from "./extensions/TypeSuggestion";
import { FormField } from "./extensions/FormField";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered, Eye, EyeOff, Save } from "lucide-react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import FormFieldComponent from "./FormFieldComponent";
import { validateForm } from "./FormValidation";
import "@/styles/global.css";
import { toast } from "react-hot-toast";

interface FormFieldType {
  id: string;
  fieldType: string;
  label: string;
  isRequired: boolean;
  options?: string[];
  fieldContent?: string | string[];
  placeholder?: string;
}

interface FormDataType {
  [key: string]: string | string[];
}

const TiptapEditor: React.FC = () => {
  const [editorContent, setEditorContent] = useState<string>("");
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [formTitle, setFormTitle] = useState<string>("");
  const [formFields, setFormFields] = useState<FormFieldType[]>([]);
  const [formData, setFormData] = useState<FormDataType>({});

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TypeSuggestion,
      FormField.configure({
        onUpdate: (field: FormFieldType) => {
          setFormFields((prev) => {
            const index = prev.findIndex((f) => f.id === field.id);
            if (index !== -1) {
              return [...prev.slice(0, index), field, ...prev.slice(index + 1)];
            }
            return [...prev, field];
          });
        },
      }),
      Placeholder.configure({
        placeholder: "Type / to insert a field...",
        showOnlyWhenEditable: true,
        emptyEditorClass: "is-editor-empty",
        emptyNodeClass: "is-empty",
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setEditorContent(editor.getHTML());
      console.log("Editor content updated:", json);
      
      const newFormFields = json.content
        ? json.content.filter((node: any) => node.type === 'formField')
            .map((node: any) => ({
          id: node.attrs.id,
          fieldType: node.attrs.fieldType,
          label: node.attrs.label,
          isRequired: node.attrs.isRequired,
          options: node.attrs.options,
          fieldContent: node.attrs.fieldContent,
          placeholder: node.attrs.placeholder,
        }))
        : [];
      setFormFields(newFormFields);
    },
    editorProps: {
      attributes: {
        tabIndex: '-1',
        class: "prose max-w-none focus:outline-none tiptapEditor min-h-[300px] p-4",
      },
    },
  });

  useEffect(() => {
    if (editor) { // Check if the editor is initialized
      // Add an event listener to handle clicks within the editor
      editor.view.dom.addEventListener('mousedown', (event) => {
        const target = event.target as HTMLElement;
  
        // Check if the clicked element is within a form field
        if (target.closest('[data-form-field]')) {
          // Prevent the editor from taking focus
          event.stopImmediatePropagation();
          event.preventDefault();
  
          // Optionally, you can focus the specific form field here
          // target.closest('[data-form-field]')?.focus();
        }
      });
    }
    // Clean up the event listener when the component unmounts
    return () => {
      if (editor) {
        editor.view.dom.removeEventListener('mousedown', () => {
          // ... (same event handler logic as above)
        });
      }
    };
  }, [editor]); // Add editor to the dependency array

  useEffect(() => {
    const titleElement = document.querySelector('.content-editable-block') as HTMLDivElement;
    if (titleElement) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(titleElement, titleElement.childNodes.length);
      range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [formTitle]);

  const togglePreviewMode = useCallback(() => {
    setPreviewMode((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const { isValid, errors } = validateForm(formFields, formData);

      if (!isValid) {
        errors.forEach((error) => toast.error(error));
        return;
      }

      try {
        const response = await fetch('/api/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: formTitle,
            fields: formFields,
            data: formData,
          }),
        });

        if (response.ok) {
          toast.success("Form submitted successfully!");
          setFormData({});
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error("An error occurred while submitting the form. Please try again.");
      }
    },
    [formTitle, formFields, formData]
  );

  const handleTitleChange = (e: React.FormEvent<HTMLDivElement>) => {
    setFormTitle(e.currentTarget.textContent || "");
  };

  const handleFieldChange = useCallback((fieldId: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  }, []);

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const newFields = Array.from(formFields);
    const [reorderedField] = newFields.splice(result.source.index, 1);
    newFields.splice(result.destination.index, 0, reorderedField);

    setFormFields(newFields);
    
    // Update the editor content
    editor?.commands.moveFormField(result.draggableId, result.destination.index);
  }, [formFields, editor]);

  // const deleteField = useCallback((fieldId: string) => {
  //   setFormFields((prev) => prev.filter((field) => field.id !== fieldId));
  //   setFormData((prev) => {
  //     const { [fieldId]: _, ...rest } = prev;
  //     return rest;
  //   });
    
  //   editor?.chain().focus().deleteFormField(fieldId).run();
  // }, [editor]);

  const renderPreview = () => {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold mb-6">{formTitle}</h1>
        {formFields.map((field) => (
          <div key={field.id} className="mb-4">
            <FormFieldComponent
              node={{
                attrs: {
                  ...field,
                  fieldContent: formData[field.id] || '',
                },
              }}
              updateAttributes={(attrs) => {
                handleFieldChange(field.id, attrs.fieldContent);
              }}
              deleteNode={() => {}}
            />
          </div>
        ))}
      </div>
    );
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-center items-center border-b border-gray-300 mb-4">
        <div
          className="content-editable-block text-3xl font-bold border-none outline-none text-center w-full max-w-lg p-2"
          contentEditable={true}
          data-placeholder="Form Title"
          onInput={handleTitleChange}
          onBlur={handleTitleChange}
          suppressContentEditableWarning={true}
        >
          {formTitle}
        </div>
      </div>

      

      <div className="bg-white border border-gray-300 rounded-lg shadow-md">
        {!previewMode && (
          <div className="mb-4 flex space-x-2 p-2 border-b">
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "is-active" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive("orderedList") ? "is-active" : ""}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="cursor-text">
            {previewMode ? (
              renderPreview()
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="form-fields">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <EditorContent
                        editor={editor}
                        className="prose max-w-none mb-5 tiptapEditor"
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>
          <div className="mt-8 flex justify-between p-4 border-t">
            <Button type="button" onClick={togglePreviewMode}>
              {previewMode ? <EyeOff className="mr-2" /> : <Eye className="mr-2" />}
              {previewMode ? "Edit" : "Preview"}
            </Button>
            <Button type="submit">
              <Save className="mr-2" />
              Submit Form
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TiptapEditor;