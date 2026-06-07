# ELÉGANCE Automated Premium Journal PRD

## 1. 文档信息

- 项目名称：ELÉGANCE Automated Premium Journal
- 项目类型：高端个人/品牌 Journal 官网 + 后台内容管理系统
- 技术栈：Next.js App Router、React、Tailwind CSS、PostgreSQL、Prisma、Tiptap
- 部署环境：AWS EC2 + AWS RDS PostgreSQL
- 当前线上地址：http://52.37.190.58
- 文档日期：2026-06-07

## 2. 产品背景

ELÉGANCE 是一个以高级感视觉、编辑型排版和动态内容发布为核心的 Journal 网站。前台需要呈现接近 Stitch 设计稿的高端内容体验，后台需要提供文章管理、状态流转、富文本编辑和内容发布能力，使非技术用户可以维护 Journal 动态内容。

## 3. 产品目标

1. 提供一个响应式 Journal 官网，支持 PC、平板、手机访问。
2. 提供后台 CMS，支持文章创建、编辑、状态管理和发布。
3. 发布后的文章自动展示在前台 Journal 列表和详情页。
4. 使用 PostgreSQL 持久化内容数据，部署在 AWS 环境。
5. 保持后台入口不暴露在首页导航中，并对后台进行账号密码保护。

## 4. 用户角色

| 角色 | 说明 | 核心诉求 |
| --- | --- | --- |
| 访客 | 访问官网的普通用户 | 浏览首页、Journal 列表、文章详情、About、Contact |
| 内容管理员 | 维护内容的后台用户 | 创建文章、编辑文章、设置状态、管理发布时间 |
| 技术维护者 | 维护部署和数据库的人 | 可部署、可验证、可扩展、可回滚 |

## 5. 信息架构

### 前台页面

| 路由 | 页面 | 说明 |
| --- | --- | --- |
| `/` | Home | 品牌首页，展示核心视觉、精选内容和 Journal 入口 |
| `/journal` | Journal | 已发布文章列表 |
| `/journal/[slug]` | Single Journal Entry | 文章详情页 |
| `/about` | About | 品牌介绍页 |
| `/contact` | Contact | 联系页 |

### 后台页面

| 路由 | 页面 | 说明 |
| --- | --- | --- |
| `/admin` | Dashboard | 统计总览、最近文章 |
| `/admin/posts` | Posts | 文章 CRUD 列表 |
| `/admin/posts/new` | New Post | 新建文章 |
| `/admin/posts/[id]/edit` | Edit Post | 编辑文章 |
| `/admin/pages` | Pages | 页面内容管理预留模块 |

### 后台导航要求

- 首页和前台导航不展示 admin 入口。
- 后台左侧管理模块按当前路由显示 active 状态。
- `View Website` 是跳转前台的辅助入口，不应默认 active。

## 6. 功能需求

### 6.1 前台内容展示

| 编号 | 需求 | 优先级 | 当前状态 |
| --- | --- | --- | --- |
| FE-001 | 首页按 Stitch 视觉风格呈现品牌调性 | P0 | 已实现 |
| FE-002 | Journal 列表仅展示 `PUBLISHED` 且发布时间不晚于当前时间的文章 | P0 | 已实现 |
| FE-003 | 文章详情支持标题、摘要、分类、发布时间、封面图、富文本正文 | P0 | 已实现 |
| FE-004 | 未发布、草稿、下架、待发布时间文章不可被前台访问 | P0 | 已实现 |
| FE-005 | 支持 PC、平板、手机响应式布局 | P0 | 已实现 |

### 6.2 后台账号访问

| 编号 | 需求 | 优先级 | 当前状态 |
| --- | --- | --- | --- |
| AUTH-001 | 后台需要账号密码保护 | P0 | 已实现，当前为 Basic Auth |
| AUTH-002 | 管理员账号为 `admin`，密码为 `admin123` | P0 | 已实现 |
| AUTH-003 | 登录应使用 DOM 页面，而不是浏览器确认弹窗 | P0 | 待实现 |
| AUTH-004 | 登录成功后使用会话 cookie 保持状态 | P1 | 待实现 |
| AUTH-005 | 提供退出登录能力 | P1 | 待实现 |

### 6.3 后台 Dashboard

| 编号 | 需求 | 优先级 | 当前状态 |
| --- | --- | --- | --- |
| CMS-001 | 展示总文章数、已发布、草稿、待发布、下架统计 | P0 | 已实现 |
| CMS-002 | 展示最近文章表格 | P0 | 已实现 |
| CMS-003 | 提供快捷新建文章入口 | P0 | 已实现 |

### 6.4 文章 CRUD

| 编号 | 需求 | 优先级 | 当前状态 |
| --- | --- | --- | --- |
| POST-001 | 新建文章 | P0 | 已实现 |
| POST-002 | 编辑文章 | P0 | 已实现 |
| POST-003 | 删除文章 API 能力 | P1 | 已实现 API，UI 待补充 |
| POST-004 | 列表展示标题、slug、分类、状态、发布时间、操作 | P0 | 已实现 |
| POST-005 | 支持文章状态：草稿、待发布、已发布、下架 | P0 | 已实现 |
| POST-006 | 支持发布时间和计划发布时间字段 | P0 | 已实现字段与过滤 |
| POST-007 | slug 自动生成并可手动编辑 | P0 | 已实现 |

