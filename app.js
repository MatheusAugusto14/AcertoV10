const documentos = [
  { codigo: 6, nome: "Crachá da BND", ordemData: 1, data: "1985-06-28", img: "images/6.png" },
  { codigo: 1, nome: "Coleira do Notso", ordemData: 2, data: "1985-07-15", img: "images/1.png" },
  { codigo: 3, nome: "Cachecol", ordemData: 3, data: "1985-08-01", img: "images/3.png" },
  { codigo: 4, nome: "Relógio de Pulso", ordemData: 4, data: "1985-09-10", img: "images/4.png" },
  { codigo: 5, nome: "Óculos de Combate", ordemData: 5, data: "1985-10-12", img: "images/5.png" },
  { codigo: 2, nome: "Katana", ordemData: 6, data: "1985-12-08", img: "images/2.png" }
];

const docsVisuais = [...documentos].sort((a,b)=>a.codigo - b.codigo);
const docsDiv = document.getElementById('docs');
const warningEl = document.getElementById('warning');
const resultadoEl = document.getElementById('resultado');
let selecionados = [];

function render(){
  docsVisuais.forEach(doc=>{
    const card = document.createElement('div');
    card.className='card';
    card.setAttribute('data-codigo', doc.codigo);
    const img = document.createElement('img'); img.src = doc.img; img.alt = doc.nome;
    const badge = document.createElement('div'); badge.className='badge'; badge.textContent = doc.codigo;
    const name = document.createElement('div'); name.className='name'; name.textContent = doc.nome;
    card.appendChild(img);
    card.appendChild(badge);
    card.appendChild(name);
    card.onclick = ()=>toggleSelect(doc, card);
    docsDiv.appendChild(card);
  });
}

function toggleSelect(doc, card){
  const codigo = doc.codigo;
  const idx = selecionados.indexOf(codigo);
  if(idx !== -1){
    selecionados.splice(idx,1);
    card.classList.remove('selected');
    warningEl.textContent = '';
  } else {
    if(selecionados.length >= 4){
      warningEl.textContent = 'Você só pode selecionar até 4 itens.';
      // don't blink; show for 2s then clear
      setTimeout(()=>{ if(warningEl.textContent==='Você só pode selecionar até 4 itens.') warningEl.textContent=''; }, 2000);
      return;
    }
    selecionados.push(codigo);
    card.classList.add('selected');
    warningEl.textContent = '';
  }
  atualizarSenha();
}

function atualizarSenha(){
  const mapa = new Map(documentos.map(d=>[d.codigo,d]));
  const selObjs = selecionados.map(c=>mapa.get(c));
  selObjs.sort((a,b)=> a.ordemData - b.ordemData);
  const senha = selObjs.map(d=>d.codigo).join('');
  resultadoEl.textContent = 'Senha: ' + (senha || '—');
  // make result visually bigger when filled
  if(senha.length>0){
    resultadoEl.style.fontSize = '28px';
    resultadoEl.style.padding = '16px 22px';
  } else {
    resultadoEl.style.fontSize = '';
    resultadoEl.style.padding = '';
  }
}

render();
// register service worker
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./service-worker.js').then(()=>console.log('sw ok')).catch(()=>{});
}