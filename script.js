const out = document.querySelector('.calc-screen p');
let a = '';
let b = '';
let sign = '';
let finish = false;

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
  let operatorClicked = false;

  if (!event.target.classList.contains('btn')) return;
  if (event.target.classList.contains('ac')) return;

  out.textContent = '';
  const key = event.target.textContent;

  const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  const action = ['+', '-', 'X', '/'];

  if (digit.includes(key)) {
    if (b === '' && sign === '') {
      a += key; // Добавлено: сохраняем новое число в переменной a
      out.textContent = a;
    } else if (operatorClicked) {
      b = key; // Добавлено: сохраняем новое число в переменной b
      finish = false;
      out.textContent = b;
    } else {
      b += key; // Добавлено: добавляем цифру к текущему числу в переменной b
      out.textContent = b;
    }
    console.table(a, b, sign);
    return;
  }

  if (action.includes(key)) {
    if (b !== '') {
      calculateResult();
      a = out.textContent;
      b = '';
    }
    sign = key;
    operatorClicked = true;
    out.textContent = sign;
    console.table(a, b, sign);
    return;
  }

  if (key === '=') {
    calculateResult();
  }
};

function calculateResult() {
  if (b === '') b = a;
  switch (sign) {
    case '+':
      a = (+a) + (+b);
      break;
    case '-':
      a = a - b;
      break;
    case 'X':
      a = a * b;
      break;
    case '/':
      if (b === '0') {
        out.textContent = 'Ошибка';
        a = '';
        b = '';
        sign = '';
        return;
      }
      a = a / b;
      break;
  }
  finish = true;
  out.textContent = a;
  console.table(a, b, sign);
}

function clearAll() {
  a = '';
  b = '';
  sign = '';
  finish = false;
  out.textContent = 0;
}
