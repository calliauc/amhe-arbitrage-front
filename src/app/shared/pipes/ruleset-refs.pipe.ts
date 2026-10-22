import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item';

@Pipe({
  name: 'rulesetRefDisplay',
  standalone: true,
})
export class RulsetRefPipe implements PipeTransform {
  transform(refs: Item[] | undefined): string {
    let text = '';
    if (refs) {
      refs.forEach((ref) => {
        if (ref.checked) text = text + ref.code + ', ';
      });
    }
    return text;
  }
}
