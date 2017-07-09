import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {

  accessToken: string;

  constructor(private http: Http,
              private router: Router) {
    this.accessToken = localStorage.getItem('accessToken');
  }

  setAccessToken(token) {
    localStorage.setItem('accessToken', token);
    this.accessToken = token;
  }

  isPublicPage(): boolean {
    return ['/login', '/registration'].indexOf(location.pathname) !== -1;
  }

  request(route: string, data: any = {}, type: 'get' | 'post' = 'post'): Promise<any> {
    route = 'http://api.biogenom.ru/api/' + route;
    // route = 'http://api.biogenom.ru/testAjax.php';

    // const search = new URLSearchParams();
    // if (this.accessToken) search.set('access_token', this.accessToken);

    // if (getParams && Object.keys(getParams).length) {
    //   Object.keys(getParams).forEach(key => {
    //     search.set(key, JSON.stringify(getParams[key]));
    //   });
    // }

    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({headers: headers/*, search: search*/});


    let request;
    switch (type) {
      case 'post':
        let postBody = new URLSearchParams();
        if (this.accessToken) postBody.append('token', this.accessToken);

        console.log(this.accessToken);

        Object.keys(data).forEach(key => {
          let dataType = typeof data[key];
          postBody.append(key, (dataType === 'string' || dataType === 'number') ? data[key] : JSON.stringify(data[key]));
        });
        request = this.http.post(route, postBody, options);
        break;
      default:
        request = this.http.get(route, options);
    }


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
