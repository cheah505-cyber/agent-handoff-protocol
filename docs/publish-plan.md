# 发布计划：war story（中文 + 英文两份正文）

> 正文只有两份：`docs/war-story.md`（中文）、`docs/war-story.en.md`（英文）。这里只放**每个平台的元数据与状态**，不复制正文。
> 最后更新：2026-11-25

## 语言策略

| 平台 | 受众 | 语言 |
|---|---|---|
| GitHub | 国际 | **英文优先**（`README.md` 英文，`README.zh-CN.md` 中文） |
| dev.to | 国际 | 英文 |
| 掘金 / 知乎 / V2EX / SegmentFault / 博客园 / 即刻 | 中文 | 中文 |

## 状态总表

| 平台 | 状态 | 语言 | 链接 / 阻塞原因 |
|---|---|---|---|
| 掘金 | ✅ 已发布 | 中文 | https://juejin.cn/post/7711934164547141659 |
| dev.to | ✅ 已发布 | 英文 | https://dev.to/willcheah/0-fail-12-contradictions-how-my-agent-memory-system-lied-to-me-on0 |
| 知乎 | ⛔ 交给用户 | 中文 | 草稿与登录态均已丢失；内容随时可从 `publish/war-story.zhihu.md` 重建。用户自行处理 |
| V2EX | ⛔ 不可发 | 中文 | 注册需邀请码；无码 |
| SegmentFault | ⛔ 放弃 | 中文 | 新号（声望 0）无发文章权限；已换 CSDN |
| CSDN | ✅ 已发布 | 中文 | https://blog.csdn.net/WillCheah/article/details/171375930 |
| 博客园 | ⛔ 放弃 | 中文 | 未开通博客，开通需个人信息 + 审核；已换 CSDN |
| 即刻 | ⛔ 未登录 | 中文 | 需 App 扫码 |
| 先知（安全文章） | 🟡 待审核 | 中文 | 已提交；正文是修正前版本（HANDOFF §5 记了一句话 + 两处附录引用要改） |
| 安全客（安全文章） | 🟡 待审核 | 中文 | 已提交 2026-11-26 08:12:48（`/contribute/manager` 可见）；修正后正文、3 表 8 标题、标签、分类、封面、手机号与联系方式齐全 |
| LinkedIn（英文） | ✅ 已发布 | 英文 | 个人动态页可见（LinkedIn 不暴露稳定 post URL）；文案见 §7.3 |
| FreeBuf | ⛔ 放弃 | 中文 | 用户自己的浏览器也返回 405，WAF 拦截；不去绕 |

## 素材（全部已公开）

| 用途 | 链接 |
|---|---|
| 仓库（主 CTA） | https://github.com/cheah505-cyber/agent-handoff-protocol |
| 文章中文版 | https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/docs/war-story.md |
| 文章英文版 | https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/docs/war-story.en.md |
| 清单中文版 | https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/docs/memory-security-checklist.md |
| 清单英文版 | https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/docs/memory-security-checklist.en.md |

## 可直接粘贴/导入的文件（派生自 `docs/war-story.md`）

| 文件 | 用途 |
|---|---|
| [`publish/war-story.zhihu.md`](../publish/war-story.zhihu.md) | 知乎「导入文档 MD/Doc」用；已去掉开头 H1（标题单独填）、链接改绝对地址、补 CTA |
| [`publish/war-story.zhihu.html`](publish/war-story.zhihu.html) | 备用：浏览器打开 → Ctrl+A → Ctrl+C → 粘进富文本编辑器 |
| [`publish/war-story.zhihu.flat.md`](../publish/war-story.zhihu.flat.md) | **表格拍平成列表**的版本（4 张表 → 列表），给"预览里表格没了"的情况用 |
| [`publish/war-story.zhihu.flat.html`](publish/war-story.zhihu.flat.html) | 同上的 HTML 版 |

这两个文件是**派生快照**，唯一来源仍是 `docs/war-story.md`。生成规则（改正文后要重新做一遍）：

1. 去掉开头的 `# 标题` 行（知乎标题是独立字段）；
2. `(memory-security-checklist.md)` → 清单的 GitHub 绝对地址；
3. 在 `**清单免费**` 前插入「仓库 / 清单」两行 CTA；
4. 再用一个 markdown→HTML 转换器生成 `.html`（转换器是发布时的临时工具，不在本仓库内）。

---

