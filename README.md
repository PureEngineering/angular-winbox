# angular-winbox

A wrapper component for [WinBox.js](https://nextapps-de.github.io/winbox/) with the ability to mount Angular components.

This was forked from https://github.com/RBTech-dev/RBTech-Workspace as the orignal no longer is up. 

## Installation
```bash
//
```
## Usage
The service return an instance of a Winbox, which wraps Winbox.js and the component's instance.
```javascript
const winboxWrapper = this.winBoxService.openWinBox(
                {
                  title: "Winbox",
                  height: '90%',
                  width: '40%',
                  x: 'center',
                  y: 'center',
                  onclose: () => {
                    this.cdRef.detectChanges();
                    return false;
                  },
                },
                SampleComponent
              );
// It is possible to access to component's properties.
winboxWrapper.instance.value = 5;
winboxWrapper.winBox.close();
```
## Methods and Properties
```javascript
constructor(winBoxService : WinboxService) {}

// Open the last created WinBox.
this.winBoxService.showLastWinbox();

// Maximize a WinBox by id.
this.winBoxService.maximizeWinbox(id: string | number, state: boolean);

// Minimize a WinBox by id.
this.winBoxService.minimizeWinbox(id: string | number, state: boolean);

// Close all the created winBox.
this.winBoxService.closeAllWinBoxes();

// Boolean that indicates if there is at least one created Winbox.
const isThereAWinBox = this.wiBoxService.isThereAWinBox;
```