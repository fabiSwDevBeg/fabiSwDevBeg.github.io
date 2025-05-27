import { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { useAuth } from '../contexts/AuthContext';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { folders, addFolder, deleteFolder } = useContent();
  const [newFolderTitle, setNewFolderTitle] = useState('');
  const [error, setError] = useState('');

  const handleAddFolder = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!newFolderTitle.trim()) {
      setError('Inserisci un titolo per la cartella');
      return;
    }
    
    addFolder(newFolderTitle.trim());
    setNewFolderTitle('');
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      <header className="bg-black p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src="/assets/disinfo_logo.jpg" alt="DISINFO Logo" className="h-10" />
            <h1 className="ml-4 text-xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-white">Benvenuto, {user?.username}</span>
            <button
              onClick={logout}
              className="rounded bg-yellow-500 px-4 py-2 font-bold text-black hover:bg-yellow-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Crea Nuova Cartella</h2>
          <form onSubmit={handleAddFolder} className="flex items-end gap-4">
            <div className="flex-1">
              <label htmlFor="folderTitle" className="mb-2 block text-sm font-medium text-gray-700">
                Titolo Cartella
              </label>
              <input
                id="folderTitle"
                type="text"
                value={newFolderTitle}
                onChange={(e) => setNewFolderTitle(e.target.value)}
                placeholder="es. Incontro del 15 gennaio 2025"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Crea Cartella
            </button>
          </form>
          {error && (
            <div className="mt-2 text-sm text-red-600">
              {error}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Cartelle</h2>
          {folders.length === 0 ? (
            <p className="text-gray-500">Nessuna cartella creata.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {folders.map((folder) => (
                <div key={folder.id} className="rounded-lg bg-white p-4 shadow-md">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">{folder.title}</h3>
                    <div className="flex space-x-2">
                      <a
                        href={`/admin/folder/${folder.id}`}
                        className="rounded bg-yellow-500 px-3 py-1 text-sm font-medium text-black hover:bg-yellow-600"
                      >
                        Gestisci
                      </a>
                      <button
                        onClick={() => deleteFolder(folder.id)}
                        className="rounded bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
                      >
                        Elimina
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Creata il {new Date(folder.createdAt).toLocaleDateString('it-IT')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