## 1. 掘金 ✅

https://juejin.cn/post/7711934164547141659

- 分类：人工智能；标签：`AI编程`。**掘金一篇文章最多一个标签**，所以 `Agent`、`GitHub` 补不上——这是平台上限，不是没做完。
- 摘要、原创、所有人可见、审核正常

## 2. dev.to ✅

https://dev.to/willcheah/0-fail-12-contradictions-how-my-agent-memory-system-lied-to-me-on0

- 标签 `devtools` `ai` `llm` `agents`；description 98 字符；canonical 指向仓库
- 账号用户名已设为 `willcheah`（原为空，dev.to 会用账号 id 当 URL 前缀）

## 3. 知乎 ⛔（交给用户）

**草稿已丢、登录态已失效。** 内容随时可重建，步骤如下（用户自行执行）：

> **关键前提**：知乎编辑器是 Draft.js，**表格可能渲染不出来**（粘贴或导入都可能把表格拍平成文字）。所以给了两个版本：先用**带表格**的 `publish/war-story.zhihu.md`，发布前点「预览」确认表格还在；**如果表格没了，改用** `publish/war-story.zhihu.flat.md`（表格已改写成列表）。

- 编辑地址：`https://zhuanlan.zhihu.com/write?edit=2108971189200855862`
- 标题、正文（7853 字，13 个小标题、4 张表、4 段代码）已就位
- **创作声明：包含 AI 辅助创作 作者对内容负责**（AI 内容必须标注，别去掉）
- **文章话题：人工智能 / AI / 程序员**（知乎上限 3 个，已满）
- 语言字段留"未选择"（选填，知乎按内容推断）
- 点"发布"后如果弹出安全验证，手动过一下即可
- **另需删除一篇坏稿**：`https://zhuanlan.zhihu.com/p/2108969541657163196`（第一次发布时正文只存下最后一段，删掉）
- **发布后核对两件事**：正文里能搜到「19 个负向夹具」，并且旧稿 2108969541657163196 已删（知乎一个账号可以有多篇，删错了看不出来）

## 4. V2EX ⛔

- 注册现在只走 OAuth（Google/GitHub/Twitter/Solana），2024-06 之后的新号**必须邀请码激活**
- 合法获取途径：老用户邀请码（免费，每人每年 2–3 个）/ 持有 10,000 V2EX Coin（≈$50，Solana 代币）/ 第三方倒卖（¥80+，社区抵制）
- 没有邀请码就不发；不绕过

## 5. CSDN（替换博客园 / SegmentFault）

**为什么换**：博客园要填个人信息并等审核才能开通博客；SegmentFault 新号声望 0 没有发文章权限。两者都不是技术问题，也不该绕。

| 字段 | 值 |
|---|---|
| 登录 | `https://passport.csdn.net/login`（微信扫码 / 手机号验证码） |
| Markdown 编辑器 | `https://editor.csdn.net/md/` |
| 文章 | https://blog.csdn.net/WillCheah/article/details/171375400 |
| 标题 | `0 FAIL，12 处矛盾：我的 Agent 记忆系统是如何骗了我的` |
| 正文 | 导入 `publish/war-story.zhihu.md`（编辑器有 `#import-markdown-file-input`；导入会用文件名覆盖标题，**导入后要重填标题**） |
| 文章类型 | 原创 |
| 分类专栏 | 新号没有专栏，发布时若要求填写，先建一个（如「AI 工程 / Agent 治理」） |
| 文章标签 | 实际发的是 `开源`、`人工智能`、`软件工程`。自定义标签要博客等级 ≥3，只能从 autocomplete 里选已有标签；`fill` + 点建议项才生效，直接按 Enter 会报「博客等级不满足三级」 |
| 摘要 | `门禁 12 条全绿、0 FAIL，零上下文冷读仍找出 12 处矛盾——骗我的不是模型，是验证层。附 13 项 Agent 记忆安全评估清单。` |

**踩坑：`saveArticle` 返回 `code 400 博主不存在`** —— 新号必须先访问一次自己的博客页（`https://blog.csdn.net/<UserName>`）把博主档案建出来，否则保存/发布都会被拒。用户名从 cookie `UserName` 读。

`文章备份到 GitCode` 那个勾选默认是关的，发布前确认别打开（会自动建 GitCode 账号）。

**即刻**：本轮不做。

---

## 6. 平台机制备忘（踩过的坑）

