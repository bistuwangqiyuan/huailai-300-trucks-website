# 实施任务清单（Tasks）

> 项目：怀来中基锡安 300 辆矿山新能源运输车 官方网站
> 版本：v1.0（基于 v2.3 商业计划书）
> 编写日期：2026-04-19
> 关联文档：[requirements.md](./requirements.md) · [design.md](./design.md)

> 任务粒度：单个任务 ≤ 0.5 天（mock 估时）；标记 ✅ 表示完成；保持「单一活跃任务」节奏。

## A. 工程脚手架与基础设施

- [ ] **T-A1** Next.js 15（App Router）+ TypeScript（strict）+ ESLint 初始化
- [ ] **T-A2** Tailwind CSS 4 集成；`@theme` 写入设计 token；`globals.css` 全局样式
- [ ] **T-A3** 字体（Noto Sans SC / Inter / JetBrains Mono）next/font 配置
- [ ] **T-A4** 安装依赖：framer-motion / lucide-react / recharts / clsx / class-variance-authority
- [ ] **T-A5** 目录结构创建（app/components/lib/public/images）
- [ ] **T-A6** netlify.toml + @netlify/plugin-nextjs；Node 22 配置
- [ ] **T-A7** README + .gitignore + LICENSE（MIT）

## B. 设计系统与基础组件

- [ ] **T-B1** Token 注入（颜色、字阶、圆角、阴影、间距）
- [ ] **T-B2** `<Section />` 标准容器（eyebrow/title/lede/source）
- [ ] **T-B3** `<KpiCard />` + `<Counter />`（IntersectionObserver 触发）
- [ ] **T-B4** `<DataTable />` 强排版表格
- [ ] **T-B5** `<SourceRef />` 章节锚点 chip
- [ ] **T-B6** `<RedlineCallout />` 红线警示卡
- [ ] **T-B7** `<ScrollProgress />` 顶部进度条
- [ ] **T-B8** Motion presets（fadeUp / cinematic / cinematicScale）

## C. 布局与导航

- [ ] **T-C1** `<SiteHeader />` 含滚动收缩；移动端抽屉
- [ ] **T-C2** `<SiteFooter />` 含全章索引、数据来源声明、版权
- [ ] **T-C3** 全局 layout.tsx 注入字体/scroll-progress/header/footer
- [ ] **T-C4** 路由占位（11 个路由全部建出空页与 metadata）

## D. 数据层（lib/data/*.ts）

- [ ] **T-D1** project.ts（HEADLINE_KPIS / 项目要览 / v2.3 修订）
- [ ] **T-D2** site.ts（区位 / 气候 / 土地分配 / 1 GW 电站独立资产警示）
- [ ] **T-D3** policy.ts（四级政策 / 示范任务 / 市场对标 / 价格趋势）
- [ ] **T-D4** technology.ts（氢电对比 / 配比枚举 / 雷达 / 五方案对比）
- [ ] **T-D5** h2.ts（28 MW 制氢 / 加氢站 / 综合氢成本桥接 / 氧气）
- [ ] **T-D6** charging.ts（30 桩 / 1 换电站 / 配电峰值）
- [ ] **T-D7** capex.ts（总投 5.45 亿 / 板块明细 / 资金来源）
- [ ] **T-D8** opex.ts（年 OPEX 2.31 亿 / G1 G2 H 拆解 / 14 子项）
- [ ] **T-D9** finance.ts（NPV 优化路径 / 10 年现金流 / 敏感性临界 / 同类对标）
- [ ] **T-D10** esg.ts（年减排 31,383 t / 评级 / 535 人就业 / 绿色金融）
- [ ] **T-D11** roadmap.ts（三阶段 / 30+ 里程碑 / 8 标段 / 组织架构）
- [ ] **T-D12** dashboard.ts（伪实时数据生成器：sin + noise + 累加器）

## E. 图表组件

