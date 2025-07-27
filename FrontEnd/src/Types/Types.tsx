import { ReactNode } from "react";

// ==================================================
// ==================================================

export type DataObjectType = {

  id: number;
  title: string;
  note: string;

}

// ==================================================
// ==================================================

export type AppContextType = {
  FolderPath: string;
  AllNotesFilePath: string;
  UnsyncedNotesFilePath: string;
  ActiveScreen: string;
  setActiveScreen: (value: string) => void;
  NoteStatus: string;
  setNoteStatus: (value: string) => void;
  ClickedId: number | undefined;
  setClickedId: (value: number) => void;
  Title: string;
  setTitle: (value: string) => void;
  Note: string;
  setNote: (value: string) => void;
  SelectModeOn: boolean;
  setSelectModeOn: (value: boolean) => void;
  SelectedItems: number[];
  setSelectedItems: (value: number[]) => void;
  AllNotes: DataObjectType[];
  setAllNotes: (value: DataObjectType[]) => void;
  ShowingNotes: DataObjectType[];
  setShowingNotes: (value: DataObjectType[]) => void;
  Connected: boolean | null;
  setConnected: (value: boolean | null) => void;
  UnsyncedNotesExist: boolean;
  setUnsyncedNotesExist: (value: boolean) => void;
  UpdateData:(value1:DataObjectType[], value2:DataObjectType[], ) => void,
  DeleteData:(value1:DataObjectType[], value2:DataObjectType[]) => void,
};

// ==================================================
// ==================================================

export type AppProviderProps = {
  children: ReactNode;
};