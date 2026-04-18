# 设计文档（Design）

> 项目：怀来中基锡安 300 辆矿山新能源运输车 官方网站
> 版本：v1.0（基于 v2.3 商业计划书）
> 编写日期：2026-04-19
> 关联文档：[requirements.md](./requirements.md) → [tasks.md](./tasks.md)

## 1. 设计理念（Design Principles）

| 关键词 | 含义 |
|---|---|
| **Industrial Chic（工业高奢）** | 以矿区/能源工业为底座，强调材质感（钢、岩、玻璃幕墙、电弧光），避免互联网产品的"轻飘"风格 |
| **Data as Hero（数据即主角）** | 关键 KPI（5.45 亿、+1.90 亿、12.9%、31,383 t）以超大字号、字间距、动态计数器作为视觉主体 |
| **Cinematic（电影叙事）** | 全屏分镜、滚动驱动动效、视差、Hero Ken Burns、关键过渡使用渐变光 |
| **Trustworthy（可信赖）** | 每个数据点旁标注章节锚点（如 "§10.6"），底部一律可追溯到商业计划书 |
| **Restraint（克制的高级）** | 配色不超过 5 种、字体仅 2 套、留白与负空间充足；高级感来自比例与节奏，不是装饰 |

## 2. 视觉系统

### 2.1 色板（Color Tokens）

| Token | 色值 | 含义 |
|---|---|---|
| `--ink-900` | `#0A0E1A` | 主背景（深空蓝/近黑），用于 Hero、深色区段 |
| `--ink-800` | `#111827` | 次背景，卡片底 |
| `--ink-700` | `#1F2937` | 分割面 |
| `--steel-500` | `#64748B` | 中性灰文字（次要） |
| `--bone-50` | `#F8FAFC` | 浅色背景（替代纯白） |
| `--bone-100` | `#EEF2F7` | 浅色卡片底 |
| `--accent-h2` | `#22D3EE` | 氢能（电青蓝）—— 用于 H2 主题 |
| `--accent-ev` | `#A3E635` | 电动（电力黄绿）—— 用于 EV 主题 |
| `--accent-gold` | `#D4A24C` | 商业/财务（金箔金）—— NPV/IRR 等正向数据 |
| `--accent-emerald` | `#10B981` | ESG/碳（碳信用绿） |
| `--accent-flame` | `#F97316` | 警示/风险/红线 |
| `--line` | `#1E293B` / `rgba(255,255,255,0.08)` | 边框、分隔线 |

> 全站采用 **暗色主导（深空蓝 #0A0E1A 基底）+ 浅色穿插（CAPEX/技术对照页使用 #F8FAFC 反白章节）**。
> 数据图表使用 `--accent-h2`、`--accent-ev`、`--accent-gold`、`--accent-emerald` 4 色循环。

### 2.2 字体（Typography）

- **正文中文**：`'Noto Sans SC', '思源黑体', system-ui` —— 自托管或 Google Fonts CDN（v1.0 自托管字体子集化）
- **数字与英文 / 衬线标题**：`'Inter Variable'` + `'Manrope'`
- **大屏数字（KPI 计数器）**：`'JetBrains Mono Variable'` 或 `'Geist Mono'`，等宽显得严谨
- 字阶（Type scale，桌面端）：

| Token | 字号 | 行高 | 用途 |
|---|---|---|---|
| `--text-mega` | 96-160 px (clamp) | 1.0 | Hero 主数字、Dashboard 大数 |
| `--text-display` | 56-72 px | 1.05 | 页面 H1 |
| `--text-h1` | 40-48 px | 1.15 | Section 标题 |
| `--text-h2` | 28-32 px | 1.25 | 卡片标题 |
| `--text-body-lg` | 18-20 px | 1.6 | 正文大字 |
| `--text-body` | 16 px | 1.65 | 默认正文 |
| `--text-caption` | 13-14 px | 1.4 | 标签、章节锚点 |

### 2.3 形状与材质

- 圆角：12 / 16 / 20 px 三档；卡片默认 16 px
- 描边：`1px solid rgba(255,255,255,0.06)`，深色面常用
- 阴影：仅用于浅色面 / 特定弹层；深色面使用"内发光"或"细高光线"
- 玻璃质感（仅 Hero/Dashboard 浮层）：`backdrop-filter: blur(18px) saturate(140%)`，背景 `rgba(255,255,255,0.04)`
- 网格线：12 列网格；外边距 desktop ≥ 96 px、tablet 48 px、mobile 20 px
- 绘制装饰：电力线/管道矢量、等高线、矿石纹理；只在 Hero 与章节分隔出现，绝不堆砌

