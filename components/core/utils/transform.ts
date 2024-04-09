import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { warn } from '../logger';

/**
 * https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/core/util/convert.ts#L34
 */
function propDecoratorFactory<T, D>(
  name: string,
  fallback: (v: T) => D
): (target: NzSafeAny, propName: string) => void {
  function propDecorator(
    target: NzSafeAny,
    propName: string,
    originalDescriptor?: TypedPropertyDescriptor<NzSafeAny>
  ): NzSafeAny {
    const privatePropName = `$$__zorroPropDecorator__${propName}`;

    if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
      warn(`The prop "${privatePropName}" is already exist, it will be overrided by ${name} decorator.`);
    }

    Object.defineProperty(target, privatePropName, {
      configurable: true,
      writable: true
    });

    return {
      get(): string {
        return originalDescriptor && originalDescriptor.get
          ? originalDescriptor.get.bind(this)()
          : this[privatePropName];
      },
      set(value: T): void {
        if (originalDescriptor && originalDescriptor.set) {
          originalDescriptor.set.bind(this)(fallback(value));
        }
        this[privatePropName] = fallback(value);
      }
    };
  }

  return propDecorator;
}

export function toBoolean(value: string | boolean): boolean {
  if (typeof value === 'string') {
    value = value.toLowerCase().trim();
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
  } else if (typeof value === 'boolean') {
    return value;
  }
  throw new Error('Invalid boolean value, should be "true" or "false" or boolean value.');
}

export function toStringExceptEmpty(value: boolean | string | number | null | undefined): string | null {
  if (value === null || value === undefined) {
    return null;
  } else if (['boolean', 'string', 'number'].includes(typeof value)) {
    return value.toString();
  }
  throw new Error('Invalid input value, should be string or boolean or number or null or undefined');
}

export function InputString(): NzSafeAny {
  return propDecoratorFactory('InputString', toStringExceptEmpty);
}
