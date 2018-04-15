export class MathHelper {
  getPercentageChange(oldNumber: number, newNumber: number): number {
    var decreaseValue = oldNumber - newNumber;
    return decreaseValue / oldNumber * 100;
  }

  calculateHeight(args: { width: number; originalWidth: number; originalHeight: number }): number {
    const ratio = this.getRatio(args.originalWidth, args.originalHeight);
    return args.width * ratio;
  }

  getRatio(a: number, b: number): number {
    const change = mathHelper.getPercentageChange(a, b);
    const ratio = 1 + -change / 100;
    return ratio;
  }
}

export const mathHelper = new MathHelper();
