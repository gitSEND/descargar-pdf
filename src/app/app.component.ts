import {Component} from '@angular/core';
import pdf from './data/pdfs.json'
import {FileInterface} from "./interface/file.interface";
import {downloadPdf} from "./util/download-file";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // @ts-ignore
  public list: FileInterface[] = pdf.data;

  constructor() {
    console.log('list of pdfs', this.list);
  }

  async downloadFiles() {
    console.log('Descargando documentos...')
    for (const item of this.list) {
      await downloadPdf(item);
    }
  }

  async downloadFiles2(file: FileInterface) {
    console.log('Descargando documentos...')
      await downloadPdf(file);
  }
}
