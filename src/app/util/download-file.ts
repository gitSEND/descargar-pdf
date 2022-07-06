/**
 * Convert Base64 (dataURI) to blob with mimeType
 * @param {String} dataURI
 * @returns {Blob}
 */
import {FileInterface} from "../interface/file.interface";

const dataURItoBlob = (dataURI: any) => {
  const byteString = window.atob(dataURI.split(',')[1])
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  // write the ArrayBuffer to a blob, and you're done
  return new Blob([ab], {type: mimeString})
}


/**
 * requestPdf function to return a PDF
 * Converts base64 string to blob and inits download
 * @param {FileInterface} file
 */
export const requestPdf = (file: FileInterface) => {
  const linkSource = `data:application/pdf;base64,${file.base64}`
  const pdfBlob = dataURItoBlob(linkSource)

  const url = window.URL.createObjectURL(pdfBlob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${file.title}.pdf`)
  document.body.appendChild(link)
  link.click()
  link.remove()
}

/**
 * Permite descargar uno a varios pdfs en los navegadores
 * @param file
 */
export const downloadPdf = (file: FileInterface) =>{
  const link = document.createElement('a');
  link.download = file.title;
  link.href = 'data:application/octet-stream;base64,' + file.base64;
  link.click();
}
