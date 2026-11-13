import { esc, money, amountWords } from '../src/js/nb.js';

export default {
  title: 'Figures/Money field',
  args: { label: 'Value today', amount: 425000, words: true, error: '' },
  argTypes: { amount: { control: { type: 'number', step: 100 } } },
  render: ({ label, amount, words, error }) => `<div class="story-frame"><div class="nb-field"><label class="nb-field__label" for="mf">${esc(label)}</label>
    <div class="nb-money"><span class="nb-money__unit" aria-hidden="true">£</span><input class="nb-money__input" id="mf" inputmode="decimal" value="${esc(money(amount).slice(1))}"${error ? ' aria-invalid="true" aria-describedby="mf-err"' : words ? ' aria-describedby="mf-w"' : ''}></div>
    ${error ? `<p class="nb-field__error" id="mf-err" role="alert">${esc(error)}</p>` : words ? `<p class="nb-field__words" id="mf-w">${esc(amountWords(amount))}</p>` : ''}</div></div>`,
  parameters: { docs: { description: { component: 'The pound sign sits outside the input. `amountWords()` reads the amount back in words; `money()` formats it. Turn on Help with numbers in the toolbar for wider digit spacing.' } } },
};

export const MoneyField = {};
export const WithoutWords = { args: { words: false, label: 'Mortgage still owed', amount: 182400 } };
export const WithError = { args: { error: 'Use numbers only, like 182,400.' } };

export const Sum = {
  args: { label: 'Equity before costs', a: 425000, b: 182400 },
  render: ({ label, a, b }) => `<div class="story-frame"><div class="nb-sum"><span><span class="nb-sum__label">${esc(label)}</span><span class="nb-sum__working">${esc(money(a))} − ${esc(money(b))}</span></span><strong class="nb-sum__total">${esc(money(a - b))}</strong></div></div>`,
};
