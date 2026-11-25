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
| 知乎 | ⚠️ 已备好，等人工点发布 | 中文 | 编辑器已填满（7853 字，草稿已存）；发布接口返回 `code 2015 网络环境或行为异常，请进行安全验证` |
| V2EX | ⛔ 不可发 | 中文 | 注册需邀请码；无码 |
| SegmentFault | ⛔ 放弃 | 中文 | 新号（声望 0）无发文章权限；已换 CSDN |
| CSDN | ✅ 已发布（审核中） | 中文 | https://blog.csdn.net/WillCheah/article/details/171375400 |
| 博客园 | ⛔ 放弃 | 中文 | 未开通博客，开通需个人信息 + 审核；已换 CSDN |
| 即刻 | ⛔ 未登录 | 中文 | 需 App 扫码 |

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
| [`publish/war-story.zhihu.md`](publish/war-story.zhihu.md) | 知乎「导入文档 MD/Doc」用；已去掉开头 H1（标题单独填）、链接改绝对地址、补 CTA |
| [`publish/war-story.zhihu.html`](publish/war-story.zhihu.html) | 备用：浏览器打开 → Ctrl+A → Ctrl+C → 粘进富文本编辑器 |

这两个文件是**派生快照**，唯一来源仍是 `docs/war-story.md`。生成规则（改正文后要重新做一遍）：

1. 去掉开头的 `# 标题` 行（知乎标题是独立字段）；
2. `(memory-security-checklist.md)` → 清单的 GitHub 绝对地址；
3. 在 `**清单免费**` 前插入「仓库 / 清单」两行 CTA；
4. 再用一个 markdown→HTML 转换器生成 `.html`（转换器是发布时的临时工具，不在本仓库内）。

---

## 1. 掘金 ✅

https://juejin.cn/post/7711934164547141659

- 分类：人工智能；标签：`AI编程`（**待补** `Agent`、`GitHub`，发布面板的多选只吃手动点击）
- 摘要、原创、所有人可见、审核正常

## 2. dev.to ✅

https://dev.to/willcheah/0-fail-12-contradictions-how-my-agent-memory-system-lied-to-me-on0

- 标签 `devtools` `ai` `llm` `agents`；description 98 字符；canonical 指向仓库
- 账号用户名已设为 `willcheah`（原为空，dev.to 会用账号 id 当 URL 前缀）

## 3. 知乎 ⚠️

**编辑器里已经全部填好，只差人工点"发布"。**

- 编辑地址：`https://zhuanlan.zhihu.com/write?edit=2108971189200855862`
- 标题、正文（7853 字，13 个小标题、4 张表、4 段代码）已就位
- **创作声明：包含 AI 辅助创作 作者对内容负责**（AI 内容必须标注，别去掉）
- **文章话题：人工智能 / AI / 程序员**（知乎上限 3 个，已满）
- 语言字段留"未选择"（选填，知乎按内容推断）
- 点"发布"后如果弹出安全验证，手动过一下即可
- **另需删除一篇坏稿**：`https://zhuanlan.zhihu.com/p/2108969541657163196`（第一次发布时正文只存下最后一段，删掉）

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
- **知乎**：编辑器是 Draft.js。`execCommand("insertHTML")` 会让 DOM 与 Draft 内部状态脱节，**发布后正文只留下最后一段**；必须用 `paste` 事件带 `clipboardData`（`text/html`）才能正确写入块结构。
- **知乎**：发布接口会对自动化环境返回 `code 2015`，这一步只能人工完成。
- **dev.to**：标签是 autocomplete，必须点下拉建议项；改 description 用 `PUT /api/articles/:id`，body 包成 `{article:{...}}` 并带 `x-csrf-token`。
- **Cloudflare + Electron**：V2EX 全站对 OpenCode 内置浏览器（Electron）下发无限循环验证，同一 IP 用 `curl` 正常 200。反自动化验证不绕。

## 7. 发完之后

1. 把实际文章 URL 写回 `HANDOFF.md` §6。
2. 第一条外部信号（star / issue / 评论 / 问清单）记进 `PROJECT.md`。
3. 全部发完后开 `AHP-CONTENT-002`：安全圈文章《Agent 的记忆是攻击面》，审查者 `deepseek/deepseek-flash`。

## 8. 红线

- 不出现客户名、生产 URL、内部数据、本机路径。
- 不承诺"装上就不会漂移"、不写"自动挖洞"；不绕过任何平台的人机验证。
- 评论区只回技术问题，不接单、不报价。
