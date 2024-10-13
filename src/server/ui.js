export const onOpen = () => {
  const menu = SlidesApp.getUi()
    .createMenu('Qualtir')
    .addItem('Import PDF', 'openSidebarImportPDF');
  // .addItem('Sheet Editor', 'openDialog')
  // .addItem('Sheet Editor (Bootstrap)', 'openDialogBootstrap')
  // .addItem('Sheet Editor (MUI)', 'openDialogMUI')
  // .addItem('Sheet Editor (Tailwind CSS)', 'openDialogTailwindCSS')
  // .addItem('About me', 'openAboutSidebar');

  menu.addToUi();
};

export const openSidebarImportPDF = () => {
  const html = HtmlService.createHtmlOutputFromFile('pdf-to-slides')
    .setWidth(600)
    .setHeight(400);
  // SlidesApp.getUi().showModalDialog(html, 'PDF to Slides');
  SlidesApp.getUi().showSidebar(html);
};

export const openDialog = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor');
};

export const openDialogBootstrap = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo-bootstrap')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor (Bootstrap)');
};

export const openDialogMUI = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo-mui')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor (MUI)');
};

export const openDialogTailwindCSS = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo-tailwindcss')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor (Tailwind CSS)');
};

export const openAboutSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('sidebar-about-page');
  SpreadsheetApp.getUi().showSidebar(html);
};
