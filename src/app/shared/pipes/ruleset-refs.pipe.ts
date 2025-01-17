import { Pipe, PipeTransform } from '@angular/core';
import { RulesetRef } from '../models/ruleset-ref';

@Pipe({
  name: 'rulesetRefDisplay',
  standalone: true,
})
export class RulsetRefPipe implements PipeTransform {
  transform(refs: RulesetRef[] | undefined): string {
    let text = '';
    if (refs) {
      refs.forEach((ref) => {
        if (ref.checked) text = text + ref.code + ', ';
      });
    }
    return text;
  }
}
