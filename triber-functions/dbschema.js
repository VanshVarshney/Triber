let db = {
  users: [
    {
      userId: 'xxxxxxxxxxxxxxxxxxxxx',
      email: 'user@email.com',
      handle: 'user',
      createdAt: '2020-10-02T13:36:06.750Z',
      imageUrl: 'image/xxxxxxxx/xxxxxxxx',
      bio: 'Hello, My Name Is USER NAME, I am a SOftware Develope',
      website: 'https://user.com',
      location: 'London, UK',
    },
  ],

  screams: [
    {
      userHandle: 'user',
      body: 'This is the scream body',
      createdAt: '2020-10-02T13:36:06.750Z',
      likeCount: 5,
      commentCount: 2,
    },
  ],
  comments: [
    {
      userHandle: 'user',
      screamId: 'xxxxxxxxxxxxxxxxxxxxxxx',
      body: 'nice one mate!',
      createdAt: '2019-03-15T10:59:52.798Z',
    },
  ],
  notifications: [
    {
      recipient: 'user',
      sender: 'john',
      read: 'true | false',
      screamId: 'xxxxxxxxxxxxxxxxxxxxxxxx',
      type: 'like | comment',
      createdAt: '2019-03-15T10:59:52.798Z',
    },
  ],
};

const userDetails = {
  // Redux data
  credentials: {
    userId: 'N43KJ5H43KJHREW4J5H3JWMERHB',
    email: 'user@email.com',
    handle: 'user',
    createdAt: '2019-03-15T10:59:52.798Z',
    imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
    bio: 'Hello, my name is user, nice to meet you',
    website: 'https://user.com',
    location: 'Lonodn, UK',
  },
  likes: [
    {
      userHandle: 'user',
      screamId: 'hh7O5oWfWucVzGbHH2pa',
    },
    {
      userHandle: 'user',
      screamId: '3IOnFoQexRcofs5OhBXO',
    },
  ],
};
