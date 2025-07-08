import Thumbnail1 from './assets/flag1.jpg'
import Thumbnail2 from './assets/flag2.jpg'
import Thumbnail3 from './assets/flag3.png'
import Candidate1 from './assets/candidate1.jpg'
import Candidate2 from './assets/candidate2.jpg'
import Candidate3 from './assets/candidate3.jpg'
import Candidate4 from './assets/candidate4.jpg'
import Candidate5 from './assets/candidate5.jpg'
import Candidate6 from './assets/candidate6.jpg'
import Candidate7 from './assets/candidate7.jpg'

export const elections=[
    {
        id: "e1",
        title: "Nepal House of Representatives Election 2084",
        description: `Electing members for the federal parliament of Nepal.`,
        thumbnail: Thumbnail1,
        candidates: ["c1", "c2", "c3", "c4"],
        voters: []
    },
    {
        id: "e2",
        title: "Nepal Local Commitee Election",
        description: `Nepal Local Commitee Election`,
        thumbnail: Thumbnail2,
        candidates: ["c5", "c6", "c7"],
        voters: []
    },
    {
        id: "e3",
        title: "Nepal Provincial Assembly Election 2084",
        description: `Electing members for the provincial assemblies of Nepal.`,
        thumbnail: Thumbnail3,
        candidates: [],
        voters: []
    }
]
export const candidates = [
    {
        id: 'c1',
        fullName: 'KP sharma oli',
        image: Candidate1,
        motto: 'Constructing Big Projects in Nepal',
        voteCount: 23,
        election: 'e1',
    },
    {
        id: 'c2',
        fullName: 'Sher Bahadur Deuba',
        image: Candidate2,
        motto: 'Strengthening Democracy and Development',
        voteCount: 15,
        election: 'e1',
    },
    {
        id: 'c3',
        fullName: 'Pushpa Kamal Dahal',
        image: Candidate3,
        motto: 'Inclusive Progress for All',
        voteCount: 10,
        election: 'e1',
    }
    ,
        {
            id: 'c4',
            fullName: 'Bidhya Devi Bhandari',
            image: Candidate4,
            motto: 'Empowering Women and Youth',
            voteCount: 8,
            election: 'e1',
        },
        {
            id: 'c5',
            fullName: 'Balen Shah',
            image: Candidate5,
            motto: 'Innovation for the Next Generation',
            voteCount: 12,
            election: 'e2',
        },
        {
            id: 'c6',
            fullName: 'Renu Daahal',
            image: Candidate6,
            motto: 'Education and Prosperity',
            voteCount: 9,
            election: 'e2',
        },
        {
            id: 'c7',
            fullName: 'Purna Prasad Acharya',
            image: Candidate7,
            motto: 'Unity in Diversity',
            voteCount: 7,
            election: 'e2',
        }
];
export const voters=[
    {
      id:'v1',
      fullName:'Ashim POudel',
      email:'ashimpdl7@gmail.com',
      password:'Ashim123#',
      isAdmin:true,
      votedElection:["e2"]
    },
    {
        id: 'v2',
        fullName: 'Sita Sharma',
        email: 'sita.sharma@example.com',
        password: 'Sita123#',
        isAdmin: false,
        votedElection: ['e1', 'e2']
    },
    {
        id: 'v3',
        fullName: 'Ram Bahadur',
        email: 'ram.bahadur@example.com',
        password: 'Ram123#',
        isAdmin: false,
        votedElection: ['e1', 'e2']
    },
    {
        id: 'v4',
        fullName: 'Mina Karki',
        email: 'mina.karki@example.com',
        password: 'Mina123#',
        isAdmin: false,
        votedElection: []
    },
]
