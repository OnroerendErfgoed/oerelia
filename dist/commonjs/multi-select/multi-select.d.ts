export declare class MultiSelect {
    options: any[];
    value: any[];
    textValue: string;
    placeholder: string;
    disabled: boolean;
    idProperty: string;
    labelProperty: string;
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
