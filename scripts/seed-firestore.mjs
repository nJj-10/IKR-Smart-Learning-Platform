import fs from "node:fs";
import { createRequire } from "node:module";
const requireFromBackend = createRequire(new URL("../backend/package.json", import.meta.url));
const admin = requireFromBackend("firebase-admin");
const file=process.argv[2];if(!file)throw new Error("Sediakan fail JSON hasil import-jj-quiz.mjs");
admin.initializeApp({credential:admin.credential.applicationDefault()});const db=admin.firestore();const rows=JSON.parse(fs.readFileSync(file,"utf8"));let batch=db.batch(),count=0;
for(const row of rows){const ref=db.collection('quiz').doc(row.question_id);const options=[row.option_A,row.option_B,row.option_C,row.option_D];batch.set(ref,{moduleCode:row.moduleCode,sourceModuleCode:row.sourceModuleCode,topicId:row.topicId,topicTitle:row.topicTitle,question:row.question,options,correctAnswer:options['ABCD'.indexOf(row.correct_answer)]});count++;if(count%400===0){await batch.commit();batch=db.batch();}}
if(count%400)await batch.commit();console.log(`${count} soalan dimasukkan ke Firestore.`);
