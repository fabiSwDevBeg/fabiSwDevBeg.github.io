import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { Folder, ContentItem } from '../types';

export default function FolderView() {
  const { folderId } = useParams<{ folderId: string }>();
  const navigate = useNavigate();
  const { folders, getFolderContent } = useContent();
  
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
  const [folderContent, setFolderContent] = useState<ContentItem[]>([]);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);

  useEffect(() => {
    if (folderId) {
      const folder = folders.find(f => f.id === folderId);
      if (folder) {
        setCurrentFolder(folder);
        setFolderContent(getFolderContent(folderId));
      } else {
        navigate('/');
      }
    }
  }, [folderId, folders, getFolderContent, navigate]);

  if (!currentFolder) {
    return <div className="p-8 text-center">Caricamento...</div>;
  }

  return (
    <div className="min-h-screen bg-yellow-50">
      <header className="bg-black p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src="/assets/disinfo_logo.jpg" alt="DISINFO Logo" className="h-10" />
            <h1 className="ml-4 text-xl font-bold text-white">DISINFO</h1>
          </div>
          <button
            onClick={() => navigate('/')}
            className="rounded bg-yellow-500 px-4 py-2 font-bold text-black hover:bg-yellow-600"
          >
            Torna alla Home
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <h2 className="mb-6 text-2xl font-bold">{currentFolder.title}</h2>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h3 className="mb-4 border-b pb-2 text-lg font-medium">Contenuti</h3>
              
              {folderContent.length === 0 ? (
                <p className="text-gray-500">Nessun contenuto in questa cartella.</p>
              ) : (
                <ul className="space-y-2">
                  {folderContent.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setSelectedContent(item)}
                        className={`w-full rounded-md p-2 text-left hover:bg-yellow-100 ${
                          selectedContent?.id === item.id ? 'bg-yellow-200' : ''
                        }`}
                      >
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-gray-500">
                          {item.type === 'pdf' ? 'PDF' : 'Link'}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            {selectedContent ? (
              <div className="rounded-lg bg-white p-4 shadow-md">
                <h3 className="mb-2 text-xl font-medium">{selectedContent.title}</h3>
                <p className="mb-4 text-gray-700">{selectedContent.description}</p>
                
                {selectedContent.type === 'pdf' ? (
                  <div className="mt-4">
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm font-medium">Visualizzazione PDF</span>
                      <a 
                        href={selectedContent.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Apri in una nuova scheda
                      </a>
                    </div>
                    <div className="h-[70vh] w-full overflow-hidden rounded border border-gray-300">
                      <iframe
                        src={selectedContent.url}
                        title={selectedContent.title}
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <a
                      href={selectedContent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-md bg-yellow-500 px-4 py-2 font-medium text-black hover:bg-yellow-600"
                    >
                      Visita il Link
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg bg-white p-8 shadow-md">
                <p className="text-gray-500">Seleziona un contenuto dalla lista per visualizzarlo.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-8 bg-black p-4 text-center text-white">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} DISINFO. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}
