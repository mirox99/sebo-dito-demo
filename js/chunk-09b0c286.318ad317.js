(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09b0c286"],{"00fd":function(e,t,i){var n=i("9e69"),s=Object.prototype,o=s.hasOwnProperty,r=s.toString,a=n?n.toStringTag:void 0;function c(e){var t=o.call(e,a),i=e[a];try{e[a]=void 0;var n=!0}catch(c){}var s=r.call(e);return n&&(t?e[a]=i:delete e[a]),s}e.exports=c},1310:function(e,t){function i(e){return null!=e&&"object"==typeof e}e.exports=i},"1a8c":function(e,t){function i(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}e.exports=i},"21bb":function(e,t,i){"use strict";i("2dad")},"29f3":function(e,t){var i=Object.prototype,n=i.toString;function s(e){return n.call(e)}e.exports=s},"2b3e":function(e,t,i){var n=i("585a"),s="object"==typeof self&&self&&self.Object===Object&&self,o=n||s||Function("return this")();e.exports=o},"2dad":function(e,t,i){},"342e":function(e,t,i){e.exports=i.p+"img/sebo.bd93d863.svg"},3729:function(e,t,i){var n=i("9e69"),s=i("00fd"),o=i("29f3"),r="[object Null]",a="[object Undefined]",c=n?n.toStringTag:void 0;function u(e){return null==e?void 0===e?a:r:c&&c in Object(e)?s(e):o(e)}e.exports=u},"408c":function(e,t,i){var n=i("2b3e"),s=function(){return n.Date.now()};e.exports=s},"585a":function(e,t,i){(function(t){var i="object"==typeof t&&t&&t.Object===Object&&t;e.exports=i}).call(this,i("c8ba"))},6214:function(e,t,i){e.exports=i.p+"img/dito.3342c812.svg"},"9e69":function(e,t,i){var n=i("2b3e"),s=n.Symbol;e.exports=s},b047:function(e,t,i){var n=i("1a8c"),s=i("408c"),o=i("b4b0"),r="Expected a function",a=Math.max,c=Math.min;function u(e,t,i){var u,l,d,v,f,p,m=0,h=!1,b=!1,x=!0;if("function"!=typeof e)throw new TypeError(r);function y(t){var i=u,n=l;return u=l=void 0,m=t,v=e.apply(n,i),v}function w(e){return m=e,f=setTimeout(T,t),h?y(e):v}function M(e){var i=e-p,n=e-m,s=t-i;return b?c(s,d-n):s}function g(e){var i=e-p,n=e-m;return void 0===p||i>=t||i<0||b&&n>=d}function T(){var e=s();if(g(e))return I(e);f=setTimeout(T,M(e))}function I(e){return f=void 0,x&&u?y(e):(u=l=void 0,v)}function S(){void 0!==f&&clearTimeout(f),m=0,u=p=l=f=void 0}function j(){return void 0===f?v:I(s())}function O(){var e=s(),i=g(e);if(u=arguments,l=this,p=e,i){if(void 0===f)return w(p);if(b)return clearTimeout(f),f=setTimeout(T,t),y(p)}return void 0===f&&(f=setTimeout(T,t)),v}return t=o(t)||0,n(i)&&(h=!!i.leading,b="maxWait"in i,d=b?a(o(i.maxWait)||0,t):d,x="trailing"in i?!!i.trailing:x),O.cancel=S,O.flush=j,O}e.exports=u},b4b0:function(e,t,i){var n=i("1a8c"),s=i("ffd6"),o=NaN,r=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,u=/^0o[0-7]+$/i,l=parseInt;function d(e){if("number"==typeof e)return e;if(s(e))return o;if(n(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=n(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(r,"");var i=c.test(e);return i||u.test(e)?l(e.slice(2),i?2:8):a.test(e)?o:+e}e.exports=d},bb51:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"home"},[i("div",{staticClass:"home-content"},[i("div",{staticClass:"slider-container"},e._l(e.slides,(function(t){return i("img",{key:t.id,ref:"slide"+t.id,refInFor:!0,staticClass:"swiper-image",class:{active:e.activeSlideId===t.id},attrs:{alt:t.name,id:"slide"+t.id,src:t.src}})})),0),i("transition",{attrs:{name:"slide"}},[e.menuIsOpen?e._e():i("h2",{staticClass:"home-header"},[i("span",{staticClass:"title",class:{active:0===e.activeSlide.id}},[e._v("Sebo")]),i("span",{staticClass:"title",class:{active:1===e.activeSlide.id}},[e._v("dito")]),i("span",{staticClass:"title"},[e._v("&")]),i("span",{staticClass:"title"},[e._v("Partners")])])])],1),i("Menu",{key:"menu"})],1)},s=[],o=i("b047"),r=i.n(o),a=i("2f62"),c=i("fb62"),u={name:"Home",data(){return{slides:[{id:0,src:i("6214"),name:"sebo"},{id:1,src:i("342e"),name:"dito"}],activeSlideId:0,prevCursorPositionX:0,cursorPosition:{x:0,y:0},slideMoveInterval:null,eventTimeouts:[],debounceMouseMove:null}},components:{Menu:c["default"]},computed:{...Object(a["c"])("menu",{menuIsOpen:"menuIsOpen"}),activeSlide(){return this.slides.find(e=>e.id===this.activeSlideId)},inActiveSlide(){return this.slides.find(e=>e.id!==this.activeSlideId)}},methods:{slideMoveUp(e,t){let i=-90,n=this.$refs["slide"+this.inActiveSlide.id][0];this.eventTimeouts[2]=setTimeout(()=>{clearInterval(this.slideMoveInterval),n.style.transform="translateY(0px)",this.slideMoveInterval=setInterval(()=>{i<-120?clearInterval(this.slideMoveInterval):i-=.015,e.style.transform=`translateY(${i}px)`},1)},t)},slideAnimationHandler(e){this.activeSlideId=e.id;let t=this.cursorPosition.x/window.innerWidth*100,i=this.cursorPosition.y/window.innerHeight*100;const n=this.$refs["slide"+e.id][0];n.animate([{clipPath:`circle(0% at ${t}% ${i}%)`},{clipPath:`circle(141% at ${t}% ${i}%)`}],{easing:"cubic-bezier(.63,0,.36,1)",duration:1e3}),this.slideMoveUp(n,580)},mouseMoveHandler(e){const[t,i]=this.slides;if(this.menuIsOpen)return;const n=window.innerWidth/2;this.cursorPosition={x:e.x,y:e.y},e.x>n&&this.prevCursorPositionX<n&&(this.eventTimeouts[0]=setTimeout(()=>{this.slideAnimationHandler(i)},100)),e.x<n&&this.prevCursorPositionX>n&&(this.eventTimeouts[1]=setTimeout(()=>{this.slideAnimationHandler(t)},100)),this.prevCursorPositionX=e.x},windowEventHandler(){this.debounceMouseMove=r()(this.mouseMoveHandler,400),document.addEventListener("mousemove",this.debounceMouseMove,!1)}},mounted(){this.$nextTick(()=>{let e=this.$refs["slide"+this.slides[0].id][0];this.windowEventHandler(),this.slideMoveUp(e,1030)})},beforeDestroy(){document.removeEventListener("mousemove",this.debounceMouseMove,!1),this.eventTimeouts.forEach(e=>{clearTimeout(e)})}},l=u,d=(i("21bb"),i("2877")),v=Object(d["a"])(l,n,s,!1,null,null,null);t["default"]=v.exports},ffd6:function(e,t,i){var n=i("3729"),s=i("1310"),o="[object Symbol]";function r(e){return"symbol"==typeof e||s(e)&&n(e)==o}e.exports=r}}]);
//# sourceMappingURL=chunk-09b0c286.318ad317.js.map