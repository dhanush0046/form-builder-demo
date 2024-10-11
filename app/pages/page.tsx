

import TiptapEditor from '../../components/TiptapEditor';
import FormCover from '../../components/Form-Cover';
import Link from 'next/link';
export default function Page() {
  return (
    <main className="container mx-auto p-4">
      <FormCover />
      <TiptapEditor />
    </main>
  );
}