- [ ] **T-E1** `<ChartBar />` 柱状（含分组/堆叠）
- [ ] **T-E2** `<ChartLine />` 折线
- [ ] **T-E3** `<ChartArea />` 面积
- [ ] **T-E4** `<ChartPie />` 饼/环
- [ ] **T-E5** `<ChartRadar />` 雷达（六维方案对比）
- [ ] **T-E6** `<ChartWaterfall />` 瀑布（自绘 SVG）
- [ ] **T-E7** `<ChartGantt />` 甘特（自绘 SVG）
- [ ] **T-E8** `<ChartTreemap />` Treemap（投资板块）
- [ ] **T-E9** `<ChartGauge />` 仪表（出勤率/评级）
- [ ] **T-E10** `<ChartSankey />` 简化能量流（电网→制氢→氢车 / 电网→充电→电车）

## F. 图像资产

- [ ] **T-F1** Hero 主图（矿区夜景 + 重卡车队 + 远处风光基地，深空蓝调）
- [ ] **T-F2** 厂址俯瞰图（怀来矿区，山地+石材开采+广袤土地）
- [ ] **T-F3** 制氢厂区图（电解槽阵列 + 储氢罐 + 高压管道）
- [ ] **T-F4** 加氢站图（35 MPa 加氢站，重卡正在加氢）
- [ ] **T-F5** 超充桩图（液冷超充阵列）
- [ ] **T-F6** 氢能重卡图（49T 牵引车，工业风）
- [ ] **T-F7** 电动重卡图（49T 自卸/牵引，矿区）
- [ ] **T-F8** 风光基地图（远景 1 GW 风光电站，作为独立资产示意）
- [ ] **T-F9** 政策/官方氛围图（蓝白会议室 / 政策文件抽象）
- [ ] **T-F10** Dashboard 顶部纹理（深色科技感网格）
- [ ] **T-F11** OG 图（1200×630，含项目名+核心 KPI）
- [ ] **T-F12** Logo / favicon

## G. 页面：首页（/）

- [ ] **T-G1** Hero（背景图 + 6 KPI 玻璃卡 + 双 CTA）
- [ ] **T-G2** 项目要览 Section（卡片矩阵 + v2.3 修订时间线）
- [ ] **T-G3** 三大配置对比 Section（300 全电 / 200+100 / 300 全氢）
- [ ] **T-G4** 推荐 vs 推荐+PPA 对比 Section
- [ ] **T-G5** 投资板块 Treemap + 资金来源饼
- [ ] **T-G6** 实施路径预览 Section
- [ ] **T-G7** ESG 价值 Section
- [ ] **T-G8** "进入大屏"CTA Section
- [ ] **T-G9** SEO metadata + JSON-LD

## H. 页面：项目概览（/overview）

- [ ] **T-H1** Hero
- [ ] **T-H2** 业主单位与项目缘起
- [ ] **T-H3** 项目目标六维卡片（v2.3）
- [ ] **T-H4** 战略机遇分析
- [ ] **T-H5** 五大替代方案对比表
- [ ] **T-H6** v2.3 关键修订时间线（红线警示）

## I. 页面：厂址与资源（/site）

- [ ] **T-I1** Hero + 区位地图 SVG（怀来 → 北京/张家口/京张高速）
- [ ] **T-I2** 气候表 + 低温对车型选择反向支持
- [ ] **T-I3** 1 万亩土地分配 stacked bar / pie
- [ ] **T-I4** 1 GW 风光电站独立资产 RedlineCallout（4 条红线）
- [ ] **T-I5** 电网接入方案流程图
- [ ] **T-I6** 水/交通/既有基础设施评估表

## J. 页面：市场与政策（/policy）

- [ ] **T-J1** Hero
- [ ] **T-J2** 四级政策叠加图（国/省/市/县）
- [ ] **T-J3** 示范期 1.7 亿政策资金分解
- [ ] **T-J4** 行业市场格局四张表
- [ ] **T-J5** 替代能源价格趋势表
- [ ] **T-J6** 政策风险与应对

