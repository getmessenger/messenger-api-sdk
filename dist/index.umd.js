!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("axios")):"function"==typeof define&&define.amd?define(["axios"],t):(e||self).messengerMerchant=t(e.axios)}(this,function(e){function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r,n=/*#__PURE__*/t(e);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s.apply(this,arguments)}function o(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,i(e,t)}function i(e,t){return i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},i(e,t)}function a(e,t){try{var r=e()}catch(e){return t(e)}return r&&r.then?r.then(void 0,t):r}return function(e){e.PROD="https://api-prod.getmessenger.ng",e.STAGING="https://api-staging.getmessenger.ng"}(r||(r={})),/*#__PURE__*/function(e){function t(t,r){return e.call(this,t,r)||this}return o(t,e),t}(/*#__PURE__*/function(e){function t(t,r){var n;return(n=e.call(this,t,r)||this).baseOrderUrl=void 0,n.baseOrderUrl="/orders",n}o(t,e);var r=t.prototype;return r.estimateOrder=function(e){try{return Promise.resolve(this.makeApiRequest({method:"post",url:this.baseOrderUrl+"/estimate",data:e}))}catch(e){return Promise.reject(e)}},r.getAddressCoordinates=function(e){try{return Promise.resolve(this.makeApiRequest({method:"post",url:this.baseOrderUrl+"/get-address-coordinates",data:e}))}catch(e){return Promise.reject(e)}},r.confirmOrder=function(e){try{return Promise.resolve(this.makeApiRequest({method:"post",url:this.baseOrderUrl+"/confirm",data:e}))}catch(e){return Promise.reject(e)}},r.cancelOrder=function(e,t){try{return Promise.resolve(this.makeApiRequest({method:"post",url:this.baseOrderUrl+"/"+t+"/cancel",data:e}))}catch(e){return Promise.reject(e)}},r.disputeOrder=function(e,t){try{return Promise.resolve(this.makeApiRequest({method:"post",url:this.baseOrderUrl+"/"+t+"/dispute",data:e}))}catch(e){return Promise.reject(e)}},r.fetchOrders=function(){try{return Promise.resolve(this.makeApiRequest({method:"get",url:""+this.baseOrderUrl}))}catch(e){return Promise.reject(e)}},r.fetchOrderById=function(e){try{return Promise.resolve(this.makeApiRequest({method:"get",url:this.baseOrderUrl+"/"+e}))}catch(e){return Promise.reject(e)}},r.fetchOrdersAnalytics=function(){try{return Promise.resolve(this.makeApiRequest({method:"get",url:this.baseOrderUrl+"/analytics"}))}catch(e){return Promise.reject(e)}},t}(/*#__PURE__*/function(e){function t(t,r){var n;return(n=e.call(this,t,r)||this).baseWalletUrl=void 0,n.baseWalletUrl="/wallets",n}o(t,e);var r=t.prototype;return r.checkWalletBalance=function(){try{return Promise.resolve(this.makeApiRequest({method:"get",url:this.baseWalletUrl}))}catch(e){return Promise.reject(e)}},r.getAllTransactions=function(e){try{return Promise.resolve(this.makeApiRequest({method:"get",url:this.baseWalletUrl+"/"+e+"/transactions"}))}catch(e){return Promise.reject(e)}},r.getTransactionByReference=function(e){try{return Promise.resolve(this.makeApiRequest({method:"get",url:this.baseWalletUrl+"/transactions/"+e}))}catch(e){return Promise.reject(e)}},t}(/*#__PURE__*/function(){function e(e,t){var s=this;if(this.baseURL=void 0,this.publicKey=void 0,this.privateKey=void 0,this.axiosInstance=void 0,this.environment=void 0,this.baseAuthUrl=void 0,this.accessToken=null,this.authenticationData=null,this.baseAuthUrl="/auth",!e||!t)throw new Error("Public or Private keys are required!");this.environment=e.toLowerCase().includes("live")||t.toLowerCase().includes("live")?r.PROD:r.STAGING,this.baseURL=this.environment===r.PROD?r.PROD:r.STAGING,this.publicKey=e,this.privateKey=t,this.axiosInstance=n.default.create({baseURL:this.baseURL,headers:{"Content-Type":"application/json"}}),this.axiosInstance.interceptors.response.use(function(e){return e},function(e){try{return e.response&&401===e.response.status?(s.login(),Promise.resolve(n.default(e.config))):Promise.reject(e)}catch(e){return Promise.reject(e)}})}var t=e.prototype;return t.login=function(){try{var e=this;if(!e.publicKey||!e.privateKey)throw new Error("Public or Private keys are required!");e.environment||console.warn("No environment specified. Defaulting to development.");var t=Buffer.from(e.publicKey+":"+e.privateKey).toString("base64");return Promise.resolve(a(function(){return Promise.resolve(e.axiosInstance.post(e.baseAuthUrl+"/login",{},{headers:{Authorization:"Basic "+t},auth:{username:e.publicKey,password:e.privateKey}})).then(function(t){return e.accessToken=t.headers["access-token"],t.data})},function(e){var t;return console.warn(null==e||null==(t=e.response)||null==(t=t.data)?void 0:t.message),e.response.data}))}catch(e){return Promise.reject(e)}},t.makeApiRequest=function(e){try{var t=this;return Promise.resolve(a(function(){function r(r){return e.headers=s({},e.headers,{Authorization:"Bearer "+t.accessToken}),Promise.resolve(t.axiosInstance(e)).then(function(e){return e.data})}var n=function(){if(!t.accessToken)return Promise.resolve(t.login()).then(function(e){if(!e||!t.accessToken)throw new Error("Failed to obtain access token.")})}();return n&&n.then?n.then(r):r()},function(r){var s;function o(e){if(s)return e;throw console.error("Unknown error:",r),r}var i=function(){if(n.default.isAxiosError(r)){var o=function(e){var t;if(s)return e;throw console.error("API request failed:",null==i||null==(t=i.response)?void 0:t.data),i},i=r,a=function(){if(i.response&&401===i.response.status)return console.error("Received 401. Attempting to refresh access token..."),Promise.resolve(t.login()).then(function(){console.log("Access token successfully refreshed. Retrying the request.");var r=t.makeApiRequest(e);return s=1,r})}();return a&&a.then?a.then(o):o(a)}}();return i&&i.then?i.then(o):o(i)}))}catch(e){return Promise.reject(e)}},t.getAccessToken=function(){return this.accessToken?this.accessToken:null},e}())))});
