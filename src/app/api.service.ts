import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import { AppComponent } from './app.component';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor( private http:HttpClient ) { }
    // la ruta finalmente será más menos así http://127.0.0.1:5000/api/?start=2020-02-10&end=2020-07-15
    // la ruta se cambió y quedó así http://167.99.231.117:5000/api/?start=2020-02-10&end=2020-07-15
    llamarModeloLineal(start:Number, end:number, region:string, palabra:string): Observable<any> {
	    return this.http.get('/api/', {
            params: new HttpParams()
                .set('region', String(region))
                .set('palabra', String(palabra))
                .set('start', String(start))
                .set('end', String(end))
        }).pipe(
            map(res =>  res["payload"])
        );
    }
}
