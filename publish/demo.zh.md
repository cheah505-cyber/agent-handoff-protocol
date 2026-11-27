# 10 分钟演示：故意弄坏一次 Agent 的交接，再修好它

大多数 Agent 记忆的演示都在展示“它记得什么”。这个演示展示另一半：它交给下一次会话的状态**是否自洽**，以及两处说法冲突时会发生什么。

需要 Node.js 20+ 和 npm 7+。不需要 API key、不调用模型、不用安装。

## 一、两行

```bash
npx agent-handoff-cli init demo
cd demo && npx agent-handoff-cli check
```

`init` 会打印写入路径和下一步。`check` 输出：

```
PASS CORE_FILES       core files present
PASS HANDOFF_SCHEMA   frontmatter is valid
PASS HANDOFF_TIME     timestamps are ordered
PASS LEASE            PAUSED has no residual lease
PASS VERIFY_COMMAND   verification command recorded
PASS HANDOFF_BODY     8 sections and next action are present
PASS HANDOFF_FRESH    sections 4-6 are fresh (0 days)
PASS INDEX_MAP        INDEX is a map and its links resolve
PASS PROJECT_SYNC     derived status matches HANDOFF
PASS MEMORY_LINKS     memory index and links are closed
PASS SECRETS          no high-confidence secret pattern found
SKIP GIT_STATE        not a git repository
[ahp] 0 FAIL / 0 WARN / 11 PASS / 1 SKIP
[ahp] check passed
```

SKIP 是诚实的：`GIT_STATE` 需要 git 仓库，这个目录还不是。其余全绿。

## 二、这七个文件是什么

`init` 写入七个文件，其中四个是契约：

| 文件 | 作用 |
|---|---|
| `AGENTS.md` | 入口：边界与交接契约 |
| `INDEX.md` | 文件地图；不放动态状态 |
| `PROJECT.md` | 长期决策，外加一个从 `HANDOFF.md` 派生的状态块 |
| `HANDOFF.md` | 当前工作单元、暂停点、下一步、最后一次验证 |

另外三个是 `memory/MEMORY.md`、一篇教训正文，和 `ahp.config.json`（路径、状态、时效）。

只有 `HANDOFF.md` 承载动态状态。`PROJECT.md` 里的状态块由 `ahp sync` 生成，所以副本不会悄悄漂移。

## 三、弄坏它

打开 `HANDOFF.md`。frontmatter 里是：

```yaml
current_file: "none"
```

§3 里是：

```
## 3. Current working set
- Current file: none.
```

**只改** frontmatter 为 `current_file: "src/auth.ts"`，再跑 `check`：

```
FAIL HANDOFF_BODY     current_file=src/auth.ts contradicts section 3 ("none")
[ahp] 1 FAIL / 0 WARN / 10 PASS / 1 SKIP
[ahp] check failed
```

注意门禁**没有**做判断：它不知道哪个值是真的。它只是发现两处关于同一事实的说法不一致，点名两边，然后失败。这就是这个协议针对的失败类别——结构完整、内部自相矛盾的交接。

## 四、修好它

把值改回 `"none"`，再跑：

```
[ahp] 0 FAIL / 0 WARN / 11 PASS / 1 SKIP
[ahp] check passed
```

第二个可以试的失败：把 `status` 改成 `"ACTIVE"`，`lease_until` 保持 `"none"`。`LEASE` 会失败：

```
FAIL LEASE            ACTIVE requires a lease_until timestamp
```

因为一个进行中的工作单元必须持有未来的租约，否则两个会话可以同时接管。

## 五、它证明了什么，没证明什么

它证明三件事：

- 四个文件彼此一致，或者检查点名了不一致；
- `check` 是只读的：不创建、不删除、不修改任何文件；
- 每个失败都有门禁 ID 和一行可以指认的证据。

它**不证明**：某个事实在世界里仍然为真、某个操作已被授权、写下的下一步就是对的。这些是外部事实，文件检查建立不了。[`docs/limits.md`](https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/docs/limits.md) 一条条列了。

这个演示也展示不了最危险的情况：**所有门禁全绿，散文仍然自相矛盾**。结构必要但不充分。所以协议把门禁和冷读配在一起——一个全新会话回答“现在是什么状态、下一步是什么、哪里互相矛盾”——并且公开自己的边界，而不是给安全保证。

## 在真实仓库上跑

`ahp init` 会拒绝非空目录，除非加 `--force`，所以它不会覆盖已有的 `AGENTS.md`。在空目录里跑，把四个文件改成你的项目，再提交：目录成为 git 仓库后，`GIT_STATE` 就不再 SKIP。

## 想要第二双眼睛

我看一次编码智能体把状态交给下一次会话的方式，回一页纸，最多五条发现，每条落到具体文件与行。前三个仓库免费，边界写在前面：[免费交接评估](https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/publish/assessment-offer.md)。

仓库 MIT：[cheah505-cyber/agent-handoff-protocol](https://github.com/cheah505-cyber/agent-handoff-protocol)。演示蒸馏自的 13 项清单：[`docs/memory-security-checklist.md`](https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/docs/memory-security-checklist.md)。
