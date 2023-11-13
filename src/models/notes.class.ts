export interface NoteModel {
  id: string;
  type: string;
  title: string;
  content: string;
  [key: string]: any;
}
