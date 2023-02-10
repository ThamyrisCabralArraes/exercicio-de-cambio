import './style.css';

import Swal from 'sweetalert2';

const inputMoney = document.getElementById('money');
const button = document.getElementById('button-click');
const uls = document.getElementById('ul-li');
const titulo = document.getElementById('titulo');

const funcaoErro = () => {
  return Swal.fire({
    title: 'Ops... você precisa passar uma moeda',
    icon: 'question',
    iconHtml: 'X',
    confirmButtonText: 'OK',
    showCloseButton: true,
  });
};

const apiMoeda = () => {
  if (!inputMoney.value) {
    funcaoErro();
  }

  fetch(`https://api.exchangerate.host/latest?base=${inputMoney.value}`).then((response) =>
    response
      .json()
      .then((data) => {
        const { rates } = data;

        titulo.textContent = `Valores relacionados a moeda ${inputMoney.value}`;

        const ratesR = Object.entries(rates);
        ratesR.forEach(([rate, valu]) => {
          const li = document.createElement('li');
          li.classList.add('lista-de-moeda');
          li.innerHTML = `${rate} = ${valu}`;
          inputMoney.value = '';
          uls.appendChild(li);
        });
      })
      .catch((error) => error.message),
  );
};

button.addEventListener('click', apiMoeda);