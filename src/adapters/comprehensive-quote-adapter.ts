/**
 * 综合报价公式适配器。
 *
 * 将表单/schema 输入转换为 calculateComprehensiveQuote 的强类型参数，
 * 并统一包装为计算器渲染层可消费的成功/失败结果。
 */
import { calculateComprehensiveQuote } from '../formulas/comprehensive-quote.js';
import type { CalculationResult } from '../schema/calculator-schema.js';

export interface ComprehensiveQuoteAdapterInput {
  processingFee?: number | string;
  materialFee?: number | string;
  complexity?: string;
  precision?: string;
  surface?: string;
  batchSize?: number | string;
  profitMargin?: number | string;
  taxRate?: number | string;
}

/**
 * 综合报价公式适配器。
 */
export function comprehensiveQuoteAdapter(
  params: ComprehensiveQuoteAdapterInput,
): CalculationResult {
  try {
    const formulaParams = {
      processingFee: Number(params.processingFee) || 0,
      materialFee: Number(params.materialFee) || 0,
      complexity: params.complexity || 'medium',
      precision: params.precision || 'general',
      surface: params.surface || 'general',
      batchSize: Number(params.batchSize) || 1,
      profitMargin: (Number(params.profitMargin) || 20) / 100,
      taxRate: (Number(params.taxRate) || 13) / 100,
    };

    return {
      success: true,
      data: calculateComprehensiveQuote(formulaParams) as unknown as Record<string, unknown>,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '计算失败',
    };
  }
}
