import {FileInterface} from "../interface/file.interface";

/**
 * With this function you can download one or several files in your browser
 * in the same time. Apply a delay for safari
 * @param file {FileInterface}
 */
export const downloadPdf = (file: FileInterface): Promise<boolean> => {
  return new Promise((resolve) => {
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,` + file.base64;
    link.download = `${file.title}.pdf`;
    // link.href = `data:${file.type};base64,` + file.base64;

    setTimeout(() => {
      link.click();
      resolve(true);
    }, 100)
  })
}
