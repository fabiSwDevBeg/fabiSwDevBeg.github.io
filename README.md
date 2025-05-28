# DISINFO Website con Firebase

Questo README fornisce istruzioni dettagliate per configurare, compilare e deployare il sito web DISINFO con integrazione Firebase per la persistenza dei dati.

## Caratteristiche

- **Autenticazione Admin**: Sistema di login lato client per amministratori
- **Persistenza dei Dati**: Integrazione con Firebase per archiviare i contenuti nel cloud
- **Gestione Contenuti**: Creazione di cartelle e caricamento di contenuti (PDF e link)
- **Editor di Descrizioni**: Editor di testo semplice per le descrizioni dei contenuti
- **Visualizzatore PDF Integrato**: Visualizzazione dei PDF direttamente nel browser
- **Design Minimalista**: Interfaccia pulita basata sullo stile del logo DISINFO
- **Responsive**: Funziona su dispositivi desktop e mobili

## Credenziali Admin

- **Username**: admin
- **Password**: disinfo2025

## Configurazione Firebase

Per utilizzare questo progetto con Firebase, segui questi passaggi:

1. **Crea un progetto Firebase**:
   - Vai su [Firebase Console](https://console.firebase.google.com/)
   - Crea un nuovo progetto
   - Abilita Firestore Database e Storage

2. **Configura le regole di sicurezza**:
   - In Firestore Database, imposta le regole di sicurezza per consentire letture pubbliche
   - In Storage, imposta le regole per consentire letture pubbliche

3. **Ottieni le credenziali Firebase**:
   - Vai su Project Settings > General
   - Scorri fino a "Your apps" e crea una nuova app web
   - Copia la configurazione Firebase (apiKey, authDomain, etc.)

4. **Aggiorna la configurazione nel progetto**:
   - Rinomina il file `src/firebase/config.example.ts` in `config.ts`
   - Sostituisci i valori di esempio con quelli del tuo progetto Firebase

## Istruzioni per la Compilazione

1. **Installa le dipendenze**:
   ```bash
   cd disinfo-firebase
   pnpm install
   ```

2. **Sviluppo locale**:
   ```bash
   pnpm run dev
   ```

3. **Compilazione per produzione**:
   ```bash
   pnpm run build
   ```

## Istruzioni per il Deploy su GitHub Pages

1. **Crea un repository su GitHub**:
   - Accedi al tuo account GitHub
   - Crea un nuovo repository chiamato `fabiswdevbeg.github.io`

2. **Prepara i file per il deploy**:
   - Copia tutti i file dalla cartella `dist` nella root del repository
   - Assicurati di includere il file `.nojekyll` nella root
   - Carica il logo nella cartella `images`

3. **Configura GitHub Pages**:
   - Vai nelle impostazioni del repository
   - Nella sezione "GitHub Pages", seleziona la branch principale come source

4. **Accesso al sito**:
   - Homepage: https://fabiswdevbeg.github.io
   - Login admin: https://fabiswdevbeg.github.io/#/login

## Struttura del Progetto

```
disinfo-firebase/
├── public/                # File statici
│   └── images/            # Immagini, incluso il logo
├── src/
│   ├── assets/            # Asset statici
│   ├── components/        # Componenti React
│   ├── contexts/          # Context API per stato globale
│   │   ├── AuthContext.tsx    # Gestione autenticazione
│   │   └── ContentContext.tsx # Gestione contenuti
│   ├── firebase/          # Configurazione e funzioni Firebase
│   │   ├── config.ts      # Configurazione Firebase
│   │   └── firestore.ts   # Funzioni per Firestore e Storage
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility e funzioni helper
│   ├── pages/             # Componenti pagina
│   │   ├── AdminDashboard.tsx    # Dashboard admin
│   │   ├── AdminFolderContent.tsx # Gestione contenuti cartella
│   │   ├── FolderView.tsx        # Visualizzazione pubblica cartella
│   │   ├── Home.tsx              # Homepage
│   │   └── Login.tsx             # Pagina login
│   ├── types/             # Definizioni TypeScript
│   ├── App.tsx            # Componente principale
│   └── main.tsx           # Entry point
├── index.html             # HTML template
├── package.json           # Dipendenze e script
└── tsconfig.json          # Configurazione TypeScript
```

## Note Importanti

- **Persistenza dei Dati**: Tutti i dati sono archiviati in Firebase, garantendo l'accesso da qualsiasi dispositivo
- **Autenticazione**: L'autenticazione è implementata lato client e non è adatta per dati sensibili
- **PDF Embedding**: I PDF vengono visualizzati tramite iframe, supportato dalla maggior parte dei browser moderni

## Supporto

Per domande o problemi, contatta il team di sviluppo.
