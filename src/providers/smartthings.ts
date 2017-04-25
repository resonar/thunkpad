
//import { Http, Jsonp, Response } from '@angular/http';
//import { Headers, RequestOptions } from '@angular/http';
import { Jsonp, Response, Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import 'rxjs/add/observable/throw';
import { Injectable } from '@angular/core';

@Injectable()
export class SmartThingsService {
  //private url: any = "https://jobs.github.com/positions.json?description=python&location=new+york&callback=JSONP_CALLBACK";
  //private token: any = "b0f0d84c-1033-4269-9e61-b79782d8edeb";
  private host: any = "https://graph.api.smartthings.com"; 
  private path: any = "/api/smartapps/installations/1406bbfd-b8e3-4a6a-9dd0-cac9e7a286a5/";
  private query: any = "?access_token=b0f0d84c-1033-4269-9e61-b79782d8edeb&callback=JSONP_CALLBACK";
  constructor(
    private jsonp: Jsonp,
    private http: Http) {
  }
  getdata(): Observable<string[]> {
    return this.jsonp.get(this.host + this.path + "switches" + this.query)
      .map(this.extractData)
      .catch(this.handleError);
  }
  setLight(command: string, id: string):Observable<string[]> {
     let url = this.host + this.path + "switch/" + id + "/" + command + this.query;
     console.log(url);
        return this.jsonp.get(url).map(this.extractData)
      .catch(this.handleError);
  }
    setLightLevel(command: string, id: string, level:number):Observable<string[]> {
     let url = this.host + this.path + "switch/" + id + "/" + command + "/" + level + this.query;
     console.log(url);
        return this.jsonp.get(url).map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log('extracting data');
    return body;
  }
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error('err' + errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}