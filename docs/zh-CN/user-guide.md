# Quill MVP 用户使用文档

## 1. Quill 现在能做什么

Quill 当前 MVP 适合这样的使用方式：你在本地创建一个写作工作区，围绕一篇技术博客逐步生成和维护多个 Markdown 文件，并在过程中保留人工修改空间。

它当前主要支持：

- 初始化本地工作区
- 创建一篇文章的固定工件目录
- 查看每个工件的状态
- 执行单个步骤生成
- 执行整条技术博客工作流

如果你期待的是一个图形界面、自动联网研究、自动发布、多流程平台，那不属于当前 MVP。

## 2. 使用前理解的几个前提

在开始前，建议先理解以下事实：

1. Quill 是本地命令行工具，不是在线 SaaS。
2. 当前只有一条固定工作流：`technical-blog`。
3. 所有核心结果都以 Markdown 文件形式保存在本地。
4. `init`、`new`、`status` 不依赖模型。
5. `step`、`run` 在需要生成时依赖模型提供方与 API Key。
6. 默认不会覆盖已有非空输出，除非你显式使用 `--force`。

## 3. 本地安装与开发方式

当前仓库更适合本地开发与试用。基础步骤是：

```bash
npm install
npm run check
npm run build
npm run dev -- --help
```

说明：

- `npm install`：安装依赖
- `npm run check`：做 TypeScript 类型检查
- `npm run build`：构建 CLI
- `npm run dev -- --help`：通过本地开发入口查看 CLI 帮助

如果你只是想在当前仓库里体验命令，后续示例一般可以使用：

```bash
npm run dev -- <command>
```

例如：

```bash
npm run dev -- init
```

## 4. 第一步：初始化工作区

命令：

```bash
quill init
```

如果你还没有全局安装可执行文件，也可以在仓库中使用：

```bash
npm run dev -- init
```

### 4.1 作用

`quill init` 会在当前目录创建 Quill 本地工作区，典型内容包括：

```text
.quill/
  quill.config.json
  styles/default.md
  templates/brief.md
  templates/sources.md
  templates/outline.md
  templates/draft.md
  templates/review.md
  templates/final.md
  workflows/technical-blog.json
docs/articles/
```

### 4.2 你应该期待的行为

- 可以重复执行
- 不会破坏已有文件
- 会准备默认配置、模板、风格和工作流定义
- 会为后续文章创建预留 `docs/articles/`

### 4.3 什么时候先执行它

只要当前目录还没有 Quill 工作区，就应先执行 `quill init`。如果直接运行 `new`、`step` 或 `run`，你可能缺少必要的本地工作区文件。

## 5. 第二步：创建文章工作区

命令：

```bash
quill new "为什么 Agent 编程需要 Harness"
```

在仓库开发模式下可以写成：

```bash
npm run dev -- new "为什么 Agent 编程需要 Harness"
```

可选形式：

```bash
quill new "文章选题" --workflow technical-blog --style default
```

### 5.1 作用

该命令会在 `docs/articles/` 下创建一篇文章的目录，并生成六个固定工件：

- `brief.md`
- `sources.md`
- `outline.md`
- `draft.md`
- `review.md`
- `final.md`

典型结构类似：

```text
docs/articles/2026-xx-xx-why-agent-coding-needs-harness/
  brief.md
  sources.md
  outline.md
  draft.md
  review.md
  final.md
```

### 5.2 你应该期待的行为

- 自动生成日期与 slug
- `brief.md` 会更接近任务定义文件
- 其他工件会被创建为可编辑 Markdown
- 不需要 API Key
- 不需要模型即可完成

### 5.3 使用建议

创建完成后，建议先人工补充：

- `brief.md` 中的主题、受众、目标、约束
- `sources.md` 中的资料、链接、待核实信息

这样后续 `outline`、`draft`、`review`、`final` 生成会更有依据。

## 6. 第三步：查看文章状态

命令：

```bash
quill status <article-slug>
```

开发模式示例：

```bash
npm run dev -- status <article-slug>
```

### 6.1 作用

该命令会检查文章目录中六个工件的状态，并报告当前检测结果。

### 6.2 当前状态标签含义

当前 MVP 使用的是**运行时检测标签**：

- `missing`：文件不存在
- `empty`：文件存在但为空
- `pending`：文件存在，但仍像待填写模板或待处理内容
- `exists`：文件存在且有内容

这些标签帮助你快速判断文章进行到哪里了，但它们不等于完整的生命周期管理系统。

### 6.3 什么时候使用它

建议在以下场景使用：

- 新建文章后检查脚手架是否完整
- 运行单步或整条工作流前确认前置工件是否齐全
- 运行后检查哪些输出已经生成
- 排查为什么某一步不能继续

## 7. 第四步：执行单个步骤

命令：

```bash
quill step <article-slug> outline
```

支持的步骤固定为：

- `brief`
- `sources`
- `outline`
- `draft`
- `review`
- `final`

### 7.1 它会做什么

执行单步时，Quill 会根据当前步骤读取：

- 本地配置
- 工作流定义
- 风格文件
- 前序工件内容

然后在需要时调用模型提供方，把结果写到该步骤对应的目标 Markdown 工件中。

### 7.2 常见使用顺序

虽然你可以单独执行某一步，但更自然的顺序通常是：

1. 先完善 `brief.md`
2. 再整理 `sources.md`
3. 生成 `outline`
4. 生成 `draft`
5. 生成 `review`
6. 生成 `final`

