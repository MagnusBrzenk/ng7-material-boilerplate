/**
 * Shape of items in nested menus
 * NOTE: XOR logic is applied so that a navigation item can EITHER have a link OR act as a node in the menu tree.
 * We don't want them to be BOTH/AND because we don't have mouse hovering on mobile devices
 */
export type INav = XOR<
  { label: string; icon?: string; isFA?: boolean; isExpanded?: boolean; link: string },
  { label: string; icon?: string; isFA?: boolean; isExpanded?: boolean; children: INav[] }
>;

// Aux types to implement XOR logic
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
