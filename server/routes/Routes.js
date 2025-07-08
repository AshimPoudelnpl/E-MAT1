import express from 'express';
import { addElection, getElection, getElections, removeElection, updateElection, getCandidatesOfElection, getElectionVoters } from '../controllers/electionController.js';
import { addCandidate, getCandidate, removeCandidate, voteCandidate } from '../controllers/candidateController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { registerVoter, loginVoter, getVoter } from '../controllers/voterController.js';


const router = express.Router();

router.post('/voters/register', registerVoter);
router.post('/voters/login', loginVoter);
router.get('/voters/:id', authMiddleware, getVoter);

router.post('/elections', authMiddleware, addElection);
router.get('/elections', authMiddleware, getElections);
router.get('/elections/:id', authMiddleware, getElection);
router.delete('/elections/:id', authMiddleware, removeElection);
router.patch('/elections/:id', authMiddleware, updateElection);
router.get('/elections/:id/candidates', authMiddleware, getCandidatesOfElection);
router.get('/elections/:id/voters', authMiddleware, getElectionVoters);

router.post('/candidates', authMiddleware, addCandidate);
router.get('/candidates/:id', authMiddleware, getCandidate);
router.patch('/candidates/:id/vote', authMiddleware, voteCandidate);
router.delete('/candidates/:id', authMiddleware, removeCandidate);

export default router;