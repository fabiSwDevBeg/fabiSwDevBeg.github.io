export interface User {
  username: string;
  isAdmin: boolean;
}

export interface Folder {
  id: string;
  title: string;
  createdAt: string;
}

export interface ContentItem {
  id: string;
  folderId: string;
  title: string;
  description: string;
  type: 'pdf' | 'link';
  url: string;
  createdAt: string;
}