### 2.4 动效（Motion）

- 滚动揭示（IntersectionObserver + framer-motion `whileInView`），距离 24 px、时长 600 ms、easing `cubic-bezier(0.22,1,0.36,1)`
- 数字计数器（`react-countup` 或自实现）触发于进入视口
- Hero parallax 与 Ken Burns 持续 18-24 秒缓慢循环
- prefers-reduced-motion 时全部退化为 0 ms 直接显示

## 3. 信息架构（IA）与导航

### 3.1 顶级路由

```
/                       首页
/overview               项目概览
/site                   厂址与资源
/policy                 市场与政策
/technology             技术与配比
/system                 制储加电体系
/finance                投资与财务
/esg                    ESG 与碳收益
/roadmap                实施路径
/dashboard              项目大屏
/about                  关于业主与项目（信息卡片，可选）
```

### 3.2 顶部导航

- 固定 Header，高 72 px；滚动后变 56 px 紧凑模式
- 左：Logo + 项目缩写 "怀来 · 300 重卡 · v2.3"
- 中：8 个一级菜单（Home/Overview/Site/Policy/Technology/System/Finance/Roadmap）
- 右：「进入大屏 ↗」CTA 按钮 + ESG/Finance 内嵌锚点
- 移动端：抽屉式菜单 + 底部固定 CTA

### 3.3 全局组件清单（Component Inventory）

| 组件 | 用途 |
|---|---|
| `<SiteHeader />` | 顶部导航 |
| `<SiteFooter />` | 页脚（版权 + 章节索引 + 数据来源声明） |
| `<Hero />` | Hero 大区，可配置背景图/视频 |
| `<Section />` | 标准 section（含 eyebrow / title / lede / actions / source ref） |
| `<KpiCard />` | KPI 卡片（数字 + 单位 + label + delta + source） |
| `<KpiCounter />` | 数字滚动 |
| `<DataTable />` | 强排版数据表，支持高亮行/列 |
| `<ChartBar />` `<ChartLine />` `<ChartPie />` `<ChartRadar />` `<ChartWaterfall />` `<ChartGantt />` | 基于 Recharts/Visx 封装 |
| `<Timeline />` | 三阶段实施 |
| `<MapHuailai />` | 项目区位地图（SVG 静态地图 + leaflet 占位为 v2） |
| `<H2CostBridge />` | 综合氢成本三层叠加桥接 |
| `<MixComparator />` | 5 方案六维雷达 + 表 |
| `<DashboardTile />` | 大屏单元格 |
| `<SourceRef />` | 章节锚点（"§10.6"） |
| `<RedlineCallout />` | 红线警示卡（v2.3 四条红线） |
| `<ScrollProgress />` | 顶部 1px 进度条 |

## 4. 技术栈（Tech Stack）

| 层 | 选择 | 备注 |
|---|---|---|
| 框架 | **Next.js 15.x（App Router）** + React 18 + TypeScript（strict） | 兼容 Netlify Static Export；后续可升级 Next 16 |
| 样式 | **Tailwind CSS 4.x**（CSS-first 配置） + 设计 token | 使用 `@theme` 定义 token |
| UI 基础 | **自建 + 选择性引入 Radix Primitives** | 不强依赖 shadcn 全套；仅必要时使用 |
| 图表 | **Recharts**（主） + 轻量自绘 SVG（瀑布、桑基、雷达可用 visx 或 echarts-for-react） | 大屏一些花式可视化用 ECharts |
| 动效 | **Framer Motion** | 仅做滚动/数字/淡入 |
| 图标 | **lucide-react** | |
| 字体 | next/font (Noto Sans SC / Inter / JetBrains Mono) | 自托管 |
| 测试 | 仅做手动 + Lighthouse | v1.0 不引入单测 |
| 部署 | **Netlify**（`@netlify/plugin-nextjs`） + GitHub Actions（可选） | next.config 使用默认 SSG/ISR |
| 包管 | npm | 与现有环境一致 |

## 5. 目录结构