- **掘金**：编辑器真实路由是 `/editor/drafts/new?v=2`，`/creator/post` 会弹回首页。
- **掘金**：改**已发布**文章要打开它的**关联草稿** id（`article_info.draft_id`），不是文章 id；用文章 id 打开 `/editor/drafts/<article_id>` 会新建一个空草稿。
- **CSDN**：改已发布文章走「导入 Markdown」会**新建一篇**（文章 id 变了），旧稿必须删；发布后一定要核对 id，否则留下两篇同文。
- **CSDN**：标签靠下拉建议项，点推荐列表里的 `<li>` 不会进状态（和 dev.to 一样）；没进状态就会触发 CSDN 自动打标签（本次自动打成了 `arcgis`）。
- **知乎**：编辑器是 Draft.js。`execCommand("insertHTML")` 会让 DOM 与 Draft 内部状态脱节，**发布后正文只留下最后一段**；必须用 `paste` 事件带 `clipboardData`（`text/html`）才能正确写入块结构。
- **知乎**：发布接口会对自动化环境返回 `code 2015`，这一步只能人工完成。
- **dev.to**：标签是 autocomplete，必须点下拉建议项；改 description 用 `PUT /api/articles/:id`，body 包成 `{article:{...}}` 并带 `x-csrf-token`。
- **Cloudflare + Electron**：V2EX 全站对 OpenCode 内置浏览器（Electron）下发无限循环验证，同一 IP 用 `curl` 正常 200。反自动化验证不绕。

## 7. 发完之后

1. 把实际文章 URL 写回 `HANDOFF.md` §6。
2. 第一条外部信号（star / issue / 评论 / 问清单）记进 `PROJECT.md`。
3. 全部发完后开 `AHP-CONTENT-002`：安全圈文章《Agent 的记忆是攻击面》，审查者 `deepseek/deepseek-flash`。

## 9. 勘误：已发布版本里的过期数字

war story 发布时（v0.1.0）是 22 个测试 / 15 个负向夹具，**当时准确**。之后 `SECRETS` 增加 `docs/` 扫描，现在是 27 / 19。文章自称"每个数字都能在仓库里找到出处"，附录又写「`22 个测试` → `npm test`」，读者今天跑 `npm test` 得到 27，引用就复现不了。

| 平台 | 状态 |
|---|---|
| dev.to | ✅ 已改（2026-11-25，`edited_at` 10:56:52Z）——加了 v0.1.0 快照限定 + 现为 27/19 |
| 掘金 | ✅ 已改（2026-11-25）——仍是同一篇 `7711934164547141659`，5 处全中，标签仍只有 `AI编程` |
| CSDN | ✅ 已改（2026-11-25）——**注意**：走"导入 Markdown"改已发布文章会**新建一篇**（旧 `171375400` → 新 `171375930`），旧稿必须删掉；而且当时点的标签没生效，CSDN 自动打了个 `arcgis`，这次改成 `开源/人工智能/软件工程` |

**改法（三处，只加限定词，不重写）**：

1. `整套东西 22 个测试：…` → `整套东西发布时（v0.1.0）是 22 个测试：…。现在是 27 个测试、19 个负向夹具——数字变了，方法没变。`
2. `这条规矩的代价是我要多写 22 个测试；` → `这条规矩的代价是我要多写负向测试（v0.1.0 时 15 个，现在 19 个）；`
3. 代码块注释 `# 22 个测试，其中一半是负向夹具` → `# v0.1.0 时 22 个测试；现在 27 个`
4. 附录 `| 22 个测试 | npm test |` → `| 22 个测试（v0.1.0 快照；现为 27，其中 19 个负向夹具） | npm test |`

除测试数外，文章其余数字（12 条门禁、21 天阈值、20 天夹具、10 个改动、13 项清单）均未变，不需要改。

## 7.1 安全文章（Agent 的记忆是攻击面）

正文源：`docs/agent-memory-attack-surface.md`（未发布，可继续改）。发布包：

| 文件 | 用途 |
|---|---|
| `publish/agent-memory-attack-surface.md` | 首选正文（Markdown 编辑器导入/粘贴），相对链接已改 GitHub 绝对地址 |
| `publish/agent-memory-attack-surface.html` | 备用（富文本粘贴），裸 URL 已转成可点链接 |
| `publish/agent-memory-attack-surface.meta.md` | 标题/摘要/分类/标签 + 逐站步骤 + 发布顺序 |

