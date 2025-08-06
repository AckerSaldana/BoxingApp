// Extended mock data for past results
export const mockExtendedResults = [
  {
    id: 1,
    winner: {
      name: 'Devin Haney',
      record: '30-0-0',
      nationality: 'USA'
    },
    loser: {
      name: 'Vasiliy Lomachenko',
      record: '17-3-0',
      nationality: 'Ukraine'
    },
    method: 'UD',
    methodDetail: 'Unanimous Decision',
    rounds: '12',
    time: null,
    date: '2024-05-20',
    venue: 'MGM Grand, Las Vegas',
    weightClass: 'Lightweight',
    isChampionship: true,
    titleDefense: 2,
    titles: ['WBC'],
    isUpset: false,
    odds: { winner: '-180', loser: '+150' },
    scorecards: [
      { judge: 'Dave Moretti', score: '116-112', winner: 'Haney' },
      { judge: 'Tim Cheatham', score: '115-113', winner: 'Haney' },
      { judge: 'Mike Ross', score: '115-113', winner: 'Haney' }
    ],
    roundByRound: [
      { round: 1, fighter1: 10, fighter2: 9 },
      { round: 2, fighter1: 10, fighter2: 9 },
      { round: 3, fighter1: 9, fighter2: 10 },
      { round: 4, fighter1: 10, fighter2: 9 },
      { round: 5, fighter1: 10, fighter2: 9 },
      { round: 6, fighter1: 9, fighter2: 10 },
      { round: 7, fighter1: 10, fighter2: 9 },
      { round: 8, fighter1: 10, fighter2: 9 },
      { round: 9, fighter1: 9, fighter2: 10 },
      { round: 10, fighter1: 10, fighter2: 9 },
      { round: 11, fighter1: 10, fighter2: 9 },
      { round: 12, fighter1: 9, fighter2: 10 }
    ],
    rating: 4.5,
    fightOfTheNight: true,
    punchStats: {
      fighter1: {
        name: 'Haney',
        jabs: { landed: 89, thrown: 312, percentage: 29 },
        power: { landed: 134, thrown: 267, percentage: 50 },
        body: { landed: 42, thrown: 98, percentage: 43 },
        total: { landed: 223, thrown: 579, percentage: 39 }
      },
      fighter2: {
        name: 'Lomachenko',
        jabs: { landed: 75, thrown: 298, percentage: 25 },
        power: { landed: 141, thrown: 289, percentage: 49 },
        body: { landed: 38, thrown: 87, percentage: 44 },
        total: { landed: 216, thrown: 587, percentage: 37 }
      }
    }
  },
  {
    id: 2,
    winner: {
      name: 'Dmitry Bivol',
      record: '21-0-0',
      nationality: 'Russia'
    },
    loser: {
      name: 'Canelo Alvarez',
      record: '57-2-2',
      nationality: 'Mexico'
    },
    method: 'UD',
    methodDetail: 'Unanimous Decision (115-113, 115-113, 115-113)',
    rounds: '12',
    time: null,
    date: '2024-05-07',
    venue: 'T-Mobile Arena, Las Vegas',
    weightClass: 'Light Heavyweight',
    isChampionship: true,
    titleDefense: 3,
    titles: ['WBA'],
    isUpset: true,
    odds: { winner: '+270', loser: '-350' },
    scorecards: [
      { judge: 'Steve Weisfeld', score: '115-113', winner: 'Bivol' },
      { judge: 'Dave Moretti', score: '115-113', winner: 'Bivol' },
      { judge: 'Tim Cheatham', score: '115-113', winner: 'Bivol' }
    ],
    roundByRound: [
      { round: 1, fighter1: 10, fighter2: 9 },
      { round: 2, fighter1: 10, fighter2: 9 },
      { round: 3, fighter1: 10, fighter2: 9 },
      { round: 4, fighter1: 9, fighter2: 10 },
      { round: 5, fighter1: 10, fighter2: 9 },
      { round: 6, fighter1: 10, fighter2: 9 },
      { round: 7, fighter1: 9, fighter2: 10 },
      { round: 8, fighter1: 10, fighter2: 9 },
      { round: 9, fighter1: 9, fighter2: 10 },
      { round: 10, fighter1: 9, fighter2: 10 },
      { round: 11, fighter1: 10, fighter2: 9 },
      { round: 12, fighter1: 10, fighter2: 9 }
    ],
    rating: 4.8,
    fightOfTheNight: false,
    punchStats: {
      fighter1: {
        name: 'Bivol',
        jabs: { landed: 152, thrown: 423, percentage: 36 },
        power: { landed: 101, thrown: 198, percentage: 51 },
        body: { landed: 58, thrown: 112, percentage: 52 },
        total: { landed: 253, thrown: 621, percentage: 41 }
      },
      fighter2: {
        name: 'Canelo',
        jabs: { landed: 84, thrown: 327, percentage: 26 },
        power: { landed: 97, thrown: 268, percentage: 36 },
        body: { landed: 35, thrown: 95, percentage: 37 },
        total: { landed: 181, thrown: 595, percentage: 30 }
      }
    }
  },
  {
    id: 3,
    winner: {
      name: 'Jaron Ennis',
      record: '31-0-0',
      nationality: 'USA'
    },
    loser: {
      name: 'Custio Clayton',
      record: '20-1-1',
      nationality: 'Canada'
    },
    method: 'KO',
    methodDetail: 'KO - Left Hook to the Body',
    rounds: '2',
    time: '2:31',
    date: '2024-05-07',
    venue: 'Dignity Health Sports Park, Carson',
    weightClass: 'Welterweight',
    isChampionship: false,
    titleDefense: 0,
    titles: [],
    isUpset: false,
    odds: { winner: '-800', loser: '+550' }
  },
  {
    id: 4,
    winner: {
      name: 'Naoya Inoue',
      record: '24-0-0',
      nationality: 'Japan'
    },
    loser: {
      name: 'Paul Butler',
      record: '34-3-0',
      nationality: 'UK'
    },
    method: 'TKO',
    methodDetail: 'TKO - Referee Stoppage',
    rounds: '11',
    time: '1:09',
    date: '2024-04-13',
    venue: 'Ariake Arena, Tokyo',
    weightClass: 'Bantamweight',
    isChampionship: true,
    titleDefense: 1,
    titles: ['WBA', 'WBC', 'IBF', 'WBO'],
    isUpset: false,
    odds: { winner: '-2500', loser: '+1200' }
  },
  {
    id: 5,
    winner: {
      name: 'Leigh Wood',
      record: '26-3-0',
      nationality: 'UK'
    },
    loser: {
      name: 'Michael Conlan',
      record: '16-1-0',
      nationality: 'Ireland'
    },
    method: 'KO',
    methodDetail: 'KO - Dramatic 12th Round',
    rounds: '12',
    time: '1:25',
    date: '2024-03-12',
    venue: 'Nottingham Arena, UK',
    weightClass: 'Featherweight',
    isChampionship: true,
    titleDefense: 1,
    titles: ['WBA'],
    isUpset: false,
    odds: { winner: '-140', loser: '+120' }
  },
  {
    id: 6,
    winner: {
      name: 'Katie Taylor',
      record: '23-0-0',
      nationality: 'Ireland'
    },
    loser: {
      name: 'Amanda Serrano',
      record: '44-2-1',
      nationality: 'Puerto Rico'
    },
    method: 'SD',
    methodDetail: 'Split Decision (96-93, 94-96, 96-94)',
    rounds: '10',
    time: null,
    date: '2024-04-30',
    venue: 'Madison Square Garden, New York',
    weightClass: 'Lightweight',
    isChampionship: true,
    titleDefense: 6,
    titles: ['WBA', 'WBC', 'IBF', 'WBO'],
    isUpset: false,
    odds: { winner: '-110', loser: '-110' },
    scorecards: [
      { judge: 'Glenn Feldman', score: '96-93', winner: 'Taylor' },
      { judge: 'Guido Cavalleri', score: '94-96', winner: 'Serrano' },
      { judge: 'Benoit Roussel', score: '96-94', winner: 'Taylor' }
    ],
    roundByRound: [
      { round: 1, fighter1: 10, fighter2: 9 },
      { round: 2, fighter1: 9, fighter2: 10 },
      { round: 3, fighter1: 10, fighter2: 9 },
      { round: 4, fighter1: 9, fighter2: 10 },
      { round: 5, fighter1: 10, fighter2: 9 },
      { round: 6, fighter1: 9, fighter2: 10 },
      { round: 7, fighter1: 10, fighter2: 9 },
      { round: 8, fighter1: 10, fighter2: 9 },
      { round: 9, fighter1: 9, fighter2: 10 },
      { round: 10, fighter1: 10, fighter2: 9 }
    ],
    rating: 5.0,
    fightOfTheNight: true
  }
];