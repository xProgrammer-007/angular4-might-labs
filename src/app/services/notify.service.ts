import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

declare var $:any;
/// Notify users about errors and other helpful stuff


@Injectable()
export class NotifyService {

  notify(from, align , message , color){
  //    const type = ['','info','success','warning','danger'];

    //  const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
            icon: "notifications",
            message: message
            },
            {
            type: color,
            timer: 4000,
            placement: {
            from: from,
            align: align
            }
        });
}

}
