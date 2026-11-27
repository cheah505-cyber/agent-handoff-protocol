# 10 分钟演示：故意制造一次交接矛盾，再修好它

大多数关于 Agent 记忆的演示，都在展示“它记得什么”。这个演示展示另一半：Agent 交给下一次会话的状态**是否自洽**，以及两处说法冲突时会发生什么。

需要 Node.js 20+ 和 npm 7+。不需要 API key，不调用模型，也无需手动安装。

## 一、两行命令

```bash
npx agent-handoff-cli init demo
cd demo && npx agent-handoff-cli check
```

`init` 会打印写入路径和下一步。`check` 的输出是：

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

这个 SKIP 是如实说明：`GIT_STATE` 需要 git 仓库，而这个目录还不是。其余检查全部通过。

## 二、七个文件分别是什么

`init` 会写入七个文件，其中四个是契约：

| 文件 | 作用 |
|---|---|
| `AGENTS.md` | 入口：边界与交接契约 |
| `INDEX.md` | 文件地图；不放动态状态 |
| `PROJECT.md` | 长期决策，外加一个从 `HANDOFF.md` 派生的状态块 |
| `HANDOFF.md` | 当前工作单元、暂停点、下一步、最后一次验证 |

另外三个是 `memory/MEMORY.md`、一篇教训正文和 `ahp.config.json`（路径、状态、时效）。

只有 `HANDOFF.md` 承载动态状态。`PROJECT.md` 里的状态块由 `ahp sync` 生成，因此副本不会悄悄漂移。

## 三、制造一处矛盾

打开 `HANDOFF.md`。frontmatter 里写的是：

```yaml
current_file: "none"
```

§3 里写的是：

```
## 3. Current working set
- Current file: none.
```

只把 frontmatter 里的 `current_file` 改成 `"src/auth.ts"`，§3 保持不动，再跑 `check`：

```
FAIL HANDOFF_BODY     current_file=src/auth.ts contradicts section 3 ("none")
[ahp] 1 FAIL / 0 WARN / 10 PASS / 1 SKIP
[ahp] check failed
```

注意：门禁**没有**做判断——它不知道哪个值是真的。它只是发现两处关于同一事实的说法不一致，于是把两边的值都指出来，判定失败。这正是这个协议针对的失败类别：结构完整，但内部自相矛盾。

## 四、恢复一致

把值改回 `"none"`，再跑：

```
[ahp] 0 FAIL / 0 WARN / 11 PASS / 1 SKIP
[ahp] check passed
```

还可以试第二个失败：把 `status` 改成 `"ACTIVE"`，`lease_until` 保持 `"none"`。`LEASE` 会失败：

```
FAIL LEASE            ACTIVE requires a lease_until timestamp
```

因为进行中的工作单元必须持有一个未到期的租约，否则两个会话可以同时接管。

## 五、它证明了什么，又没证明什么

它证明三件事：

- 四个文件彼此一致，或者检查指出了不一致；
- `check` 是只读的：不创建、不删除、不修改任何文件；
- 每个失败都有门禁 ID，以及可以指认的文件和行。

它**不证明**三件事：某个事实在世界里仍然为真、某个操作已被授权、写下的下一步就是对的。这些是外部事实，文件检查无法证明。[`docs/limits.md`](https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/docs/limits.md) 逐条列出了这些边界。

这个演示也展示不了最危险的情况：**所有门禁全绿，散文却仍然自相矛盾**。结构必要，但不充分。所以协议把门禁和冷读配在一起——由一个全新会话回答“现在是什么状态、下一步是什么、哪里互相矛盾”——并且公开自己的边界，而不是给出安全保证。

## 在真实仓库上跑

`ahp init` 会拒绝非空目录，除非加 `--force`；因此它不会覆盖已有的 `AGENTS.md`。在空目录里运行，把四个文件改成描述你的项目，再提交：目录成为 git 仓库后，`GIT_STATE` 就不再 SKIP。

## 想要第二双眼睛

我会看一次编码智能体如何把状态交给下一次会话，然后回一页纸，最多五条发现，每条落到具体文件与行。前三个仓库免费，边界写在前面：[免费交接评估](https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/publish/assessment-offer.md)。

仓库是 MIT 许可：[cheah505-cyber/agent-handoff-protocol](https://github.com/cheah505-cyber/agent-handoff-protocol)。这份演示所依据的 13 项清单：[`docs/memory-security-checklist.md`](https://github.com/cheah505-cyber/agent-handoff-protocol/blob/master/docs/memory-security-checklist.md)。
