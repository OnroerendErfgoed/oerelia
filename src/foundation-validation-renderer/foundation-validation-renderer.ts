import { RenderInstruction, ValidateResult } from 'aurelia-validation';
import { Message } from '../message/message';

export class FoundationValidationRenderer {
  public render(instruction: RenderInstruction) {
    for (const { result, elements } of instruction.unrender) {
      for (const element of elements) {
        this.remove(element, result);
      }
    }

    for (const { result, elements } of instruction.render) {
      for (const element of elements) {
        this.add(element, result);
      }
    }
  }

  public add(element: Element, result: ValidateResult) {
    if (result.valid) {
      return;
    }

    if (result.message && result.rule.messageKey.indexOf('required') === -1) {
      Message.error({
        title: result.rule.property.displayName || result.propertyName,
        message: result.message
      });
    }

    const container = this.getContainer(element);
    if (!container) { return; }

    container.classList.add('error');
  }

  public remove(element: Element, result: ValidateResult) {
    if (result.valid) {
      return;
    }

    const container = this.getContainer(element);
    if (!container) { return; }

    container.classList.remove('error');
  }

  private getContainer(element: Element) {
    let container = element.closest('.placeholder-container');
    if (!container && (element.nodeName === 'FUZZY-DATE' || element.nodeName === 'TINY-MCE')) {
      container = element;
    }
    return container;
  }
}
