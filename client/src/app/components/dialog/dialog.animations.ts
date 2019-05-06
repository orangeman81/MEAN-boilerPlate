import { trigger, transition, style, animate } from '@angular/animations';

export const showContent = trigger('showContent', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(200px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
    ]),
    transition(':leave', [
        animate('0.3s ease-in', style({ opacity: 0, transform: 'translateY(200px)' }))
    ])
]);