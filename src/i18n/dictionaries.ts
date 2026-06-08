export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type Dictionary = {
  site: { name: string; journal: string; about: string; contact: string; language: string; resume: string };
  home: { badge: string; title: string; enterJournal: string; latestEntries: string; journal: string; viewAll: string };
  journal: { archive: string; title: string; description: string };
  journalDetail: { continueReading: string };
  journalCard: { readEntry: string };
  about: { badge: string; title: string; companyIntro: string; services: string; clients: string; ceoIntro: string; isoCommittees: string; serviceProjects: string; serviceTraining: string; serviceConsulting: string };
  contact: { badge: string; title: string; description: string; name: string; email: string; subject: string; message: string; send: string; address: string; emailAddr: string };
  newsletter: { badge: string; title: string; placeholder: string; subscribe: string };
  resume: { badge: string; title: string; description: string; educationLabel: string; socialLabel: string; experienceLabel: string };
  footer: { description: string };
  common: { unscheduled: string };
};

export const enDict: Dictionary = {
  site: {
    name: "ELÉGANCE",
    journal: "Journal",
    about: "About",
    contact: "Contact",
    resume: "Resume",
    language: "Language",
  },
  home: {
    badge: "Automated Premium Journal",
    title: "The quiet architecture of modern elegance.",
    enterJournal: "Enter journal",
    latestEntries: "Latest entries",
    journal: "Journal",
    viewAll: "View all",
  },
  journal: {
    archive: "Archive",
    title: "Journal",
    description:
      "Essays on interior restraint, architectural atmosphere, ritual, and the cultivated life.",
  },
  journalDetail: {
    continueReading: "Continue reading",
  },
  journalCard: {
    readEntry: "Read entry",
  },
  about: {
    badge: "About us",
    title: "Beijing Century My Way Education Technology Inc.",
    companyIntro:
      "BCMWET was founded in 2007. We offer educational service and management consultation service to schools, colleges, training organizations, businesses and government agencies.",
    services:
      "The educational service includes curriculum design, staff training, learning assessment, multimedia classroom design, virtual school design, on-line course design, digital learning system design etc. The management consultation service includes branding, HR management, marketing, sales, operation, customer service and supply chain management etc.",
    clients:
      "Our clients include national organizations such as China Petroleum, China Telecom, China Institute of Standardization etc. as well as medium and small businesses in China.",
    ceoIntro:
      "The CEO of BCMWET is Mr. Qiang Hao who is an active expert in standard development at international and national level. He is a member or liaison in the following ISO committees:",
    isoCommittees:
      "ISO/IEC JTC1/SC36 Information technology for learning, education and training | ISO/TC210 Quality management for health products | ISO/TC215 Health Informatics | ISO/TC232 Education and learning services | ISO/TC249 Traditional Chinese Medicine | ISO/TC260 Human Resource Management | ISO/TC268 Sustainable cities and communities | ISO/TC298 Rare earth | ISO/TC314 Ageing societies | ISO/TC321 Transaction assurance in E-Commerce | ISO/PC317 Consumer Protection: privacy by design",
    serviceProjects:
      "Standard development project — We offer full services from preliminary study, project application and project management of new standard project at international and national level.",
    serviceTraining:
      "Standard development skill training — We offer training courses for persons who involve in standard development process at different stages.",
    serviceConsulting:
      "Management consultation — We offer management consultation service to small, medium and large organizations in different functions of business management including branding, HR, marketing, sales, operation, customer service and supply chain management.",
  },
  contact: {
    badge: "Contact",
    title: "Inquiries",
    description:
      "For collaborations, editorial commissions, and brand partnerships, send a considered note.",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    send: "Send inquiry",
    address: "Paris / Shanghai / Online",
    emailAddr: "studio@elegance.example",
  },
  newsletter: {
    badge: "The Weekly Dispatch",
    title: "Notes on design, art, and the art of living well.",
    placeholder: "name@example.com",
    subscribe: "Subscribe",
  },
  resume: {
    badge: "Curriculum Vitae",
    title: "Experience & Background",
    description: "A career spanning three decades across international trade, technology, education, and consulting — from state-owned enterprises to Fortune 500 companies and entrepreneurship.",
    educationLabel: "Education",
    socialLabel: "Social Appointments",
    experienceLabel: "Professional Experience",
  },
  footer: {
    description:
      "A premium journal for interiors, architecture, art, and considered living.",
  },
  common: {
    unscheduled: "Unscheduled",
  },
};

