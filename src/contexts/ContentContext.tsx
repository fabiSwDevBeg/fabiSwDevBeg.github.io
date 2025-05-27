import { createContext, useState, useContext, ReactNode } from 'react';
import { Folder, ContentItem } from '../types';

interface ContentContextType {
  folders: Folder[];
  contentItems: ContentItem[];
  addFolder: (title: string) => void;
  addContentItem: (folderId: string, title: string, description: string, type: 'pdf' | 'link', url: string) => void;
  getFolderContent: (folderId: string) => ContentItem[];
  deleteFolder: (folderId: string) => void;
  deleteContentItem: (contentId: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [folders, setFolders] = useState<Folder[]>(() => {
    const savedFolders = localStorage.getItem('folders');
    return savedFolders ? JSON.parse(savedFolders) : [];
  });

  const [contentItems, setContentItems] = useState<ContentItem[]>(() => {
    const savedContentItems = localStorage.getItem('contentItems');
    return savedContentItems ? JSON.parse(savedContentItems) : [];
  });

  const saveToLocalStorage = (folders: Folder[], contentItems: ContentItem[]) => {
    localStorage.setItem('folders', JSON.stringify(folders));
    localStorage.setItem('contentItems', JSON.stringify(contentItems));
  };

  const addFolder = (title: string) => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      title,
      createdAt: new Date().toISOString()
    };
    const updatedFolders = [...folders, newFolder];
    setFolders(updatedFolders);
    saveToLocalStorage(updatedFolders, contentItems);
  };

  const addContentItem = (folderId: string, title: string, description: string, type: 'pdf' | 'link', url: string) => {
    const newContentItem: ContentItem = {
      id: Date.now().toString(),
      folderId,
      title,
      description,
      type,
      url,
      createdAt: new Date().toISOString()
    };
    const updatedContentItems = [...contentItems, newContentItem];
    setContentItems(updatedContentItems);
    saveToLocalStorage(folders, updatedContentItems);
  };

  const getFolderContent = (folderId: string) => {
    return contentItems.filter(item => item.folderId === folderId);
  };

  const deleteFolder = (folderId: string) => {
    const updatedFolders = folders.filter(folder => folder.id !== folderId);
    const updatedContentItems = contentItems.filter(item => item.folderId !== folderId);
    setFolders(updatedFolders);
    setContentItems(updatedContentItems);
    saveToLocalStorage(updatedFolders, updatedContentItems);
  };

  const deleteContentItem = (contentId: string) => {
    const updatedContentItems = contentItems.filter(item => item.id !== contentId);
    setContentItems(updatedContentItems);
    saveToLocalStorage(folders, updatedContentItems);
  };

  return (
    <ContentContext.Provider value={{ 
      folders, 
      contentItems, 
      addFolder, 
      addContentItem, 
      getFolderContent,
      deleteFolder,
      deleteContentItem
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
