import { ApplicationRef, ChangeDetectorRef, Type } from '@angular/core';
import 'winbox';
import * as i0 from "@angular/core";
export type WinBoxOptions = WinBox.Params;
export interface WinBoxContainer<ComponentInstance> {
    winBox: WinBox;
    instance: ComponentInstance;
    changeDetectorRef?: ChangeDetectorRef;
}
export declare class WinboxService {
    private appRef;
    private winBoxStack;
    isThereAWinBox: boolean;
    constructor(appRef: ApplicationRef);
    get numberOfWinBoxes(): number;
    openWinBox<ComponentInstance>(options: WinBoxOptions, component: Type<ComponentInstance>): WinBoxContainer<ComponentInstance>;
    closeAllWinBoxes(): void;
    /** This method show the last Winbox created*/
    showLastWinbox(): void;
    /** This method minimize a Winbox selected by id*/
    minimizeWinbox(id: string | number, state: boolean): void;
    /** This method maximize a Winbox selected by id*/
    maximizeWinbox(id: string | number, state: boolean): void;
    private destroyComponent;
    static ɵfac: i0.ɵɵFactoryDeclaration<WinboxService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WinboxService>;
}