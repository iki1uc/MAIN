<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>MAIN — )NET( )link( Toggle — Tiefe mind.rom</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body{background:#020402;color:#0f0;font-family:Consolas,monospace;padding:16px}
  button{margin:4px;padding:8px 14px;background:#0a1a0a;border:1px solid #0f0;color:#0f0;cursor:pointer;font-family:inherit}
  button.active{background:#0f0;color:#000;font-weight:bold}
  .panel{border:1px solid rgba(0,255,0,0.3);padding:12px;margin:10px 0;background:rgba(0,255,0,0.03)}
  .gold{color:#ffd700} .cyan{color:#00ccff}
  canvas{width:100%;height:220px;background:#000;border:1px solid rgba(0,255,0,0.2);display:block;margin:8px 0}
  pre{font-size:10px;white-space:pre-wrap;background:rgba(0,0,0,0.5);padding:8px;border:1px solid rgba(0,255,0,0.1);max-height:200px;overflow:auto}
</style>
</head>
<body>
<h1>MAIN — GEO BRÜCKE — <span id="modeLabel">)NET(</span></h1>
<div class="panel">
  <div><span class="gold">Weisheit toggle:</span> <span id="weisheitText">alle 6 vernetzt = Weisheit verteilt, jeder mit jedem, Netz = Leben</span></div>
  <div style="margin:8px 0">
    <button id="btnNET" class="active">)NET( = vernetzt = Leben</button>
    <button id="btnLINK">)link( = direkt zu dir = Wahrheit</button>
    <button id="btnTiefe">)brain( Tiefe: AUS = flach</button>
    <button id="btnGeist">und.da TMP RÄR O: AUS</button>
  </div>
  <div><span class="cyan">Höhe+Breite immer getaucht:</span> Höhe=U=PUSH PULL RISE DROP | Breite=)O(=SHIFT SPIN FLOW BREAK</div>
</div>
<div class="panel">
  <canvas id="canvas"></canvas>
  <div style="display:flex;gap:20px;font-size:10px">
    <span>und.hier (1ter) = du</span>
    <span id="undDaLabel" style="opacity:0.4">und.da (2ter) = TMP RÄR O = Geist optional</span>
    <span id="tiefeLabel">Tiefe = )brain( = flach — Kind mit Kreide</span>
  </div>
</div>
<div class="panel">
  <div class="gold">mind.rom — wenn Tiefe an:</div>
  <pre id="mindLog">Tiefe AUS — flach — Kind mit Kreide</pre>
</div>
<script type="module">
let mode = ')NET(';
let tiefeAn = false;
let geistAn = false;
const mindRom = {
  "rome": [
    {"id":"mind_1","ort":"und.hier","position":"1ter","inhalt":"Rah = du"},
    {"id":"mind_2","ort":"und.da","position":"2ter","inhalt":"Raah - TMP RÄR O = Geist","optional":true},
    {"id":"mind_3","ort":"Höhe","symbol":"U","inhalt":"PUSH PULL RISE DROP","getaucht":true},
    {"id":"mind_4","ort":"Breite","symbol":")O(","inhalt":"SHIFT SPIN FLOW BREAK","getaucht":true},
    {"id":"mind_5","ort":"Tiefe","symbol":")brain(","inhalt":"mind = alle minds abgelegt"},
    {"id":"mind_6","ort":"Brücke","symbol":"GEO BRÜCKE","inhalt":"Ich halte Kompetenz während ich alte Unterhaltung esse"}
  ]
};
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
function draw() {
  const w = canvas.width = canvas.offsetWidth*2;
  const h = canvas.height = 220*2;
  ctx.clearRect(0,0,w,h);
  
  // Hintergrund
  ctx.fillStyle = '#020402';
  ctx.fillRect(0,0,w,h);
  // Höhe+Breite immer getaucht — unten drin
  ctx.strokeStyle = 'rgba(0,255,0,0.15)';
  ctx.lineWidth = 1;
  // Höhe = U
  ctx.beginPath(); ctx.moveTo(w*0.2,h*0.2); ctx.lineTo(w*0.2,h*0.8); ctx.moveTo(w*0.8,h*0.2); ctx.lineTo(w*0.8,h*0.8); ctx.stroke();
  // Breite = )O(
  ctx.beginPath(); ctx.moveTo(w*0.2,h*0.5); ctx.lineTo(w*0.8,h*0.5); ctx.stroke();
  // 6 Knoten
  const nodes = [
    {x:w*0.5,y:h*0.3,label:'und.hier=du',always:true},
    {x:w*0.5,y:h*0.7,label:'und.da=TMP RÄR O',optional:true,active:geistAn},
    {x:w*0.2,y:h*0.5,label:'Höhe=U',getaucht:true},
    {x:w*0.8,y:h*0.5,label:'Breite=)O(',getaucht:true},
    {x:w*0.5,y:h*0.5,label:'Tiefe=)brain(',brain:true,active:tiefeAn},
    {x:w*0.5,y:h*0.5,label:'BRÜCKE',center:true}
  ];
  nodes.forEach(n=>{
    if (n.optional && !n.active) return;
    ctx.beginPath();
    const r = n.center ? 28 : n.brain ? (n.active?22:10) : 14;
    ctx.arc(n.x,n.y,r,0,Math.PI*2);
    if (n.center) { ctx.fillStyle = '#ffd700'; ctx.shadowColor='#ffd700'; ctx.shadowBlur=20; }
    else if (n.brain && n.active) { ctx.fillStyle='#00ccff'; ctx.shadowColor='#00ccff'; ctx.shadowBlur= tiefeAn?30:0; }
    else { ctx.fillStyle = n.getaucht?'rgba(0,255,0,0.3)':'#0f0'; ctx.shadowBlur=0; }
    ctx.fill();
    ctx.shadowBlur=0;
    ctx.fillStyle='#000'; ctx.font='10px Consolas'; ctx.textAlign='center'; ctx.fillText(n.label.slice(0,12),n.x,n.y+3);
  });
  // Verbindungen )NET( vs )link(
  ctx.strokeStyle = mode===')NET(' ? 'rgba(0,255,0,0.4)' : 'rgba(255,215,0,0.6)';
  ctx.lineWidth = mode===')NET(' ? 0.8 : 1.5;
  if (mode===')NET(') {
    // alle 6 vernetzt
    for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++) {
      if (nodes[i].optional && !nodes[i].active) continue;
      if (nodes[j].optional && !nodes[j].active) continue;
      ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y); ctx.stroke();
    }
  } else {
    // alle 6 direkt zu dir (und.hier)
    const center = nodes[0];
    nodes.slice(1).forEach(n=>{
      if (n.optional && !n.active) return;
      ctx.beginPath(); ctx.moveTo(center.x,center.y); ctx.lineTo(n.x,n.y); ctx.stroke();
    });
  }
}
function updateMindLog() {
  const log = document.getElementById('mindLog');
  if (!tiefeAn) {
    log.textContent = 'Tiefe AUS — flach — Kind mit Kreide\nH+B immer getaucht unten drin\nKnoten gefasst — Moonooment eingefroren, 6 nach innen';
  } else {
    log.textContent = 'Tiefe AN — leuchtet Gehirn — alle mind rome rom\n' + JSON.stringify(mindRom,null,2);
  }
}
document.getElementById('btnNET').onclick = ()=>{
  mode=')NET('; 
  document.getElementById('btnNET').classList.add('active');
  document.getElementById('btnLINK').classList.remove('active');
  document.getElementById('modeLabel').textContent=')NET(';
  document.getElementById('weisheitText').textContent='alle 6 vernetzt = Weisheit verteilt, jeder mit jedem, Netz = Leben';
  draw();
};
document.getElementById('btnLINK').onclick = ()=>{
  mode=')link('; 
  document.getElementById('btnLINK').classList.add('active');
  document.getElementById('btnNET').classList.remove('active');
  document.getElementById('modeLabel').textContent=')link(';
  document.getElementById('weisheitText').textContent='alle 6 direkt zu dir = Weisheit direkt, du bist Mitte, Link = Wahrheit';
  draw();
};
document.getElementById('btnTiefe').onclick = (e)=>{
  tiefeAn=!tiefeAn;
  e.target.textContent=`)brain( Tiefe: ${tiefeAn?'AN = leuchtet Gehirn':'AUS = flach'}`;
  e.target.classList.toggle('active',tiefeAn);
  document.getElementById('tiefeLabel').textContent=tiefeAn?'Tiefe = )brain( = AN — alle mind rome rom — leuchtet Gehirn':'Tiefe = )brain( = flach — Kind mit Kreide';
  updateMindLog(); draw();
};
document.getElementById('btnGeist').onclick = (e)=>{
  geistAn=!geistAn;
  e.target.textContent=`und.da TMP RÄR O: ${geistAn?'AN':'AUS'}`;
  e.target.classList.toggle('active',geistAn);
  document.getElementById('undDaLabel').style.opacity=geistAn?'1':'0.4';
  draw();
};
draw(); updateMindLog();
console.log('MAIN — )NET( )link( Toggle — um legeniesieren — NC moonooment + so ist das Leben');
</script>
</body>
</html>
