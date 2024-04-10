import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewEncapsulation,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReplaySubject, Subject, map, takeWhile, zip } from 'rxjs';

import { InputString } from 'qqsl-material/core/utils/transform';

import { QqslSlideNavItemComponent } from './slide-nav-item.component';

export interface QqslSlideDataInterface {
  key: string;
  title: string;
}

export function defined<T>(value: T | null | undefined): boolean {
  return value !== null && value !== undefined;
}

@Component({
  selector: 'qqsl-slide-nav',
  template: `
    <div [ngClass]="{}">
      <div>
        @if (useCustomContent$ | async) {
          <ng-content></ng-content>
        } @else {
          @for (item of qqslSlideData; track item.key) {
            <qqsl-slide-nav-item [qqslKey]="item.key" [qqslTitle]="item.title" />
          }
        }
      </div>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [QqslSlideNavItemComponent, CommonModule]
})
export class QqslSlideNavComponent implements AfterContentInit, OnChanges, OnInit {
  // 滑动方向,垂直或水平
  @Input({ alias: 'qqslDirection' }) direction: 'horizontal' | 'vertical' = 'horizontal';
  // 滑动内容（slideItem）被选中时的回调函数
  @Output() readonly qqslSelectedKeyChange = new EventEmitter<string | null>();
  @Input() @InputString() qqslSelectedKey: string | null = null;
  @Input() qqslSlideData?: QqslSlideDataInterface[];

  @ContentChildren(QqslSlideNavItemComponent) slideItems!: QueryList<QqslSlideNavItemComponent>;

  public useCustomContent$ = new Subject<boolean>();
  private useCustomContent = false;
  private slideData$ = new ReplaySubject<QqslSlideDataInterface[]>(1);
  private sildeItem$ = new ReplaySubject<QqslSlideNavItemComponent[]>(1);
  private destroyRef = inject(DestroyRef);
  ngOnChanges(changes: SimpleChanges): void {
    const data = changes['qqslSlideData'];
    if (data) {
      if (data.isFirstChange()) {
        this.useCustomContent = false;
      }
      this.slideData$.next(data.currentValue);
    }
  }

  ngOnInit(): void {
    // 根据初始化时传入的是数据data还是自定义内容，决定使用何种方式渲染，若两种都传入，默认使用数据
    zip([this.slideData$.pipe(map(res => defined(res))), this.sildeItem$.pipe(map(res => defined(res)))])
      .pipe(
        takeWhile((res: [boolean, boolean]) => res[0] || res[1]),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(([useData, useItem]) => {
        if (useData && !useItem) {
          this.useCustomContent = false;
        } else if (!useData && useItem) {
          this.useCustomContent = true;
        } else {
          this.useCustomContent = false;
        }
        this.useCustomContent$.next(this.useCustomContent);
        this.useCustomContent$.complete();
      });
  }

  ngAfterContentInit(): void {
    throw new Error('Method not implemented.');
  }
}
