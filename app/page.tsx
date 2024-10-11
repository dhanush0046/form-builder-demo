// import TiptapEditor from '../components/TiptapEditor';
// import Link from 'next/link';
// export default function Home() {
//   return (
//     <main className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Tally.so Form Builder</h1>
//       <Link href="/pages">Home</Link>
//       <TiptapEditor />
//     </main>
//   );
// }

import Link from 'next/link';

export default function Home() {

  return (
      <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Tally.so Form Builder</h1>
      <Link href="/pages" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create a new form</Link>
      </div>
)};