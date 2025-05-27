// Home component
import { useContent } from '../contexts/ContentContext';

export default function Home() {
  const { folders } = useContent();

  return (
    <div className="min-h-screen bg-yellow-50">
      <header className="bg-black p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <img src="/assets/disinfo_logo.jpg" alt="DISINFO Logo" className="h-10" />
          <h1 className="ml-4 text-xl font-bold text-white">DISINFO</h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <h2 className="mb-6 text-2xl font-bold">Cartelle Disponibili</h2>
        
        {folders.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow-md">
            <p className="text-gray-500">Nessuna cartella disponibile al momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {folders.map((folder) => (
              <a 
                key={folder.id} 
                href={`/folder/${folder.id}`}
                className="block rounded-lg bg-white p-6 shadow-md transition-transform hover:scale-105 hover:shadow-lg"
              >
                <h3 className="mb-2 text-xl font-medium">{folder.title}</h3>
                <p className="text-sm text-gray-500">
                  Creata il {new Date(folder.createdAt).toLocaleDateString('it-IT')}
                </p>
              </a>
            ))}
          </div>
        )}
      </main>

      <footer className="mt-auto bg-black p-4 text-center text-white">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} DISINFO. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}
