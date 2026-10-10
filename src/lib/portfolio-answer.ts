import { certifications, education, expertise, experience, toolkit } from "@/data/portfolio";

// Local portfolio answers; no external model or visitor message transmission.
export function answerPortfolioQuestion(question: string): string {
  const text = question.toLowerCase();
  if (/contact|email|reach|hire|hiring|available/.test(text)) return "You can contact Shivam at shivamkr026@gmail.com about product, growth or analytics opportunities.";
  if (/zepto|project|prototype|case study/.test(text)) return "Shivam’s ZeptoAssist AI case study includes a PRD, an LLM and RAG support workflow, and a prototype built with Lovable.dev, Claude API and Make.com.";
  if (/lightbite|food|business|founder/.test(text)) return experience[2].summary;
  if (/numero|marketing|seo|campaign/.test(text)) return experience[0].summary;
  if (/jyothi|operations|inventory|dispatch/.test(text)) return experience[1].summary;
  if (/educat|stud|degree|college|cgpa|bba|graduat/.test(text)) return `Shivam completed a ${education[0].degree} at ${education[0].institution} in ${education[0].graduated}, specializing in ${education[0].specialization}, with a CGPA of ${education[0].cgpa}.`;
  if (/certif|training|qualification/.test(text)) return `Shivam’s certifications include ${certifications.map((item) => `${item.title} through ${item.issuer}`).join(" and ")}.`;
  if (/\bai\b|rag|llm|system/.test(text)) return "Shivam’s AI skills include LLM integration, RAG architecture and prompt optimization, developed through product management training and the ZeptoAssist prototype.";
  if (/tool|skill|stack|software/.test(text)) return `Shivam’s toolkit includes ${toolkit.ANALYTICS.join(", ")}, Figma, Canva, WordPress and Jira.`;
  if (/product/.test(text)) return expertise[0].description.replace(/^Turn/, "Shivam uses his training to turn").replace("my product", "his product");
  if (/experience|work|intern|career/.test(text)) return "Shivam has worked in digital marketing at Numero Uno, operations at Jyothi Wood Trading Company, and co-founded the food venture LightBite.";
  if (/interest|hobb|passion/.test(text)) return "Shivam is interested in consumer psychology, emerging technology and generative AI products.";
  if (/who|about|yourself|shivam|owner/.test(text)) return "Shivam is a BBA graduate specializing in Marketing and Data Analytics, with experience in digital marketing, operations and entrepreneurship.";
  return "I don’t have that detail in Shivam’s portfolio yet—try asking about his projects, experience, education, tools or contact information.";
}
