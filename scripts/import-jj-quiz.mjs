import fs from "node:fs";
import vm from "node:vm";

const source = process.argv[2];
const output = process.argv[3] || "quiz-import.json";

if (!source) {
  console.error("Guna: node scripts/import-jj-quiz.mjs /path/index.html [output.json]");
  process.exit(1);
}

const html = fs.readFileSync(source, "utf8");
const marker = "const QUIZ_DATA =";
const start = html.indexOf(marker);
if (start < 0) throw new Error("QUIZ_DATA tidak ditemui.");

const bodyStart = start + marker.length;
const bodyEnd = html.indexOf("\n};", bodyStart) + 2;
if (bodyEnd < 2) throw new Error("Penutup QUIZ_DATA tidak ditemui.");
const expression = html.slice(bodyStart, bodyEnd);

const sandbox = {};
vm.createContext(sandbox);
const data = vm.runInContext(`(${expression})`, sandbox, { timeout: 1000 });
const codeMap = { IKR3082: "IKR3083" };
const targetCodes = new Set(["IKR3013", "IKR3023", "IKR3033", "IKR3043", "IKR3053", "IKR3063", "IKR3073", "IKR3082", "IKR3093", "IKR3103", "IKR3113", "IKR3133"]);
const rows = [];

for (const semester of data.semesters || []) {
  for (const module of semester.modules || []) {
    if (!targetCodes.has(module.code)) continue;
    for (const topic of module.topics || []) {
      for (const [index, question] of (topic.questions || []).entries()) {
        rows.push({
          question_id: `${codeMap[module.code] || module.code}-${topic.id}-${index + 1}`,
          moduleCode: codeMap[module.code] || module.code,
          sourceModuleCode: module.code,
          topicId: topic.id,
          topicTitle: topic.title,
          question: question.q,
          option_A: question.options[0],
          option_B: question.options[1],
          option_C: question.options[2],
          option_D: question.options[3],
          correct_answer: ["A", "B", "C", "D"][question.answer],
        });
      }
    }
  }
}

fs.writeFileSync(output, JSON.stringify(rows, null, 2));
console.log(`${rows.length} soalan ditulis ke ${output}`);
