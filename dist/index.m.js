import e from"axios";function t(){return t=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},t.apply(this,arguments)}function r(e,t){return r=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},r(e,t)}var n;function o(e,t){try{var r=e()}catch(e){return t(e)}return r&&r.then?r.then(void 0,t):r}!function(e){e.PROD="https://api-prod.getmessenger.ng",e.STAGING="https://api-staging.getmessenger.ng"}(n||(n={}));var s=/*#__PURE__*/function(e){var t,n;function o(){return e.apply(this,arguments)||this}return n=e,(t=o).prototype=Object.create(n.prototype),t.prototype.constructor=t,r(t,n),o}(/*#__PURE__*/function(){function r(t,r,o){var s=this;if(this.baseURL=void 0,this.publicKey=void 0,this.privateKey=void 0,this.axiosInstance=void 0,this.environment=n.PROD,this.baseAuthUrl=void 0,this.accessToken=null,this.authenticationData=null,this.baseAuthUrl="/auth",!t||!r)throw new Error("Public or Private keys are required!");this.environment||console.warn("No environment specified. Defaulting to development."),this.environment=o||"development",this.baseURL="test"===this.environment||"development"===this.environment?n.STAGING:n.PROD,this.publicKey=t,this.privateKey=r,this.axiosInstance=e.create({baseURL:this.baseURL,headers:{"Content-Type":"application/json"}}),this.axiosInstance.interceptors.response.use(function(e){return e},function(t){try{return t.response&&401===t.response.status?(s.login(),Promise.resolve(e(t.config))):Promise.reject(t)}catch(e){return Promise.reject(e)}})}var s=r.prototype;return s.login=function(){try{var e=this;if(!e.publicKey||!e.privateKey)throw new Error("Public or Private keys are required!");e.environment||console.warn("No environment specified. Defaulting to development.");var t=Buffer.from(e.publicKey+":"+e.privateKey).toString("base64");return Promise.resolve(o(function(){return Promise.resolve(e.axiosInstance.post(e.baseAuthUrl+"/login",{},{headers:{Authorization:"Basic "+t},auth:{username:e.publicKey,password:e.privateKey}})).then(function(t){return e.accessToken=t.headers["access-token"],t.data})},function(e){var t;return console.warn(null==e||null==(t=e.response)||null==(t=t.data)?void 0:t.message),e.response.data}))}catch(e){return Promise.reject(e)}},s.makeApiRequest=function(r){try{var n=this;return Promise.resolve(o(function(){if(!n.accessToken)throw new Error("Access token is missing or invalid.");return r.headers=t({},r.headers,{Authorization:"Bearer "+n.accessToken}),Promise.resolve(n.axiosInstance(r)).then(function(e){return e.data})},function(t){var o;function s(e){if(o)return e;throw console.error("Unknown error:",t),t}var i=function(){if(e.isAxiosError(t)){var s=function(e){var t;if(o)return e;throw console.error("API request failed:",null==i||null==(t=i.response)?void 0:t.data),i},i=t,a=function(){if(i.response&&401===i.response.status)return console.error("Received 401. Attempting to refresh access token..."),Promise.resolve(n.login()).then(function(){console.log(n.login()),console.log("Access token successfully refreshed. Retrying the request.");var e=n.makeApiRequest(r);return o=1,e})}();return a&&a.then?a.then(s):s(a)}}();return i&&i.then?i.then(s):s(i)}))}catch(e){return Promise.reject(e)}},s.getAccessToken=function(){return this.accessToken?this.accessToken:null},r}());export{s as default};
