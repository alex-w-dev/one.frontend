import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

  accessToken: string;
  apiServerUrl: string;
  locationProtocol: string;

  constructor(private http: Http,
              private router: Router) {
    this.locationProtocol = window.location.protocol;

    this.apiServerUrl = this.locationProtocol + '//api.biogenom.ru/api/';

    this.accessToken = localStorage.getItem('accessToken');
  }

  setAccessToken(token) {
    localStorage.setItem('accessToken', token);
    this.accessToken = token;
  }

  deleteAccessToken() {
    localStorage.removeItem('accessToken');
    this.accessToken = '';
  }

  isPublicPage(): boolean {
    return ['/login', '/dev', '/dev2', '/registration'].indexOf(location.pathname) !== -1;
  }

  request(route: string, data: any = {}, ignoreToken?: boolean): Promise<{ success: boolean, result: any}> {
    route = this.apiServerUrl + route;

    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    let options = new RequestOptions({headers: headers});


    let request;

    let postBody = new URLSearchParams();
    if (this.accessToken && !ignoreToken) postBody.append('token', this.accessToken);

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
