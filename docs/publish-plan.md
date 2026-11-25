# 发布计划：war story（`docs/war-story.md` / `docs/war-story.en.md`）

> 单一来源：正文只有两份——中文 `docs/war-story.md`、英文 `docs/war-story.en.md`。这里只放**每个平台的元数据**，不要复制正文。
> 状态：2026-11-25 起。掘金已发布；dev.to 待发（英文版）；V2EX 待用户手动发（Cloudflare 拦截）。

## 语言策略（2026-11-25 定）

| 平台 | 受众 | 语言 | 理由 |
|---|---|---|---|
| GitHub | 国际 | **英文优先** | `README.md` 是英文；中文版降级为 `README.zh-CN.md`。仓库标题、topics、描述全英文 |
| dev.to | 国际 | **英文** | dev.to 是英文社区，中文帖几乎没有流量 |
| 掘金 | 中文技术圈 | **中文** | 中文原生社区，英文帖没有曝光 |
| V2EX | 中文技术圈 | **中文** | 同上。V2EX 也可用英文，但中文版效果明显更好 |

规则：**平台按受众选语言，仓库按国际受众做英文优先。** 英文版不是"顺手翻译"，它是 dev.to 和 GitHub 的落地页。

## 素材（全部已公开）

| 用途 | 链接 |
|---|---|
| 仓库（主 CTA） | https://github.com/cheah505-cyber/agent-handoff-protocol |
| 文章中文版 | https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/docs/war-story.md |
| 文章英文版 | https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/docs/war-story.en.md |
| 清单中文版 | https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/docs/memory-security-checklist.md |
| 清单英文版 | https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/docs/memory-security-checklist.en.md |

---

## 1. 掘金 juejin.cn — ✅ 已发布

| 字段 | 值 |
|---|---|
| 文章 | https://juejin.cn/post/7711934164547141659 |
| 编辑器 | https://juejin.cn/editor/drafts/new?v=2（旧路由 `/creator/post` 会弹回首页） |
| 标题 | `0 FAIL，12 处矛盾：我的 Agent 记忆系统是如何骗了我的` |
| 分类 | 人工智能 |
| 标签 | `AI编程`（**待补** `Agent`、`GitHub`） |
| 摘要 | `我的门禁 12 条全绿、0 FAIL，但零上下文冷读在四个核心文件里找出 12 处矛盾——骗我的不是模型，是验证层。附一份 13 项的 Agent 记忆安全评估清单。` |
| 可见性 | 所有人可见；原创；审核状态正常 |

**待补（30 秒人工）**：在创作者中心给文章加 `Agent`、`GitHub` 两个标签。发布面板的下拉选项目前只选中了一个，Vue 的多选模型不吃程序化点击。

## 2. V2EX www.v2ex.com — ⛔ 需要人工发

| 字段 | 值 |
|---|---|
| 编辑器 | https://www.v2ex.com/new |
| 节点 | 分享（https://www.v2ex.com/go/share） |
| 标题 | `[原创] 0 FAIL，12 处矛盾：我的 Agent 记忆系统是如何骗了我的` |
| 正文 | `docs/war-story.md` 全文；**V2EX 的 Markdown 渲染器对表格支持一般，发之前把两张表改成列表**（"矛盾 → 门禁"表、"本文数字出处"表） |
| CTA | 仓库 + 清单（清单的绝对链接在正文里已就位） |

**为什么发不了**：V2EX 全站挂了 Cloudflare 人机验证，而 OpenCode 桌面端内置的浏览器是 **Electron**，被 Cloudflare 判为自动化环境（同一出口 IP 用 `curl` 访问 `/`、`/signin`、`/go/share` 都是 200，完全没有验证；换到浏览器里就无限循环验证）。**人机验证本来就该由人过，所以这条只能你在普通浏览器（Firefox/Chrome）里发。**

正文和标题都在上面，仓库链接齐全；你贴进去改两个表格就能发。

## 3. dev.to — 📝 待发（英文版）

| 字段 | 值 |
|---|---|
| 编辑器 | https://dev.to/new |
| 正文 | `docs/war-story.en.md` 全文（英文） |
| 标题 | `0 FAIL, 12 Contradictions: How My Agent Memory System Lied to Me` |
| 标签（最多 4 个） | `ai`、`agents`、`llm`、`devtools` |
| Description（≤100 字符） | `12 gates, 0 FAIL — and a cold read still found 12 contradictions. My verifier lied; here is what fixed it.` |
| Canonical URL | https://github.com/cheah505-cyber/agent-handoff-protocol |
| Published | `true` |

dev.to 的标签输入是 autocomplete：**必须点下拉建议项**，`fill` + Enter 加不进去。

---

## 4. 发完之后

1. 把每个平台的**实际文章 URL** 写回 `HANDOFF.md` §6（Last verification）——发布链接只有实际访问过才算证据。
2. 把第一条外部信号（star / issue / 评论 / 有人问清单）记进 `PROJECT.md`。
3. 三个平台都发完后，开 `AHP-CONTENT-002`：安全圈文章《Agent 的记忆是攻击面》，审查者 `deepseek/deepseek-flash`。

## 5. 红线

- 正文里**不要**出现客户名、生产 URL、内部数据、本机路径。
- 不要承诺"装上就不会漂移"、不要写"自动挖洞"类表述；文章里已经写明边界，不要在评论区自己拆台。
- 评论区一律回技术问题，不接单、不报价、不加微信。评估服务的报价留给 `AHP-CONTENT-002` 之后的单元。
