import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  uploadFile(fileToUpload: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('request', fileToUpload, fileToUpload.name);
    return this.http.post(`${environment.apiUrl}/Agent/uploadfile`, formData);
  }

  // upload(file: File): Observable<HttpEvent<any>> {
  //   const formData: FormData = new FormData();

  //   formData.append('file', file);

  //   const req = new HttpRequest('POST', `${this.baseUrl}/common/uploaddoc`, formData, {
  //     reportProgress: true,
  //     responseType: 'json'
  //   });
  //   console.log(this.http.request(req));
  //   return this.http.request(req);
  // }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/common/uploaddoc`);
  }
}