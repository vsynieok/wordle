(function(){"use strict";var t={8587:function(t,e,r){var s=r(9242),o=r(3396),a=r(4870),n=r(7139),i={letters:{correct:"#448756",position:"#dbc15a"},greys:{background:"#242424",slots:"#1c1c1c",keys:"#404040"}},c=(0,o.aZ)({__name:"LetterCell",props:{letter:{},isActive:{type:Boolean}},setup(t){return(0,s.sj)((t=>({"096885d1":(0,a.SU)(i).letters.correct,"6b5468a2":(0,a.SU)(i).letters.position,"66a8da83":(0,a.SU)(i).greys.slots}))),(t,e)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,n.C_)(["letter-cell",{pending:"notsubmitted"===t.letter.status&&""!==t.letter.text,empty:""===t.letter.text&&t.isActive,inactive:!t.isActive&&(""===t.letter.text||"incorrect"===t.letter.status),correct:"correct"===t.letter.status,position:"incorrectposition"===t.letter.status}])},(0,n.zw)(t.letter.text),3))}}),l=r(89);const u=(0,l.Z)(c,[["__scopeId","data-v-7b7edca6"]]);var d=u;function v(t){return/^[a-zA-Z]+$/.test(t)}function p(t){return Array.from({length:t},(()=>({text:"",status:"notsubmitted"})))}function k(t,e){if(t===e)return Array.from(t).map((t=>({text:t,status:"correct"})));const r=Array.from(t),s=Array.from(e),o=r.map(((t,e)=>({text:t,status:s[e]===r[e]?"correct":s.includes(t)?"incorrectposition":"incorrect"})));return r.forEach(((t,e)=>{const a=r.filter((e=>e===t)).length,n=s.filter((e=>e===t)).length;if(a>n){if("incorrectposition"===o[e].status&&o.some((e=>e.text===t&&"correct"===e.status)))return void(o[e].status="incorrect");"incorrectposition"===o[e].status&&o.some((e=>e.text===t&&"incorrectposition"===e.status))&&(o[e].status="incorrect")}})),o}var f={MAX_TRIES:6,WORD_LENGTH:5,NOTIFICATION_TIMEOUT_MS:2e3};const g="https://random-word-api.herokuapp.com",m="https://api.dictionaryapi.dev/api/v2";var w={async getWord(t){const e=await fetch(`${g}/word?length=${t}`).then((t=>t.json()));return e[0]},async checkWord(t){try{const e=await fetch(`${m}/entries/en/${t}`);return e.ok}catch{return!1}}};const y=["tabindex"];var S=(0,o.aZ)({__name:"Attempt",props:{word:{},isActive:{type:Boolean}},emits:{wordSubmitted(t){return t},invalidWord(){return!0}},setup(t,{expose:e,emit:r}){const n=t;(0,s.sj)((t=>({"5e9d8b4b":(0,a.SU)(f).WORD_LENGTH})));const i=(0,a.qj)({currentLetterIdx:0,letters:[]}),c=(0,a.iH)(null);(0,o.m0)((()=>{n.isActive&&c.value?.focus()})),(0,o.m0)((()=>{n.word&&(i.currentLetterIdx=0,i.letters=p(f.WORD_LENGTH))}));const l=(t="pop")=>{let e="pop"===t;if(e&&0===i.currentLetterIdx)return;if(!e&&i.currentLetterIdx>f.WORD_LENGTH-1)return;let r=Array.from(i.letters);e?r[i.currentLetterIdx-1].text="":r[i.currentLetterIdx].text=t,e?i.currentLetterIdx-=1:i.currentLetterIdx+=1},u=async()=>{let t=i.letters.map((t=>t.text)).join("");if(t.length!==f.WORD_LENGTH)return!1;let e=!1;if(e=n.word===t||await w.checkWord(t),e){const e=k(t,n.word);i.letters=e,r("wordSubmitted",e)}else r("invalidWord")},g=t=>{switch(t.key){case"Backspace":l();break;case"Enter":u();break;default:if(1!==t.key.length)return;v(t.key)&&l(t.key);break}},m=t=>{i.letters=t};return e({setLettersFromSave:m}),(t,e)=>((0,o.wg)(),(0,o.iD)("div",{ref_key:"attempt",ref:c,class:"attempt",tabindex:t.isActive?0:-1,onKeydown:g},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.letters,((e,r)=>((0,o.wg)(),(0,o.j4)(d,{key:`letter-${r}`,letter:e,"is-active":t.isActive},null,8,["letter","is-active"])))),128))],40,y))}});const h=(0,l.Z)(S,[["__scopeId","data-v-50fab530"]]);var _=h;const x="savedata",b=()=>({useSave:!1,attempts:[],stats:{maxStreak:0,streak:0,totalPoints:0},word:"",keys:{correct:[],position:[],used:[]},showResults:!1});var I={checkStorage(){try{const t=localStorage.getItem(x);return null!==t&&this.getSave().useSave}catch{return!1}},getSave(){const t=localStorage.getItem(x);let e;return e=null!==t?JSON.parse(t):b(),e},setSave(t){localStorage.setItem(x,JSON.stringify(t))},reset(){localStorage.setItem(x,JSON.stringify(b()))},resetWordData(){const t=this.getSave();t.attempts=[],t.word="",t.keys={correct:[],used:[],position:[]},t.showResults=!1,this.setSave(t)}};const T={key:0,class:"loading"},A={key:1,class:"board"};var O=(0,o.aZ)({__name:"Board",props:{word:{},isLoading:{type:Boolean}},emits:{resultSubmitted(t){return t},usedLetters(t){return t},invalidWord(){return!0}},setup(t,{emit:e}){const r=t,s=(0,a.iH)(),n=(0,a.qj)({activeAttemptIdx:0}),i=t=>{const s=t.map((t=>t.text)).join("");return s===r.word?(e("resultSubmitted",f.MAX_TRIES-n.activeAttemptIdx),void e("usedLetters",t)):n.activeAttemptIdx<f.MAX_TRIES-1?(n.activeAttemptIdx+=1,void e("usedLetters",t)):void(n.activeAttemptIdx===f.MAX_TRIES-1&&e("resultSubmitted",0))};(0,o.m0)((()=>{if(r.word)if(I.checkStorage()){let t=I.getSave();n.activeAttemptIdx=t.attempts.length}else n.activeAttemptIdx=0}));const c=t=>{if(I.checkStorage()){let e=I.getSave(),r=s.value?.at(t.key);r?.setLettersFromSave(e.attempts.at(t.key)??p(f.WORD_LENGTH))}};return(t,l)=>r.isLoading?((0,o.wg)(),(0,o.iD)("div",T,"Thinking of a word...")):((0,o.wg)(),(0,o.iD)("div",A,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(Array.from({length:(0,a.SU)(f).MAX_TRIES},((t,e)=>e)),(t=>((0,o.wg)(),(0,o.j4)(_,{word:r.word,key:t,"is-active":t===n.activeAttemptIdx,onWordSubmitted:i,ref_for:!0,ref_key:"attempts",ref:s,onVnodeMounted:c,onInvalidWord:l[0]||(l[0]=()=>e("invalidWord"))},null,8,["word","is-active"])))),128))]))}});const W=(0,l.Z)(O,[["__scopeId","data-v-8f1dcf4c"]]);var L=W;const j={class:"stat"};var R=(0,o.aZ)({__name:"Stat",props:{title:{},value:{}},setup(t){return(0,s.sj)((t=>({"35fa369d":(0,a.SU)(i).greys.background}))),(t,e)=>((0,o.wg)(),(0,o.iD)("div",j,[(0,o._)("h2",null,(0,n.zw)(t.title)+":",1),(0,o.Uk)(" "+(0,n.zw)(t.value),1)]))}});const D=(0,l.Z)(R,[["__scopeId","data-v-4f2f1126"]]);var N=D;const K=t=>((0,o.dD)("data-v-5d9f7fce"),t=t(),(0,o.Cn)(),t),E={class:"results"},U={class:"modal"},H=K((()=>(0,o._)("div",{class:"header"},[(0,o._)("h1",null,"Results")],-1))),M={class:"content"},P={class:"footer"};var Z=(0,o.aZ)({__name:"Results",props:{points:{},totalPoints:{},maxStreak:{},streak:{}},emits:{nextStep(t){return t},hide(){return!0}},setup(t,{emit:e}){return(0,s.sj)((t=>({"2f7d0466":(0,a.SU)(i).greys.keys,"7ed163fa":(0,a.SU)(i).greys.slots,"771de3c0":(0,a.SU)(i).greys.background}))),(t,r)=>((0,o.wg)(),(0,o.iD)("div",E,[(0,o._)("div",U,[H,(0,o._)("div",M,[(0,o.Wm)(N,{title:"Points for this round",value:t.points},null,8,["value"]),(0,o.Wm)(N,{title:"Total points",value:t.totalPoints},null,8,["value"]),(0,o.Wm)(N,{title:"Current streak",value:t.streak},null,8,["value"]),(0,o.Wm)(N,{title:"Max streak",value:t.maxStreak},null,8,["value"])]),(0,o._)("div",P,[(0,o._)("button",{onClick:r[0]||(r[0]=()=>e("nextStep",!0))},"Start over"),(0,o._)("button",{onClick:r[1]||(r[1]=()=>e("nextStep",!1))},"Next word")])])]))}});const C=(0,l.Z)(Z,[["__scopeId","data-v-5d9f7fce"]]);var q=C,F=(r(7658),(0,o.aZ)({__name:"KeyLetter",props:{letter:{},status:{}},setup(t){return(0,s.sj)((t=>({"93cd5034":(0,a.SU)(i).greys.keys,"0d856a83":(0,a.SU)(i).greys.slots,"6105d45e":(0,a.SU)(i).letters.correct,"67d1d8a2":(0,a.SU)(i).letters.position}))),(t,e)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,n.C_)(["keyletter",t.status])},(0,n.zw)(t.letter),3))}}));const z=(0,l.Z)(F,[["__scopeId","data-v-44cdedd1"]]);var G=z;const $={class:"keyboard"},B={class:"keyboard-row"},Y={class:"keyboard-row"},V={class:"keyboard-row"};var X=(0,o.aZ)({__name:"KeyBoard",setup(t,{expose:e}){const r=(0,a.qj)({keys:["qwertyuiop","asdfghjkl","zxcvbnm#$"],correctKeys:[],wrongKeys:[],positionKeys:[]}),s=t=>r.correctKeys.includes(t)?"correct":r.wrongKeys.includes(t)?"used":r.positionKeys.includes(t)?"position":"unused",n=t=>{let e=I.getSave();e.attempts.push(t),e.useSave=!0,t.forEach((t=>{switch(t.status){case"correct":r.correctKeys.push(t.text),e.keys.correct.push(t.text);break;case"incorrect":r.wrongKeys.push(t.text),e.keys.used.push(t.text);break;case"incorrectposition":r.positionKeys.push(t.text),e.keys.position.push(t.text);break;default:return}})),I.setSave(e)},i=()=>{let t=I.getSave();r.correctKeys=t.keys.correct,r.wrongKeys=t.keys.used,r.positionKeys=t.keys.position};return(0,o.bv)((()=>{I.checkStorage()&&i()})),e({setKeys:n,loadSaveData:i}),(t,e)=>((0,o.wg)(),(0,o.iD)("div",$,[(0,o._)("div",B,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(r.keys[0].split(""),(t=>((0,o.wg)(),(0,o.j4)(G,{letter:t,key:t,status:s(t)},null,8,["letter","status"])))),128))]),(0,o._)("div",Y,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(r.keys[1].split(""),(t=>((0,o.wg)(),(0,o.j4)(G,{letter:t,key:t,status:s(t)},null,8,["letter","status"])))),128))]),(0,o._)("div",V,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(r.keys[2].split(""),(t=>((0,o.wg)(),(0,o.j4)(G,{letter:"#"===t?"Enter":"$"===t?"Backspace":t,key:t,status:s(t)},null,8,["letter","status"])))),128))])]))}});const J=(0,l.Z)(X,[["__scopeId","data-v-bf788650"]]);var Q=J;const tt={key:0,class:"notification"};var et=(0,o.aZ)({__name:"Notification",setup(t,{expose:e}){(0,s.sj)((t=>({dbd901ac:(0,a.SU)(f).NOTIFICATION_TIMEOUT_MS/1e3+"s"})));const r=(0,a.qj)({isVisible:!1,msg:""}),i=t=>{r.msg=t,r.isVisible=!0,setTimeout((()=>r.isVisible=!1),f.NOTIFICATION_TIMEOUT_MS)};return e({show:i}),(t,e)=>r.isVisible?((0,o.wg)(),(0,o.iD)("div",tt,(0,n.zw)(r.msg),1)):(0,o.kq)("",!0)}});const rt=(0,l.Z)(et,[["__scopeId","data-v-1cd88395"]]);var st=rt,ot={getMessageForResult(t){switch(t){case 1:return"That's a guess...";case 2:return"Not bad";case 3:return"Well done";case 4:return"Good job";case 5:return"Amazing!";case 6:return"Wow!";default:return""}}},at=(0,o.aZ)({__name:"App",setup(t){const e=(0,a.iH)(),r=(0,a.iH)(),s=(0,a.qj)({currentWord:"",wordPoints:0,totalPoints:0,streak:0,maxStreak:0,showResults:!1,isLoading:!0}),n=t=>{s.wordPoints=t,s.totalPoints+=t,s.streak+=1,0===t?(s.streak=0,r.value?.show(s.currentWord)):r.value?.show(ot.getMessageForResult(t)),s.streak>s.maxStreak&&(s.maxStreak=s.streak),setTimeout((()=>s.showResults=!0),f.NOTIFICATION_TIMEOUT_MS);let e=I.getSave();e.stats={totalPoints:s.totalPoints,streak:s.streak,maxStreak:s.maxStreak},e.showResults=!0,I.setSave(e)},i=()=>{r.value?.show("Not a word...")},c=t=>{t?(s.wordPoints=0,s.totalPoints=0,s.streak=0,s.maxStreak=0,I.reset()):I.resetWordData(),s.showResults=!1,d()},l=t=>{e.value?.setKeys(t)},u=()=>{s.showResults=!1},d=async()=>{s.isLoading=!0;let t=await w.getWord(f.WORD_LENGTH);s.currentWord=t;let e=I.getSave();e.word=t,I.setSave(e),s.isLoading=!1};return(0,o.bv)((()=>{if(I.checkStorage()){let t=I.getSave();return s.currentWord=t.word,s.totalPoints=t.stats.totalPoints,s.streak=t.stats.streak,s.maxStreak=t.stats.maxStreak,s.isLoading=!1,void(s.showResults=t.showResults)}d()})),(t,a)=>((0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(st,{ref_key:"notification",ref:r},null,512),(0,o.Wm)(L,{word:s.currentWord,onResultSubmitted:n,onUsedLetters:l,onInvalidWord:i,"is-loading":s.isLoading},null,8,["word","is-loading"]),s.isLoading?(0,o.kq)("",!0):((0,o.wg)(),(0,o.j4)(Q,{key:0,ref_key:"keyboard",ref:e},null,512)),s.showResults?((0,o.wg)(),(0,o.j4)(q,{key:1,points:s.wordPoints,"total-points":s.totalPoints,streak:s.streak,"max-streak":s.maxStreak,onNextStep:c,onHide:u},null,8,["points","total-points","streak","max-streak"])):(0,o.kq)("",!0)],64))}});const nt=at;var it=nt;(0,s.ri)(it).mount("#app")}},e={};function r(s){var o=e[s];if(void 0!==o)return o.exports;var a=e[s]={exports:{}};return t[s].call(a.exports,a,a.exports,r),a.exports}r.m=t,function(){var t=[];r.O=function(e,s,o,a){if(!s){var n=1/0;for(u=0;u<t.length;u++){s=t[u][0],o=t[u][1],a=t[u][2];for(var i=!0,c=0;c<s.length;c++)(!1&a||n>=a)&&Object.keys(r.O).every((function(t){return r.O[t](s[c])}))?s.splice(c--,1):(i=!1,a<n&&(n=a));if(i){t.splice(u--,1);var l=o();void 0!==l&&(e=l)}}return e}a=a||0;for(var u=t.length;u>0&&t[u-1][2]>a;u--)t[u]=t[u-1];t[u]=[s,o,a]}}(),function(){r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,{a:e}),e}}(),function(){r.d=function(t,e){for(var s in e)r.o(e,s)&&!r.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};r.O.j=function(e){return 0===t[e]};var e=function(e,s){var o,a,n=s[0],i=s[1],c=s[2],l=0;if(n.some((function(e){return 0!==t[e]}))){for(o in i)r.o(i,o)&&(r.m[o]=i[o]);if(c)var u=c(r)}for(e&&e(s);l<n.length;l++)a=n[l],r.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return r.O(u)},s=self["webpackChunkwordle"]=self["webpackChunkwordle"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=r.O(void 0,[998],(function(){return r(8587)}));s=r.O(s)})();
//# sourceMappingURL=app.450aeb28.js.map