const e=e=>{try{if("string"!=typeof e||""===e)return e;const r=document.createDocumentFragment(),l=document.createElement("div");r.appendChild(l),l.innerHTML=e,o.forEach(e=>{const o=r.querySelectorAll(e);for(let e=o.length-1;e>=0;e--){const l=o[e];l.parentNode?l.parentNode.removeChild(l):r.removeChild(l);const c=n(l);for(let e=0;e<c.length;e++)t(c[e])}});const c=n(r);for(let e=0;e<c.length;e++)t(c[e]);const i=document.createElement("div");i.appendChild(r);const s=i.querySelector("div");return null!==s?s.innerHTML:i.innerHTML}catch(e){return console.error(e),""}},t=e=>{if(e.nodeType&&1!==e.nodeType)return;for(let t=e.attributes.length-1;t>=0;t--){const n=e.attributes[t],o=n.name;if(!r.includes(o.toLowerCase())){e.removeAttribute(o);continue}const l=n.value;null!=l&&l.toLowerCase().includes("javascript:")&&e.removeAttribute(o)}const o=n(e);for(let e=0;e<o.length;e++)t(o[e])},n=e=>null!=e.children?e.children:e.childNodes,r=["class","id","href","src"],o=["script","style","iframe","meta","link","object","embed"];export{e as a};