# Free handoff assessment

I review how a coding agent hands its state from one session to the next, and send back one page with up to five findings. Free for the first three repositories. The only ask: if the report is useful, let me quote one sentence from your reply as a testimonial. You can decline and keep the report.

## What I check

- The 13 items in [`docs/memory-security-checklist.en.md`](../docs/memory-security-checklist.en.md): one current-state source, a derived status, an owner and a lease, a verification command that can fail, and the three ways a verifier lies to itself.
- Whether the files your agent reads at startup (`AGENTS.md`, `CLAUDE.md`, `HANDOFF.md`, or your equivalent) agree with each other and with the repository.
- Read-only. No code is executed, nothing is changed, nothing is sent anywhere.

## What you get

- One page: the scope, the file or command behind each check, findings (max 5) with `file:line` evidence and a one-line fix, and what I did not check.
- One revision if a finding is wrong or already fixed.

## What I need

- A public repository URL, or a sanitized copy if it is private.
- A pointer to the files the agent reads first.
- Half an hour for follow-up questions, if you want them.

## What this is not

Not a pentest, not a compliance audit, not a guarantee. It checks structure and agreement, not whether a fact is still true in the world or whether an action is authorized.

## How to ask

Open a discussion with the repository URL: https://github.com/cheah505-cyber/agent-handoff-protocol/discussions

First three accepted in order; after that I will say so in the same thread. If the request does not fit (for example, no agent and no handoff), I will say that instead of taking it.

---

# 免费交接评估

我看一次编码智能体**把状态交给下一次会话**的方式，回一页纸，最多五条发现。前三个仓库免费。唯一的交换：如果报告有用，允许我引用你回复里的一句话作为证言；不愿意也可以，报告照给。

## 我检查什么

- [`docs/memory-security-checklist.md`](../docs/memory-security-checklist.md) 的 13 项：单一当前状态源、派生状态、负责人与租约、一条**能失败**的验证命令，以及"验证器骗自己"的三种形态。
- 你的智能体启动时读的文件（`AGENTS.md`、`CLAUDE.md`、`HANDOFF.md`，或你的一整套）彼此是否一致，是否与仓库一致。
- 全程只读：不执行代码、不改文件、不外传内容。

## 你会拿到

- 一页：范围、每条检查对应的文件或命令、最多五条发现（带 `file:line` 证据和一行修法），以及**我没检查什么**。
- 如果某条发现是错的，或你已经修了，可以返工一次。

## 我需要

- 一个公开仓库地址；私有仓库给脱敏副本。
- 指明智能体最先读哪几个文件。
- 需要追问的话，半小时。

## 这不是什么

不是渗透测试，不是合规审计，不构成任何保证。它检查的是结构与一致性，不检查某个事实在世界里是否仍然成立，也不检查某个操作是否被授权。

## 怎么申请

带仓库地址开一个 Discussion：https://github.com/cheah505-cyber/agent-handoff-protocol/discussions

按顺序取前三个；之后我会在同一个帖子里说明。如果请求不合适（比如没有智能体、也没有交接），我会直接说，而不是硬接。
