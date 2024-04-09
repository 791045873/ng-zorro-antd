import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { InputString } from 'qqsl-material/core/utils/transform';

import { InputBoolean } from 'ng-zorro-antd/core/util';

import { QqslSlideNavItemComponent } from './slide-nav-item.component';

@Component({
  selector: 'qqsl-slide-nav',
  template: ` <div></div> `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [QqslSlideNavItemComponent]
})
export class QqslSlideWayComponent {
  // 是否仅启用滑动模式，即不显示左右或上下滑块
  @Input() @InputBoolean() slideMode: boolean = false;
  // 滑动方向,垂直或水平
  @Input({ alias: 'qqslDirection' }) direction: 'horizontal' | 'vertical' = 'horizontal';
  // 滑动内容（slideItem）被选中时的回调函数
  @Output() readonly qmSelectedKeyChange = new EventEmitter<string | null>();
  @Input() @InputString() qmSelectedKey: string | null = null;
}
