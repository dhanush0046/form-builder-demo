
//---------------------ffffffffffffffffffffffffffffffffffffffffffffffff

// import { Node, mergeAttributes } from '@tiptap/core';
// import { ReactNodeViewRenderer } from '@tiptap/react';
// import FormFieldComponent from '../FormFieldComponent';

// declare module '@tiptap/core' {
//   interface Commands<ReturnType> {
//     formField: {
//       setFormField: (attributes: { fieldType: string }) => ReturnType;
//       updateFormField: (attrs: Record<string, any>) => ReturnType;
//     }
//   }
// }

// export const FormField = Node.create({
//   name: 'formField',

//   group: 'block',

//   content: 'inline*',

//   draggable: true,

//   addAttributes() {
//     return {
//       fieldType: {
//         default: 'shortText',
//       },
//       isRequired: {
//         default: false,
//       },
//       label: {
//         default: '',
//       },
//       fieldContent: {
//         default: '',
//       },
//     };
//   },

//   parseHTML() {
//     return [
//       {
//         tag: 'div[data-type="form-field"]',
//       },
//     ];
//   },

//   renderHTML({ HTMLAttributes }) {
//     return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'form-field' }), 0];
//   },

//   addCommands() {
//     return {
//       setFormField:
//         (attributes) =>
//         ({ commands }) => {
//           return commands.insertContent({
//             type: this.name,
//             attrs: attributes,
//           });
//         },
//     };
//   },

//   addNodeView() {
//     return ReactNodeViewRenderer(FormFieldComponent);
//   },

  // addKeyboardShortcuts() {
  //   return {
  //     Backspace: ({ editor }) => {
  //       const { empty, $anchor } = editor.state.selection;
  //       const isAtStart = $anchor.pos === $anchor.start();

  //       if (empty && isAtStart) {
  //         const node = $anchor.node();
  //         if (node.type.name === 'formField' && node.textContent.length === 0) {
  //           return true; // Prevent deletion of empty form field
  //         }
  //       }

  //       return false; // Allow normal backspace behavior
  //     },
  //   };
  // },
//});
//--------------------------------------
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import FormFieldComponent from '../FormFieldComponent';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    formField: {
      setFormField: (attributes: { fieldType: string, label: string, isRequired: boolean, options?: string[], placeholder?: string }) => ReturnType;
      updateFormField: (attrs: Record<string, any>) => ReturnType;
      deleteFormField: (id: string) => ReturnType;
      moveFormField: (id: string, position: number) => ReturnType;
    }
  }
}

export const FormField = Node.create({
  name: 'formField',

  group: 'block',

  content: 'inline*',

  draggable: true,

  addAttributes() {
    return {
      id: {
        default: null,
      },
      fieldType: {
        default: 'shortText',
      },
      isRequired: {
        default: false,
      },
      label: {
        default: '',
      },
      fieldContent: {
        default: '',
      },
      options: {
        default: [],
      },
      placeholder: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="form-field"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'form-field' }), 0];
  },

  addCommands() {
    return {
      setFormField:
        (attributes) =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs: { ...attributes, id: `field-${Date.now()}` },
            })
            .run();
        },
      updateFormField:
        (attrs) =>
        ({ chain }) => {
          return chain().updateAttributes(this.name, attrs).run();
        },
      deleteFormField:
        (id) =>
        ({ chain, state }) => {
          const { tr } = state;
          state.doc.descendants((node, pos) => {
            if (node.type.name === this.name && node.attrs.id === id) {
              tr.delete(pos, pos + node.nodeSize);
              return false;
            }
          });
          return chain().step(tr).run();
        },
      moveFormField:
        (id, position) =>
        ({ chain, state }) => {
          const { tr } = state;
          let sourcePos: number | null = null;

          state.doc.descendants((node, pos) => {
            if (node.type.name === this.name && node.attrs.id === id) {
              sourcePos = pos;
              return false;
            }
          });

          if (sourcePos !== null) {
            const targetPos = state.doc.resolve(position);
            tr.lift(tr.mapping.map(sourcePos), 1);
            tr.insert(tr.mapping.map(targetPos.pos), state.doc.nodeAt(sourcePos)!);
          }

          return chain().step(tr).run();
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(FormFieldComponent);
  },
});

export default FormField;

//=======================

// import { Node, mergeAttributes } from '@tiptap/core';
// import { ReactNodeViewRenderer } from '@tiptap/react';
// import FormFieldComponent from '../FormFieldComponent';

