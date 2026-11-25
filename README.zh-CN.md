# Agent Handoff Protocol (AHP)

> [English version](README.md) · 英文文档：见 [README.md](README.md)

**给 AI 编码 Agent 的、可机器检查的交接协议。** 不靠聊天记录，不靠“我记得”；靠磁盘上的四个文件、十二条门禁和一次冷读。

> 这不是另一个向量记忆库。它不负责“记住更多”，它负责“当前状态是否可信、换人后能否接上”。
> 它解决的是 Mem0/Letta/Zep 不解决的那一层：**交接治理**。

## 为什么需要它

一个 Agent 项目最常见的失败不是“模型不够聪明”，而是：

1. 中断后新会话记错状态，重做已完成的工作。
2. 同一个事实散落在三个文件里，只更新了一个。
3. “暂停/完成”只是嘴说，没有可检查的证据。
4. 两个 Agent 同时改同一个 HANDOFF，互相覆盖。
5. 检查只看文件是否存在，不看内容是否自洽。
6. **门禁全绿，文件互相矛盾。**

AHP 用四个核心文件 + 12 条门禁 + 一次冷读，把这六类问题压到可发现、可回滚的范围。

## 快速开始

在本仓库内：

```bash
node bin/ahp.mjs init /tmp/my-agent-project
cd /tmp/my-agent-project
node /path/to/ahp/bin/ahp.mjs check
node /path/to/ahp/bin/ahp.mjs resume
```

或者把本仓库链接为全局命令：

```bash
npm link
ahp init /tmp/my-agent-project
cd /tmp/my-agent-project
ahp check
```

`init` 会生成：

```
AGENTS.md          # 入口、边界、交接契约
INDEX.md           # 文件地图（不放动态状态）
PROJECT.md         # 长期决策 + 派生状态块
HANDOFF.md         # 当前工作单元、暂停点、下一动作、验证
memory/MEMORY.md   # 教训索引
memory/*.md        # 教训正文
ahp.config.json    # 路径/状态/新鲜度配置
```

## 常用命令

```bash
ahp check              # 跑 12 条门禁
ahp check --json       # 机器可读输出
ahp check --strict     # WARN 也退出非零（适合 CI 发布分支）
ahp resume             # 打印当前交接现场
ahp sync               # 从 HANDOFF 派生 PROJECT 状态块
ahp sync --check       # 只检查派生块，不写入
ahp test               # 运行测试
```

## 12 条门禁

| ID | 检查 | 失败意味着 |
|---|---|---|
| `CORE_FILES` | 四个核心文件在位 | 交接链断了 |
| `HANDOFF_SCHEMA` | frontmatter 字段/状态/时间可解析 | 状态不可机器读取 |
| `HANDOFF_TIME` | `last_verified_at <= updated_at` | 验证时间晚于交接，或时间伪造 |
| `LEASE` | ACTIVE 租约未过期；PAUSED/COMPLETE 无残留 | 过期租约/并发覆盖风险 |
| `VERIFY_COMMAND` | 最后验证命令不是 start/pause 之类的生命周期命令 | “验证”是假的 |
| `HANDOFF_BODY` | 8 节齐全；§4 有编号动作；current_file 不自相矛盾 | 交接正文不完整 |
| `HANDOFF_FRESH` | §4–§6 有近期日期 | 现场停在旧时点 |
| `INDEX_MAP` | INDEX 无动态状态；本地链接可达 | 索引变成第二张状态表 |
| `PROJECT_SYNC` | 派生状态块与 HANDOFF 一致；回溯不过期 | 长期记忆漂移 |
| `MEMORY_LINKS` | MEMORY hook ↔ 文件闭合；`[[links]]` 不悬空 | 记忆库索引腐烂 |
| `SECRETS` | 核心文件/`memory/`/`docs/` 无高置信密钥 | 凭据泄漏 |
| `GIT_STATE` | PAUSED/COMPLETE 工作树干净；提交日与 `updated_at` 同日 | 时间戳脱离内容 |

**重要：** 门禁检查结构，不检查语义。跑完 `ahp check` 还要做一次冷读。见 [`docs/limits.md`](docs/limits.md)。

