import {Component} from '@angular/core';
import pdf from './data/pdfs.json'
import {FileInterface} from "./interface/file.interface";
import {downloadPdf, requestPdf} from "./util/download-file";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public list: FileInterface[] = pdf.data;

  constructor() {
    console.log('list of pdfs', this.list);
  }

  downloadFiles() {
    console.log('Descargando documentos...')
    this.list.forEach(file => {
      console.log(file.title)
      downloadPdf(file)
    });
  }





}