**发布顺序：先知 → FreeBuf → 安全客。** 安全客《投稿须知》要求首发且发布后不得再往第三方平台投稿同一篇，所以它必须放最后。只发一个的话选先知（受众最对口）。

各站实测（2026-11-26）：

- 先知：已提交，**待审核**（`xz.aliyun.com/account/articles`）。过审前它不算"已发布"。
- FreeBuf：本环境与**用户自己的浏览器**都返回 405（WAF），放弃，不绕。
- 安全客：已登录；在线投稿 `https://www.anquanke.com/contribute/new`。字段实测：标题 / 文章分类（`knowledge` 安全知识）/ 标签（英文逗号分隔）/ 手机号（**required**，稿费发放）/ 联系方式（QQ/微信/邮箱）/ 封面（layui 上传，落到 `api.anquanke.com/data/v1/file/pic_blob`）/ 编辑器（`0` = Markdown，Editor.md + CodeMirror；`1` = 普通文本）。正文可用 `.CodeMirror` 实例的 `setValue()` 直接写入，比粘贴稳；预览里 3 张表与 8 个二级标题都正常。草稿保存接口 `/data/v1/draft/save`，返回「保存成功」，但草稿箱计数不刷新，别以计数判断是否存住。

## 7.2 英语渠道（FreeBuf 的替代）

前提：**正文要英文版** `docs/agent-memory-attack-surface.en.md`（尚未写）。中文正文投英文社区不成立，别机翻直贴。

| 渠道 | 门槛 | 受众匹配 | 成本 | 备注 |
|---|---|---|---|---|
| dev.to | 无审核，已有账号 `willcheah` | 开发者 / AI 工具 | 低 | **首选**，当天可发；标签 `security` `ai` `agents` |
| LinkedIn | 无审核，走你自己的网络 | 企业安全 / 决策者 | 低 | 同日发；可精简到 800 词 + 仓库链接 |
| Hacker News | 无审核，靠投票，方差极大 | 全球技术社区 | 中 | 陈述式标题，**不写 Show HN**（这是文章不是产品）；只发一次 |
| r/netsec | 严格版规：原创、技术深度、禁博客垃圾、标题需描述性 | 安全从业者，最对口 | 中 | 版主主观；先读 sidebar 再发 |
| Medium / Hashnode / Substack | 无审核，无自然流量 | 你的订阅者 | 低 | 只做镜像，canonical 指回 dev.to |
| Help Net Security / Dark Reading / CSO / InfoQ | 需 pitch，编辑决定 | 行业信誉 | 高 | 只挑一家 pitch；被接受才写定制版 |
| arXiv (cs.CR) | 需 endorsement + 学术格式 | 研究 / 引用 | 高 | 不建议：这是工程复盘，不是论文 |

**顺序**：dev.to（当天）→ LinkedIn（当天）→ 隔 2–3 天发**一个**社区（HN 或 r/netsec 二选一）→ 只对 Help Net Security 做一次 pitch。第一波反馈决定要不要加投，别同时铺开。

### 7.2.1 r/netsec 提交包（2026-11-26 备好，待登录）

Reddit 未登录时 `/submit` 直接跳登录页，无法代发。以下四项可直接粘贴：

| 项 | 值 |
|---|---|
| 版块 | `r/netsec` |
| 形式 | **Link post**（不要贴全文，r/netsec 更接受链到原站） |
| 标题 | `Agent memory as an attack surface: poisoned facts, stale decisions, and checks that fail open` |
| 链接 | https://dev.to/willcheah/your-agents-memory-is-an-attack-surface-1fi7 |
| Flair | `Research`（没有就选最接近的技术类；**不要**选 News/Discussion） |

第一条评论（作者披露，r/netsec 要求透明）：

> Author here. This is defensive work: four memory attack classes, three ways a verification layer fails open, and the one boundary where no fixture can exist (record integrity is testable, quote truth is not). No exploit steps, no real targets. The repo has the 13-item assessment checklist and the harness that produced the numbers: https://github.com/cheah505-cyber/agent-handoff-protocol

注意事项：

- 标题保持中性陈述，**不要**加 "my" / "how I" / 感叹号——r/netsec 会按标题判 spam。
- 新号或低 karma 的 link post 常被自动过滤；若被移除，先看 modmail 原因，别重复提交。
- 只发这一次；HN 与 r/netsec 不要同日双发（`§7.2` 的顺序）。