### 6.5 富文本编辑

| 编号 | 需求 | 优先级 | 当前状态 |
| --- | --- | --- | --- |
| RTE-001 | 支持所见即所得编辑 | P0 | 已实现基础 Tiptap |
| RTE-002 | 支持加粗、斜体、二级标题、引用、列表 | P0 | 已实现 |
| RTE-003 | 支持图片插入和展示 | P0 | 待增强 |
| RTE-004 | 支持视频插入和展示 | P0 | 待增强 |
| RTE-005 | 支持附件文件插入和展示 | P0 | 待增强 |
| RTE-006 | 支持上传文件并持久化存储 | P1 | 待实现，建议使用 S3 |
| RTE-007 | 前台详情页正确渲染图片、视频、附件内容 | P0 | 待增强 |

### 6.6 页面管理

| 编号 | 需求 | 优先级 | 当前状态 |
| --- | --- | --- | --- |
| PAGE-001 | 后台提供 Pages 管理入口 | P1 | 已有页面 |
| PAGE-002 | About/Contact 等页面支持后台编辑 | P1 | 待完善 |
| PAGE-003 | 页面编辑器保持与文章编辑一致的体验 | P2 | 待实现 |

## 7. 数据模型

### Post

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | String | 主键 |
| `title` | String | 标题 |
| `slug` | String | 唯一路由标识 |
| `excerpt` | String | 摘要 |
| `contentHtml` | String | 富文本 HTML |
| `coverImage` | String? | 封面图 URL |
| `category` | String | 分类 |
| `status` | PostStatus | DRAFT、PENDING、PUBLISHED、ARCHIVED |
| `publishedAt` | DateTime? | 发布时间 |
| `scheduledAt` | DateTime? | 计划发布时间 |
| `createdAt` | DateTime | 创建时间 |
| `updatedAt` | DateTime | 更新时间 |

### PageContent

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | String | 主键 |
| `key` | String | 页面唯一 key |
| `title` | String | 页面标题 |
| `contentHtml` | String | 页面内容 HTML |
| `updatedAt` | DateTime | 更新时间 |

### 建议新增 MediaAsset

用于支持图片、视频、附件上传和复用。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | String | 主键 |
| `fileName` | String | 原始文件名 |
| `mimeType` | String | 文件类型 |
| `url` | String | S3 或 CDN URL |
| `size` | Int | 文件大小 |
| `kind` | String | image、video、attachment |
| `createdAt` | DateTime | 上传时间 |

## 8. 非功能需求

| 分类 | 要求 |
| --- | --- |
| 性能 | 前台首屏应快速加载，图片建议使用优化策略或 CDN |
| 安全 | 后台必须鉴权，API 也必须保护；生产密码建议改为环境变量 |
| 可用性 | 后台表格支持横向滚动，移动端不应破版 |
| 可维护性 | 保持 Next.js App Router 结构，数据访问集中在 `src/lib/data.ts` |
| 可部署性 | 优先在当前 AWS 实例原地更新，不重复创建 EC2 |
| 可回滚性 | 原地部署应保留上一版目录，失败时可回滚 |

## 9. 部署需求

1. 应用部署在 AWS EC2。
2. 数据库部署在 AWS RDS PostgreSQL。
3. 应用通过 `DATABASE_URL` 连接数据库。
4. 生产服务由 systemd 管理，nginx 反向代理到 Next.js。
5. 后续部署优先使用 SSM 在当前实例原地更新代码、构建并重启。

## 10. 验收标准

1. 前台首页、Journal、详情、About、Contact 均可访问。
2. 首页不出现 admin 入口。
3. `/admin` 与 `/api/admin/*` 未认证时不可访问。
4. 使用 `admin/admin123` 可访问后台。
5. 后台 Dashboard、Posts、New Post、Edit Post 可正常打开。
6. 新建 `PUBLISHED` 文章后，前台 Journal 列表和详情页可访问。
7. `DRAFT`、`PENDING`、`ARCHIVED` 文章不应在前台公开展示。
8. 后台左侧导航 active 状态与当前路由一致。
9. 线上部署地址可访问，数据库读写正常。

## 11. 里程碑建议

| 阶段 | 内容 |
| --- | --- |
| M1 | 完成前台 Stitch 风格页面、基础 CMS、数据库、AWS 部署 |
| M2 | 后台登录 DOM 页面、cookie session、退出登录 |
| M3 | 富文本图片、视频、附件能力，S3 文件上传 |
| M4 | 页面内容管理、媒体库、删除确认、搜索筛选 |
| M5 | 权限加固、审计日志、备份、监控告警 |

## 12. 当前已知限制

1. 后台登录当前为 Basic Auth，会显示浏览器登录弹窗，尚未切换为 DOM 登录页。
2. 富文本目前仅支持基础格式，图片、视频、附件插入能力仍需增强。
3. 文件上传和媒体库尚未实现，建议接入 S3。
4. 删除文章已有 API，后台列表尚未提供删除按钮和确认流程。
5. 生产后台账号密码当前写在代码中，后续建议改成环境变量或数据库用户表。
