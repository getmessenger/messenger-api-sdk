!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("axios")):"function"==typeof define&&define.amd?define(["axios"],t):(e||self).messengerApiSdk=t(e.axios)}(this,function(e){function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=/*#__PURE__*/t(e);function n(){return n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},n.apply(this,arguments)}function o(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,s(e,t)}function s(e,t){return s=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},s(e,t)}var i,a=/*#__PURE__*/function(){function e(e){this.apiKey=void 0,this.baseUrl=void 0,this.apiKey=e.apiKey,this.baseUrl=e.baseUrl||"https://api-prod.getmessenger.ng"}return e.prototype.request=function(e,t,o,s){var i=n({method:t,url:""+this.baseUrl+e,headers:{"Content-Type":"application/json","api-key":this.apiKey}},s,{data:o?JSON.stringify(o):void 0});return r.default(i).then(function(e){if(e.status>=200&&e.status<300)return e.data;throw new Error(e.statusText)}).catch(function(e){throw e.response?new Error("Status: "+e.response.status+", "+e.response.statusText):e.request?new Error("No response received."):new Error("Check your network connection and try again.")})},e}(),c=/*#__PURE__*/function(e){function t(t,r){var n;return(n=e.call(this,{apiKey:"",baseUrl:"https://api-prod.getmessenger.ng"})||this).publicKey=void 0,n.privateKey=void 0,n.accessToken=void 0,n.publicKey=t,n.privateKey=r,n.accessToken=null,n}o(t,e);var r=t.prototype;return r.generateBearerToken=function(){try{var e=this;if(e.accessToken)return Promise.resolve(e.accessToken);var t={username:e.publicKey,password:e.privateKey};return Promise.resolve(function(r,n){try{var o=Promise.resolve(e.authenticate(t)).then(function(t){if(t&&t.headers&&t.headers["access-token"])return e.accessToken=t.headers["access-token"],e.accessToken;throw new Error("Access token not found in the response headers.")})}catch(e){return n(e)}return o&&o.then?o.then(void 0,n):o}(0,function(e){return console.error("Authentication failed: "+e.message),null}))}catch(e){return Promise.reject(e)}},r.authenticate=function(e){try{return Promise.resolve(this.request("auth/login","POST",{data:e}))}catch(e){return Promise.reject(e)}},t}(a),u=/*#__PURE__*/function(e){function t(){return e.apply(this,arguments)||this}return o(t,e),t}(a);return i=u,[c].forEach(function(e){Object.getOwnPropertyNames(e.prototype).forEach(function(t){Object.defineProperty(i.prototype,t,Object.getOwnPropertyDescriptor(e.prototype,t)||Object.create(null))})}),u});
