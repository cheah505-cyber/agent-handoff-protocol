# 发布包：安全文章《Agent 的记忆是攻击面》

> 这份文件是**操作手册**，不是文章正文。正文只有一份：`publish/agent-memory-attack-surface.md`（派生自 `docs/agent-memory-attack-surface.md`）。
> 唯一来源仍是 `docs/agent-memory-attack-surface.md`——改正文后要重新生成 `publish/agent-memory-attack-surface.md` 与 `.html`。

## 1. 元数据（直接复制）

| 字段 | 值 |
|---|---|
| 标题 | `Agent 的记忆是攻击面：投毒、过期事实与假绿门禁` |
| 一句话摘要（先知/FreeBuf/安全客通用） | `传统安全评审看代码，但 Agent 项目里真正决定下一轮行为的是几张被自动读取的 Markdown。这篇拆解四类记忆攻击、三种"验证层自己失效"的情况，并划出机器检查够不到的那条边界。附 13 项 Agent 记忆安全评估清单。` |
| 备用短摘要（≤100 字） | `Agent 的记忆文件就是下一轮的信念状态，也是攻击面。本文给出四类记忆攻击、三种假绿门禁的失效形态，和一个诚实的边界：有些东西根本没法被机器检查。` |
| 分类建议 | 安全客选 `安全知识`；先知选 `安全研究`/`AI 安全`；FreeBuf 选 `技术`（或 `资讯`） |
| 标签建议 | `AI安全`、`Agent`、`提示词注入`、`代码审计`、`供应链安全`、`安全建设` |
| 关键词/搜索用 | Agent 记忆 投毒、提示词注入、Agent 交接、AI 安全、门禁 假绿、fail-open 门禁、信任边界 |
| 主 CTA | https://github.com/cheah505-cyber/agent-handoff-protocol |
| 清单 CTA | https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/docs/memory-security-checklist.md |

## 2. 正文文件

| 文件 | 用途 |
|---|---|
| `publish/agent-memory-attack-surface.md` | 首选。有 Markdown 编辑器的平台直接导入/粘贴；表格完整 |
| `publish/agent-memory-attack-surface.html` | 备用。只有富文本编辑器的平台：浏览器打开 → Ctrl+A → Ctrl+C → 粘贴 |

两者内容一致（3306 个中文字符，8 个二级标题，3 张表）。HTML 已把相对链接改成 GitHub 绝对地址、裸 URL 变成可点链接。

## 3. 发布顺序（重要）

**安全客放最后。** 安全客《投稿须知》要求：稿件须在安全KER平台**首发**，且发布后不得在任何第三方平台再次投稿（仅可转载至自己博客并显著标明"文章首发于安全KER"）。

所以顺序是：**先知 → FreeBuf → 安全客**（只发一个渠道的话，先知或安全客都行）。

如果只想发一个：**先知**（受众最对口：AI × 安全），先知要求原创首发，先发它不吃亏。

## 4. 逐站步骤

### 4.1 先知社区（xz.aliyun.com）— 推荐首发

1. 打开 https://xz.aliyun.com/write ，用**阿里云账号**登录（未登录会 307 到 `account.aliyun.com`）。首次可能需要实名认证与新人审核，先把账号搞定。
2. 标题填上面表格里的标题。
3. 正文：编辑器选 **Markdown** 模式，导入或粘贴 `publish/agent-memory-attack-surface.md`。若 Markdown 导入后样式丢失，改用 `publish/agent-memory-attack-surface.html` 的内容粘贴到富文本框。
4. 分类选 `AI 安全`（没有就选 `安全研究` 或 `漏洞分析`）。
5. 标签：先知标签是**从已有标签里选**，不要手打不存在的；`AI安全` 若搜不到就选最接近的（`人工智能`、`AI`、`Agent`）。
6. 摘要/引言：粘贴"一句话摘要"。
7. 封面：先知技术文章通常要封面图——自己挑一张，或用平台默认图。仓库里没有现成封面（AI 生成失败）。
8. 勾选原创声明，注明首发。提交后走先知人工审核，**记下文章 URL**。

### 4.2 FreeBuf（freebuf.com）

1. 打开 https://www.freebuf.com/articles/write 。账号通常需要手机号注册 + 实名认证；部分栏目要求先加入/创建专栏。
2. 标题、正文同上（优先 Markdown 编辑器，失败用 HTML 粘贴）。
3. 栏目/分类：选 `技术`（或 `资讯`）。
4. 标签：FreeBuf 标签是下拉多选，从 `AI`、`人工智能`、`Agent`、`代码审计`、`提示词注入` 里挑能搜到的。
5. 摘要：粘贴短摘要。
6. 封面图：FreeBuf 强制要求一张封面；用自己的或默认图。
7. 提交后人工审核，记录 URL。

### 4.3 安全客（anquanke.com）— 放最后

1. 打开 https://www.anquanke.com/contribute/new （在线投稿，官方推荐方式）。
2. 标题填标题。
3. 文章分类：`安全知识`。
4. 文章标签：**多个标签用英文逗号分隔**，建议 `AI安全,Agent,代码审计`（能搜到已有标签的优先）。
5. 手机号：**必填**（稿费发放用）。
6. 联系方式：QQ / 微信 / 邮箱，至少填一个。
7. 封面：点"封面"上传，有则更好。
8. 编辑器：选 `Markdown编辑器`，导入 `publish/agent-memory-attack-surface.md`；表格坏掉就选 `文本编辑器` 粘贴 HTML。
9. `保存草稿` → `提交稿件`。
10. 安全客要求稿件**首发**：先在这里发，就**不要**再往先知/FreeBuf 发同一篇（顺序问题见 §3）。

### 4.4 知乎（zhuanlan.zhihu.com）— 你自己发 war story

- 正文用 `publish/war-story.zhihu.md`；表格没了换 `publish/war-story.zhihu.flat.md`。
- **必须**勾选「包含 AI 辅助创作 作者对内容负责」。
- 发布后搜「20 个负向夹具」确认正文没被截断，并删掉旧坏稿 `https://zhuanlan.zhihu.com/p/2108969541657163196`。

## 5. 发布后必做

1. URL 写回 `HANDOFF.md` §6。
2. `docs/publish-plan.md` 状态表更新。
3. `npm test` && `node bin/ahp.mjs check` && `node bin/ahp.mjs sync --check` 仍全绿后提交。

## 6. 红线（与之前一样）

- 不出现客户名、生产 URL、内部数据、本机路径。
- 不写 exploit 步骤、不给真实目标、不承诺"装上就不会漂移"。
- 评论区只回技术问题，不接单、不报价。
- 全文只讲**防御**：怎么查、怎么防、什么查不了。
