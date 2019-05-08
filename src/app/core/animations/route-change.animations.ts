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
const footerHeightPxls = 60; // Make sure this equals value given in SCSS

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
        // First, shrink footer
        query(
          '.footer-wrapper',
          [
            style({
              //
              overflow: 'hidden'
            }),
            animate(
              '0.5s ease-in-out',
              style({
                //
                marginTop: footerHeightPxls
                // height: 0
                // minHeight: 0
              })
            )
          ],
          {
            optional: true
          }
        ),

        ////
        // Shift new page out of sight
        query(
          ':enter, :leave',
          [
            style({
              opacity: 0,
              position: 'absolute',
              transform: 'translateX(-200%)'
            }),
            animate(1)
          ],
          {
            optional: true
          }
        ),
        // Shift targeted elements within new page out of sight
        query(
          ':enter .' + ROUTE_ANIMATIONS_ELEMENTS,
          style({
            opacity: 0,
            transform: 'translateX(-200%)'
          }),
          {
            optional: true
          }
        ),

        ////

        group([
          /////////////////

          /////////////////
          query(
            ':leave',
            [
              style({ transform: 'translateY(0%)', opacity: 1 }),
              animate('0.5s ease-in-out', style({ transform: 'translateY(3%)', opacity: 0 })),
              style({ position: 'relative', display: 'none' })
            ],
            { optional: true }
          )
        ]),
        group([
          // Animate new page into view
          query(
            ':enter',
            [
              style({
                //
                transform: 'translate(0%, 3%)',
                position: 'relative'
              }),
              animate(
                '0.5s ease-in-out',
                style({
                  //
                  transform: 'translateY(0%)',
                  opacity: 1,
                  position: 'relative'
                })
              )
            ],
            { optional: true }
          )
        ]),
        // Restore footer:

        query(
          '.footer-wrapper',
          [
            // style({
            //   //
            //   overflow: 'hidden'
            // }),
            animate(
              '0.5s ease-in-out',
              style({
                marginTop: 0
                // height: footerHeightPxls
              })
            )
          ],
          {
            optional: true
          }
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
      ]),
      query(
        ':enter',
        style({
          position: 'relative'
        }),
        {
          optional: true
        }
      )
    ]
  )
]);
