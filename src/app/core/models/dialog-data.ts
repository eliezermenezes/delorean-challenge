import { Subject } from 'rxjs';

export interface DialogData {
    msg: string;
    subject?: Subject<boolean>;
}
