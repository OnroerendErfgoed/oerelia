export class StringValueConverter {
  public fromView(value: string) {
    if (value) {
      return value.trim();
    }
  }
}
