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
  ToDeleteFilePath:string,
  ToUpdateFilePath:string,
  ToDeleteFileExists: boolean,
  setToDeleteFileExists: (value:boolean) => void,
  ToUpdateFileExists: boolean,
  setToUpdateFileExists: (value:boolean) => void,
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
  Error: string,
  setError: (value:string) => void,
  ShowVerifyModal: boolean,
  setShowVerifyModal: (value:boolean) => void,
};

// ==================================================
// ==================================================

export type AppProviderProps = {
  children: ReactNode;
};