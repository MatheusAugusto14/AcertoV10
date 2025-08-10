// Dados: codigo (número de identificação) + nome (apenas texto) + ordemData (1 = mais antigo)
const documentos = [
  { codigo: 6, nome: "Crachá da BND", ordemData: 1, data: "1985-06-28" },
  { codigo: 1, nome: "Coleira do Notso", ordemData: 2, data: "1985-07-15" },
  { codigo: 3, nome: "Cachecol", ordemData: 3, data: "1985-08-01" },
  { codigo: 4, nome: "Relógio de Pulso", ordemData: 4, data: "1985-09-10" },
  { codigo: 5, nome: "Óculos de Combate", ordemData: 5, data: "1985-10-12" },
  { codigo: 2, nome: "Katana", ordemData: 6, data: "1985-12-08" }
];

// Renderiza visualmente em ordem crescente de codigo 1..6
const documentosVisuais = [...documentos].sort((a,b)=>a.codigo - b.codigo);
const docsDiv = document.getElementById('docs');
const warningEl = document.getElementById('warning');
const resultadoEl = document.getElementById('resultado');
let selecionados = [];

documentosVisuais.forEach(doc => {
  const card = document.createElement('div');
  card.className = 'card';
  const badge = document.createElement('div');
  badge.className = 'badge';
  badge.textContent = String(doc.codigo);
  const info = document.createElement('div');
  info.className = 'info';
  const name = document.createElement('div');
  name.className = 'name';
  // formato visual: "1 - Coleira do Notso"
  name.textContent = doc.codigo + " - " + doc.nome;
  const meta = document.createElement('div');
  meta.className = 'meta';
  meta.textContent = "Archived: " + doc.data;
  info.appendChild(name);
  info.appendChild(meta);

  card.appendChild(badge);
  card.appendChild(info);

  // clique no card marca/desmarca
  card.onclick = () => toggleSelect(doc, card);

  docsDiv.appendChild(card);
});

function toggleSelect(doc, card){
  const codigo = doc.codigo;
  const index = selecionados.indexOf(codigo);
  if(index !== -1){ // já selecionado -> desmarca
    selecionados.splice(index,1);
    card.classList.remove('selected');
    warningEl.textContent = '';
  } else {
    if(selecionados.length >= 4){
      // mostra mensagem não piscando por 2s
      warningEl.textContent = 'Você só pode selecionar até 4 itens.';
      setTimeout(()=>{ warningEl.textContent = ''; }, 2000);
      return;
    }
    selecionados.push(codigo);
    card.classList.add('selected');
  }
  atualizarSenha();
}

function atualizarSenha(){
  // Ordena pela ordemData (1 = mais antigo)
  const mapas = new Map(documentos.map(d=>[d.codigo,d]));
  const selObjs = selecionados.map(c=>mapas.get(c));
  selObjs.sort((a,b)=> a.ordemData - b.ordemData);
  const senha = selObjs.map(d=>d.codigo).join('');
  resultadoEl.textContent = 'Senha: ' + senha;
}

// Registrar service worker
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./service-worker.js').then(()=>console.log('SW registrado')).catch(()=>{});
}