```
app/
  layout.tsx
  page.tsx                       (Home)
  overview/page.tsx
  site/page.tsx
  policy/page.tsx
  technology/page.tsx
  system/page.tsx
  finance/page.tsx
  esg/page.tsx
  roadmap/page.tsx
  dashboard/page.tsx
  globals.css
components/
  layout/
    site-header.tsx
    site-footer.tsx
    scroll-progress.tsx
  primitives/
    section.tsx
    kpi-card.tsx
    counter.tsx
    source-ref.tsx
    redline-callout.tsx
    data-table.tsx
  charts/
    chart-bar.tsx
    chart-line.tsx
    chart-pie.tsx
    chart-radar.tsx
    chart-waterfall.tsx
    chart-gantt.tsx
    chart-area.tsx
  features/
    hero-home.tsx
    kpi-grid-home.tsx
    mix-comparator.tsx
    h2-cost-bridge.tsx
    capex-treemap.tsx
    npv-paths-table.tsx
    timeline-roadmap.tsx
    map-huailai.tsx
    dashboard-grid.tsx
    redlines-banner.tsx
lib/
  data/
    project.ts            (顶层 KPI、定位文案)
    site.ts               (区位、气候、土地)
    policy.ts             (四级政策、市场对标)
    technology.ts         (氢电对比、配比枚举、雷达)
    h2.ts                 (制氢、加氢、综合氢成本)
    charging.ts           (充电、换电)
    capex.ts              (一次性投资)
    opex.ts               (运营成本)
    finance.ts            (NPV/IRR/优化路径/敏感性)
    esg.ts                (减排/评级/绿色金融)
    roadmap.ts            (三阶段、里程碑、标段、组织)
    dashboard.ts          (大屏数据生成器)
  utils/
    format.ts             (千分位、单位、百分比)
    cn.ts                 (className 合并)
    motion.ts             (motion variants)
public/
  images/                 (生成或下载的图片资源)
  og/                     (OG 图)
```

## 6. 数据层契约（Data Contracts）

> 全部静态（TypeScript 模块导出），编译时被 Next 内联；不做数据库/API 调用。

```ts
// lib/data/project.ts
export const PROJECT = {
  name: '怀来中基锡安 300 辆矿山新能源运输车项目',
  shortName: '怀来 · 300 重卡',
  version: 'v2.3',
  owner: '怀来中基锡安新型石材科技有限责任公司',
  location: '河北省张家口市怀来县土木镇',
  oneLiner: '矿区氢能 + 电动重卡 一体化纯商业项目',
  positioning: '商业 ROI 优先 / 电氢完全分离 / 无氢外售',
  buildPeriodMonths: 24,
  evalPeriodYears: 10,
} as const

export const HEADLINE_KPIS = [
  { id: 'capex', label: '总投资',    value: 5.45, unit: '亿元', delta: '-1,728 万 vs v2.2', src: '§9.1' },
  { id: 'npv',   label: '净现值（推荐+PPA）', value: 1.90, unit: '亿元', src: '§10.6' },
  { id: 'irr',   label: '内部收益率', value: 12.9, unit: '%', src: '§10.6' },
  { id: 'dpp',   label: '动态投资回收期', value: 7.0, unit: '年', src: '§10.6' },
  { id: 'mix',   label: '推荐车队配比', value: '200 / 100', unit: '氢 / 电', src: '§8.1' },
  { id: 'co2',   label: '年减排', value: 31383, unit: 'tCO₂e', src: '§12.2.3' },
] as const
```

