import { isEmpty } from 'class-validator';
import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 */
@Pipe({ name: 'nullValueString' })
export class NullValueStringPipe implements PipeTransform {
  transform(value: string, exponent?: string): string {
    if (isEmpty(value)) return isEmpty(exponent) ? '--' : exponent;
    else return value;
  }
}
