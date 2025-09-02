var Gn=Object.defineProperty;var _s=(s,e)=>{for(var t in e)Gn(s,t,{get:e[t],enumerable:!0})};var Ss={};_s(Ss,{Alias:()=>ee,CST:()=>ys,Composer:()=>Se,Document:()=>se,Lexer:()=>Re,LineCounter:()=>Be,Pair:()=>C,Parser:()=>ke,Scalar:()=>y,Schema:()=>Te,YAMLError:()=>$e,YAMLMap:()=>I,YAMLParseError:()=>q,YAMLSeq:()=>P,YAMLWarning:()=>Pe,isAlias:()=>K,isCollection:()=>O,isDocument:()=>F,isMap:()=>U,isNode:()=>L,isPair:()=>N,isScalar:()=>_,isSeq:()=>G,parse:()=>kn,parseAllDocuments:()=>Sn,parseDocument:()=>ws,stringify:()=>xn,visit:()=>H,visitAsync:()=>Fe});var ot=Symbol.for("yaml.alias"),rt=Symbol.for("yaml.document"),Y=Symbol.for("yaml.map"),Ht=Symbol.for("yaml.pair"),j=Symbol.for("yaml.scalar"),re=Symbol.for("yaml.seq"),R=Symbol.for("yaml.node.type"),K=s=>!!s&&typeof s=="object"&&s[R]===ot,F=s=>!!s&&typeof s=="object"&&s[R]===rt,U=s=>!!s&&typeof s=="object"&&s[R]===Y,N=s=>!!s&&typeof s=="object"&&s[R]===Ht,_=s=>!!s&&typeof s=="object"&&s[R]===j,G=s=>!!s&&typeof s=="object"&&s[R]===re;function O(s){if(s&&typeof s=="object")switch(s[R]){case Y:case re:return!0}return!1}function L(s){if(s&&typeof s=="object")switch(s[R]){case ot:case Y:case j:case re:return!0}return!1}var at=s=>(_(s)||O(s))&&!!s.anchor;var B=Symbol("break visit"),Ns=Symbol("skip children"),Q=Symbol("remove node");function H(s,e){let t=Ls(e);F(s)?ve(null,s.contents,t,Object.freeze([s]))===Q&&(s.contents=null):ve(null,s,t,Object.freeze([]))}H.BREAK=B;H.SKIP=Ns;H.REMOVE=Q;function ve(s,e,t,n){let i=Os(s,e,t,n);if(L(i)||N(i))return Es(s,n,i),ve(s,i,t,n);if(typeof i!="symbol"){if(O(e)){n=Object.freeze(n.concat(e));for(let o=0;o<e.items.length;++o){let r=ve(o,e.items[o],t,n);if(typeof r=="number")o=r-1;else{if(r===B)return B;r===Q&&(e.items.splice(o,1),o-=1)}}}else if(N(e)){n=Object.freeze(n.concat(e));let o=ve("key",e.key,t,n);if(o===B)return B;o===Q&&(e.key=null);let r=ve("value",e.value,t,n);if(r===B)return B;r===Q&&(e.value=null)}}return i}async function Fe(s,e){let t=Ls(e);F(s)?await Ae(null,s.contents,t,Object.freeze([s]))===Q&&(s.contents=null):await Ae(null,s,t,Object.freeze([]))}Fe.BREAK=B;Fe.SKIP=Ns;Fe.REMOVE=Q;async function Ae(s,e,t,n){let i=await Os(s,e,t,n);if(L(i)||N(i))return Es(s,n,i),Ae(s,i,t,n);if(typeof i!="symbol"){if(O(e)){n=Object.freeze(n.concat(e));for(let o=0;o<e.items.length;++o){let r=await Ae(o,e.items[o],t,n);if(typeof r=="number")o=r-1;else{if(r===B)return B;r===Q&&(e.items.splice(o,1),o-=1)}}}else if(N(e)){n=Object.freeze(n.concat(e));let o=await Ae("key",e.key,t,n);if(o===B)return B;o===Q&&(e.key=null);let r=await Ae("value",e.value,t,n);if(r===B)return B;r===Q&&(e.value=null)}}return i}function Ls(s){return typeof s=="object"&&(s.Collection||s.Node||s.Value)?Object.assign({Alias:s.Node,Map:s.Node,Scalar:s.Node,Seq:s.Node},s.Value&&{Map:s.Value,Scalar:s.Value,Seq:s.Value},s.Collection&&{Map:s.Collection,Seq:s.Collection},s):s}function Os(s,e,t,n){if(typeof t=="function")return t(s,e,n);if(U(e))return t.Map?.(s,e,n);if(G(e))return t.Seq?.(s,e,n);if(N(e))return t.Pair?.(s,e,n);if(_(e))return t.Scalar?.(s,e,n);if(K(e))return t.Alias?.(s,e,n)}function Es(s,e,t){let n=e[e.length-1];if(O(n))n.items[s]=t;else if(N(n))s==="key"?n.key=t:n.value=t;else if(F(n))n.contents=t;else{let i=K(n)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}var Vn={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},Yn=s=>s.replace(/[!,[\]{}]/g,e=>Vn[e]),Z=class s{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},s.defaultYaml,e),this.tags=Object.assign({},s.defaultTags,t)}clone(){let e=new s(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){let e=new s(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:s.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},s.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:s.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},s.defaultTags),this.atNextDocument=!1);let n=e.trim().split(/[ \t]+/),i=n.shift();switch(i){case"%TAG":{if(n.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),n.length<2))return!1;let[o,r]=n;return this.tags[o]=r,!0}case"%YAML":{if(this.yaml.explicit=!0,n.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;let[o]=n;if(o==="1.1"||o==="1.2")return this.yaml.version=o,!0;{let r=/^\d+\.\d+$/.test(o);return t(6,`Unsupported YAML version ${o}`,r),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){let r=e.slice(2,-1);return r==="!"||r==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),r)}let[,n,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);let o=this.tags[n];if(o)try{return o+decodeURIComponent(i)}catch(r){return t(String(r)),null}return n==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(let[t,n]of Object.entries(this.tags))if(e.startsWith(n))return t+Yn(e.substring(n.length));return e[0]==="!"?e:`!<${e}>`}toString(e){let t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],n=Object.entries(this.tags),i;if(e&&n.length>0&&L(e.contents)){let o={};H(e.contents,(r,a)=>{L(a)&&a.tag&&(o[a.tag]=!0)}),i=Object.keys(o)}else i=[];for(let[o,r]of n)o==="!!"&&r==="tag:yaml.org,2002:"||(!e||i.some(a=>a.startsWith(r)))&&t.push(`%TAG ${o} ${r}`);return t.join(`
`)}};Z.defaultYaml={explicit:!1,version:"1.2"};Z.defaultTags={"!!":"tag:yaml.org,2002:"};function lt(s){if(/[\x00-\x19\s,[\]{}]/.test(s)){let t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(s)}`;throw new Error(t)}return!0}function Jt(s){let e=new Set;return H(s,{Value(t,n){n.anchor&&e.add(n.anchor)}}),e}function Wt(s,e){for(let t=1;;++t){let n=`${s}${t}`;if(!e.has(n))return n}}function Cs(s,e){let t=[],n=new Map,i=null;return{onAnchor:o=>{t.push(o),i??(i=Jt(s));let r=Wt(e,i);return i.add(r),r},setAnchors:()=>{for(let o of t){let r=n.get(o);if(typeof r=="object"&&r.anchor&&(_(r.node)||O(r.node)))r.node.anchor=r.anchor;else{let a=new Error("Failed to resolve repeated object (this should not happen)");throw a.source=o,a}}},sourceObjects:n}}function de(s,e,t,n){if(n&&typeof n=="object")if(Array.isArray(n))for(let i=0,o=n.length;i<o;++i){let r=n[i],a=de(s,n,String(i),r);a===void 0?delete n[i]:a!==r&&(n[i]=a)}else if(n instanceof Map)for(let i of Array.from(n.keys())){let o=n.get(i),r=de(s,n,i,o);r===void 0?n.delete(i):r!==o&&n.set(i,r)}else if(n instanceof Set)for(let i of Array.from(n)){let o=de(s,n,i,i);o===void 0?n.delete(i):o!==i&&(n.delete(i),n.add(o))}else for(let[i,o]of Object.entries(n)){let r=de(s,n,i,o);r===void 0?delete n[i]:r!==o&&(n[i]=r)}return s.call(e,t,n)}function $(s,e,t){if(Array.isArray(s))return s.map((n,i)=>$(n,String(i),t));if(s&&typeof s.toJSON=="function"){if(!t||!at(s))return s.toJSON(e,t);let n={aliasCount:0,count:1,res:void 0};t.anchors.set(s,n),t.onCreate=o=>{n.res=o,delete t.onCreate};let i=s.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof s=="bigint"&&!t?.keep?Number(s):s}var pe=class{constructor(e){Object.defineProperty(this,R,{value:e})}clone(){let e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:n,onAnchor:i,reviver:o}={}){if(!F(e))throw new TypeError("A document argument is required");let r={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof n=="number"?n:100},a=$(this,"",r);if(typeof i=="function")for(let{count:l,res:c}of r.anchors.values())i(c,l);return typeof o=="function"?de(o,{"":a},"",a):a}};var ee=class extends pe{constructor(e){super(ot),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let n;t?.aliasResolveCache?n=t.aliasResolveCache:(n=[],H(e,{Node:(o,r)=>{(K(r)||at(r))&&n.push(r)}}),t&&(t.aliasResolveCache=n));let i;for(let o of n){if(o===this)break;o.anchor===this.source&&(i=o)}return i}toJSON(e,t){if(!t)return{source:this.source};let{anchors:n,doc:i,maxAliasCount:o}=t,r=this.resolve(i,t);if(!r){let l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let a=n.get(r);if(a||($(r,null,t),a=n.get(r)),!a||a.res===void 0){let l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(o>=0&&(a.count+=1,a.aliasCount===0&&(a.aliasCount=ct(i,r,n)),a.count*a.aliasCount>o)){let l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return a.res}toString(e,t,n){let i=`*${this.source}`;if(e){if(lt(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){let o=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(o)}if(e.implicitKey)return`${i} `}return i}};function ct(s,e,t){if(K(e)){let n=e.resolve(s),i=t&&n&&t.get(n);return i?i.count*i.aliasCount:0}else if(O(e)){let n=0;for(let i of e.items){let o=ct(s,i,t);o>n&&(n=o)}return n}else if(N(e)){let n=ct(s,e.key,t),i=ct(s,e.value,t);return Math.max(n,i)}return 1}var ut=s=>!s||typeof s!="function"&&typeof s!="object",y=class extends pe{constructor(e){super(j),this.value=e}toJSON(e,t){return t?.keep?this.value:$(this.value,e,t)}toString(){return String(this.value)}};y.BLOCK_FOLDED="BLOCK_FOLDED";y.BLOCK_LITERAL="BLOCK_LITERAL";y.PLAIN="PLAIN";y.QUOTE_DOUBLE="QUOTE_DOUBLE";y.QUOTE_SINGLE="QUOTE_SINGLE";var Hn="tag:yaml.org,2002:";function Jn(s,e,t){if(e){let n=t.filter(o=>o.tag===e),i=n.find(o=>!o.format)??n[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(n=>n.identify?.(s)&&!n.format)}function ae(s,e,t){if(F(s)&&(s=s.contents),L(s))return s;if(N(s)){let u=t.schema[Y].createNode?.(t.schema,null,t);return u.items.push(s),u}(s instanceof String||s instanceof Number||s instanceof Boolean||typeof BigInt<"u"&&s instanceof BigInt)&&(s=s.valueOf());let{aliasDuplicateObjects:n,onAnchor:i,onTagObj:o,schema:r,sourceObjects:a}=t,l;if(n&&s&&typeof s=="object"){if(l=a.get(s),l)return l.anchor??(l.anchor=i(s)),new ee(l.anchor);l={anchor:null,node:null},a.set(s,l)}e?.startsWith("!!")&&(e=Hn+e.slice(2));let c=Jn(s,e,r.tags);if(!c){if(s&&typeof s.toJSON=="function"&&(s=s.toJSON()),!s||typeof s!="object"){let u=new y(s);return l&&(l.node=u),u}c=s instanceof Map?r[Y]:Symbol.iterator in Object(s)?r[re]:r[Y]}o&&(o(c),delete t.onTagObj);let p=c?.createNode?c.createNode(t.schema,s,t):typeof c?.nodeClass?.from=="function"?c.nodeClass.from(t.schema,s,t):new y(s);return e?p.tag=e:c.default||(p.tag=c.tag),l&&(l.node=p),p}function Ue(s,e,t){let n=t;for(let i=e.length-1;i>=0;--i){let o=e[i];if(typeof o=="number"&&Number.isInteger(o)&&o>=0){let r=[];r[o]=n,n=r}else n=new Map([[o,n]])}return ae(n,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:s,sourceObjects:new Map})}var Ne=s=>s==null||typeof s=="object"&&!!s[Symbol.iterator]().next().done,_e=class extends pe{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){let t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(n=>L(n)||N(n)?n.clone(e):n),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(Ne(e))this.add(t);else{let[n,...i]=e,o=this.get(n,!0);if(O(o))o.addIn(i,t);else if(o===void 0&&this.schema)this.set(n,Ue(this.schema,i,t));else throw new Error(`Expected YAML collection at ${n}. Remaining path: ${i}`)}}deleteIn(e){let[t,...n]=e;if(n.length===0)return this.delete(t);let i=this.get(t,!0);if(O(i))return i.deleteIn(n);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${n}`)}getIn(e,t){let[n,...i]=e,o=this.get(n,!0);return i.length===0?!t&&_(o)?o.value:o:O(o)?o.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!N(t))return!1;let n=t.value;return n==null||e&&_(n)&&n.value==null&&!n.commentBefore&&!n.comment&&!n.tag})}hasIn(e){let[t,...n]=e;if(n.length===0)return this.has(t);let i=this.get(t,!0);return O(i)?i.hasIn(n):!1}setIn(e,t){let[n,...i]=e;if(i.length===0)this.set(n,t);else{let o=this.get(n,!0);if(O(o))o.setIn(i,t);else if(o===void 0&&this.schema)this.set(n,Ue(this.schema,i,t));else throw new Error(`Expected YAML collection at ${n}. Remaining path: ${i}`)}}};var Is=s=>s.replace(/^(?!$)(?: $)?/gm,"#");function V(s,e){return/^\n+$/.test(s)?s.substring(1):e?s.replace(/^(?! *$)/gm,e):s}var te=(s,e,t)=>s.endsWith(`
`)?V(t,e):t.includes(`
`)?`
`+V(t,e):(s.endsWith(" ")?"":" ")+t;var zt="flow",ft="block",Ge="quoted";function Ve(s,e,t="flow",{indentAtStart:n,lineWidth:i=80,minContentWidth:o=20,onFold:r,onOverflow:a}={}){if(!i||i<0)return s;i<o&&(o=0);let l=Math.max(1+o,1+i-e.length);if(s.length<=l)return s;let c=[],p={},u=i-e.length;typeof n=="number"&&(n>i-Math.max(2,o)?c.push(0):u=i-n);let f,h,g=!1,d=-1,m=-1,w=-1;t===ft&&(d=Ts(s,d,e.length),d!==-1&&(u=d+l));for(let k;k=s[d+=1];){if(t===Ge&&k==="\\"){switch(m=d,s[d+1]){case"x":d+=3;break;case"u":d+=5;break;case"U":d+=9;break;default:d+=1}w=d}if(k===`
`)t===ft&&(d=Ts(s,d,e.length)),u=d+e.length+l,f=void 0;else{if(k===" "&&h&&h!==" "&&h!==`
`&&h!=="	"){let x=s[d+1];x&&x!==" "&&x!==`
`&&x!=="	"&&(f=d)}if(d>=u)if(f)c.push(f),u=f+l,f=void 0;else if(t===Ge){for(;h===" "||h==="	";)h=k,k=s[d+=1],g=!0;let x=d>w+1?d-2:m-1;if(p[x])return s;c.push(x),p[x]=!0,u=x+l,f=void 0}else g=!0}h=k}if(g&&a&&a(),c.length===0)return s;r&&r();let S=s.slice(0,c[0]);for(let k=0;k<c.length;++k){let x=c[k],v=c[k+1]||s.length;x===0?S=`
${e}${s.slice(0,v)}`:(t===Ge&&p[x]&&(S+=`${s[x]}\\`),S+=`
${e}${s.slice(x+1,v)}`)}return S}function Ts(s,e,t){let n=e,i=e+1,o=s[i];for(;o===" "||o==="	";)if(e<i+t)o=s[++e];else{do o=s[++e];while(o&&o!==`
`);n=e,i=e+1,o=s[i]}return n}var pt=(s,e)=>({indentAtStart:e?s.indent.length:s.indentAtStart,lineWidth:s.options.lineWidth,minContentWidth:s.options.minContentWidth}),mt=s=>/^(%|---|\.\.\.)/m.test(s);function Wn(s,e,t){if(!e||e<0)return!1;let n=e-t,i=s.length;if(i<=n)return!1;for(let o=0,r=0;o<i;++o)if(s[o]===`
`){if(o-r>n)return!0;if(r=o+1,i-r<=n)return!1}return!0}function Ye(s,e){let t=JSON.stringify(s);if(e.options.doubleQuotedAsJSON)return t;let{implicitKey:n}=e,i=e.options.doubleQuotedMinMultiLineLength,o=e.indent||(mt(s)?"  ":""),r="",a=0;for(let l=0,c=t[l];c;c=t[++l])if(c===" "&&t[l+1]==="\\"&&t[l+2]==="n"&&(r+=t.slice(a,l)+"\\ ",l+=1,a=l,c="\\"),c==="\\")switch(t[l+1]){case"u":{r+=t.slice(a,l);let p=t.substr(l+2,4);switch(p){case"0000":r+="\\0";break;case"0007":r+="\\a";break;case"000b":r+="\\v";break;case"001b":r+="\\e";break;case"0085":r+="\\N";break;case"00a0":r+="\\_";break;case"2028":r+="\\L";break;case"2029":r+="\\P";break;default:p.substr(0,2)==="00"?r+="\\x"+p.substr(2):r+=t.substr(l,6)}l+=5,a=l+1}break;case"n":if(n||t[l+2]==='"'||t.length<i)l+=1;else{for(r+=t.slice(a,l)+`

`;t[l+2]==="\\"&&t[l+3]==="n"&&t[l+4]!=='"';)r+=`
`,l+=2;r+=o,t[l+2]===" "&&(r+="\\"),l+=1,a=l+1}break;default:l+=1}return r=a?r+t.slice(a):t,n?r:Ve(r,o,Ge,pt(e,!1))}function Xt(s,e){if(e.options.singleQuote===!1||e.implicitKey&&s.includes(`
`)||/[ \t]\n|\n[ \t]/.test(s))return Ye(s,e);let t=e.indent||(mt(s)?"  ":""),n="'"+s.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?n:Ve(n,t,zt,pt(e,!1))}function Le(s,e){let{singleQuote:t}=e.options,n;if(t===!1)n=Ye;else{let i=s.includes('"'),o=s.includes("'");i&&!o?n=Xt:o&&!i?n=Ye:n=t?Xt:Ye}return n(s,e)}var Qt;try{Qt=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{Qt=/\n+(?!\n|$)/g}function dt({comment:s,type:e,value:t},n,i,o){let{blockQuote:r,commentString:a,lineWidth:l}=n.options;if(!r||/\n[\t ]+$/.test(t))return Le(t,n);let c=n.indent||(n.forceBlockIndent||mt(t)?"  ":""),p=r==="literal"?!0:r==="folded"||e===y.BLOCK_FOLDED?!1:e===y.BLOCK_LITERAL?!0:!Wn(t,l,c.length);if(!t)return p?`|
`:`>
`;let u,f;for(f=t.length;f>0;--f){let v=t[f-1];if(v!==`
`&&v!=="	"&&v!==" ")break}let h=t.substring(f),g=h.indexOf(`
`);g===-1?u="-":t===h||g!==h.length-1?(u="+",o&&o()):u="",h&&(t=t.slice(0,-h.length),h[h.length-1]===`
`&&(h=h.slice(0,-1)),h=h.replace(Qt,`$&${c}`));let d=!1,m,w=-1;for(m=0;m<t.length;++m){let v=t[m];if(v===" ")d=!0;else if(v===`
`)w=m;else break}let S=t.substring(0,w<m?w+1:m);S&&(t=t.substring(S.length),S=S.replace(/\n+/g,`$&${c}`));let x=(d?c?"2":"1":"")+u;if(s&&(x+=" "+a(s.replace(/ ?[\r\n]+/g," ")),i&&i()),!p){let v=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`),A=!1,E=pt(n,!0);r!=="folded"&&e!==y.BLOCK_FOLDED&&(E.onOverflow=()=>{A=!0});let b=Ve(`${S}${v}${h}`,c,ft,E);if(!A)return`>${x}
${c}${b}`}return t=t.replace(/\n+/g,`$&${c}`),`|${x}
${c}${S}${t}${h}`}function zn(s,e,t,n){let{type:i,value:o}=s,{actualString:r,implicitKey:a,indent:l,indentStep:c,inFlow:p}=e;if(a&&o.includes(`
`)||p&&/[[\]{},]/.test(o))return Le(o,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(o))return a||p||!o.includes(`
`)?Le(o,e):dt(s,e,t,n);if(!a&&!p&&i!==y.PLAIN&&o.includes(`
`))return dt(s,e,t,n);if(mt(o)){if(l==="")return e.forceBlockIndent=!0,dt(s,e,t,n);if(a&&l===c)return Le(o,e)}let u=o.replace(/\n+/g,`$&
${l}`);if(r){let f=d=>d.default&&d.tag!=="tag:yaml.org,2002:str"&&d.test?.test(u),{compat:h,tags:g}=e.doc.schema;if(g.some(f)||h?.some(f))return Le(o,e)}return a?u:Ve(u,l,zt,pt(e,!1))}function le(s,e,t,n){let{implicitKey:i,inFlow:o}=e,r=typeof s.value=="string"?s:Object.assign({},s,{value:String(s.value)}),{type:a}=s;a!==y.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value)&&(a=y.QUOTE_DOUBLE);let l=p=>{switch(p){case y.BLOCK_FOLDED:case y.BLOCK_LITERAL:return i||o?Le(r.value,e):dt(r,e,t,n);case y.QUOTE_DOUBLE:return Ye(r.value,e);case y.QUOTE_SINGLE:return Xt(r.value,e);case y.PLAIN:return zn(r,e,t,n);default:return null}},c=l(a);if(c===null){let{defaultKeyType:p,defaultStringType:u}=e.options,f=i&&p||u;if(c=l(f),c===null)throw new Error(`Unsupported default string type ${f}`)}return c}function ht(s,e){let t=Object.assign({blockQuote:!0,commentString:Is,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trueStr:"true",verifyAliasOrder:!0},s.schema.toStringOptions,e),n;switch(t.collectionStyle){case"block":n=!1;break;case"flow":n=!0;break;default:n=null}return{anchors:new Set,doc:s,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:n,options:t}}function Xn(s,e){if(e.tag){let i=s.filter(o=>o.tag===e.tag);if(i.length>0)return i.find(o=>o.format===e.format)??i[0]}let t,n;if(_(e)){n=e.value;let i=s.filter(o=>o.identify?.(n));if(i.length>1){let o=i.filter(r=>r.test);o.length>0&&(i=o)}t=i.find(o=>o.format===e.format)??i.find(o=>!o.format)}else n=e,t=s.find(i=>i.nodeClass&&n instanceof i.nodeClass);if(!t){let i=n?.constructor?.name??(n===null?"null":typeof n);throw new Error(`Tag not resolved for ${i} value`)}return t}function Qn(s,e,{anchors:t,doc:n}){if(!n.directives)return"";let i=[],o=(_(s)||O(s))&&s.anchor;o&&lt(o)&&(t.add(o),i.push(`&${o}`));let r=s.tag??(e.default?null:e.tag);return r&&i.push(n.directives.tagString(r)),i.join(" ")}function ce(s,e,t,n){if(N(s))return s.toString(e,t,n);if(K(s)){if(e.doc.directives)return s.toString(e);if(e.resolvedAliases?.has(s))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(s):e.resolvedAliases=new Set([s]),s=s.resolve(e.doc)}let i,o=L(s)?s:e.doc.createNode(s,{onTagObj:l=>i=l});i??(i=Xn(e.doc.schema.tags,o));let r=Qn(o,i,e);r.length>0&&(e.indentAtStart=(e.indentAtStart??0)+r.length+1);let a=typeof i.stringify=="function"?i.stringify(o,e,t,n):_(o)?le(o,e,t,n):o.toString(e,t,n);return r?_(o)||a[0]==="{"||a[0]==="["?`${r} ${a}`:`${r}
${e.indent}${a}`:a}function Ms({key:s,value:e},t,n,i){let{allNullValues:o,doc:r,indent:a,indentStep:l,options:{commentString:c,indentSeq:p,simpleKeys:u}}=t,f=L(s)&&s.comment||null;if(u){if(f)throw new Error("With simple keys, key nodes cannot have comments");if(O(s)||!L(s)&&typeof s=="object"){let E="With simple keys, collection cannot be used as a key value";throw new Error(E)}}let h=!u&&(!s||f&&e==null&&!t.inFlow||O(s)||(_(s)?s.type===y.BLOCK_FOLDED||s.type===y.BLOCK_LITERAL:typeof s=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!h&&(u||!o),indent:a+l});let g=!1,d=!1,m=ce(s,t,()=>g=!0,()=>d=!0);if(!h&&!t.inFlow&&m.length>1024){if(u)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");h=!0}if(t.inFlow){if(o||e==null)return g&&n&&n(),m===""?"?":h?`? ${m}`:m}else if(o&&!u||e==null&&h)return m=`? ${m}`,f&&!g?m+=te(m,t.indent,c(f)):d&&i&&i(),m;g&&(f=null),h?(f&&(m+=te(m,t.indent,c(f))),m=`? ${m}
${a}:`):(m=`${m}:`,f&&(m+=te(m,t.indent,c(f))));let w,S,k;L(e)?(w=!!e.spaceBefore,S=e.commentBefore,k=e.comment):(w=!1,S=null,k=null,e&&typeof e=="object"&&(e=r.createNode(e))),t.implicitKey=!1,!h&&!f&&_(e)&&(t.indentAtStart=m.length+1),d=!1,!p&&l.length>=2&&!t.inFlow&&!h&&G(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let x=!1,v=ce(e,t,()=>x=!0,()=>d=!0),A=" ";if(f||w||S){if(A=w?`
`:"",S){let E=c(S);A+=`
${V(E,t.indent)}`}v===""&&!t.inFlow?A===`
`&&(A=`

`):A+=`
${t.indent}`}else if(!h&&O(e)){let E=v[0],b=v.indexOf(`
`),T=b!==-1,fe=t.inFlow??e.flow??e.items.length===0;if(T||!fe){let xe=!1;if(T&&(E==="&"||E==="!")){let M=v.indexOf(" ");E==="&"&&M!==-1&&M<b&&v[M+1]==="!"&&(M=v.indexOf(" ",M+1)),(M===-1||b<M)&&(xe=!0)}xe||(A=`
${t.indent}`)}}else(v===""||v[0]===`
`)&&(A="");return m+=A+v,t.inFlow?x&&n&&n():k&&!x?m+=te(m,t.indent,c(k)):d&&i&&i(),m}function gt(s,e){(s==="debug"||s==="warn")&&console.warn(e)}var yt="<<",J={identify:s=>s===yt||typeof s=="symbol"&&s.description===yt,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new y(Symbol(yt)),{addToJSMap:es}),stringify:()=>yt},$s=(s,e)=>(J.identify(e)||_(e)&&(!e.type||e.type===y.PLAIN)&&J.identify(e.value))&&s?.doc.schema.tags.some(t=>t.tag===J.tag&&t.default);function es(s,e,t){if(t=s&&K(t)?t.resolve(s.doc):t,G(t))for(let n of t.items)Zt(s,e,n);else if(Array.isArray(t))for(let n of t)Zt(s,e,n);else Zt(s,e,t)}function Zt(s,e,t){let n=s&&K(t)?t.resolve(s.doc):t;if(!U(n))throw new Error("Merge sources must be maps or map aliases");let i=n.toJSON(null,s,Map);for(let[o,r]of i)e instanceof Map?e.has(o)||e.set(o,r):e instanceof Set?e.add(o):Object.prototype.hasOwnProperty.call(e,o)||Object.defineProperty(e,o,{value:r,writable:!0,enumerable:!0,configurable:!0});return e}function bt(s,e,{key:t,value:n}){if(L(t)&&t.addToJSMap)t.addToJSMap(s,e,n);else if($s(s,t))es(s,e,n);else{let i=$(t,"",s);if(e instanceof Map)e.set(i,$(n,i,s));else if(e instanceof Set)e.add(i);else{let o=Zn(t,i,s),r=$(n,o,s);o in e?Object.defineProperty(e,o,{value:r,writable:!0,enumerable:!0,configurable:!0}):e[o]=r}}return e}function Zn(s,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(L(s)&&t?.doc){let n=ht(t.doc,{});n.anchors=new Set;for(let o of t.anchors.keys())n.anchors.add(o.anchor);n.inFlow=!0,n.inStringifyKey=!0;let i=s.toString(n);if(!t.mapKeyWarned){let o=JSON.stringify(i);o.length>40&&(o=o.substring(0,36)+'..."'),gt(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${o}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function Oe(s,e,t){let n=ae(s,void 0,t),i=ae(e,void 0,t);return new C(n,i)}var C=class s{constructor(e,t=null){Object.defineProperty(this,R,{value:Ht}),this.key=e,this.value=t}clone(e){let{key:t,value:n}=this;return L(t)&&(t=t.clone(e)),L(n)&&(n=n.clone(e)),new s(t,n)}toJSON(e,t){let n=t?.mapAsMap?new Map:{};return bt(t,n,this)}toString(e,t,n){return e?.doc?Ms(this,e,t,n):JSON.stringify(this)}};function St(s,e,t){return(e.inFlow??s.flow?ti:ei)(s,e,t)}function ei({comment:s,items:e},t,{blockItemPrefix:n,flowChars:i,itemIndent:o,onChompKeep:r,onComment:a}){let{indent:l,options:{commentString:c}}=t,p=Object.assign({},t,{indent:o,type:null}),u=!1,f=[];for(let g=0;g<e.length;++g){let d=e[g],m=null;if(L(d))!u&&d.spaceBefore&&f.push(""),wt(t,f,d.commentBefore,u),d.comment&&(m=d.comment);else if(N(d)){let S=L(d.key)?d.key:null;S&&(!u&&S.spaceBefore&&f.push(""),wt(t,f,S.commentBefore,u))}u=!1;let w=ce(d,p,()=>m=null,()=>u=!0);m&&(w+=te(w,o,c(m))),u&&m&&(u=!1),f.push(n+w)}let h;if(f.length===0)h=i.start+i.end;else{h=f[0];for(let g=1;g<f.length;++g){let d=f[g];h+=d?`
${l}${d}`:`
`}}return s?(h+=`
`+V(c(s),l),a&&a()):u&&r&&r(),h}function ti({items:s},e,{flowChars:t,itemIndent:n}){let{indent:i,indentStep:o,flowCollectionPadding:r,options:{commentString:a}}=e;n+=o;let l=Object.assign({},e,{indent:n,inFlow:!0,type:null}),c=!1,p=0,u=[];for(let g=0;g<s.length;++g){let d=s[g],m=null;if(L(d))d.spaceBefore&&u.push(""),wt(e,u,d.commentBefore,!1),d.comment&&(m=d.comment);else if(N(d)){let S=L(d.key)?d.key:null;S&&(S.spaceBefore&&u.push(""),wt(e,u,S.commentBefore,!1),S.comment&&(c=!0));let k=L(d.value)?d.value:null;k?(k.comment&&(m=k.comment),k.commentBefore&&(c=!0)):d.value==null&&S?.comment&&(m=S.comment)}m&&(c=!0);let w=ce(d,l,()=>m=null);g<s.length-1&&(w+=","),m&&(w+=te(w,n,a(m))),!c&&(u.length>p||w.includes(`
`))&&(c=!0),u.push(w),p=u.length}let{start:f,end:h}=t;if(u.length===0)return f+h;if(!c){let g=u.reduce((d,m)=>d+m.length+2,2);c=e.options.lineWidth>0&&g>e.options.lineWidth}if(c){let g=f;for(let d of u)g+=d?`
${o}${i}${d}`:`
`;return`${g}
${i}${h}`}else return`${f}${r}${u.join(" ")}${r}${h}`}function wt({indent:s,options:{commentString:e}},t,n,i){if(n&&i&&(n=n.replace(/^\n+/,"")),n){let o=V(e(n),s);t.push(o.trimStart())}}function me(s,e){let t=_(e)?e.value:e;for(let n of s)if(N(n)&&(n.key===e||n.key===t||_(n.key)&&n.key.value===t))return n}var I=class extends _e{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(Y,e),this.items=[]}static from(e,t,n){let{keepUndefined:i,replacer:o}=n,r=new this(e),a=(l,c)=>{if(typeof o=="function")c=o.call(t,l,c);else if(Array.isArray(o)&&!o.includes(l))return;(c!==void 0||i)&&r.items.push(Oe(l,c,n))};if(t instanceof Map)for(let[l,c]of t)a(l,c);else if(t&&typeof t=="object")for(let l of Object.keys(t))a(l,t[l]);return typeof e.sortMapEntries=="function"&&r.items.sort(e.sortMapEntries),r}add(e,t){let n;N(e)?n=e:!e||typeof e!="object"||!("key"in e)?n=new C(e,e?.value):n=new C(e.key,e.value);let i=me(this.items,n.key),o=this.schema?.sortMapEntries;if(i){if(!t)throw new Error(`Key ${n.key} already set`);_(i.value)&&ut(n.value)?i.value.value=n.value:i.value=n.value}else if(o){let r=this.items.findIndex(a=>o(n,a)<0);r===-1?this.items.push(n):this.items.splice(r,0,n)}else this.items.push(n)}delete(e){let t=me(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){let i=me(this.items,e)?.value;return(!t&&_(i)?i.value:i)??void 0}has(e){return!!me(this.items,e)}set(e,t){this.add(new C(e,t),!0)}toJSON(e,t,n){let i=n?new n:t?.mapAsMap?new Map:{};t?.onCreate&&t.onCreate(i);for(let o of this.items)bt(t,i,o);return i}toString(e,t,n){if(!e)return JSON.stringify(this);for(let i of this.items)if(!N(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),St(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:n,onComment:t})}};var W={collection:"map",default:!0,nodeClass:I,tag:"tag:yaml.org,2002:map",resolve(s,e){return U(s)||e("Expected a mapping for this tag"),s},createNode:(s,e,t)=>I.from(s,e,t)};var P=class extends _e{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(re,e),this.items=[]}add(e){this.items.push(e)}delete(e){let t=kt(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){let n=kt(e);if(typeof n!="number")return;let i=this.items[n];return!t&&_(i)?i.value:i}has(e){let t=kt(e);return typeof t=="number"&&t<this.items.length}set(e,t){let n=kt(e);if(typeof n!="number")throw new Error(`Expected a valid index, not ${e}.`);let i=this.items[n];_(i)&&ut(t)?i.value=t:this.items[n]=t}toJSON(e,t){let n=[];t?.onCreate&&t.onCreate(n);let i=0;for(let o of this.items)n.push($(o,String(i++),t));return n}toString(e,t,n){return e?St(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:n,onComment:t}):JSON.stringify(this)}static from(e,t,n){let{replacer:i}=n,o=new this(e);if(t&&Symbol.iterator in Object(t)){let r=0;for(let a of t){if(typeof i=="function"){let l=t instanceof Set?a:String(r++);a=i.call(t,l,a)}o.items.push(ae(a,void 0,n))}}return o}};function kt(s){let e=_(s)?s.value:s;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}var z={collection:"seq",default:!0,nodeClass:P,tag:"tag:yaml.org,2002:seq",resolve(s,e){return G(s)||e("Expected a sequence for this tag"),s},createNode:(s,e,t)=>P.from(s,e,t)};var he={identify:s=>typeof s=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:s=>s,stringify(s,e,t,n){return e=Object.assign({actualString:!0},e),le(s,e,t,n)}};var we={identify:s=>s==null,createNode:()=>new y(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new y(null),stringify:({source:s},e)=>typeof s=="string"&&we.test.test(s)?s:e.options.nullStr};var He={identify:s=>typeof s=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:s=>new y(s[0]==="t"||s[0]==="T"),stringify({source:s,value:e},t){if(s&&He.test.test(s)){let n=s[0]==="t"||s[0]==="T";if(e===n)return s}return e?t.options.trueStr:t.options.falseStr}};function D({format:s,minFractionDigits:e,tag:t,value:n}){if(typeof n=="bigint")return String(n);let i=typeof n=="number"?n:Number(n);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let o=JSON.stringify(n);if(!s&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(o)){let r=o.indexOf(".");r<0&&(r=o.length,o+=".");let a=e-(o.length-r-1);for(;a-- >0;)o+="0"}return o}var xt={identify:s=>typeof s=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:s=>s.slice(-3).toLowerCase()==="nan"?NaN:s[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:D},vt={identify:s=>typeof s=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:s=>parseFloat(s),stringify(s){let e=Number(s.value);return isFinite(e)?e.toExponential():D(s)}},At={identify:s=>typeof s=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(s){let e=new y(parseFloat(s)),t=s.indexOf(".");return t!==-1&&s[s.length-1]==="0"&&(e.minFractionDigits=s.length-t-1),e},stringify:D};var _t=s=>typeof s=="bigint"||Number.isInteger(s),ts=(s,e,t,{intAsBigInt:n})=>n?BigInt(s):parseInt(s.substring(e),t);function Ps(s,e,t){let{value:n}=s;return _t(n)&&n>=0?t+n.toString(e):D(s)}var Nt={identify:s=>_t(s)&&s>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(s,e,t)=>ts(s,2,8,t),stringify:s=>Ps(s,8,"0o")},Lt={identify:_t,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(s,e,t)=>ts(s,0,10,t),stringify:D},Ot={identify:s=>_t(s)&&s>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(s,e,t)=>ts(s,2,16,t),stringify:s=>Ps(s,16,"0x")};var Ds=[W,z,he,we,He,Nt,Lt,Ot,xt,vt,At];function Rs(s){return typeof s=="bigint"||Number.isInteger(s)}var Et=({value:s})=>JSON.stringify(s),si=[{identify:s=>typeof s=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:s=>s,stringify:Et},{identify:s=>s==null,createNode:()=>new y(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:Et},{identify:s=>typeof s=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:s=>s==="true",stringify:Et},{identify:Rs,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(s,e,{intAsBigInt:t})=>t?BigInt(s):parseInt(s,10),stringify:({value:s})=>Rs(s)?s.toString():JSON.stringify(s)},{identify:s=>typeof s=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:s=>parseFloat(s),stringify:Et}],ni={default:!0,tag:"",test:/^/,resolve(s,e){return e(`Unresolved plain scalar ${JSON.stringify(s)}`),s}},Bs=[W,z].concat(si,ni);var Je={identify:s=>s instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(s,e){if(typeof atob=="function"){let t=atob(s.replace(/[\n\r]/g,"")),n=new Uint8Array(t.length);for(let i=0;i<t.length;++i)n[i]=t.charCodeAt(i);return n}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),s},stringify({comment:s,type:e,value:t},n,i,o){if(!t)return"";let r=t,a;if(typeof btoa=="function"){let l="";for(let c=0;c<r.length;++c)l+=String.fromCharCode(r[c]);a=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=y.BLOCK_LITERAL),e!==y.QUOTE_DOUBLE){let l=Math.max(n.options.lineWidth-n.indent.length,n.options.minContentWidth),c=Math.ceil(a.length/l),p=new Array(c);for(let u=0,f=0;u<c;++u,f+=l)p[u]=a.substr(f,l);a=p.join(e===y.BLOCK_LITERAL?`
`:" ")}return le({comment:s,type:e,value:a},n,i,o)}};function ss(s,e){if(G(s))for(let t=0;t<s.items.length;++t){let n=s.items[t];if(!N(n)){if(U(n)){n.items.length>1&&e("Each pair must have its own sequence indicator");let i=n.items[0]||new C(new y(null));if(n.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${n.commentBefore}
${i.key.commentBefore}`:n.commentBefore),n.comment){let o=i.value??i.key;o.comment=o.comment?`${n.comment}
${o.comment}`:n.comment}n=i}s.items[t]=N(n)?n:new C(n)}}else e("Expected a sequence for this tag");return s}function ns(s,e,t){let{replacer:n}=t,i=new P(s);i.tag="tag:yaml.org,2002:pairs";let o=0;if(e&&Symbol.iterator in Object(e))for(let r of e){typeof n=="function"&&(r=n.call(e,String(o++),r));let a,l;if(Array.isArray(r))if(r.length===2)a=r[0],l=r[1];else throw new TypeError(`Expected [key, value] tuple: ${r}`);else if(r&&r instanceof Object){let c=Object.keys(r);if(c.length===1)a=c[0],l=r[a];else throw new TypeError(`Expected tuple with one key, not ${c.length} keys`)}else a=r;i.items.push(Oe(a,l,t))}return i}var We={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:ss,createNode:ns};var Ee=class s extends P{constructor(){super(),this.add=I.prototype.add.bind(this),this.delete=I.prototype.delete.bind(this),this.get=I.prototype.get.bind(this),this.has=I.prototype.has.bind(this),this.set=I.prototype.set.bind(this),this.tag=s.tag}toJSON(e,t){if(!t)return super.toJSON(e);let n=new Map;t?.onCreate&&t.onCreate(n);for(let i of this.items){let o,r;if(N(i)?(o=$(i.key,"",t),r=$(i.value,o,t)):o=$(i,"",t),n.has(o))throw new Error("Ordered maps must not include duplicate keys");n.set(o,r)}return n}static from(e,t,n){let i=ns(e,t,n),o=new this;return o.items=i.items,o}};Ee.tag="tag:yaml.org,2002:omap";var ze={collection:"seq",identify:s=>s instanceof Map,nodeClass:Ee,default:!1,tag:"tag:yaml.org,2002:omap",resolve(s,e){let t=ss(s,e),n=[];for(let{key:i}of t.items)_(i)&&(n.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):n.push(i.value));return Object.assign(new Ee,t)},createNode:(s,e,t)=>Ee.from(s,e,t)};function js({value:s,source:e},t){return e&&(s?is:os).test.test(e)?e:s?t.options.trueStr:t.options.falseStr}var is={identify:s=>s===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new y(!0),stringify:js},os={identify:s=>s===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new y(!1),stringify:js};var Ks={identify:s=>typeof s=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:s=>s.slice(-3).toLowerCase()==="nan"?NaN:s[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:D},qs={identify:s=>typeof s=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:s=>parseFloat(s.replace(/_/g,"")),stringify(s){let e=Number(s.value);return isFinite(e)?e.toExponential():D(s)}},Fs={identify:s=>typeof s=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(s){let e=new y(parseFloat(s.replace(/_/g,""))),t=s.indexOf(".");if(t!==-1){let n=s.substring(t+1).replace(/_/g,"");n[n.length-1]==="0"&&(e.minFractionDigits=n.length)}return e},stringify:D};var Xe=s=>typeof s=="bigint"||Number.isInteger(s);function Ct(s,e,t,{intAsBigInt:n}){let i=s[0];if((i==="-"||i==="+")&&(e+=1),s=s.substring(e).replace(/_/g,""),n){switch(t){case 2:s=`0b${s}`;break;case 8:s=`0o${s}`;break;case 16:s=`0x${s}`;break}let r=BigInt(s);return i==="-"?BigInt(-1)*r:r}let o=parseInt(s,t);return i==="-"?-1*o:o}function rs(s,e,t){let{value:n}=s;if(Xe(n)){let i=n.toString(e);return n<0?"-"+t+i.substr(1):t+i}return D(s)}var Us={identify:Xe,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(s,e,t)=>Ct(s,2,2,t),stringify:s=>rs(s,2,"0b")},Gs={identify:Xe,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(s,e,t)=>Ct(s,1,8,t),stringify:s=>rs(s,8,"0")},Vs={identify:Xe,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(s,e,t)=>Ct(s,0,10,t),stringify:D},Ys={identify:Xe,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(s,e,t)=>Ct(s,2,16,t),stringify:s=>rs(s,16,"0x")};var Ce=class s extends I{constructor(e){super(e),this.tag=s.tag}add(e){let t;N(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new C(e.key,null):t=new C(e,null),me(this.items,t.key)||this.items.push(t)}get(e,t){let n=me(this.items,e);return!t&&N(n)?_(n.key)?n.key.value:n.key:n}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);let n=me(this.items,e);n&&!t?this.items.splice(this.items.indexOf(n),1):!n&&t&&this.items.push(new C(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,n){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,n);throw new Error("Set items must all have null values")}static from(e,t,n){let{replacer:i}=n,o=new this(e);if(t&&Symbol.iterator in Object(t))for(let r of t)typeof i=="function"&&(r=i.call(t,r,r)),o.items.push(Oe(r,null,n));return o}};Ce.tag="tag:yaml.org,2002:set";var Qe={collection:"map",identify:s=>s instanceof Set,nodeClass:Ce,default:!1,tag:"tag:yaml.org,2002:set",createNode:(s,e,t)=>Ce.from(s,e,t),resolve(s,e){if(U(s)){if(s.hasAllNullValues(!0))return Object.assign(new Ce,s);e("Set items must all have null values")}else e("Expected a mapping for this tag");return s}};function as(s,e){let t=s[0],n=t==="-"||t==="+"?s.substring(1):s,i=r=>e?BigInt(r):Number(r),o=n.replace(/_/g,"").split(":").reduce((r,a)=>r*i(60)+i(a),i(0));return t==="-"?i(-1)*o:o}function Hs(s){let{value:e}=s,t=r=>r;if(typeof e=="bigint")t=r=>BigInt(r);else if(isNaN(e)||!isFinite(e))return D(s);let n="";e<0&&(n="-",e*=t(-1));let i=t(60),o=[e%i];return e<60?o.unshift(0):(e=(e-o[0])/i,o.unshift(e%i),e>=60&&(e=(e-o[0])/i,o.unshift(e))),n+o.map(r=>String(r).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}var It={identify:s=>typeof s=="bigint"||Number.isInteger(s),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(s,e,{intAsBigInt:t})=>as(s,t),stringify:Hs},Tt={identify:s=>typeof s=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:s=>as(s,!1),stringify:Hs},Ie={identify:s=>s instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(s){let e=s.match(Ie.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");let[,t,n,i,o,r,a]=e.map(Number),l=e[7]?Number((e[7]+"00").substr(1,3)):0,c=Date.UTC(t,n-1,i,o||0,r||0,a||0,l),p=e[8];if(p&&p!=="Z"){let u=as(p,!1);Math.abs(u)<30&&(u*=60),c-=6e4*u}return new Date(c)},stringify:({value:s})=>s?.toISOString().replace(/(T00:00:00)?\.000Z$/,"")??""};var ls=[W,z,he,we,is,os,Us,Gs,Vs,Ys,Ks,qs,Fs,Je,J,ze,We,Qe,It,Tt,Ie];var Js=new Map([["core",Ds],["failsafe",[W,z,he]],["json",Bs],["yaml11",ls],["yaml-1.1",ls]]),Ws={binary:Je,bool:He,float:At,floatExp:vt,floatNaN:xt,floatTime:Tt,int:Lt,intHex:Ot,intOct:Nt,intTime:It,map:W,merge:J,null:we,omap:ze,pairs:We,seq:z,set:Qe,timestamp:Ie},zs={"tag:yaml.org,2002:binary":Je,"tag:yaml.org,2002:merge":J,"tag:yaml.org,2002:omap":ze,"tag:yaml.org,2002:pairs":We,"tag:yaml.org,2002:set":Qe,"tag:yaml.org,2002:timestamp":Ie};function Mt(s,e,t){let n=Js.get(e);if(n&&!s)return t&&!n.includes(J)?n.concat(J):n.slice();let i=n;if(!i)if(Array.isArray(s))i=[];else{let o=Array.from(Js.keys()).filter(r=>r!=="yaml11").map(r=>JSON.stringify(r)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${o} or define customTags array`)}if(Array.isArray(s))for(let o of s)i=i.concat(o);else typeof s=="function"&&(i=s(i.slice()));return t&&(i=i.concat(J)),i.reduce((o,r)=>{let a=typeof r=="string"?Ws[r]:r;if(!a){let l=JSON.stringify(r),c=Object.keys(Ws).map(p=>JSON.stringify(p)).join(", ");throw new Error(`Unknown custom tag ${l}; use one of ${c}`)}return o.includes(a)||o.push(a),o},[])}var ii=(s,e)=>s.key<e.key?-1:s.key>e.key?1:0,Te=class s{constructor({compat:e,customTags:t,merge:n,resolveKnownTags:i,schema:o,sortMapEntries:r,toStringDefaults:a}){this.compat=Array.isArray(e)?Mt(e,"compat"):e?Mt(null,e):null,this.name=typeof o=="string"&&o||"core",this.knownTags=i?zs:{},this.tags=Mt(t,this.name,n),this.toStringOptions=a??null,Object.defineProperty(this,Y,{value:W}),Object.defineProperty(this,j,{value:he}),Object.defineProperty(this,re,{value:z}),this.sortMapEntries=typeof r=="function"?r:r===!0?ii:null}clone(){let e=Object.create(s.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}};function Xs(s,e){let t=[],n=e.directives===!0;if(e.directives!==!1&&s.directives){let l=s.directives.toString(s);l?(t.push(l),n=!0):s.directives.docStart&&(n=!0)}n&&t.push("---");let i=ht(s,e),{commentString:o}=i.options;if(s.commentBefore){t.length!==1&&t.unshift("");let l=o(s.commentBefore);t.unshift(V(l,""))}let r=!1,a=null;if(s.contents){if(L(s.contents)){if(s.contents.spaceBefore&&n&&t.push(""),s.contents.commentBefore){let p=o(s.contents.commentBefore);t.push(V(p,""))}i.forceBlockIndent=!!s.comment,a=s.contents.comment}let l=a?void 0:()=>r=!0,c=ce(s.contents,i,()=>a=null,l);a&&(c+=te(c,"",o(a))),(c[0]==="|"||c[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${c}`:t.push(c)}else t.push(ce(s.contents,i));if(s.directives?.docEnd)if(s.comment){let l=o(s.comment);l.includes(`
`)?(t.push("..."),t.push(V(l,""))):t.push(`... ${l}`)}else t.push("...");else{let l=s.comment;l&&r&&(l=l.replace(/^\n+/,"")),l&&((!r||a)&&t[t.length-1]!==""&&t.push(""),t.push(V(o(l),"")))}return t.join(`
`)+`
`}var se=class s{constructor(e,t,n){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,R,{value:rt});let i=null;typeof t=="function"||Array.isArray(t)?i=t:n===void 0&&t&&(n=t,t=void 0);let o=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},n);this.options=o;let{version:r}=o;n?._directives?(this.directives=n._directives.atDocument(),this.directives.yaml.explicit&&(r=this.directives.yaml.version)):this.directives=new Z({version:r}),this.setSchema(r,n),this.contents=e===void 0?null:this.createNode(e,i,n)}clone(){let e=Object.create(s.prototype,{[R]:{value:rt}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=L(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){Me(this.contents)&&this.contents.add(e)}addIn(e,t){Me(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){let n=Jt(this);e.anchor=!t||n.has(t)?Wt(t||"a",n):t}return new ee(e.anchor)}createNode(e,t,n){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){let m=S=>typeof S=="number"||S instanceof String||S instanceof Number,w=t.filter(m).map(String);w.length>0&&(t=t.concat(w)),i=t}else n===void 0&&t&&(n=t,t=void 0);let{aliasDuplicateObjects:o,anchorPrefix:r,flow:a,keepUndefined:l,onTagObj:c,tag:p}=n??{},{onAnchor:u,setAnchors:f,sourceObjects:h}=Cs(this,r||"a"),g={aliasDuplicateObjects:o??!0,keepUndefined:l??!1,onAnchor:u,onTagObj:c,replacer:i,schema:this.schema,sourceObjects:h},d=ae(e,p,g);return a&&O(d)&&(d.flow=!0),f(),d}createPair(e,t,n={}){let i=this.createNode(e,null,n),o=this.createNode(t,null,n);return new C(i,o)}delete(e){return Me(this.contents)?this.contents.delete(e):!1}deleteIn(e){return Ne(e)?this.contents==null?!1:(this.contents=null,!0):Me(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return O(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return Ne(e)?!t&&_(this.contents)?this.contents.value:this.contents:O(this.contents)?this.contents.getIn(e,t):void 0}has(e){return O(this.contents)?this.contents.has(e):!1}hasIn(e){return Ne(e)?this.contents!==void 0:O(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=Ue(this.schema,[e],t):Me(this.contents)&&this.contents.set(e,t)}setIn(e,t){Ne(e)?this.contents=t:this.contents==null?this.contents=Ue(this.schema,Array.from(e),t):Me(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let n;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new Z({version:"1.1"}),n={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new Z({version:e}),n={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,n=null;break;default:{let i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(n)this.schema=new Te(Object.assign(n,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:n,maxAliasCount:i,onAnchor:o,reviver:r}={}){let a={anchors:new Map,doc:this,keep:!e,mapAsMap:n===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},l=$(this.contents,t??"",a);if(typeof o=="function")for(let{count:c,res:p}of a.anchors.values())o(p,c);return typeof r=="function"?de(r,{"":l},"",l):l}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){let t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return Xs(this,e)}};function Me(s){if(O(s))return!0;throw new Error("Expected a YAML collection as document contents")}var $e=class extends Error{constructor(e,t,n,i){super(),this.name=e,this.code=n,this.message=i,this.pos=t}},q=class extends $e{constructor(e,t,n){super("YAMLParseError",e,t,n)}},Pe=class extends $e{constructor(e,t,n){super("YAMLWarning",e,t,n)}},Ze=(s,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(a=>e.linePos(a));let{line:n,col:i}=t.linePos[0];t.message+=` at line ${n}, column ${i}`;let o=i-1,r=s.substring(e.lineStarts[n-1],e.lineStarts[n]).replace(/[\n\r]+$/,"");if(o>=60&&r.length>80){let a=Math.min(o-39,r.length-79);r="\u2026"+r.substring(a),o-=a-1}if(r.length>80&&(r=r.substring(0,79)+"\u2026"),n>1&&/^ *$/.test(r.substring(0,o))){let a=s.substring(e.lineStarts[n-2],e.lineStarts[n-1]);a.length>80&&(a=a.substring(0,79)+`\u2026
`),r=a+r}if(/[^ ]/.test(r)){let a=1,l=t.linePos[1];l&&l.line===n&&l.col>i&&(a=Math.max(1,Math.min(l.col-i,80-o)));let c=" ".repeat(o)+"^".repeat(a);t.message+=`:

${r}
${c}
`}};function ne(s,{flow:e,indicator:t,next:n,offset:i,onError:o,parentIndent:r,startOnNewline:a}){let l=!1,c=a,p=a,u="",f="",h=!1,g=!1,d=null,m=null,w=null,S=null,k=null,x=null,v=null;for(let b of s)switch(g&&(b.type!=="space"&&b.type!=="newline"&&b.type!=="comma"&&o(b.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),g=!1),d&&(c&&b.type!=="comment"&&b.type!=="newline"&&o(d,"TAB_AS_INDENT","Tabs are not allowed as indentation"),d=null),b.type){case"space":!e&&(t!=="doc-start"||n?.type!=="flow-collection")&&b.source.includes("	")&&(d=b),p=!0;break;case"comment":{p||o(b,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let T=b.source.substring(1)||" ";u?u+=f+T:u=T,f="",c=!1;break}case"newline":c?u?u+=b.source:(!x||t!=="seq-item-ind")&&(l=!0):f+=b.source,c=!0,h=!0,(m||w)&&(S=b),p=!0;break;case"anchor":m&&o(b,"MULTIPLE_ANCHORS","A node can have at most one anchor"),b.source.endsWith(":")&&o(b.offset+b.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),m=b,v??(v=b.offset),c=!1,p=!1,g=!0;break;case"tag":{w&&o(b,"MULTIPLE_TAGS","A node can have at most one tag"),w=b,v??(v=b.offset),c=!1,p=!1,g=!0;break}case t:(m||w)&&o(b,"BAD_PROP_ORDER",`Anchors and tags must be after the ${b.source} indicator`),x&&o(b,"UNEXPECTED_TOKEN",`Unexpected ${b.source} in ${e??"collection"}`),x=b,c=t==="seq-item-ind"||t==="explicit-key-ind",p=!1;break;case"comma":if(e){k&&o(b,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),k=b,c=!1,p=!1;break}default:o(b,"UNEXPECTED_TOKEN",`Unexpected ${b.type} token`),c=!1,p=!1}let A=s[s.length-1],E=A?A.offset+A.source.length:i;return g&&n&&n.type!=="space"&&n.type!=="newline"&&n.type!=="comma"&&(n.type!=="scalar"||n.source!=="")&&o(n.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),d&&(c&&d.indent<=r||n?.type==="block-map"||n?.type==="block-seq")&&o(d,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:k,found:x,spaceBefore:l,comment:u,hasNewline:h,anchor:m,tag:w,newlineAfterProp:S,end:E,start:v??E}}function ge(s){if(!s)return null;switch(s.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(s.source.includes(`
`))return!0;if(s.end){for(let e of s.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(let e of s.items){for(let t of e.start)if(t.type==="newline")return!0;if(e.sep){for(let t of e.sep)if(t.type==="newline")return!0}if(ge(e.key)||ge(e.value))return!0}return!1;default:return!0}}function et(s,e,t){if(e?.type==="flow-collection"){let n=e.end[0];n.indent===s&&(n.source==="]"||n.source==="}")&&ge(e)&&t(n,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function $t(s,e,t){let{uniqueKeys:n}=s.options;if(n===!1)return!1;let i=typeof n=="function"?n:(o,r)=>o===r||_(o)&&_(r)&&o.value===r.value;return e.some(o=>i(o.key,t))}var Qs="All mapping items must start at the same column";function Zs({composeNode:s,composeEmptyNode:e},t,n,i,o){let r=o?.nodeClass??I,a=new r(t.schema);t.atRoot&&(t.atRoot=!1);let l=n.offset,c=null;for(let p of n.items){let{start:u,key:f,sep:h,value:g}=p,d=ne(u,{indicator:"explicit-key-ind",next:f??h?.[0],offset:l,onError:i,parentIndent:n.indent,startOnNewline:!0}),m=!d.found;if(m){if(f&&(f.type==="block-seq"?i(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in f&&f.indent!==n.indent&&i(l,"BAD_INDENT",Qs)),!d.anchor&&!d.tag&&!h){c=d.end,d.comment&&(a.comment?a.comment+=`
`+d.comment:a.comment=d.comment);continue}(d.newlineAfterProp||ge(f))&&i(f??u[u.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else d.found?.indent!==n.indent&&i(l,"BAD_INDENT",Qs);t.atKey=!0;let w=d.end,S=f?s(t,f,d,i):e(t,w,u,null,d,i);t.schema.compat&&et(n.indent,f,i),t.atKey=!1,$t(t,a.items,S)&&i(w,"DUPLICATE_KEY","Map keys must be unique");let k=ne(h??[],{indicator:"map-value-ind",next:g,offset:S.range[2],onError:i,parentIndent:n.indent,startOnNewline:!f||f.type==="block-scalar"});if(l=k.end,k.found){m&&(g?.type==="block-map"&&!k.hasNewline&&i(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&d.start<k.found.offset-1024&&i(S.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));let x=g?s(t,g,k,i):e(t,l,h,null,k,i);t.schema.compat&&et(n.indent,g,i),l=x.range[2];let v=new C(S,x);t.options.keepSourceTokens&&(v.srcToken=p),a.items.push(v)}else{m&&i(S.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),k.comment&&(S.comment?S.comment+=`
`+k.comment:S.comment=k.comment);let x=new C(S);t.options.keepSourceTokens&&(x.srcToken=p),a.items.push(x)}}return c&&c<l&&i(c,"IMPOSSIBLE","Map comment with trailing content"),a.range=[n.offset,l,c??l],a}function en({composeNode:s,composeEmptyNode:e},t,n,i,o){let r=o?.nodeClass??P,a=new r(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let l=n.offset,c=null;for(let{start:p,value:u}of n.items){let f=ne(p,{indicator:"seq-item-ind",next:u,offset:l,onError:i,parentIndent:n.indent,startOnNewline:!0});if(!f.found)if(f.anchor||f.tag||u)u&&u.type==="block-seq"?i(f.end,"BAD_INDENT","All sequence items must start at the same column"):i(l,"MISSING_CHAR","Sequence item without - indicator");else{c=f.end,f.comment&&(a.comment=f.comment);continue}let h=u?s(t,u,f,i):e(t,f.end,p,null,f,i);t.schema.compat&&et(n.indent,u,i),l=h.range[2],a.items.push(h)}return a.range=[n.offset,l,c??l],a}function ie(s,e,t,n){let i="";if(s){let o=!1,r="";for(let a of s){let{source:l,type:c}=a;switch(c){case"space":o=!0;break;case"comment":{t&&!o&&n(a,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let p=l.substring(1)||" ";i?i+=r+p:i=p,r="";break}case"newline":i&&(r+=l),o=!0;break;default:n(a,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=l.length}}return{comment:i,offset:e}}var cs="Block collections are not allowed within flow collections",us=s=>s&&(s.type==="block-map"||s.type==="block-seq");function tn({composeNode:s,composeEmptyNode:e},t,n,i,o){let r=n.start.source==="{",a=r?"flow map":"flow sequence",l=o?.nodeClass??(r?I:P),c=new l(t.schema);c.flow=!0;let p=t.atRoot;p&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let u=n.offset+n.start.source.length;for(let m=0;m<n.items.length;++m){let w=n.items[m],{start:S,key:k,sep:x,value:v}=w,A=ne(S,{flow:a,indicator:"explicit-key-ind",next:k??x?.[0],offset:u,onError:i,parentIndent:n.indent,startOnNewline:!1});if(!A.found){if(!A.anchor&&!A.tag&&!x&&!v){m===0&&A.comma?i(A.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`):m<n.items.length-1&&i(A.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${a}`),A.comment&&(c.comment?c.comment+=`
`+A.comment:c.comment=A.comment),u=A.end;continue}!r&&t.options.strict&&ge(k)&&i(k,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(m===0)A.comma&&i(A.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`);else if(A.comma||i(A.start,"MISSING_CHAR",`Missing , between ${a} items`),A.comment){let E="";e:for(let b of S)switch(b.type){case"comma":case"space":break;case"comment":E=b.source.substring(1);break e;default:break e}if(E){let b=c.items[c.items.length-1];N(b)&&(b=b.value??b.key),b.comment?b.comment+=`
`+E:b.comment=E,A.comment=A.comment.substring(E.length+1)}}if(!r&&!x&&!A.found){let E=v?s(t,v,A,i):e(t,A.end,x,null,A,i);c.items.push(E),u=E.range[2],us(v)&&i(E.range,"BLOCK_IN_FLOW",cs)}else{t.atKey=!0;let E=A.end,b=k?s(t,k,A,i):e(t,E,S,null,A,i);us(k)&&i(b.range,"BLOCK_IN_FLOW",cs),t.atKey=!1;let T=ne(x??[],{flow:a,indicator:"map-value-ind",next:v,offset:b.range[2],onError:i,parentIndent:n.indent,startOnNewline:!1});if(T.found){if(!r&&!A.found&&t.options.strict){if(x)for(let M of x){if(M===T.found)break;if(M.type==="newline"){i(M,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}A.start<T.found.offset-1024&&i(T.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else v&&("source"in v&&v.source&&v.source[0]===":"?i(v,"MISSING_CHAR",`Missing space after : in ${a}`):i(T.start,"MISSING_CHAR",`Missing , or : between ${a} items`));let fe=v?s(t,v,T,i):T.found?e(t,T.end,x,null,T,i):null;fe?us(v)&&i(fe.range,"BLOCK_IN_FLOW",cs):T.comment&&(b.comment?b.comment+=`
`+T.comment:b.comment=T.comment);let xe=new C(b,fe);if(t.options.keepSourceTokens&&(xe.srcToken=w),r){let M=c;$t(t,M.items,b)&&i(E,"DUPLICATE_KEY","Map keys must be unique"),M.items.push(xe)}else{let M=new I(t.schema);M.flow=!0,M.items.push(xe);let As=(fe??b).range;M.range=[b.range[0],As[1],As[2]],c.items.push(M)}u=fe?fe.range[2]:T.end}}let f=r?"}":"]",[h,...g]=n.end,d=u;if(h&&h.source===f)d=h.offset+h.source.length;else{let m=a[0].toUpperCase()+a.substring(1),w=p?`${m} must end with a ${f}`:`${m} in block collection must be sufficiently indented and end with a ${f}`;i(u,p?"MISSING_CHAR":"BAD_INDENT",w),h&&h.source.length!==1&&g.unshift(h)}if(g.length>0){let m=ie(g,d,t.options.strict,i);m.comment&&(c.comment?c.comment+=`
`+m.comment:c.comment=m.comment),c.range=[n.offset,d,m.offset]}else c.range=[n.offset,d,d];return c}function fs(s,e,t,n,i,o){let r=t.type==="block-map"?Zs(s,e,t,n,o):t.type==="block-seq"?en(s,e,t,n,o):tn(s,e,t,n,o),a=r.constructor;return i==="!"||i===a.tagName?(r.tag=a.tagName,r):(i&&(r.tag=i),r)}function sn(s,e,t,n,i){let o=n.tag,r=o?e.directives.tagName(o.source,f=>i(o,"TAG_RESOLVE_FAILED",f)):null;if(t.type==="block-seq"){let{anchor:f,newlineAfterProp:h}=n,g=f&&o?f.offset>o.offset?f:o:f??o;g&&(!h||h.offset<g.offset)&&i(g,"MISSING_CHAR","Missing newline after block sequence props")}let a=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!o||!r||r==="!"||r===I.tagName&&a==="map"||r===P.tagName&&a==="seq")return fs(s,e,t,i,r);let l=e.schema.tags.find(f=>f.tag===r&&f.collection===a);if(!l){let f=e.schema.knownTags[r];if(f&&f.collection===a)e.schema.tags.push(Object.assign({},f,{default:!1})),l=f;else return f?i(o,"BAD_COLLECTION_TYPE",`${f.tag} used for ${a} collection, but expects ${f.collection??"scalar"}`,!0):i(o,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,!0),fs(s,e,t,i,r)}let c=fs(s,e,t,i,r,l),p=l.resolve?.(c,f=>i(o,"TAG_RESOLVE_FAILED",f),e.options)??c,u=L(p)?p:new y(p);return u.range=c.range,u.tag=r,l?.format&&(u.format=l.format),u}function Pt(s,e,t){let n=e.offset,i=oi(e,s.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[n,n,n]};let o=i.mode===">"?y.BLOCK_FOLDED:y.BLOCK_LITERAL,r=e.source?ri(e.source):[],a=r.length;for(let d=r.length-1;d>=0;--d){let m=r[d][1];if(m===""||m==="\r")a=d;else break}if(a===0){let d=i.chomp==="+"&&r.length>0?`
`.repeat(Math.max(1,r.length-1)):"",m=n+i.length;return e.source&&(m+=e.source.length),{value:d,type:o,comment:i.comment,range:[n,m,m]}}let l=e.indent+i.indent,c=e.offset+i.length,p=0;for(let d=0;d<a;++d){let[m,w]=r[d];if(w===""||w==="\r")i.indent===0&&m.length>l&&(l=m.length);else{m.length<l&&t(c+m.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(l=m.length),p=d,l===0&&!s.atRoot&&t(c,"BAD_INDENT","Block scalar values in collections must be indented");break}c+=m.length+w.length+1}for(let d=r.length-1;d>=a;--d)r[d][0].length>l&&(a=d+1);let u="",f="",h=!1;for(let d=0;d<p;++d)u+=r[d][0].slice(l)+`
`;for(let d=p;d<a;++d){let[m,w]=r[d];c+=m.length+w.length+1;let S=w[w.length-1]==="\r";if(S&&(w=w.slice(0,-1)),w&&m.length<l){let x=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(c-w.length-(S?2:1),"BAD_INDENT",x),m=""}o===y.BLOCK_LITERAL?(u+=f+m.slice(l)+w,f=`
`):m.length>l||w[0]==="	"?(f===" "?f=`
`:!h&&f===`
`&&(f=`

`),u+=f+m.slice(l)+w,f=`
`,h=!0):w===""?f===`
`?u+=`
`:f=`
`:(u+=f+w,f=" ",h=!1)}switch(i.chomp){case"-":break;case"+":for(let d=a;d<r.length;++d)u+=`
`+r[d][0].slice(l);u[u.length-1]!==`
`&&(u+=`
`);break;default:u+=`
`}let g=n+i.length+e.source.length;return{value:u,type:o,comment:i.comment,range:[n,g,g]}}function oi({offset:s,props:e},t,n){if(e[0].type!=="block-scalar-header")return n(e[0],"IMPOSSIBLE","Block scalar header not found"),null;let{source:i}=e[0],o=i[0],r=0,a="",l=-1;for(let f=1;f<i.length;++f){let h=i[f];if(!a&&(h==="-"||h==="+"))a=h;else{let g=Number(h);!r&&g?r=g:l===-1&&(l=s+f)}}l!==-1&&n(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let c=!1,p="",u=i.length;for(let f=1;f<e.length;++f){let h=e[f];switch(h.type){case"space":c=!0;case"newline":u+=h.source.length;break;case"comment":t&&!c&&n(h,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),u+=h.source.length,p=h.source.substring(1);break;case"error":n(h,"UNEXPECTED_TOKEN",h.message),u+=h.source.length;break;default:{let g=`Unexpected token in block scalar header: ${h.type}`;n(h,"UNEXPECTED_TOKEN",g);let d=h.source;d&&typeof d=="string"&&(u+=d.length)}}}return{mode:o,indent:r,chomp:a,comment:p,length:u}}function ri(s){let e=s.split(/\n( *)/),t=e[0],n=t.match(/^( *)/),o=[n?.[1]?[n[1],t.slice(n[1].length)]:["",t]];for(let r=1;r<e.length;r+=2)o.push([e[r],e[r+1]]);return o}function Dt(s,e,t){let{offset:n,type:i,source:o,end:r}=s,a,l,c=(f,h,g)=>t(n+f,h,g);switch(i){case"scalar":a=y.PLAIN,l=ai(o,c);break;case"single-quoted-scalar":a=y.QUOTE_SINGLE,l=li(o,c);break;case"double-quoted-scalar":a=y.QUOTE_DOUBLE,l=ci(o,c);break;default:return t(s,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[n,n+o.length,n+o.length]}}let p=n+o.length,u=ie(r,p,e,t);return{value:l,type:a,comment:u.comment,range:[n,p,u.offset]}}function ai(s,e){let t="";switch(s[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${s[0]}`;break}case"@":case"`":{t=`reserved character ${s[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),nn(s)}function li(s,e){return(s[s.length-1]!=="'"||s.length===1)&&e(s.length,"MISSING_CHAR","Missing closing 'quote"),nn(s.slice(1,-1)).replace(/''/g,"'")}function nn(s){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let n=e.exec(s);if(!n)return s;let i=n[1],o=" ",r=e.lastIndex;for(t.lastIndex=r;n=t.exec(s);)n[1]===""?o===`
`?i+=o:o=`
`:(i+=o+n[1],o=" "),r=t.lastIndex;let a=/[ \t]*(.*)/sy;return a.lastIndex=r,n=a.exec(s),i+o+(n?.[1]??"")}function ci(s,e){let t="";for(let n=1;n<s.length-1;++n){let i=s[n];if(!(i==="\r"&&s[n+1]===`
`))if(i===`
`){let{fold:o,offset:r}=ui(s,n);t+=o,n=r}else if(i==="\\"){let o=s[++n],r=fi[o];if(r)t+=r;else if(o===`
`)for(o=s[n+1];o===" "||o==="	";)o=s[++n+1];else if(o==="\r"&&s[n+1]===`
`)for(o=s[++n+1];o===" "||o==="	";)o=s[++n+1];else if(o==="x"||o==="u"||o==="U"){let a={x:2,u:4,U:8}[o];t+=di(s,n+1,a,e),n+=a}else{let a=s.substr(n-1,2);e(n-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),t+=a}}else if(i===" "||i==="	"){let o=n,r=s[n+1];for(;r===" "||r==="	";)r=s[++n+1];r!==`
`&&!(r==="\r"&&s[n+2]===`
`)&&(t+=n>o?s.slice(o,n+1):i)}else t+=i}return(s[s.length-1]!=='"'||s.length===1)&&e(s.length,"MISSING_CHAR",'Missing closing "quote'),t}function ui(s,e){let t="",n=s[e+1];for(;(n===" "||n==="	"||n===`
`||n==="\r")&&!(n==="\r"&&s[e+2]!==`
`);)n===`
`&&(t+=`
`),e+=1,n=s[e+1];return t||(t=" "),{fold:t,offset:e}}var fi={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"\x85",_:"\xA0",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function di(s,e,t,n){let i=s.substr(e,t),r=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;if(isNaN(r)){let a=s.substr(e-2,t+2);return n(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),a}return String.fromCodePoint(r)}function ds(s,e,t,n){let{value:i,type:o,comment:r,range:a}=e.type==="block-scalar"?Pt(s,e,n):Dt(e,s.options.strict,n),l=t?s.directives.tagName(t.source,u=>n(t,"TAG_RESOLVE_FAILED",u)):null,c;s.options.stringKeys&&s.atKey?c=s.schema[j]:l?c=pi(s.schema,i,l,t,n):e.type==="scalar"?c=mi(s,i,e,n):c=s.schema[j];let p;try{let u=c.resolve(i,f=>n(t??e,"TAG_RESOLVE_FAILED",f),s.options);p=_(u)?u:new y(u)}catch(u){let f=u instanceof Error?u.message:String(u);n(t??e,"TAG_RESOLVE_FAILED",f),p=new y(i)}return p.range=a,p.source=i,o&&(p.type=o),l&&(p.tag=l),c.format&&(p.format=c.format),r&&(p.comment=r),p}function pi(s,e,t,n,i){if(t==="!")return s[j];let o=[];for(let a of s.tags)if(!a.collection&&a.tag===t)if(a.default&&a.test)o.push(a);else return a;for(let a of o)if(a.test?.test(e))return a;let r=s.knownTags[t];return r&&!r.collection?(s.tags.push(Object.assign({},r,{default:!1,test:void 0})),r):(i(n,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),s[j])}function mi({atKey:s,directives:e,schema:t},n,i,o){let r=t.tags.find(a=>(a.default===!0||s&&a.default==="key")&&a.test?.test(n))||t[j];if(t.compat){let a=t.compat.find(l=>l.default&&l.test?.test(n))??t[j];if(r.tag!==a.tag){let l=e.tagString(r.tag),c=e.tagString(a.tag),p=`Value may be parsed as either ${l} or ${c}`;o(i,"TAG_RESOLVE_FAILED",p,!0)}}return r}function on(s,e,t){if(e){t??(t=e.length);for(let n=t-1;n>=0;--n){let i=e[n];switch(i.type){case"space":case"comment":case"newline":s-=i.source.length;continue}for(i=e[++n];i?.type==="space";)s+=i.source.length,i=e[++n];break}}return s}var hi={composeNode:ps,composeEmptyNode:Rt};function ps(s,e,t,n){let i=s.atKey,{spaceBefore:o,comment:r,anchor:a,tag:l}=t,c,p=!0;switch(e.type){case"alias":c=gi(s,e,n),(a||l)&&n(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":c=ds(s,e,l,n),a&&(c.anchor=a.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":c=sn(hi,s,e,t,n),a&&(c.anchor=a.source.substring(1));break;default:{let u=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;n(e,"UNEXPECTED_TOKEN",u),c=Rt(s,e.offset,void 0,null,t,n),p=!1}}return a&&c.anchor===""&&n(a,"BAD_ALIAS","Anchor cannot be an empty string"),i&&s.options.stringKeys&&(!_(c)||typeof c.value!="string"||c.tag&&c.tag!=="tag:yaml.org,2002:str")&&n(l??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),o&&(c.spaceBefore=!0),r&&(e.type==="scalar"&&e.source===""?c.comment=r:c.commentBefore=r),s.options.keepSourceTokens&&p&&(c.srcToken=e),c}function Rt(s,e,t,n,{spaceBefore:i,comment:o,anchor:r,tag:a,end:l},c){let p={type:"scalar",offset:on(e,t,n),indent:-1,source:""},u=ds(s,p,a,c);return r&&(u.anchor=r.source.substring(1),u.anchor===""&&c(r,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(u.spaceBefore=!0),o&&(u.comment=o,u.range[2]=l),u}function gi({options:s},{offset:e,source:t,end:n},i){let o=new ee(t.substring(1));o.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),o.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);let r=e+t.length,a=ie(n,r,s.strict,i);return o.range=[e,r,a.offset],a.comment&&(o.comment=a.comment),o}function rn(s,e,{offset:t,start:n,value:i,end:o},r){let a=Object.assign({_directives:e},s),l=new se(void 0,a),c={atKey:!1,atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},p=ne(n,{indicator:"doc-start",next:i??o?.[0],offset:t,onError:r,parentIndent:0,startOnNewline:!0});p.found&&(l.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!p.hasNewline&&r(p.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=i?ps(c,i,p,r):Rt(c,p.end,n,null,p,r);let u=l.contents.range[2],f=ie(o,u,!1,r);return f.comment&&(l.comment=f.comment),l.range=[t,u,f.offset],l}function tt(s){if(typeof s=="number")return[s,s+1];if(Array.isArray(s))return s.length===2?s:[s[0],s[1]];let{offset:e,source:t}=s;return[e,e+(typeof t=="string"?t.length:1)]}function an(s){let e="",t=!1,n=!1;for(let i=0;i<s.length;++i){let o=s[i];switch(o[0]){case"#":e+=(e===""?"":n?`

`:`
`)+(o.substring(1)||" "),t=!0,n=!1;break;case"%":s[i+1]?.[0]!=="#"&&(i+=1),t=!1;break;default:t||(n=!0),t=!1}}return{comment:e,afterEmptyLine:n}}var Se=class{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,n,i,o)=>{let r=tt(t);o?this.warnings.push(new Pe(r,n,i)):this.errors.push(new q(r,n,i))},this.directives=new Z({version:e.version||"1.2"}),this.options=e}decorate(e,t){let{comment:n,afterEmptyLine:i}=an(this.prelude);if(n){let o=e.contents;if(t)e.comment=e.comment?`${e.comment}
${n}`:n;else if(i||e.directives.docStart||!o)e.commentBefore=n;else if(O(o)&&!o.flow&&o.items.length>0){let r=o.items[0];N(r)&&(r=r.key);let a=r.commentBefore;r.commentBefore=a?`${n}
${a}`:n}else{let r=o.commentBefore;o.commentBefore=r?`${n}
${r}`:n}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:an(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,n=-1){for(let i of e)yield*this.next(i);yield*this.end(t,n)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,n,i)=>{let o=tt(e);o[0]+=t,this.onError(o,"BAD_DIRECTIVE",n,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{let t=rn(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{let t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,n=new q(tt(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(n):this.doc.errors.push(n);break}case"doc-end":{if(!this.doc){let n="Unexpected doc-end without preceding document";this.errors.push(new q(tt(e),"UNEXPECTED_TOKEN",n));break}this.doc.directives.docEnd=!0;let t=ie(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){let n=this.doc.comment;this.doc.comment=n?`${n}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new q(tt(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){let n=Object.assign({_directives:this.directives},this.options),i=new se(void 0,n);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}};var ys={};_s(ys,{BOM:()=>st,DOCUMENT:()=>nt,FLOW_END:()=>it,SCALAR:()=>De,createScalarToken:()=>cn,isCollection:()=>wi,isScalar:()=>Si,prettyToken:()=>ki,resolveAsScalar:()=>ln,setScalarValue:()=>un,stringify:()=>dn,tokenType:()=>gs,visit:()=>ye});function ln(s,e=!0,t){if(s){let n=(i,o,r)=>{let a=typeof i=="number"?i:Array.isArray(i)?i[0]:i.offset;if(t)t(a,o,r);else throw new q([a,a+1],o,r)};switch(s.type){case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return Dt(s,e,n);case"block-scalar":return Pt({options:{strict:e}},s,n)}}return null}function cn(s,e){let{implicitKey:t=!1,indent:n,inFlow:i=!1,offset:o=-1,type:r="PLAIN"}=e,a=le({type:r,value:s},{implicitKey:t,indent:n>0?" ".repeat(n):"",inFlow:i,options:{blockQuote:!0,lineWidth:-1}}),l=e.end??[{type:"newline",offset:-1,indent:n,source:`
`}];switch(a[0]){case"|":case">":{let c=a.indexOf(`
`),p=a.substring(0,c),u=a.substring(c+1)+`
`,f=[{type:"block-scalar-header",offset:o,indent:n,source:p}];return fn(f,l)||f.push({type:"newline",offset:-1,indent:n,source:`
`}),{type:"block-scalar",offset:o,indent:n,props:f,source:u}}case'"':return{type:"double-quoted-scalar",offset:o,indent:n,source:a,end:l};case"'":return{type:"single-quoted-scalar",offset:o,indent:n,source:a,end:l};default:return{type:"scalar",offset:o,indent:n,source:a,end:l}}}function un(s,e,t={}){let{afterKey:n=!1,implicitKey:i=!1,inFlow:o=!1,type:r}=t,a="indent"in s?s.indent:null;if(n&&typeof a=="number"&&(a+=2),!r)switch(s.type){case"single-quoted-scalar":r="QUOTE_SINGLE";break;case"double-quoted-scalar":r="QUOTE_DOUBLE";break;case"block-scalar":{let c=s.props[0];if(c.type!=="block-scalar-header")throw new Error("Invalid block scalar header");r=c.source[0]===">"?"BLOCK_FOLDED":"BLOCK_LITERAL";break}default:r="PLAIN"}let l=le({type:r,value:e},{implicitKey:i||a===null,indent:a!==null&&a>0?" ".repeat(a):"",inFlow:o,options:{blockQuote:!0,lineWidth:-1}});switch(l[0]){case"|":case">":yi(s,l);break;case'"':ms(s,l,"double-quoted-scalar");break;case"'":ms(s,l,"single-quoted-scalar");break;default:ms(s,l,"scalar")}}function yi(s,e){let t=e.indexOf(`
`),n=e.substring(0,t),i=e.substring(t+1)+`
`;if(s.type==="block-scalar"){let o=s.props[0];if(o.type!=="block-scalar-header")throw new Error("Invalid block scalar header");o.source=n,s.source=i}else{let{offset:o}=s,r="indent"in s?s.indent:-1,a=[{type:"block-scalar-header",offset:o,indent:r,source:n}];fn(a,"end"in s?s.end:void 0)||a.push({type:"newline",offset:-1,indent:r,source:`
`});for(let l of Object.keys(s))l!=="type"&&l!=="offset"&&delete s[l];Object.assign(s,{type:"block-scalar",indent:r,props:a,source:i})}}function fn(s,e){if(e)for(let t of e)switch(t.type){case"space":case"comment":s.push(t);break;case"newline":return s.push(t),!0}return!1}function ms(s,e,t){switch(s.type){case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":s.type=t,s.source=e;break;case"block-scalar":{let n=s.props.slice(1),i=e.length;s.props[0].type==="block-scalar-header"&&(i-=s.props[0].source.length);for(let o of n)o.offset+=i;delete s.props,Object.assign(s,{type:t,source:e,end:n});break}case"block-map":case"block-seq":{let i={type:"newline",offset:s.offset+e.length,indent:s.indent,source:`
`};delete s.items,Object.assign(s,{type:t,source:e,end:[i]});break}default:{let n="indent"in s?s.indent:-1,i="end"in s&&Array.isArray(s.end)?s.end.filter(o=>o.type==="space"||o.type==="comment"||o.type==="newline"):[];for(let o of Object.keys(s))o!=="type"&&o!=="offset"&&delete s[o];Object.assign(s,{type:t,indent:n,source:e,end:i})}}}var dn=s=>"type"in s?jt(s):Bt(s);function jt(s){switch(s.type){case"block-scalar":{let e="";for(let t of s.props)e+=jt(t);return e+s.source}case"block-map":case"block-seq":{let e="";for(let t of s.items)e+=Bt(t);return e}case"flow-collection":{let e=s.start.source;for(let t of s.items)e+=Bt(t);for(let t of s.end)e+=t.source;return e}case"document":{let e=Bt(s);if(s.end)for(let t of s.end)e+=t.source;return e}default:{let e=s.source;if("end"in s&&s.end)for(let t of s.end)e+=t.source;return e}}}function Bt({start:s,key:e,sep:t,value:n}){let i="";for(let o of s)i+=o.source;if(e&&(i+=jt(e)),t)for(let o of t)i+=o.source;return n&&(i+=jt(n)),i}var hs=Symbol("break visit"),bi=Symbol("skip children"),pn=Symbol("remove item");function ye(s,e){"type"in s&&s.type==="document"&&(s={start:s.start,value:s.value}),mn(Object.freeze([]),s,e)}ye.BREAK=hs;ye.SKIP=bi;ye.REMOVE=pn;ye.itemAtPath=(s,e)=>{let t=s;for(let[n,i]of e){let o=t?.[n];if(o&&"items"in o)t=o.items[i];else return}return t};ye.parentCollection=(s,e)=>{let t=ye.itemAtPath(s,e.slice(0,-1)),n=e[e.length-1][0],i=t?.[n];if(i&&"items"in i)return i;throw new Error("Parent collection not found")};function mn(s,e,t){let n=t(e,s);if(typeof n=="symbol")return n;for(let i of["key","value"]){let o=e[i];if(o&&"items"in o){for(let r=0;r<o.items.length;++r){let a=mn(Object.freeze(s.concat([[i,r]])),o.items[r],t);if(typeof a=="number")r=a-1;else{if(a===hs)return hs;a===pn&&(o.items.splice(r,1),r-=1)}}typeof n=="function"&&i==="key"&&(n=n(e,s))}}return typeof n=="function"?n(e,s):n}var st="\uFEFF",nt="",it="",De="",wi=s=>!!s&&"items"in s,Si=s=>!!s&&(s.type==="scalar"||s.type==="single-quoted-scalar"||s.type==="double-quoted-scalar"||s.type==="block-scalar");function ki(s){switch(s){case st:return"<BOM>";case nt:return"<DOC>";case it:return"<FLOW_END>";case De:return"<SCALAR>";default:return JSON.stringify(s)}}function gs(s){switch(s){case st:return"byte-order-mark";case nt:return"doc-mode";case it:return"flow-error-end";case De:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(s[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function X(s){switch(s){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}var hn=new Set("0123456789ABCDEFabcdef"),xi=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),Kt=new Set(",[]{}"),vi=new Set(` ,[]{}
\r	`),bs=s=>!s||vi.has(s),Re=class{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let n=this.next??"stream";for(;n&&(t||this.hasChars(1));)n=yield*this.parseNext(n)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let n=0;for(;t===" ";)t=this.buffer[++n+e];if(t==="\r"){let i=this.buffer[n+e+1];if(i===`
`||!i&&!this.atEnd)return e+n+1}return t===`
`||n>=this.indentNext||!t&&!this.atEnd?e+n:-1}if(t==="-"||t==="."){let n=this.buffer.substr(e,3);if((n==="---"||n==="...")&&X(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===st&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,n=e.indexOf("#");for(;n!==-1;){let o=e[n-1];if(o===" "||o==="	"){t=n-1;break}else n=e.indexOf("#",n+1)}for(;;){let o=e[t-1];if(o===" "||o==="	")t-=1;else break}let i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){let t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield nt,yield*this.parseLineStart()}*parseLineStart(){let e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");let t=this.peek(3);if((t==="---"||t==="...")&&X(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!X(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){let[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&X(t)){let n=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=n,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);let e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(bs),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,n=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=n=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);let i=this.getLine();if(i===null)return this.setNext("flow");if((n!==-1&&n<this.indentNext&&i[0]!=="#"||n===0&&(i.startsWith("---")||i.startsWith("..."))&&X(i[3]))&&!(n===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield it,yield*this.parseLineStart();let o=0;for(;i[o]===",";)o+=yield*this.pushCount(1),o+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(o+=yield*this.pushIndicators(),i[o]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-o),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(bs),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{let r=this.charAt(1);if(this.flowKey||X(r)||r===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){let e=this.charAt(0),t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let o=0;for(;this.buffer[t-1-o]==="\\";)o+=1;if(o%2===0)break;t=this.buffer.indexOf('"',t+1)}let n=this.buffer.substring(0,t),i=n.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){let o=this.continueScalar(i+1);if(o===-1)break;i=n.indexOf(`
`,o)}i!==-1&&(t=i-(n[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){let t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>X(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,n;e:for(let o=this.pos;n=this.buffer[o];++o)switch(n){case" ":t+=1;break;case`
`:e=o,t=0;break;case"\r":{let r=this.buffer[o+1];if(!r&&!this.atEnd)return this.setNext("block-scalar");if(r===`
`)break}default:break e}if(!n&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{let o=this.continueScalar(e+1);if(o===-1)break;e=this.buffer.indexOf(`
`,o)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(n=this.buffer[i];n===" ";)n=this.buffer[++i];if(n==="	"){for(;n==="	"||n===" "||n==="\r"||n===`
`;)n=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let o=e-1,r=this.buffer[o];r==="\r"&&(r=this.buffer[--o]);let a=o;for(;r===" ";)r=this.buffer[--o];if(r===`
`&&o>=this.pos&&o+1+t>a)e=o;else break}while(!0);return yield De,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){let e=this.flowLevel>0,t=this.pos-1,n=this.pos-1,i;for(;i=this.buffer[++n];)if(i===":"){let o=this.buffer[n+1];if(X(o)||e&&Kt.has(o))break;t=n}else if(X(i)){let o=this.buffer[n+1];if(i==="\r"&&(o===`
`?(n+=1,i=`
`,o=this.buffer[n+1]):t=n),o==="#"||e&&Kt.has(o))break;if(i===`
`){let r=this.continueScalar(n+1);if(r===-1)break;n=Math.max(n,r-2)}}else{if(e&&Kt.has(i))break;t=n}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield De,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){let n=this.buffer.slice(this.pos,e);return n?(yield n,this.pos+=n.length,n.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(bs))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{let e=this.flowLevel>0,t=this.charAt(1);if(X(t)||e&&Kt.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!X(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(xi.has(t))t=this.buffer[++e];else if(t==="%"&&hn.has(this.buffer[e+1])&&hn.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){let e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,n;do n=this.buffer[++t];while(n===" "||e&&n==="	");let i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,n=this.buffer[t];for(;!e(n);)n=this.buffer[++t];return yield*this.pushToIndex(t,!1)}};var Be=class{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,n=this.lineStarts.length;for(;t<n;){let o=t+n>>1;this.lineStarts[o]<e?t=o+1:n=o}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};let i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}};function be(s,e){for(let t=0;t<s.length;++t)if(s[t].type===e)return!0;return!1}function gn(s){for(let e=0;e<s.length;++e)switch(s[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function bn(s){switch(s?.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function qt(s){switch(s.type){case"document":return s.start;case"block-map":{let e=s.items[s.items.length-1];return e.sep??e.start}case"block-seq":return s.items[s.items.length-1].start;default:return[]}}function je(s){if(s.length===0)return[];let e=s.length;e:for(;--e>=0;)switch(s[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;s[++e]?.type==="space";);return s.splice(e,s.length)}function yn(s){if(s.start.type==="flow-seq-start")for(let e of s.items)e.sep&&!e.value&&!be(e.start,"explicit-key-ind")&&!be(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,bn(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}var ke=class{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new Re,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(let n of this.lexer.lex(e,t))yield*this.next(n);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}let t=gs(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{let n=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:n,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){let e=this.peek(1);if(this.type==="doc-end"&&(!e||e.type!=="doc-end")){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){let t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{let n=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in n?n.indent:0:t.type==="flow-collection"&&n.type==="document"&&(t.indent=0),t.type==="flow-collection"&&yn(t),n.type){case"document":n.value=t;break;case"block-scalar":n.props.push(t);break;case"block-map":{let i=n.items[n.items.length-1];if(i.value){n.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{let i=n.items[n.items.length-1];i.value?n.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{let i=n.items[n.items.length-1];!i||i.value?n.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((n.type==="document"||n.type==="block-map"||n.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){let i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&gn(i.start)===-1&&(t.indent===0||i.start.every(o=>o.type!=="comment"||o.indent<t.indent))&&(n.type==="document"?n.end=i.start:n.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{let e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{gn(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}let t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){let t=qt(this.peek(2)),n=je(t),i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];let o={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:n,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){let t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){let n="end"in t.value?t.value.end:void 0;(Array.isArray(n)?n[n.length-1]:void 0)?.type==="comment"?n?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){let i=e.items[e.items.length-2]?.value?.end;if(Array.isArray(i)){Array.prototype.push.apply(i,t.start),i.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){let n=!this.onKeyLine&&this.indent===e.indent,i=n&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind",o=[];if(i&&t.sep&&!t.value){let r=[];for(let a=0;a<t.sep.length;++a){let l=t.sep[a];switch(l.type){case"newline":r.push(a);break;case"space":break;case"comment":l.indent>e.indent&&(r.length=0);break;default:r.length=0}}r.length>=2&&(o=t.sep.splice(r[1]))}switch(this.type){case"anchor":case"tag":i||t.value?(o.push(this.sourceToken),e.items.push({start:o}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):i||t.value?(o.push(this.sourceToken),e.items.push({start:o,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(be(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]});else if(bn(t.key)&&!be(t.sep,"newline")){let r=je(t.start),a=t.key,l=t.sep;l.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:a,sep:l}]})}else o.length>0?t.sep=t.sep.concat(o,this.sourceToken):t.sep.push(this.sourceToken);else if(be(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{let r=je(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||i?e.items.push({start:o,key:null,sep:[this.sourceToken]}):be(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let r=this.flowScalar(this.type);i||t.value?(e.items.push({start:o,key:r,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(r):(Object.assign(t,{key:r,sep:[]}),this.onKeyLine=!0);return}default:{let r=this.startBlockValue(e);if(r){if(r.type==="block-seq"){if(!t.explicitKey&&t.sep&&!be(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else n&&e.items.push({start:o});this.stack.push(r);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){let t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){let n="end"in t.value?t.value.end:void 0;(Array.isArray(n)?n[n.length-1]:void 0)?.type==="comment"?n?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){let i=e.items[e.items.length-2]?.value?.end;if(Array.isArray(i)){Array.prototype.push.apply(i,t.start),i.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||be(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){let n=this.startBlockValue(e);if(n){this.stack.push(n);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){let t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let n;do yield*this.pop(),n=this.peek(1);while(n&&n.type==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}let n=this.startBlockValue(e);n?this.stack.push(n):(yield*this.pop(),yield*this.step())}else{let n=this.peek(2);if(n.type==="block-map"&&(this.type==="map-value-ind"&&n.indent===e.indent||this.type==="newline"&&!n.items[n.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&n.type!=="flow-collection"){let i=qt(n),o=je(i);yn(e);let r=e.end.splice(1,e.end.length);r.push(this.sourceToken);let a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:o,key:e,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;let t=qt(e),n=je(t);return n.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:n,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;let t=qt(e),n=je(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:n,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(n=>n.type==="newline"||n.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}};function wn(s){let e=s.prettyErrors!==!1;return{lineCounter:s.lineCounter||e&&new Be||null,prettyErrors:e}}function Sn(s,e={}){let{lineCounter:t,prettyErrors:n}=wn(e),i=new ke(t?.addNewLine),o=new Se(e),r=Array.from(o.compose(i.parse(s)));if(n&&t)for(let a of r)a.errors.forEach(Ze(s,t)),a.warnings.forEach(Ze(s,t));return r.length>0?r:Object.assign([],{empty:!0},o.streamInfo())}function ws(s,e={}){let{lineCounter:t,prettyErrors:n}=wn(e),i=new ke(t?.addNewLine),o=new Se(e),r=null;for(let a of o.compose(i.parse(s),!0,s.length))if(!r)r=a;else if(r.options.logLevel!=="silent"){r.errors.push(new q(a.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return n&&t&&(r.errors.forEach(Ze(s,t)),r.warnings.forEach(Ze(s,t))),r}function kn(s,e,t){let n;typeof e=="function"?n=e:t===void 0&&e&&typeof e=="object"&&(t=e);let i=ws(s,t);if(!i)return null;if(i.warnings.forEach(o=>gt(i.options.logLevel,o)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:n},t))}function xn(s,e,t){let n=null;if(typeof e=="function"||Array.isArray(e)?n=e:t===void 0&&e&&(t=e),typeof t=="string"&&(t=t.length),typeof t=="number"){let i=Math.round(t);t=i<1?void 0:i>8?{indent:8}:{indent:i}}if(s===void 0){let{keepUndefined:i}=t??e??{};if(!i)return}return F(s)&&!n?s.toString(t):new se(s,n,t).toString(t)}var ks=Ss;var vn=ue("aHR0cHM6Ly90LmFsY3kuY2MveWN5"),An=ue("aHR0cHM6Ly9zdWItc3RvcnQtbm9kZWpzLnBhZ2VzLmRldg=="),_n=ue("aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21vL21haW4vQ29uZmlnL01paG9tb19saXRlLnlhbWw="),Nn=ue("aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21vL3JlZnMvaGVhZHMvbWFpbi9Db25maWcvc2luZ2JveF8xLjExLlguanNvbg=="),Ln=ue("aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21vL3JlZnMvaGVhZHMvbWFpbi9Db25maWcvc2luZ2JveC0xLjEyLlguanNvbg=="),On=ue("aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21vL3JlZnMvaGVhZHMvbWFpbi9Db25maWcvc2luZ2JveC0xLjEyLlguYWxwaGEuanNvbg=="),En=ue("aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21vL3JlZnMvaGVhZHMvbWFpbi9Db25maWcvc2luZ2JveC0xLjEzLlguanNvbg=="),Cn=ue("6JCMSUNQ5aSHMjAyNTAwMDHlj7c="),In=ue("aHR0cHM6Ly90Lm1lL01hcmlzYV9rcmlzdGk=");function ue(s){let e=atob(s),t=Uint8Array.from(e,n=>n.charCodeAt(0));return new TextDecoder("utf-8").decode(t)}function Ke(s,e,t){let n=new URLSearchParams({target:t,url:s,emoji:"true",list:"true",new_name:"true"});return`${e}/sub?${n}`}async function oe(s,e){e||(e="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3");let t;try{t=await fetch(s,{method:"GET",headers:{"User-Agent":e}})}catch{return!0}let n=Object.fromEntries(t.headers.entries()),i=Ai(t.headers);i&&(n["content-disposition"]=i);let o=await t.text(),r;try{r=ks.parse(o,{maxAliasCount:-1,merge:!0})}catch{try{r=JSON.parse(o)}catch{r=o}}return{status:t.status,headers:n,data:r}}function Ft(s){let e=[],t="";for(let n of s)n.startsWith("http://")||n.startsWith("https://")?e.push(n):(t&&(t+="|"),t+=n);return t&&e.push(t),e}async function Ut(s){return await oe(s)}async function Gt(s){if(!s)throw new Error("\u7F3A\u5C11\u89C4\u5219\u6A21\u677F");return await oe(s)}function Tn(s="",e=""){let t={mihomo:[{label:"\u901A\u7528",options:[{label:"\u9ED8\u8BA4(\u7CBE\u7B80\u7248) (\u4EC5\u56FD\u5185\u5916\u5206\u6D41) (\u4E0EGithub\u540C\u6B65) ",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_default.yaml"},{label:"\u9ED8\u8BA4(\u7CBE\u7B80\u7248) (\u4EC5\u56FD\u5185\u5916\u5206\u6D41) (\u65E0\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65) ",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_default_NoAds.yaml"},{label:"\u9ED8\u8BA4(mihomo\u5B98\u65B9\u7248) (\u4E0EGithub\u540C\u6B65) ",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_official.yaml"},{label:"\u9ED8\u8BA4(mihomo\u5B98\u65B9\u7248) (\u65E0\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65) ",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_official_NoAds.yaml"},{label:"\u9ED8\u8BA4(ACL4SSR_Online_Full) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_ACL4SSR_Online_Full.yaml"},{label:"\u9ED8\u8BA4(ACL4SSR_Online_Full) (\u65E0\u53BB\u5E7F\u544AMihomo_ACL4SSR_Online_Full_NoAds.yaml) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_ACL4SSR_Online_Full_NoAds.yaml"},{label:"\u9ED8\u8BA4(\u5168\u5206\u7EC4) (\u4E0EGithub\u540C\u6B65) ",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_default_full.yaml"},{label:"\u9ED8\u8BA4(\u5168\u5206\u7EC4) (\u65E0\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65) ",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_default_full_NoAds.yaml"}]},{label:"Lanlan13-14",options:[{label:"configfull \u5168\u5206\u7EC4\u7248 (\u79CB\u98CE\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull.yaml"},{label:"configfull_NoAd \u5168\u5206\u7EC4\u7248 (\u65E0\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull_NoAd.yaml"},{label:"configfull_NoAd_lite \u5168\u5206\u7EC4\u7248 (\u65E0\u53BB\u5E7F\u544A) (\u7CBE\u7B80\u7248) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull_NoAd_lite.yaml"},{label:"configfull_lite \u5168\u5206\u7EC4\u7248 (\u7CBE\u7B80\u7248) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull_lite.yaml"}]},{label:"zhuqq2020",options:[{label:"ACL4SSR_Online_Full \u5168\u5305\u91CD\u5EA6\u7528\u6237\u4F7F\u7528(\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Full.yaml"},{label:"ACL4SSR_Online_Full_AdblockPlus \u5168\u5305\u91CD\u5EA6\u7528\u6237\u4F7F\u7528\u66F4\u591A\u53BB\u5E7F\u544A(\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Full_AdblockPlus.yaml"},{label:"ACL4SSR_Online_Full_Tiktok \u5168\u5305\u91CD\u5EA6\u7528\u6237\u4F7F\u7528\u6296\u97F3\u5168\u91CF(\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Full_Tiktok.yaml"},{label:"ACL4SSR_Online_Full_WithIcon \u5168\u5305\u91CD\u5EA6\u7528\u6237\u4F7F\u7528(\u4E0EGithub\u540C\u6B65)(\u65E0\u56FE\u6807)",value:"https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Full_WithIcon.yaml"},{label:"ACL4SSR_Online_Mini_MultiMode \u4E13\u4E1A\u7248\u81EA\u52A8\u6D4B\u901F\u3001\u6545\u969C\u8F6C\u79FB\u3001\u8D1F\u8F7D\u5747\u8861(\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Mini_MultiMode.yaml"},{label:"\u6781\u7B80\u5206\u6D41\u89C4\u5219",value:"https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/\u6781\u7B80\u5206\u6D41\u89C4\u5219.yaml"}]},{label:"mihomo-party-org",options:[{label:"\u5E03\u4E01\u72D7\u7684\u8BA2\u9605\u8F6C\u6362 (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/mihomo-party-org/override-hub/main/yaml/%E5%B8%83%E4%B8%81%E7%8B%97%E7%9A%84%E8%AE%A2%E9%98%85%E8%BD%AC%E6%8D%A2.yaml"},{label:"ACL4SSR_Online_Full (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/mihomo-party-org/override-hub/main/yaml/ACL4SSR_Online_Full.yaml"},{label:"ACL4SSR_Online_Full_WithIcon (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/mihomo-party-org/override-hub/main/yaml/ACL4SSR_Online_Full_WithIcon.yaml"}]}],singbox:[{label:"\u901A\u7528",options:[{label:"\u9ED8\u8BA4(\u7CBE\u7B80\u7248) (\u4E0EGithub\u540C\u6B65) ",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default.yaml"},{label:"\u9ED8\u8BA4(\u7CBE\u7B80\u7248) (\u65E0\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65) ",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default_NoAds.yaml"},{label:"\u9ED8\u8BA4(mini\u7248) (\u4E0EGithub\u540C\u6B65) ",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default_mini.yaml"},{label:"\u9ED8\u8BA4(mini\u7248) (\u65E0\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65) ",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default_mini_NoAds.yaml"},{label:"\u9ED8\u8BA4(\u5168\u5206\u7EC4) (\u4E0EGithub\u540C\u6B65) ",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default_full.yaml"},{label:"\u9ED8\u8BA4(\u5168\u5206\u7EC4) (\u65E0\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65) ",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default_full_NoAds.yaml"},{label:"DustinWin \u5168\u5206\u7EC4\u7248 (\u4E0EGithub\u540C\u6B65) ",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_DustinWin_full.yaml"},{label:"DustinWin \u5168\u5206\u7EC4\u7248 (\u65E0\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65) ",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_DustinWin_full_NoAds.yaml"}]}]};return s&&t.mihomo[0].options.unshift({label:"\u81EA\u5B9A\u4E49\u89C4\u5219",value:s}),e&&t.singbox[0].options.unshift({label:"\u81EA\u5B9A\u4E49\u89C4\u5219",value:e}),JSON.stringify(t)}function Mn(s,e){let t={mihomo:{name:"Clash (mihomo)",placeholder:"\u8BF7\u8F93\u5165clash\u8BA2\u9605\u5730\u5740url\uFF0C\u652F\u6301\u5404\u79CD\u8BA2\u9605\u6216\u5355\u8282\u70B9\u94FE\u63A5",tipText:`
## mihomo \u4F7F\u7528\u63D0\u793A\uFF1A

- \u652F\u6301\u5404\u79CD\u8BA2\u9605\u6216\u5355\u8282\u70B9\u94FE\u63A5\uFF0C\u81EA\u52A8\u5408\u5E76\u751F\u6210\u914D\u7F6E
- \u9762\u677F\u5730\u5740: http://127.0.0.1:9090/ui/xd
- mixed(http/socks) \u7AEF\u53E3: 7890
- \u4F7F\u7528 sub-store \u540E\u7AEF\u8F6C\u6362
- \u9002\u7528\u4E8E mihomo \u5BA2\u6237\u7AEF
- \u53BB\u5E7F\u544A\u4F7F\u7528 [\u79CB\u98CE\u5E7F\u544A\u89C4\u5219](https://github.com/TG-Twilight/AWAvenue-Ads-Rule.git)
- \u9632\u6B62 DNS \u6CC4\u6F0F(\u5B89\u5168DNS/DoH)
- \u5C4F\u853D WebRTC \u6CC4\u6F0F(\u9632\u6B62\u771F\u5B9EIP\u66B4\u9732)
- \u5173\u95ED\u6240\u6709\u8986\u5199\u529F\u80FD(\u4E0D\u662F\u5173\u95ED\u529F\u80FD\uFF0C\u662F\u5173\u95ED\u8986\u5199)\u4EE5\u786E\u4FDD\u914D\u7F6E\u6B63\u5E38\u751F\u6548

## \u9644\u52A0\u53C2\u6570\u8BF4\u660E

- UDP : \u542F\u7528 UDP \u4EE3\u7406\u6D41\u91CF [\u67E5\u770B\u8BE6\u60C5](https://wiki.metacubex.one/config/proxies/#udp)
- \u5206\u5E94\u7528\u4EE3\u7406: \u6392\u9664 CN \u5E94\u7528(\u4EC5\u5305\u542Bandroid\u5E94\u7528)\u4E0D\u5165\u4EE3\u7406\u5DE5\u5177 [\u67E5\u770B\u8BE6\u60C5](https://wiki.metacubex.one/config/inbound/tun/#exclude-package)
- \u5206IPCIDR\u4EE3\u7406: \u6392\u9664 CN IP \u4E0D\u8FDB\u5165\u4EE3\u7406\u5DE5\u5177 [\u67E5\u770B\u8BE6\u60C5](https://wiki.metacubex.one/config/inbound/tun/#route-exclude-address)
- \u53BB\u5E7F\u544Adns: \u76F4\u8FDE\u4F7F\u7528 [dns.18bit.cn](https://www.18bit.cn), \u4EE3\u7406\u4F7F\u7528 [dns.adguard-dns.com](https://adguard-dns.io/)
- \u4EC5\u4EE3\u7406: \u5173\u95ED VPN \u4EE3\u7406\uFF0C\u4F7F\u7528 mixed(http/socks) \u7AEF\u53E3\u8FDB\u884C\u4EE3\u7406\u3002\u5B9E\u9645\u5C31\u662F\u5173\u95ED\u4E86 tun \u5165\u7AD9

## \u914D\u7F6E\u4FE1\u606F

**userAgent** ${e}

**\u8F6C\u6362\u540E\u7AEF** ${s}
                `,protocolOptions:[{value:"udp",label:"\u542F\u7528 UDP",checked:!0},{value:"ep",label:"\u542F\u7528 \u5206\u5E94\u7528\u4EE3\u7406(\u4EC5Android)"},{value:"ea",label:"\u542F\u7528 \u5206IPCIDR\u4EE3\u7406(ios/macOS/windows/linux \u63A8\u8350)"},{value:"adgdns",label:"\u542F\u7528 \u53BB\u5E7F\u544Adns"},{value:"tun",label:"\u542F\u7528 \u4EC5\u4EE3\u7406"}]},singbox:{name:"Singbox",placeholder:"\u8BF7\u8F93\u5165singbox\u8BA2\u9605\u5730\u5740url\uFF0C\u652F\u6301\u5404\u79CD\u8BA2\u9605\u6216\u5355\u8282\u70B9\u94FE\u63A5",tipText:`
## singbox \u4F7F\u7528\u63D0\u793A\uFF1A

- \u652F\u6301\u5404\u79CD\u8BA2\u9605\u6216\u5355\u8282\u70B9\u94FE\u63A5\uFF0C\u81EA\u52A8\u5408\u5E76\u751F\u6210\u914D\u7F6E
- \u9762\u677F\u5730\u5740: http://127.0.0.1:20123
- mixed(http/socks) \u7AEF\u53E3: 20120
- \u4F7F\u7528 sub-store \u540E\u7AEF\u8F6C\u6362
- \u9002\u7528\u4E8E sing-box \u5BA2\u6237\u7AEF
- \u652F\u6301 1.11.x
- \u652F\u6301 1.12.x
- \u652F\u6301 1.13.x
- \u53BB\u5E7F\u544A\u4F7F\u7528 [\u79CB\u98CE\u5E7F\u544A\u89C4\u5219](https://github.com/TG-Twilight/AWAvenue-Ads-Rule.git)
- \u9632\u6B62 DNS \u6CC4\u6F0F(\u5B89\u5168DNS/DoH)
- \u5C4F\u853D WebRTC \u6CC4\u6F0F(\u9632\u6B62\u771F\u5B9EIP\u66B4\u9732)
- \u5173\u95ED\u6240\u6709\u8986\u5199\u529F\u80FD(\u4E0D\u662F\u5173\u95ED\u529F\u80FD\uFF0C\u662F\u5173\u95ED\u8986\u5199)\u4EE5\u786E\u4FDD\u914D\u7F6E\u6B63\u5E38\u751F\u6548

## \u9644\u52A0\u53C2\u6570\u8BF4\u660E

- UDP: \u542F\u7528 UDP \u4EE3\u7406\u6D41\u91CF [\u67E5\u770B\u8BE6\u60C5](https://sing-box.sagernet.org/zh/configuration/route/rule_action/#udp_disable_domain_unmapping)
- UDP \u5206\u6BB5: [\u67E5\u770B\u8BE6\u60C5](https://sing-box.sagernet.org/zh/configuration/shared/dial/#udp_fragment)
- TLS \u5206\u6BB5: \u7ED5\u8FC7\u88AB\u9632\u706B\u5899\u62E6\u622A\u7684\u57DF\u540D [\u67E5\u770B\u8BE6\u60C5](https://sing-box.sagernet.org/zh/configuration/route/rule_action/#tls_fragment)
- \u5206\u5E94\u7528\u4EE3\u7406: \u6392\u9664 CN \u5E94\u7528(\u4EC5\u5305\u542Bandroid\u5E94\u7528)\u4E0D\u5165\u4EE3\u7406\u5DE5\u5177 [\u67E5\u770B\u8BE6\u60C5](https://sing-box.sagernet.org/zh/configuration/inbound/tun/#exclude_package)
- \u5206IPCIDR\u4EE3\u7406: \u6392\u9664 CN IP \u4E0D\u8FDB\u5165\u4EE3\u7406\u5DE5\u5177 [\u67E5\u770B\u8BE6\u60C5](https://sing-box.sagernet.org/zh/configuration/inbound/tun/#route_exclude_address)
- tailscale: [\u67E5\u770B\u8BE6\u60C5](https://sing-box.sagernet.org/zh/configuration/endpoint/tailscale)
- \u53BB\u5E7F\u544Adns: \u76F4\u8FDE\u4F7F\u7528 [dns.18bit.cn](https://www.18bit.cn), \u4EE3\u7406\u4F7F\u7528 [dns.adguard-dns.com](https://adguard-dns.io/)
- \u4EC5\u4EE3\u7406: \u5173\u95ED VPN \u4EE3\u7406\uFF0C\u4F7F\u7528 mixed(http/socks) \u7AEF\u53E3\u8FDB\u884C\u4EE3\u7406\u3002\u5B9E\u9645\u5C31\u662F\u5173\u95ED\u4E86 tun \u5165\u7AD9

## \u914D\u7F6E\u4FE1\u606F

**userAgent** ${e}

**\u8F6C\u6362\u540E\u7AEF** ${s}
                `,protocolOptions:[{value:"udp",label:"\u542F\u7528 UDP",checked:!0},{value:"udp_frag",label:"\u542F\u7528 UDP \u5206\u6BB5"},{value:"tls_frag",label:"\u542F\u7528 TLS \u5206\u6BB5"},{value:"ep",label:"\u542F\u7528 \u5206\u5E94\u7528\u4EE3\u7406(\u4EC5Android)"},{value:"ea",label:"\u542F\u7528 \u5206IPCIDR\u4EE3\u7406(ios/macOS/windows/linux \u63A8\u8350)"},{value:"tailscale",label:"\u542F\u7528 tailscale"},{value:"adgdns",label:"\u542F\u7528 \u53BB\u5E7F\u544Adns"},{value:"tun",label:"\u542F\u7528 \u4EC5\u4EE3\u7406"}]},v2ray:{name:"V2Ray",placeholder:"\u8BF7\u8F93\u5165V2Ray\u8BA2\u9605\u5730\u5740url, \u652F\u6301\u5404\u79CD\u8BA2\u9605\u6216\u5355\u8282\u70B9\u94FE\u63A5",tipText:`
**\u8F6C\u6362\u540E\u7AEF** ${s}
                `,protocolOptions:[],noTemplate:!0}};return JSON.stringify(t)}function Ai(s){let e=s.get("Content-Disposition")||s.get("content-disposition");if(!e)return null;let t=e.match(/filename="?([^"]+)"?/);if(!t)return null;let n=t[1];if(!/[^\x00-\x7F]/.test(n))return e;let o="download.json",r=encodeURIComponent(n);return`attachment; filename="${o}"; filename*=UTF-8''${r}`}async function Vt(){let s=new Set,e=["https://github.com/mnixry/direct-android-ruleset/raw/refs/heads/rules/@Merged/GAME.mutated.yaml","https://github.com/mnixry/direct-android-ruleset/raw/refs/heads/rules/@Merged/APP.mutated.yaml"],t=["\u6D4F\u89C8\u5668"],n=new Set(["com.android.chrome"]);for(let i of e){let o=await fetch(i,{headers:{"user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}});if(!o.ok){console.error(`\u274C \u8BF7\u6C42\u5931\u8D25: ${i} - ${o.status} ${o.statusText}`);continue}let r=await o.text();for(let a of r.split(`
`)){let l=a.match(/PROCESS-NAME\s*,\s*([^\s,]+)/);if(l){let c=l[1];!t.some(u=>a.includes(u))&&!n.has(c)&&s.add(c)}}}return[...s]}async function Yt(){let s=["https://raw.githubusercontent.com/Kwisma/clash-rules/release/cncidr.yaml"],e=[];for(let t of s){let n=await fetch(t,{headers:{"user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}});if(!n.ok){console.error(`\u274C \u8BF7\u6C42\u5931\u8D25: ${t} - ${n.status} ${n.statusText}`);continue}let i=await n.text(),o=ks.parse(i,{maxAliasCount:-1,merge:!0});Array.isArray(o.payload)&&e.push(...o.payload)}return e}async function xs(s){return s.urls.length===1?await _i(s):await Ni(s)}async function _i(s){let e=await $n(s.urls[0],s.userAgent,s.sub);return e?.data?.proxies&&Array.isArray(e.data.proxies)&&e.data.proxies.length>0?(Pn(e.data.proxies,s.udp),Li(e,{providers:{}})):null}async function Ni(s){let e={proxies:[],providers:{}},t=[];for(let o=0;o<s.urls.length;o++){let r=await $n(s.urls[o],s.userAgent,s.sub);r?.data?.proxies&&Array.isArray(r.data.proxies)&&(Pn(r.data.proxies,s.udp,o+1),t.push({status:r.status,headers:r.headers}),e.proxies.push(...r.data.proxies))}if(t.length===0)return null;let n=Math.floor(Math.random()*t.length),i=t[n];return{status:i.status,headers:i.headers,data:e}}async function $n(s,e,t){let n=await oe(s,e);if(n?.data?.proxies&&Array.isArray(n.data.proxies)&&n.data.proxies.length>0)return n;let i=Ke(s,t,"clash.meta");return await oe(i,e)}function Pn(s,e,t=null){s.forEach(n=>{t!==null&&(n.name=`${n.name} [${t}]`),e&&(n.udp=!0)})}function Li(s,e={}){return{status:s.status,headers:s.headers,data:{...s.data,...e}}}async function Dn(s){if(!/meta|clash.meta|clash|clashverge|mihomo/i.test(s.userAgent))throw new Error("\u4E0D\u652F\u6301\u7684\u5BA2\u6237\u7AEF");s.urls=Ft(s.urls);let[e,t,n,i,o]=await Promise.all([Ut(s.Mihomo_default),Gt(s.rule),xs(s),s.exclude_package?Vt():null,s.exclude_address?Yt():null]);if(s.Exclude_Package=i,s.Exclude_Address=o,!n?.data?.proxies||n?.data?.proxies?.length===0)throw new Error("\u8282\u70B9\u4E3A\u7A7A");return t.data.proxies=[...t?.data?.proxies||[],...n?.data?.proxies],t.data["proxy-groups"]=Ei(n.data,t.data),t.data["proxy-providers"]=n?.data?.providers,Oi(e.data,t.data,s),{status:n.status,headers:n.headers,data:JSON.stringify(e.data,null,4)}}function Oi(s,e,t){s["proxy-providers"]=e["proxy-providers"]||{},s.proxies=e.proxies||[],s["proxy-groups"]=e["proxy-groups"]||[],s.rules=e.rules||[],s["sub-rules"]=e["sub-rules"]||{},s["rule-providers"]={...s["rule-providers"]||{},...e["rule-providers"]||{}},t.tun&&s.tun?s.tun.enable=!1:s.tun&&(t.exclude_address&&t.Exclude_Address&&(s.tun["route-address"]=["0.0.0.0/1","128.0.0.0/1","::/1","8000::/1"],s.tun["route-exclude-address"]=t.Exclude_Address||[]),t.exclude_package&&t.Exclude_Package&&(s.tun["include-package"]=[],s.tun["exclude-package"]=t.Exclude_Package||[])),t.adgdns&&(s.dns.nameserver=["https://dns.adguard-dns.com/dns-query"],s.dns["nameserver-policy"]["RULE-SET:private_domain,cn_domain"]=["quic://dns.18bit.cn"])}function Ei(s,e){let t=[],n=e["proxy-groups"].filter(i=>{let o=!1,r=i.filter;if(typeof r!="string")return!0;let a=/\(\?i\)/i.test(r),l=r.replace(/\(\?i\)/gi,""),c;try{c=new RegExp(l,a?"i":"")}catch(p){return console.warn(`\u65E0\u6548\u7684\u6B63\u5219\u8868\u8FBE\u5F0F: ${r}`,p),!0}for(let p of s.proxies)if(c.test(p.name)){o=!0;break}return!o&&(!i.proxies||i.proxies.length===0)?(t.push(i.name),!1):!0});return n.forEach(i=>{i.proxies&&(i.proxies=i.proxies.filter(o=>!t.some(r=>r.includes(o))))}),n}async function vs(s){return s.urls.length===1?await Ci(s.urls[0],s):await Ii(s)}async function Ci(s,e){let t=await Bn(s,e,!1);return t?.data?.outbounds?.length>0?(jn(t.data.outbounds,e,0),Ti(t)):null}async function Ii(s){let e=[],t=[];for(let i=0;i<s.urls.length;i++){let o=await Bn(s.urls[i],s,!0,i+1);o?.data?.outbounds?.length>0&&(jn(o.data.outbounds,s,i+1),t.push(o),e.push(o.data.outbounds))}if(t.length===0)throw new Error("No valid outbounds found from any URL");let n=t[Math.floor(Math.random()*t.length)];return{status:n.status,headers:n.headers,data:{outbounds:e.flat()}}}async function Bn(s,e,t,n=null){let i=await oe(s,e.userAgent);if(Rn(i))return i;let o=Ke(s,e.sub,"singbox");return i=await oe(o,e.userAgent),Rn(i)?i:null}function Rn(s){return s?.data?.outbounds&&Array.isArray(s.data.outbounds)}function jn(s,e,t){s.forEach(n=>{t>0&&(n.tag=`${n.tag} [${t}]`),e.udp_fragment&&(n.udp_fragment=!0)})}function Ti(s){return{status:s.status,headers:s.headers,data:s.data}}async function Kn(s){let e=Mi(s);s.urls=Ft(s.urls);let[t,n,i,o,r]=await Promise.all([Ut(e),Gt(s.rule),vs(s),s.exclude_package?Vt():null,s.exclude_address?Yt():null]);if(s.Exclude_Package=o,s.Exclude_Address=r,!i?.data?.outbounds||i?.data?.outbounds?.length===0)throw new Error("\u8282\u70B9\u4E3A\u7A7A\uFF0C\u8BF7\u4F7F\u7528\u6709\u6548\u8BA2\u9605");i.data.outbounds=$i(i.data);let a=[];return i.data.outbounds.forEach(l=>{a.push(l.tag)}),n.data.outbounds=Pi(n.data.outbounds,a),n.data.outbounds.push(...i.data.outbounds),Di(t.data,n.data,s),{status:i.status,headers:i.headers,data:JSON.stringify(t.data,null,4)}}function Mi(s){let e,t=!1,n=s.userAgent.match(/1\.12\.0\-alpha\.(\d{1,2})\b/),i=s.userAgent.match(/1\.12\.0\-beta\.(\d{1,2})\b/),o=s.userAgent.match(/1\.11\.(\d+)/),r=s.userAgent.match(/1\.12\.(\d+)/),a=s.userAgent.match(/1\.13\.(\d+)/);if(!/singbox|sing-box|sfa/i.test(s.userAgent))throw new Error("\u4E0D\u652F\u6301\u7684\u5BA2\u6237\u7AEF");if(n&&!t){let l=parseInt(n[1],10);l>=0&&l<=23&&(e=s.singbox_1_12_alpha,t=!0)}if(i&&!t){let l=parseInt(i[1],10);l>=0&&l<=9&&(e=s.singbox_1_11,s.tailscale=!1,s.tls_fragment=!1,t=!0)}if(o&&!t&&(e=s.singbox_1_11,s.tailscale=!1,s.tls_fragment=!1,t=!0),r&&!t&&(e=s.singbox_1_12,t=!0),a&&!t&&(e=s.singbox_1_13,t=!0),!t)throw new Error(`\u4E0D\u652F\u6301\u7684 Singbox \u7248\u672C\uFF1A${s.userAgent}`);return e}function $i(s){let e=["direct","block","dns","selector","urltest"];if(s&&Array.isArray(s.outbounds))return s.outbounds.filter(n=>!(e.includes(n.type)||n?.server===""||n?.server_port<1||n?.password===""))}function Pi(s,e){let t=l=>{let c=[],p=!1;return l.filter?.forEach(u=>{if(u.action!=="all"&&(!u.keywords||typeof u.keywords!="string"))return;let f=[];if(u.action==="all")f=e,p=!0;else{let{pattern:h,ignoreCase:g}=n(u.keywords),d=new RegExp(h,g?"i":"");f=i(e,d,u.action),p=!0}f.length>0&&(c=[...c,...f])}),{matchedOutbounds:[...new Set(c)],hasValidAction:p}},n=l=>{if(!l||typeof l!="string")return{pattern:"^$",ignoreCase:!1};let c=/\(\?i\)/i.test(l);return{pattern:l.replace(/\(\?i\)/gi,""),ignoreCase:c}},i=(l,c,p)=>{switch(p){case"include":return l.filter(u=>c.test(u));case"exclude":return l.filter(u=>!c.test(u));default:return[]}},o=(l,c,p)=>(c.length>0?l.outbounds=l.outbounds?[...new Set([...l.outbounds,...c])]:c:l.outbounds&&l.outbounds.length>0||delete l.outbounds,delete l.filter,l),r=l=>{let c=l.filter(u=>!u.outbounds||Array.isArray(u.outbounds)&&u.outbounds.length===0).map(u=>u.tag).filter(u=>u!==void 0);return l.map(u=>(u.outbounds&&Array.isArray(u.outbounds)&&(u.outbounds=u.outbounds.filter(f=>!c.includes(f))),u)).filter(u=>u.outbounds&&Array.isArray(u.outbounds)&&u.outbounds.length>0)},a=s.map(l=>{let{matchedOutbounds:c,hasValidAction:p}=t(l);return o(l,c,p)});return r(a)}function Di(s,e,t){let n=Array.isArray(s.route.rule_set)?s.route.rule_set:[],i=Array.isArray(e.route.rule_set)?e.route.rule_set:[],o=new Map;for(let r of n)r?.tag&&o.set(r.tag,r);for(let r of i)r?.tag&&o.set(r.tag,r);if(s.inbounds=e?.inbounds||s.inbounds,s.outbounds=[...Array.isArray(s.outbounds)?s.outbounds:[],...Array.isArray(e?.outbounds)?e.outbounds:[]],s.route.final=e?.route?.final||s.route.final,s.route.rules=[...Array.isArray(s.route.rules)?s.route.rules:[],...Array.isArray(e?.route?.rules)?e.route.rules:[]],s.route.rule_set=Array.from(o.values()),t.tun?s.inbounds=s.inbounds.filter(r=>r.type!=="tun"):(t.exclude_package&&Ri(s,t.Exclude_Package),t.exclude_address&&Bi(s,t.Exclude_Address)),t.tailscale&&(s.dns.servers.push({type:"tailscale",endpoint:"ts-ep",accept_default_resolvers:!0}),s.endpoints=s.endpoints||[],s.endpoints.push({type:"tailscale",tag:"ts-ep",auth_key:"",hostname:"singbox-tailscale",udp_timeout:"5m"})),/ref1nd/i.test(t.userAgent))for(let r of s.route.rules)r.action==="resolve"&&(r.match_only=!0);s.route.rules=s.route.rules.flatMap(r=>r.action==="route-options"?(t.udp&&(r.udp_disable_domain_unmapping=!0,r.udp_connect=!0,r.udp_timeout="5m"),t.tls_fragment&&(r.tls_fragment=!0,r.tls_fragment_fallback_delay="5m"),t.udp||t.tls_fragment?r:[]):r),t.adgdns&&s.dns.servers.flatMap(r=>(r.tag==="DIRECT-DNS"&&(r={type:"quic",tag:"DIRECT-DNS",detour:"\u{1F3AF} \u5168\u7403\u76F4\u8FDE",server_port:853,server:"dns.18bit.cn",domain_resolver:"local"}),r.tag==="PROXY-DNS"&&(r={type:"https",tag:"PROXY-DNS",detour:"\u{1F680} \u8282\u70B9\u9009\u62E9",server_port:443,server:"dns.adguard-dns.com",domain_resolver:"local"}),r))}function Ri(s,e){for(let t of s.inbounds)t.type==="tun"&&(Array.isArray(t.exclude_package)||(t.exclude_package=[]),t.exclude_package=Array.from(new Set([...t.exclude_package||[],...e])))}function Bi(s,e){for(let t of s.inbounds)t.type==="tun"&&(t.route_address=["0.0.0.0/1","128.0.0.0/1","::/1","8000::/1"],Array.isArray(t.route_exclude_address)||(t.route_exclude_address=[]),t.route_exclude_address=Array.from(new Set([...t.route_exclude_address||[],...e])))}async function qn(s){let e=Ke(s.urls.join(","),s.sub,"v2ray"),t=await oe(e,s.userAgent);if(t.data!==void 0&&t.data!==null&&t.data!=="")return{status:t.status,headers:t.headers,data:t.data};throw new Error("\u83B7\u53D6\u8BA2\u9605\u6570\u636E\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u8BA2\u9605\u94FE\u63A5\u662F\u5426\u6709\u6548")}var ji=s=>`
        :root {
            --primary-color: #4361ee;
            --primary-light: #4895ef;
            --primary-dark: #3f37c9;
            --secondary-color: #4cc9f0;
            --bg-color: #f8f9fa;
            --card-bg: #ffffff;
            --text-primary: #2b2d42;
            --text-secondary: #6c757d;
            --border-color: #e9ecef;
            --success-color: #4cc9f0;
            --error-color: #f72585;
            --warning-color: #f9c74f;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-image: url(${s.IMG});
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            background-color: var(--bg-color);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--text-primary);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            padding: 20px;
            align-items: center;
            position: relative; 
        }

        .container {
            position: relative;
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            max-width: 600px;
            width: 100%;
            padding: 1.5rem;
            border-radius: 24px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08),
                inset 0 0 0 1px rgba(255, 255, 255, 0.5);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            z-index: 1;
            margin-top: 40px;
        }

        .container:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12),
                inset 0 0 0 1px rgba(255, 255, 255, 0.8);
        }

        h1 {
            text-align: center;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .input-group {
            margin-bottom: 0.5rem;
        }

        .link-input {
            flex: 1;
            min-width: 0;
            margin-top: 0;
            padding: 12px 16px;
            border: 2px solid var(--border-color);
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
            background-color: white;
        }

        .link-row {
            display: flex;
            align-items: center;
            position: relative;
            margin-bottom: 12px;
            gap: 12px;
        }

        .add-btn {
            flex-shrink: 0;
            width: 42px;
            height: 42px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            color: white;
            box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
            border: none;
            font-size: 1.2rem;
        }

        .add-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(67, 97, 238, 0.4);
        }

        label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--text-secondary);
            font-weight: 500;
            font-size: 0.95rem;
        }

        input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid var(--border-color);
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
            background-color: white;
        }

        input:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15),
                inset 0 2px 4px rgba(0, 0, 0, 0.03);
        }

        button {
            width: 100%;
            padding: 14px 24px;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 0.5rem;
            position: relative;
            overflow: hidden;
            box-shadow: 0 6px 16px rgba(67, 97, 238, 0.3);
        }

        button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: all 0.6s ease;
        }

        button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(67, 97, 238, 0.4);
        }

        button:hover::before {
            left: 100%;
        }

        button:active {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
        }

        #result {
            background-color: #f8f9fa;
            font-family: monospace;
            word-break: break-all;
            padding: 14px 16px !important;
            border: 2px solid var(--border-color);
            border-radius: 12px;
            position: relative;
            transition: all 0.3s ease;
        }

        #result:hover {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
        }

        .github-corner {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1000; /* \u786E\u4FDD GitHub \u89D2\u6807\u59CB\u7EC8\u5728\u6700\u4E0A\u5C42 */
        }

        .github-corner svg {
            fill: var(--primary-color);
            color: var(--card-bg);
            position: absolute;
            top: 0;
            right: 0;
            border: 0;
            width: 80px;
            height: 80px;
            transition: transform 0.3s ease;
        }

        .github-corner:hover svg {
            transform: scale(1.1);
        }

        .github-corner:hover .octo-arm {
            animation: octocat-wave 560ms ease-in-out;
        }

        @keyframes octocat-wave {
            0%, 100% { transform: rotate(0); }
            20%, 60% { transform: rotate(-25deg); }
            40%, 80% { transform: rotate(10deg); }
        }

        .logo-title {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 0.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--border-color);
        }

        .beian-info {
            text-align: center;
            font-size: 13px;
            color: var(--text-secondary);
            margin-top: 0.5rem;
            padding-top: 0.5rem;
            border-top: 1px solid var(--border-color);
        }

        .beian-info a {
            color: var(--primary-color);
            text-decoration: none;
            border-bottom: 1px dashed var(--primary-color);
            padding-bottom: 2px;
            transition: all 0.3s ease;
        }

        .beian-info a:hover {
            border-bottom-style: solid;
            color: var(--primary-dark);
        }

        #qrcode {
            display: none;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
            padding: 15px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        #qrcode.show {
            display: flex; /* \u6709\u5185\u5BB9\u65F6\u663E\u793A */
        }
        
        .template-selector {
            position: relative;
            margin-bottom: 0.5rem;
        }
        
        .template-toggle {
            padding: 14px 16px;
            background-color: rgba(67, 97, 238, 0.08);
            font-weight: 600;
            cursor: pointer;
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        
        .template-toggle:hover {
            background-color: rgba(67, 97, 238, 0.15);
            border-color: rgba(67, 97, 238, 0.2);
        }
        
        .template-toggle:after {
            content: "\u25B6";
            font-size: 12px;
            transition: transform 0.3s ease;
            margin-left: 8px;
        }
        
        .template-toggle.collapsed:after {
            transform: rotate(90deg);
        }
        
        .template-options {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            z-index: 1000;
            background-color: white;
            border-radius: 0 0 12px 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            display: none;
            max-height: 250px;
            overflow-y: auto;
            border: 2px solid var(--border-color);
            border-top: none;
            transition: all 0.3s ease;
        }
        
        .template-options.show {
            display: block;
            animation: slideDown 0.3s ease-out;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .template-option {
            padding: 12px 20px;
            cursor: pointer;
            transition: all 0.2s ease;
            border-bottom: 1px solid var(--border-color);
            font-size: 0.95rem;
        }
        
        .template-option:last-child {
            border-bottom: none;
        }
        
        .template-option:hover {
            background-color: rgba(67, 97, 238, 0.1);
            padding-left: 24px;
        }
        
        .template-option.selected {
            background-color: rgba(67, 97, 238, 0.15);
            font-weight: 600;
            color: var(--primary-dark);
        }

        .config-toggle {
            display: flex;
            justify-content: center;
            margin-bottom: 0.5rem;
            background: rgba(67, 97, 238, 0.08);
            border-radius: 12px;
            padding: 6px;
            border: 2px solid transparent;
        }

        .toggle-option {
            padding: 10px 20px;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            text-align: center;
            flex: 1;
            position: relative;
            overflow: hidden;
            font-size: 0.95rem;
        }

        .toggle-option.active {
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            color: white;
            box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
        }

        .toggle-option:not(.active):hover {
            background-color: rgba(67, 97, 238, 0.15);
            transform: translateY(-1px);
        }

        .mode-options {
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .mode-options.active {
            display: block;
            opacity: 1;
            animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .tip-icon {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            font-weight: bold;
            font-size: 12px;
            cursor: pointer;
            user-select: none;
            transition: all 0.3s ease;
            box-shadow: 0 2px 6px rgba(67, 97, 238, 0.3);
        }

        .tip-icon:hover {
            transform: scale(1.1);
            box-shadow: 0 3px 8px rgba(67, 97, 238, 0.4);
        }

        .tip-wrapper {
            position: relative;
            display: inline-block;
        }

        .tip-panel {
            opacity: 0;
            visibility: hidden;
            position: absolute;
            top: 28px;
            left: 0;
            min-width: 280px;
            max-width: 340px;
            max-height: 50vh;
            background: white;
            color: var(--text-primary);
            font-size: 14px;
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            white-space: normal;
            line-height: 1.6;
            overflow-y: auto;
            overflow-x: hidden;
            word-break: break-word;
            transition: all 0.3s ease;
            border: 2px solid var(--border-color);
        }

        .tip-panel::before {
            content: '';
            position: absolute;
            top: -10px;
            left: 10px;
            width: 20px;
            height: 20px;
            background: white;
            transform: rotate(45deg);
            border-top: 2px solid var(--border-color);
            border-left: 2px solid var(--border-color);
        }

        .tip-panel ul {
            margin: 8px 0;
            padding-left: 20px;
            list-style-type: disc;
        }

        .tip-panel li {
            margin-bottom: 6px;
        }

        .tip-panel strong, .tip-panel b {
            font-weight: bold;
            color: var(--primary-color);
            display: block;
            margin-top: 10px;
        }

        .tip-wrapper.active .tip-panel {
            opacity: 1;
            visibility: visible;
        }

        .protocol-options {
            display: flex;
            gap: 1px;
            margin-top: 12px;
            flex-wrap: wrap;
        }

        .protocol-checkbox {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            user-select: none;
            transition: all 0.3s ease;
            padding: 8px 12px;
            border-radius: 8px;
        }

        .protocol-checkbox:hover {
            background-color: rgba(67, 97, 238, 0.08);
        }

        .protocol-checkbox input {
            width: auto;
            margin: 0;
            cursor: pointer;
        }

        /* \u54CD\u5E94\u5F0F\u8BBE\u8BA1 */
        @media (max-width: 768px) {
            .container {
                padding: 1.5rem;
                margin: 10px;
                border-radius: 20px;
            }
            
            h1 {
                font-size: 1.8rem;
            }
            
            .toggle-option {
                padding: 8px 12px;
                font-size: 0.9rem;
            }
            
            .protocol-options {
                gap: 1px;
            }
        }

        @media (max-width: 480px) {
            body {
                padding: 10px;
            }
            
            .container {
                padding: 1.5rem;
                border-radius: 16px;
            }
            
            h1 {
                font-size: 1.6rem;
            }
            
            .link-input {
                padding: 10px 12px;
                font-size: 0.9rem;
            }
            
            .add-btn {
                width: 38px;
                height: 38px;
                font-size: 1rem;
            }
            
            button {
                padding: 12px 20px;
                font-size: 0.95rem;
            }
        }
`,Fn=ji;async function Un(s){return`
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="https://cdn.jsdelivr.net/gh/Kwisma/cf-worker-mihomo@main/favicon.png">
    <title>\u914D\u7F6E\u8F6C\u6362\u5DE5\u5177</title>
    <style>${Fn(s)}</style>
    <script src="https://cdn.jsdelivr.net/npm/@keeex/qrcodejs-kx@1.0.2/qrcode.min.js"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.5/dist/purify.min.js"><\/script>
</head>

<body>
    <a href="${atob("aHR0cHM6Ly9naXRodWIuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21v")}" target="_blank" class="github-corner"
        aria-label="View source on Github">
        <svg viewBox="0 0 250 250" aria-hidden="true">
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
            <path
                d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
            <path
                d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                fill="currentColor" class="octo-body"></path>
        </svg>
    </a>
    <div class="container">
        <div class="logo-title">
            <h1>\u914D\u7F6E\u8F6C\u6362\u5DE5\u5177</h1>
        </div>
        <div class="config-toggle" id="mode-toggle">
            <!-- \u6A21\u5F0F\u5207\u6362\u6309\u94AE\u5C06\u901A\u8FC7JavaScript\u52A8\u6001\u751F\u6210 -->
        </div>
        
        <div id="mode-containers">
            <!-- \u5404\u6A21\u5F0F\u5BB9\u5668\u5C06\u901A\u8FC7JavaScript\u52A8\u6001\u751F\u6210 -->
        </div>

        <div class="input-group">
            <div style="display: flex; flex-direction: column; align-items: flex-start;">
                <label for="result">\u8BA2\u9605\u5730\u5740\uFF1A</label>
            </div>
            <input type="text" id="result" readonly onclick="copyToClipboard()">
            <label id="qrcode" style="margin: 15px 10px -15px 10px;"></label>
        </div>
        <div class="beian-info" style="text-align: center; font-size: 13px;">
            <a href='${s.beianurl}'>${s.beian}</a>
        </div>
    </div>

    <script>
        // \u914D\u7F6E\u6A21\u5F0F\u5B9A\u4E49
        const MODES = ${s.modes};

        // \u5F53\u524D\u6FC0\u6D3B\u7684\u6A21\u5F0F
        let activeMode = 'mihomo';
        
        // \u521D\u59CB\u5316\u5E94\u7528
        document.addEventListener('DOMContentLoaded', function () {
            initModeToggle();
            initModeContainers();
            setActiveMode(activeMode);
            
            // \u521D\u59CB\u5316\u63D0\u793A\u7CFB\u7EDF
            initTipSystem();
            
            // \u521D\u59CB\u5316\u6A21\u677F\u9009\u62E9\u5668
            initAllTemplateSelectors();
        });

        // \u521D\u59CB\u5316\u6A21\u5F0F\u5207\u6362\u6309\u94AE
        function initModeToggle() {
            const modeToggle = document.getElementById('mode-toggle');
            
            for (const [modeId, modeConfig] of Object.entries(MODES)) {
                const option = document.createElement('div');
                option.className = 'toggle-option';
                option.dataset.mode = modeId;
                option.textContent = modeConfig.name;
                
                option.addEventListener('click', function() {
                    setActiveMode(modeId);
                });
                
                modeToggle.appendChild(option);
            }
        }

        // \u521D\u59CB\u5316\u6A21\u5F0F\u5BB9\u5668
        function initModeContainers() {
            const modeContainers = document.getElementById('mode-containers');
            const configs = ${s.configs};
            
            for (const [modeId, modeConfig] of Object.entries(MODES)) {
                const container = document.createElement('div');
                container.id = \`\${modeId}-container\`;
                container.className = 'mode-options';
                
                // \u6A21\u677F\u9009\u62E9\u5668
                if (!modeConfig.noTemplate) {
                    const templateSelector = document.createElement('div');
                    templateSelector.className = 'template-selector';
                    templateSelector.innerHTML = \`
                        <div class="template-toggle collapsed">\u9009\u62E9\u914D\u7F6E\u6A21\u677F(\u672A\u9009\u62E9)</div>
                        <div class="template-options"></div>
                    \`;
                    container.appendChild(templateSelector);
                }
                // \u8F93\u5165\u7EC4
                const inputGroup = document.createElement('div');
                inputGroup.className = 'input-group';
                
                const linkLabel = document.createElement('div');
                linkLabel.style.cssText = 'display: flex; align-items: center; gap: 6px; margin-bottom: 6px;';
                linkLabel.innerHTML = \`
                    <label for="link" style="margin: 0;">\u8BA2\u9605\u94FE\u63A5</label>
                    <div class="tip-wrapper">
                        <span class="tip-icon" data-mode="\${modeId}">!</span>
                        <div class="tip-panel"></div>
                    </div>
                \`;
                inputGroup.appendChild(linkLabel);
                
                const linkContainer = document.createElement('div');
                linkContainer.id = \`link-container-\${modeId}\`;
                linkContainer.innerHTML = \`
                    <div class="link-row">
                        <input type="text" class="link-input" placeholder="\${modeConfig.placeholder}" />
                        <div class="add-btn" onclick="addLinkInput(this, '\${modeId}')">\u2795</div>
                    </div>
                \`;
                inputGroup.appendChild(linkContainer);
                
                // \u534F\u8BAE\u9009\u9879
                if (!modeConfig.noTemplate) {
                    const protocolLabel = document.createElement('label');
                    protocolLabel.textContent = '\u9644\u52A0\u53C2\u6570\u9009\u9879';
                    inputGroup.appendChild(protocolLabel);
                    
                    const protocolOptions = document.createElement('div');
                    protocolOptions.className = 'protocol-options';
                    
                    modeConfig.protocolOptions.forEach(option => {
                        const label = document.createElement('label');
                        label.className = 'protocol-checkbox';
                        label.innerHTML = \`
                            <input type="checkbox" name="protocol" value="\${option.value}" \${option.checked ? 'checked' : ''}>
                            \${option.label}
                        \`;
                        protocolOptions.appendChild(label);
                    });
                    
                    inputGroup.appendChild(protocolOptions);
                }
                container.appendChild(inputGroup);
                
                // \u751F\u6210\u6309\u94AE
                const generateButton = document.createElement('button');
                generateButton.textContent = \`\u751F\u6210\${modeConfig.name}\u914D\u7F6E\`;
                generateButton.onclick = function() { generateConfig(modeId); copyToClipboard(); };
                container.appendChild(generateButton);
                
                modeContainers.appendChild(container);
            }
        }

        // \u8BBE\u7F6E\u6D3B\u52A8\u6A21\u5F0F
        function setActiveMode(modeId) {
            // \u66F4\u65B0\u5207\u6362\u6309\u94AE\u72B6\u6001
            document.querySelectorAll('.toggle-option').forEach(option => {
                option.classList.toggle('active', option.dataset.mode === modeId);
            });
            
            // \u66F4\u65B0\u6A21\u5F0F\u5BB9\u5668\u663E\u793A\u72B6\u6001
            document.querySelectorAll('.mode-options').forEach(container => {
                container.classList.toggle('active', container.id === \`\${modeId}-container\`);
            });
            
            // \u66F4\u65B0\u9875\u9762\u6807\u9898\u548C\u9876\u90E8\u6587\u5B57
            const modeName = MODES[modeId].name || '';
            document.title = modeName ? \`\${modeName}\u914D\u7F6E\u8F6C\u6362\u5DE5\u5177\` : '\u914D\u7F6E\u8F6C\u6362\u5DE5\u5177';
            const h1Element = document.querySelector('h1');
            if (h1Element) {
                h1Element.textContent = modeName ? \`\${modeName}\u914D\u7F6E\u8F6C\u6362\u5DE5\u5177\` : '\u914D\u7F6E\u8F6C\u6362\u5DE5\u5177';
            }
            updateResult('');
            activeMode = modeId;
        }

        // \u521D\u59CB\u5316\u63D0\u793A\u7CFB\u7EDF
        function initTipSystem() {
            // \u5F39\u7A97\u63D0\u793A
            document.querySelectorAll('.tip-icon').forEach(icon => {
                icon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    // \u5173\u95ED\u6240\u6709\u5DF2\u5C55\u5F00
                    document.querySelectorAll('.tip-wrapper').forEach(w => w.classList.remove('active'));
                    
                    const wrapper = icon.closest('.tip-wrapper');
                    wrapper.classList.toggle('active');
                    
                    const panel = wrapper.querySelector('.tip-panel');
                    const mode = icon.dataset.mode;
                    
                    // \u4F7F\u7528 marked \u6E32\u67D3 Markdown \u4E3A HTML
                    const rawMarkdown = MODES[mode].tipText || '\u6682\u65E0\u63D0\u793A\u5185\u5BB9';
                    panel.innerHTML = DOMPurify.sanitize(marked.parse(rawMarkdown));
                });
            });
            
            // \u70B9\u51FB\u9875\u9762\u5176\u4ED6\u5730\u65B9\u5173\u95ED\u63D0\u793A
            document.addEventListener('click', () => {
                document.querySelectorAll('.tip-wrapper').forEach(w => w.classList.remove('active'));
            });
        }

        // \u521D\u59CB\u5316\u6240\u6709\u6A21\u677F\u9009\u62E9\u5668
        function initAllTemplateSelectors() {
            const configs = ${s.configs};
            
            for (const modeId of Object.keys(MODES)) {
                if (!MODES[modeId].noTemplate && configs[modeId]) {
                    initTemplateSelector(modeId, configs[modeId]);
                }
            }
        }

        // \u521D\u59CB\u5316\u6A21\u677F\u9009\u62E9\u5668
        function initTemplateSelector(modeId, configGroups) {
            const selector = document.querySelector(\`#\${modeId}-container .template-selector\`);
            const templateToggle = selector.querySelector('.template-toggle');
            const optionsContainer = selector.querySelector('.template-options');
            
            // \u751F\u6210\u6240\u6709\u6A21\u677F\u9009\u9879
            configGroups.forEach(group => {
                // \u6DFB\u52A0\u5206\u7EC4\u6807\u7B7E
                const groupLabel = document.createElement('div');
                groupLabel.style.padding = '10px 20px';
                groupLabel.style.fontWeight = 'bold';
                groupLabel.style.color = '#555';
                groupLabel.style.backgroundColor = '#f5f5f5';
                groupLabel.textContent = group.label;
                optionsContainer.appendChild(groupLabel);
                
                // \u6DFB\u52A0\u9009\u9879
                group.options.forEach(option => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'template-option';
                    optionElement.textContent = option.label;
                    optionElement.dataset.value = option.value;
                    optionElement.dataset.group = group.label;
                    
                    optionElement.addEventListener('click', function () {
                        // \u79FB\u9664\u4E4B\u524D\u9009\u4E2D\u7684\u6837\u5F0F
                        selector.querySelectorAll('.template-option.selected').forEach(item => {
                            item.classList.remove('selected');
                        });
                        
                        // \u66F4\u65B0\u663E\u793A\u6587\u672C
                        templateToggle.textContent = \`\${group.label}-\${option.label}\`;
                        
                        // \u6DFB\u52A0\u9009\u4E2D\u6837\u5F0F
                        this.classList.add('selected');
                        
                        // \u70B9\u51FB\u540E\u81EA\u52A8\u6298\u53E0\u9009\u9879\u9762\u677F
                        templateToggle.classList.add('collapsed');
                        optionsContainer.classList.remove('show');
                    });
                    
                    optionsContainer.appendChild(optionElement);
                });
            });
            
            // \u9ED8\u8BA4\u9009\u62E9\u7B2C\u4E00\u4E2A\u9009\u9879
            const firstOption = selector.querySelector('.template-option');
            if (firstOption) {
                firstOption.classList.add('selected');
                const groupLabel = firstOption.dataset.group;
                const optionLabel = firstOption.textContent;
                templateToggle.textContent = \`\u8BF7\u9009\u62E9\u914D\u7F6E\u6A21\u677F(\u9ED8\u8BA4-\${groupLabel})\`;
            }
            
            // \u70B9\u51FB\u5207\u6362\u6309\u94AE\u5C55\u5F00/\u6298\u53E0\u9009\u9879
            templateToggle.addEventListener('click', function () {
                this.classList.toggle('collapsed');
                optionsContainer.classList.toggle('show');
            });
            
            // \u70B9\u51FB\u9875\u9762\u5176\u4ED6\u533A\u57DF\u5173\u95ED\u9009\u9879\u9762\u677F
            document.addEventListener('click', function (event) {
                if (!templateToggle.contains(event.target) && !optionsContainer.contains(event.target)) {
                    templateToggle.classList.add('collapsed');
                    optionsContainer.classList.remove('show');
                }
            });
        }

        // \u6DFB\u52A0\u94FE\u63A5\u8F93\u5165\u6846
        function addLinkInput(button, modeId) {
            const container = document.getElementById(\`link-container-\${modeId}\`);
            const row = document.createElement('div');
            row.className = 'link-row';
            
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'link-input';
            input.placeholder = MODES[modeId].placeholder;
            
            button.style.display = 'none';
            row.appendChild(input);
            container.appendChild(row);
            
            const btn = document.createElement('div');
            btn.className = 'add-btn';
            btn.textContent = '\u2795';
            btn.onclick = function () {
                addLinkInput(btn, modeId);
            };
            
            row.appendChild(btn);
        }

        // \u751F\u6210\u914D\u7F6E
        function generateConfig(modeId) {
            const inputs = document.querySelectorAll(\`#\${modeId}-container .link-input\`);
            let templateLink = '';
            
            // \u53EA\u6709\u975Ev2ray\u6A21\u5F0F\u624D\u83B7\u53D6\u9009\u4E2D\u7684\u6A21\u677F
            if (!MODES[modeId].noTemplate) {
                const selectedOption = document.querySelector(\`#\${modeId}-container .template-option.selected\`);
                templateLink = selectedOption ? selectedOption.dataset.value : '';
            }
            const protocolParams = {};
            
            document.querySelectorAll(\`#\${modeId}-container .protocol-options input[type="checkbox"]\`).forEach(checkbox => {
                protocolParams[checkbox.value] = checkbox.checked;
            });
            
            const subscriptionLinks = Array.from(inputs)
                .map(input => input.value.trim())
                .filter(val => val !== '');
            
            if (subscriptionLinks.length === 0 && templateLink) {
                alert('\u8BF7\u8F93\u5165\u81F3\u5C11\u4E00\u4E2A\u8BA2\u9605\u94FE\u63A5');
                return;
            }
            
            const allLinks = subscriptionLinks.map(link => encodeURIComponent(link));
            const origin = window.location.origin;

            const params = [];

            if (templateLink) {
                params.push(\`template=\${encodeURIComponent(templateLink)}\`);
            }
            if (allLinks.length > 0) {
                params.push(\`url=\${allLinks.join(',')}\`);
            }
            if (modeId) {
                params.push(\`\${modeId}=true\`);
            }

            for (const [protocol, enabled] of Object.entries(protocolParams)) {
                if (enabled) {
                    params.push(\`\${protocol}=true\`);
                }
            }

            const urlLink = \`\${origin}/?\${params.join('&')}\`;
            updateResult(urlLink);
        }

        // \u590D\u5236\u5230\u526A\u8D34\u677F
        function copyToClipboard() {
            const resultInput = document.getElementById('result');
            if (!resultInput.value) {
                return;
            }
            
            resultInput.select();
            navigator.clipboard.writeText(resultInput.value).then(() => {
                const tooltip = document.createElement('div');
                tooltip.style.position = 'fixed';
                tooltip.style.left = '50%';
                tooltip.style.top = '20px';
                tooltip.style.transform = 'translateX(-50%)';
                tooltip.style.padding = '8px 16px';
                tooltip.style.background = '#4361ee';
                tooltip.style.color = 'white';
                tooltip.style.borderRadius = '4px';
                tooltip.style.zIndex = '1000';
                tooltip.textContent = '\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F';
                
                document.body.appendChild(tooltip);
                
                setTimeout(() => {
                    document.body.removeChild(tooltip);
                }, 2000);
            }).catch(err => {
                alert('\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236');
            });
        }

        // \u66F4\u65B0\u7ED3\u679C\u548C\u4E8C\u7EF4\u7801
        function updateResult(urlLink) {
            document.getElementById('result').value = urlLink;
            
            // \u751F\u6210\u4E8C\u7EF4\u7801
            const qrcodeDiv = document.getElementById('qrcode');
            
            if (urlLink) {
                // \u6709\u5185\u5BB9\u65F6\u663E\u793A\u4E8C\u7EF4\u7801
                qrcodeDiv.classList.add('show');
                qrcodeDiv.innerHTML = '';
                new QRCode(qrcodeDiv, {
                    text: urlLink,
                    width: 220,
                    height: 220,
                    colorDark: "#4a60ea",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.L,
                    scale: 1
                });
            } else {
                // \u65E0\u5185\u5BB9\u65F6\u9690\u85CF\u4E8C\u7EF4\u7801
                qrcodeDiv.classList.remove('show');
                qrcodeDiv.innerHTML = '';
            }
        }
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('qrcode').classList.remove('show');
        });
    <\/script>
</body>
</html>`}async function Ki(s,e){let t=new URL(s.url,`http://${s.headers.host}`),n={url:t,urls:t.searchParams.getAll("url"),userAgent:s.headers["user-agent"],rule:t.searchParams.get("template"),singbox:t.searchParams.get("singbox")==="true",mihomo:t.searchParams.get("mihomo")==="true",v2ray:t.searchParams.get("v2ray")==="true",udp:t.searchParams.get("udp")==="true",udp_fragment:t.searchParams.get("udp_frag")==="true",tls_fragment:t.searchParams.get("tls_frag")==="true",exclude_package:t.searchParams.get("ep")==="true",exclude_address:t.searchParams.get("ea")==="true",tailscale:t.searchParams.get("tailscale")==="true",adgdns:t.searchParams.get("adgdns")==="true",tun:t.searchParams.get("tun")==="true",IMG:process.env.IMG||vn,sub:process.env.SUB||An,Mihomo_default:process.env.MIHOMOTOP||_n,singbox_1_11:process.env.SINGBOX_1_11||Nn,singbox_1_12:process.env.SINGBOX_1_12||Ln,singbox_1_12_alpha:process.env.SINGBOX_1_12_ALPHA||On,singbox_1_13:process.env.SINGBOX_1_13||En,beian:process.env.BEIAN||Cn,beianurl:process.env.BEIANURL||In,configs:Tn(process.env.MIHOMO,process.env.SINGBOX)};if(n.modes=Mn(n.sub,n.userAgent),n.urls.length===1&&n.urls[0].includes(",")&&(n.urls=n.urls[0].split(",").map(i=>i.trim())),n.urls.length===0||n.urls[0]===""){let i=await Un(n);e.setHeader("Content-Type","text/html; charset=utf-8"),e.statusCode=200,e.end(i);return}try{let i;n.singbox?i=await Kn(n):n.mihomo?i=await Dn(n):n.v2ray&&(i=await qn(n));let o=i.headers,r=["transfer-encoding","content-length","content-encoding","connection"];for(let[a,l]of Object.entries(o))r.includes(a.toLowerCase())||e.setHeader(a,l);e.setHeader("Content-Type","application/json; charset=utf-8"),e.setHeader("Profile-web-page-url",t.origin),e.statusCode=i.status||200,e.end(i.data)}catch(i){e.statusCode=400,e.setHeader("Content-Type","application/json; charset=utf-8"),e.end(JSON.stringify({error:i.message}))}}export{Ki as default};
//# sourceMappingURL=vercel.js.map
