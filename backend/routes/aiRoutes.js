import { Router } from "express";
import { answerQuestion } from "../services/aiProvider.js";
const router=Router();
router.post('/chat',async(req,res,next)=>{try{const message=String(req.body?.message||'').trim();if(!message)return res.status(400).json({error:'Mesej diperlukan.'});const answer=await answerQuestion(message,Array.isArray(req.body.history)?req.body.history:[]);res.json({answer})}catch(e){next(e)}});
export default router;
