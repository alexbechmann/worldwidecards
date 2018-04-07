export class MathHelper {
  getPercentageChange(oldNumber: number, newNumber: number): number {
    var decreaseValue = oldNumber - newNumber;
    return decreaseValue / oldNumber * 100;
  }

  calculateHeight(args: { width: number; originalWidth: number; originalHeight: number }): number {
    const percentageBetweenWidthAndHeight = this.getPercentageChange(args.originalWidth, args.originalHeight);
    const ratio = 1 + -percentageBetweenWidthAndHeight / 100;
    return args.width * ratio;
  }
}

export const mathHelper = new MathHelper();
