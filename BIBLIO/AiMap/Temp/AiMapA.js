/* alert("js ok"); */
let saved = new Set([2]), folders=[{id:1,name:"Mes favoris",icon:"♥",desc:"Les bonnes adresses",share:"Privé",ids:[2]},{id:2,name:"À visiter",icon:"📍",desc:"Pour une prochaine sortie",share:"Privé",ids:[1,3]}];
let activePanel=null, sheetSize="mid", searchMode=false, query="", selectedPlace=null, selectedFolder=null, showAllSaved=false, showAllFolders=false, creatingFolder=false, updateCollapsed=false, filter="Tout";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sheet=$("#sheet"), content=$("#sheetContent");
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2500)}
function openSheet(panel,size="mid"){activePanel=panel;sheet.classList.remove("hidden");setSize(size);renderPanel();$$(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.panel===panel))}
function setSize(size){sheetSize=size;sheet.classList.remove("min","mid","max");sheet.classList.add(size);$("#sheetExpand").textContent=size==="max"?"⌄":size==="min"?"⌃":"↕"}
function closeSheet(){sheet.classList.add("hidden");activePanel=null;selectedFolder=null;searchMode=false;$$(".nav-btn").forEach(b=>b.classList.remove("active"))}
function toggleSheetSize(){setSize(sheetSize==="max"?"mid":sheetSize==="mid"?"max":"mid")}
function placeCard(p,compact=false){return `<article class="place"><div class="place-emoji">${p.photo||p.emoji}</div><div class="place-main"><h4>${p.name}</h4><p>${p.kind} · ${p.distance}<br>${p.rating||"Pas encore d’avis"}<br>${p.city}</p><div class="place-actions"><button class="small-btn" data-action="details" data-id="${p.id}">ⓘ Détails</button><button class="small-btn" data-action="route" data-id="${p.id}">➤ Itinéraire</button><button class="small-btn" data-action="save" data-id="${p.id}">${saved.has(p.id)?"♥ Enregistré":"♡ Enregistrer"}</button>${compact?"":`<button class="small-btn" data-action="call" data-id="${p.id}">☎ Appeler</button><button class="small-btn" data-action="web" data-id="${p.id}">↗ Site web</button><button class="small-btn" data-action="share" data-id="${p.id}">⇧ Partager</button>`}</div></div></article>`}
function renderPanel(){
 if(!activePanel)return;
 if(activePanel==="search"){renderSearch();return}
 if(activePanel==="place"){renderPlace();return}
 if(activePanel==="folder"){renderFolder();return}
 if(activePanel==="createFolder"){renderCreateFolder();return}
 if(activePanel==="contribute"){renderContribute();return}
 if(activePanel==="discover"){ $("#sheetTitle").textContent="Découvertes";content.innerHTML=`<section class="section"><div class="section-title"><h3>Suggestions près de vous</h3><button class="link" data-action="search">Tout explorer</button></div><div class="place-list">${places.map(p=>placeCard(p,true)).join("")}</div></section><section class="section"><h3>Vos idées de sortie</h3><p class="muted">Cafés chaleureux, coins de nature et lieux à découvrir : explorez les repères de démonstration.</p></section>`;return}
 if(activePanel==="saved"){renderSaved();return}
}
function renderSearch(){
 $("#sheetTitle").textContent="Rechercher";let results=places.filter(p=>(p.name+" "+p.kind+" "+p.city+" "+p.address).toLowerCase().includes(query.toLowerCase())&&(filter==="Tout"||filter==="À proximité"||p.category===filter||(filter==="Favoris"&&saved.has(p.id))));
 content.innerHTML=`<div class="searchbox"><span>⌕</span><input id="queryInput" placeholder="Lieux, adresses, catégories…" value="${esc(query)}" autofocus><button class="close" data-action="clearQuery">×</button></div>
 <div class="filters">${["Tout","Cafés","Nature","Culture","Favoris","À proximité"].map(f=>`<button class="filter ${filter===f?"on":""}" data-filter="${f}">${f}</button>`).join("")}</div>
 <div class="section"><div class="section-title"><h3>${query?`Résultats pour « ${esc(query)} »`:"Lieux suggérés"}</h3><button class="link" data-action="cancelSearch">Annuler</button></div><p class="result-count">${results.length} résultat${results.length>1?"s":""} · repères de démonstration</p><div class="place-list">${results.length?results.map(p=>placeCard(p)).join(""):'<div class="empty">Aucun résultat. Essayez « café », « jardin » ou « Dabo ».</div>'}</div></div>
 <section class="section"><h3>Recherches précédentes</h3><div class="row" style="flex-wrap:wrap;margin-top:10px">${["Café","Parc","Maison des Tilleuls"].map(q=>`<button class="filter" data-history="${q}">${q} <span data-action="noop">×</span></button>`).join("")}</div></section>
 <section class="section"><h3>Favoris enregistrés</h3><div class="place-list">${places.filter(p=>saved.has(p.id)).map(p=>placeCard(p,true)).join("")||'<p class="muted">Vos lieux enregistrés apparaîtront ici.</p>'}</div></section>`;
 const inp=$("#queryInput");inp?.addEventListener("input",e=>{query=e.target.value;const pos=e.target.selectionStart;renderSearch();const next=$("#queryInput");next?.focus();next?.setSelectionRange(pos,pos)});
}
function renderSaved(){
 $("#sheetTitle").textContent="Enregistrés";
 const savedPlaces=places.filter(p=>saved.has(p.id));
 content.innerHTML=`<section class="section"><div class="section-title"><h3>Lieux enregistrés récemment</h3><button class="link" data-action="allSaved">${showAllSaved?"Réduire":"Tout afficher"}</button></div><div class="place-list">${(showAllSaved?savedPlaces:savedPlaces.slice(0,2)).map(p=>placeCard(p,true)).join("")||'<div class="empty">Aucun lieu enregistré pour le moment. Touchez ♡ sur un lieu pour le garder.</div>'}</div></section>
 <section class="section"><div class="section-title"><h3>Dossiers de lieux</h3><button class="link" data-action="allFolders">${showAllFolders?"Voir moins":"Voir plus"}</button></div><button class="secondary" data-action="newFolder" style="margin-bottom:12px">＋ Nouveau dossier</button><div class="folder-grid">${(showAllFolders?folders:folders.slice(0,4)).map(f=>`<button class="folder" data-folder="${f.id}"><span class="folder-icon">${f.icon}</span><strong>${esc(f.name)}</strong><small>${f.share==="Publique"?"🌐 Public":"🔒 Privé"} · ${f.ids.length} lieu(x)</small></button>`).join("")}</div></section>
 <section class="section"><h3>Suggestions à enregistrer</h3><div class="place-list">${places.filter(p=>!saved.has(p.id)).map(p=>placeCard(p,true)).join("")||'<p class="muted">Tous les lieux de démonstration sont enregistrés.</p>'}</div></section>`;
}
function renderCreateFolder(){
 $("#sheetTitle").textContent="Nouveau dossier";
 content.innerHTML=`<form class="form" id="folderForm"><p class="muted">Organisez vos lieux dans un dossier personnalisé.</p><label class="field">Icône à personnaliser<select id="folderIcon"><option>📍</option><option>♥</option><option>🏡</option><option>☕</option><option>🌿</option><option>⭐</option><option>🍽️</option><option>📷</option></select></label><label class="field">Nom du dossier<input id="folderName" placeholder="Ex. Escapades du week-end" required maxlength="50"></label><label class="field">Description<textarea id="folderDesc" placeholder="À quoi servira ce dossier ?"></textarea></label><div class="field">Partage<div class="radio-row"><label><input type="radio" name="share" value="Privé" checked> 🔒 Privé</label><label><input type="radio" name="share" value="Publique"> 🌐 Public</label></div></div><div class="row"><button class="primary" type="submit">Créer le dossier</button><button class="secondary" type="button" data-action="cancelFolder">Annuler</button></div></form>`;
 $("#folderForm").addEventListener("submit",e=>{e.preventDefault();const name=$("#folderName").value.trim();if(!name)return;folders.unshift({id:Date.now(),name,icon:$("#folderIcon").value,desc:$("#folderDesc").value,share:document.querySelector('input[name="share"]:checked').value,ids:[]});activePanel="saved";renderPanel();toast("Dossier créé")});
}
function renderFolder(){
 const f=folders.find(x=>x.id===selectedFolder);if(!f){activePanel="saved";renderPanel();return}
 $("#sheetTitle").textContent=f.name;
 content.innerHTML=`<div class="row" style="justify-content:space-between;margin-bottom:14px"><div><div style="font-size:25px">${f.icon}</div><div class="muted">${esc(f.desc||"Sans description")} · ${f.share==="Publique"?"🌐 Public":"🔒 Privé"}</div></div><div class="row"><button class="small-btn" data-action="editFolder">Modifier</button><button class="small-btn" data-action="shareFolder">Partager</button><button class="small-btn" data-action="cancelFolder">Fermer</button></div></div>
 <div class="section-title"><h3>Adresses du dossier</h3><button class="link" data-action="moreFolder">Voir plus</button></div>
 <div class="place-list">${places.filter(p=>f.ids.includes(p.id)).map(p=>placeCard(p)).join("")||'<div class="empty">Ce dossier est vide. Enregistrez un lieu puis ajoutez-le à ce dossier.</div>'}</div>
 <div class="section" style="margin-top:20px"><h3>Ajouter des lieux</h3><div class="place-list">${places.filter(p=>!f.ids.includes(p.id)).map(p=>`<article class="place"><div class="place-emoji">${p.photo}</div><div class="place-main"><h4>${p.name}</h4><p>${p.distance} · ${p.city}</p><div class="place-actions"><button class="small-btn" data-action="addToFolder" data-id="${p.id}">＋ Ajouter au dossier</button></div></div></article>`).join("")||'<p class="muted">Tous les lieux sont déjà dans ce dossier.</p>'}</div></div>`;
}
function renderPlace(){
 const p=places.find(x=>x.id===selectedPlace);if(!p){activePanel="discover";renderPanel();return}
 $("#sheetTitle").textContent=p.name;
 content.innerHTML=`<div class="place-emoji" style="width:100%;height:140px;font-size:52px;margin-bottom:14px">${p.photo}</div><h3 style="margin:0 0 5px">${p.name}</h3><p class="muted">${p.kind} · ${p.city}</p><p>${p.rating}</p><p class="muted">📍 ${p.address}</p><p class="muted">◷ ${p.hours}</p><p class="muted">☎ ${p.phone}</p><div class="row" style="flex-wrap:wrap;margin:14px 0"><button class="primary" data-action="route" data-id="${p.id}">➤ Itinéraire</button><button class="secondary" data-action="save" data-id="${p.id}">${saved.has(p.id)?"♥ Enregistré":"♡ Enregistrer"}</button><button class="secondary" data-action="share" data-id="${p.id}">⇧ Partager</button></div><p class="muted">Les adresses, coordonnées et avis de cette maquette sont fictifs et servent uniquement à tester l’interface.</p>`;
}
function renderContribute(){
 $("#sheetTitle").textContent="Contribuer";
 content.innerHTML=`<div class="row" style="align-items:center;margin-bottom:18px"><div class="avatar" style="width:54px;height:54px">JD</div><div><strong>Bonjour, Jules !</strong><p class="muted" style="margin:4px 0">120 points de contribution · membre explorateur</p></div></div><section class="section"><h3 style="margin-bottom:12px">Améliorer la carte</h3><div class="contribute-cards"><button class="contrib" data-action="contrib" data-kind="Ajouter un lieu"><span>📍</span><strong>Ajouter un lieu</strong></button><button class="contrib" data-action="contrib" data-kind="Modifier un lieu"><span>✎</span><strong>Modifier un lieu</strong></button><button class="contrib" data-action="contrib" data-kind="Ajouter un avis"><span>★</span><strong>Ajouter un avis</strong></button><button class="contrib" data-action="contrib" data-kind="Ajouter une photo"><span>▧</span><strong>Ajouter une photo</strong></button></div></section><section class="section"><div class="section-title"><h3>Obtenir un badge</h3><span>🏅</span></div><div class="badge-card"><strong>Explorateur local</strong><p>Complétez ces 3 objectifs pour avancer vers votre prochain badge.</p><p>○ Ajouter un lieu à la carte</p><p>○ Partager un avis utile</p><p>○ Ajouter une photo de lieu</p></div></section><div class="desktop-hint">Prototype : les contributions ne sont pas envoyées à un serveur.</div>`;
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function highlightPin(id){$$(".pin").forEach(p=>p.classList.toggle("selected",Number(p.dataset.place)===Number(id)))}
function doSearch(){query="";filter="Tout";searchMode=true;openSheet("search","max");setTimeout(()=>$("#queryInput")?.focus(),60)}
$("#openSearch").addEventListener("click",doSearch);
$("#profileBtn").addEventListener("click",()=>toast("Compte de démonstration · Jules D."));
$("#sheetClose").addEventListener("click",closeSheet);$("#sheetExpand").addEventListener("click",toggleSheetSize);
$("#sheetHandle").addEventListener("click",toggleSheetSize);
$("#bottomNav").addEventListener("click",e=>{const b=e.target.closest("[data-panel]");if(b)openSheet(b.dataset.panel,b.dataset.panel==="contribute"?"max":"mid")});
$("#gpsBtn").addEventListener("click",()=>{if(!navigator.geolocation){toast("La géolocalisation n’est pas disponible dans ce navigateur.");return}toast("Demande d’autorisation de localisation…");navigator.geolocation.getCurrentPosition(pos=>{toast(`Position obtenue : ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);$("#mapNote").textContent="Position GPS obtenue";},err=>toast(err.code===1?"Autorisation GPS refusée. Vous pouvez l’activer dans les réglages.":"Position indisponible. Vérifiez la connexion et les autorisations."),{enableHighAccuracy:true,timeout:10000})});
$("#routeBtn").addEventListener("click",()=>{if(selectedPlace){const p=places.find(x=>x.id===selectedPlace);toast("Itinéraire de démonstration vers "+p.name)}else{openSheet("search","mid");toast("Choisissez un lieu pour préparer un itinéraire") }});
let mapStyle=0;$("#mapType").addEventListener("click",()=>{mapStyle=(mapStyle+1)%3;$("#map").style.filter=["none","saturate(.55) contrast(1.05)","grayscale(.75)"][mapStyle];toast(["Carte standard","Carte atténuée","Carte monochrome"][mapStyle])});
$("#collapseUpdate").addEventListener("click",()=>{updateCollapsed=!updateCollapsed;$("#updateCard").querySelector("p").style.display=updateCollapsed?"none":"";$("#updateCard").querySelector(".row").style.display=updateCollapsed?"none":"";$("#collapseUpdate").textContent=updateCollapsed?"⌄":"⌃"});
$("#hideUpdate").addEventListener("click",()=>$("#updateCard").style.display="none");
$("#expandUpdate").addEventListener("click",()=>toast("Vous consultez la version de démonstration de Repères."));
$$(".pin").forEach(pin=>pin.addEventListener("click",()=>{selectedPlace=Number(pin.dataset.place);highlightPin(selectedPlace);openSheet("place","mid")}));
$("#categoryChips").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;filter=b.dataset.category;$$(".chip").forEach(c=>c.classList.toggle("active",c===b));if(filter==="Favoris"){openSheet("saved","mid")}else{query="";openSheet("search","mid");renderSearch()}});
content.addEventListener("click",e=>{
 const folderBtn=e.target.closest("[data-folder]");if(folderBtn){selectedFolder=Number(folderBtn.dataset.folder);openSheet("folder","mid");return}
 const hist=e.target.closest("[data-history]");if(hist){query=hist.dataset.history;filter="Tout";renderSearch();return}
 const fb=e.target.closest("[data-filter]");if(fb){filter=fb.dataset.filter;renderSearch();return}
 const b=e.target.closest("[data-action]");if(!b)return;const action=b.dataset.action,id=Number(b.dataset.id),p=places.find(x=>x.id===id);
 switch(action){
 case "search":doSearch();break;
 case "clearQuery":query="";renderSearch();break;
 case "cancelSearch":closeSheet();break;
 case "allSaved":showAllSaved=!showAllSaved;renderSaved();break;
 case "allFolders":showAllFolders=!showAllFolders;renderSaved();break;
 case "newFolder":activePanel="createFolder";renderPanel();break;
 case "cancelFolder":activePanel=selectedFolder?"folder":"saved";renderPanel();break;
 case "details":selectedPlace=id;highlightPin(id);openSheet("place","max");break;
 case "route":if(p)toast("Itinéraire de démonstration vers "+p.name+" · "+p.address);break;
 case "save":if(saved.has(id)){saved.delete(id);folders.forEach(f=>f.ids=f.ids.filter(n=>n!==id));toast("Lieu retiré des enregistrés")}else{saved.add(id);toast("Lieu enregistré")}renderPanel();break;
 case "call":if(p)toast("Téléphone : "+p.phone);break;
 case "web":if(p)window.open(p.web,"_blank","noopener");break;
 case "share":if(p){const txt=`${p.name} — ${p.address}`;if(navigator.share)navigator.share({title:p.name,text:txt}).catch(()=>{});else if(navigator.clipboard)navigator.clipboard.writeText(txt).then(()=>toast("Adresse copiée pour le partage"));else toast(txt)}break;
 case "addToFolder":{const f=folders.find(x=>x.id===selectedFolder);if(f&&!f.ids.includes(id))f.ids.push(id);renderFolder();toast("Lieu ajouté au dossier");break}
 case "moreFolder":setSize("max");break;
 case "editFolder":toast("Modification du dossier : prototype");break;
 case "shareFolder":toast("Lien de partage de démonstration prêt");break;
 case "contrib":toast(b.dataset.kind+" : formulaire de démonstration");break;
 }
});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){if(!sheet.classList.contains("hidden"))closeSheet();else $("#updateCard").style.display="none"}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();doSearch()}});
let touchY=0;$("#sheetHandle").addEventListener("touchstart",e=>touchY=e.touches[0].clientY,{passive:true});$("#sheetHandle").addEventListener("touchend",e=>{const dy=e.changedTouches[0].clientY-touchY;if(dy < -25)setSize("max");if(dy>25)setSize("min")},{passive:true});

