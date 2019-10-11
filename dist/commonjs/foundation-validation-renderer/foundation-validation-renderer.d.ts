import { RenderInstruction, ValidateResult } from 'aurelia-validation';
export declare class FoundationValidationRenderer {
    render(instruction: RenderInstruction): void;
    add(element: Element, result: ValidateResult): void;
    remove(element: Element, result: ValidateResult): void;
    private getContainer;
}
