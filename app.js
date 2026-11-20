let emojis = ['🍕','🍕','🐶','🐶','🚀','🚀','⚽','⚽','🍩','🍩','🐱','🐱','🎸','🎸','🌮','🌮'];
let primera = null, segunda = null, bloqueo = false;
let intentos = 0, aciertos = 0, segundos = 0, timer = null, empezado = false;

function mezclar(arr){
  for(let i=arr.length-1;i>0;i--){
    let j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}
function crearTablero(){
  let tablero = document.getElementById('tablero');
  tablero.innerHTML = '';
  mezclar(emojis);
  emojis.forEach(emoji=>{
    let div = document.createElement('div');
    div.className = 'carta';
    div.textContent = '❓';
    div.dataset.valor = emoji;
    div.onclick = ()=> voltear(div);
    tablero.appendChild(div);
  });
}
function voltear(carta){
  if(bloqueo || carta.classList.contains('volteada') || carta.classList.contains('acertada')) return;
  if(!empezado){
    empezado = true;
    timer = setInterval(()=>{ segundos++; document.getElementById('tiempo').textContent = segundos; },1000);
  }
  carta.classList.add('volteada');
  carta.textContent = carta.dataset.valor;
  if(!primera){ primera = carta; return; }
  segunda = carta;
  intentos++;
  document.getElementById('intentos').textContent = intentos;
  if(primera.dataset.valor === segunda.dataset.valor){
    primera.classList.add('acertada');
    segunda.classList.add('acertada');
    primera = null; segunda = null;
    aciertos++;
    document.getElementById('aciertos').textContent = aciertos;
    if(aciertos === 8){ clearInterval(timer); document.getElementById('mensaje').textContent = '🎉 ¡GANASTE! Lo hiciste en ' + segundos + ' segundos'; }
  } else {
    bloqueo = true;
    setTimeout(()=>{
      primera.classList.remove('volteada');
      segunda.classList.remove('volteada');
      primera.textContent = '❓'; segunda.textContent = '❓';
      primera = null; segunda = null; bloqueo = false;
    },800);
  }
}
function reiniciar(){
  clearInterval(timer);
  primera=null; segunda=null; bloqueo=false;
  intentos=0; aciertos=0; segundos=0; empezado=false;
  document.getElementById('intentos').textContent = '0';
  document.getElementById('aciertos').textContent = '0';
  document.getElementById('tiempo').textContent = '0';
  document.getElementById('mensaje').textContent = '';
  crearTablero();
}
crearTablero();

// Registrar la PWA
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('service worker.js');
}