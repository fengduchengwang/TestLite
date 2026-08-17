(function () {
  const data = window.PsyTest.data;
  Object.assign(data, {
  "work_001": {
    "schemaVersion": 2,
    "meta": {
      "key": "work_001",
      "category": "work",
      "categoryLabel": "职场",
      "level": "deep",
      "levelLabel": "深度决策测试",
      "title": "你该换工作，还是先换一种工作方式？",
      "subtitle": "不是替你下辞职结论，而是把消耗、岗位匹配、成长、边界可调、团队支持、现实准备、方向清晰和行动启动放在同一张决策地图里。",
      "duration": "约8分钟",
      "disclaimer": "本测试用于日常自我观察与决策梳理，不构成专业心理评估、诊断或替代性建议。"
    },
    "display": {
      "template": "deep",
      "heroLabel": "你的职业去留报告",
      "dimensionTitle": "八项职业现实条件",
      "radarTitle": "你的职业决策全景",
      "deepAnalysisTitle": "真正影响去留的，不止一个答案",
      "modules": [
        "hero",
        "decision",
        "radar",
        "dimensions",
        "evidence",
        "deepAnalysis",
        "pattern",
        "strengths",
        "insight",
        "actions",
        "share"
      ]
    },
    "dimensions": [
      {
        "key": "exhaustion",
        "label": "工作消耗",
        "bands": {
          "low": "当前工作消耗仍在可恢复范围。",
          "medium": "工作已明显挤压部分生活容量。",
          "high": "消耗持续侵入睡眠、情绪或身体状态。"
        }
      },
      {
        "key": "fit",
        "label": "岗位匹配",
        "bands": {
          "low": "核心任务与优势、偏好存在明显错位。",
          "medium": "岗位中有匹配部分，也有长期摩擦。",
          "high": "当前任务能较稳定发挥你的核心能力。"
        }
      },
      {
        "key": "growth",
        "label": "成长空间",
        "bands": {
          "low": "未来半年可获得的新能力和资源有限。",
          "medium": "仍有成长，但需要主动争取。",
          "high": "岗位仍能提供清楚的能力、项目或资源增量。"
        }
      },
      {
        "key": "adjustability",
        "label": "边界可调",
        "bands": {
          "low": "问题较难通过沟通、换组或流程改变。",
          "medium": "部分问题可调，但需要明确推动。",
          "high": "当前困境存在现实可执行的内部调整空间。"
        }
      },
      {
        "key": "support",
        "label": "团队支持",
        "bands": {
          "low": "关键关系较少提供尊重、资源或修复。",
          "medium": "支持不稳定，取决于具体对象和场景。",
          "high": "团队中存在可依赖的协作和支持资源。"
        }
      },
      {
        "key": "readiness",
        "label": "现实准备",
        "bands": {
          "low": "现金流、机会或个人安排尚不足以支持变化。",
          "medium": "已有部分准备，但仍有关键缺口。",
          "high": "现实资源已能支持你有选择地行动。"
        }
      },
      {
        "key": "clarity",
        "label": "方向清晰",
        "bands": {
          "low": "你更清楚不想要什么，还不清楚下一步要什么。",
          "medium": "方向已有轮廓，需要现实验证。",
          "high": "你能描述下一步想要的工作状态和筛选条件。"
        }
      },
      {
        "key": "action",
        "label": "行动启动",
        "bands": {
          "low": "判断主要停留在想法和情绪里。",
          "medium": "已经出现零散探索。",
          "high": "你正在用信息、试投或小实验验证下一步。"
        }
      }
    ],
    "questions": [
      {
        "scene": "下班状态",
        "dimension": "exhaustion",
        "q": "过去一个月，下班后的你最常处于什么状态？",
        "options": [
          {
            "text": "基本只剩下躺着和刷手机，重要私事长期停滞",
            "score": {
              "exhaustion": 3
            }
          },
          {
            "text": "工作日明显疲惫，周末休息后能恢复一部分",
            "score": {
              "exhaustion": 2
            }
          },
          {
            "text": "忙时会累，但仍能维持基本生活和兴趣",
            "score": {
              "exhaustion": 1
            }
          },
          {
            "text": "多数时候能从工作切换出来",
            "score": {
              "exhaustion": 0,
              "support": 1
            }
          }
        ]
      },
      {
        "scene": "身体信号",
        "dimension": "exhaustion",
        "q": "想到第二天上班时，身体最接近哪种反应？",
        "options": [
          {
            "text": "持续失眠、胸闷、胃口变化或明显抗拒起床",
            "score": {
              "exhaustion": 3
            }
          },
          {
            "text": "周日晚开始紧张，但通常还能正常工作",
            "score": {
              "exhaustion": 2
            }
          },
          {
            "text": "偶尔不想上班，和具体任务有关",
            "score": {
              "exhaustion": 1
            }
          },
          {
            "text": "没有明显身体抗拒，更多是普通疲惫",
            "score": {
              "exhaustion": 0
            }
          }
        ]
      },
      {
        "scene": "恢复速度",
        "dimension": "exhaustion",
        "q": "完整休息两三天后，你的状态通常怎样？",
        "options": [
          {
            "text": "仍然没有恢复，一想到回去就迅速掉电",
            "score": {
              "exhaustion": 3
            }
          },
          {
            "text": "能恢复一点，但很快又被工作耗空",
            "score": {
              "exhaustion": 2
            }
          },
          {
            "text": "大部分能回来，说明主要是阶段性负荷",
            "score": {
              "exhaustion": 1
            }
          },
          {
            "text": "休息后恢复明显，生活还有稳定支点",
            "score": {
              "exhaustion": 0,
              "action": 1
            }
          }
        ]
      },
      {
        "scene": "能力发挥",
        "dimension": "fit",
        "q": "当前岗位最核心的任务，与你真正擅长的能力有多匹配？",
        "options": [
          {
            "text": "高度匹配，难点主要来自任务量而非能力错位",
            "score": {
              "fit": 3
            }
          },
          {
            "text": "一半能发挥，一半长期让我别扭",
            "score": {
              "fit": 2
            }
          },
          {
            "text": "偶尔用到优势，大部分时间在补不擅长的部分",
            "score": {
              "fit": 1
            }
          },
          {
            "text": "核心要求与我的优势和工作方式明显相反",
            "score": {
              "fit": 0,
              "exhaustion": 1
            }
          }
        ]
      },
      {
        "scene": "掌控感",
        "dimension": "fit",
        "q": "完成一项代表性工作时，你更常获得哪种感受？",
        "options": [
          {
            "text": "能看见自己的专业判断确实创造了价值",
            "score": {
              "fit": 3
            }
          },
          {
            "text": "有部分成就感，但常被流程或角色限制",
            "score": {
              "fit": 2
            }
          },
          {
            "text": "主要是终于结束，很少感到能力被使用",
            "score": {
              "fit": 1
            }
          },
          {
            "text": "经常怀疑自己是不是根本不适合这类工作",
            "score": {
              "fit": 0,
              "exhaustion": 1
            }
          }
        ]
      },
      {
        "scene": "换个环境",
        "dimension": "fit",
        "q": "如果把领导、同事和公司名都换掉，只保留同类工作内容，你还愿意做吗？",
        "options": [
          {
            "text": "愿意，工作内容本身仍有吸引力",
            "score": {
              "fit": 3
            }
          },
          {
            "text": "可能愿意，但需要改变部分职责比例",
            "score": {
              "fit": 2,
              "adjustability": 1
            }
          },
          {
            "text": "不确定，我对内容和环境都在失望",
            "score": {
              "fit": 1
            }
          },
          {
            "text": "不愿意，我想离开的首先就是这类任务",
            "score": {
              "fit": 0,
              "clarity": 1
            }
          }
        ]
      },
      {
        "scene": "未来半年",
        "dimension": "growth",
        "q": "继续留在当前岗位半年，你最确定能带走什么？",
        "options": [
          {
            "text": "清楚的新能力、关键项目或可迁移资源",
            "score": {
              "growth": 3
            }
          },
          {
            "text": "有一些增量，但需要主动争取才会发生",
            "score": {
              "growth": 2
            }
          },
          {
            "text": "更多是重复经验，新的积累已经很少",
            "score": {
              "growth": 1
            }
          },
          {
            "text": "很难说出除了工资以外还能带走什么",
            "score": {
              "growth": 0
            }
          }
        ]
      },
      {
        "scene": "反馈质量",
        "dimension": "growth",
        "q": "你现在获得的反馈，能帮助能力持续提高吗？",
        "options": [
          {
            "text": "有具体标准、挑战和复盘，能看见进步路径",
            "score": {
              "growth": 3,
              "support": 1
            }
          },
          {
            "text": "偶尔有有效反馈，但主要靠自己摸索",
            "score": {
              "growth": 2
            }
          },
          {
            "text": "反馈多是结果好坏，很少告诉我如何提高",
            "score": {
              "growth": 1
            }
          },
          {
            "text": "长期没有反馈，或只有情绪化评价",
            "score": {
              "growth": 0,
              "support": 0
            }
          }
        ]
      },
      {
        "scene": "机会窗口",
        "dimension": "growth",
        "q": "当前平台还有你真正想争取、且一年内可能获得的机会吗？",
        "options": [
          {
            "text": "有，而且路径、条件和时间窗口比较清楚",
            "score": {
              "growth": 3,
              "clarity": 1
            }
          },
          {
            "text": "有可能，但需要先验证资源是否真实",
            "score": {
              "growth": 2,
              "action": 1
            }
          },
          {
            "text": "曾经期待过，现在越来越不确定",
            "score": {
              "growth": 1
            }
          },
          {
            "text": "基本没有，继续留下主要是在维持现状",
            "score": {
              "growth": 0
            }
          }
        ]
      },
      {
        "scene": "工作方式",
        "dimension": "adjustability",
        "q": "最消耗你的问题，能否通过调整职责、节奏或协作方式改善？",
        "options": [
          {
            "text": "能，我知道具体要和谁谈、改什么",
            "score": {
              "adjustability": 3,
              "action": 1
            }
          },
          {
            "text": "可能能，但还没有做过正式尝试",
            "score": {
              "adjustability": 2
            }
          },
          {
            "text": "只能提现小修小补，核心问题很难改变",
            "score": {
              "adjustability": 1
            }
          },
          {
            "text": "不能，问题来自岗位或组织的固定结构",
            "score": {
              "adjustability": 0
            }
          }
        ]
      },
      {
        "scene": "边界协商",
        "dimension": "adjustability",
        "q": "你明确提出合理边界或资源需求后，组织通常怎样回应？",
        "options": [
          {
            "text": "愿意讨论，并出现过真实调整",
            "score": {
              "adjustability": 3,
              "support": 2
            }
          },
          {
            "text": "口头理解，但执行需要我持续推动",
            "score": {
              "adjustability": 2
            }
          },
          {
            "text": "短期改善，之后很快回到原样",
            "score": {
              "adjustability": 1
            }
          },
          {
            "text": "需求常被否定、惩罚或解释成态度问题",
            "score": {
              "adjustability": 0,
              "support": 0
            }
          }
        ]
      },
      {
        "scene": "内部选项",
        "dimension": "adjustability",
        "q": "除了离职，你还有换组、转岗、减少职责或改变流程的现实选项吗？",
        "options": [
          {
            "text": "有明确选项，也知道申请条件",
            "score": {
              "adjustability": 3
            }
          },
          {
            "text": "可能有，需要进一步找人确认",
            "score": {
              "adjustability": 2,
              "action": 1
            }
          },
          {
            "text": "理论上存在，但现实阻力很大",
            "score": {
              "adjustability": 1
            }
          },
          {
            "text": "几乎没有，核心环境无法绕开",
            "score": {
              "adjustability": 0
            }
          }
        ]
      },
      {
        "scene": "关键关系",
        "dimension": "support",
        "q": "遇到困难时，团队里是否有一个能提供真实帮助的人？",
        "options": [
          {
            "text": "有，能讨论问题、资源和边界",
            "score": {
              "support": 3
            }
          },
          {
            "text": "有愿意听的人，但实际资源有限",
            "score": {
              "support": 2
            }
          },
          {
            "text": "偶尔有人帮，但关系不稳定",
            "score": {
              "support": 1
            }
          },
          {
            "text": "基本没有，困难通常只能自己承担",
            "score": {
              "support": 0,
              "exhaustion": 1
            }
          }
        ]
      },
      {
        "scene": "失误时刻",
        "dimension": "support",
        "q": "当你出现一次合理失误时，团队更常怎样处理？",
        "options": [
          {
            "text": "复盘原因、修系统，也明确个人责任",
            "score": {
              "support": 3,
              "growth": 1
            }
          },
          {
            "text": "看具体负责人，有时能就事论事",
            "score": {
              "support": 2
            }
          },
          {
            "text": "先追责和自保，之后很少真正修复",
            "score": {
              "support": 1
            }
          },
          {
            "text": "公开羞辱、甩锅或让人长期不敢犯错",
            "score": {
              "support": 0,
              "exhaustion": 1
            }
          }
        ]
      },
      {
        "scene": "协作尊重",
        "dimension": "support",
        "q": "你的时间、专业意见和基本尊重在团队中得到怎样对待？",
        "options": [
          {
            "text": "多数时候被认真对待，分歧也能讨论",
            "score": {
              "support": 3
            }
          },
          {
            "text": "整体尚可，但忙乱时容易被忽略",
            "score": {
              "support": 2
            }
          },
          {
            "text": "需要反复争取才能获得基本配合",
            "score": {
              "support": 1
            }
          },
          {
            "text": "经常被随意占用、否定或当作默认兜底",
            "score": {
              "support": 0,
              "exhaustion": 1
            }
          }
        ]
      },
      {
        "scene": "现金缓冲",
        "dimension": "readiness",
        "q": "如果收入中断，你现有的可支配储备能覆盖多久必要开支？",
        "options": [
          {
            "text": "六个月以上，并已核算必要支出",
            "score": {
              "readiness": 3
            }
          },
          {
            "text": "三到六个月，仍需控制部分开销",
            "score": {
              "readiness": 2
            }
          },
          {
            "text": "一到三个月，变化会带来明显压力",
            "score": {
              "readiness": 1
            }
          },
          {
            "text": "不足一个月，或没有认真核算",
            "score": {
              "readiness": 0
            }
          }
        ]
      },
      {
        "scene": "外部机会",
        "dimension": "readiness",
        "q": "你对外部市场和自己的可选择范围了解多少？",
        "options": [
          {
            "text": "已经面试、试投或与真实从业者交流",
            "score": {
              "readiness": 3,
              "action": 2
            }
          },
          {
            "text": "看过岗位并更新了简历，但验证不多",
            "score": {
              "readiness": 2
            }
          },
          {
            "text": "零散关注，主要依据想象判断",
            "score": {
              "readiness": 1
            }
          },
          {
            "text": "几乎不了解，只知道想离开现在",
            "score": {
              "readiness": 0,
              "clarity": 0
            }
          }
        ]
      },
      {
        "scene": "生活安排",
        "dimension": "readiness",
        "q": "家庭责任、社保、居住和重要支出是否支持你做变化？",
        "options": [
          {
            "text": "已逐项确认，关键风险有替代方案",
            "score": {
              "readiness": 3
            }
          },
          {
            "text": "大部分可控，还有一两个缺口要补",
            "score": {
              "readiness": 2
            }
          },
          {
            "text": "有明显限制，但暂时没有具体安排",
            "score": {
              "readiness": 1
            }
          },
          {
            "text": "变化会立刻影响基本生活或他人责任",
            "score": {
              "readiness": 0
            }
          }
        ]
      },
      {
        "scene": "想要什么",
        "dimension": "clarity",
        "q": "如果下一份工作只能改善三件事，你能明确说出是哪三件吗？",
        "options": [
          {
            "text": "能，而且知道每一项如何在面试中验证",
            "score": {
              "clarity": 3,
              "action": 1
            }
          },
          {
            "text": "能说出方向，但标准还比较模糊",
            "score": {
              "clarity": 2
            }
          },
          {
            "text": "主要知道不要什么，想要什么不够清楚",
            "score": {
              "clarity": 1
            }
          },
          {
            "text": "只想先离开，其他之后再说",
            "score": {
              "clarity": 0,
              "exhaustion": 1
            }
          }
        ]
      },
      {
        "scene": "问题归因",
        "dimension": "clarity",
        "q": "你能区分自己想离开的是公司、岗位、行业，还是当前工作方式吗？",
        "options": [
          {
            "text": "能，并有事实支持这个判断",
            "score": {
              "clarity": 3
            }
          },
          {
            "text": "有主要判断，但仍需外部验证",
            "score": {
              "clarity": 2,
              "action": 1
            }
          },
          {
            "text": "几种问题混在一起，很难分开",
            "score": {
              "clarity": 1
            }
          },
          {
            "text": "无法区分，只知道继续下去很难受",
            "score": {
              "clarity": 0,
              "exhaustion": 1
            }
          }
        ]
      },
      {
        "scene": "选择标准",
        "dimension": "clarity",
        "q": "面对更高薪、更多成长和更稳节奏三种机会，你知道如何排序吗？",
        "options": [
          {
            "text": "知道当前阶段最优先什么，也知道底线",
            "score": {
              "clarity": 3
            }
          },
          {
            "text": "大致知道，但真正选择时可能摇摆",
            "score": {
              "clarity": 2
            }
          },
          {
            "text": "每个都想要，缺少现实取舍标准",
            "score": {
              "clarity": 1
            }
          },
          {
            "text": "还没想过，通常看哪个机会先出现",
            "score": {
              "clarity": 0
            }
          }
        ]
      },
      {
        "scene": "信息验证",
        "dimension": "action",
        "q": "过去一个月，你为职业变化做过哪类真实动作？",
        "options": [
          {
            "text": "完成过访谈、试投、作品或面试等外部验证",
            "score": {
              "action": 3,
              "readiness": 1
            }
          },
          {
            "text": "更新资料、筛选岗位并约了下一步",
            "score": {
              "action": 2
            }
          },
          {
            "text": "收藏信息、看内容，但还没有对外动作",
            "score": {
              "action": 1
            }
          },
          {
            "text": "主要在反复想，几乎没有留下行动痕迹",
            "score": {
              "action": 0
            }
          }
        ]
      },
      {
        "scene": "最小实验",
        "dimension": "action",
        "q": "如果暂时不能辞职，你能否设计一个两周内验证方向的小实验？",
        "options": [
          {
            "text": "能，已经有明确对象、动作和完成标准",
            "score": {
              "action": 3,
              "clarity": 1
            }
          },
          {
            "text": "能想到方向，需要再缩小范围",
            "score": {
              "action": 2
            }
          },
          {
            "text": "知道应该验证，但总想等完整时间",
            "score": {
              "action": 1
            }
          },
          {
            "text": "想不到除了辞职以外还能怎么验证",
            "score": {
              "action": 0
            }
          }
        ]
      },
      {
        "scene": "行动节奏",
        "dimension": "action",
        "q": "你对改变工作的计划，目前最接近哪个状态？",
        "options": [
          {
            "text": "有固定节奏，每周都有一个可检查动作",
            "score": {
              "action": 3
            }
          },
          {
            "text": "已经开始，但容易被本职工作打断",
            "score": {
              "action": 2,
              "exhaustion": 1
            }
          },
          {
            "text": "偶尔冲动准备，之后又停很久",
            "score": {
              "action": 1
            }
          },
          {
            "text": "还停在“等状态好一点再开始”",
            "score": {
              "action": 0
            }
          }
        ]
      }
    ],
    "profiles": {
      "exhaustion": {
        "name": "消耗已成主矛盾",
        "verdict": "你现在首先需要处理的不是职业理想，而是持续下降的可用容量。",
        "core": "当工作长期侵入睡眠、身体和基本生活，判断本身也会被低电量扭曲。你需要尽快降低暴露、获得支持并建立退出条件，而不是继续证明自己能扛。",
        "combo": "你当前最突出的事实是工作消耗已经超过普通疲惫。",
        "secondary": "你也需要把恢复能力纳入职业决策，而不是只看是否还能完成任务。",
        "trigger": "持续高负荷、下班仍待机、休息后也难恢复",
        "reaction": "硬撑、报复性补偿、把生活继续往后放",
        "benefit": "短期保住交付和收入稳定",
        "cost": "恢复周期拉长，选择能力和行动资源同步下降",
        "strengths": [
          "责任感强，压力下仍能维持关键任务",
          "对现实后果有承担意识"
        ],
        "costs": [
          "容易把身体报警解释成不够努力",
          "拖到完全耗尽后，选择空间反而更小"
        ],
        "actions": [
          {
            "time": "本周",
            "text": "记录7天睡眠、身体信号和下班可用时间，并立即停止一项非核心额外承担。"
          },
          {
            "time": "30天",
            "text": "与关键负责人完成一次负荷或职责协商，同时建立现金缓冲和外部信息收集节奏。"
          },
          {
            "time": "90天",
            "text": "如果消耗指标没有持续改善，按预先设定条件启动转岗或离开，而不是重新解释自己还能撑。"
          }
        ],
        "share": "我不是突然想走，是可用的自己正在被这份工作一点点用完。"
      },
      "fit": {
        "name": "岗位仍有契合资源",
        "verdict": "你和工作内容并非完全错位，先分清是岗位问题还是环境与方式问题。",
        "core": "当前任务仍能调用你的核心能力，也能产生一定价值感。如果消耗主要来自节奏、关系或边界，直接离开可能把可调整问题误判为职业方向错误。",
        "combo": "你在工作内容中仍有真实匹配和能力抓手。",
        "secondary": "你也需要确认这份契合能否在更健康的条件下持续。",
        "trigger": "环境摩擦掩盖了工作内容本身的价值",
        "reaction": "把对公司和关系的不满扩展成对职业整体的否定",
        "benefit": "离开念头暂时提供摆脱现实问题的出口",
        "cost": "可能在下一份同类工作中重复相同工作方式",
        "strengths": [
          "核心能力与任务仍有连接",
          "能够从专业产出获得价值感"
        ],
        "costs": [
          "容易因为内容匹配而容忍不合理环境",
          "也可能低估可迁移能力在外部的价值"
        ],
        "actions": [
          {
            "time": "本周",
            "text": "分别列出“喜欢的工作内容”和“不能接受的工作条件”，禁止混在同一栏。"
          },
          {
            "time": "30天",
            "text": "验证一次内部调整或同类外部岗位，比较内容相同但环境不同的真实体验。"
          },
          {
            "time": "90天",
            "text": "根据验证判断是留岗调整、同类跳槽还是改变方向，不用公司体验替行业定性。"
          }
        ],
        "share": "我可能不是不适合这份专业，只是不适合继续用现在的方式做它。"
      },
      "growth": {
        "name": "成长资源仍在窗口",
        "verdict": "这里是否值得继续，不看你已经投入多少，而看未来半年还能具体带走什么。",
        "core": "岗位仍有项目、反馈或资源增量时，留下可以是一种有期限的主动选择。关键是把成长从模糊期待变成明确目标、获得条件和截止日期。",
        "combo": "你当前仍能看到可迁移的能力和资源增量。",
        "secondary": "你也需要把“有机会”验证成有路径、有时间的现实条件。",
        "trigger": "当前很累，但仍存在稀缺项目或能力窗口",
        "reaction": "在离开和再坚持之间反复摇摆",
        "benefit": "继续投入可能换来下一阶段的重要筹码",
        "cost": "没有期限的成长承诺会变成持续消耗的理由",
        "strengths": [
          "能识别长期积累价值",
          "愿意为可迁移能力承担阶段成本"
        ],
        "costs": [
          "容易被模糊的未来机会继续留住",
          "可能高估平台名头，低估实际获得"
        ],
        "actions": [
          {
            "time": "本周",
            "text": "写下未来半年必须拿到的1项能力、1个项目和1个可展示成果。"
          },
          {
            "time": "30天",
            "text": "向能决定资源的人确认获得条件和时间，不把口头鼓励当成机会。"
          },
          {
            "time": "90天",
            "text": "若关键资源没有兑现，按预设日期重新启动外部选择。"
          }
        ],
        "share": "留下不是因为舍不得过去，而是这里还有一件值得带走的东西。"
      },
      "adjustability": {
        "name": "先做一次内部改造",
        "verdict": "你的困境并非完全无解，辞职前值得用一次有边界的调整验证真实可变空间。",
        "core": "职责、节奏、协作或岗位位置存在具体调整入口。真正的验证不是再忍一阵，而是提出明确方案、观察组织是否投入资源并设置复盘期限。",
        "combo": "你当前仍拥有改变工作方式的现实杠杆。",
        "secondary": "你也需要用组织的实际回应判断这里是否值得继续。",
        "trigger": "问题集中在可协商的职责、流程或协作方式",
        "reaction": "一边忍耐，一边把辞职当作唯一完整解法",
        "benefit": "离开想象暂时提供掌控感",
        "cost": "没有进行真实协商，就无法知道问题是否可改",
        "strengths": [
          "能够看见结构中的调整入口",
          "有能力把困境转成具体方案"
        ],
        "costs": [
          "容易把“理论可调”当成“组织愿意调”",
          "反复自行优化可能替系统承担责任"
        ],
        "actions": [
          {
            "time": "本周",
            "text": "提出一项明确调整：现状、影响、建议、所需资源和两周观察指标。"
          },
          {
            "time": "30天",
            "text": "只看实际变化，不用口头理解代替资源、职责或节奏调整。"
          },
          {
            "time": "90天",
            "text": "若组织连续无法支持关键调整，将“不可调”作为离开证据而非个人失败。"
          }
        ],
        "share": "我会先验证工作能不能改，不会再用无限忍耐假装正在解决。"
      },
      "support": {
        "name": "支持系统仍可借力",
        "verdict": "你不是只能独自决定，团队中的真实支持可能改变问题的解法。",
        "core": "可依赖的领导、同事、反馈和协作关系，是岗位价值的一部分。支持不能消除所有结构问题，但能提供信息、资源和修复通道。",
        "combo": "你当前仍有可以共同解决问题的关系资源。",
        "secondary": "你也需要判断支持是稳定机制，还是只靠个别人勉强维持。",
        "trigger": "工作遇到风险、冲突或资源不足",
        "reaction": "寻找可信对象、共同拆解和争取资源",
        "benefit": "问题不必完全由个人承担，调整成本降低",
        "cost": "过度依赖个别支持者，会低估组织结构本身",
        "strengths": [
          "能够建立可信协作关系",
          "愿意在困难时寻求现实帮助"
        ],
        "costs": [
          "可能因为舍不得关系而延后必要变化",
          "支持者离开后，岗位价值可能迅速改变"
        ],
        "actions": [
          {
            "time": "本周",
            "text": "与一个可信对象完成事实对话：我遇到什么、已经试过什么、需要哪类支持。"
          },
          {
            "time": "30天",
            "text": "确认支持能否转化为资源、反馈或边界，而不只是情绪安慰。"
          },
          {
            "time": "90天",
            "text": "评估支持来自组织机制还是个人善意，并将差异纳入去留判断。"
          }
        ],
        "share": "一份工作的价值，也包括我遇到困难时有没有人愿意一起解决。"
      },
      "readiness": {
        "name": "现实跳台正在成形",
        "verdict": "你已经不只是在想离开，现实条件正在把选择变成可执行方案。",
        "core": "现金缓冲、市场信息和生活安排让你拥有拒绝不合适选项的空间。准备度高不等于必须马上走，而是你终于可以用选择而不是恐惧做决定。",
        "combo": "你当前拥有支持变化的现实资源。",
        "secondary": "你也需要把准备转化为有节奏的验证，而不是继续等待完美时机。",
        "trigger": "对现状不满且外部条件开始成熟",
        "reaction": "核算风险、了解市场、建立替代方案",
        "benefit": "决策不必依赖冲动，谈判和选择空间增加",
        "cost": "准备本身可能变成新的拖延，迟迟不设行动期限",
        "strengths": [
          "有较强的现实风险意识",
          "能为变化搭建可执行缓冲"
        ],
        "costs": [
          "容易追求所有条件都准备好",
          "可能因为已有退路而低估当前仍可修复部分"
        ],
        "actions": [
          {
            "time": "本周",
            "text": "补齐唯一最大的准备缺口，并给它设置具体完成日期。"
          },
          {
            "time": "30天",
            "text": "完成至少3次外部验证：面试、从业访谈或真实项目，不只浏览岗位。"
          },
          {
            "time": "90天",
            "text": "依据验证结果做明确选择：留下有条件、离开有时间，不继续无限准备。"
          }
        ],
        "share": "我不是缺勇气，我是在把离开从一句情绪，搭成一条能走的路。"
      },
      "clarity": {
        "name": "方向已经有了轮廓",
        "verdict": "你需要的不是更多“该不该走”讨论，而是用现实验证筛选下一步。",
        "core": "你能够区分公司、岗位、行业和工作方式，也能描述下一份工作的优先级。方向清晰降低了换法不换坑的概率，但仍需要真实市场反馈校准。",
        "combo": "你已经从“不要什么”走向“要验证什么”。",
        "secondary": "你也需要让筛选标准在真实机会面前接受检验。",
        "trigger": "现状与目标差异越来越清楚",
        "reaction": "建立标准、比较选项、寻找方向证据",
        "benefit": "行动更聚焦，不容易只为逃离而选择",
        "cost": "方向描述过于理想时，可能拒绝必要取舍",
        "strengths": [
          "能拆分职业问题层级",
          "有相对清楚的下一步筛选框架"
        ],
        "costs": [
          "容易在纸面标准中追求全都满足",
          "需要用现实机会校准优先级"
        ],
        "actions": [
          {
            "time": "本周",
            "text": "把下一份工作的3个必须项、2个可协商项、1条底线写成可提问的面试问题。"
          },
          {
            "time": "30天",
            "text": "用至少5个真实岗位检验标准，记录哪些条件在市场上冲突。"
          },
          {
            "time": "90天",
            "text": "根据真实取舍更新方向，形成可以行动而不是只适合想象的版本。"
          }
        ],
        "share": "我不只是想离开这里，我开始知道下一站应该怎样筛选。"
      },
      "action": {
        "name": "验证行动已经启动",
        "verdict": "你正在用真实动作替代反复想象，下一步是让行动形成稳定节奏。",
        "core": "访谈、试投、作品和小实验会带回想象无法提供的信息。行动不是立即辞职，而是降低决策盲区，让每周都产生一个新的事实。",
        "combo": "你已经开始把职业判断放到现实中验证。",
        "secondary": "你也需要保护行动不被本职消耗反复打断。",
        "trigger": "方向已有轮廓，但信息仍不足",
        "reaction": "对外交流、试投、做样本、记录反馈",
        "benefit": "未知减少，信心来自证据而非情绪",
        "cost": "行动过多但不复盘，会变成另一种忙碌",
        "strengths": [
          "能把模糊想法转成可检查动作",
          "愿意接触真实反馈并调整判断"
        ],
        "costs": [
          "容易同时验证太多方向",
          "本职忙碌时探索节奏可能中断"
        ],
        "actions": [
          {
            "time": "本周",
            "text": "只保留一个验证问题，并完成一次30分钟外部动作。"
          },
          {
            "time": "30天",
            "text": "每周固定两个不被本职占用的行动时段，累计至少4条真实反馈。"
          },
          {
            "time": "90天",
            "text": "按证据关闭不合适方向，把资源集中到最有现实回应的一条路径。"
          }
        ],
        "share": "我不再等想明白才开始，我会让每一步行动带回新的答案。"
      }
    },
    "combinations": {
      "exhaustion+readiness": {
        "title": "消耗高位 × 跳台成形",
        "summary": "继续拖延的代价正在上升，而你已经具备部分现实选择空间。",
        "tension": "重点不是冲动裸辞，而是立即设定离开窗口并完成最后准备。"
      },
      "fit+adjustability": {
        "title": "内容匹配 × 方式可调",
        "summary": "你未必需要离开职业方向，先改变职责、节奏或协作方式更有信息价值。",
        "tension": "只给内部调整一次明确期限，组织没有行动时不要继续替它解释。"
      },
      "growth+exhaustion": {
        "title": "还有东西可拿 × 已经明显透支",
        "summary": "这是最需要条件化决策的组合：成长真实存在，但你的容量未必还能无限支付。",
        "tension": "把目标、期限和健康底线同时写清，任何一项失守都应触发重评。"
      },
      "clarity+action": {
        "title": "方向清楚 × 验证启动",
        "summary": "你已经从情绪离开进入现实探索，当前最重要的是减少方向数量并积累有效反馈。",
        "tension": "不要用持续准备替代做出选择，行动需要明确的收敛日期。"
      }
    },
    "insightRules": [
      {
        "when": {
          "all": [
            {
              "dimension": "exhaustion",
              "operator": ">=",
              "value": 67
            },
            {
              "dimension": "readiness",
              "operator": "<=",
              "value": 33
            }
          ]
        },
        "title": "消耗很高，但现实跳台还没搭好",
        "content": "这不是继续硬撑或立刻裸辞的二选一。优先降低暴露、补现金和外部信息，让离开不必用更大的生活风险交换。"
      },
      {
        "when": {
          "all": [
            {
              "dimension": "fit",
              "operator": ">=",
              "value": 67
            },
            {
              "dimension": "adjustability",
              "operator": "<=",
              "value": 33
            }
          ]
        },
        "title": "工作内容适合，组织条件却难以改变",
        "content": "你可能更适合同类跳槽，而不是转行或继续内部消耗。需要验证的是外部同类岗位能否提供更健康条件。"
      },
      {
        "when": {
          "all": [
            {
              "dimension": "clarity",
              "operator": "<=",
              "value": 33
            },
            {
              "dimension": "action",
              "operator": "<=",
              "value": 33
            }
          ]
        },
        "title": "离开念头很强，下一站仍然模糊",
        "content": "此时直接离开可能只解决当前痛苦，不能降低下一次错配概率。先用访谈、岗位样本和小实验建立方向证据。"
      }
    ],
    "report": {
      "decision": {
        "leftLabel": "先调整与验证",
        "rightLabel": "准备改变方向",
        "states": {
          "left": "当前更适合先做有期限的内部调整",
          "middle": "你处在临界区，先补齐一个关键证据",
          "right": "改变方向的信号已经较集中，但仍需按准备度行动"
        },
        "weights": {
          "exhaustion": 1.4,
          "fit": -1.1,
          "growth": -1.1,
          "adjustability": -0.9,
          "support": -0.7,
          "readiness": 1,
          "clarity": 1,
          "action": 0.6
        },
        "signals": {
          "left": [
            {
              "dimension": "fit",
              "operator": ">=",
              "value": 67,
              "text": "岗位匹配较高，问题可能不在职业内容本身"
            },
            {
              "dimension": "growth",
              "operator": ">=",
              "value": 67,
              "text": "未来半年仍有明确成长资源可获得"
            },
            {
              "dimension": "adjustability",
              "operator": ">=",
              "value": 67,
              "text": "职责、节奏或协作方式存在现实调整入口"
            },
            {
              "dimension": "support",
              "operator": ">=",
              "value": 67,
              "text": "团队中仍有可依赖的支持和修复资源"
            }
          ],
          "right": [
            {
              "dimension": "exhaustion",
              "operator": ">=",
              "value": 67,
              "text": "工作消耗已持续侵入恢复、身体或基本生活"
            },
            {
              "dimension": "fit",
              "operator": "<=",
              "value": 33,
              "text": "核心工作内容与优势和偏好长期错位"
            },
            {
              "dimension": "growth",
              "operator": "<=",
              "value": 33,
              "text": "继续留下已很难带来新的可迁移积累"
            },
            {
              "dimension": "adjustability",
              "operator": "<=",
              "value": 33,
              "text": "核心问题缺少可执行的内部调整空间"
            },
            {
              "dimension": "readiness",
              "operator": ">=",
              "value": 67,
              "text": "现金、市场信息和生活安排已形成现实缓冲"
            },
            {
              "dimension": "clarity",
              "operator": ">=",
              "value": 67,
              "text": "下一步筛选标准和方向已经较为清楚"
            }
          ]
        }
      }
    }
  }
});
}());
