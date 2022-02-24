import { MultiSelectBase } from './multi-select-base';
export declare class MultiSelect extends MultiSelectBase {
    textValue: string;
    expanded: boolean;
    mouseover: boolean;
    element: Element;
    constructor(element: Element);
    bind(): void;
    valueChanged(): void;
    toggleList(): void;
    optionClicked(option: any, target: any): void;
    updateTextValue(): void;
    reset(): void;
}
