export default class Calculator {
  private prevValue: number | null;
  private currentValue: number | null;
  private operand: string | null;

  constructor(
    prevValue: number | null = null,
    currentValue: number | null = null,
    operand: string | null = null
  ) {
    this.prevValue = prevValue;
    this.currentValue = currentValue;
    this.operand = operand;
  }

  setCurrentValue(value: number | null): void {
    this.currentValue = value;
  }

  getCurrentValue(): number | null {
    return this.currentValue;
  }

  setPrevValue(value: number | null): void {
    this.prevValue = value;
  }

  getPrevValue(): number | null {
    return this.prevValue;
  }

  setOperand(value: string | null): void {
    this.operand = value;
  }

  getOperand(): string | null {
    return this.operand;
  }

  clear(): void {
    this.currentValue = null;
  }

  delete(): void {
    this.currentValue = null;
    this.operand = null;
    this.prevValue = null;
  }

  calculate(): number {
    if (
      this.operand === null ||
      this.prevValue === null ||
      this.currentValue === null
    )
      return NaN;

    switch (this.operand) {
      case '+':
        return this.prevValue + this.currentValue;
      case '-':
        return this.prevValue - this.currentValue;
      case '*':
        return this.prevValue * this.currentValue;
      case '/':
        return this.prevValue / this.currentValue;
      default:
        return NaN;
    }
  }
}
