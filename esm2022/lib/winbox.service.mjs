import { ApplicationRef, ChangeDetectorRef, createComponent, Injectable, } from '@angular/core';
import 'winbox';
import * as i0 from "@angular/core";
export class WinboxService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luYm94LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmd1bGFyLXdpbmJveC9zcmMvbGliL3dpbmJveC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxjQUFjLEVBQ2QsaUJBQWlCLEVBRWpCLGVBQWUsRUFDZixVQUFVLEdBRVgsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxRQUFRLENBQUM7O0FBYWhCLE1BQU0sT0FBTyxhQUFhO0lBSUo7SUFIWixXQUFXLEdBQWEsRUFBRSxDQUFDO0lBQzVCLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFFOUIsWUFBb0IsTUFBc0I7UUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7SUFBRyxDQUFDO0lBQzlDLElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDakMsQ0FBQztJQUVELFVBQVUsQ0FDUixPQUFzQixFQUN0QixTQUFrQztRQUVsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVuQyxNQUFNLFlBQVksR0FBRyxlQUFlLENBQUMsU0FBUyxFQUFFO1lBQzlDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUTtZQUN6QyxXQUFXLEVBQUUsTUFBTSxDQUFDLElBQUk7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTlDLDZEQUE2RDtRQUM3RCxzREFBc0Q7UUFDdEQsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNyQyxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDekIsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQW9CLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQzthQUN2RTtZQUNELE1BQU0sZ0JBQWdCLEdBQUcsWUFBWSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzlELElBQUksZ0JBQWdCLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFvQixZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDdkU7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLE9BQU87WUFDTCxNQUFNO1lBQ04sUUFBUSxFQUFFLFlBQVksQ0FBQyxRQUFRO1lBQy9CLGlCQUFpQixFQUFFLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO1NBQ2hFLENBQUM7SUFDSixDQUFDO0lBRU0sZ0JBQWdCO1FBQ3JCLEtBQUssTUFBTSxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUVELDhDQUE4QztJQUN2QyxjQUFjO1FBQ25CLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pELENBQUM7SUFFRCxrREFBa0Q7SUFDM0MsY0FBYyxDQUFDLEVBQW1CLEVBQUUsS0FBYztRQUN2RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELGtEQUFrRDtJQUMzQyxjQUFjLENBQUMsRUFBbUIsRUFBRSxLQUFjO1FBQ3ZELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRU8sZ0JBQWdCLENBQ3RCLFlBQTZDLEVBQzdDLE1BQWM7UUFFZCxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7UUFDcEQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO3VHQTVFVSxhQUFhOzJHQUFiLGFBQWEsY0FEQSxNQUFNOzsyRkFDbkIsYUFBYTtrQkFEekIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudFJlZixcbiAgY3JlYXRlQ29tcG9uZW50LFxuICBJbmplY3RhYmxlLFxuICBUeXBlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAnd2luYm94JztcblxuZGVjbGFyZSBjb25zdCBXaW5Cb3g6IFdpbkJveC5XaW5Cb3hDb25zdHJ1Y3RvcjtcblxuZXhwb3J0IHR5cGUgV2luQm94T3B0aW9ucyA9IFdpbkJveC5QYXJhbXM7XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2luQm94Q29udGFpbmVyPENvbXBvbmVudEluc3RhbmNlPiB7XG4gIHdpbkJveDogV2luQm94O1xuICBpbnN0YW5jZTogQ29tcG9uZW50SW5zdGFuY2U7XG4gIGNoYW5nZURldGVjdG9yUmVmPzogQ2hhbmdlRGV0ZWN0b3JSZWY7XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgV2luYm94U2VydmljZSB7XG4gIHByaXZhdGUgd2luQm94U3RhY2s6IFdpbkJveFtdID0gW107XG4gIHB1YmxpYyBpc1RoZXJlQVdpbkJveCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZikge31cbiAgZ2V0IG51bWJlck9mV2luQm94ZXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy53aW5Cb3hTdGFjay5sZW5ndGg7XG4gIH1cblxuICBvcGVuV2luQm94PENvbXBvbmVudEluc3RhbmNlPihcbiAgICBvcHRpb25zOiBXaW5Cb3hPcHRpb25zLFxuICAgIGNvbXBvbmVudDogVHlwZTxDb21wb25lbnRJbnN0YW5jZT5cbiAgKTogV2luQm94Q29udGFpbmVyPENvbXBvbmVudEluc3RhbmNlPiB7XG4gICAgY29uc3Qgd2luQm94ID0gbmV3IFdpbkJveChvcHRpb25zKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IGNyZWF0ZUNvbXBvbmVudChjb21wb25lbnQsIHtcbiAgICAgIGVudmlyb25tZW50SW5qZWN0b3I6IHRoaXMuYXBwUmVmLmluamVjdG9yLFxuICAgICAgaG9zdEVsZW1lbnQ6IHdpbkJveC5ib2R5LFxuICAgIH0pO1xuICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcblxuICAgIC8vIGVzdGVuc2lvbmUgZGVsIG1ldG9kbyBwZXIgcGVybWV0dGVyZSBhbGwndXRlbnRlIGRpIHBhc3NhcmVcbiAgICAvLyB1bmEgZnVuemlvbmUgZGEgaW52b2NhcmUgYWxsYSBjaGl1c3VyYSBkZWxsYSB3aW5Cb3hcbiAgICBjb25zdCBvcHRpb25zQ2xvc2UgPSBvcHRpb25zLm9uY2xvc2U7XG4gICAgd2luQm94Lm9uY2xvc2UgPSAoZm9yY2UpID0+IHtcbiAgICAgIGlmIChmb3JjZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXN0cm95Q29tcG9uZW50PENvbXBvbmVudEluc3RhbmNlPihjb21wb25lbnRSZWYsIHdpbkJveCk7XG4gICAgICB9XG4gICAgICBjb25zdCBpc0Nsb3NlQ29uZmlybWVkID0gb3B0aW9uc0Nsb3NlPy5hcHBseSh3aW5Cb3gsIFtmb3JjZV0pO1xuICAgICAgaWYgKGlzQ2xvc2VDb25maXJtZWQgfHwgIW9wdGlvbnNDbG9zZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXN0cm95Q29tcG9uZW50PENvbXBvbmVudEluc3RhbmNlPihjb21wb25lbnRSZWYsIHdpbkJveCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHRoaXMuaXNUaGVyZUFXaW5Cb3ggPSB0cnVlO1xuICAgIHRoaXMud2luQm94U3RhY2sucHVzaCh3aW5Cb3gpO1xuICAgIHdpbkJveC5oaWRlKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpbkJveCxcbiAgICAgIGluc3RhbmNlOiBjb21wb25lbnRSZWYuaW5zdGFuY2UsXG4gICAgICBjaGFuZ2VEZXRlY3RvclJlZjogY29tcG9uZW50UmVmLmluamVjdG9yLmdldChDaGFuZ2VEZXRlY3RvclJlZiksXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZUFsbFdpbkJveGVzKCkge1xuICAgIGZvciAoY29uc3Qgd2luQm94IG9mIHRoaXMud2luQm94U3RhY2spIHtcbiAgICAgIHdpbkJveC5jbG9zZSh0cnVlKTtcbiAgICB9XG4gICAgdGhpcy53aW5Cb3hTdGFjayA9IFtdO1xuICAgIHRoaXMuaXNUaGVyZUFXaW5Cb3ggPSBmYWxzZTtcbiAgfVxuXG4gIC8qKiBUaGlzIG1ldGhvZCBzaG93IHRoZSBsYXN0IFdpbmJveCBjcmVhdGVkKi9cbiAgcHVibGljIHNob3dMYXN0V2luYm94KCkge1xuICAgIGlmICh0aGlzLndpbkJveFN0YWNrLmxlbmd0aCA+IDApXG4gICAgICB0aGlzLndpbkJveFN0YWNrW3RoaXMud2luQm94U3RhY2subGVuZ3RoIC0gMV0uc2hvdygpO1xuICB9XG5cbiAgLyoqIFRoaXMgbWV0aG9kIG1pbmltaXplIGEgV2luYm94IHNlbGVjdGVkIGJ5IGlkKi9cbiAgcHVibGljIG1pbmltaXplV2luYm94KGlkOiBzdHJpbmcgfCBudW1iZXIsIHN0YXRlOiBib29sZWFuKSB7XG4gICAgdGhpcy53aW5Cb3hTdGFjay5maW5kKCh3aW5ib3gpID0+IHdpbmJveC5pZCA9PT0gaWQpPy5taW5pbWl6ZShzdGF0ZSk7XG4gIH1cblxuICAvKiogVGhpcyBtZXRob2QgbWF4aW1pemUgYSBXaW5ib3ggc2VsZWN0ZWQgYnkgaWQqL1xuICBwdWJsaWMgbWF4aW1pemVXaW5ib3goaWQ6IHN0cmluZyB8IG51bWJlciwgc3RhdGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLndpbkJveFN0YWNrLmZpbmQoKHdpbmJveCkgPT4gd2luYm94LmlkID09PSBpZCk/Lm1heGltaXplKHN0YXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveUNvbXBvbmVudDxDb21wb25lbnRJbnN0YW5jZT4oXG4gICAgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8Q29tcG9uZW50SW5zdGFuY2U+LFxuICAgIHdpbkJveDogV2luQm94XG4gICk6IGJvb2xlYW4ge1xuICAgIGNvbXBvbmVudFJlZi5kZXN0cm95KCk7XG4gICAgdGhpcy53aW5Cb3hTdGFjayA9IHRoaXMud2luQm94U3RhY2suZmlsdGVyKCh3KSA9PiB3LmlkICE9PSB3aW5Cb3guaWQpO1xuICAgIHRoaXMuaXNUaGVyZUFXaW5Cb3ggPSB0aGlzLndpbkJveFN0YWNrLmxlbmd0aCAhPT0gMDtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==