// interface FormFieldType {
//   id: string;
//   fieldType: string;
//   label: string;
//   isRequired: boolean;
//   options?: string[];
//   fieldContent?: string | string[]; // Add fieldContent here
// }

// export interface FormFieldOptions {
//   onUpdate: (field: FormFieldType) => void;
// }

// declare module '@tiptap/core' {
//   interface Commands<ReturnType> {
//     formField: {
//       setFormField: (attributes: FormFieldType) => ReturnType;
//       updateFormField: (attributes: Partial<FormFieldType>) => ReturnType;
//       deleteFormField: (fieldId: string) => ReturnType;
//       moveFormField: (fieldId: string, direction: 'up' | 'down') => ReturnType
//     };
//   }
// }

// export const FormField = Node.create<FormFieldOptions>({
//   name: 'formField',

//   group: 'block',

//   content: 'inline*',

//   atom: true,

//   addAttributes() {
//     return {
//       id: {
//         default: null,
//         parseHTML: (element) => element.getAttribute('data-id'),
//         renderHTML: (attributes) => {
//           if (!attributes.id) {
//             return {};
//           }
//           return {
//             'data-id': attributes.id,
//           };
//         },
//       },
//       fieldType: {
//         default: 'text',
//         parseHTML: (element) => element.getAttribute('data-field-type') || 'text',
//         renderHTML: (attributes) => ({
//           'data-field-type': attributes.fieldType,
//         }),
//       },
//       label: {
//         default: '',
//         parseHTML: (element) => element.getAttribute('data-label') || '',
//         renderHTML: (attributes) => ({
//           'data-label': attributes.label,
//         }),
//       },
//       isRequired: {
//         default: false,
//         parseHTML: (element) => element.getAttribute('data-is-required') === 'true',
//         renderHTML: (attributes) => ({
//           'data-is-required': attributes.isRequired ? 'true' : 'false',
//         }),
//       },
//       options: {
//         default: [],
//         parseHTML: (element) => {
//           const optionsStr = element.getAttribute('data-options');
//           return optionsStr ? JSON.parse(optionsStr) : [];
//         },
//         renderHTML: (attributes) => ({
//           'data-options': JSON.stringify(attributes.options),
//         }),
//       },
//       fieldContent: {
//         default: '',
//         parseHTML: (element) => element.textContent || '', // Parse content from HTML
//         renderHTML: (attributes) => ({
//           textContent: attributes.fieldContent, // Render content into HTML
//         }),
//       },
//     };
//   },

//   parseHTML() {
//     return [
//       {
//         tag: 'div[data-field-type]',
//       },
//     ];
//   },

//   renderHTML({ HTMLAttributes }) {
//     return [
//       'div',
//       mergeAttributes(HTMLAttributes),
//     ];
//   },

//   addCommands() {
//     return {
//       setFormField:
//         (attributes: FormFieldType) =>
//         ({ chain }) => {
//           return chain().insertContent({
//             type: this.name,
//             attrs: attributes,
//           }).run();
//         },
//       updateFormField: (attributes: Partial<FormFieldType>) => ({
//         commands,
//       }) => {
//         return commands.updateAttributes(this.name, attributes);
//       },
//       deleteFormField: (fieldId: string) => ({ editor, commands }) => {
//         editor.$doc.content.nodesBetween(0, editor.$doc.content.size, (node, pos) => {
//           if (node.type.name === this.name && node.attrs.id === fieldId) {
//             commands.deleteRange({ from: pos - 1, to: pos + node.nodeSize + 1 });
//           }
//         });
//         return true;
//       },      
      
//       moveFormField: (fieldId: string, direction: 'up' | 'down') => ({ editor, commands }) => {
//         const nodes = editor.doc.descendants((node) => node.type.name === this.name && node.attrs.id === fieldId);
//         nodes.forEach((node) => {
//           const pos = node.pos - 1;
//           const nodeSize = node.nodeSize + 2; // Include surrounding paragraph tags

//           if (direction === 'up') {
//             if (pos > 1) {
//               // Move the node up one position
//               commands.lift(pos, nodeSize).select(pos - 2).paste(true);
//             }
//           } else if (direction === 'down') {
//             const nextNode = editor.doc.resolve(pos + nodeSize);
//             if (nextNode.parent.type.name === 'doc') {
//               // Move the node down one position
//               commands.lift(pos, nodeSize).select(pos + nodeSize).paste(true);
//             }
//           }
//         });
//         return true;
//       },
//     };
//   },

//   addNodeView() {
//     return ReactNodeViewRenderer(FormFieldComponent);
//   },
// });