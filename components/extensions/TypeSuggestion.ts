//TypeSuggestion.ts
// import { Extension } from '@tiptap/core';
// import Suggestion from '@tiptap/suggestion';
// import tippy, { Instance as TippyInstance } from 'tippy.js';
// import { ReactRenderer } from '@tiptap/react';
// import { questionFields } from './questionFields';
// import CommandList from '../CommandList';
// import React from 'react';

// export interface CommandItem {
//   title: string;
//   description: string;
//   type: string;
//   icon: React.ReactNode;
//   attrs?: Record<string, any>;
// }

// export const TypeSuggestion = Extension.create({
//   name: 'typeSuggestion',

//   addOptions() {
//     return {
//       suggestion: {
//         char: '/',
//         command: ({ editor, range, props }: { editor: any; range: any; props: CommandItem }) => {
//           editor.chain().focus().deleteRange(range).run();

//           if (props.type === 'bulletList') {
//             console.log('toggle bullet list');
//             editor.chain().focus().toggleBulletList().run();
//           } else if (props.type === 'orderedList') {
//             editor.chain().focus().toggleOrderedList().run();
//           } else if (props.type === 'formField') {
//             editor.chain().focus().setFormField({ fieldType: props.attrs?.fieldType }).run();
//             console.log('set form field');
//           } else {
//             editor.chain().focus().setNode(props.type, props.attrs).run();
//           }
//         },
//         items: ({ query }: { query: string }): CommandItem[] => {
//           return questionFields.filter(item => item.title.toLowerCase().startsWith(query.toLowerCase()));
//         },
//         render: () => {
//           let reactRenderer: ReactRenderer | null = null;
//           let popup: TippyInstance[] | null = null;

//           return {
//             onStart: (props: any) => {
//               reactRenderer = new ReactRenderer(CommandList, {
//                 props,
//                 editor: props.editor,
//               });

//               popup = tippy('body', {
//                 getReferenceClientRect: props.clientRect,
//                 appendTo: () => document.body,
//                 content: reactRenderer.element,
//                 showOnCreate: true,
//                 interactive: true,
//                 trigger: 'manual',
//                 placement: 'bottom-start',
//               });
//             },
//             onUpdate(props: any) {
//               if (reactRenderer && popup) {
//                 reactRenderer.updateProps(props);
//                 popup[0].setProps({
//                   getReferenceClientRect: props.clientRect,
//                 });
//               }
//             },
//             onKeyDown(props: any) {
//               if (props.event.key === 'Escape' && popup) {
//                   popup[0].hide();
//                   props.event.preventDefault(); // Prevent default behavior
//                   return true;
//               }
//               return (reactRenderer?.ref as { onKeyDown?: (props: any) => void })?.onKeyDown?.(props);
//           },
//             onExit() {
//               if (popup) {
//                 popup[0].destroy();
//                 popup = null;
//               }
//               if (reactRenderer) {
//                 reactRenderer.destroy();
//                 reactRenderer = null;
//               }
//             },
//           };
//         },
//       },
//     };
//   },

//   addProseMirrorPlugins() {
//     return [
//       Suggestion({
//         editor: this.editor,
//         ...this.options.suggestion,
//       }),
//     ];
//   },
// });
//ffffffffffffffffffffffffffffffffffff

import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import tippy, { Instance as TippyInstance } from 'tippy.js';
import { ReactRenderer } from '@tiptap/react';
import { questionFields } from './questionFields';
import CommandList from '../CommandList';
import React from 'react';

export interface CommandItem {
  title: string;
  description: string;
  type: string;
  icon: React.ReactNode;
  attrs?: Record<string, any>;
}

export const TypeSuggestion = Extension.create({
  name: 'typeSuggestion',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }: { editor: any; range: any; props: CommandItem }) => {
          editor.chain().focus().deleteRange(range).run();

          if (props.type === 'bulletList') {
            editor.chain().focus().toggleBulletList().run();
          } else if (props.type === 'orderedList') {
            editor.chain().focus().toggleOrderedList().run();
          } else if (props.type === 'formField') {
            editor.chain().focus().setFormField({ fieldType: props.attrs?.fieldType }).run();
          } else {
            editor.chain().focus().setNode(props.type, props.attrs).run();
          }
        },
        items: ({ query }: { query: string }): CommandItem[] => {
          return questionFields.filter(item => item.title.toLowerCase().startsWith(query.toLowerCase()));
        },
        render: () => {
          let reactRenderer: ReactRenderer | null = null;
          let popup: TippyInstance[] | null = null;

          return {
            onStart: (props: any) => {
              reactRenderer = new ReactRenderer(CommandList, {
                props,
                editor: props.editor,
              });

              popup = tippy('body', {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: reactRenderer.element,
                showOnCreate: true,
                interactive: true,
                trigger: 'manual',
                placement: 'bottom-start',
              });
            },
            onUpdate(props: any) {
              if (reactRenderer && popup) {
                reactRenderer.updateProps(props);
                popup[0].setProps({
                  getReferenceClientRect: props.clientRect,
                });
              }
            },
            onKeyDown(props: any) {
              if (props.event.key === 'Escape' && popup) {
                popup[0].hide();
                props.event.preventDefault();
                return true;
              }
              return (reactRenderer?.ref as { onKeyDown?: (props: any) => void })?.onKeyDown?.(props);
            },
            onExit() {
              if (popup) {
                popup[0].destroy();
                popup = null;
              }
              if (reactRenderer) {
                reactRenderer.destroy();
                reactRenderer = null;
              }
            },
          };
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export default TypeSuggestion;