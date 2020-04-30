import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from "@angular/common/http";
import { Http, RequestOptions, Response, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constant } from '../modules/utilities/constants';
import { Router } from "@angular/router";

@Injectable()
export class RequestService {
    public url: string;
    public s4_key: string;
    private debug:boolean=new Constant().getDebug();
    public uploadUrlAdjuntos:string;
    public urlDataTransfer:string;
    public urlQuattroAutos:string;
    private key:string="w";
    private useKey:string="w";
    urlErrores:string;

    constructor(private http: Http,private httpc: HttpClient, private router: Router) {   
        let constant = new Constant();
        this.url = constant.URL;        
        this.s4_key = constant.S4_KEY;
        this.uploadUrlAdjuntos = new Constant().UPLOAD_URL_ADJUNTOS;
        this.urlDataTransfer = constant.URLDataTransfer; 
        this.urlQuattroAutos = constant.URLQuattroAutos;
        this.urlErrores = constant.URLERRORES;
    } 

    getRequest(apiName: string, params?: any, key?:string) {
        if(key && key!=""){
            this.key=key;
        }
        let parameters = "?"+this.key+"="+ localStorage.getItem(this.key) + "&s4_key=" + this.s4_key + ((params)? this.transformParams(params):"");

        this.log("url", this.url + apiName + parameters);
        return this.http.get(this.url + apiName + parameters).pipe(
            map(res => res.json())
        );
    }

    getRequestQ(apiName: string, params?: any, key?:string) {
        if(key && key!=""){
            this.key=key;
        }
        let parameters = "?b="+ localStorage.getItem(this.key) + "&s4_key=" + this.s4_key + ((params)? this.transformParams(params):"");

        this.log("url", this.url + apiName + parameters);
        return this.http.get(this.url + apiName + parameters).pipe(
            map(res => res.json())
        );
    }

    postRequest(apiName:string, dataJSON, key?:string){
        if(key && key!=""){
            this.key=key;
        }
        if(dataJSON instanceof Array){
            dataJSON[0].w = localStorage.getItem(this.key);
            dataJSON[0].s = localStorage.getItem("s");
            dataJSON[0].s4_key = this.s4_key;
        }else{
            dataJSON.w = localStorage.getItem(this.key);
            dataJSON.s = localStorage.getItem("s");
            dataJSON.s4_key = this.s4_key;
        }        
              
        let headers = new Headers();  
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8;');
        let options = new RequestOptions({ headers: headers});
                
        return this.http.post(this.url + apiName, JSON.stringify(dataJSON), options).pipe(
            map(res => res.json()
        ));
    }

    getRequestRemote(projectName: string, apiName: string, params?: any, key?:string, useKey?:string) {
        if(key && key!=""){
            this.key=key;
        }

        if(useKey && useKey!=""){
            this.useKey=useKey;
        }

        let parameters = "?"+this.useKey+"="+ localStorage.getItem(this.key) + "&s4_key=" + this.s4_key + ((params)? this.transformParams(params):"");

        this.log("getRequestRemote.getRequestRemote()", projectName + apiName + parameters);
        return this.http.get(projectName + apiName + parameters).pipe(
            map(res => res.json()
        ));
    }

    postRequestRemote(projectName: string, apiName:string, dataJSON, key?:string){
        if(key && key!=""){
            this.key=key;
        }
        if(dataJSON instanceof Array){
            dataJSON[0].w = localStorage.getItem(this.key);
            dataJSON[0].s4_key = this.s4_key;
        }else{
            dataJSON.w = localStorage.getItem(this.key);
            dataJSON.s4_key = this.s4_key;
        }   
        let headers = new Headers();  
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8;');
        let options = new RequestOptions({ headers: headers}); 
        this.log("RequestServices.postRequestRemote()", projectName + apiName);
        this.log("RequestServices.postRequestRemote().dataJSON", JSON.stringify(dataJSON));
        return this.http.post(projectName + apiName, JSON.stringify(dataJSON), options).pipe(
            map(res => res.json()
        ));
    }    

    uploadFileAdjuntos(apiName: string, formData: FormData) {              
        return this.http.post(this.uploadUrlAdjuntos + apiName, formData).pipe(map(data => data.json()));
    }

    postRequestAES(apiUrl:string, dataJSON:any, key:string):Observable<any>{ 
        if(key && key!=""){
            this.key=key;
        }                 
        apiUrl += "?"+this.key+"=" + localStorage.getItem(this.key) +"&s4_key=" + this.s4_key;

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8;');        
                
        this.log('apiUrl', apiUrl);        
        this.log("postRequest JSON => ", JSON.stringify(dataJSON));

        return this.httpc.post(apiUrl, JSON.stringify(dataJSON), { headers: headers });
        
    }

