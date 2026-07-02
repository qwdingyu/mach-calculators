# @usethink/mach-calculators

数控加工工时、切削参数、成本与报价计算器公式库。

本包由原 `@eforge/mach-formulas` 与 `@eforge/mach-calculators` 合并而来。合并后的职责是：

- `formulas`：数控加工公式、成本、工时、切削参数与综合报价计算。
- `schema`：计算器动态表单和结果展示 schema。
- `adapters`：把表单输入适配到公式函数的薄封装。

## 安装

```bash
npm install @usethink/mach-calculators
```

## 使用

```ts
import { calculateComprehensiveQuote } from '@usethink/mach-calculators';

const quote = calculateComprehensiveQuote({
  processingFee: 500,
  materialFee: 200,
  complexity: 'medium',
  precision: 'general',
  surface: 'general',
  batchSize: 100,
  profitMargin: 0.2,
  taxRate: 0.13,
});
```

也可以按模块导入：

```ts
import { calculateComprehensiveQuote } from '@usethink/mach-calculators/formulas';
import { comprehensiveQuoteSchema } from '@usethink/mach-calculators/schema';
import { comprehensiveQuoteAdapter } from '@usethink/mach-calculators/adapters';
```

## 开发

```bash
npm install
npm run type-check
npm test
npm run build
npm pack --dry-run
```

## 发布

发布流程使用 GitHub Actions 中的纯 npm workflow：

1. 确认 `package.json` 版本号已更新。
2. 确认 GitHub 仓库配置了 `NPM_TOKEN` secret。
3. 推送 `v*` tag 触发 `.github/workflows/publish.yml`。
4. 或在 GitHub Actions 手动触发 Publish workflow。

```bash
git tag v0.1.0
git push origin v0.1.0
```

本包不使用 `@usethink/publish-toolkit`。该工具当前版本会在 runner 存在 pnpm 时优先调用 `pnpm publish`，容易与 pnpm v11 的 ignored build scripts 策略冲突；本包的安装、验证、构建和发布均使用 npm。
