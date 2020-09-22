># Angular And Cordys Connectivity
### 1) [NodeJs Download And Install](https://nodejs.org/en/download/)
### 2) [Angular Cli Install](https://cli.angular.io/) 
```bash
npm install -g @angular/cli
```
### 3) Create new App 
```bash
ng new my-app
cd my-app
ng serve --open
```
### 4) Create Folder (src\assets\js)
### 5) [jquery-3.5.1.min.js](https://raw.githubusercontent.com/dhananjay431/AngularAndCordysConnectivity/master/jquery-3.5.1.min.js)  -> copy and paste -> src\assets\js
### 6) [cordys.html5sdk.js](https://raw.githubusercontent.com/dhananjay431/AngularAndCordysConnectivity/master/cordys.html5sdk.js) -> copy and paste -> src\assets\js
### 7) Open angular.json and Add 
```json
 "scripts": [
          "src/assets/js/jquery-3.5.1.min.js",
          "src/assets/js/cordys.html5sdk.js",
 ]
```

### 8) [hero.service.ts](https://raw.githubusercontent.com/dhananjay431/AngularAndCordysConnectivity/master/hero.service.ts) -> Copy and Paste -> src\app\
```js
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
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
```
### 9) Create proxy.conf.json(https://raw.githubusercontent.com/dhananjay431/AngularAndCordysConnectivity/master/proxy.conf.json) -> \proxy.conf.json
```json
{
    "/com.eibus.web.soap.Gateway.wcp": {
        "target": "https://{IP}/{PATH}",
        "secure": false,
        "logLevel": "debug",
        "changeOrigin": false
    },
    "/com.eibus.sso.web.authentication.PreLoginInfo.wcp": {
        "target": "https://{IP}/{PATH}/",
        "secure": false,
        "logLevel": "debug",
        "changeOrigin": false
    },
    "/cordys/": {
        "target": "https://{IP}/",
        "secure": false,
        "logLevel": "debug",
        "changeOrigin": false
    }
}

```
### 10) Sample Code For Login 
```ts
deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
login(){
    let t = this;
    $.cordys.authentication.sso.authenticate("userId","Password").done(function (resp) {
    if(environment.production == false){
        if (document.cookie != "") {
        localStorage.token = $.cordys.getCookie("defaultinst_SAMLart");
        t.deleteAllCookies();
        }
    }
    t.router.navigate(["/dashboard"]);
})
}
```
### 11) Ajax Call Sample Code
```ts
import { HeroService } from '../../../hero.service';
declare var $: any,toastr:any;

constructor(private heroService: HeroService) { }

this.heroService.ajax( "Method_Name", "NameSpace", { /* params  */}  )
.then(function (resp) {
		 let obj = $.cordys.json.findObjects(resp,"user");
});
```