    private transformParams(params:any):string{
        let paramString = "";

        if(Array.isArray(params)){                  
            for(let param of params){
              paramString += this.readJSONObject(param);
            }
        }else if(params != undefined && typeof params == 'object'){                        
            paramString = this.readJSONObject(params);
        }else{
            this.log("msg","dato no definido");
        }

        return paramString;
    }

    private readJSONObject(obj:any):string{
        const _keys = Object.keys(obj);
        let data:string=""; 
        for(let _key of _keys){
            data += "&" + _key + "=" + obj[_key];
        }

        return data;
    }

    private log(evento:string, message?:any) {
        if (this.debug == true) {
            if(message){
                console.log(evento, message);
            }else{
                console.log(evento);
            }
        }
    }


    getRequestDataTransfer(apiName: string, params?: any, key?:string) { 
        if(key && key!=""){
            this.key=key;
        }
        // else{
        //     this.key="m";
        // }                 
        let parameters: string = "";
        if (params) {
            let queryString = "";
            for (let param of params) {             
                queryString += "&" + JSON.stringify(param).replace("{","").replace("}","").replace(/"/g,'').split(":")[0];
                queryString += "=";
                queryString += JSON.stringify(param).replace("{","").replace("}","").replace(/"/g,'').split(":")[1];
            }            
            if (queryString != "") {
                parameters += "?"+this.key+"="+ localStorage.getItem(this.key) + "&s4_key=" + this.s4_key + queryString;
                
            }
        } else {
            parameters += "?"+this.key+"="+ localStorage.getItem(this.key) + "&s4_key=" + this.s4_key;
        }
        this.log(this.urlDataTransfer + apiName + parameters);
        return this.http.get(this.urlDataTransfer + apiName + parameters).pipe(map(res => res.json()));
    }

    postRequestDataTransfer(apiName:string, dataJSON){
        if(dataJSON instanceof Array){
            dataJSON[0].w = localStorage.getItem("w");
            dataJSON[0].s = localStorage.getItem("s");
            dataJSON[0].s4_key = this.s4_key;
        }else{
            dataJSON.w = localStorage.getItem("w");
            dataJSON.s = localStorage.getItem("s");
            dataJSON.s4_key = this.s4_key;
        }        
              
        let headers = new Headers();  
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8;');
        let options = new RequestOptions({ headers: headers});
                
        return this.http.post(this.urlDataTransfer + apiName, JSON.stringify(dataJSON), options).pipe(
            map(res => res.json()
        ));
    }

    getRequestQuattroAutosAES(apiName: string, params?: any, key?:string) { 
        if(key && key!=""){
            this.key=key;
        }
        // else{
        //     this.key="m";
        // }                 
        let parameters: string = "";
        if (params) {
            let queryString = "";
            for (let param of params) {             
                queryString += "&" + JSON.stringify(param).replace("{","").replace("}","").replace(/"/g,'').split(":")[0];
                queryString += "=";
                queryString += JSON.stringify(param).replace("{","").replace("}","").replace(/"/g,'').split(":")[1];
            }            
            if (queryString != "") {
                parameters += "?"+this.key+"="+ localStorage.getItem(this.key) + "&s4_key=" + this.s4_key + queryString;
                
            }
        } else {
            parameters += "?"+this.key+"="+ localStorage.getItem(this.key) + "&s4_key=" + this.s4_key;
        }
        this.log(this.urlQuattroAutos + apiName + parameters);
        return this.http.get(this.urlQuattroAutos + apiName + parameters).pipe(map(res => res.json()));
    }



    postRequestQuattroAutosAES(apiName: string, dataJSON:any, key?:string):Observable<any>{
        if(key && key!=""){
            this.key=key;
        }
        // else{
        //     this.key="m";
        // } 
        let url = this.urlQuattroAutos + apiName + "?"+this.key+"=" + localStorage.getItem(this.key) + "&s4_key=" + this.s4_key;

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8;');                                

        return this.httpc.post(url, JSON.stringify(dataJSON), { headers: headers });        
    }

    postRequestErrores(dataJSON:any){
        if(dataJSON instanceof Array){
            dataJSON[0].s4_key = this.s4_key;
        }else{            
            dataJSON.s4_key = this.s4_key;
        }   
        let headers = new Headers();  
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8;');
        let options = new RequestOptions({ headers: headers});          
        this.log(JSON.stringify(dataJSON));
        return this.http.post(this.urlErrores, JSON.stringify(dataJSON), options).pipe(map(res => res.json()));
    }
}