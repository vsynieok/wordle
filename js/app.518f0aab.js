(function(){"use strict";var t={7055:function(t,e,r){var s=r(9242),o=r(3396),a=r(4870),n=r(7139),i={letters:{correct:"#448756",position:"#dbc15a"},greys:{background:"#242424",slots:"#1c1c1c",keys:"#404040"}},c=(0,o.aZ)({__name:"LetterCell",props:{letter:{},isActive:{type:Boolean}},setup(t){return(0,s.sj)((t=>({"096885d1":(0,a.SU)(i).letters.correct,"6b5468a2":(0,a.SU)(i).letters.position,"66a8da83":(0,a.SU)(i).greys.slots}))),(t,e)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,n.C_)(["letter-cell",{pending:"notsubmitted"===t.letter.status&&""!==t.letter.text,empty:""===t.letter.text&&t.isActive,inactive:!t.isActive&&(""===t.letter.text||"incorrect"===t.letter.status),correct:"correct"===t.letter.status,position:"incorrectposition"===t.letter.status}])},(0,n.zw)(t.letter.text),3))}}),l=r(89);const u=(0,l.Z)(c,[["__scopeId","data-v-7b7edca6"]]);var d=u;function v(t){return/^[a-zA-Z]+$/.test(t)}function p(t){return Array.from({length:t},(()=>({text:"",status:"notsubmitted"})))}function k(t,e){if(t===e)return Array.from(t).map((t=>({text:t,status:"correct"})));const r=Array.from(t),s=Array.from(e),o=r.map(((t,e)=>({text:t,status:s[e]===r[e]?"correct":s.includes(t)?"incorrectposition":"incorrect"})));return r.forEach(((t,e)=>{const a=r.filter((e=>e===t)).length,n=s.filter((e=>e===t)).length;if(a>n){if("incorrectposition"===o[e].status&&o.some(((r,s)=>r.text===t&&"correct"===r.status&&s!==e)))return void(o[e].status="incorrect");"incorrectposition"===o[e].status&&o.some(((r,s)=>r.text===t&&"incorrectposition"===r.status&&s!==e))&&(o[e].status="incorrect")}})),o}var m={MAX_TRIES:6,WORD_LENGTH:5,NOTIFICATION_TIMEOUT_MS:2e3};const f="https://random-word-api.herokuapp.com",g="https://api.dictionaryapi.dev/api/v2";var y={async getWord(t){const e=await fetch(`${f}/word?length=${t}`).then((t=>t.json()));return e[0]},async checkWord(t){try{const e=await fetch(`${g}/entries/en/${t}`);return e.ok}catch{return!1}}};const w=["tabindex"];var S=(0,o.aZ)({__name:"Attempt",props:{word:{},isActive:{type:Boolean}},emits:{wordSubmitted(t){return t},invalidWord(){return!0}},setup(t,{expose:e,emit:r}){const n=t;(0,s.sj)((t=>({"0eb262d0":(0,a.SU)(m).WORD_LENGTH})));const i=(0,a.qj)({currentLetterIdx:0,letters:[]}),c=(0,a.iH)(null);(0,o.m0)((()=>{n.isActive&&c.value?.focus()})),(0,o.m0)((()=>{n.word&&(i.currentLetterIdx=0,i.letters=p(m.WORD_LENGTH))}));const l=(t="pop")=>{let e="pop"===t;if(e&&0===i.currentLetterIdx)return;if(!e&&i.currentLetterIdx>m.WORD_LENGTH-1)return;let r=Array.from(i.letters);e?r[i.currentLetterIdx-1].text="":r[i.currentLetterIdx].text=t,e?i.currentLetterIdx-=1:i.currentLetterIdx+=1},u=async()=>{let t=i.letters.map((t=>t.text)).join("");if(t.length!==m.WORD_LENGTH)return!1;let e=!1;if(e=n.word===t||await y.checkWord(t),e){const e=k(t,n.word);i.letters=e,r("wordSubmitted",e)}else r("invalidWord")},f=t=>{if(n.isActive)switch(t.key){case"Backspace":l();break;case"Enter":u();break;default:if(1!==t.key.length)return;v(t.key)&&l(t.key);break}},g=t=>{i.letters=t};return e({setLettersFromSave:g,handleKey:f}),(t,e)=>((0,o.wg)(),(0,o.iD)("div",{ref_key:"attempt",ref:c,class:"attempt",tabindex:t.isActive?0:-1,onKeydown:f},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.letters,((e,r)=>((0,o.wg)(),(0,o.j4)(d,{key:`letter-${r}`,letter:e,"is-active":t.isActive},null,8,["letter","is-active"])))),128))],40,w))}});const h=(0,l.Z)(S,[["__scopeId","data-v-12dd69a0"]]);var _=h;const x="savedata",b=()=>({useSave:!1,attempts:[],stats:{maxStreak:0,streak:0,totalPoints:0},word:"",keys:{correct:[],position:[],used:[]},showResults:!1});var I={checkStorage(){try{const t=localStorage.getItem(x);return null!==t&&this.getSave().useSave}catch{return!1}},getSave(){const t=localStorage.getItem(x);let e;return e=null!==t?JSON.parse(t):b(),e},setSave(t){localStorage.setItem(x,JSON.stringify(t))},reset(){localStorage.setItem(x,JSON.stringify(b()))},resetWordData(){const t=this.getSave();t.attempts=[],t.word="",t.keys={correct:[],used:[],position:[]},t.showResults=!1,this.setSave(t)}};const A={key:0,class:"loading"};var T=(0,o.aZ)({__name:"Board",props:{word:{},isLoading:{type:Boolean}},emits:{resultSubmitted(t){return t},usedLetters(t){return t},invalidWord(){return!0}},setup(t,{expose:e,emit:r}){const s=t,n=(0,a.iH)(),i=(0,a.qj)({activeAttemptIdx:0}),c=t=>{const e=t.map((t=>t.text)).join("");return e===s.word?(r("resultSubmitted",m.MAX_TRIES-i.activeAttemptIdx),void r("usedLetters",t)):i.activeAttemptIdx<m.MAX_TRIES-1?(i.activeAttemptIdx+=1,void r("usedLetters",t)):void(i.activeAttemptIdx===m.MAX_TRIES-1&&r("resultSubmitted",0))};(0,o.m0)((()=>{if(s.word)if(I.checkStorage()){let t=I.getSave();i.activeAttemptIdx=t.attempts.length}else i.activeAttemptIdx=0}));const l=t=>{if(I.checkStorage()){let e=I.getSave(),r=n.value?.at(t.key);r?.setLettersFromSave(e.attempts.at(t.key)??p(m.WORD_LENGTH))}},u=t=>{const e=n.value?.at(i.activeAttemptIdx);e?.handleKey({key:t})};return e({putLetterFromKeyboard:u}),(t,e)=>s.isLoading?((0,o.wg)(),(0,o.iD)("div",A,"Thinking of a word...")):((0,o.wg)(),(0,o.iD)("div",{key:1,class:"board",onClick:e[1]||(e[1]=()=>n.value?.at(i.activeAttemptIdx)?.$el.focus())},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(Array.from({length:(0,a.SU)(m).MAX_TRIES},((t,e)=>e)),(t=>((0,o.wg)(),(0,o.j4)(_,{word:s.word,key:t,"is-active":t===i.activeAttemptIdx,onWordSubmitted:c,ref_for:!0,ref_key:"attempts",ref:n,onVnodeMounted:l,onInvalidWord:e[0]||(e[0]=()=>r("invalidWord"))},null,8,["word","is-active"])))),128))]))}});const L=(0,l.Z)(T,[["__scopeId","data-v-1424d247"]]);var O=L;const W={class:"stat"};var j=(0,o.aZ)({__name:"Stat",props:{title:{},value:{}},setup(t){return(0,s.sj)((t=>({"35fa369d":(0,a.SU)(i).greys.background}))),(t,e)=>((0,o.wg)(),(0,o.iD)("div",W,[(0,o._)("h2",null,(0,n.zw)(t.title)+":",1),(0,o.Uk)(" "+(0,n.zw)(t.value),1)]))}});const R=(0,l.Z)(j,[["__scopeId","data-v-4f2f1126"]]);var D=R;const K=t=>((0,o.dD)("data-v-128d77d3"),t=t(),(0,o.Cn)(),t),C={class:"results"},N={class:"modal"},E=K((()=>(0,o._)("div",{class:"header"},[(0,o._)("h1",null,"Results")],-1))),U={class:"content"},H={class:"footer"};var M=(0,o.aZ)({__name:"Results",props:{points:{},totalPoints:{},maxStreak:{},streak:{}},emits:{nextStep(t){return t},hide(){return!0}},setup(t,{emit:e}){return(0,s.sj)((t=>({"1d9fee56":(0,a.SU)(i).greys.keys,"3544d774":(0,a.SU)(i).greys.slots,"86b67962":(0,a.SU)(i).greys.background}))),(t,r)=>((0,o.wg)(),(0,o.iD)("div",C,[(0,o._)("div",N,[E,(0,o._)("div",U,[(0,o.Wm)(D,{title:"Points for this round",value:t.points},null,8,["value"]),(0,o.Wm)(D,{title:"Total points",value:t.totalPoints},null,8,["value"]),(0,o.Wm)(D,{title:"Current streak",value:t.streak},null,8,["value"]),(0,o.Wm)(D,{title:"Max streak",value:t.maxStreak},null,8,["value"])]),(0,o._)("div",H,[(0,o._)("button",{onClick:r[0]||(r[0]=()=>e("nextStep",!0))},"Start over"),(0,o._)("button",{onClick:r[1]||(r[1]=()=>e("nextStep",!1))},"Next word")])])]))}});const P=(0,l.Z)(M,[["__scopeId","data-v-128d77d3"]]);var Z=P,$=(r(7658),(0,o.aZ)({__name:"KeyLetter",props:{letter:{},status:{}},setup(t){return(0,s.sj)((t=>({"5068bd4c":(0,a.SU)(i).greys.keys,"85ba9c46":(0,a.SU)(i).greys.slots,"5613202b":(0,a.SU)(i).letters.correct,"9805ccf0":(0,a.SU)(i).letters.position}))),(t,e)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,n.C_)(["keyletter",t.status])},(0,n.zw)(t.letter),3))}}));const F=(0,l.Z)($,[["__scopeId","data-v-130f5f7a"]]);var q=F;const z={class:"keyboard"},B={class:"keyboard-row"},G={class:"keyboard-row"},Y={class:"keyboard-row"};var V=(0,o.aZ)({__name:"KeyBoard",emits:{letterClicked(t){return t}},setup(t,{expose:e}){const r=(0,a.qj)({keys:["qwertyuiop","asdfghjkl","zxcvbnm#$"],correctKeys:[],wrongKeys:[],positionKeys:[]}),s=t=>r.correctKeys.includes(t)?"correct":r.wrongKeys.includes(t)?"used":r.positionKeys.includes(t)?"position":"unused",n=t=>{let e=I.getSave();e.attempts.push(t),e.useSave=!0,t.forEach((t=>{switch(t.status){case"correct":r.correctKeys.push(t.text),e.keys.correct.push(t.text);break;case"incorrect":r.wrongKeys.push(t.text),e.keys.used.push(t.text);break;case"incorrectposition":r.positionKeys.push(t.text),e.keys.position.push(t.text);break;default:return}})),I.setSave(e)},i=()=>{let t=I.getSave();r.correctKeys=t.keys.correct,r.wrongKeys=t.keys.used,r.positionKeys=t.keys.position};return(0,o.bv)((()=>{I.checkStorage()&&i()})),e({setKeys:n,loadSaveData:i}),(t,e)=>((0,o.wg)(),(0,o.iD)("div",z,[(0,o._)("div",B,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(r.keys[0].split(""),(e=>((0,o.wg)(),(0,o.j4)(q,{onClick:()=>t.$emit("letterClicked",e),letter:e,key:e,status:s(e)},null,8,["onClick","letter","status"])))),128))]),(0,o._)("div",G,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(r.keys[1].split(""),(e=>((0,o.wg)(),(0,o.j4)(q,{onClick:()=>t.$emit("letterClicked",e),letter:e,key:e,status:s(e)},null,8,["onClick","letter","status"])))),128))]),(0,o._)("div",Y,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(r.keys[2].split(""),(e=>((0,o.wg)(),(0,o.j4)(q,{onClick:()=>t.$emit("letterClicked","#"===e?"Enter":"$"===e?"Backspace":e),letter:"#"===e?"Enter":"$"===e?"Backspace":e,key:e,status:s(e)},null,8,["onClick","letter","status"])))),128))])]))}});const X=(0,l.Z)(V,[["__scopeId","data-v-cda5c764"]]);var J=X;const Q={key:0,class:"notification"};var tt=(0,o.aZ)({__name:"Notification",setup(t,{expose:e}){(0,s.sj)((t=>({dbd901ac:(0,a.SU)(m).NOTIFICATION_TIMEOUT_MS/1e3+"s"})));const r=(0,a.qj)({isVisible:!1,msg:""}),i=t=>{r.msg=t,r.isVisible=!0,setTimeout((()=>r.isVisible=!1),m.NOTIFICATION_TIMEOUT_MS)};return e({show:i}),(t,e)=>r.isVisible?((0,o.wg)(),(0,o.iD)("div",Q,(0,n.zw)(r.msg),1)):(0,o.kq)("",!0)}});const et=(0,l.Z)(tt,[["__scopeId","data-v-1cd88395"]]);var rt=et,st={getMessageForResult(t){switch(t){case 1:return"That's a guess...";case 2:return"Not bad";case 3:return"Well done";case 4:return"Good job";case 5:return"Amazing!";case 6:return"Wow!";default:return""}}},ot=(0,o.aZ)({__name:"App",setup(t){const e=(0,a.iH)(),r=(0,a.iH)(),s=(0,a.iH)(),n=(0,a.qj)({currentWord:"",wordPoints:0,totalPoints:0,streak:0,maxStreak:0,showResults:!1,isLoading:!0}),i=t=>{n.wordPoints=t,n.totalPoints+=t,n.streak+=1,0===t?(n.streak=0,s.value?.show(n.currentWord)):s.value?.show(st.getMessageForResult(t)),n.streak>n.maxStreak&&(n.maxStreak=n.streak),setTimeout((()=>n.showResults=!0),m.NOTIFICATION_TIMEOUT_MS);let e=I.getSave();e.stats={totalPoints:n.totalPoints,streak:n.streak,maxStreak:n.maxStreak},e.showResults=!0,I.setSave(e)},c=()=>{s.value?.show("Not a word...")},l=t=>{t?(n.wordPoints=0,n.totalPoints=0,n.streak=0,n.maxStreak=0,I.reset()):I.resetWordData(),n.showResults=!1,p()},u=t=>{r.value?.setKeys(t)},d=()=>{n.showResults=!1},v=t=>{e.value?.putLetterFromKeyboard(t)},p=async()=>{n.isLoading=!0;let t=await y.getWord(m.WORD_LENGTH);n.currentWord=t;let e=I.getSave();e.word=t,I.setSave(e),n.isLoading=!1};return(0,o.bv)((()=>{if(I.checkStorage()){let t=I.getSave();return n.currentWord=t.word,n.totalPoints=t.stats.totalPoints,n.streak=t.stats.streak,n.maxStreak=t.stats.maxStreak,n.isLoading=!1,void(n.showResults=t.showResults)}p()})),(t,a)=>((0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(rt,{ref_key:"notification",ref:s},null,512),(0,o.Wm)(O,{ref_key:"board",ref:e,word:n.currentWord,onResultSubmitted:i,onUsedLetters:u,onInvalidWord:c,"is-loading":n.isLoading},null,8,["word","is-loading"]),n.isLoading?(0,o.kq)("",!0):((0,o.wg)(),(0,o.j4)(J,{key:0,ref_key:"keyboard",ref:r,onLetterClicked:v},null,512)),n.showResults?((0,o.wg)(),(0,o.j4)(Z,{key:1,points:n.wordPoints,"total-points":n.totalPoints,streak:n.streak,"max-streak":n.maxStreak,onNextStep:l,onHide:d},null,8,["points","total-points","streak","max-streak"])):(0,o.kq)("",!0)],64))}});const at=ot;var nt=at;(0,s.ri)(nt).mount("#app")}},e={};function r(s){var o=e[s];if(void 0!==o)return o.exports;var a=e[s]={exports:{}};return t[s].call(a.exports,a,a.exports,r),a.exports}r.m=t,function(){var t=[];r.O=function(e,s,o,a){if(!s){var n=1/0;for(u=0;u<t.length;u++){s=t[u][0],o=t[u][1],a=t[u][2];for(var i=!0,c=0;c<s.length;c++)(!1&a||n>=a)&&Object.keys(r.O).every((function(t){return r.O[t](s[c])}))?s.splice(c--,1):(i=!1,a<n&&(n=a));if(i){t.splice(u--,1);var l=o();void 0!==l&&(e=l)}}return e}a=a||0;for(var u=t.length;u>0&&t[u-1][2]>a;u--)t[u]=t[u-1];t[u]=[s,o,a]}}(),function(){r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,{a:e}),e}}(),function(){r.d=function(t,e){for(var s in e)r.o(e,s)&&!r.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};r.O.j=function(e){return 0===t[e]};var e=function(e,s){var o,a,n=s[0],i=s[1],c=s[2],l=0;if(n.some((function(e){return 0!==t[e]}))){for(o in i)r.o(i,o)&&(r.m[o]=i[o]);if(c)var u=c(r)}for(e&&e(s);l<n.length;l++)a=n[l],r.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return r.O(u)},s=self["webpackChunkwordle"]=self["webpackChunkwordle"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=r.O(void 0,[998],(function(){return r(7055)}));s=r.O(s)})();
//# sourceMappingURL=app.518f0aab.js.map