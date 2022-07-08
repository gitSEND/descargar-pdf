import { Component } from '@angular/core';
import JSZip from 'jszip';
import pdf from './data/pdfs.json';
import { FileInterface } from './interface/file.interface';
import { downloadPdf } from './util/download-file';
// @ts-ignore
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // @ts-ignore
  public list: FileInterface[] = pdf.data;

  constructor() {
    console.log('list of pdfs', this.list);
  }

  async downloadFiles() {
    console.log('Descargando documentos...');
    for (const item of this.list) {
      await downloadPdf(item);
    }
  }

  async downloadFiles2(file: FileInterface) {
    console.log('Descargando documentos...');
    await downloadPdf(file);
  }

  async generateZip() {
    console.log('Descargando documentos zipeados...');

    const zip = new JSZip();
    const pdf = zip.folder('documents');

    for (const file of this.list) {
      pdf!.file(`${file.title}.pdf`, file.base64, { base64: true });
    }

    const content = await pdf!.generateAsync({ type: 'blob' });
    saveAs(content, 'documents.zip');
  }

  async generateZip2() {
    const zip = new JSZip();
    const pdf = zip.folder('documents');

    for (const file of this.list) {
      pdf!.file(`${file.title}.pdf`, file.base64, { base64: true });
    }

    const content = await pdf!.generateAsync({ type: 'base64' });

    const downloadLink = document.createElement('a');
    downloadLink.href = `data:application/pdf;base64,${content}`;
    downloadLink.download = 'documents.zip';
    downloadLink.click();
  }
}
