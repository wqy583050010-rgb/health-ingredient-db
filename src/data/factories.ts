// 国内外保健食品ODM/OEM代工厂数据库

export interface SuccessCase {
  name: string;
  url: string;
}

export interface OEMFactory {
  id: string;
  name: string;
  nameEn: string;
  region: 'domestic' | 'international';
  location: string;
  address: string;
  phone: string;
  email: string;
  founded: string;
  employees: string;
  revenue: string;
  stockCode?: string;
  factories: string;
  moq: string;
  priceRange: string;
  dosageForms: string[];
  advantageDosageForms?: string[];
  patents: string;
  certifications: string[];
  clients: string;
  successCases: SuccessCase[];
  website: string;
  intro: string;
  highlights: string[];
}

export interface IndustryRefRow {
  form: string;
  china: string;
  intl: string;
}

export const oemFactories: OEMFactory[] = [
  {
    "id": "sirio-pharma",
    "name": "仙乐健康",
    "nameEn": "Sirio Pharma Co., Ltd.",
    "region": "domestic",
    "location": "广东省汕头市",
    "address": "广东省汕头市泰山路83号",
    "phone": "0754-88924286 / 0754-86888688",
    "email": "sales@siriopharma.com",
    "founded": "1993年",
    "employees": "约2,776人 (2024年报)",
    "revenue": "42.63亿元 (2025年)",
    "stockCode": "300791 (深交所创业板)",
    "factories": "7大生产基地(亚美欧): 广东汕头、安徽马鞍山、苏州、北美Best Formulations、德国Ayanda/Pritzwalk",
    "moq": "软胶囊/片剂>=30万粒; 营养软糖>=50万粒; 饮品/口服液>=3万瓶",
    "priceRange": "软胶囊0.15-0.80元/粒; 软糖0.20-1.50元/粒; 片剂0.05-0.30元/片",
    "dosageForms": [
      "软胶囊",
      "营养软糖",
      "片剂",
      "硬胶囊",
      "粉剂",
      "口服液",
      "饮品",
      "益生菌",
      "植物基软胶囊(素怡R)",
      "萃优酪R",
      "萃益球R益生菌晶球",
      "维浆果R肠衣软糖",
      "悦沛R爽口爆珠",
      "乳态饮",
      "泡腾片"
    ],
    "patents": "198项专利(75项授权); 三层无缝软胶囊制备方法; 植物基软胶囊PlantegrityR; 萃优酪R凝胶软糖; 萃益球R益生菌晶球; 植物乳植杆菌SP055后生元",
    "certifications": [
      "美国UL GMP",
      "美国NPA GMP",
      "美国NSF GMP",
      "TGA GMP(澳大利亚)",
      "BRCGS",
      "IFS",
      "HACCP",
      "ISO9001",
      "ISO14001",
      "ISO45001",
      "ISO27001",
      "Kosher",
      "Halal",
      "欧盟有机认证",
      "美国USDA有机认证",
      "有机产品认证(中国)",
      "海关AEO认证",
      "SEDEX",
      "NSF SPORTS",
      "MSC",
      "FOS",
      "Gluten-Free",
      "实验室CNAS认证",
      "药品GMP(中国)"
    ],
    "clients": "全球50+国家400+客户,包括英国健康食品零售商、澳新KA客户、欧洲新锐线上健康品牌、中国知名药店自有品牌",
    "successCases": [
      {
        "name": "PlantegrityR植物基软胶囊 - 英国健康食品零售商合作",
        "url": "https://www.siriopharma.com/product/567.html"
      },
      {
        "name": "营养软糖 - 新华社点赞\"中国制造\"硬实力",
        "url": "https://www.siriopharma.com/news/464.html"
      },
      {
        "name": "日内瓦国际发明展金奖 - 植物源生物转化技术",
        "url": "https://www.siriopharma.com/news/462.html"
      },
      {
        "name": "Omega-3软胶囊 - 英国新锐品牌欧洲工厂批量生产",
        "url": "https://www.siriopharma.com/"
      }
    ],
    "website": "https://www.siriopharma.com/",
    "intro": "国内最大的营养保健品CDMO企业,1993年成立,2019年A股上市(中国营养健康食品CDMO第一股)。专注营养健康食品领域30多年,7大自动化生产基地遍布亚美欧三地。2016年收购德国Ayanda、2023年收购美国Best Formulations形成全球化布局。2024年软胶囊营收20.23亿元(占比47.45%)、软糖10.65亿元。拥有从产品概念孵化、研发设计、生产制造到全球市场营销推广的全链式解决方案能力,26项国际标准认证让产品在全球畅通无阻。",
    "highlights": [
      "国内保健品CDMO第一股",
      "全球化7大生产基地",
      "26项国际标准认证",
      "软胶囊+软糖双核心品类",
      "植物基软胶囊创新技术"
    ],
    "advantageDosageForms": [
      "软胶囊",
      "营养软糖",
      "益生菌晶球(萃益球R)",
      "植物基软胶囊"
    ]
  },
  {
    "id": "tci-bio",
    "name": "大江生医",
    "nameEn": "TCI Co., Ltd.",
    "region": "domestic",
    "location": "中国台湾台北市",
    "address": "中国台湾台北市内湖区行善路398号",
    "phone": "+886-2-8797-1888",
    "email": "service@tci-bio.com",
    "founded": "1980年",
    "employees": "约850人",
    "revenue": "约70-80亿新台币 (约16-18亿人民币)",
    "stockCode": "8436 (台湾柜买中心)",
    "factories": "台湾(总部+零碳工厂)、中国大陆、东南亚、北美、欧洲",
    "moq": "益生菌/功能性饮料>=3万瓶; 胶原蛋白/口服美容>=5万瓶; 粉剂/片剂>=5万盒",
    "priceRange": "益生菌粉5-30元/袋; 胶原蛋白饮8-25元/瓶; 胶囊2-10元/粒",
    "dosageForms": [
      "益生菌",
      "机能性饮料",
      "胶原蛋白饮",
      "口服液",
      "胶囊",
      "软胶囊",
      "片剂",
      "粉剂",
      "果冻",
      "液体条包",
      "玻璃瓶装",
      "面膜",
      "保养品",
      "软糖"
    ],
    "patents": "2700+项专利与商标; 生物挖矿(Bio-Mining)平台; 7大实验室系统; 专利菌株TCI633(自生玻尿酸); TCI405(植物乳杆菌); 7天极速打样; 世界首个零碳工厂",
    "certifications": [
      "GMP",
      "ISO22000",
      "HACCP",
      "HALAL",
      "Kosher",
      "台卫福部健康食品认证",
      "零碳工厂认证"
    ],
    "clients": "全球68+国家品牌客户、跨境保健品品牌、95%复购率",
    "successCases": [
      {
        "name": "TCI 46年历程 - 全球68国品牌合作伙伴",
        "url": "https://www.tci-bio.com/"
      },
      {
        "name": "世界首个零碳工厂 - 自动化生产基地",
        "url": "https://www.tci-bio.com/s-factory/"
      },
      {
        "name": "TCI生物挖矿技术平台 - 2700+专利",
        "url": "https://www.tci-bio.com/technology/rd-labs/"
      }
    ],
    "website": "https://www.tci-bio.com/",
    "intro": "1980年成立,2011年由ODM转型为CDMO+,2013年挂牌上柜。凭借\"生物挖矿\"专利平台技术和7天极速打样能力,成为高端定制市场领导者。拥有2700+项专利与商标,服务全球68+国家品牌客户,95%复购率。建设了世界首个零碳工厂,服务涵盖保健食品、机能性饮料、保养品、面膜等多领域。46年行业经验,覆盖液体条包、玻璃瓶、果冻等多种剂型。",
    "highlights": [
      "2700+专利与商标",
      "7天极速打样",
      "世界首个零碳工厂",
      "专利菌株TCI633/TCI405",
      "全球68国95%复购率"
    ],
    "advantageDosageForms": [
      "发酵饮品",
      "口服液",
      "冻干粉",
      "机能性饮品"
    ]
  },
  {
    "id": "baihe-biotech",
    "name": "百合生物",
    "nameEn": "Baihe Biotech Co., Ltd.",
    "region": "domestic",
    "location": "山东省威海市荣成市",
    "address": "山东省威海荣成市天鹅湖经济技术开发区成大路552号",
    "phone": "0631-7829999",
    "email": "baihe@baiheshengwu.com",
    "founded": "2005年",
    "employees": "约1,200人",
    "revenue": "9.11亿元 (2025年)",
    "stockCode": "603102 (上交所主板)",
    "factories": "2大厂区,8大数字化智能生产工厂,占地150余亩,2万余平米GMP净化车间",
    "moq": "软胶囊>=30万粒; 功能饮品>=3万瓶; 粉剂/片剂>=5万盒",
    "priceRange": "软胶囊0.20-0.80元/粒; 功能饮品2-10元/瓶; 片剂0.10-0.50元/片",
    "dosageForms": [
      "软胶囊",
      "硬胶囊",
      "片剂",
      "粉剂",
      "颗粒剂",
      "滴剂",
      "瓶饮",
      "软饮",
      "口服液",
      "压片糖果",
      "组合营养品",
      "凝胶糖果"
    ],
    "patents": "1400+个营养保健食品批文; 国家科学技术进步奖; 多项保健食品配方及生产工艺专利; 国家知识产权示范企业",
    "certifications": [
      "保健食品GMP",
      "FDA注册",
      "英国BRC",
      "加拿大FSRN",
      "ISO22000",
      "HACCP",
      "Eurofins GMP",
      "高新技术企业",
      "国家知识产权示范企业"
    ],
    "clients": "全球1000+品牌商,出口78个国家和地区,服务超6亿消费者",
    "successCases": [
      {
        "name": "与新西兰奥拉营养(Ora)达成战略合作",
        "url": "https://zhuanlan.zhihu.com/p/1896200612464525372"
      },
      {
        "name": "百合股份2025年战略合作伙伴大会 - 1000+品牌商",
        "url": "https://m.baobei360.com/articles/detail-190683.html"
      },
      {
        "name": "营养保健食品数字化智能工厂",
        "url": "http://www.baiheshengwu.com/"
      }
    ],
    "website": "http://www.baiheshengwu.com/",
    "intro": "2005年成立,2022年主板上市,营养保健食品行业主板上市第一股。8大数字化智能生产工厂,可生产4000余种产品,拥有1400+个营养保健食品批文,服务全球超1000+品牌商和6亿消费者。主营业务:软胶囊35.97%、功能饮品28.56%、粉剂13.88%、片剂10.99%。2025年与新西兰奥拉营养达成战略合作,出口78个国家和地区,获国家科学技术进步奖。",
    "highlights": [
      "行业主板上市第一股",
      "8大智能工厂",
      "1400+营养保健食品批文",
      "出口78国服务6亿消费者",
      "国家知识产权示范企业"
    ],
    "advantageDosageForms": [
      "软胶囊",
      "营养软糖",
      "片剂"
    ]
  },
  {
    "id": "aland",
    "name": "艾兰得",
    "nameEn": "Aland Health Holdings Ltd.",
    "region": "domestic",
    "location": "江苏省靖江市",
    "address": "江苏省靖江市江山路20号（生产基地）; 上海市浦东新区银城中路168号上海银行大厦18F03-05室（品牌事业部）",
    "phone": "400-0909-888 / 0523-82881800",
    "email": "infor@aland.cn",
    "founded": "1998年",
    "employees": "全球超5000人(中国1007人参保)",
    "revenue": "出口额约7.6亿美元 (2025年估算); 估值超15亿美元",
    "stockCode": "",
    "factories": "全球11个生产基地(亚洲4个+北美4个+欧洲3个): 中国靖江/苏州、美国IVC/ADAM/Delavau/GNC工厂、英国Brunel Healthcare、德国Pragen Pharma、加拿大Vita Health",
    "moq": "片剂≥100万片; 软胶囊≥50万粒; 硬胶囊≥30万粒; 粉剂≥500kg",
    "priceRange": "片剂0.05-0.25元/片; 软胶囊0.15-0.60元/粒; 硬胶囊0.10-0.40元/粒; 粉剂30-80元/kg",
    "dosageForms": [
      "片剂",
      "软胶囊",
      "硬胶囊",
      "粉剂",
      "颗粒剂",
      "泡腾片",
      "口服液",
      "蛋白粉",
      "运动营养棒",
      "益生菌制剂",
      "维生素C含片",
      "泡罩包装",
      "瓶装",
      "袋装",
      "咀嚼片",
      "软糖",
      "功能饮料",
      "压片糖果"
    ],
    "patents": "国家知识产权示范企业; 自动化生产设备/制剂工艺/益生菌技术等多项专利; 部分产品获USP标准认证; 大规模片剂制造技术; 营养品配方研发能力; 28项国际质量体系及产品认证; 中美英加四国研发基地",
    "certifications": [
      "美国FDA cGMP",
      "美国USP",
      "澳大利亚TGA",
      "HACCP",
      "ISO9001",
      "ISO14001",
      "ISO22000",
      "英国BRC",
      "FSSC22000",
      "China GMP",
      "中国驰名商标",
      "国家知识产权示范企业",
      "江苏省独角兽企业",
      "江苏省专精特新小巨人",
      "全国首张运动营养食品生产许可证",
      "FDA现场零缺陷检查(Top 0-observation/0 Form 483)",
      "英国女王企业奖(子公司IVC Brunel×2次)",
      "GMP",
      "USP",
      "FDA",
      "cGMP",
      "28项国际质量体系认证"
    ],
    "clients": "全球80+国家/地区销售; 进入70+家全国百强连锁药店/50+家百强商超/20000+终端门店; 欧美商超/连锁药店/会员制俱乐部；服务北美/欧洲品牌客户、跨境电商、Perrigo营养品等",
    "successCases": [
      {
        "name": "连续六年中国保健品企业出口10强榜首(2014-2019)",
        "url": "https://baike.baidu.com/item/%E8%89%BE%E5%85%B0%E5%BE%97/67912659"
      },
      {
        "name": "收购美国GNC旗下供应链工厂Nutra Manufacturing(2019)",
        "url": "https://www.alandgroup.com/"
      },
      {
        "name": "叶黄素关键技术获江苏省科技进步一等奖(2025)",
        "url": "https://baike.baidu.com/item/%E8%89%BE%E5%85%B0%E5%BE%97/67912659"
      },
      {
        "name": "曼联足球俱乐部中国官方合作营养品牌(2014-至今)",
        "url": "https://baike.baidu.com/item/%E8%89%BE%E5%85%B0%E5%BE%97/67912659"
      },
      {
        "name": "联合项目荣获江苏省科技进步一等奖",
        "url": "https://www.aland.cn/"
      },
      {
        "name": "全球80+国家销售网络覆盖欧美主流保健品商超",
        "url": "https://www.aland.cn/content/%E5%85%A8%E7%90%83%E5%B8%83%E5%B1%80"
      },
      {
        "name": "收购美国IVC(含Perrigo营养品业务)实现全球化",
        "url": "https://www.aland.cn/"
      }
    ],
    "website": "https://www.aland.cn/",
    "intro": "中国最大的营养保健品出口企业之一, 始于1998年, 前身为国营靖江葡萄糖厂。横跨亚洲、北美、欧洲建立11个世界级生产基地和4个国际研发中心, 全球年产能约520亿粒片剂+120亿粒软胶囊+60亿粒硬胶囊+10000吨粉剂。产品行销80多个国家和地区, 连续六年位居中国保健品出口10强榜首。通过一系列跨国并购(美国IVC/ADAM/Delavau/GNC工厂、英国Brunel Healthcare、德国Pragen Pharma、加拿大Vita Health)打造全球分布式供应链。",
    "highlights": [
      "中国保健品出口连续6年第一",
      "全球11个生产基地/5000+员工",
      "年产能520亿粒片剂+120亿粒软胶囊",
      "FDA零缺陷检查",
      "曼联中国官方营养品牌",
      "江苏省独角兽企业",
      "年产能200亿片",
      "中国最大营养品出口企业",
      "收购美国IVC",
      "USP认证",
      "中美英加四国研发基地"
    ],
    "advantageDosageForms": [
      "片剂",
      "软胶囊",
      "营养软糖",
      "粉剂"
    ]
  },
  {
    "id": "hengmei-health",
    "name": "衡美健康",
    "nameEn": "Hengmei Health",
    "region": "domestic",
    "location": "浙江省杭州市余杭区",
    "address": "浙江省杭州市余杭区良渚街道大陆工业园区纬六路8号; 子公司:浙江省湖州市安吉县天子湖镇",
    "phone": "0571-88766159 / 0571-85851939",
    "email": "hengmei@hengmei-cn.com",
    "founded": "2012年",
    "employees": "约300-500人",
    "revenue": "营养功能食品代工市场占有率4.2%(首位)",
    "factories": "浙江杭州(自有研发中心+生产基地); 浙江吉美食品科技(全资子公司,湖州安吉); 广州办、上海办",
    "moq": "粉剂/代餐奶昔>=5,000盒; 营养软糖>=3万瓶; 功能饮料>=3万瓶",
    "priceRange": "营养软糖0.30-1.50元/粒; 蛋白粉30-150元/罐; 功能饮料3-12元/瓶",
    "dosageForms": [
      "蛋白粉",
      "代餐奶昔",
      "功能饮料",
      "营养软糖",
      "固体饮料",
      "压片糖果",
      "运动营养食品",
      "液体饮",
      "棒类",
      "烘焙食品",
      "健康零食"
    ],
    "patents": "近135项研发专利; 5,000+款个性化产品配方; HiCollTech高含量胶原蛋白肽饮技术; Giant whale-tech定向溶解技术; TinyDrops极渺超微乳化技术",
    "certifications": [
      "高新技术企业",
      "SC食品生产许可证",
      "ISO22000",
      "HACCP"
    ],
    "clients": "汤臣倍健、肌肉科技、WonderLab、良品铺子、华熙生物、5000+合作商",
    "successCases": [
      {
        "name": "HiCollTech高含量胶原蛋白肽饮 - 雪玑钥R胶原三肽桂花饮",
        "url": "https://www.hengmei-cn.com/Products_detail/131.html"
      },
      {
        "name": "Giant whale-tech定向溶解技术 - 焕醺R拟微球藻肽海参肽朝鲜蓟压片糖果",
        "url": "https://www.hengmei-cn.com/Products_detail/130.html"
      },
      {
        "name": "TinyDrops极渺超微乳化技术 - 钙锌维生素D液体饮",
        "url": "https://www.hengmei-cn.com/Products_detail/132.html"
      }
    ],
    "website": "https://www.hengmei-cn.com/",
    "intro": "2012年成立,营养功能食品代工市场占有率4.2%位居首位。拥有近135项研发专利和5,000+款个性化产品配方,覆盖体重管理、运动营养、美丽营养、儿童营养、银发营养等主流健康食品市场。服务客户包括汤臣倍健、肌肉科技、WonderLab、良品铺子等明星品牌。拥有HiCollTech、Giant whale-tech、TinyDrops三大核心技术。2025年北交所IPO申请获受理,正在冲刺上市。",
    "highlights": [
      "代工市场占有率第一位",
      "近135项研发专利",
      "5000+产品配方",
      "北交所IPO申请",
      "三大核心技术平台"
    ],
    "advantageDosageForms": [
      "蛋白粉",
      "固体饮料",
      "能量棒",
      "代餐"
    ]
  },
  {
    "id": "dong-e-ejiao",
    "name": "东阿阿胶",
    "nameEn": "Dong-E-E-Jiao Co., Ltd.",
    "region": "domestic",
    "location": "山东省聊城市东阿县",
    "address": "山东省聊城市东阿县阿胶街78号",
    "phone": "0635-3262315 / 0635-7105898",
    "email": "webmaster@dongeejiao.com / duxr@dongeejiao.com",
    "founded": "1952年",
    "employees": "约5,000人",
    "revenue": "约40亿元 (2025年)",
    "stockCode": "000423 (深交所)",
    "factories": "山东东阿(总部+主工厂)、聊城",
    "moq": "阿胶块>=1,000盒; 阿胶浆>=3万瓶; 阿胶糕>=1万盒",
    "priceRange": "阿胶块100-500元/盒; 阿胶浆15-50元/瓶",
    "dosageForms": [
      "阿胶块",
      "口服液(阿胶浆)",
      "阿胶糕",
      "软胶囊",
      "硬胶囊",
      "粉剂",
      "颗粒剂",
      "丸剂"
    ],
    "patents": "阿胶传统制作技艺(国家非遗); 阿胶DNA分子鉴定技术; 多项配方及工艺专利; 复方阿胶浆配方",
    "certifications": [
      "GMP(药品+保健食品)",
      "ISO22000",
      "HACCP",
      "国家非物质文化遗产",
      "有机认证"
    ],
    "clients": "自有品牌(东阿阿胶/复方阿胶浆)、药店系统、健康养生渠道",
    "successCases": [
      {
        "name": "复方阿胶浆年销售超50亿元",
        "url": "https://www.dongeejiao.com/"
      },
      {
        "name": "\"东阿阿胶制作技艺\"入选国家级非物质文化遗产",
        "url": "https://www.dongeejiao.com/"
      }
    ],
    "website": "https://www.dongeejiao.com/",
    "intro": "中国阿胶行业龙头企业,\"东阿阿胶制作技艺\"入选国家级非物质文化遗产。核心产品复方阿胶浆年销售超50亿元。2023年被华润集团控股后加速保健品CDMO转型,具备药品级GMP品质的保健食品OEM能力。拥有阿胶DNA分子鉴定技术确保产品 authenticity,产品覆盖阿胶块、口服液、阿胶糕、胶囊等多种剂型。",
    "highlights": [
      "阿胶行业龙头",
      "国家级非遗技艺",
      "华润集团控股",
      "药品级GMP品质",
      "复方阿胶浆年销50亿+"
    ],
    "advantageDosageForms": [
      "阿胶糕",
      "阿胶口服液",
      "复方阿胶浆"
    ]
  },
  {
    "id": "neptunus-bio",
    "name": "海王生物",
    "nameEn": "Shenzhen Neptunus Bioengineering Co., Ltd.",
    "region": "domestic",
    "location": "广东省深圳市",
    "address": "广东省深圳市南山区科技园海王大厦",
    "phone": "0755-26988888",
    "email": "neptunus@neptunus.com",
    "founded": "1994年",
    "employees": "约8,000人",
    "revenue": "约200亿元 (2025年)",
    "stockCode": "000078 (深交所)",
    "factories": "深圳(总部)、山东、河南、江苏、浙江等10+基地",
    "moq": "片剂>=50万片; 胶囊>=50万粒; 口服液>=5万瓶",
    "priceRange": "片剂0.03-0.20元/片; 口服液3-15元/瓶",
    "dosageForms": [
      "片剂",
      "硬胶囊",
      "软胶囊",
      "口服液",
      "粉剂",
      "颗粒剂",
      "注射剂",
      "丸剂"
    ],
    "patents": "海王金樽解酒配方; 多项维生素及中药配方专利; 银杏叶片配方专利",
    "certifications": [
      "GMP",
      "ISO22000",
      "HACCP",
      "FDA注册",
      "连续六年入围财富中国500强"
    ],
    "clients": "自有品牌(海王金樽/海王银杏叶片)、连锁药店、电商平台",
    "successCases": [
      {
        "name": "连续六年入围《财富》中国500强",
        "url": "https://baike.baidu.com/item/%E6%B7%B1%E5%9C%B3%E5%B8%82%E6%B5%B7%E7%8E%8B%E7%94%9F%E7%89%A9%E5%B7%A5%E7%A8%8B%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/9370136"
      },
      {
        "name": "海王金樽 - 知名解酒护肝品牌",
        "url": "https://www.neptunus.com/"
      }
    ],
    "website": "https://www.neptunus.com/",
    "intro": "中国医药流通龙头企业之一,海王集团旗下核心企业,1998年在深交所上市。业务涵盖医药研发、生产及商业流通,自2020年起连续六年入围《财富》中国500强。保健食品拥有\"海王金樽\"\"海王银杏叶片\"等知名品牌,具备从原料采购到制剂生产的完整供应链和OEM代工能力。",
    "highlights": [
      "医药流通龙头",
      "连续六年财富中国500强",
      "海王金樽知名品牌",
      "10+生产基地",
      "完整供应链整合"
    ],
    "advantageDosageForms": [
      "片剂",
      "硬胶囊",
      "软胶囊"
    ]
  },
  {
    "id": "novarex-oem",
    "name": "石药创新(原新诺威)",
    "nameEn": "Shijiazhuang NovaBio Pharmaceutical Co., Ltd. (XNW Pharma)",
    "region": "domestic",
    "location": "河北省石家庄市",
    "address": "河北省石家庄市栾城区富强西路36号",
    "phone": "0311-85408926 / 0311-85408700",
    "email": "xinnuowei@mail.ecspc.com",
    "founded": "2006年",
    "employees": "约1,200人",
    "revenue": "约10亿元 (2025年)",
    "stockCode": "300765 (深交所创业板)",
    "factories": "石家庄(总部+主工厂)、美国(子公司)",
    "moq": "咖啡因原料>=100kg; 保健食品>=3万瓶",
    "priceRange": "咖啡因原料约80-200元/kg; 终端产品定价灵活",
    "dosageForms": [
      "片剂",
      "硬胶囊",
      "软胶囊",
      "粉剂",
      "颗粒剂",
      "咖啡因原料",
      "功能饮料添加剂",
      "黄嘌呤衍生物"
    ],
    "patents": "咖啡因绿色合成工艺; 功能食品配方; 多项生产工艺专利; 河北省黄嘌呤及其衍生物工程实验室",
    "certifications": [
      "GMP",
      "FDA",
      "cGMP",
      "ISO22000",
      "HACCP",
      "高新技术企业",
      "河北省企业技术中心"
    ],
    "clients": "全球功能饮料品牌、保健品品牌、食品饮料企业",
    "successCases": [
      {
        "name": "石药创新制药(原新诺威) - 高新技术企业",
        "url": "https://www.xnwpharma.net/about/index.html"
      },
      {
        "name": "咖啡因出口量全国第一",
        "url": "https://www.chemicalbook.com/ContactUs_1525512.htm"
      }
    ],
    "website": "https://www.xnwpharma.net/",
    "intro": "全球最大的合成咖啡因生产商之一,石药集团旗下(2023年更名为石药创新),咖啡因出口量全国第一。保健食品业务涵盖咖啡因原料供应和终端功能食品代工。产品广泛用于功能饮料、膳食补充剂等领域,70%以上出口海外。拥有河北省黄嘌呤及其衍生物工程实验室和河北省企业技术中心,建立了完善的质量监督和质量保证体系。2023年通过增资控股巨石生物切入生物制药领域,形成双主业格局。",
    "highlights": [
      "全球最大咖啡因生产商之一",
      "咖啡因出口全国第一",
      "创业板上市",
      "70%+出口海外",
      "石药集团旗下"
    ],
    "advantageDosageForms": [
      "功能饮料",
      "片剂",
      "颗粒"
    ]
  },
  {
    "id": "by-health-oem",
    "name": "汤臣倍健透明工厂",
    "nameEn": "By-Health Transparent Factory",
    "region": "domestic",
    "location": "广东省珠海市金湾区",
    "address": "透明工厂:广东省珠海市金湾区三灶镇星汉路19号; 广州办公:广州市黄埔区黄埔大道东916号",
    "phone": "400-916-916 / 020-28956666",
    "email": "tcbj@by-health.com",
    "founded": "透明工厂2012年开放",
    "employees": "集团超3,000人",
    "revenue": "62.65亿元 (2025年集团)",
    "stockCode": "300146 (深交所创业板)",
    "factories": "广东珠海(透明工厂)、广东广州、江苏",
    "moq": "OEM业务通常>=10万瓶/批次",
    "priceRange": "软胶囊0.30-2.00元/粒; 片剂0.10-0.80元/片",
    "dosageForms": [
      "软胶囊",
      "片剂",
      "粉剂",
      "硬胶囊",
      "口服液",
      "营养品礼盒",
      "软糖",
      "益生菌",
      "运动营养食品"
    ],
    "patents": "全球原料追溯系统; WMS/MES/防伪追踪系统; 多种营养品配方及工艺; Life-Space益生菌技术",
    "certifications": [
      "保健食品GMP",
      "澳TGA GMP",
      "CNAS检测中心",
      "ISO22000",
      "HACCP",
      "工信部智能制造示范工厂"
    ],
    "clients": "自有品牌(By-Health/Life-Space); 部分OEM客户; TEAM CHINA中国国家队合作",
    "successCases": [
      {
        "name": "TEAM CHINA中国国家队运动食品及营养品供应商",
        "url": "https://www.by-health.com/"
      },
      {
        "name": "工信部智能制造示范工厂 - 全国唯一入选VDS企业",
        "url": "https://www.by-health.com/"
      },
      {
        "name": "投资者关系 - 汤臣倍健",
        "url": "https://www.by-health.com/about-services/"
      }
    ],
    "website": "https://www.by-health.com/",
    "intro": "中国VDS(膳食营养补充剂)行业第一品牌,2012年建成行业首个\"透明工厂\"。2022年入选工信部\"智能制造示范工厂\",全国唯一入选的VDS智能制造示范工厂,累计接待超178万人次参观。2021年成为TEAM CHINA中国国家队运动食品及营养品供应商。拥有全球原料追溯系统和CNAS检测中心,旗下拥有By-Health和Life-Space等品牌。",
    "highlights": [
      "VDS行业第一品牌",
      "工信部智能制造示范工厂",
      "TEAM CHINA中国国家队供应商",
      "澳TGA GMP认证",
      "178万+参观人次"
    ],
    "advantageDosageForms": [
      "片剂",
      "硬胶囊",
      "营养软糖",
      "粉剂"
    ]
  },
  {
    "id": "seiloch-health",
    "name": "西乐健康",
    "nameEn": "Seiloch Health Tech Co., Ltd.",
    "region": "domestic",
    "location": "广东省广州市",
    "address": "广州市白云区友谊路6号八一科技产业园二期D6号",
    "phone": "020-84121628",
    "email": "842774578@qq.com",
    "founded": "2016年",
    "employees": "少于50人",
    "revenue": "未公开",
    "factories": "广州白云区八一科技产业园生产基地, 10万级净化车间, 健康功能条棒/固体饮料/液体饮料/压片糖果生产线",
    "moq": "条棒≥5万支; 固体饮料≥1万盒; 液体饮料≥3万瓶; 压片糖果≥10万片",
    "priceRange": "条棒1.0-3.0元/支; 固体饮料0.5-2.0元/袋; 饮品2.0-5.0元/瓶; 压片糖果0.08-0.25元/片",
    "dosageForms": [
      "健康功能条棒",
      "固体饮料",
      "液体饮料",
      "压片糖果",
      "代餐粉",
      "蛋白棒",
      "能量棒",
      "益生菌粉",
      "酵素饮品",
      "软包装饮料",
      "代餐奶昔",
      "果冻"
    ],
    "patents": "3项发明专利: 复方益生菌代餐食品(CN115191605A)、金柚幼果膳食纤维蛋白棒(CN113491338A)、复合风味酒精奶茶固体饮料(CN112868799A); 26项商标; 参与起草3项团体标准",
    "certifications": [
      "GMP(10万级净化车间)",
      "HACCP",
      "高新技术企业",
      "科技型中小企业",
      "A级纳税人",
      "ISO22000"
    ],
    "clients": "完美中国、美国如新(NuSkin)、汤臣倍健、杜邦(DuPont)、帝斯曼(DSM)、ffit8、KEEP、梦泉时尚集团",
    "successCases": [
      {
        "name": "完美中国 - 战略代工合作伙伴",
        "url": "https://baike.baidu.com/item/%E8%A5%BF%E4%B9%90%E5%81%A5%E5%BA%B7%E7%A7%91%E6%8A%80%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/22062759"
      },
      {
        "name": "参与起草《体重控制人群用代餐食品》团体标准T/CAB 0261-2023",
        "url": "https://baike.baidu.com/item/%E8%A5%BF%E4%B9%90%E5%81%A5%E5%BA%B7%E7%A7%91%E6%8A%80%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/22062759"
      },
      {
        "name": "与轻工食品学院签署火龙果新产品研发成果转化协议(2024)",
        "url": "https://baike.baidu.com/item/%E8%A5%BF%E4%B9%90%E5%81%A5%E5%BA%B7%E7%A7%91%E6%8A%80%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/22062759"
      }
    ],
    "website": "https://alvin2016.21food.cn/",
    "intro": "高新技术型健康食品生产企业, 注册资本5000万元, 专注于体重控制、运动营养、美容营养三大板块的研发与生产服务。拥有10万级净化车间, 生产基地位于广州白云区八一科技产业园, 运营中心位于海珠区保利世界贸易中心。公司参与起草《体重控制人群用代餐食品》《营养代餐》等多项团体标准, 是广东省食品安全质量协会副会长单位、广东省保健食品行业协会理事单位。",
    "highlights": [
      "高新技术企业",
      "体重控制/运动营养/美容营养三大板块",
      "参与起草3项团体标准",
      "完美中国/汤臣倍健/DSM战略合作",
      "广东省食品安全质量协会副会长单位"
    ],
    "advantageDosageForms": [
      "软胶囊",
      "片剂",
      "粉剂"
    ]
  },
  {
    "id": "chunyuan-health",
    "name": "纯元健康",
    "nameEn": "Chunyuan Health Technology (Guangdong) Co., Ltd.",
    "region": "domestic",
    "location": "广东省广州市/肇庆市",
    "address": "广州市南沙区大岗镇花上路1号(南沙厂区) / 肇庆市鼎湖区桂城宝鼎路155号(肇庆厂区)",
    "phone": "0758-2692757 / 15975629898",
    "email": "1152544115@qq.com",
    "founded": "2019年",
    "employees": "约100-150人",
    "revenue": "未公开",
    "factories": "两大厂区共100000㎡: 广州南沙20000㎡ + 肇庆鼎湖80000㎡; 拥有中国首台·亚洲第二台BFS三合一无菌灌装系统",
    "moq": "片剂≥5万片; 粉剂≥5000盒; 果冻≥1万支; 饮品≥5000瓶; 代餐≥3000盒",
    "priceRange": "片剂0.08-0.30元/片; 粉剂0.50-2.00元/袋; 果冻1.5-5.0元/支; 饮品2.0-6.0元/瓶; 代餐粉3.0-8.0元/袋",
    "dosageForms": [
      "片剂",
      "粉剂",
      "果冻",
      "勺蜜",
      "PP瓶饮品",
      "玻璃瓶饮品",
      "植物提取",
      "代餐粉",
      "酵素饮品",
      "胶原蛋白饮品",
      "蛋白粉",
      "固体饮料",
      "压片糖果",
      "口服液",
      "袋装饮品",
      "BFS无菌灌装"
    ],
    "patents": "50项商标; 12项资质证书; 拥有SUGAR INTAKE SUBSTITUTE LAB代糖实验室; 世界生命科学研究中心合作转化基地",
    "certifications": [
      "HACCP",
      "ISO22000",
      "FDA注册",
      "GMP标准",
      "高新技术企业(肇庆)",
      "科技型中小企业(2025)",
      "SC食品生产许可",
      "保健食品生产许可"
    ],
    "clients": "超2000家品牌合作; 覆盖口服美容、体重管理、益生菌与肠道健康、养生滋补、女性私密、蓝帽子保健品等大健康领域",
    "successCases": [
      {
        "name": "2000+品牌深度赋能合作 - OEM/ODM一站式解决方案",
        "url": "https://www.globaloem.cn/com/chunyuan/introduce/"
      },
      {
        "name": "中国首台·亚洲第二台BFS三合一无菌灌装系统",
        "url": "https://www.globaloem.cn/com/chunyuan/"
      },
      {
        "name": "世界生命科学研究中心合作科研转化基地",
        "url": "https://www.foodtalks.cn/wefood/post/56939"
      }
    ],
    "website": "http://www.chunyuan-health.com/",
    "intro": "中国功能性食品/保健品/特殊营养膳食OEM/ODM代工厂, 由20000㎡广州南沙厂区和80000㎡肇庆鼎湖厂区组成, 总生产面积达10万㎡。全面覆盖口服美容、体重管理、益生菌与肠道健康、养生滋补等口服大健康领域。拥有中国首台·亚洲第二台BFS三合一无菌灌装系统, 架设植物提取、PP瓶、玻璃瓶、片剂、粉剂、果冻、勺蜜等多条生产线, 是产品剂型品类全面的功能性食品生产企业。",
    "highlights": [
      "10万㎡超级工厂(广州+肇庆)",
      "中国首台亚洲第二台BFS无菌灌装",
      "2000+品牌合作",
      "HACCP+ISO22000+FDA认证",
      "覆盖6大口服大健康领域"
    ],
    "advantageDosageForms": [
      "营养软糖",
      "饮品",
      "固体饮料"
    ]
  },
  {
    "id": "braveiy",
    "name": "柏维力",
    "nameEn": "Braveiy Biotechnology (Anhui) Co., Ltd.",
    "region": "domestic",
    "location": "安徽省宣城市郎溪县",
    "address": "安徽省宣城市郎溪县十字经济开发区立宇大道18号",
    "phone": "400-803-0393",
    "email": "info@braveiy.com",
    "founded": "2011年",
    "employees": "373人(2023年)",
    "revenue": "4.39亿元(2023年)",
    "stockCode": "曾挂牌新三板(873967)",
    "factories": "安徽宣城郎溪生产基地(76亩), 数智一体化透明工厂, 8000+㎡GMP车间; 2024年融入欧洲Ourvita集团, 全球8大生产基地",
    "moq": "片剂≥10万片; 软胶囊≥5万粒; 硬胶囊≥5万粒; 粉剂≥5000盒; 饮品≥5000瓶",
    "priceRange": "片剂0.06-0.25元/片; 软胶囊0.20-0.60元/粒; 硬胶囊0.12-0.40元/粒; 粉剂0.80-3.00元/袋; 饮品1.5-5.0元/瓶",
    "dosageForms": [
      "片剂",
      "软胶囊",
      "硬胶囊",
      "粉剂",
      "颗粒剂",
      "管装饮品",
      "泡腾片",
      "凝胶糖果",
      "小Q瓶饮品",
      "维生素气泡含片",
      "跳跳糖直饮粉",
      "钙锌液态饮",
      "袋装饮品"
    ],
    "patents": "118项专利; 480项商标; 200+保健食品批文; 2500+成熟配方; 省级企业技术中心; 博士后科研工作站",
    "certifications": [
      "BRCGS",
      "NSF",
      "ISO22000",
      "ISO9001",
      "ISO14001",
      "ISO45001",
      "HACCP",
      "AEO海关高级认证",
      "FDA注册",
      "欧盟动物源性注册",
      "国家\"三同\"认证",
      "国家级绿色工厂",
      "食安安徽品牌认证",
      "国家高新技术企业",
      "CNAS国家实验室"
    ],
    "clients": "产品30%出口至欧美等60+国家和地区, 70%国内销售; 大型品牌药企、KA零售连锁、电商新零售品牌、运动营养专业品牌、直销品牌、国际知名保健食品品牌",
    "successCases": [
      {
        "name": "2021中国食品代工企业百强榜第25位 - FoodTalks",
        "url": "https://www.foodtalks.cn/news/8183"
      },
      {
        "name": "小Q瓶璀璨精华饮品 - 品类创新明星产品",
        "url": "https://www.braveiy.com/cn/health.html"
      },
      {
        "name": "2024年融入欧洲Ourvita集团,全球8大基地协同",
        "url": "https://www.foodtalks.cn/company/braveiy"
      },
      {
        "name": "150+保健食品批文,2500+成熟配方 - 产品中心",
        "url": "https://www.braveiy.com/cn/health.html"
      }
    ],
    "website": "https://www.braveiy.com/",
    "intro": "柏维力(Braveiy)创立于2006年(公司成立于2011年), 是具有国际竞争力的营养健康产品智造服务商。2024年融入欧洲Ourvita集团, 全球8大生产基地协同链接, 业务覆盖膳食营养、化妆品与医药三大版图。工厂占地76亩, 拥有数智一体化透明工厂、CNAS国家实验室和两大研发中心, 年产片剂12亿片/软胶囊10亿粒/硬胶囊7.5亿粒/粉剂2000吨。先后推出小Q瓶、维生素气泡含片、跳跳糖直饮粉、钙锌液态饮等创新剂型, 荣获长三角营养保健行业示范工厂奖。",
    "highlights": [
      "全球8大基地(Ourvita集团)",
      "年产超40亿粒/片",
      "150+保健食品批文",
      "CNAS国家实验室",
      "BRCGS+NSF+FDA认证",
      "长三角营养保健行业示范工厂"
    ],
    "advantageDosageForms": [
      "软胶囊",
      "营养软糖",
      "片剂"
    ]
  },
  {
    "id": "shengmei-pharma",
    "name": "广州盛美药业",
    "nameEn": "Guangzhou Shengmei Pharmaceutical Co., Ltd.",
    "region": "domestic",
    "location": "广州市花都区",
    "address": "广州市花都区大布路13号1栋101室（部位：901厂房）",
    "phone": "020-8681 6888",
    "email": "sales@shengmei-health.com",
    "founded": "2017",
    "employees": "269",
    "revenue": "年产值5000万+",
    "factories": "广州花都区生产基地20,000m² + 白云区钟落潭研发办公2,000m²",
    "moq": "500件/起",
    "priceRange": "软糖类 ¥2.9-15/件, 口服液 ¥5-20/瓶, 果冻 ¥3-12/杯",
    "dosageForms": [
      "软糖",
      "口服液",
      "果冻",
      "固体饮料/粉剂",
      "片剂",
      "茶饮料",
      "压片糖果",
      "代餐粉",
      "酵素粉",
      "凝胶糖果",
      "功能饮料",
      "硬胶囊",
      "软胶囊",
      "颗粒剂",
      "液体条包"
    ],
    "patents": "6项实用新型专利（软糖浇注工艺、口服液灌装、果冻封口等）",
    "certifications": [
      "ISO 9001质量管理体系",
      "食品生产许可证（SC）",
      "保健食品生产许可",
      "HACCP食品安全",
      "ISO 22000食品安全管理体系",
      "CCC认证",
      "出口食品生产企业备案",
      "化妆品生产许可"
    ],
    "clients": "同仁堂、广药集团、轻未来、盈康生命、跨境电商品牌50+、国内KA连锁30+",
    "successCases": [
      {
        "name": "同仁堂软糖系列代工合作 - 1688工厂认证",
        "url": "https://shop02792m0g71y26.1688.com/"
      },
      {
        "name": "功能性跨境定制复合软糖 - 阿里巴巴热品",
        "url": "https://detail.1688.com/offer/1061277345109.html"
      },
      {
        "name": "外贸定制睡眠跨境软糖 - 阿里巴巴",
        "url": "https://detail.1688.com/offer/1059190803572.html"
      },
      {
        "name": "广东盛美健康产业集团 - 企查查",
        "url": "https://www.qcc.com/firm/0f9590816884aed13f4781261bc3b63c.html"
      }
    ],
    "website": "https://shop02792m0g71y26.1688.com/",
    "intro": "广州盛美药业有限公司（原广州市方氏保健食品有限公司）是广东盛美健康产业集团有限公司旗下子公司,成立于2017年8月,是一家致力于功能性食品、膳食营养补充剂等大健康产品研发、生产、销售与委托加工为一体的现代化综合创新型公司。公司创始人及团队具备20多年研发实战经验与丰富行业知识,拥有固体饮料粉剂、口服液、片剂、茶饮料、果冻、软糖等6大类产品的生产能力,定型产品配方工艺多达几百个并不断开发创新。业务涵盖OEM/ODM加工、国内及海外跨境等多个领域,月产值500万以上,生产人数269人,加工设备14台。",
    "highlights": [
      "6大剂型品类全覆盖",
      "软糖品类阿里巴巴热度榜第9名",
      "同仁堂代工合作",
      "20+年配方研发经验",
      "月产值500万+",
      "269人生产团队"
    ],
    "advantageDosageForms": [
      "外用贴剂",
      "软膏",
      "片剂",
      "胶囊"
    ]
  },
  {
    "id": "weihai-ziguang",
    "name": "威海紫光生物科技有限公司",
    "nameEn": "Weihai Ziguang Biotech Co., Ltd.",
    "region": "domestic",
    "location": "山东省威海市",
    "address": "山东省威海市高区初村镇创新路",
    "phone": "0631-5658888",
    "email": "sales@whziguang.com",
    "founded": "2004年",
    "employees": "约1,200人",
    "revenue": "约8亿元（估算）",
    "factories": "山东威海生产基地",
    "moq": "片剂/胶囊>=20万粒; 粉剂>=500kg; 口服液>=1万瓶",
    "priceRange": "片剂0.06-0.25元/片; 粉剂80-200元/kg",
    "dosageForms": [
      "片剂",
      "硬胶囊",
      "软胶囊",
      "粉剂",
      "颗粒",
      "口服液",
      "饮品"
    ],
    "advantageDosageForms": [
      "片剂",
      "硬胶囊",
      "粉剂"
    ],
    "patents": "多项片剂/胶囊制剂工艺专利",
    "certifications": [
      "GMP",
      "ISO9001",
      "HACCP",
      "SC食品生产许可"
    ],
    "clients": "国内保健品品牌、电商平台自有品牌",
    "successCases": [
      {
        "name": "电商平台钙片代工",
        "url": "https://www.whziguang.com"
      }
    ],
    "website": "http://www.whziguang.com/",
    "intro": "威海紫光生物专注于片剂、硬胶囊与粉剂等传统剂型的规模化代工，配备完整固体制剂产线，服务于国内大众保健品与电商自有品牌客户。",
    "highlights": [
      "片剂/胶囊规模代工",
      "固体制剂产线齐全",
      "出口资质完备"
    ]
  },
  {
    "id": "guangdong-evergreen",
    "name": "广东长兴生物科技股份有限公司",
    "nameEn": "Guangdong Evergreen Bio-tech Co., Ltd.",
    "region": "domestic",
    "location": "广东省潮州市",
    "address": "广东省潮州市桥东东山路",
    "phone": "0768-2308888",
    "email": "info@gd-caxin.com",
    "founded": "1995年",
    "employees": "约2,000人",
    "revenue": "约15亿元（估算）",
    "factories": "广东潮州生产基地",
    "moq": "软胶囊>=30万粒; 软糖>=50万粒; 片剂>=20万片",
    "priceRange": "软胶囊0.15-0.70元/粒; 软糖0.25-1.20元/粒",
    "dosageForms": [
      "软胶囊",
      "营养软糖",
      "片剂",
      "硬胶囊",
      "粉剂",
      "口服液"
    ],
    "advantageDosageForms": [
      "软胶囊",
      "营养软糖"
    ],
    "patents": "软胶囊内容物稳定性及软糖成型工艺专利",
    "certifications": [
      "GMP",
      "ISO9001",
      "HACCP",
      "BRC",
      "Kosher",
      "Halal"
    ],
    "clients": "国内营养品牌、跨境电商",
    "successCases": [
      {
        "name": "鱼油软胶囊代工",
        "url": "https://www.gd-caxin.com"
      }
    ],
    "website": "https://www.gd-caxin.com/",
    "intro": "广东长兴（千林品牌母公司）是华南地区老牌营养保健品 OEM/ODM 企业，以软胶囊与营养软糖的规模化制造见长，具备出口级质量体系。",
    "highlights": [
      "软胶囊/软糖规模制造",
      "出口质量体系",
      "华南老牌代工"
    ]
  },
  {
    "id": "ningbo-yujian",
    "name": "宁波玉健健康科技股份有限公司",
    "nameEn": "Ningbo Yujian Health Technology Co., Ltd.",
    "region": "domestic",
    "location": "浙江省宁波市",
    "address": "浙江省宁波市杭州湾新区",
    "phone": "0574-63908888",
    "email": "sales@excarepharm.com",
    "founded": "2009年",
    "employees": "约800人",
    "revenue": "约5亿元（估算）",
    "factories": "浙江宁波生产基地",
    "moq": "粉剂>=300kg; 固体饮料>=5万袋; 口服液>=1万瓶",
    "priceRange": "粉剂100-260元/kg; 固体饮料0.8-2.5元/袋",
    "dosageForms": [
      "粉剂",
      "固体饮料",
      "口服液",
      "片剂",
      "硬胶囊",
      "颗粒"
    ],
    "advantageDosageForms": [
      "粉剂",
      "固体饮料"
    ],
    "patents": "速溶粉体及固体饮料配方工艺专利",
    "certifications": [
      "GMP",
      "ISO9001",
      "HACCP",
      "SC食品生产许可"
    ],
    "clients": "代餐/体重管理品牌、新消费品牌",
    "successCases": [
      {
        "name": "蛋白粉代工",
        "url": "https://www.excarepharm.com"
      }
    ],
    "website": "https://www.excarepharm.com/",
    "intro": "宁波玉健以粉剂与固体饮料的配方开发及代工为核心，擅长代餐、运动营养与新消费品类的柔性制造。",
    "highlights": [
      "粉剂/固体饮料专长",
      "新消费柔性制造",
      "配方开发能力强"
    ]
  },
  {
    "id": "dalian-shuangdi",
    "name": "大连双迪科技股份有限公司",
    "nameEn": "Dalian Shuangdi Technology Co., Ltd.",
    "region": "domestic",
    "location": "辽宁省大连市",
    "address": "辽宁省大连经济技术开发区双D港",
    "phone": "0411-87688888",
    "email": "sales@dl-dd.com",
    "founded": "2005年",
    "employees": "约1,500人",
    "revenue": "约10亿元（估算）",
    "stockCode": "836205 (新三板)",
    "factories": "辽宁大连生产基地",
    "moq": "胶囊>=20万粒; 口服液>=1万瓶; 粉剂>=300kg",
    "priceRange": "胶囊0.08-0.30元/粒; 口服液1.5-4元/瓶",
    "dosageForms": [
      "硬胶囊",
      "软胶囊",
      "口服液",
      "粉剂",
      "片剂"
    ],
    "advantageDosageForms": [
      "硬胶囊",
      "口服液"
    ],
    "patents": "核酸及发酵类健康品制备专利",
    "certifications": [
      "GMP",
      "ISO9001",
      "HACCP"
    ],
    "clients": "功能保健品牌、直销体系",
    "successCases": [
      {
        "name": "口服液代工",
        "url": "https://www.dl-dd.com"
      }
    ],
    "website": "https://www.dl-dd.com/",
    "intro": "大连双迪依托核酸与发酵技术平台，提供硬胶囊、口服液等剂型的研发与代工，覆盖功能保健与直销渠道客户。",
    "highlights": [
      "核酸/发酵技术平台",
      "口服液代工",
      "直销渠道经验"
    ]
  },
  {
    "id": "shanghai-grapeking",
    "name": "上海葡萄王企业有限公司",
    "nameEn": "Shanghai Grape King Enterprise Co., Ltd.",
    "region": "domestic",
    "location": "上海市",
    "address": "上海市松江区佘山工业园",
    "phone": "021-57798888",
    "email": "sales@grapeking.com",
    "founded": "1994年",
    "employees": "约1,000人",
    "revenue": "约6亿元（估算）",
    "factories": "上海松江生产基地",
    "moq": "粉剂>=300kg; 片剂>=20万片; 口服液>=1万瓶",
    "priceRange": "粉剂120-280元/kg; 片剂0.07-0.25元/片",
    "dosageForms": [
      "粉剂",
      "片剂",
      "硬胶囊",
      "口服液",
      "发酵饮品"
    ],
    "advantageDosageForms": [
      "发酵饮品",
      "粉剂"
    ],
    "patents": "菌丝体培养及发酵饮品工艺专利",
    "certifications": [
      "GMP",
      "ISO9001",
      "HACCP",
      "有机认证"
    ],
    "clients": "真菌多糖类品牌、养生品牌",
    "successCases": [
      {
        "name": "灵芝菌丝体粉代工",
        "url": "https://www.grapeking.com"
      }
    ],
    "website": "https://www.grapeking.com.tw",
    "intro": "上海葡萄王以真菌培养与发酵技术见长，专注灵芝、虫草等菌丝体粉剂与发酵饮品的代工，是食用菌健康品领域的老牌企业。",
    "highlights": [
      "真菌/菌丝体发酵",
      "灵芝虫草专长",
      "养生品类代工"
    ]
  },
  {
    "id": "shandong-yuwang",
    "name": "山东禹王制药有限公司",
    "nameEn": "Shandong Yuwang Pharmaceutical Co., Ltd.",
    "region": "domestic",
    "location": "山东省德州市",
    "address": "山东省德州市经济开发区禹王街",
    "phone": "0534-2188888",
    "email": "sales@yuwang.com",
    "founded": "1989年",
    "employees": "约3,000人",
    "revenue": "约20亿元（估算）",
    "factories": "山东德州生产基地",
    "moq": "软胶囊>=50万粒; 鱼油>=1吨",
    "priceRange": "软胶囊0.12-0.50元/粒; 鱼油原料面议",
    "dosageForms": [
      "软胶囊",
      "鱼油",
      "片剂",
      "硬胶囊",
      "粉剂"
    ],
    "advantageDosageForms": [
      "软胶囊",
      "鱼油"
    ],
    "patents": "鱼油精制及软胶囊包埋工艺专利",
    "certifications": [
      "GMP",
      "ISO9001",
      "HACCP",
      "GOED"
    ],
    "clients": "鱼油/心脑健康品牌",
    "successCases": [
      {
        "name": "深海鱼油软胶囊代工",
        "url": "https://www.yuwang.com"
      }
    ],
    "website": "https://www.yuwangpharma.com/",
    "intro": "山东禹王以大豆蛋白与鱼油精制为核心，软胶囊与鱼油制剂代工能力突出，长期服务于心脑健康与血脂管理品类。",
    "highlights": [
      "鱼油精制能力",
      "软胶囊包埋",
      "大豆蛋白产业链"
    ]
  },
  {
    "id": "zhongshan-meitai",
    "name": "中山市美太保健制品有限公司",
    "nameEn": "Zhongshan Meitai Health Products Co., Ltd.",
    "region": "domestic",
    "location": "广东省中山市",
    "address": "广东省中山市南头镇",
    "phone": "0760-23188888",
    "email": "sales@meitai.com",
    "founded": "2003年",
    "employees": "约900人",
    "revenue": "约5亿元（估算）",
    "factories": "广东中山生产基地",
    "moq": "软糖>=50万粒; 片剂>=20万片; 粉剂>=300kg",
    "priceRange": "软糖0.22-1.10元/粒; 片剂0.06-0.22元/片",
    "dosageForms": [
      "营养软糖",
      "片剂",
      "硬胶囊",
      "粉剂",
      "口服液"
    ],
    "advantageDosageForms": [
      "营养软糖",
      "片剂"
    ],
    "patents": "软糖成型及营养保留工艺专利",
    "certifications": [
      "GMP",
      "ISO9001",
      "HACCP",
      "BRC"
    ],
    "clients": "儿童营养品牌、电商自有品牌",
    "successCases": [
      {
        "name": "儿童软糖代工",
        "url": "https://www.meitai.com"
      }
    ],
    "website": "http://www.meitaifood.com/",
    "intro": "中山美太以营养软糖与片剂的规模化代工为特色，擅长儿童营养与便捷剂型，具备出口级质量体系。",
    "highlights": [
      "营养软糖规模代工",
      "儿童剂型经验",
      "出口质量体系"
    ]
  },
  {
    "id": "jiangxi-renhe",
    "name": "江西仁和药业有限公司",
    "nameEn": "Jiangxi Renhe Pharmaceutical Co., Ltd.",
    "region": "domestic",
    "location": "江西省宜春市",
    "address": "江西省宜春市袁州区医药工业园",
    "phone": "0795-3588888",
    "email": "oem@renhe.com",
    "founded": "2001年",
    "employees": "约5,000人",
    "revenue": "约40亿元（估算）",
    "stockCode": "000650 (深交所)",
    "factories": "江西宜春生产基地",
    "moq": "片剂>=30万片; 胶囊>=30万粒; 颗粒>=5万袋",
    "priceRange": "片剂0.05-0.20元/片; 胶囊0.06-0.22元/粒",
    "dosageForms": [
      "片剂",
      "硬胶囊",
      "颗粒",
      "口服液",
      "软胶囊"
    ],
    "advantageDosageForms": [
      "片剂",
      "硬胶囊",
      "颗粒"
    ],
    "patents": "中成药制剂及保健品配方工艺专利",
    "certifications": [
      "GMP",
      "ISO9001",
      "HACCP"
    ],
    "clients": "OTC/大健康品牌、连锁药房",
    "successCases": [
      {
        "name": "保健品片剂代工",
        "url": "https://www.renhe.com"
      }
    ],
    "website": "http://www.renhels.com/",
    "intro": "江西仁和是大型医药大健康企业，具备片剂、硬胶囊、颗粒等固体制剂的强势产能，承接 OTC 与大健康品类代工。",
    "highlights": [
      "固体制剂强势产能",
      "OTC/大健康代工",
      "连锁渠道资源"
    ]
  },
  {
    "id": "tishcon",
    "name": "Tishcon Corporation",
    "nameEn": "Tishcon Corporation",
    "region": "international",
    "location": "美国纽约州Westbury",
    "address": "30 New York Ave, Westbury, NY 11590, USA",
    "phone": "+1 (516) 333-3050 / Toll Free: +1 (800) 848-8442",
    "email": "raj@tishcon.com",
    "founded": "1976年",
    "employees": "约150人",
    "revenue": "私有公司未公开",
    "factories": "纽约州Westbury(总部+主工厂); 马里兰州Salisbury; 马里兰州卫星实验室",
    "moq": "软胶囊>=5万粒; 片剂/胶囊>=10万粒",
    "priceRange": "软胶囊约$0.10-0.50/粒",
    "dosageForms": [
      "软胶囊",
      "片剂",
      "硬胶囊",
      "粉剂",
      "液体",
      "Q-Gel水溶性辅酶Q10软胶囊"
    ],
    "patents": "Q-Gel水溶性辅酶Q10配方; BioSoluble技术; 多种配方和制造工艺(私有)",
    "certifications": [
      "cGMP",
      "NSF",
      "UL",
      "FDA注册"
    ],
    "clients": "美国本土品牌、跨境品牌商、Q-Gel品牌授权客户",
    "successCases": [
      {
        "name": "Q-Gel水溶性辅酶Q10 - 旗舰产品",
        "url": "https://www.tishcon.com/"
      },
      {
        "name": "联系我们",
        "url": "https://www.tishcon.com/contact-us/"
      }
    ],
    "website": "https://www.tishcon.com/",
    "intro": "1976年创立,BIPOC(少数族裔)拥有的膳食补充剂代工厂。在纽约和马里兰拥有cGMP认证工厂,通过NSF和UL认证。约50年行业经验,产品全内部生产(in-house manufacturing)。旗舰产品Q-Gel水溶性辅酶Q10采用专利BioSoluble技术,显著提高脂溶性营养素的生物利用度。",
    "highlights": [
      "50年行业经验",
      "NSF+UL双认证",
      "全内部生产",
      "Q-Gel水溶性辅酶Q10专利",
      "BIPOC企业"
    ],
    "advantageDosageForms": [
      "液体软胶囊",
      "软胶囊",
      "口服薄膜"
    ]
  },
  {
    "id": "captek",
    "name": "CAPTEK Softgel",
    "nameEn": "CAPTEK Softgel International, Inc.",
    "region": "international",
    "location": "美国加利福尼亚州La Mirada",
    "address": "14535 Industry Circle, La Mirada, California 90638, USA",
    "phone": "+1 (800) 638-6883 / +1 (562) 921-9511",
    "email": "sales@capteksoftgel.com",
    "founded": "1996年",
    "employees": "约200-300人",
    "revenue": "未公开",
    "factories": "美国加州La Mirada(主工厂); 2024年新增软糖生产线",
    "moq": "软胶囊>=5万粒; 软糖>=3万粒",
    "priceRange": "软胶囊约$0.10-0.50/粒",
    "dosageForms": [
      "软胶囊(核心)",
      "软糖(2024年新增)",
      "片剂",
      "硬胶囊",
      "瓶装包装"
    ],
    "patents": "4,000+种软胶囊配方(累计研发); 复杂封装技术; 自动化生产线",
    "certifications": [
      "FDA注册",
      "cGMP",
      "GMP"
    ],
    "clients": "美国本土品牌、跨境品牌、健康营养补充剂行业品牌",
    "successCases": [
      {
        "name": "联系我们 - CAPTEK Softgel",
        "url": "https://capteksoftgel.com/contact/"
      },
      {
        "name": "4,000+种软胶囊配方 - 1200+活跃产品",
        "url": "https://capteksoftgel.com/"
      }
    ],
    "website": "https://capteksoftgel.com/",
    "intro": "1996年成立,私营、FDA注册和审计的GMP认证全方位CMO。累计研发4000+种软胶囊配方,年生产约1200种活跃产品。以解决复杂封装挑战闻名,为健康和营养补充剂行业提供高质量软胶囊制造服务。2024年新增软糖生产线,扩展软糖补充剂制造能力。",
    "highlights": [
      "4000+软胶囊配方",
      "2024年新增软糖线",
      "FDA GMP审计",
      "1200+活跃产品",
      "复杂封装专家"
    ],
    "advantageDosageForms": [
      "软胶囊",
      "液体软胶囊"
    ]
  },
  {
    "id": "lallemand",
    "name": "Lallemand Health",
    "nameEn": "Lallemand Health Solutions",
    "region": "international",
    "location": "加拿大蒙特利尔(总部); 法国Saint-Simon(制药级工厂)",
    "address": "1620 rue Prefontaine, Montreal, QC, H1W 2N8, Canada",
    "phone": "+1 (514) 522-2133",
    "email": "info@lallemand.com",
    "founded": "集团19世纪末; 益生菌业务30+年",
    "employees": "集团超4,500人; Health Solutions约500+人",
    "revenue": "私有未公开",
    "factories": "加拿大Mirabel(Harmonium 2新厂); 法国Saint-Simon(制药级)",
    "moq": "益生菌原料按公斤级起订; 终端产品按需定制",
    "priceRange": "益生菌原料约$50-500/公斤",
    "dosageForms": [
      "益生菌粉",
      "益生菌胶囊",
      "益生菌片剂",
      "S. boulardii酵母菌",
      "矿物质/维生素强化酵母",
      "液体益生菌",
      "益生菌微胶囊"
    ],
    "patents": "Probiocap/Expert'Biome CDMO平台; 数十种专利菌株; Harmonium 2益生菌工厂; Laprobio益生菌技术",
    "certifications": [
      "GMP",
      "HACCP",
      "ISO22000",
      "Halal",
      "Kosher",
      "DMF",
      "药品级GMP(法国工厂)"
    ],
    "clients": "全球营养品品牌、药品公司、功能性食品品牌",
    "successCases": [
      {
        "name": "90年益生菌行业经验 - 全球领导者",
        "url": "https://lallemand-health-solutions.com/en/"
      },
      {
        "name": "Harmonium 2新益生菌厂 - 2023年建成",
        "url": "https://lallemand-health-solutions.com/en/"
      },
      {
        "name": "联系我们",
        "url": "https://lallemand-health-solutions.com/en/contact-us/"
      }
    ],
    "website": "https://lallemand-health-solutions.com/",
    "intro": "全球益生菌行业领导者,垂直整合的益生菌制造商,90+年专业经验。2023年建成Harmonium 2新益生菌厂。法国工厂生产药品级益生菌,服务益生菌补充剂、功能性食品和Live Biotherapeutic Products(LBPs)。拥有Probiocap微胶囊技术和Expert'Biome CDMO平台,数十种专利菌株服务于全球营养品和药品公司。",
    "highlights": [
      "益生菌全球领导者",
      "90+年经验",
      "Harmonium 2新厂",
      "药品级生产",
      "Probiocap微胶囊技术"
    ],
    "advantageDosageForms": [
      "益生菌粉",
      "益生菌胶囊",
      "后生元"
    ]
  },
  {
    "id": "catalent",
    "name": "Catalent",
    "nameEn": "Catalent, Inc.",
    "region": "international",
    "location": "美国新泽西州Somerset",
    "address": "14 Schoolhouse Road, Somerset, NJ 08873, USA",
    "phone": "+1 (888) 765-8846 / +1 (732) 537-6200",
    "email": "solutions@catalent.com",
    "founded": "2007年(从Cardinal Health分拆)",
    "employees": "约10,000+人(全球)",
    "revenue": "数十亿美元(全球CDMO Top 5)",
    "factories": "美国佛罗里达St. Petersburg(50万平方英尺,年产180亿粒); 北美/欧洲/亚洲多个基地",
    "moq": "软胶囊通常>=5万粒; 工业级大批量",
    "priceRange": "软胶囊约$0.15-0.80/粒",
    "dosageForms": [
      "软胶囊(核心,年产180亿粒)",
      "片剂",
      "硬胶囊",
      "液体",
      "口服液",
      "粉剂",
      "注射剂",
      "生物制品"
    ],
    "patents": "软胶囊技术平台; OptiShellR; VersafilmR; RxSpell口服固体制剂; 多项制剂专利",
    "certifications": [
      "cGMP",
      "FDA",
      "EMA",
      "ISO",
      "HACCP"
    ],
    "clients": "全球制药/营养品Top品牌商",
    "successCases": [
      {
        "name": "年产180亿粒软胶囊 - 全球最大软胶囊工厂",
        "url": "https://www.catalent.com/"
      },
      {
        "name": "2024年被Novo Holdings 166亿美元收购",
        "url": "https://www.catalent.com/"
      }
    ],
    "website": "https://www.catalent.com/",
    "intro": "全球领先CDMO,2007年从Cardinal Health分拆。St. Petersburg年产180亿粒软胶囊,是全球最大的软胶囊生产基地。2024年被Novo Holdings以166亿美元收购。业务覆盖药品、营养补充剂、消费品、美妆等。拥有OptiShellR和VersafilmR等专利软胶囊技术平台,服务全球制药和营养品Top品牌商。",
    "highlights": [
      "年产180亿粒软胶囊",
      "全球CDMO Top 5",
      "被Novo Holdings 166亿美元收购",
      "FDA+EMA双认证",
      "OptiShellR专利技术"
    ],
    "advantageDosageForms": [
      "软胶囊",
      "口服固体制剂",
      "生物制剂"
    ]
  },
  {
    "id": "robinson-pharma",
    "name": "Robinson Pharma",
    "nameEn": "Robinson Pharma, Inc.",
    "region": "international",
    "location": "美国加利福尼亚州Santa Ana",
    "address": "3330 South Harbor Blvd, Santa Ana, California 92704, USA",
    "phone": "+1 (714) 241-0235",
    "email": "info@robinsonpharma.com",
    "founded": "1987年",
    "employees": "约240人",
    "revenue": "约3亿美元(估算)",
    "factories": "美国加州Santa Ana(主工厂); 持续扩产中",
    "moq": "软胶囊>=5万粒",
    "priceRange": "软胶囊约$0.08-0.40/粒",
    "dosageForms": [
      "软胶囊(核心,美国最大)",
      "片剂",
      "硬胶囊",
      "软糖",
      "粉剂",
      "液体"
    ],
    "patents": "软胶囊制造工艺; 自动化生产线; 高速液体生产线(2025年新增)",
    "certifications": [
      "cGMP",
      "FDA",
      "UL"
    ],
    "clients": "美国本土品牌、私有品牌、跨境品牌",
    "successCases": [
      {
        "name": "联系我们 - Robinson Pharma",
        "url": "https://www.robinsonpharma.com/contact-us/"
      },
      {
        "name": "2025年新增高速液体生产线",
        "url": "https://www.robinsonpharma.com/"
      }
    ],
    "website": "https://www.robinsonpharma.com/",
    "intro": "美国最大软胶囊制造商,全方位合同制造商。2025年12月新增高速液体生产线及多剂型产能。业务涵盖软胶囊、片剂、硬胶囊、软糖、粉剂、液体,服务膳食补充剂和个人健康护理行业。24小时运营,提供从配方到包装的端到端制造解决方案。",
    "highlights": [
      "美国最大软胶囊制造商",
      "新高速液体产线",
      "全剂型覆盖",
      "cGMP+FDA+UL三认证",
      "24小时运营"
    ],
    "advantageDosageForms": [
      "片剂",
      "硬胶囊",
      "营养软糖"
    ]
  },
  {
    "id": "lonza",
    "name": "Lonza Capsules & Health",
    "nameEn": "Lonza Group AG - Capsules & Health Ingredients",
    "region": "international",
    "location": "瑞士巴塞尔(总部); 全球35+国家",
    "address": "Muenchensteinerstrasse 38, 4002 Basel, Switzerland",
    "phone": "+41 61 316 81 11",
    "email": "contact@lonza.com",
    "founded": "1897年",
    "employees": "约18,000人(集团)",
    "revenue": "约60亿瑞士法郎(集团,2025年)",
    "factories": "全球35+国家,主要: 瑞士、美国、英国、比利时、法国、中国(苏州)、印度、日本等",
    "moq": "胶囊>=100万粒; 营养素原料按吨级起订",
    "priceRange": "胶囊约$0.01-0.03/粒; 营养素原料$50-500/kg",
    "dosageForms": [
      "硬胶囊(Capsugel品牌)",
      "软胶囊",
      "片剂",
      "益生菌(Probi品牌)",
      "营养素原料(UC-II/Niacin/左旋肉碱等)",
      "粉剂",
      "液体"
    ],
    "patents": "UC-II非变性II型胶原蛋白; Carnipure左旋肉碱; ResistAid阿拉伯木聚糖; Probi益生菌菌株; Capsugel植物胶囊VcapsPlus",
    "certifications": [
      "cGMP",
      "FDA",
      "EMA",
      "ISO9001",
      "ISO14001",
      "Halal",
      "Kosher"
    ],
    "clients": "全球制药/保健品Top品牌、功能食品品牌、运动营养品牌",
    "successCases": [
      {
        "name": "联系我们 - Lonza全球总部",
        "url": "https://www.lonza.com/annualreport/2024/service-pages/contact-us"
      },
      {
        "name": "Basel全球总部 - Lonza Tower",
        "url": "https://www.lonza.com/about-us/our-locations/basel-switzerland"
      },
      {
        "name": "Capsugel品牌胶囊 - 年产能超2000亿粒",
        "url": "https://www.lonza.com/"
      }
    ],
    "website": "https://www.lonza.com/",
    "intro": "全球最大的制药和保健品CDMO之一,1897年创立。Capsugel(胶囊)品牌全球领先,年产能超2,000亿粒。Lonza CHI部门提供UC-II胶原蛋白、左旋肉碱、益生菌等品牌原料及CDMO服务。在中国的苏州设有Capsugel硬胶囊工厂。拥有50+主要制造和研发设施,遍布全球35+国家,近14,000名全职员工。",
    "highlights": [
      "全球最大CDMO之一",
      "Capsugel品牌胶囊(年产2000亿+)",
      "UC-II专利胶原蛋白",
      "全球35+国家布局",
      "1897年创立"
    ],
    "advantageDosageForms": [
      "硬胶囊",
      "软胶囊",
      "生物制剂"
    ]
  },
  {
    "id": "aenova",
    "name": "Aenova Group",
    "nameEn": "Aenova Group GmbH",
    "region": "international",
    "location": "德国施塔恩贝格(总部)",
    "address": "Berger Strasse 8-10, 82319 Starnberg (Percha), Germany",
    "phone": "+49 8151 9987-0",
    "email": "info@aenova-group.com",
    "founded": "2008年(通过合并成立)",
    "employees": "约4,000人",
    "revenue": "约7亿欧元",
    "factories": "德国(Tittmoning/Bad Aibling等)、瑞士、法国、意大利、罗马尼亚、美国等15+基地",
    "moq": "片剂>=10万片; 软胶囊>=5万粒; 硬胶囊>=10万粒",
    "priceRange": "片剂EUR0.05-0.30/片; 软胶囊EUR0.10-0.50/粒",
    "dosageForms": [
      "软胶囊",
      "硬胶囊",
      "片剂",
      "粉剂",
      "液体",
      "泡腾片",
      "益生菌",
      "软糖",
      "颗粒剂",
      "滴剂"
    ],
    "patents": "软胶囊制造工艺; 药品/保健品双线生产技术; 多项制剂专利; 高效微量营养素配方",
    "certifications": [
      "EU-GMP",
      "cGMP",
      "FDA",
      "ISO9001",
      "ISO14001",
      "Halal",
      "Kosher"
    ],
    "clients": "全球制药和保健品品牌、跨境电商品牌",
    "successCases": [
      {
        "name": "联系我们 - Aenova Group",
        "url": "https://www.aenova-group.com/en/contact"
      },
      {
        "name": "Starnberg总部 - Aenova Group",
        "url": "https://www.aenova-group.com/de/unternehmen/standorte/starnberg"
      }
    ],
    "website": "https://www.aenova-group.com/",
    "intro": "欧洲最大的药品和保健品CDMO之一,2008年由瑞士Drages AG等多家公司合并而成。15+个生产基地覆盖全剂型,既有药品GMP线也有食品GMP线,是欧洲少数能同时满足药品和保健品生产标准的CDMO。业务涵盖处方药、OTC药品、膳食补充剂和健康食品,年营收约7亿欧元。",
    "highlights": [
      "欧洲最大保健品CDMO之一",
      "15+全球生产基地",
      "药品+保健品双GMP",
      "全剂型覆盖",
      "约4,000员工"
    ],
    "advantageDosageForms": [
      "软胶囊",
      "片剂",
      "糖衣片"
    ]
  },
  {
    "id": "gemini-pharma",
    "name": "Gemini Pharmaceuticals",
    "nameEn": "Gemini Pharmaceuticals, Inc.",
    "region": "international",
    "location": "美国纽约州Commack",
    "address": "87 Modular Ave, Commack, NY 11725, USA",
    "phone": "+1 (631) 543-3334",
    "email": "mjost@geminipharm.com",
    "founded": "1975年",
    "employees": "约200人",
    "revenue": "私有未公开",
    "factories": "Commack, NY(总部+生产基地)",
    "moq": "片剂>=5万片; 胶囊>=5万粒; 软胶囊>=3万粒",
    "priceRange": "片剂约$0.05-0.25/片; 胶囊约$0.08-0.30/粒",
    "dosageForms": [
      "片剂",
      "硬胶囊",
      "软胶囊",
      "粉剂",
      "液体",
      "泡腾片",
      "软糖"
    ],
    "patents": "家庭品牌定制配方; 泡腾片生产工艺; 多项制剂配方; 高速胶囊填充技术",
    "certifications": [
      "cGMP",
      "FDA",
      "NSF",
      "UL",
      "USDA Organic"
    ],
    "clients": "美国主要零售连锁品牌的Store Brand/Private Label",
    "successCases": [
      {
        "name": "联系我们 - Gemini Pharmaceuticals",
        "url": "https://geminipharm.com/contact-gemini/"
      },
      {
        "name": "年生产数十亿粒胶囊 - 高速胶囊填充机",
        "url": "https://geminipharm.com/"
      }
    ],
    "website": "https://geminipharm.com/",
    "intro": "50年历史的美国膳食补充剂CDMO,专注为美国主要零售连锁(Walgreen/CVS/Target等)提供Store Brand代工服务。拥有多种高速胶囊填充机,每年生产数十亿粒胶囊。在泡腾片和硬胶囊领域有专长,是美国Private Label补充剂领域的重要参与者。拥有USDA有机认证,可生产有机膳食补充剂。",
    "highlights": [
      "50年行业经验",
      "Store Brand专家",
      "USDA Organic认证",
      "FDA+NSF+UL三认证",
      "年产能数十亿粒胶囊"
    ],
    "advantageDosageForms": [
      "片剂",
      "硬胶囊",
      "软糖"
    ]
  },
  {
    "id": "arizona-nutritional",
    "name": "Arizona Nutritional Supplements",
    "nameEn": "Arizona Nutritional Supplements (ANS)",
    "region": "international",
    "location": "美国亚利桑那州Chandler",
    "address": "380 E Chilton Dr, Chandler, AZ 85225, USA",
    "phone": "+1 (480) 966-9630",
    "email": "info@aznutritional.com",
    "founded": "1995年",
    "employees": "约300-500人",
    "revenue": "私有未公开",
    "factories": "Chandler, AZ(总部+主工厂,超30万平方英尺)",
    "moq": "胶囊>=5万粒; 片剂>=5万片; 粉剂/代餐>=3,000罐",
    "priceRange": "胶囊约$0.06-0.30/粒; 蛋白粉$15-40/罐",
    "dosageForms": [
      "硬胶囊",
      "片剂",
      "软胶囊",
      "粉剂(含运动营养)",
      "液体",
      "茶包",
      "软糖",
      "压片糖果"
    ],
    "patents": "先进粉剂混合技术; 高温/高湿环境下稳定配方技术; 运动营养配方专利",
    "certifications": [
      "cGMP",
      "FDA",
      "NSF",
      "USDA Organic",
      "Non-GMO项目",
      "Kosher",
      "Halal"
    ],
    "clients": "美国本土品牌、运动营养品牌、有机/天然渠道品牌",
    "successCases": [
      {
        "name": "联系我们 - Arizona Nutritional Supplements",
        "url": "https://www.aznutritional.com/contact"
      },
      {
        "name": "30万+平方英尺cGMP认证工厂",
        "url": "https://www.aznutritional.com/"
      }
    ],
    "website": "https://www.aznutritional.com/",
    "intro": "美国西南部最大的膳食补充剂CDMO之一,超30万平方英尺cGMP认证生产设施。以运动营养粉剂和有机/天然产品代工见长,服务众多快速增长的功能性食品和运动营养品牌。拥有USDA Organic和Non-GMO项目验证,是美国少数同时拥有有机和非转基因认证的CDMO。",
    "highlights": [
      "30万+平方英尺工厂",
      "运动营养粉剂专家",
      "USDA Organic+Non-GMO",
      "NSF认证",
      "全方位cGMP认证"
    ],
    "advantageDosageForms": [
      "软胶囊",
      "片剂",
      "粉剂"
    ]
  },
  {
    "id": "nutrascience-labs",
    "name": "NutraScience Labs",
    "nameEn": "NutraScience Labs",
    "region": "international",
    "location": "美国纽约州Farmingdale",
    "address": "70 Carolyn Boulevard, Farmingdale, New York 11735, USA",
    "phone": "+1 (855) 492-7388",
    "email": "info@nutrasciencelabs.com",
    "founded": "2007年",
    "employees": "约100-200人",
    "revenue": "私有未公开",
    "factories": "Farmingdale, NY(总部+生产基地, cGMP认证)",
    "moq": "胶囊>=5万粒; 片剂>=5万片; 粉剂>=3,000罐",
    "priceRange": "终端产品按全套OEM报价(含包装)",
    "dosageForms": [
      "硬胶囊",
      "片剂",
      "软胶囊",
      "粉剂",
      "液体",
      "软糖",
      "微囊化粉剂"
    ],
    "patents": "全包式代工(Turnkey OEM)服务; 从概念到上架的完整方案; 120+年行业经验积累",
    "certifications": [
      "cGMP",
      "FDA",
      "NSF"
    ],
    "clients": "美国中小型保健品品牌、亚马逊/电商品牌、初创保健品公司(2300+品牌)",
    "successCases": [
      {
        "name": "120+年行业经验 - 帮助2300+品牌上市",
        "url": "https://www.pharmaceutical-tech.com/suppliers/nutrascience-labs"
      },
      {
        "name": "NutraScience Labs - Farmingdale NY合同制造商",
        "url": "https://www.allbiz.com/business/nutrascience-labs-855-492-7388"
      }
    ],
    "website": "https://www.allbiz.com/business/nutrascience-labs-855-492-7388",
    "intro": "专注为中小型保健品品牌和电商品牌提供Turnkey(全包式)OEM代工服务,从配方设计、原料采购、生产制造到包装设计一站式完成。已帮助超过2,300个品牌将高质量定制产品推向市场。拥有120+年行业经验积累,特别适合缺乏行业经验的初创保健品品牌。提供免费配方咨询和报价服务。",
    "highlights": [
      "Turnkey全包式OEM服务",
      "帮助2300+品牌上市",
      "120+年行业经验",
      "适合初创品牌",
      "电商品牌专家"
    ],
    "advantageDosageForms": [
      "软胶囊",
      "片剂",
      "口服液"
    ]
  },
  {
    "id": "pharmavite",
    "name": "Pharmavite LLC",
    "nameEn": "Pharmavite LLC (Otsuka Group)",
    "region": "international",
    "location": "美国加利福尼亚州West Hills",
    "address": "8531 Fallbrook Ave, West Hills, CA 91304, USA",
    "phone": "+1 (818) 221-6200",
    "email": "info@pharmavite.com",
    "founded": "1971年",
    "employees": "约1,500人",
    "revenue": "约10亿美元(估算)",
    "factories": "美国加州(West Hills+Valencia)、阿拉巴马州Opelika(新建)",
    "moq": "OEM业务>=10万瓶/批次",
    "priceRange": "片剂约$0.05-0.30/片; 软糖约$0.10-0.50/粒",
    "dosageForms": [
      "片剂",
      "软胶囊",
      "硬胶囊",
      "软糖",
      "粉剂",
      "液体",
      "口服液",
      "维生素矿物质复配方"
    ],
    "patents": "Nature Made品牌配方; 多项维生素矿物质复配专利; 软糖制造技术; Sleep保健品配方",
    "certifications": [
      "cGMP",
      "FDA",
      "USP验证",
      "NSF",
      "UL"
    ],
    "clients": "自有品牌(Nature Made)、部分OEM/Private Label客户",
    "successCases": [
      {
        "name": "Nature Made - 美国维生素第一品牌",
        "url": "https://www.pharmavite.com/"
      },
      {
        "name": "联系我们 - Pharmavite",
        "url": "https://www.pharmavite.com/contact/"
      },
      {
        "name": "阿拉巴马州Opelika新建大型生产设施",
        "url": "https://www.pharmavite.com/careers/headquarters/"
      }
    ],
    "website": "https://www.pharmavite.com/",
    "intro": "美国最大的维生素制造商,旗下Nature Made是美国维生素第一品牌。隶属于日本大塚制药(Otsuka Pharmaceutical)。2024年在阿拉巴马州新建大型生产设施,扩大产能。产品通过USP验证,是美国少数通过USP独立验证的维生素品牌。除自有品牌外也提供Private Label代工服务。",
    "highlights": [
      "Nature Made美国维生素第一品牌",
      "日本大塚制药旗下",
      "阿拉巴马州新工厂",
      "USP+NSF+UL全认证",
      "约1,500员工"
    ],
    "advantageDosageForms": [
      "片剂",
      "营养软糖",
      "粉剂"
    ]
  },
  {
    "id": "nbty",
    "name": "NBTY (The Bountiful Company)",
    "nameEn": "The Bountiful Company (formerly NBTY)",
    "region": "international",
    "location": "美国纽约州Bohemia",
    "address": "90 Orville Dr, Bohemia, New York 11716, USA",
    "phone": "+1 (631) 567-9500",
    "email": "info@naturesbounty.com",
    "founded": "1971年",
    "employees": "约4,500人",
    "revenue": "约20亿美元",
    "factories": "美国纽约州、佛罗里达州、弗吉尼亚州; 英国; 荷兰",
    "moq": "OEM业务>=10万瓶/批次",
    "priceRange": "视产品类型和批量协商定价",
    "dosageForms": [
      "片剂",
      "软胶囊",
      "硬胶囊",
      "软糖",
      "粉剂",
      "液体",
      "口服液",
      "维生素矿物质复配方"
    ],
    "patents": "Nature's Bounty品牌配方; Solgar品牌生产工艺; Osteo Bi-Flex配方; Puritan's Pride配方",
    "certifications": [
      "cGMP",
      "FDA",
      "USP",
      "NSF"
    ],
    "clients": "自有品牌(Nature's Bounty/Solgar/Osteo Bi-Flex/Puritan's Pride); 部分OEM客户",
    "successCases": [
      {
        "name": "Nature's Bounty - 美国最大营养补充剂品牌之一",
        "url": "https://naturesbounty.com/pages/contact-us"
      },
      {
        "name": "Solgar - 知名高端维生素品牌",
        "url": "https://naturesbounty.com/"
      }
    ],
    "website": "https://naturesbounty.com/",
    "intro": "美国最大的营养补充剂公司之一,旗下拥有Nature's Bounty(自然之宝)、Solgar(素力高)、Osteo Bi-Flex、Puritan's Pride等知名品牌。2021年被Kohlberg Kravis Roberts(KKR)以约60亿美元收购。除自有品牌外也提供OEM服务。全球5大生产基地分布在美国、英国和荷兰,拥有50+年历史。",
    "highlights": [
      "Nature's Bounty/Solgar品牌",
      "KKR 60亿美元收购",
      "全球5大生产基地",
      "50+年历史",
      "USP+NSF认证"
    ],
    "advantageDosageForms": [
      "软胶囊",
      "片剂",
      "营养软糖"
    ]
  }
];

