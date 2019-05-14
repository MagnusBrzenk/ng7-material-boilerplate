import {
  animate,
  query,
  style,
  transition,
  trigger,
  stagger,
  sequence,
  group
} from '@angular/animations';
import { AnimationsService } from './animations.service';

// Add page route here to prevent animations on route changes to/from that page
const excludeAnimToPages: string[] = [];
const excludeAnimFromPages: string[] = [];

// Class name to add to individual elements within pages you want to 'stagger-animate' in
export const ROUTE_ANIMATIONS_ELEMENTS = 'route-animations-elements';

export function exportedFunction(stateFrom: string, stateTo: string) {
  if (excludeAnimToPages.includes(stateTo)) return false;
  if (excludeAnimFromPages.includes(stateFrom)) return false;
  return !!AnimationsService.isSiteLoaded();
}

// Define animations triggered on route changes for pages and individual elements
export const routeChangeTrigger = trigger('routeChangeAnimations', [
  transition(
    // Logic to decide if any animation will happen on state change
    exportedFunction,
    [
      sequence([
        // Hide new 'entry' content
        query(
          ':enter',
          [
            style({
              opacity: 0,
              transform: 'translateX(-200%)',
              position: 'fixed'
            })
          ],
          { optional: true }
        ),

        // Hide targeted elements within new page
        query(
          ':enter .' + ROUTE_ANIMATIONS_ELEMENTS,
          style({
            opacity: 0,
            transform: 'translateX(-200%)'
          }),
          { optional: true }
        ),

        // Animate old page out of view
        query(
          ':leave',
          [
            style({
              transform: 'translateY(0%)',
              opacity: 1
            }),
            animate(
              '0.25s ease-in-out',
              style({
                transform: 'translateY(3%)',
                opacity: 0
              })
            )
          ],
          { optional: true }
        ),

        // Animate new page into view
        query(
          ':enter',
          [
            style({
              transform: 'translate(0%, 3%)'
            }),
            animate(
              '0.25s ease-in-out',
              style({
                transform: 'translateY(0%)',
                opacity: 1
              })
            )
          ],
          { optional: true }
        ),

        // Animate targeted elements within new page into view
        query(
          ':enter .' + ROUTE_ANIMATIONS_ELEMENTS,
          [
            stagger('0.15s ease-in-out', [
              style({ transform: 'translate(0%, 3%)', opacity: 0 }),
              animate(
                '0.15s ease-in-out',
                style({ transform: 'translateY(0%)', opacity: 1, position: 'relative' })
              )
            ])
          ],
          { optional: true }
        )
      ])
    ]
  )
]);
