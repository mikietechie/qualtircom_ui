import {
  onOpen,
  openDialog,
  openDialogBootstrap,
  openDialogMUI,
  openDialogTailwindCSS,
  openAboutSidebar,
  openSidebarImportPDF,
} from './ui';

import { getSheetsData, addSheet, deleteSheet, setActiveSheet } from './sheets';
import { uploadPDF, loadSlides } from './slides';

// Public functions must be exported as named exports
export {
  onOpen,
  openSidebarImportPDF,
  openDialog,
  openDialogBootstrap,
  openDialogMUI,
  openDialogTailwindCSS,
  openAboutSidebar,
  getSheetsData,
  addSheet,
  deleteSheet,
  setActiveSheet,
  uploadPDF,
  loadSlides,
};