## K. 页面：技术与配比（/technology）

- [ ] **T-K1** Hero
- [ ] **T-K2** 氢能 vs 电动 横向对照
- [ ] **T-K3** 配比枚举表（n_氢 = 0 / 180 / 190 / 200 / 210 / 220 / 230 / 240）
- [ ] **T-K4** 五方案六维雷达图
- [ ] **T-K5** "300 全电为何不可行"专题（55.8 MW 配电墙）
- [ ] **T-K6** 200+100 推荐解六大论据卡

## L. 页面：制储加电体系（/system）

- [ ] **T-L1** Hero
- [ ] **T-L2** 28 MW 制氢系统组成（24 Alk + 4 PEM）
- [ ] **T-L3** 综合氢成本三层叠加桥接（H2CostBridge）
- [ ] **T-L4** 3 加氢站布局
- [ ] **T-L5** 30 桩 + 1 换电站
- [ ] **T-L6** 副产氧气价值（2.2 万吨/年 × 700 元）

## M. 页面：投资与财务（/finance）

- [ ] **T-M1** Hero（CAPEX 5.45 亿 + 推荐+PPA NPV +1.90 亿 大数）
- [ ] **T-M2** CAPEX 板块 Treemap + 6 行表
- [ ] **T-M3** 资金来源饼（自筹/绿信/补贴/租赁）
- [ ] **T-M4** OPEX 板块拆解（G1 / G2 / H + 14 子项）
- [ ] **T-M5** NPV 多层优化路径表（基准 → 推荐+PPA）
- [ ] **T-M6** 10 年现金流瀑布 + 折现累计图
- [ ] **T-M7** 单变量临界值压力表
- [ ] **T-M8** 与同类项目对比表
- [ ] **T-M9** 与柴油基准对比

## N. 页面：ESG 与碳收益（/esg）

- [ ] **T-N1** Hero（年减排 31,383 t / 评级 BB→A-）
- [ ] **T-N2** 全生命周期碳排测算（柴油基准 vs 新方案 v2.3）
- [ ] **T-N3** CCER 三情景与年收益
- [ ] **T-N4** 绿色金融对接（6 类工具）
- [ ] **T-N5** 535 人就业拆解
- [ ] **T-N6** 国际接轨（CBAM / SBTi / RE100）

## O. 页面：实施路径（/roadmap）

- [ ] **T-O1** Hero
- [ ] **T-O2** 三阶段甘特（试点 / 放量 / 稳态）
- [ ] **T-O3** 8 个标段表 + 推荐供应商
- [ ] **T-O4** 项目期 vs 运营期组织架构图
- [ ] **T-O5** 数字化系统架构
- [ ] **T-O6** 风险预案与应急

## P. 页面：项目大屏（/dashboard）

- [ ] **T-P1** 16:9 全屏布局 + 顶栏（时间/阶段/累计天数/全屏开关）
- [ ] **T-P2** 左列：车队总览 + 制氢负载 + 加氢吞吐
- [ ] **T-P3** 中列：4 大数 KPI 矩阵 + 矿区线路 SVG + 财务瀑布微缩
- [ ] **T-P4** 右列：充电峰值 + OPEX 拆解 + 风险预警 + ESG 仪表
- [ ] **T-P5** 底栏：滚动播报
- [ ] **T-P6** 伪实时数据 hook（5 秒一拍）
- [ ] **T-P7** 全屏播放循环模式

## Q. 打磨与发布

- [ ] **T-Q1** prefers-reduced-motion 兜底
- [ ] **T-Q2** 移动端适配复审
- [ ] **T-Q3** Lighthouse 跑分（Performance ≥ 90 / A11y ≥ 95 / SEO ≥ 95）
- [ ] **T-Q4** 全站文案校对（数据 vs v2.3）
- [ ] **T-Q5** README / Spec 三文档归档
- [ ] **T-Q6** Netlify 部署（生产）
- [ ] **T-Q7** GitHub 仓库公开 + tag v1.0.0