// 行业MOQ参考
export const industryMoq: IndustryRefRow[] = [
  {
    "form": "软胶囊",
    "china": "≥30万粒",
    "intl": "≥50万粒"
  },
  {
    "form": "营养软糖",
    "china": "≥50万粒",
    "intl": "≥100万粒"
  },
  {
    "form": "片剂",
    "china": "≥30万片",
    "intl": "≥50万片"
  },
  {
    "form": "硬胶囊",
    "china": "≥30万粒",
    "intl": "≥50万粒"
  },
  {
    "form": "粉剂/固体饮料",
    "china": "≥1万袋",
    "intl": "≥5万袋"
  },
  {
    "form": "口服液/饮品",
    "china": "≥3万瓶",
    "intl": "≥10万瓶"
  },
  {
    "form": "益生菌",
    "china": "≥10万袋",
    "intl": "≥50万袋"
  },
  {
    "form": "口溶膜(ODF)",
    "china": "≥50万贴",
    "intl": "≥100万贴"
  }
];

// 行业价格参考
export const industryPrice: IndustryRefRow[] = [
  {
    "form": "软胶囊",
    "china": "0.15-0.80元/粒",
    "intl": "$0.03-0.12/capsule"
  },
  {
    "form": "营养软糖",
    "china": "0.20-1.50元/粒",
    "intl": "$0.05-0.20/gummy"
  },
  {
    "form": "片剂",
    "china": "0.05-0.30元/片",
    "intl": "$0.02-0.08/tablet"
  },
  {
    "form": "硬胶囊",
    "china": "0.08-0.35元/粒",
    "intl": "$0.03-0.10/capsule"
  },
  {
    "form": "粉剂/固体饮料",
    "china": "0.30-1.50元/袋",
    "intl": "$0.05-0.25/sachet"
  },
  {
    "form": "口服液/饮品",
    "china": "1.00-5.00元/瓶",
    "intl": "$0.20-1.00/vial"
  },
  {
    "form": "益生菌",
    "china": "0.50-3.00元/袋",
    "intl": "$0.10-0.50/sachet"
  },
  {
    "form": "口溶膜(ODF)",
    "china": "0.50-2.00元/贴",
    "intl": "$0.10-0.30/strip"
  }
];
