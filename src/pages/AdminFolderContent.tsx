import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { useAuth } from '../contexts/AuthContext';
import { Folder } from '../types';

export default function AdminFolderContent() {
  const { folderId } = useParams<{ folderId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { folders, addContentItem, deleteContentItem, getFolderContent } = useContent();
  
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentType, setContentType] = useState<'pdf' | 'link'>('pdf');
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/login');
      return;
    }

    if (folderId) {
      const folder = folders.find(f => f.id === folderId);
      if (folder) {
        setCurrentFolder(folder);
      } else {
        navigate('/admin');
      }
    }
  }, [folderId, folders, navigate, user]);

  const folderContent = folderId ? getFolderContent(folderId) : [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setError('Solo file PDF sono supportati');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Inserisci un titolo');
      return;
    }

    if (contentType === 'pdf' && !file) {
      setError('Seleziona un file PDF');
      return;
    }

    if (contentType === 'link' && !url.trim()) {
      setError('Inserisci un URL valido');
      return;
    }

    try {
      setUploading(true);
      
      let fileUrl = '';
      
      if (contentType === 'pdf' && file) {
        // In a real application, this would upload to a server or GitHub
        // For this demo, we'll create a data URL
        fileUrl = await readFileAsDataURL(file);
      } else {
        fileUrl = url;
      }
      
      if (folderId) {
        addContentItem(
          folderId,
          title.trim(),
          description.trim(),
          contentType,
          fileUrl
        );
        
        // Reset form
        setTitle('');
        setDescription('');
        setFile(null);
        setUrl('');
      }
    } catch (err) {
      setError('Errore durante il caricamento');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  if (!currentFolder) {
    return <div className="p-8 text-center">Caricamento...</div>;
  }

  return (
    <div className="min-h-screen bg-yellow-50">
      <header className="bg-black p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src="/assets/disinfo_logo.jpg" alt="DISINFO Logo" className="h-10" />
            <h1 className="ml-4 text-xl font-bold text-white">
              Gestione Cartella: {currentFolder.title}
            </h1>
          </div>
          <div>
            <button
              onClick={() => navigate('/admin')}
              className="rounded bg-yellow-500 px-4 py-2 font-bold text-black hover:bg-yellow-600"
            >
              Torna alla Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Aggiungi Contenuto</h2>
          <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4">
              <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
                Titolo
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
                placeholder="Titolo del contenuto"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
                Descrizione
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
                placeholder="Descrizione del contenuto"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tipo di Contenuto
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="pdf"
                    checked={contentType === 'pdf'}
                    onChange={() => setContentType('pdf')}
                    className="mr-2"
                  />
                  File PDF
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="link"
                    checked={contentType === 'link'}
                    onChange={() => setContentType('link')}
                    className="mr-2"
                  />
                  Link
                </label>
              </div>
            </div>

            {contentType === 'pdf' ? (
              <div className="mb-4">
                <label htmlFor="file" className="mb-2 block text-sm font-medium text-gray-700">
                  File PDF
                </label>
                <input
                  id="file"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
                />
                {file && <p className="mt-1 text-sm text-gray-500">File selezionato: {file.name}</p>}
              </div>
            ) : (
              <div className="mb-4">
                <label htmlFor="url" className="mb-2 block text-sm font-medium text-gray-700">
                  URL
                </label>
                <input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
                  placeholder="https://example.com"
                />
              </div>
            )}

            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:bg-gray-400"
            >
              {uploading ? 'Caricamento in corso...' : 'Aggiungi Contenuto'}
            </button>
          </form>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Contenuti nella Cartella</h2>
          {folderContent.length === 0 ? (
            <p className="text-gray-500">Nessun contenuto in questa cartella.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {folderContent.map((item) => (
                <div key={item.id} className="rounded-lg bg-white p-4 shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                      <p className="mt-2 text-xs text-gray-500">
                        Tipo: {item.type === 'pdf' ? 'PDF' : 'Link'} | 
                        Aggiunto il {new Date(item.createdAt).toLocaleDateString('it-IT')}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded bg-yellow-500 px-3 py-1 text-sm font-medium text-black hover:bg-yellow-600"
                      >
                        Visualizza
                      </a>
                      <button
                        onClick={() => deleteContentItem(item.id)}
                        className="rounded bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
                      >
                        Elimina
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