### 7.3 什么时候适合用 `step`

适合以下情况：

- 你只想推进某一个阶段
- 你希望人工修改前序工件后重新生成后续某一步
- 你不想一次跑完整条流程

## 8. 第五步：执行整条工作流

命令：

```bash
quill run <article-slug>
```

### 8.1 它会做什么

`quill run` 会按固定技术博客流程顺序执行：

1. `brief`
2. `sources`
3. `outline`
4. `draft`
5. `review`
6. `final`

### 8.2 你应该期待的行为

- 顺序执行，不并发
- 对已有非空工件默认跳过或保护，不随意覆盖
- 遇到生成失败时清晰停止
- 不会因为某一步失败而把之前已有工件抹掉

### 8.3 什么时候适合用 `run`

适合以下情况：

- 你已经准备好了较完整的 `brief.md` 与 `sources.md`
- 你希望顺序推进整篇文章
- 你要做一次完整流程试跑

## 9. API Key 与模型提供方配置

### 9.1 当前默认前提

当前 MVP 的模型调用基于 OpenAI 兼容接口设计，本地配置通常使用：

```bash
QUILL_API_KEY
```

这表示当你执行需要生成的命令时，Quill 会从环境变量中读取密钥。

### 9.2 最低要求

如果你要验证真实生成流程，至少需要：

- 设置 `QUILL_API_KEY`
- 使用可访问的 OpenAI 兼容提供方
- 保证本地网络与配置可正常访问该服务

### 9.3 一个最小提示

```bash
QUILL_API_KEY=...
```

在不同 shell 或运行方式下，环境变量设置方式可能不同，但核心要求不变：**生成命令运行时必须拿到这个变量。**

### 9.4 不要误解的地方

仓库中的离线 smoke 并不证明在线生成已成功。只有在实际提供 `QUILL_API_KEY` 且模型提供方可达时，`quill step` 或 `quill run` 的成功生成才算真正被验证。

## 10. 无 Key 时会发生什么

如果你没有设置 `QUILL_API_KEY`，当前预期行为是：

- `quill init`：可正常使用
- `quill new`：可正常使用
- `quill status`：可正常使用
- `quill step`：在需要模型生成时清晰报错
- `quill run`：在需要模型生成时清晰报错

你不应该期待的是：

- 没有 Key 却自动成功生成内容
- 输出空文件却显示成功
- 把缺少凭据的错误静默吞掉

## 11. `--force` 覆盖行为

当前 MVP 的默认策略是保护已有非空工件。

这意味着：

- 如果目标输出文件已经存在且非空，Quill 默认不会覆盖它
- 只有在你明确传入 `--force` 时，才表示你愿意替换现有结果

### 11.1 什么时候应该谨慎使用

以下场景下请先确认再使用：

- 你已经人工修改过 `outline.md`、`draft.md`、`review.md` 或 `final.md`
- 你只是想继续流程，而不是重生成当前文件
- 你不确定覆盖后还能否轻松找回旧内容

### 11.2 推荐习惯

在使用 `--force` 前，先：

- 查看当前工件内容
- 用 Git 提交或暂存重要修改
- 明确知道自己想覆盖哪一步输出

## 12. 验证与 smoke 建议

### 12.1 默认离线 smoke

当前推荐的基础验证命令为：

```bash
npm run build
npm run smoke:mvp
```

它主要验证：

- 本地脚手架可工作
- 文章工件目录可创建
- 状态检查逻辑可运行
- 无 API Key 的失败路径清晰可见

### 12.2 真实在线生成验证

如果你要验证 Quill 是否能真正生成内容，需要在可控测试目录中手工执行类似流程：

1. `quill init`
2. `quill new "为什么 Agent 编程需要 Harness"`
3. `quill status <slug>`
4. `quill run <slug>`
5. `quill status <slug>`

并且前提是：

- 已提供 `QUILL_API_KEY`
- 模型提供方可访问

## 13. 常见问题与排查建议

### 13.1 `step` 或 `run` 提示缺少 API Key

优先检查：

- 是否设置了 `QUILL_API_KEY`
- 当前 shell/终端是否真的把该变量传给了命令
- 本地配置中的 `apiKeyEnv` 是否仍然指向 `QUILL_API_KEY`

### 13.2 文章状态不符合预期

优先检查：

- `article-slug` 是否正确
- 文章目录是否位于 `docs/articles/` 下
- 对应 Markdown 文件是否真的存在、是否为空、是否只是模板占位

### 13.3 为什么某一步没有覆盖旧结果

这通常不是 bug，而是默认保护机制生效。Quill 默认不覆盖已有非空工件。只有在你明确接受覆盖风险时，才应使用 `--force`。

### 13.4 为什么离线 smoke 通过，但在线生成仍失败

因为离线 smoke 的目标并不是验证在线生成成功。它主要验证脚手架与无 Key 错误边界。在线生成还取决于：

- 你的 API Key
- 模型提供方是否可达
- 网络与本地配置是否正确

## 14. 当前 MVP 的边界提醒

为了正确使用 Quill，最后再强调几条边界：

- 当前只保证一条固定技术博客流程
- 当前核心价值是本地可编辑工件，而不是自动化程度最大化
- 当前可用性重点在单篇文章纵向打通，不在平台化
- 当前公开文档不会把未来方向当作已实现能力

如果你带着这些预期来使用 Quill，就更容易理解它为什么这样设计，也更容易判断它是否适合你当前的写作流程。