export const zhDict: Dictionary = {
  site: {
    name: "ELÉGANCE",
    journal: "期刊",
    about: "关于",
    contact: "联系",
    resume: "履历",
    language: "语言",
  },
  home: {
    badge: "自动化高级期刊",
    title: "现代优雅的静谧建筑。",
    enterJournal: "进入期刊",
    latestEntries: "最新文章",
    journal: "期刊",
    viewAll: "查看全部",
  },
  journal: {
    archive: "归档",
    title: "期刊",
    description: "关于室内克制、建筑氛围、仪式感和修养生活的文章。",
  },
  journalDetail: {
    continueReading: "继续阅读",
  },
  journalCard: {
    readEntry: "阅读文章",
  },
  about: {
    badge: "关于我们",
    title: "北京世纪麦维教育科技有限公司",
    companyIntro:
      "北京世纪麦维教育科技有限公司（BCMWET）成立于2007年，为学校、学院、培训机构、企业和政府机构提供教育服务和管理咨询服务。",
    services:
      "教育服务包括课程设计、师资培训、学习评估、多媒体教室设计、虚拟学校设计、在线课程设计、数字学习系统设计等。管理咨询服务包括品牌建设、人力资源管理、市场营销、销售、运营、客户服务和供应链管理等。",
    clients:
      "我们的客户包括中国石油、中国电信、中国标准化研究院等国家大型机构，以及中国各类中小型企业。",
    ceoIntro:
      "公司CEO郝强先生是国际和国家层面标准制定的活跃专家。他是以下ISO委员会的成员或联络人：",
    isoCommittees:
      "ISO/IEC JTC1/SC36 学习、教育和培训信息技术 | ISO/TC210 健康产品的质量管理 | ISO/TC215 健康信息学 | ISO/TC232 教育和学习服务 | ISO/TC249 中医药 | ISO/TC260 人力资源管理 | ISO/TC268 可持续城市与社区 | ISO/TC298 稀土 | ISO/TC314 老龄化社会 | ISO/TC321 电子商务交易保障 | ISO/PC317 消费者保护：商品和服务的隐私设计",
    serviceProjects:
      "标准开发项目 — 我们提供国际和国家层面新标准项目的预研、申请和项目管理全流程服务。",
    serviceTraining:
      "标准开发技能培训 — 我们为参与标准开发流程的人员提供各阶段的培训课程。",
    serviceConsulting:
      "管理咨询 — 我们为中小型及大型企业提供各职能领域的管理咨询服务，包括品牌建设、人力资源、市场营销、销售、运营、客户服务和供应链管理等。",
  },
  contact: {
    badge: "联系",
    title: "咨询",
    description: "如需合作、编辑委托和品牌合作，请发送邮件。",
    name: "姓名",
    email: "邮箱",
    subject: "主题",
    message: "留言",
    send: "发送咨询",
    address: "巴黎 / 上海 / 线上",
    emailAddr: "studio@elegance.example",
  },
  newsletter: {
    badge: "每周通讯",
    title: "关于设计、艺术和美好生活的随笔。",
    placeholder: "name@example.com",
    subscribe: "订阅",
  },
  resume: {
    badge: "个人履历",
    title: "经历与背景",
    description: "跨越三十余年的职业生涯，涵盖国际贸易、科技、教育和咨询领域——从国企到世界500强，再到自主创业。",
    educationLabel: "教育背景",
    socialLabel: "社会职务",
    experienceLabel: "职业经历",
  },
  footer: {
    description: "一本关于室内设计、建筑、艺术和精致生活的高端期刊。",
  },
  common: {
    unscheduled: "未排期",
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return locale === "zh" ? zhDict : enDict;
}
