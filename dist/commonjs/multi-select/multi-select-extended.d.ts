import { MultiSelectBase } from './multi-select-base';
export declare class MultiSelectExtended extends MultiSelectBase {
    addOnChange: boolean;
    inputValue: string;
    addInput(): void;
    removeFromList(item: any): void;
    bind(): void;
}
