import { trigger, transition, query, style, sequence, animate, group } from '@angular/animations';
import { AnimationsService } from './animations.service';

const animTiming = '1000ms ease-in-out';

// Define animations to run once upon site being loaded
export const appLoadingTrigger = trigger('appLoading', [
  transition(
    ////////////////////////////////////////
    () => !AnimationsService.isSiteLoaded(),
    [
      group([
        query(
          '.content-wrapper',
          [
            style({
              transform: 'translateY(3%)',
              opacity: 0
            }),
            animate(animTiming, style({ transform: 'translateY(0%)', opacity: 1 }))
          ],
          { optional: !true } // Error if not found
        ),
        query(
          '.toolbar-wrapper',
          [
            style({
              transform: 'translateY(-100%)'
            }),
            animate(animTiming, style({ transform: 'translateY(0%)' }))
          ],
          { optional: !true } // Error if not found
        )
      ])
    ]
  )
]);
