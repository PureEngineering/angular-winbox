import * as i0 from '@angular/core';
import { createComponent, ChangeDetectorRef, Injectable } from '@angular/core';
import 'winbox';

class WinboxService {
    appRef;
    winBoxStack = [];
    isThereAWinBox = false;
    constructor(appRef) {
        this.appRef = appRef;
    }
    get numberOfWinBoxes() {
        return this.winBoxStack.length;
    }
    openWinBox(options, component) {
        const winBox = new WinBox(options);
        const componentRef = createComponent(component, {
            environmentInjector: this.appRef.injector,
            hostElement: winBox.body,
        });
        this.appRef.attachView(componentRef.hostView);
        // estensione del metodo per permettere all'utente di passare
        // una funzione da invocare alla chiusura della winBox
        const optionsClose = options.onclose;
        winBox.onclose = (force) => {
            if (force) {
                return this.destroyComponent(componentRef, winBox);
            }
            const isCloseConfirmed = optionsClose?.apply(winBox, [force]);
            if (isCloseConfirmed || !optionsClose) {
                return this.destroyComponent(componentRef, winBox);
            }
            return true;
        };
        this.isThereAWinBox = true;
        this.winBoxStack.push(winBox);
        winBox.hide();
        return {
            winBox,
            instance: componentRef.instance,
            changeDetectorRef: componentRef.injector.get(ChangeDetectorRef),
        };
    }
    closeAllWinBoxes() {
        for (const winBox of this.winBoxStack) {
            winBox.close(true);
        }
        this.winBoxStack = [];
        this.isThereAWinBox = false;
    }
    /** This method show the last Winbox created*/
    showLastWinbox() {
        if (this.winBoxStack.length > 0)
            this.winBoxStack[this.winBoxStack.length - 1].show();
    }
    /** This method minimize a Winbox selected by id*/
    minimizeWinbox(id, state) {
        this.winBoxStack.find((winbox) => winbox.id === id)?.minimize(state);
    }
    /** This method maximize a Winbox selected by id*/
    maximizeWinbox(id, state) {
        this.winBoxStack.find((winbox) => winbox.id === id)?.maximize(state);
    }
    destroyComponent(componentRef, winBox) {
        componentRef.destroy();
        this.winBoxStack = this.winBoxStack.filter((w) => w.id !== winBox.id);
        this.isThereAWinBox = this.winBoxStack.length !== 0;
        return false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.7", ngImport: i0, type: WinboxService, deps: [{ token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.7", ngImport: i0, type: WinboxService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.7", ngImport: i0, type: WinboxService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.ApplicationRef }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { WinboxService };
//# sourceMappingURL=pure-angular-winbox.mjs.map