import { describe, expect, it } from 'vitest';
import { applyTax, calculateTax, normalizeTaxRate } from '../src/formulas/tax-utils.js';

describe('tax-utils', () => {
  it('支持小数税率和百分比税率输入', () => {
    expect(normalizeTaxRate(0.13)).toBe(0.13);
    expect(normalizeTaxRate(13)).toBe(0.13);
  });

  it('保留 0% 税率，不回退默认税率', () => {
    expect(normalizeTaxRate(0)).toBe(0);
    expect(calculateTax(1000, 0)).toBe(0);
    expect(applyTax(1000, 0)).toBe(1000);
  });
});
