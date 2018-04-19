import {Injectable} from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable()
export class ApiService {

 constructor(private http: Http) {
}
private setHeaders(): Headers {
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
       /** if (this.jwtService.getToken() && (localStorage.getItem('email')) || localStorage.getItem('hremail')) {
            headersConfig['token'] = `${this.jwtService.getToken()}`;
            headersConfig['email'] = `${localStorage.getItem('email') || localStorage.getItem('hremail')}`;
        }else {
            console.log('Setting personalized auth header>>>>>>>');
            headersConfig['authheader'] = 'hrportalgojirabackend-bprrsa@1234';
        } */
        return new Headers(headersConfig);
    }
    private formatErrors(error: any) {
        return Observable.throw(error.json());
    }

    get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
        return this.http.get(`${environment.api_url}${path}`, {
            headers: this.setHeaders(),
            search: params
        }).catch(this.formatErrors).map((res: Response) => {
            return res.json();
        });
    }

    post(path: string, body: Object = {}): Observable<any> {
          return this.http.post(
            `${environment.api_url}${path}`,
            JSON.stringify(body),
            {headers: this.setHeaders()}
        ).catch(this.formatErrors)
            .map((res: Response) => {
                return res.json();
            });
     }
    put(path: string, body: Object = {}): Observable<any> {
        return this.http.put(
            `${environment.api_url}${path}`,
            JSON.stringify(body),
            {headers: this.setHeaders()}
        ).catch(this.formatErrors)
            .map((res: Response) => {
                return res.json();
            });
}
}
