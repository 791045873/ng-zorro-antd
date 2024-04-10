import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { moduleList } from './module';

{{imports}}

@NgModule({
  imports     : [
    ShareModule,
    ...moduleList,
    RouterModule.forChild([
      // { path: 'en', component: NzDemo{{component}}EnComponent },
      { path: 'zh', component: QqslDemo{{component}}ZhComponent }
    ])
  ],
  declarations: [
{{declarations}}
  ]
})
export class QqslDemo{{component}}Module {

}
