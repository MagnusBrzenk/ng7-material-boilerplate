/**
 * Actions to be passed from material buttons and menu to top-level controller
 */
export enum NavActions {
  // BUTTONS IN TOOLBAR
  'ENTER_BUTTON',
  'LEAVE_BUTTON',
  'CLICK_BUTTON',
  // OVERLAY COVERING BUTTON
  'ENTER_OVERLAY',
  'LEAVE_OVERLAY',
  'CLICK_OVERLAY',
  // MATERIAL MENUS
  'ENTER_MENU',
  'LEAVE_MENU',
  'CLICK_MENU',

  // USED FOR DEBUGGING iPAD EMULATOR
  'TOUCHSTART_BUTTON', // Tablet event
  'TOUCHEND_BUTTON' // Tablet event
}

/**
 * Shape of items in nested menus
 * NOTE: XOR logic is applied so that a navigation item can EITHER have a link OR act as a node in the menu tree.
 * We dont want them to be BOTH/AND because we dont have mouse hovering on mobile devices
 */
export type INav = XOR<
  //
  { label: string; icon?: string; isFA?: boolean; isExpanded?: boolean; link: string },
  { label: string; icon?: string; isFA?: boolean; isExpanded?: boolean; children: INav[] }
>;

// Aux types to implement XOR logic
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