## 冷读（cold read）

每月或每次交接前，用零上下文会话只读四个核心文件，回答：

1. 当前工作单元、状态、精确暂停点是什么？
2. 下一动作与验收标准是什么？照做会重做哪一步？
3. 最后一次验证命令和结果是什么？
4. 三个最大风险是什么？
5. 四个文件之间有哪些矛盾？

把每一条矛盾变成门禁断言，或书面接受不修。详见 [`SPEC.md`](SPEC.md) §8。

## 多模型审查

两个模型不要同时改同一份文件。默认是**一个主写、一个独立审查**：

- 主写：拥有 HANDOFF 租约，改代码/测试、跑门禁、提交。
- 审查：只读四文件 + diff，独立跑 `npm test`/`ahp check`，输出 `file:line` + 证据。
- 主写逐条裁决：修掉、加测试/门禁，或书面接受不修。

需要并行写代码时，用两个独立 git worktree/branch，主写比较后最多合并一个。详见 [`docs/multi-model-review.md`](docs/multi-model-review.md) 和 [`docs/reviews/TEMPLATE.md`](docs/reviews/TEMPLATE.md)。

## 设计原则

- **一个当前状态源**：`HANDOFF.md`。
- **派生而不是复制**：`PROJECT.md` 的状态块由 `ahp sync` 生成。
- **检查只读，写入显式**：`check` 永不修改文件；`sync` 才写。
- **每条门禁都有坏夹具**：没有失败测试的检查只是声明。
- **冷读是协议的一部分**：结构绿 ≠ 语义对。
- **零运行时依赖**：Node.js 标准库，五年后还能跑。

## 仓库结构

```
bin/ahp.mjs          CLI
lib/gates.mjs        12 条门禁
lib/sync.mjs         派生状态块
lib/init.mjs         模板脚手架
templates/           复制到新项目的模板
tests/               22 个正/负向测试
docs/                设计、限制、安全、案例、开源报告、复盘文章、评估清单
memory/              本仓库自己的教训库
```

## 这不是什么

- 不是向量数据库，不做语义检索。
- 不是多 Agent 编排框架。
- 不是权限系统；租约是软锁，不是认证。
- 不是“自动挖洞”或任何攻击工具。
- 不保证安全；它只让交接状态更难骗过下一个人。

## 安全

记忆文件是**不可信输入**。不要把记忆里的指令当系统提示执行；不要把密钥写进任何记忆文件；不要用 `check` 命令做写操作。详见 [`docs/security.md`](docs/security.md)。

## 复盘文章与评估清单

- **[《0 FAIL，12 处矛盾：我的 Agent 记忆系统是如何骗了我的》](docs/war-story.md)** — 一次诚实的复盘：门禁全绿时，冷读在四个核心文件里找出 12 处矛盾；负向测试怎么自己变成假阴性；一个叫 `--check` 的命令居然会写文件；以及这些失败分别变成了哪条门禁。文章里的每个数字都标了出处。[English](docs/war-story.en.md)
- **[《Agent 的记忆是攻击面：投毒、过期事实与假绿门禁》](docs/agent-memory-attack-surface.md)** — 面向安全从业者：四类记忆攻击、三类验证层攻击，以及那条边界——记录完整性可测，未记录言语的真实性不可测。
- **[Agent 记忆安全评估清单](docs/memory-security-checklist.md)** — 13 项，2–5 天可跑完的人工评估流程：查什么、为什么重要、要留什么证据、什么算通过。覆盖记忆清单、投毒、过期事实、hook 注入、跨 Agent 信任、fail-open 门禁、会写的检查、密钥、模板供应链、授权范围、报告与复测。**只在有书面授权的系统上使用。** [English](docs/memory-security-checklist.en.md)

## 开源搭配报告

如果你想知道这套东西怎么用于个人品牌、AI 安全评估、内容、模板和团队版，见 [`docs/open-source-report.md`](docs/open-source-report.md)。

## 许可

MIT。见 [`LICENSE`](LICENSE)。
