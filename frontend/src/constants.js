export const ENDPOINT = 'https://g7t3-backend.herokuapp.com'
// export const ENDPOINT = 'http://localhost:5001'

export const ROLES = {
  STAFF: 'STAFF',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
}

export const STATUS = {
  ACTIVE: 'ACTIVE',
  PENDING: 'PENDING',
  RETIRED: 'RETIRED',
}

export const RESPONSE_CODES = {
  SUCCESS: 200,
  NOT_FOUND: 404,
}

export const DUMMYLJDATA = [
  {
    id: 1,
    title: 'Learning Journey 1',
    description: 'This is a learning journey',
    status: 'In Progress',
    progress: 70,
    dateStarted: '2021-10-10',
    role: 'HR Manager',
    bannerImg:
      'https://img.freepik.com/free-vector/leader-concept-illustration_114360-7479.jpg?w=1380&t=st=1664901820~exp=1664902420~hmac=36a6129e33bf3e8a37625e49c7507f847a208c4427859bee106c84efcf8eac3b',
  },
  {
    id: 2,
    title: 'Learning Journey 2',
    description: 'This is a learning journey',
    status: 'In Progress',
    progress: 35,
    dateStarted: '2021-10-10',
    role: 'Operation Manager',
    bannerImg:
      'https://img.freepik.com/free-vector/female-engineer-standing-near-chalkboard-explaining-project-draft-building-worker-flat-vector-illustration-construction-architecture_74855-8362.jpg?w=1380&t=st=1664982310~exp=1664982910~hmac=8ad3286bfdece15354e78e7135eff2f5432b0e8b33a9fbb8fb1772b33f59ba1b',
  },
  {
    id: 3,
    title: 'Learning Journey 3',
    description: 'This is a learning journey',
    status: 'In Progress',
    progress: 50,
    dateStarted: '2021-10-10',
    role: 'IT Manager',
    bannerImg:
      'https://img.freepik.com/free-vector/leader-concept-illustration_114360-7479.jpg?w=1380&t=st=1664901820~exp=1664902420~hmac=36a6129e33bf3e8a37625e49c7507f847a208c4427859bee106c84efcf8eac3b',
  },
  {
    id: 4,
    title: 'Learning Journey 4',
    description: 'This is a learning journey',
    status: 'Completed',
    progress: 100,
    dateStarted: '2021-10-10',
    role: 'Software Engineer',
    bannerImg:
      'https://img.freepik.com/free-vector/female-engineer-standing-near-chalkboard-explaining-project-draft-building-worker-flat-vector-illustration-construction-architecture_74855-8362.jpg?w=1380&t=st=1664982310~exp=1664982910~hmac=8ad3286bfdece15354e78e7135eff2f5432b0e8b33a9fbb8fb1772b33f59ba1b',
  },
]

export const DUMMYROLEDATA = [
  {
    id: 1,
    role_name: 'Role 1',
    status: 'Status 1',
    skills: ['God', 'God Bless', 'I am the best'],
  },
  {
    id: 2,
    role_name: 'Role 2',
    status: 'Status 2',
    skills: ['Another God', 'Another God Bless', 'I am, indeed, the best'],
  },
  {
    id: 3,
    role_name: 'Role 3',
    status: 'Status 3',
    skills: ['This God', 'This God Bless', 'I am'],
  },
  {
    id: 4,
    role_name: 'Role 4',
    status: 'Status 4',
    skills: ['What God', 'What God Bless', 'I am him'],
  },
  {
    id: 5,
    role_name: 'Role 5',
    status: 'Status 5',
    skills: ['God', 'God Bless', 'Am I Him?'],
  },
  {
    id: 6,
    role_name: 'Role 6',
    status: 'Status 6',
    skills: ['God', 'God Bless', 'I am, truly, Him'],
  },
]
