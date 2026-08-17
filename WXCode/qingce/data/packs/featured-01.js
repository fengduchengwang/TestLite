(function () {
  const data = window.PsyTest.data;
  Object.assign(data, {
  "featured_001": {
    "schemaVersion": 2,
    "meta": {
      "key": "featured_001",
      "category": "featured",
      "categoryLabel": "精选",
      "level": "light",
      "levelLabel": "轻量测试",
      "title": "你的快乐需要观众吗？",
      "subtitle": "有人分享才更快乐，还是没人知道也不影响满足？15道具体情境，看看回应、认可和独处分别怎样改变你的快乐。",
      "duration": "约3分钟",
      "disclaimer": "本测试用于日常自我观察，不构成专业心理评估或诊断。"
    },
    "display": {
      "template": "light",
      "heroLabel": "你的快乐方式",
      "dimensionTitle": "你的快乐倾向分布",
      "radarTitle": "",
      "deepAnalysisTitle": "你的快乐，通常这样被放大",
      "modules": [
        "hero",
        "dimensions",
        "deepAnalysis",
        "strengths",
        "actions",
        "share"
      ]
    },
    "dimensions": [
      {
        "key": "intrinsic",
        "label": "内在满足",
        "bands": {
          "low": "快乐较容易受到外部反馈影响。",
          "medium": "你既能自得其乐，也会在意回应。",
          "high": "没有观众时，你依然能确认体验的价值。"
        }
      },
      {
        "key": "sharing",
        "label": "分享增益",
        "bands": {
          "low": "分享不是快乐成立的必要环节。",
          "medium": "遇到合适的人时，分享会让快乐增加。",
          "high": "表达和共同见证会显著放大你的快乐。"
        }
      },
      {
        "key": "recognition",
        "label": "认可回声",
        "bands": {
          "low": "他人的评价较少决定你的满足。",
          "medium": "重要评价会影响你，但不是唯一标准。",
          "high": "被肯定和被看见会明显加强你的成就感。"
        }
      },
      {
        "key": "exposure",
        "label": "呈现顾虑",
        "bands": {
          "low": "你较少担心分享后的评价。",
          "medium": "你会根据对象和内容决定是否表达。",
          "high": "分享前的自我审查容易压过原本的快乐。"
        }
      },
      {
        "key": "savoring",
        "label": "独享沉浸",
        "bands": {
          "low": "你不太习惯长时间独自停留在体验里。",
          "medium": "你能独享，也愿意适时分享。",
          "high": "你擅长让快乐在不被打断时慢慢变深。"
        }
      }
    ],
    "questions": [
      {
        "scene": "无人点赞",
        "dimension": "intrinsic",
        "q": "你认真做了一顿很好吃的饭，但没有拍照也没人知道，你会怎样看待这顿饭？",
        "options": [
          {
            "text": "吃得满足就够了，它已经完成了价值",
            "score": {
              "intrinsic": 3,
              "savoring": 1
            }
          },
          {
            "text": "有点可惜，早知道应该记录或分享一下",
            "score": {
              "intrinsic": 1,
              "sharing": 2
            }
          },
          {
            "text": "还是会拍下来留给自己以后看",
            "score": {
              "intrinsic": 2,
              "savoring": 2
            }
          },
          {
            "text": "如果没人回应，精心准备的兴奋会少一些",
            "score": {
              "intrinsic": 0,
              "recognition": 2
            }
          }
        ]
      },
      {
        "scene": "个人进步",
        "dimension": "intrinsic",
        "q": "你悄悄坚持一件事一个月，暂时还没人发现变化，最接近你的感受是？",
        "options": [
          {
            "text": "过程已经让我满意，不急着被看见",
            "score": {
              "intrinsic": 3
            }
          },
          {
            "text": "会继续，但希望很快有人注意到",
            "score": {
              "intrinsic": 1,
              "recognition": 2
            }
          },
          {
            "text": "想找一个可信的人分享这段坚持",
            "score": {
              "intrinsic": 2,
              "sharing": 2
            }
          },
          {
            "text": "没人反馈时，很难确认自己做得有没有意义",
            "score": {
              "intrinsic": 0,
              "recognition": 3
            }
          }
        ]
      },
      {
        "scene": "旅行片段",
        "dimension": "intrinsic",
        "q": "旅途中遇到特别漂亮、但手机没电的一幕，你更可能？",
        "options": [
          {
            "text": "认真看一会儿，没留下照片也不遗憾",
            "score": {
              "intrinsic": 3,
              "savoring": 2
            }
          },
          {
            "text": "会有点可惜，但仍能享受当下",
            "score": {
              "intrinsic": 2
            }
          },
          {
            "text": "想办法借手机拍下，不然像少了证明",
            "score": {
              "intrinsic": 0,
              "recognition": 2
            }
          },
          {
            "text": "记住细节，回去讲给重要的人听",
            "score": {
              "intrinsic": 1,
              "sharing": 2
            }
          }
        ]
      },
      {
        "scene": "即时分享",
        "dimension": "sharing",
        "q": "看到一句特别戳你的话，你通常会？",
        "options": [
          {
            "text": "马上转给能理解它的人，并想听回应",
            "score": {
              "sharing": 3
            }
          },
          {
            "text": "先收藏，之后聊天合适时再提",
            "score": {
              "sharing": 2,
              "savoring": 1
            }
          },
          {
            "text": "自己记住就好，不一定需要转发",
            "score": {
              "sharing": 0,
              "intrinsic": 2
            }
          },
          {
            "text": "想发又担心显得矫情，最后常常算了",
            "score": {
              "sharing": 1,
              "exposure": 2
            }
          }
        ]
      },
      {
        "scene": "好消息",
        "dimension": "sharing",
        "q": "收到一个期待很久的好消息，你最自然的第一步是？",
        "options": [
          {
            "text": "告诉那个一路知道过程的人",
            "score": {
              "sharing": 3,
              "recognition": 1
            }
          },
          {
            "text": "先自己消化，确认没变化再说",
            "score": {
              "sharing": 1,
              "exposure": 1
            }
          },
          {
            "text": "安静享受一会儿，不急着让别人参与",
            "score": {
              "sharing": 0,
              "savoring": 2
            }
          },
          {
            "text": "挑几个人分别分享，让快乐多发生几次",
            "score": {
              "sharing": 2,
              "recognition": 1
            }
          }
        ]
      },
      {
        "scene": "共同体验",
        "dimension": "sharing",
        "q": "看完一部很喜欢的电影后，什么最能延长你的快乐？",
        "options": [
          {
            "text": "和看过的人认真聊一遍细节和感受",
            "score": {
              "sharing": 3
            }
          },
          {
            "text": "写几句话发出来，看看有没有共鸣",
            "score": {
              "sharing": 2,
              "recognition": 1
            }
          },
          {
            "text": "一个人回味配乐和片段",
            "score": {
              "sharing": 0,
              "savoring": 3
            }
          },
          {
            "text": "推荐给一个人，但不要求对方马上反馈",
            "score": {
              "sharing": 1,
              "intrinsic": 1
            }
          }
        ]
      },
      {
        "scene": "成果反馈",
        "dimension": "recognition",
        "q": "完成一件自己很满意的作品，却只收到一句“还可以”，你会？",
        "options": [
          {
            "text": "明显泄气，开始怀疑是不是自己高估了",
            "score": {
              "recognition": 3,
              "exposure": 1
            }
          },
          {
            "text": "有点失落，但仍知道满意的部分在哪里",
            "score": {
              "recognition": 2,
              "intrinsic": 1
            }
          },
          {
            "text": "追问具体意见，想知道评价依据",
            "score": {
              "recognition": 1
            }
          },
          {
            "text": "不太受影响，我完成时已经知道它的价值",
            "score": {
              "recognition": 0,
              "intrinsic": 3
            }
          }
        ]
      },
      {
        "scene": "朋友圈反应",
        "dimension": "recognition",
        "q": "一条你很喜欢的动态反应很少，你最接近哪种想法？",
        "options": [
          {
            "text": "会反复看数据，甚至想删掉",
            "score": {
              "recognition": 3,
              "exposure": 2
            }
          },
          {
            "text": "有点扫兴，但不会否定内容本身",
            "score": {
              "recognition": 2,
              "intrinsic": 1
            }
          },
          {
            "text": "更在意某几个重要的人有没有看到",
            "score": {
              "recognition": 1,
              "sharing": 2
            }
          },
          {
            "text": "发出来已经满足，反应多少没关系",
            "score": {
              "recognition": 0,
              "intrinsic": 3
            }
          }
        ]
      },
      {
        "scene": "被夸奖",
        "dimension": "recognition",
        "q": "别人认真夸你一件自己也很在意的事，你的快乐通常会？",
        "options": [
          {
            "text": "明显翻倍，会记很久",
            "score": {
              "recognition": 3
            }
          },
          {
            "text": "很开心，但不会因此改变原本判断",
            "score": {
              "recognition": 2,
              "intrinsic": 1
            }
          },
          {
            "text": "先确认对方是不是客气，再决定要不要信",
            "score": {
              "recognition": 1,
              "exposure": 1
            }
          },
          {
            "text": "感谢对方，但内心波动不大",
            "score": {
              "recognition": 0,
              "intrinsic": 2
            }
          }
        ]
      },
      {
        "scene": "发布之前",
        "dimension": "exposure",
        "q": "准备分享一张自己很喜欢的照片时，你通常会检查多久？",
        "options": [
          {
            "text": "会反复看细节和别人可能怎么想，常拖到不发",
            "score": {
              "exposure": 3
            }
          },
          {
            "text": "挑选和调整一会儿，确认合适再发",
            "score": {
              "exposure": 2
            }
          },
          {
            "text": "简单看一下就发，喜欢最重要",
            "score": {
              "exposure": 1,
              "intrinsic": 1
            }
          },
          {
            "text": "几乎不检查，想分享就分享",
            "score": {
              "exposure": 0,
              "sharing": 2
            }
          }
        ]
      },
      {
        "scene": "兴趣表达",
        "dimension": "exposure",
        "q": "你喜欢的东西比较冷门，别人可能看不懂，你会？",
        "options": [
          {
            "text": "通常藏着，怕解释后还是被觉得奇怪",
            "score": {
              "exposure": 3
            }
          },
          {
            "text": "只对确定能理解的人说",
            "score": {
              "exposure": 2,
              "sharing": 1
            }
          },
          {
            "text": "看场合提一两句，不要求别人喜欢",
            "score": {
              "exposure": 1,
              "intrinsic": 1
            }
          },
          {
            "text": "自然表达，别人的兴趣不同也没关系",
            "score": {
              "exposure": 0,
              "intrinsic": 2
            }
          }
        ]
      },
      {
        "scene": "公开庆祝",
        "dimension": "exposure",
        "q": "取得一个值得庆祝的成绩时，你对公开表达的态度是？",
        "options": [
          {
            "text": "很想说，但担心被认为炫耀，最后往往淡化",
            "score": {
              "exposure": 3,
              "recognition": 1
            }
          },
          {
            "text": "会谨慎说明过程，不只展示结果",
            "score": {
              "exposure": 2
            }
          },
          {
            "text": "只告诉亲近的人，公开与否不重要",
            "score": {
              "exposure": 1,
              "sharing": 1
            }
          },
          {
            "text": "愿意大方庆祝，努力被看见没有问题",
            "score": {
              "exposure": 0,
              "recognition": 1
            }
          }
        ]
      },
      {
        "scene": "独自体验",
        "dimension": "savoring",
        "q": "一个人喝到很好喝的咖啡时，你会怎样停留在这个瞬间？",
        "options": [
          {
            "text": "放慢速度，注意味道、环境和当下心情",
            "score": {
              "savoring": 3,
              "intrinsic": 1
            }
          },
          {
            "text": "拍照记录，然后继续做自己的事",
            "score": {
              "savoring": 2
            }
          },
          {
            "text": "立刻想推荐给别人，下次一起喝",
            "score": {
              "savoring": 1,
              "sharing": 2
            }
          },
          {
            "text": "喝完就过去了，很少特意回味",
            "score": {
              "savoring": 0
            }
          }
        ]
      },
      {
        "scene": "快乐余韵",
        "dimension": "savoring",
        "q": "一次很开心的活动结束后，你通常怎样保留余韵？",
        "options": [
          {
            "text": "会独自回想很多细节，让感受慢慢沉下来",
            "score": {
              "savoring": 3
            }
          },
          {
            "text": "整理照片或写几句话，给记忆一个位置",
            "score": {
              "savoring": 2
            }
          },
          {
            "text": "继续和参加的人聊天，把兴奋延长",
            "score": {
              "savoring": 1,
              "sharing": 2
            }
          },
          {
            "text": "很快投入下一件事，不太停留",
            "score": {
              "savoring": 0
            }
          }
        ]
      },
      {
        "scene": "没有记录",
        "dimension": "savoring",
        "q": "一段珍贵经历没有照片、票根或公开记录，你会觉得它少了什么吗？",
        "options": [
          {
            "text": "不会，记忆和当时的感受已经足够",
            "score": {
              "savoring": 3,
              "intrinsic": 1
            }
          },
          {
            "text": "有一点，但我能通过文字或回想保存它",
            "score": {
              "savoring": 2
            }
          },
          {
            "text": "会遗憾，像缺少一个可以反复确认的证据",
            "score": {
              "savoring": 1,
              "recognition": 1
            }
          },
          {
            "text": "如果也没人分享，会觉得这段经历很快就散了",
            "score": {
              "savoring": 0,
              "sharing": 2
            }
          }
        ]
      }
    ],
    "profiles": {
      "intrinsic": {
        "name": "自得其乐型",
        "verdict": "快乐对你来说首先是一种内部事实，不需要被围观才能成立。",
        "core": "你能够从体验本身确认价值。无人点赞、没人知道，并不会自动抹掉一顿好饭、一次进步或一段风景。",
        "combo": "你先确认自己是否真实喜欢，再决定要不要让别人参与。",
        "secondary": "你也在努力保留一块不由外界评价的满足。",
        "trigger": "体验被要求展示、解释或用反馈证明价值",
        "reaction": "把注意力收回自己的感受和判断",
        "benefit": "快乐较少被外界反应绑架",
        "cost": "如果长期不表达，别人可能很难参与和理解你的重要时刻",
        "strengths": [
          "能独立确认体验的意义",
          "外界反应不足时仍能保持稳定"
        ],
        "costs": [
          "容易低估分享对关系的价值",
          "重要成果可能因为太低调而失去应有的呈现"
        ],
        "actions": [
          {
            "time": "这周",
            "text": "选一件本来只想留给自己的小事，告诉一个值得的人：我不是求评价，只是想让你知道这对我很重要。"
          }
        ],
        "share": "没人看见也没关系，我知道这一刻真的让我快乐。"
      },
      "sharing": {
        "name": "联结增益型",
        "verdict": "你的快乐不是靠观众成立，而是在被理解时自然变大。",
        "core": "你愿意把好消息、好内容和好体验交给关系，让快乐从个人事件变成共同记忆。你要的通常不是围观，而是准确的共鸣。",
        "combo": "你会通过分享把一个瞬间连接到重要的人。",
        "secondary": "你也需要体验在关系里得到来回流动。",
        "trigger": "遇到好消息、好内容或值得共同记住的瞬间",
        "reaction": "主动表达，寻找能理解语境的人",
        "benefit": "快乐获得延展，关系也积累共同素材",
        "cost": "对方没有及时回应时，原本的快乐可能被失落覆盖",
        "strengths": [
          "善于创造共同记忆",
          "愿意让关系参与真实生活"
        ],
        "costs": [
          "容易把回应速度误读为重视程度",
          "分享对象不合适时会产生额外消耗"
        ],
        "actions": [
          {
            "time": "这周",
            "text": "分享前先区分目的：想记录、想共鸣还是想被肯定。根据目的只选择一个最合适的对象。"
          }
        ],
        "share": "我不是非要被围观，我只是喜欢有人能接住同一个瞬间。"
      },
      "recognition": {
        "name": "回声确认型",
        "verdict": "被肯定会显著放大你的快乐，因为反馈帮你确认投入被看见了。",
        "core": "你对认可的需要并不等于虚荣。很多时候，你在意的是努力是否抵达别人、成果是否具有现实影响。问题只在于，外部回声是否成了唯一证据。",
        "combo": "你会从他人的具体反馈中确认自己的价值和影响。",
        "secondary": "你也希望重要投入能够得到清楚回应。",
        "trigger": "投入很多却反馈模糊、结果没有被注意",
        "reaction": "观察反应、比较反馈、重新判断自己的表现",
        "benefit": "有效反馈能快速带来方向感和动力",
        "cost": "反馈不足时容易把“没被看见”推导成“做得不好”",
        "strengths": [
          "重视真实影响而非自我陶醉",
          "能从反馈中快速校准表达"
        ],
        "costs": [
          "容易让沉默替别人做出负面评价",
          "满足感可能随着平台数据和他人态度波动"
        ],
        "actions": [
          {
            "time": "这周",
            "text": "为一件重要成果写下两个标准：一个由自己判断，一个需要外部反馈。没有反馈时，只暂停第二个判断，不推翻第一个。"
          }
        ],
        "share": "我想被看见的，不只是结果，还有我认真走过的那段路。"
      },
      "exposure": {
        "name": "呈现审慎型",
        "verdict": "你不是没有快乐，而是分享前的自我审查常常先一步出现。",
        "core": "你会预演别人如何理解、是否觉得炫耀、会不会暴露太多。谨慎保护了边界，也可能让原本自然的表达变成一次高成本发布。",
        "combo": "你在表达前先检查风险，确保自己不会被轻易误读。",
        "secondary": "你也需要确认表达不会带来超出承受范围的注视。",
        "trigger": "准备公开兴趣、成果或私人快乐",
        "reaction": "反复修改、缩小表达、只对少数人展示",
        "benefit": "降低被误解和过度暴露的风险",
        "cost": "审查过度时，快乐会在发布前被消耗掉",
        "strengths": [
          "有清楚的隐私意识",
          "能根据关系远近调整表达边界"
        ],
        "costs": [
          "容易把可能的评价当成已经发生的评价",
          "长期收缩表达会让别人只看到安全版本的你"
        ],
        "actions": [
          {
            "time": "这周",
            "text": "选一条风险很低的真实表达，限制自己只检查两遍后发布；24小时内不删除，也不反复查看数据。"
          }
        ],
        "share": "我不是没有想分享，只是常在开口前先替所有人评价了自己。"
      },
      "savoring": {
        "name": "沉浸收藏型",
        "verdict": "你擅长让快乐慢下来，不急着把体验立刻变成内容。",
        "core": "你会停留、回味、整理细节，让一次体验在内部继续生长。这种能力让普通日常也有厚度。",
        "combo": "你会为快乐保留余韵，而不是马上追赶下一次刺激。",
        "secondary": "你也需要不被打断地完成对体验的消化。",
        "trigger": "遇到让你舒展、感动或想长期记住的时刻",
        "reaction": "放慢速度、回想细节、通过私人记录保存",
        "benefit": "体验被充分吸收，不依赖连续刺激",
        "cost": "沉浸过久时，可能减少了和他人建立共同记忆的机会",
        "strengths": [
          "能从小事获得持续满足",
          "有较好的当下感和记忆保存能力"
        ],
        "costs": [
          "容易把重要体验留得太私人",
          "过度回味时可能推迟回到现实行动"
        ],
        "actions": [
          {
            "time": "这周",
            "text": "选择一个快乐瞬间，先独自停留10分钟，再用三句话分享给一个人：发生了什么、你感到什么、为什么重要。"
          }
        ],
        "share": "我不急着让快乐被看见，我想先让它在自己心里待久一点。"
      }
    },
    "combinations": {
      "intrinsic+sharing": {
        "title": "自得其乐 × 联结增益",
        "summary": "你能独立享受，也知道分享会让好体验多一层关系意义。",
        "tension": "关键不是分享多少，而是别让分享后的反应反过来改写原本的满足。"
      },
      "recognition+exposure": {
        "title": "想被看见 × 又怕被误读",
        "summary": "你确实需要回应，却也高度在意回应可能带来的评价，这是最消耗你的拉扯。",
        "tension": "与其扩大公开表达，不如先建立少量、稳定、能够提供具体反馈的关系。"
      },
      "savoring+intrinsic": {
        "title": "沉浸收藏 × 自得其乐",
        "summary": "你的快乐适合慢慢发生。你不依赖热闹，也能把普通体验保存得很深。",
        "tension": "需要留意的是，珍贵不必等于私密，适度表达能让别人更了解你。"
      }
    },
    "insightRules": [],
    "report": {
      "decision": null
    }
  },
  "featured_002": {
    "schemaVersion": 2,
    "meta": {
      "key": "featured_002",
      "category": "featured",
      "categoryLabel": "精选",
      "level": "standard",
      "levelLabel": "标准测试",
      "title": "你的拖延，究竟在躲哪一种不舒服？",
      "subtitle": "拖延不只发生在开始之前。18道情境题会分别观察评价压力、任务模糊、过程乏味、负荷过量、收尾标准和精力透支。",
      "duration": "约5分钟",
      "disclaimer": "本测试用于日常自我观察，不构成专业心理评估或诊断。"
    },
    "display": {
      "template": "standard",
      "heroLabel": "你的拖延模式",
      "dimensionTitle": "各项阻力有多明显",
      "radarTitle": "你的拖延状态全景",
      "deepAnalysisTitle": "你为什么会反复卡在这里",
      "modules": [
        "hero",
        "radar",
        "dimensions",
        "deepAnalysis",
        "evidence",
        "pattern",
        "strengths",
        "actions",
        "share"
      ]
    },
    "dimensions": [
      {
        "key": "evaluation",
        "label": "评价压力",
        "bands": {
          "low": "他人评价较少阻断你的启动。",
          "medium": "重要任务中，你会在意表现是否够好。",
          "high": "被比较、被检验和可能失败会明显推迟行动。"
        }
      },
      {
        "key": "ambiguity",
        "label": "任务模糊",
        "bands": {
          "low": "信息不全时你也能先做出小样。",
          "medium": "你需要基本方向后才能稳定推进。",
          "high": "目标和标准不清时，你容易长时间停在准备阶段。"
        }
      },
      {
        "key": "boredom",
        "label": "过程乏味",
        "bands": {
          "low": "重复和单调较少影响你的持续行动。",
          "medium": "缺少变化时，你需要额外结构维持注意力。",
          "high": "低刺激任务很容易被更即时的事情取代。"
        }
      },
      {
        "key": "overload",
        "label": "负荷过量",
        "bands": {
          "low": "任务多时你仍能区分先后。",
          "medium": "任务堆积会降低启动速度。",
          "high": "当事情同时出现，你容易因无从下手而整体停摆。"
        }
      },
      {
        "key": "perfection",
        "label": "收尾标准",
        "bands": {
          "low": "你能接受足够可用的完成。",
          "medium": "重要成果中，你会增加检查和打磨。",
          "high": "交付前的标准不断上升，让完成比开始更困难。"
        }
      },
      {
        "key": "depletion",
        "label": "精力透支",
        "bands": {
          "low": "你的拖延较少来自身体和注意力不足。",
          "medium": "疲惫时启动和持续都会变慢。",
          "high": "很多“拖着不做”其实发生在你已经没有可用精力时。"
        }
      }
    ],
    "questions": [
      {
        "scene": "公开交付",
        "dimension": "evaluation",
        "q": "要把方案第一次发给多人评审时，你最容易在哪一步停住？",
        "options": [
          {
            "text": "反复检查，担心一个明显漏洞让人否定整体能力",
            "score": {
              "evaluation": 3,
              "perfection": 1
            }
          },
          {
            "text": "会紧张，但设定时间后仍能发出",
            "score": {
              "evaluation": 2
            }
          },
          {
            "text": "先发可讨论版本，让反馈帮助修正",
            "score": {
              "evaluation": 0,
              "ambiguity": 1
            }
          },
          {
            "text": "主要卡在不知道评审真正想看什么",
            "score": {
              "evaluation": 1,
              "ambiguity": 2
            }
          }
        ]
      },
      {
        "scene": "能力比较",
        "dimension": "evaluation",
        "q": "看到同事很快交出高质量成果后，你面对自己的任务更可能？",
        "options": [
          {
            "text": "立刻提高标准，迟迟不愿展示初稿",
            "score": {
              "evaluation": 3,
              "perfection": 2
            }
          },
          {
            "text": "有压力，但会拆出自己下一步要补的部分",
            "score": {
              "evaluation": 1
            }
          },
          {
            "text": "把对方当参考，不改变自己的交付节奏",
            "score": {
              "evaluation": 0
            }
          },
          {
            "text": "先做别的简单任务，暂时避开比较感",
            "score": {
              "evaluation": 2,
              "boredom": 1
            }
          }
        ]
      },
      {
        "scene": "可能失败",
        "dimension": "evaluation",
        "q": "一件事投入很大却仍可能失败时，你通常怎样开始？",
        "options": [
          {
            "text": "不断补准备，希望开始前把失败概率降到很低",
            "score": {
              "evaluation": 3,
              "ambiguity": 1
            }
          },
          {
            "text": "先完成风险最小的一部分，观察结果",
            "score": {
              "evaluation": 1
            }
          },
          {
            "text": "接受有失败可能，尽快做第一次验证",
            "score": {
              "evaluation": 0
            }
          },
          {
            "text": "容易等到时间紧迫，失败就能解释为准备不足",
            "score": {
              "evaluation": 2,
              "overload": 1
            }
          }
        ]
      },
      {
        "scene": "模糊需求",
        "dimension": "ambiguity",
        "q": "接到一句“做得有创意一点”的任务，你第一天最可能做什么？",
        "options": [
          {
            "text": "搜很多资料，但越看越不知道方向",
            "score": {
              "ambiguity": 3
            }
          },
          {
            "text": "列出几个理解，找对方确认边界",
            "score": {
              "ambiguity": 1
            }
          },
          {
            "text": "先做一个粗糙样稿，用实物逼出反馈",
            "score": {
              "ambiguity": 0
            }
          },
          {
            "text": "等对方补充更多信息后再正式开始",
            "score": {
              "ambiguity": 2
            }
          }
        ]
      },
      {
        "scene": "没有标准",
        "dimension": "ambiguity",
        "q": "你要完成一件从未做过、也没有参考答案的事，最难受的是什么？",
        "options": [
          {
            "text": "不知道什么才算完成，做多少都不踏实",
            "score": {
              "ambiguity": 3,
              "perfection": 1
            }
          },
          {
            "text": "开始慢一点，但试过一次就能进入状态",
            "score": {
              "ambiguity": 1
            }
          },
          {
            "text": "反而有探索感，愿意边做边定义问题",
            "score": {
              "ambiguity": 0
            }
          },
          {
            "text": "想先找到一个懂的人告诉我从哪开始",
            "score": {
              "ambiguity": 2
            }
          }
        ]
      },
      {
        "scene": "目标过大",
        "dimension": "ambiguity",
        "q": "待办上写着“准备转行”时，你接下来更可能？",
        "options": [
          {
            "text": "想了很多方向，却很久没有形成具体动作",
            "score": {
              "ambiguity": 3,
              "overload": 1
            }
          },
          {
            "text": "先把目标拆成了解岗位、盘点能力和试投三步",
            "score": {
              "ambiguity": 1
            }
          },
          {
            "text": "直接约一个从业者聊30分钟，先获得真实信息",
            "score": {
              "ambiguity": 0
            }
          },
          {
            "text": "收集课程和资料，等准备充分再选择",
            "score": {
              "ambiguity": 2,
              "evaluation": 1
            }
          }
        ]
      },
      {
        "scene": "重复流程",
        "dimension": "boredom",
        "q": "面对一项熟练但重复的整理任务，你通常怎样推进？",
        "options": [
          {
            "text": "很容易切去看消息，回来又要重新找位置",
            "score": {
              "boredom": 3
            }
          },
          {
            "text": "开着音乐或计时器，靠外部节奏完成",
            "score": {
              "boredom": 2
            }
          },
          {
            "text": "集中做完再休息，单调本身影响不大",
            "score": {
              "boredom": 0
            }
          },
          {
            "text": "先优化流程，减少重复操作",
            "score": {
              "boredom": 1
            }
          }
        ]
      },
      {
        "scene": "回报很远",
        "dimension": "boredom",
        "q": "一项练习要持续三个月才可能见效，你最容易在哪个阶段掉线？",
        "options": [
          {
            "text": "新鲜感过去、结果又还没出现的时候",
            "score": {
              "boredom": 3
            }
          },
          {
            "text": "偶尔中断，但看到阶段记录后能回来",
            "score": {
              "boredom": 2
            }
          },
          {
            "text": "只要目标明确，重复并不会明显阻碍我",
            "score": {
              "boredom": 0
            }
          },
          {
            "text": "如果没有同伴或反馈，持续会变难",
            "score": {
              "boredom": 1,
              "evaluation": 1
            }
          }
        ]
      },
      {
        "scene": "低刺激任务",
        "dimension": "boredom",
        "q": "报销、归档、填表这类任务常被你放到什么时候？",
        "options": [
          {
            "text": "拖到截止前集中处理，平时总有更有意思的事",
            "score": {
              "boredom": 3
            }
          },
          {
            "text": "攒到固定时间批量做",
            "score": {
              "boredom": 1
            }
          },
          {
            "text": "收到就处理，避免持续占用脑子",
            "score": {
              "boredom": 0
            }
          },
          {
            "text": "想做却常因疲惫继续往后放",
            "score": {
              "boredom": 2,
              "depletion": 2
            }
          }
        ]
      },
      {
        "scene": "同时发生",
        "dimension": "overload",
        "q": "一天里突然多出三件急事时，你最可能出现什么反应？",
        "options": [
          {
            "text": "脑中不停切换，最后每件都只碰了一点",
            "score": {
              "overload": 3
            }
          },
          {
            "text": "会慌一阵，再按影响范围排序",
            "score": {
              "overload": 2
            }
          },
          {
            "text": "先确认唯一最重要的事，其他主动延期",
            "score": {
              "overload": 0
            }
          },
          {
            "text": "先挑最快做完的，靠完成感找回节奏",
            "score": {
              "overload": 1
            }
          }
        ]
      },
      {
        "scene": "任务堆积",
        "dimension": "overload",
        "q": "待办已经很多，又有人临时加事，你通常会？",
        "options": [
          {
            "text": "先答应，之后看着清单越来越不想打开",
            "score": {
              "overload": 3,
              "depletion": 1
            }
          },
          {
            "text": "说明已有安排，请对方一起调整优先级",
            "score": {
              "overload": 0
            }
          },
          {
            "text": "硬塞进今天，晚点休息也要完成",
            "score": {
              "overload": 2,
              "depletion": 2
            }
          },
          {
            "text": "先做新增任务，原来的事继续顺延",
            "score": {
              "overload": 1
            }
          }
        ]
      },
      {
        "scene": "复杂项目",
        "dimension": "overload",
        "q": "面对一个包含很多子任务的项目，你最容易卡在哪里？",
        "options": [
          {
            "text": "每一步都在脑子里同时出现，不知道先抓哪一个",
            "score": {
              "overload": 3,
              "ambiguity": 1
            }
          },
          {
            "text": "拆分需要时间，但拆完后可以稳定推进",
            "score": {
              "overload": 1
            }
          },
          {
            "text": "先找关键路径，只保留当前一步",
            "score": {
              "overload": 0
            }
          },
          {
            "text": "能开始，但中途新增事项会迅速打乱节奏",
            "score": {
              "overload": 2
            }
          }
        ]
      },
      {
        "scene": "提交之前",
        "dimension": "perfection",
        "q": "已经满足要求的文件，在提交前你通常还会怎样处理？",
        "options": [
          {
            "text": "继续修改措辞和细节，很难决定哪版最好",
            "score": {
              "perfection": 3
            }
          },
          {
            "text": "按检查清单过一遍就提交",
            "score": {
              "perfection": 1
            }
          },
          {
            "text": "确认核心信息无误后直接交付",
            "score": {
              "perfection": 0
            }
          },
          {
            "text": "会多改几轮，直到时间逼我停止",
            "score": {
              "perfection": 2,
              "evaluation": 1
            }
          }
        ]
      },
      {
        "scene": "公开发布",
        "dimension": "perfection",
        "q": "准备发布一篇自己很在意的内容时，什么最容易让你延期？",
        "options": [
          {
            "text": "总觉得还可以更完整，新的修改点不断出现",
            "score": {
              "perfection": 3
            }
          },
          {
            "text": "担心发布后发现错误，会多检查几次",
            "score": {
              "perfection": 2,
              "evaluation": 1
            }
          },
          {
            "text": "先发布可用版本，再根据真实反馈更新",
            "score": {
              "perfection": 0
            }
          },
          {
            "text": "给自己设置明确截止，到点保留少量遗憾",
            "score": {
              "perfection": 1
            }
          }
        ]
      },
      {
        "scene": "收尾阶段",
        "dimension": "perfection",
        "q": "一个项目完成到90%时，你的状态通常是？",
        "options": [
          {
            "text": "剩下10%会占掉很久，因为标准突然变高",
            "score": {
              "perfection": 3
            }
          },
          {
            "text": "收尾比开始慢，但能按交付定义结束",
            "score": {
              "perfection": 2
            }
          },
          {
            "text": "越接近完成越集中，很快封板",
            "score": {
              "perfection": 0
            }
          },
          {
            "text": "容易转去做新任务，旧项目留着一点尾巴",
            "score": {
              "perfection": 1,
              "boredom": 1
            }
          }
        ]
      },
      {
        "scene": "下班以后",
        "dimension": "depletion",
        "q": "白天已经高强度工作，晚上还有一件重要私事，你会？",
        "options": [
          {
            "text": "坐在桌前很久却无法进入状态，最后更加自责",
            "score": {
              "depletion": 3
            }
          },
          {
            "text": "先休息一段，再只做最小的一步",
            "score": {
              "depletion": 1
            }
          },
          {
            "text": "评估精力，不够就明确改期",
            "score": {
              "depletion": 0
            }
          },
          {
            "text": "靠咖啡或熬夜顶住，但第二天更累",
            "score": {
              "depletion": 2,
              "overload": 1
            }
          }
        ]
      },
      {
        "scene": "身体信号",
        "dimension": "depletion",
        "q": "任务没开始，但你已经频繁走神、肩颈紧、想躺下，这时你通常？",
        "options": [
          {
            "text": "仍要求自己坐住，结果时间过去却没产出",
            "score": {
              "depletion": 3
            }
          },
          {
            "text": "先离开屏幕十分钟，再判断能否继续",
            "score": {
              "depletion": 1
            }
          },
          {
            "text": "承认今天容量不足，调整任务和休息",
            "score": {
              "depletion": 0
            }
          },
          {
            "text": "换成刷手机，以为放松却越刷越晚",
            "score": {
              "depletion": 2,
              "boredom": 1
            }
          }
        ]
      },
      {
        "scene": "长期拖延",
        "dimension": "depletion",
        "q": "一件事连续几周都拖着时，你会不会检查自己的睡眠和负荷？",
        "options": [
          {
            "text": "很少，我通常先认定是自己不够自律",
            "score": {
              "depletion": 3,
              "evaluation": 1
            }
          },
          {
            "text": "偶尔会想，但还是优先寻找效率方法",
            "score": {
              "depletion": 2
            }
          },
          {
            "text": "会先判断是不会做、不想做，还是已经没电",
            "score": {
              "depletion": 0
            }
          },
          {
            "text": "发现疲惫后会调整，但常常已经拖到很严重",
            "score": {
              "depletion": 1
            }
          }
        ]
      }
    ],
    "profiles": {
      "evaluation": {
        "name": "评价避险型",
        "verdict": "你拖延的不是任务，而是任务可能暴露“我还不够好”的那一刻。",
        "core": "越重要、越公开、越能被比较的事，你越容易把开始变成一场能力审判。准备和延迟暂时保护了自尊，却也让真实反馈来得更晚。",
        "combo": "你会先降低被否定的可能，再允许自己行动。",
        "secondary": "你也在用谨慎保护自己不被过早评价。",
        "trigger": "公开交付、被比较或成功没有把握",
        "reaction": "增加准备、推迟展示、先做不重要的事",
        "benefit": "暂时避免被评价和失败带来的刺痛",
        "cost": "缺少真实反馈，任务在想象中越来越难",
        "strengths": [
          "对成果影响和他人标准敏感",
          "愿意为重要任务承担责任"
        ],
        "costs": [
          "容易把作品反馈等同于个人评价",
          "准备过度会挤压真正试错时间"
        ],
        "actions": [
          {
            "time": "今天",
            "text": "把任务定义成一次“信息交换”而不是最终审判，向一个低风险对象发送只完成60%的版本，并只问一个具体问题。"
          }
        ],
        "share": "我不是不想开始，我是在等一个不会暴露不足的开始。"
      },
      "ambiguity": {
        "name": "定义缺口型",
        "verdict": "你缺的不是执行力，而是一个足够具体的起点和完成标准。",
        "core": "目标模糊时，你的大脑会持续搜索正确方向。资料越多，可能性越多，行动反而越难出现。真正有效的不是想清全部，而是先制造一个可被修正的对象。",
        "combo": "你需要先把模糊问题变成一个可验证的小问题。",
        "secondary": "你也在等待边界清楚后再投入完整精力。",
        "trigger": "目标抽象、标准不清、第一次做",
        "reaction": "搜资料、等待说明、在多个方向间切换",
        "benefit": "避免在错误方向投入过多",
        "cost": "没有样稿就没有反馈，模糊状态长期不变",
        "strengths": [
          "能看见任务中的定义缺口",
          "不会轻易把假设当成事实"
        ],
        "costs": [
          "容易把澄清变成无限准备",
          "缺少外部反馈时会停在脑内模拟"
        ],
        "actions": [
          {
            "time": "今天",
            "text": "把任务改写成“我要在30分钟内做出什么可见东西”，完成后只允许根据它提出3个澄清问题。"
          }
        ],
        "share": "我不是做不动，我是还没有把“做什么”说到足够具体。"
      },
      "boredom": {
        "name": "低刺激逃离型",
        "verdict": "你不是讨厌努力，而是注意力很难从延迟回报中获得即时抓力。",
        "core": "重复、单调和短期看不到变化的任务，会迅速失去吸引力。你会转向消息、新任务或临时兴趣，并不是不知道重要性，而是眼前缺少可感知的推进。",
        "combo": "你需要让进度变得可见，让单调过程出现节拍。",
        "secondary": "你也会被更即时、更有反馈的刺激拉走。",
        "trigger": "重复操作、远期回报、缺少反馈",
        "reaction": "切换任务、刷消息、等截止压力制造刺激",
        "benefit": "暂时摆脱单调和注意力钝化",
        "cost": "任务只能靠最后时刻的高压完成",
        "strengths": [
          "对变化和反馈反应敏锐",
          "能在高刺激环境中快速调动状态"
        ],
        "costs": [
          "容易把重要但单调的工作长期后置",
          "依赖压力启动会形成反复透支"
        ],
        "actions": [
          {
            "time": "今天",
            "text": "给一项单调任务设置25分钟可见进度条，每完成一个小单位就做标记；结束后立即停止，不用一次清空。"
          }
        ],
        "share": "我不是不知道它重要，我只是很难被没有回声的过程抓住。"
      },
      "overload": {
        "name": "负荷冻结型",
        "verdict": "你的拖延发生在事情同时涌来时：不是不想做，而是无法决定先牺牲什么。",
        "core": "任务数量超过处理容量后，你会在排序、切换和惦记中消耗大量注意力。每件都重要，使得任何一个开始都像在放弃其他事情。",
        "combo": "你需要的不是更长清单，而是明确今天允许哪些事不做。",
        "secondary": "你也会因为同时背着多个未完成事项而难以启动。",
        "trigger": "任务并发、临时加项、优先级冲突",
        "reaction": "频繁切换、先答应、从最容易的事找完成感",
        "benefit": "暂时避免做出取舍和承担延期后果",
        "cost": "所有任务推进都变慢，未完成感持续升高",
        "strengths": [
          "能够同时看见多方需求",
          "对整体影响和遗漏风险敏感"
        ],
        "costs": [
          "不愿主动放弃导致容量被击穿",
          "切换成本常被低估"
        ],
        "actions": [
          {
            "time": "今天",
            "text": "把所有任务分成“今天必须保住1件、主动延期2件、其余不碰”，并把延期信息发给相关人，而不是只在心里排序。"
          }
        ],
        "share": "我卡住的不是第一步，是每走一步都觉得在辜负另一件事。"
      },
      "perfection": {
        "name": "收尾抬标型",
        "verdict": "你最难的不是做到，而是决定什么时候已经足够。",
        "core": "越接近交付，你越能看见细节和潜在缺陷，标准因此不断移动。打磨保护了质量，也可能让“完成”变成永远无法确认的状态。",
        "combo": "你需要在开始前定义结束，而不是在收尾时临时决定。",
        "secondary": "你也会用继续修改延后面对真实反馈。",
        "trigger": "公开发布、重要交付、接近完成",
        "reaction": "增加检查、扩充范围、比较多个版本",
        "benefit": "减少低级错误，维持对质量的掌控",
        "cost": "边际收益越来越低，交付和反馈持续推迟",
        "strengths": [
          "有稳定的质量意识",
          "能发现普通检查容易遗漏的细节"
        ],
        "costs": [
          "容易把可优化误认为必须修改",
          "投入时间与实际价值不再成比例"
        ],
        "actions": [
          {
            "time": "今天",
            "text": "写下3条交付标准和1个截止时间；满足3条后只能修正错误，不能新增内容或扩大范围。"
          }
        ],
        "share": "我不是做不完，我是很难承认“已经够好”也是一种能力。"
      },
      "depletion": {
        "name": "容量见底型",
        "verdict": "你把精力不足误认成了意志力不足，于是越拖越责备自己。",
        "core": "注意力、睡眠和情绪容量下降时，启动本来就会变慢。继续用纪律加压，只会让任务和自责绑定得更紧。你需要先恢复可用容量，再判断方法问题。",
        "combo": "你需要先区分不能做、不会做和已经没电。",
        "secondary": "你也在用拖延替身体争取没有被允许的休息。",
        "trigger": "长期高负荷、睡眠不足、角色持续待机",
        "reaction": "坐着硬撑、刷手机补偿、把延期解释成懒",
        "benefit": "暂时避开超出容量的投入",
        "cost": "休息没有真正发生，自责又继续消耗精力",
        "strengths": [
          "责任感强，低电量时仍试图维持任务",
          "能长期承载复杂安排"
        ],
        "costs": [
          "容易忽略身体给出的容量信息",
          "把恢复推迟到完全停摆以后"
        ],
        "actions": [
          {
            "time": "今天",
            "text": "开始前做一次容量检查：睡眠、注意力、身体紧绷各打0–3分；总分低于4时，只做10分钟最小动作并优先安排恢复。"
          }
        ],
        "share": "有些拖延不是逃避，是身体在替我按下已经很晚的暂停键。"
      }
    },
    "combinations": {
      "evaluation+perfection": {
        "title": "怕被否定 × 不肯交付",
        "summary": "你既担心结果不够好，又把每次交付当成能力证明，因此标准会在临近发布时继续上升。",
        "tension": "真正的突破点不是再改一轮，而是把第一次交付重新定义为获取反馈。"
      },
      "ambiguity+overload": {
        "title": "方向没定 × 事情太多",
        "summary": "你同时缺少清晰边界和取舍空间，任何一步都像可能走错，也像会耽误别的事。",
        "tension": "先砍并发，再做样稿；顺序反过来会继续扩大混乱。"
      },
      "boredom+depletion": {
        "title": "低刺激 × 低电量",
        "summary": "你不是单纯贪玩。精力不足让注意力更依赖即时刺激，单调任务因此更难抓住你。",
        "tension": "这时用更强的自律惩罚自己，通常不如先恢复再缩短任务单元。"
      }
    },
    "insightRules": [],
    "report": {
      "decision": null
    }
  },
  "featured_003": {
    "schemaVersion": 2,
    "meta": {
      "key": "featured_003",
      "category": "featured",
      "categoryLabel": "精选",
      "level": "standard",
      "levelLabel": "标准测试",
      "title": "你会不会把别人的情绪，当成自己的任务？",
      "subtitle": "别人沉默、失望或语气变冷时，你是在共情、接管、修复、回避，还是能够带着边界继续靠近？",
      "duration": "约5分钟",
      "disclaimer": "本测试用于日常自我观察，不构成专业心理评估或诊断。"
    },
    "display": {
      "template": "standard",
      "heroLabel": "你的情绪边界",
      "dimensionTitle": "你在关系中的各项表现",
      "radarTitle": "你的情绪责任全景",
      "deepAnalysisTitle": "你为什么总会先照顾别人的情绪",
      "modules": [
        "hero",
        "radar",
        "dimensions",
        "deepAnalysis",
        "evidence",
        "pattern",
        "strengths",
        "actions",
        "share"
      ]
    },
    "dimensions": [
      {
        "key": "sensitivity",
        "label": "情绪捕捉",
        "bands": {
          "low": "你较少自动扫描他人的情绪变化。",
          "medium": "明显变化会引起你的注意。",
          "high": "细微语气和表情变化也会迅速进入你的注意。"
        }
      },
      {
        "key": "responsibility",
        "label": "责任接管",
        "bands": {
          "low": "你能区分关心与负责。",
          "medium": "重要关系中，你会承担部分情绪责任。",
          "high": "他人不舒服时，你容易立刻觉得自己需要处理。"
        }
      },
      {
        "key": "boundary",
        "label": "边界表达",
        "bands": {
          "low": "你较难在照顾关系时同步表达限制。",
          "medium": "你能在部分场景说清容量。",
          "high": "你能够在保持关心的同时说明自己能做什么。"
        }
      },
      {
        "key": "repair",
        "label": "修复紧迫",
        "bands": {
          "low": "你能允许关系暂时存在未解决状态。",
          "medium": "重要冲突会推动你主动修复。",
          "high": "关系出现波动时，你很难等待，常需要立刻恢复连接。"
        }
      },
      {
        "key": "avoidance",
        "label": "冲突回避",
        "bands": {
          "low": "你较能承受必要分歧。",
          "medium": "你会选择时机表达不同意见。",
          "high": "为了不让气氛变坏，你容易压下真实意见。"
        }
      },
      {
        "key": "recovery",
        "label": "自我恢复",
        "bands": {
          "low": "关系事件结束后，你仍会长时间携带他人情绪。",
          "medium": "你需要一定时间才能回到自己。",
          "high": "你有相对稳定的方法把注意力和感受带回自己。"
        }
      }
    ],
    "questions": [
      {
        "scene": "语气变化",
        "dimension": "sensitivity",
        "q": "熟悉的人回复比平时简短，你通常多久会注意到？",
        "options": [
          {
            "text": "几乎立刻，会开始回想前面的对话",
            "score": {
              "sensitivity": 3,
              "repair": 1
            }
          },
          {
            "text": "连续几次都这样才会留意",
            "score": {
              "sensitivity": 2
            }
          },
          {
            "text": "除非对方直接说，否则不太判断",
            "score": {
              "sensitivity": 0,
              "boundary": 1
            }
          },
          {
            "text": "会注意，但先当作对方可能只是忙",
            "score": {
              "sensitivity": 1,
              "recovery": 1
            }
          }
        ]
      },
      {
        "scene": "现场气氛",
        "dimension": "sensitivity",
        "q": "聚会中有一个人突然安静下来，你更可能？",
        "options": [
          {
            "text": "很快发现，并持续观察他是不是不舒服",
            "score": {
              "sensitivity": 3
            }
          },
          {
            "text": "注意到后找机会私下问一句",
            "score": {
              "sensitivity": 2,
              "boundary": 1
            }
          },
          {
            "text": "尊重他的安静，不主动赋予含义",
            "score": {
              "sensitivity": 0
            }
          },
          {
            "text": "先继续参与，明显不对再处理",
            "score": {
              "sensitivity": 1
            }
          }
        ]
      },
      {
        "scene": "隐含情绪",
        "dimension": "sensitivity",
        "q": "别人嘴上说“没事”，但表情不太自然，你会？",
        "options": [
          {
            "text": "很难真的当作没事，会反复确认",
            "score": {
              "sensitivity": 3,
              "repair": 1
            }
          },
          {
            "text": "表达一次关心，然后给对方选择",
            "score": {
              "sensitivity": 2,
              "boundary": 2
            }
          },
          {
            "text": "按对方说的处理，需要时他会开口",
            "score": {
              "sensitivity": 0
            }
          },
          {
            "text": "会记在心里，之后看情况再问",
            "score": {
              "sensitivity": 1
            }
          }
        ]
      },
      {
        "scene": "朋友低落",
        "dimension": "responsibility",
        "q": "朋友因为工作低落，连续几天找你倾诉，你最容易怎么做？",
        "options": [
          {
            "text": "尽量随时回应，怕不陪着他会更糟",
            "score": {
              "responsibility": 3,
              "boundary": 0
            }
          },
          {
            "text": "陪伴的同时询问他还需要哪些支持",
            "score": {
              "responsibility": 2,
              "boundary": 1
            }
          },
          {
            "text": "说明自己能听多久，也鼓励他寻找更多支持",
            "score": {
              "responsibility": 0,
              "boundary": 3
            }
          },
          {
            "text": "直接给解决方案，希望问题尽快结束",
            "score": {
              "responsibility": 1,
              "repair": 1
            }
          }
        ]
      },
      {
        "scene": "家人失望",
        "dimension": "responsibility",
        "q": "你拒绝家人的一个请求后，对方明显失望，你会？",
        "options": [
          {
            "text": "很快改口答应，失望让我难以坚持",
            "score": {
              "responsibility": 3,
              "avoidance": 2
            }
          },
          {
            "text": "解释很多，希望对方理解我不是不在乎",
            "score": {
              "responsibility": 2,
              "repair": 2
            }
          },
          {
            "text": "承认对方会失望，但不因此撤回决定",
            "score": {
              "responsibility": 0,
              "boundary": 3
            }
          },
          {
            "text": "先躲开，不想继续面对对方的情绪",
            "score": {
              "responsibility": 1,
              "avoidance": 2
            }
          }
        ]
      },
      {
        "scene": "同事焦虑",
        "dimension": "responsibility",
        "q": "同事因为进度落后非常焦虑，但问题并不由你造成，你会？",
        "options": [
          {
            "text": "主动接过一部分，先让他别那么焦虑",
            "score": {
              "responsibility": 3
            }
          },
          {
            "text": "帮他梳理一次，但不会默认接手",
            "score": {
              "responsibility": 1,
              "boundary": 2
            }
          },
          {
            "text": "明确这是他的责任，需要他提出具体协作请求",
            "score": {
              "responsibility": 0,
              "boundary": 3
            }
          },
          {
            "text": "因为不想卷入，尽量减少互动",
            "score": {
              "responsibility": 2,
              "avoidance": 1
            }
          }
        ]
      },
      {
        "scene": "可用时间",
        "dimension": "boundary",
        "q": "亲近的人在你最忙时想认真聊一小时，你通常会？",
        "options": [
          {
            "text": "明确现在只能聊十分钟，并约好完整时间",
            "score": {
              "boundary": 3,
              "repair": 1
            }
          },
          {
            "text": "先听一会儿，超时后才开始焦躁",
            "score": {
              "boundary": 1,
              "responsibility": 2
            }
          },
          {
            "text": "直接停下手头事情，不能让他失望",
            "score": {
              "boundary": 0,
              "responsibility": 3
            }
          },
          {
            "text": "说自己忙，但不说明什么时候能谈",
            "score": {
              "boundary": 2,
              "avoidance": 1
            }
          }
        ]
      },
      {
        "scene": "持续抱怨",
        "dimension": "boundary",
        "q": "一段谈话不断重复同样的抱怨时，你能否结束它？",
        "options": [
          {
            "text": "能，会说明自己已经没有继续倾听的容量",
            "score": {
              "boundary": 3
            }
          },
          {
            "text": "会尝试把话题转向具体下一步",
            "score": {
              "boundary": 2
            }
          },
          {
            "text": "很难，怕打断显得冷漠",
            "score": {
              "boundary": 0,
              "responsibility": 2
            }
          },
          {
            "text": "通常用敷衍回复慢慢退出",
            "score": {
              "boundary": 1,
              "avoidance": 2
            }
          }
        ]
      },
      {
        "scene": "拒绝之后",
        "dimension": "boundary",
        "q": "你说“不方便”后，对方继续追问理由，你会？",
        "options": [
          {
            "text": "重复自己的决定，不再增加解释",
            "score": {
              "boundary": 3
            }
          },
          {
            "text": "补充一次真实原因，希望对方理解",
            "score": {
              "boundary": 2
            }
          },
          {
            "text": "开始动摇，担心理由不够充分",
            "score": {
              "boundary": 0,
              "responsibility": 2
            }
          },
          {
            "text": "找一个更容易被接受的借口结束对话",
            "score": {
              "boundary": 1,
              "avoidance": 2
            }
          }
        ]
      },
      {
        "scene": "已读不回",
        "dimension": "repair",
        "q": "一次重要沟通后，对方很久没回复，你通常怎样等待？",
        "options": [
          {
            "text": "很难做别的，会不断检查并想补充解释",
            "score": {
              "repair": 3,
              "sensitivity": 1
            }
          },
          {
            "text": "会焦虑，但约定时间前不再追问",
            "score": {
              "repair": 2,
              "boundary": 1
            }
          },
          {
            "text": "允许对方需要时间，把注意力放回自己",
            "score": {
              "repair": 0,
              "recovery": 2
            }
          },
          {
            "text": "先变冷淡，避免显得是我更在意",
            "score": {
              "repair": 1,
              "avoidance": 1
            }
          }
        ]
      },
      {
        "scene": "冲突过夜",
        "dimension": "repair",
        "q": "和伴侣发生分歧后，对方希望第二天再谈，你会？",
        "options": [
          {
            "text": "很难接受，今晚不说清几乎睡不着",
            "score": {
              "repair": 3
            }
          },
          {
            "text": "想继续谈，但能约定明天具体时间",
            "score": {
              "repair": 2,
              "boundary": 1
            }
          },
          {
            "text": "可以暂停，先让双方情绪降下来",
            "score": {
              "repair": 0,
              "recovery": 2
            }
          },
          {
            "text": "表面同意，之后却故意减少联系",
            "score": {
              "repair": 1,
              "avoidance": 2
            }
          }
        ]
      },
      {
        "scene": "关系裂缝",
        "dimension": "repair",
        "q": "你察觉一段关系有点疏远时，最自然的动作是？",
        "options": [
          {
            "text": "立刻增加联系，希望尽快恢复原来的状态",
            "score": {
              "repair": 3
            }
          },
          {
            "text": "主动约一次谈话，确认双方感受",
            "score": {
              "repair": 2
            }
          },
          {
            "text": "观察一段时间，也接受关系可能在变化",
            "score": {
              "repair": 0,
              "recovery": 1
            }
          },
          {
            "text": "先撤回投入，避免自己继续受伤",
            "score": {
              "repair": 1,
              "avoidance": 2
            }
          }
        ]
      },
      {
        "scene": "不同意见",
        "dimension": "avoidance",
        "q": "大家兴致很高地决定一件你并不想参加的事，你会？",
        "options": [
          {
            "text": "先答应，不想在当下破坏气氛",
            "score": {
              "avoidance": 3,
              "boundary": 0
            }
          },
          {
            "text": "表达自己没兴趣，但不阻止大家参加",
            "score": {
              "avoidance": 0,
              "boundary": 3
            }
          },
          {
            "text": "用玩笑暗示，希望有人听懂",
            "score": {
              "avoidance": 2
            }
          },
          {
            "text": "等结束后再私下说自己不参加",
            "score": {
              "avoidance": 1,
              "boundary": 1
            }
          }
        ]
      },
      {
        "scene": "不舒服的话",
        "dimension": "avoidance",
        "q": "亲近的人说了一句让你不舒服的话，你更可能？",
        "options": [
          {
            "text": "先压下去，告诉自己别太敏感",
            "score": {
              "avoidance": 3
            }
          },
          {
            "text": "等情绪稳定后，具体说明哪句话有影响",
            "score": {
              "avoidance": 1,
              "boundary": 2
            }
          },
          {
            "text": "当场确认他的意思，不让猜测继续",
            "score": {
              "avoidance": 0,
              "boundary": 2
            }
          },
          {
            "text": "语气变冷，让对方自己发现问题",
            "score": {
              "avoidance": 2,
              "repair": 1
            }
          }
        ]
      },
      {
        "scene": "团队分歧",
        "dimension": "avoidance",
        "q": "会议上多数人支持一个你认为风险很大的方案，你会？",
        "options": [
          {
            "text": "不想显得难合作，先保持沉默",
            "score": {
              "avoidance": 3
            }
          },
          {
            "text": "会提风险，但尽量把语气处理得很软",
            "score": {
              "avoidance": 2
            }
          },
          {
            "text": "清楚说明风险、依据和替代方案",
            "score": {
              "avoidance": 0,
              "boundary": 2
            }
          },
          {
            "text": "会后找负责人单独表达",
            "score": {
              "avoidance": 1
            }
          }
        ]
      },
      {
        "scene": "倾诉之后",
        "dimension": "recovery",
        "q": "听完一段沉重倾诉后，你通常多久能回到自己的状态？",
        "options": [
          {
            "text": "有自己的切换方式，一段时间后能放下",
            "score": {
              "recovery": 3
            }
          },
          {
            "text": "需要独处或找人说一说才能缓过来",
            "score": {
              "recovery": 2
            }
          },
          {
            "text": "会带着对方的情绪很久，反复想能做什么",
            "score": {
              "recovery": 0,
              "responsibility": 2
            }
          },
          {
            "text": "表面恢复很快，身体却会明显疲惫",
            "score": {
              "recovery": 1,
              "sensitivity": 1
            }
          }
        ]
      },
      {
        "scene": "关系波动",
        "dimension": "recovery",
        "q": "一段关系出现小摩擦后，你还能专注处理自己的事情吗？",
        "options": [
          {
            "text": "能，知道关系问题可以在约定时间处理",
            "score": {
              "recovery": 3,
              "boundary": 1
            }
          },
          {
            "text": "需要先写下来或走一走，再逐渐恢复",
            "score": {
              "recovery": 2
            }
          },
          {
            "text": "很难，事情没解决前注意力一直被占用",
            "score": {
              "recovery": 0,
              "repair": 2
            }
          },
          {
            "text": "靠忙别的压过去，但停下来又会想起",
            "score": {
              "recovery": 1,
              "avoidance": 1
            }
          }
        ]
      },
      {
        "scene": "情绪归属",
        "dimension": "recovery",
        "q": "面对别人的低落，你是否能提醒自己“这是他的感受，不全由我负责”？",
        "options": [
          {
            "text": "能，而且这不会妨碍我继续关心他",
            "score": {
              "recovery": 3,
              "boundary": 2
            }
          },
          {
            "text": "有时能，需要刻意提醒自己",
            "score": {
              "recovery": 2
            }
          },
          {
            "text": "很难，知道道理但身体会自动紧张",
            "score": {
              "recovery": 1,
              "sensitivity": 2
            }
          },
          {
            "text": "几乎不能，只要对方不好我就很难轻松",
            "score": {
              "recovery": 0,
              "responsibility": 3
            }
          }
        ]
      }
    ],
    "profiles": {
      "sensitivity": {
        "name": "高敏接收型",
        "verdict": "你很早就能听见关系里的变化，但不必为每一个信号立刻行动。",
        "core": "你会捕捉语气、表情和互动频率中的细小变化。这让你很会读现场，也让大量尚未确认的信息提前进入身体。",
        "combo": "你先感知变化，再决定关系是否安全。",
        "secondary": "你也会把细微信号当作需要认真处理的信息。",
        "trigger": "语气改变、沉默、气氛突然变冷",
        "reaction": "扫描细节、回想上下文、预判对方感受",
        "benefit": "能较早发现关系问题并照顾现场",
        "cost": "容易在事实不足时承担大量猜测",
        "strengths": [
          "能发现别人没说出口的变化",
          "对关系氛围和协作状态敏锐"
        ],
        "costs": [
          "可能把一次状态变化扩展成关系判断",
          "持续扫描会占用大量注意力"
        ],
        "actions": [
          {
            "time": "本周",
            "text": "每次捕捉到情绪信号时写两栏：已知事实、我的解释。只有事实连续出现两次，或对方明确表达后，再决定是否介入。"
          }
        ],
        "share": "我看见了情绪，不等于我已经知道它为什么发生。"
      },
      "responsibility": {
        "name": "情绪接管型",
        "verdict": "你会照顾人，但常在对方还没提出请求时，就先把责任放到自己身上。",
        "core": "别人的失望、焦虑和低落会迅速转化成你的待办。你通过陪伴、补位和让步换来短期平稳，却可能让双方都失去处理各自情绪的机会。",
        "combo": "你会用行动减少他人的不舒服。",
        "secondary": "你也容易把关系是否平稳当作自己的责任。",
        "trigger": "他人低落、失望、焦虑或无法处理问题",
        "reaction": "增加陪伴、主动补位、撤回自己的拒绝",
        "benefit": "现场很快缓和，你也获得“我没有袖手旁观”的安心",
        "cost": "责任边界逐渐模糊，照顾最终变成透支",
        "strengths": [
          "可靠，愿意在别人困难时提供实际支持",
          "能看见情绪背后的现实需要"
        ],
        "costs": [
          "容易替别人完成本该由他承担的部分",
          "自己的容量和需要被长期延后"
        ],
        "actions": [
          {
            "time": "本周",
            "text": "在一次帮助前先问：“你现在想让我听、一起想办法，还是帮一个具体动作？”只回应被明确提出的那一项。"
          }
        ],
        "share": "我可以关心你的情绪，但不需要替你完成它。"
      },
      "boundary": {
        "name": "有界共情型",
        "verdict": "你正在建立一种更可持续的靠近：表达关心，也说明自己的容量。",
        "core": "你知道边界不是冷漠，而是让帮助不靠硬撑。你能把时间、责任和选择说清，使对方不必猜，也让自己不至于积累到突然撤离。",
        "combo": "你会在连接和自我保护之间寻找清楚边界。",
        "secondary": "你也需要让自己的“可以”和“不可以”被看懂。",
        "trigger": "他人需求超过当前时间、精力或职责",
        "reaction": "说明可提供的范围、时间和替代方式",
        "benefit": "关系获得可预期的支持，自己也能保持稳定",
        "cost": "面对不习惯边界的人，你仍可能被评价为不够热情",
        "strengths": [
          "能把帮助说得具体",
          "不必靠失联或爆发补回边界"
        ],
        "costs": [
          "可能过度强调规则而忽略对方当下感受",
          "遇到强烈情绪时仍需练习稳定表达"
        ],
        "actions": [
          {
            "time": "本周",
            "text": "准备一句固定边界表达：“我现在能做的是X，不能做的是Y，如果需要，我们可以在Z时间继续。”在一件小事上完整说出。"
          }
        ],
        "share": "边界不是把你推开，是告诉你我能怎样留下来。"
      },
      "repair": {
        "name": "即时修复型",
        "verdict": "关系一有裂缝，你就很难等待；真正需要练习的是带着未解决继续生活。",
        "core": "你重视连接，也很难承受不确定。主动修复是能力，但当修复必须立刻完成，它也会变成追问、解释和过度联系，压缩双方冷静空间。",
        "combo": "你会尽快确认关系仍然安全。",
        "secondary": "你也通过恢复联系来降低不确定带来的焦虑。",
        "trigger": "已读不回、冲突暂停、关系突然疏远",
        "reaction": "追问、补充解释、增加联系",
        "benefit": "短期获得确定感，避免问题长期悬置",
        "cost": "对方空间被压缩，你也失去自我安顿的机会",
        "strengths": [
          "愿意面对关系问题而不是长期冷处理",
          "有主动重建连接的动力"
        ],
        "costs": [
          "容易把等待误解为关系正在恶化",
          "修复速度可能快于双方理解问题的速度"
        ],
        "actions": [
          {
            "time": "本周",
            "text": "发生轻微冲突后，只发送一次确认：“我愿意继续谈，你准备好时告诉我。”随后为自己设置至少两小时不追问窗口。"
          }
        ],
        "share": "我想修复关系，也要学会不在每次沉默里追着证明安全。"
      },
      "avoidance": {
        "name": "和平维持型",
        "verdict": "你很会让现场不难看，但真实分歧常被延后到关系已经变冷以后。",
        "core": "你对冲突成本敏感，会用沉默、软化、玩笑或事后表达保护气氛。这在短期有效，却可能让别人误以为你没有意见。",
        "combo": "你先保住表面合作，再处理自己的不同感受。",
        "secondary": "你也担心直接表达会让关系付出过高代价。",
        "trigger": "多人意见一致、对方情绪强烈、表达可能扫兴",
        "reaction": "压低意见、间接暗示、转到事后沟通",
        "benefit": "避免现场升级，维持基本合作",
        "cost": "需求长期不可见，最后只能用疏远补偿",
        "strengths": [
          "能评估表达时机和现场承受力",
          "不轻易让分歧变成人身对抗"
        ],
        "costs": [
          "别人难以知道你的真实位置",
          "延迟表达会让不满在内部变形"
        ],
        "actions": [
          {
            "time": "本周",
            "text": "在一次低风险分歧里使用三句式：“我听见你的考虑；我不同意的是X；我建议先试Y。”不解释自己是不是难相处。"
          }
        ],
        "share": "我维护了很多次和平，也该让真实意见拥有一次位置。"
      },
      "recovery": {
        "name": "自我归位型",
        "verdict": "你能关心别人，也能在谈话结束后把感受和注意力带回自己。",
        "core": "你不是感受不到他人，而是逐渐具备了情绪归属感：谁的感受由谁负责，自己能提供什么，以及什么时候需要退出恢复。",
        "combo": "你会在共情之后主动完成情绪切换。",
        "secondary": "你也重视让自己在关系事件后重新回到稳定状态。",
        "trigger": "倾诉、冲突或长时间情绪陪伴结束",
        "reaction": "整理事实、身体放松、转回自己的节奏",
        "benefit": "关心不会无限延长成持续待机",
        "cost": "如果切换过快，部分人可能误解为你不够投入",
        "strengths": [
          "有可持续的情绪恢复方式",
          "能区分共情与共同陷入"
        ],
        "costs": [
          "可能高估自己已经消化的程度",
          "强调自我调节时要避免忽略必要修复"
        ],
        "actions": [
          {
            "time": "本周",
            "text": "每次情绪陪伴结束后做一个5分钟归位动作：走动、洗手或写下“对方的部分/我的部分/下一步”，让身体知道谈话已经结束。"
          }
        ],
        "share": "我可以陪你经过情绪，但不必把它带回我的整晚。"
      }
    },
    "combinations": {
      "sensitivity+responsibility": {
        "title": "高敏接收 × 情绪接管",
        "summary": "你不仅很快看见情绪，还会迅速把它变成自己的责任，因此常在别人开口前就开始消耗。",
        "tension": "第一步不是降低敏感，而是在感知和行动之间增加一次确认。"
      },
      "repair+avoidance": {
        "title": "想立刻和好 × 又不敢说真话",
        "summary": "你很想恢复连接，却又害怕真正的分歧破坏关系，于是修复可能只停在恢复气氛。",
        "tension": "有效修复需要允许短暂不舒服，并把具体问题留在对话中。"
      },
      "boundary+recovery": {
        "title": "有界共情 × 自我归位",
        "summary": "你能靠近，也能离开情绪现场。这是一种可持续的关系能力，而不是冷淡。",
        "tension": "需要留意的是，边界表达仍要包含关心，否则正确内容也可能被听成拒绝。"
      }
    },
    "insightRules": [],
    "report": {
      "decision": null
    }
  }
});
}());
