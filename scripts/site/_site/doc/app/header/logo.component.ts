import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a href="/" id="logo">
      <strong>青清水利前端组件库（基于NG-ZORRO）</strong>
    </a>
  `,
  styles: [
    `
      #logo strong {
        font-weight: 500;
        background: linear-gradient(to right, #8514f5, #f637e3, #fa2c05);
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `
  ]
})
export class LogoComponent {}
