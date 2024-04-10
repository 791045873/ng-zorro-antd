import { ChangeDetectionStrategy, Component, HostListener, Input, ViewEncapsulation } from '@angular/core';

import { InputString } from 'qqsl-material/core/utils/transform';

import { InputBoolean } from 'ng-zorro-antd/core/util';

import { QqslSlideNavService } from './slide-nav.service';

@Component({
  standalone: true,
  selector: 'qqsl-slide-nav-item',
  template: `
    @if (qqslCustomContent) {
      <ng-content></ng-content>
    } @else {
      <span class="qqsl-slide-nav-item-inner-title">{{ qqslTitle ?? '' }}</span>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QqslSlideNavItemComponent {
  @Input({ required: true }) @InputString() qqslKey!: string;
  @Input() @InputBoolean() qqslDisabled: boolean = false;
  @Input() qqslTitle?: string;
  @Input() @InputBoolean() qqslCustomContent: boolean = false;

  constructor(private service: QqslSlideNavService) {}

  @HostListener('click', ['$event'])
  onClick(): void {
    this.service.emitItemClick(this.qqslKey);
  }
}
