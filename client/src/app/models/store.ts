import { Observable, BehaviorSubject } from 'rxjs';

export class Store<T> {
    ////////////////////////////////////////// LEGEND ///////////////////////////////////////////////
    /// $ at the end = Subject /// $ at the beginning = Obsrvable /// S at the end = Subscription ///
    /////////////////////////////////////////////////////////////////////////////////////////////////
    private state$: BehaviorSubject<T>;
    public $state: Observable<T>;

    protected constructor(inistialState: T) {
        this.state$ = new BehaviorSubject<T>(inistialState);
        this.$state = this.state$.asObservable();
    }

    get state() {
        return this.state$.getValue();
    }

    set state(next: T) {
        this.state$.next(next);
    }
}