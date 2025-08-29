import Calculator from './calculator';
import { appendNumber } from './utils';

export function setupUI(calculator: Calculator) {
  const currentDisplayElem =
    document.querySelector<HTMLElement>('.current-display');
  const prevDisplayElem = document.querySelector<HTMLElement>('.prev-display');
  const buttonNumbers = Array.from(
    document.querySelectorAll<HTMLButtonElement>('button.number')
  );
  const buttonOperands = Array.from(
    document.querySelectorAll<HTMLButtonElement>('button.operation')
  );
  const buttonEqual = document.querySelector<HTMLElement>('.equal');
  const buttonClear = document.querySelector<HTMLElement>('.clear');
  const buttonDelete = document.querySelector<HTMLElement>('.delete');

  // цифры
  buttonNumbers.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (currentDisplayElem)
        appendNumber(calculator, currentDisplayElem, btn.innerHTML);
    });
  });

  // операции
  buttonOperands.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!calculator.getPrevValue()) {
        calculator.setOperand(btn.innerHTML);
        calculator.setPrevValue(calculator.getCurrentValue());
        calculator.clear();
        if (prevDisplayElem && currentDisplayElem)
          prevDisplayElem.innerHTML =
            calculator.getPrevValue() + ' ' + calculator.getOperand();
        if (currentDisplayElem) currentDisplayElem.innerHTML = '';
      } else {
        const result = calculator.calculate();
        calculator.setOperand(btn.innerHTML);
        calculator.setPrevValue(null);
        calculator.setCurrentValue(result);
        if (prevDisplayElem)
          prevDisplayElem.innerHTML = result + ' ' + calculator.getOperand();
        if (currentDisplayElem) currentDisplayElem.innerHTML = '';
      }
    });
  });

  // равно
  buttonEqual?.addEventListener('click', () => {
    const result = calculator.calculate();
    calculator.setOperand(null);
    calculator.setPrevValue(null);
    calculator.setCurrentValue(result);
    if (currentDisplayElem) currentDisplayElem.innerHTML = '' + result;
    if (prevDisplayElem) prevDisplayElem.innerHTML = '';
  });

  // clear
  buttonClear?.addEventListener('click', () => {
    calculator.clear();
    if (currentDisplayElem) currentDisplayElem.innerHTML = '';
  });

  // delete
  buttonDelete?.addEventListener('click', () => {
    calculator.delete();
    for (const display of [currentDisplayElem, prevDisplayElem]) {
      if (display) display.innerHTML = '';
    }
  });
}