**风险**：HN 与 r/netsec 对自我推广敏感。文章已具备给足细节的条件（四类失败形态、可查出处、13 项清单），标题里不要出现产品名，正文不要以 CTA 开头。

### 7.3 英语版状态（2026-11-26）

| 项 | 值 |
|---|---|
| 正文 | `docs/agent-memory-attack-surface.en.md` → dev.to 用 `publish/agent-memory-attack-surface.en.md`（链接绝对化 + CTA） |
| 标题 | `Your agent's memory is an attack surface` |
| 摘要 | `A poisoned memory line breaks no type system and trips no lint; it just makes the next agent do the wrong thing. Four memory attacks, three ways the verifier fails open, and the boundary where no fixture can exist.` |
| 标签 | `security` `ai` `agents` `devtools` |
| canonical | `https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/docs/agent-memory-attack-surface.en.md` |
| dev.to | ✅ 已发布并按复审修正 https://dev.to/willcheah/your-agents-memory-is-an-attack-surface-1fi7（id `5119922`；正文 14773 字符；页面核对 3 表 / 8 个 h2 / 2303 词；description 已换成「Code review can't see the Markdown…」版） |
| LinkedIn | ✅ 已发布（2026-11-26，1072 字符，个人动态页可查） |

**发布方式（可复用）**：dev.to 内部接口 `POST /api/articles`，body `{article:{title, body_markdown, tags, canonical_url, description, published}}`，带 `x-csrf-token`（取自页面 `meta[name=csrf-token]`）+ `credentials:"include"`，返回 201 与 id；再 `PUT /api/articles/<id>` 传 `{article:{published:true}}` 发布。正文 14.5 KB，直接从 raw.githubusercontent 取，免去粘贴。

**LinkedIn 文案**（发 post，不建 article；链接放正文首条评论或正文末尾均可）：

> Your agent's memory is an attack surface — and most reviews still only look at code.
>
> Four failure shapes I keep seeing, none of them in the code: a low-privilege writer plants "the prod DB is read-only" and the next session believes it; a decision is reversed but the old conclusion stays in the memory file; instruction-shaped text arrives through auto-injected memory and reaches the action layer unread; two sessions edit the same handoff and the loser is "what we are doing and why".
>
> The part that matters more is the verifier. A gate that skips when the worktree is dirty is not a check, it is a claim wearing a check's name. Mine did that, and reported green.
>
> And there is a boundary no tool crosses: record integrity is testable — hash the words at consent, mutate one character, the check must turn red. Quote truth is not: no second copy, no fixture. Mark it "attested, not verified" and never let it print green.
>
> Write-up, defensive only, no exploit steps: https://dev.to/willcheah/your-agents-memory-is-an-attack-surface-1fi7
>
> #AISecurity #AgenticAI #AppSec #LLM

### 7.4 CSDN（等一个渠道过审后再发）

正文：`publish/agent-memory-attack-surface.md`（修正后版本）。**CSDN 是即时发布、无人工审核**，所以它会抢在先知/安全客之前成为首发——这正是暂缓的原因。

**触发条件**：先知或安全客任一上线后，CSDN 按**转载**发布，正文末尾加一行 `本文首发于 <平台>：<链接>`。

操作要点（2026-11-26 实测）：

- 编辑器 `https://editor.csdn.net/md/` 已登录（`UserName=WillCheah`）；`#import-markdown-file-input` 存在，标题输入框存在。
- **导入用文件名当标题**：把 File 的 `name` 设成 `Agent 的记忆是攻击面：投毒、过期事实与假绿门禁.md`，标题就自动正确；否则导入后手动重填（导入会覆盖标题）。
- 标签和摘要在点「发布文章」之后的弹窗里；标签必须点 autocomplete 建议项，直接回车报「博客等级不满足三级」。
- 摘要用 `publish/agent-memory-attack-surface.meta.md` 里的短摘要（≤100 字）。
- 「文章备份到 GitCode」保持关闭。
- 发布后核对：文章 id 是新的、管理列表里只有这一篇（不是两篇）、正文搜「假绿门禁」确认没被截断。

## 8. 红线

- 不出现客户名、生产 URL、内部数据、本机路径。
- 不承诺"装上就不会漂移"、不写"自动挖洞"；不绕过任何平台的人机验证。
- 评论区只回技术问题，不接单、不报价。
