import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { permittedThemes, ILocalStorageState } from './local-storage.models';

type LSKey = keyof ILocalStorageState; // Define type for 'LocalStorageKeys'

@Injectable()
export class LocalStorageService {
  ////////////////////////////////

  readonly initialRequiredState: ILocalStorageState = {
    SiteTheme: 'DEFAULT-THEME',
    isPageAnimated: true
  };

  private state$ = new Subject<ILocalStorageState>();

  constructor(private overlayContainer: OverlayContainer) {
    this.verifyAndRepairLocalStorageState();
    this.state$.next({ ...this.getLocalStorageState() });
  }

  getLocalStorageState() {
    // Use default values for testing
    if (!localStorage) return { ...this.initialRequiredState };

    return Object.keys(localStorage).reduce((accumState: any, key: string) => {
      accumState[key] = this.getItem(key as LSKey);
      return accumState;
    }, {});
  }

  getLocalStorageStream() {
    return this.state$.asObservable();
  }

  refreshStateStream() {
    this.state$.next({ ...this.getLocalStorageState() });
  }

  setItem(key: LSKey, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
    this.refreshStateStream();
    if (key === 'SiteTheme') this.updateCdkOverlayClass(value);
  }

  getItem(key: LSKey) {
    // Use default values for testing
    if (!localStorage) return this.initialRequiredState[key];

    const item = localStorage.getItem(key);

    try {
      return !!item ? JSON.parse(item) : 'NO_ITEM_FOUND';
    } catch (e) {
      return 'NO_ITEM_FOUND';
      console.log(e);
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * Check that local storage ONLY has "required" key-value pairs.
   * Remove any pairs that are not "required".
   * Create and apply default value to any missing pairs.
   */
  verifyAndRepairLocalStorageState() {
    //
    // Get state objects
    const reqState: ILocalStorageState = this.initialRequiredState;
    const state: any = this.getLocalStorageState();

    // Loop through keys of state; remove pair if key is not in reqState
    Object.keys(state).forEach((stateKey: string) => {
      if (!Object.keys(reqState).includes(stateKey)) this.removeItem(stateKey);
    });

    // Verify key-value pairs and types by looping thru keys of requiredInitialState;
    // if present state has key missing or of wrong type, then reinitialize it
    const newState: ILocalStorageState = (Object.keys(reqState) as LSKey[]).reduce(
      (accumState: any, key: LSKey) => {
        //
        // Build tests that compare key-value pairs between
        // present state and initial-required state
        const isKeyAbsent = !state[key];
        const isBasicTypeWrong = typeof state[key] !== typeof (reqState[key] as any);
        const isThemeTypeWrong = !permittedThemes.includes(state[key]);

        // If problem is found with key-value pair, reset it
        if (isKeyAbsent || isBasicTypeWrong || isThemeTypeWrong) {
          accumState[key] = reqState[key];
        } else {
          accumState[key] = state[key];
        }
        return accumState;
      },
      {}
    );

    // Set localStorage to newState
    (Object.keys(newState) as LSKey[]).forEach((key: LSKey) => {
      this.setItem(key, newState[key]);
    });
  }

  /**
   * Method to be triggered when SiteTheme is updated to update div of class
   * 'cdk-overlay-container' to also be of class equal to the theme's name
   */
  updateCdkOverlayClass(newTheme: string) {
    //
    const classList: DOMTokenList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) => item.includes('-theme'));
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(newTheme.toLowerCase());
  }
}
