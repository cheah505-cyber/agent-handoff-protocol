# 发布计划：war story（`docs/war-story.md`）

> 单一来源：正文只有一份，就是 `docs/war-story.md`。这里只放**每个平台的元数据**，不要复制正文。
> 状态：2026-11-25 起，AI 工程圈优先（掘金 / V2EX / dev.to）；安全圈那一篇是 `AHP-CONTENT-002`。

## 素材（全部已公开）

| 用途 | 链接 |
|---|---|
| 仓库（主 CTA） | https://github.com/cheah505-cyber/agent-handoff-protocol |
| 文章原文（Markdown） | https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/docs/war-story.md |
| 记忆安全评估清单（次 CTA） | https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/docs/memory-security-checklist.md |

---

## 1. 掘金 juejin.cn

| 字段 | 值 |
|---|---|
| 编辑器 | https://juejin.cn/creator/post |
| 标题 | `0 FAIL，12 处矛盾：我的 Agent 记忆系统是如何骗了我的` |
| 分类 | 人工智能（备选：开发工具） |
| 标签 | `AI Agent`、`开发工具`、`GitHub`、`Claude Code` |
| 摘要 | `我的门禁 12 条全绿、0 FAIL，但零上下文冷读在四个核心文件里找出 12 处矛盾——骗我的不是模型，是验证层。附一份 13 项的 Agent 记忆安全评估清单。` |
| 可见性 | 所有人可见（默认） |
| 封面 | 可选；暂用平台自动生成的首图 |
| 正文 | `docs/war-story.md` 全文（三行引用块全部保留：标题下的"12 处的归属"说明、"每个数字都能找到出处"、"结构绿 ≠ 语义对"） |

**CTA（放在正文末尾第一段之后，不要单开一段像广告）**：

> 仓库：https://github.com/cheah505-cyber/agent-handoff-protocol
> 清单：https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/docs/memory-security-checklist.md

## 2. V2EX www.v2ex.com

| 字段 | 值 |
|---|---|
| 编辑器 | https://www.v2ex.com/new |
| 节点 | 分享（https://www.v2ex.com/go/share） |
| 标题 | `[原创] 0 FAIL，12 处矛盾：我的 Agent 记忆系统是如何骗了我的` |
| 正文 | `docs/war-story.md` 全文；V2EX 的 Markdown 渲染器对表格支持一般，**发之前把两张表改成列表**（"矛盾 → 门禁"表、"本文数字出处"表） |
| 标签 | 无（V2EX 不支持标签，用节点代替） |
| 附言 | 无 |

V2EX 入口有 Cloudflare 人机验证，第一次访问需要手动过一下。

## 3. dev.to

| 字段 | 值 |
|---|---|
| 编辑器 | https://dev.to/new |
| 标题 | `0 FAIL, 12 Contradictions: How My Agent Memory System Lied to Me` |
| 标签（最多 4 个） | `ai`、`agents`、`llm`、`devtools` |
| Description（≤100 字符） | `12 gates, 0 FAIL — and a cold read still found 12 contradictions. My verifier lied; here is what fixed it.` |
| Canonical URL | https://github.com/cheah505-cyber/agent-handoff-protocol |
| Series | 留空 |
| Published | `true`（先发再改比草稿省事，错了也能改） |
| 正文 | `docs/war-story.md` 全文。**中文正文**，英文版是后续单元；dev.to 面向英文读者，中文版先上，流量按低预期算 |

登录入口：https://dev.to/enter（可用 GitHub 登录，但**浏览器里没有 GitHub 会话**，需要先在浏览器里登录 GitHub 或用邮箱）。

---

## 4. 发完之后

1. 把每个平台的**实际文章 URL** 写回 `HANDOFF.md` §6（Last verification）——发布链接只有实际访问过才算证据。
2. 把第一条外部信号（star / issue / 评论 / 有人问清单）记进 `PROJECT.md`。
3. 三个平台都发完后，开 `AHP-CONTENT-002`：安全圈文章《Agent 的记忆是攻击面》，审查者 `deepseek/deepseek-flash`。

## 5. 红线

- 正文里**不要**出现客户名、生产 URL、内部数据、本机路径。
- 不要承诺"装上就不会漂移"、不要写"自动挖洞"类表述；文章里已经写明边界，不要在评论区自己拆台。
- 评论区一律回技术问题，不接单、不报价、不加微信。评估服务的报价留给 `AHP-CONTENT-002` 之后的单元。