类似的强类型数据模块用于其他页（详见 lib/data/* 实际实现）。

## 7. 关键页面的"导演剧本"（Narrative Storyboards）

### 7.1 首页

```
[Hero 90vh]
  Background: 深空蓝渐变 + 矿区 Ken Burns 大图（叠加细电力线/电弧矢量）
  Eyebrow:   v2.3 · 商业 ROI 优先 · 电氢完全分离 · 无氢外售
  Title:     200 辆氢能 + 100 辆电动 重塑矿山运输
  Lede:      在张家口怀来矿区，建设绿氢制储加 + 新能源重卡 + 矿区充电
             一体化纯商业项目，10 年实现矿区运输零碳化
  Actions:   [查看商业可行性] [进入大屏 ↗]
  KPIRow:    6 张玻璃卡（5.45 亿 / +1.90 亿 / 12.9% / 7.0 年 / 200+100 / 31,383 t）

[Section: 项目要览]    项目尺度卡 + v2.3 关键修订时间线
[Section: 三大配置对比] 横向 3 卡：300 全电 vs 200+100 vs 300 全氢
[Section: 推荐 vs 推荐+PPA] 双柱对比图
[Section: 投资板块占比]   Treemap + 资金来源饼
[Section: 实施路径预览]   迷你三阶段甘特
[Section: ESG 价值]       3 大数字（减排 / 评级 / 利息节约）
[Section: CTA]            "进入项目大屏 →"
```

### 7.2 大屏 Dashboard

```
全屏 16:9 暗色基底，9 宫格 + 顶栏 + 底栏

[顶栏] 项目时间 · 当前阶段 · 累计运营天数 · 实时时钟 · 全屏播放开关

[左列]
  - 车队总览（300 / 在线 / 出勤率仪表）
  - 制氢负载实时（28 MW，今日累计 t、绿证覆盖率）
  - 加氢吞吐（3 站日加注 kg）

[中列]
  - 大数字 KPI 矩阵（4 张：今日吞吐量、当月营收、当月碳减排、达标率）
  - 矿区运输线路 SVG（200km 中途 + 矿区短倒），动态车流光点
  - 财务瀑布微缩图

[右列]
  - 充电峰值 8.4 MW 实时
  - 当月 OPEX 拆解
  - 风险预警 / 红线监控
  - ESG 评分仪表

[底栏] 滚动播报：里程碑/政策/订单
```

## 8. 图像策略（Imagery）

由于项目为 v2.3 立项前期，无真实运营照片。采用 **AI 生成 + 公开素材库下载** 混合：

- **AI 生成（GenerateImage 工具）** 主导：
  - Hero 主图（矿区夜景，光带链接车队/电站/管道，深蓝调）
  - 各页 hero（厂址俯瞰、电解槽阵列、加氢站、超充桩、风光基地、绿氢罐区）
  - Dashboard 顶部背景纹理
- **次要图像**（图标/Pattern）使用 lucide-react、自绘 SVG
- 所有图片放置 `public/images/`，使用 next/image 进行 AVIF 压缩与响应式

> 所有图片标注"概念示意图（AI 生成 / 公开素材）"以保证合规与可信度。

## 9. 大屏数据模拟（Dashboard Data Generator）

```ts
// lib/data/dashboard.ts
// 基于商业计划书目标值生成"伪实时"曲线，每 5 秒推进一拍
export function generateLiveSeries(seed: number) { ... }
```

- 制氢功率：在 18-26 MW 之间正弦摆动，叠加噪声
- 加氢吞吐：白天 3 站合计 1,500-2,400 kg/h
- 充电桩：7.2-9.8 MW 峰值
- 营收/减排：按项目稳态目标线性累加
- 客户端 useEffect 启动 setInterval；停留时长 ≤ 10 分钟，避免内存增长

## 10. SEO 与 OG

- `<Metadata />`：每页设置 title/description/openGraph/twitter
- 自动生成 OG 图：Hero 文字 + 关键 KPI（v1.0 静态 PNG，预制于 `/public/og/`）
- `JSON-LD`：Organization、Project、BreadcrumbList

## 11. 部署（Netlify）

- 仓库根包含 `netlify.toml`：`[build] command = "npm run build"`，`publish = ".next"`，`[[plugins]] package = "@netlify/plugin-nextjs"`
- Node 22.x；`NEXT_TELEMETRY_DISABLED=1`
- Netlify 自动选择 `@netlify/plugin-nextjs` 处理 SSG + ISR
- 自动 PR 预览 / 主分支生产

## 12. GitHub

- 仓库名建议：`huailai-300-trucks-website`
- 默认分支：`main`
- README 包含：项目摘要、快速开始、目录、部署指南、Spec 链接

## 13. 风险与回退

| 风险 | 缓解 |
|---|---|
| 图片生成质量参差 | 至少 2 张 hero 备选；启动时离线预生成 |
| Tailwind v4 与 Recharts 兼容 | 使用 Recharts 默认渲染，必要时手写 ResponsiveContainer 包装 |
| Netlify Next 适配器变动 | 同时验证 `next build` + `next start`，必要时退回静态导出 + 客户端动效 |
| 中文字体大小 | 字体子集化 + 仅加载 4 字重 |
