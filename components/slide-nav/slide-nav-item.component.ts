import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { InputString } from 'qqsl-material/core/utils/transform';

import { InputBoolean } from 'ng-zorro-antd/core/util';

@Component({
  standalone: true,
  selector: 'qqsl-slid-nav-item',
  template: `
    @if (qmCustomContent) {
      <ng-content></ng-content>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QqslSlideNavItemComponent {
  @Input({ required: true }) @InputString() qmKey!: string;
  @Input() @InputBoolean() qmDisabled: boolean = false;
  @Input() qmTitle?: string;
  @Input() @InputBoolean() qmCustomContent: boolean = false;
}
