import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  ajax(method,namespace,parameters){
    if(environment.production == true){
      return new Promise((rev,rej)=>{
        $.cordys.ajax({
          method:method,
          timeout:environment.timeout,
          namespace:namespace,
          dataType: "* json",
          parameters: parameters,
          success: function success(resp) {
             rev(resp);
          },
          error:function error(e1,e2,e3){
             rej([e1,e2,e3]);
          }
        })
      })
    }else{
      return new Promise((rev,rej)=>{
        $.cordys.ngajax({
          method:method,
          timeout:environment.timeout,
          namespace:namespace,
          dataType: "* json",
          parameters: parameters,
          success: function success(resp) {
            rev(resp);
         },
         error:function error(e1,e2,e3){
            rej([e1,e2,e3]);
         }
        })
      })
    }
  }
  
}