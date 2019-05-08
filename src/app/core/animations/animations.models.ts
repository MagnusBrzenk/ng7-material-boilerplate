export interface IAnimEvent {
  disabled: boolean;
  element: any;
  fromState: string;
  phaseName: 'start' | 'done';
  toState: string;
  totalTime: number;
  triggerName: string;
}
