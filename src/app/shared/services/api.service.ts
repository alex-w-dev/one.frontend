import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

  accessToken: string;
  apiServerUrl: string = 'http://api.biogenom.ru/api/';

  constructor(private http: Http,
              private router: Router) {
    this.accessToken = localStorage.getItem('accessToken');
  }

  setAccessToken(token) {
    localStorage.setItem('accessToken', token);
    this.accessToken = token;
  }

  deleteAccessToken() {
    this.accessToken = '';
  }

  isPublicPage(): boolean {
    return ['/login', '/registration'].indexOf(location.pathname) !== -1;
  }

  fileLoadingFormInput(route: string, element: HTMLInputElement) {
    let fileList: FileList = element.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);

      return this.request(route, formData, 'file');
    }
  }

  request(route: string, data: any = {}, type: 'file' | 'data' = 'data'): Promise<any> {
    route = this.apiServerUrl + route;

    let headers;
    switch (type) {
      case 'data':
        headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        });
        break;
      case 'file':
        headers = new Headers();
        /** No need to include Content-Type in Angular 4 */
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        break;
      default: console.error('Unknown data type!');
    }

    let options = new RequestOptions({headers: headers});


    let request;

    let postBody = new URLSearchParams();
    if (this.accessToken) postBody.append('token', this.accessToken);

    Object.keys(data).forEach(key => {
      let dataType = typeof data[key];
      postBody.append(key, (dataType === 'string' || dataType === 'number') ? data[key] : JSON.stringify(data[key]));
    });
    request = this.http.post(route, postBody, options);


    return new Promise((resolve, reject) => {
      request
        .subscribe((response) => {
          resolve(JSON.parse(response._body));
        }, (error) => {
          console.error(error);
          reject(error);
        });
    });
  }

}
