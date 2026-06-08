import { getPageContent } from "@/lib/data";
import { resumeDataZh, resumeDataEn } from "@/lib/resume-data";
import type { Locale } from "@/i18n/dictionaries";

// ── Types ──

export type HomeData = {
  heroBadge: string;
  heroTitle: string;
  heroCta: string;
  sectionLabel: string;
  sectionTitle: string;
  sectionViewAll: string;
  newsletterBadge: string;
  newsletterTitle: string;
  newsletterPlaceholder: string;
  newsletterSubscribe: string;
  siteName: string;
  footerDescription: string;
};

export type AboutData = {
  intro: string;
  services: string;
  clients: string;
  ceoIntro: string;
  isoCommittees: string[];
  serviceProjects: string;
  serviceTraining: string;
  serviceConsulting: string;
};

export type ResumeEntry = {
  period: string;
  company: string;
  location: string;
  title: string;
  description?: string;
};

export type ResumeData = {
  education: ResumeEntry[];
  social: ResumeEntry[];
  work: ResumeEntry[];
};

// ── Defaults (fallback when DB is not available) ──

export const defaultAboutData: AboutData = {
  intro:
    "北京世纪麦维教育科技有限公司（BCMWET）成立于2007年，为学校、学院、培训机构、企业和政府机构提供教育服务和管理咨询服务。",
  services:
    "教育服务包括课程设计、师资培训、学习评估、多媒体教室设计、虚拟学校设计、在线课程设计、数字学习系统设计等。管理咨询服务包括品牌建设、人力资源管理、市场营销、销售、运营、客户服务和供应链管理等。",
  clients:
    "我们的客户包括中国石油、中国电信、中国标准化研究院等国家大型机构，以及中国各类中小型企业。",
  ceoIntro:
    "公司CEO郝强先生是国际和国家层面标准制定的活跃专家。他是以下ISO委员会的成员或联络人：",
  isoCommittees: [
    "ISO/IEC JTC1/SC36 学习、教育和培训信息技术",
    "ISO/TC210 健康产品的质量管理",
    "ISO/TC215 健康信息学",
    "ISO/TC232 教育和学习服务",
    "ISO/TC249 中医药",
    "ISO/TC260 人力资源管理",
    "ISO/TC268 可持续城市与社区",
    "ISO/TC298 稀土",
    "ISO/TC314 老龄化社会",
    "ISO/TC321 电子商务交易保障",
    "ISO/PC317 消费者保护：商品和服务的隐私设计",
  ],
  serviceProjects:
    "标准开发项目 — 我们提供国际和国家层面新标准项目的预研、申请和项目管理全流程服务。",
  serviceTraining:
    "标准开发技能培训 — 我们为参与标准开发流程的人员提供各阶段的培训课程。",
  serviceConsulting:
    "管理咨询 — 我们为中小型及大型企业提供各职能领域的管理咨询服务，包括品牌建设、人力资源、市场营销、销售、运营、客户服务和供应链管理等。",
};

export const defaultResumeDataZh: ResumeData = resumeDataZh;
export const defaultResumeDataEn: ResumeData = resumeDataEn;

function getDefaultResumeData(locale: Locale): ResumeData {
  return locale === "zh" ? defaultResumeDataZh : defaultResumeDataEn;
}

export const defaultHomeDataEn: HomeData = {
  heroBadge: "Automated Premium Journal",
  heroTitle: "The quiet architecture of modern elegance.",
  heroCta: "Enter journal",
  sectionLabel: "Latest entries",
  sectionTitle: "Journal",
  sectionViewAll: "View all",
  newsletterBadge: "The Weekly Dispatch",
  newsletterTitle: "Notes on design, art, and the art of living well.",
  newsletterPlaceholder: "name@example.com",
  newsletterSubscribe: "Subscribe",
  siteName: "ELÉGANCE",
  footerDescription:
    "A premium journal for interiors, architecture, art, and considered living.",
};

export const defaultHomeDataZh: HomeData = {
  heroBadge: "自动化高级期刊",
  heroTitle: "现代优雅的静谧建筑。",
  heroCta: "进入期刊",
  sectionLabel: "最新文章",
  sectionTitle: "期刊",
  sectionViewAll: "查看全部",
  newsletterBadge: "每周通讯",
  newsletterTitle: "关于设计、艺术和美好生活的随笔。",
  newsletterPlaceholder: "name@example.com",
  newsletterSubscribe: "订阅",
  siteName: "ELÉGANCE",
  footerDescription: "一本关于室内设计、建筑、艺术和精致生活的高端期刊。",
};

function getDefaultHomeData(locale: Locale): HomeData {
  return locale === "zh" ? defaultHomeDataZh : defaultHomeDataEn;
}

// ── Loaders with DB fallback ──

export async function loadAboutData(): Promise<AboutData> {
  const page = await getPageContent("about");
  if (!page) return defaultAboutData;
  try {
    return JSON.parse(page.contentHtml) as AboutData;
  } catch {
    return defaultAboutData;
  }
}

export async function loadResumeData(locale: Locale = "en"): Promise<ResumeData> {
  const page = await getPageContent("resume");
  if (!page) return getDefaultResumeData(locale);
  try {
    const parsed = JSON.parse(page.contentHtml) as Record<string, ResumeData>;
    // Support both bilingual JSON { en: ..., zh: ... } and flat JSON
    if (parsed.en && parsed.zh) {
      return parsed[locale] ?? parsed.en;
    }
    return parsed as unknown as ResumeData;
  } catch {
    return getDefaultResumeData(locale);
  }
}

export async function loadHomeData(locale: Locale = "en"): Promise<HomeData> {
  const page = await getPageContent("home");
  if (!page) return getDefaultHomeData(locale);
  try {
    const parsed = JSON.parse(page.contentHtml) as Record<string, HomeData>;
    if (parsed.en && parsed.zh) {
      return parsed[locale] ?? parsed.en;
    }
    return parsed as unknown as HomeData;
  } catch {
    return getDefaultHomeData(locale);
  }
}

// ── JSON serialization for seed / admin ──

export function serializeAboutData(data: AboutData): string {
  return JSON.stringify(data, null, 2);
}

export function serializeResumeDataZh(data: ResumeData): string {
  return JSON.stringify(data, null, 2);
}

export function serializeResumeDataEn(data: ResumeData): string {
  return JSON.stringify(data, null, 2);
}

/** Serialize both languages into a single bilingual JSON blob */
export function serializeBilingualResumeData(): string {
  return JSON.stringify({ en: defaultResumeDataEn, zh: defaultResumeDataZh }, null, 2);
}

export function serializeBilingualHomeData(): string {
  return JSON.stringify({ en: defaultHomeDataEn, zh: defaultHomeDataZh }, null, 2);
}
