# 怀来 300 辆矿山新能源运输车项目 · 官方网站

基于《商业计划书》**v2.3**（电氢完全分离 / 商业 ROI 优先 / 无氢外售）构建的正式路演与项目展示站点：多章节深度内容、数据锚点（§章节）、**项目大屏**（伪实时运营示意）与 Netlify 部署配置。

## 技术栈

- [Next.js 15](https://nextjs.org/)（App Router）+ React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion、Recharts、Lucide

## 本地开发

```bash
npm install --include=dev
npm run dev
```

浏览器访问 `http://localhost:3000`。

## 构建

```bash
npm run build
npm run start
```

## Kiro Spec 工作流

- 需求：[`.kiro/specs/website/requirements.md`](.kiro/specs/website/requirements.md)
- 设计：[`.kiro/specs/website/design.md`](.kiro/specs/website/design.md)
- 任务：[`.kiro/specs/website/tasks.md`](.kiro/specs/website/tasks.md)

## 部署（Netlify）

1. 将本仓库推送到 GitHub。
2. 在 [Netlify](https://www.netlify.com/) 新建 Site → Import from Git → 选择仓库。
3. 构建设置使用仓库根目录的 `netlify.toml`（`@netlify/plugin-nextjs`）。
4. 生产环境建议将 `app/layout.tsx` 中的 `metadataBase` / `robots.ts` / `sitemap.ts` 内的域名替换为您的自定义域名。

配图位于 `public/images/`，部分为 **AI 生成概念图**（见页脚声明）。

## 许可证

MIT（网站代码）。商业计划书正文版权归业主所有。
