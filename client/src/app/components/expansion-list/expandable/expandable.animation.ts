import {
    trigger,
    style,
    state,
    animate,
    transition,
    query,
    group,
    animateChild,
} from '@angular/animations';

export const showContent = trigger('showContent', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-24px)', height: '0px' }),
        animate('0.2s ease', style({ height: '*' })),
        animate('0.3s ease', style({ opacity: 1, transform: 'translateY(0)' })),
    ]),
    transition(':leave', [
        animate('0.1s ease', style({ opacity: 0, transform: 'translateY(-24px)', height: '0px' }))
    ])
]);
export const rotateIcon = trigger('rotateIcon', [
    state('down', style({
        transform: 'rotate(0)'
    })),
    state('up', style({
        transform: 'rotate(180deg)'
    })),
    transition('down <=> up', [
        animate('0.3s ease')
    ])
]);
export const openList = trigger('openList', [
    state('open', style({
        height: '*'
    })),
    state('closed', style({
        height: '56px'
    })),
    transition('open <=> closed, void => closed', group([
        query('@rotateIcon', animateChild(), { optional: true }),
        query('@showContent', animateChild(), { optional: true }),
        animate('0.3s ease'),
    ]))
]);
