# AHP-CONTENT-002 — 安全圈文章：Agent 的记忆是攻击面

Status: ready
Owner: MiniMax (primary; take the lease in `HANDOFF.md`)
Reviewer: DeepSeek (`deepseek/deepseek-flash`, read-only; findings only)
Depends on: AHP-CONTENT-001 (war story + checklist published)

## Goal

写一篇面向**安全从业者**的中文文章，把"Agent 记忆"从工程问题讲成攻击面问题：

- 资产不是代码，是下一轮 Agent 的**信念状态**；
- 四类记忆攻击 + 三类验证层攻击，每类给"可观测的失败形态"，不给 exploit；
- 一个更深的边界：**什么可以被机器检查，什么只能靠人回读**（来自 dev.to 评论的真实问题）；
- 防御动作落到五条可执行的最小动作；
- CTA 是 13 项评估清单（免费）。

定位：防御性、授权范围内、不发布 exploit、不点名真实目标。

## Inputs

- `docs/security.md` — 威胁模型、攻击场景表、常见的框架映射（OWASP LLM Top 10 / MITRE ATLAS / NIST AI RMF）。
- `docs/memory-security-checklist.md` — 13 项评估清单，文章的 CTA。
- `docs/limits.md` — 结构绿 ≠ 语义对；五类验证层失败。
- `docs/lessons-from-production.md` / `docs/case-studies.md` — 真实案例（脱敏）。
- dev.to 评论线程（2026-11-25）：`3md09` / 回复 `3md5h` —— 溯源链 vs check 的问题。
- 仓库实际数字：12 条门禁、29 个测试、冷读 8/3/5。

不要编数字。仓库里没有的，标成观点或删掉。

## Deliverables

### `docs/agent-memory-attack-surface.md`（中文，3000–4200 字）

结构：

1. **开场**：资产转移——从代码到"信念状态"；为什么传统 code review 看不见它。
2. **四类记忆攻击**：投毒 / 过期事实 / hook 注入 / 跨 Agent 信任。每类：场景 → 可观测的失败形态 → 最小缓解。
3. **验证层自己的攻击面**：fail-open 门禁 / 会写的检查 / 模板供应链。这一节是本文与其他"AI 安全"文章的区别。
4. **边界**：什么能被机器检查。记录完整性可测（同意时哈希，改一字必红）；引述真实性不可测（回读让检查者与被检查者同一主体 → `attested, not verified`，永不报绿）。
5. **五个最小防御动作**：不可信输入 / 最小权限 / 只读检查 / 冷读 / findings 二选一处置。
6. **授权边界**：只测授权系统、记忆文件不是授权、不公开 exploit、不碰真实用户数据。
7. **CTA**：13 项清单（免费）+ 仓库。

## Constraints

- 不出现客户名、生产 URL、内部数据、本机路径。
- 不发布 exploit、不写"自动挖洞"、不承诺安全保证。
- 每个数字要能指回仓库文件或命令输出。
- 防御框架，不是攻击教程：攻击场景只写到"可观测的失败形态"。

## Acceptance

- [ ] `docs/agent-memory-attack-surface.md` 存在，并从 `README.md` / `INDEX.md` 链接。
- [ ] 每个数字可追溯到仓库文件或命令输出。
- [ ] 无密钥、客户数据、生产细节。
- [ ] `npm test` 23/23；`node bin/ahp.mjs check` 0 FAIL；`node bin/ahp.mjs sync --check` pass。
- [ ] DeepSeek (`deepseek/deepseek-flash`) 审查结论已逐条裁决，记录进 `docs/reviews/`。
- [ ] 零上下文冷读能从四文件说出下一动作。

## Suggested sequence

1. 读 `docs/security.md` + `docs/limits.md` + 评论线程。
2. 列每节的"要证明什么"，标出处。
3. 写正文，先写第 4 节（边界）——它是全文最独特的部分。
4. 自查数字与链接；跑门禁。
5. 交给 `deepseek/deepseek-flash` 审查；逐条裁决。
6. 更新 `HANDOFF` / `PROJECT`，提交。

## Open questions for the user

- 发布渠道顺序：先知 / FreeBuf / 安全客 / LinkedIn？
- 是否同时出英文版（LinkedIn 需要）？
- 评论区策略：只答技术问题，不接单——是否延续 war story 那篇的规则？
