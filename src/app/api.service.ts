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

    llamarModeloLineal(start:Number, end:number): Observable<any> {
	    return this.http.get('http://localhost:5000/api/', {
            params: new HttpParams()
                .set('start', String(start))
                .set('end', String(end))
        }).pipe(
            map(res =>  res["payload"])
        );
    }
}
