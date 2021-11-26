import { Telefoon } from './models/telefoon';
export declare class TelefoonSelect {
    telefoon: Telefoon;
    disabled: boolean;
    private landcodeInput;
    private index;
    private expanded;
    private countryCodeList;
    private suggestions;
    bind(): void;
    landcodeChanged(e: KeyboardEvent): void;
    suggestionClicked(suggestion: any): void;
    toggleSuggestions(): void;
    collapse(): void;
    blur(): void;
    keydown(e: KeyboardEvent): boolean;
    isDisabled(): boolean;
}
