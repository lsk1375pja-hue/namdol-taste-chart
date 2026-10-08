const C = window.TASTE_CONFIG;
const state = { voterId: null, choices: {} };

const $ = id => document.getElementById(id);
$("title").textContent = C.title;
document.title = C.title;

function key(voterId, groupId){ return `${voterId}::${groupId}`; }

function load(){
  try{
    const saved = JSON.parse(localStorage.getItem("tasteChart") || "{}");
    if(saved.choices) Object.assign(state.choices, saved.choices);
    if(saved.voterId) state.voterId = saved.voterId;
  }catch(e){}
}

function save(){
  localStorage.setItem("tasteChart", JSON.stringify({
    voterId: state.voterId,
    choices: state.choices
  }));
  alert("저장했어요.");
}

function renderVoters(){
  const box=$("voterList"); box.innerHTML="";
  C.voters.forEach(v=>{
    const b=document.createElement("button");
    b.className="voter"+(state.voterId===v.id?" active":"");
    b.textContent=v.name;
    b.onclick=()=>{state.voterId=v.id; renderVoters(); renderChart();};
    box.appendChild(b);
  });
}

function imageOrFallback(src, alt, cls=""){
  if(!src) return `<div class="empty">?</div>`;
  return `<img class="${cls}" src="${src}" alt="${alt}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling?.classList.remove('hidden')">
          <div class="empty hidden">?</div>`;
}

function renderChart(){
  if(!state.voterId){
    $("chartSection").classList.add("hidden"); return;
  }
  $("chartSection").classList.remove("hidden");
  const voter=C.voters.find(v=>v.id===state.voterId);
  $("selectedVoter").textContent=voter.name+"의 취향표";

  const chosen=C.groups.filter(g=>state.choices[key(state.voterId,g.id)]).length;
  $("progress").textContent=`${chosen} / ${C.groups.length} 선택`;

  const chart=$("chart");
  chart.style.setProperty("--group-count", C.groups.length);
  chart.innerHTML="";

  const corner=document.createElement("div"); corner.className="corner"; chart.appendChild(corner);

  C.groups.forEach(g=>{
    const h=document.createElement("div"); h.className="group-head";
    h.innerHTML=g.logo
      ? imageOrFallback(g.logo,g.name,"group-logo")+`<div class="group-name">${g.name}</div>`
      : `<div class="group-logo-fallback">${g.name}</div>`;
    chart.appendChild(h);
  });

  // 한 사람의 표를 한 줄로 보여주는 구조
  const label=document.createElement("div");
  label.className="row-label";
  label.innerHTML=`<span class="row-num">01</span><span>${voter.name}</span>`;
  chart.appendChild(label);

  C.groups.forEach(g=>{
    const cell=document.createElement("div");
    cell.className="cell";
    const chosenId=state.choices[key(state.voterId,g.id)];
    const member=g.members.find(m=>m.id===chosenId);

    if(member){
      cell.classList.add("selected");
      cell.innerHTML=`<div class="choice">${imageOrFallback(member.image,member.name,"")}<div class="name">${member.name}</div></div>`;
    }else{
      cell.innerHTML=`<div class="choice"><div class="empty">+</div><div class="name">멤버 선택</div></div>`;
    }
    cell.onclick=(e)=>openMenu(e.currentTarget,g);
    chart.appendChild(cell);
  });
}

function openMenu(cell,group){
  document.querySelector(".member-menu")?.remove();
  const menu=document.createElement("div");
  menu.className="member-menu";

  const clear=document.createElement("button");
  clear.innerHTML=`<div class="empty" style="width:75px;height:75px;margin:auto">×</div><span>선택 안 함</span>`;
  clear.onclick=()=>{state.choices[key(state.voterId,group.id)]=""; menu.remove(); renderChart();};
  menu.appendChild(clear);

  group.members.forEach(m=>{
    const b=document.createElement("button");
    b.innerHTML=`${imageOrFallback(m.image,m.name,"")}<span>${m.name}</span>`;
    b.onclick=()=>{state.choices[key(state.voterId,group.id)]=m.id; menu.remove(); renderChart();};
    menu.appendChild(b);
  });

  document.body.appendChild(menu);
  const r=cell.getBoundingClientRect();
  const left=Math.min(window.innerWidth-menu.offsetWidth-8, Math.max(8,r.left));
  const top=Math.min(window.innerHeight-menu.offsetHeight-8, Math.max(8,r.bottom+6));
  menu.style.left=left+"px"; menu.style.top=top+"px";

  setTimeout(()=>{
    const close=e=>{if(!menu.contains(e.target)&&e.target!==cell){menu.remove();document.removeEventListener("click",close)}};
    document.addEventListener("click",close);
  },0);
}

$("saveBtn").onclick=save;
$("resetBtn").onclick=()=>{
  if(confirm("현재 선택을 모두 지울까요?")){
    state.choices={}; localStorage.removeItem("tasteChart"); renderChart();
  }
};
$("pngBtn").onclick=async()=>{
  if(!state.voterId){alert("먼저 이름을 선택하세요.");return;}
  document.querySelector(".member-menu")?.remove();
  if(typeof html2canvas==="undefined"){alert("이미지 저장 기능을 불러오지 못했어요.");return;}
  const canvas=await html2canvas($("chartCapture"),{backgroundColor:"#fff",scale:2,useCORS:true});
  const a=document.createElement("a");
  const voter=C.voters.find(v=>v.id===state.voterId);
  a.download=`${C.title}_${voter.name}.png`;
  a.href=canvas.toDataURL("image/png"); a.click();
};

load();
if(!state.voterId && C.voters.length) state.voterId=C.voters[0].id;
renderVoters();
renderChart();
