import Calculator from './calculator';

export function appendNumber(
  calculator: Calculator,
  currentDisplayElem: HTMLElement,
  symbol: string
): void {
  currentDisplayElem.innerHTML += symbol;
  calculator.setCurrentValue(parseInt(currentDisplayElem.innerHTML));
}
