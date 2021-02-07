import faker from 'faker';

function buildUser(overrides) {
  return {
    userId: faker.random.uuid(),
    token: faker.random.hexaDecimal(41),
    ...overrides,
  };
}

function buildSignupDatas(overrides) {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    ...overrides,
  };
}

function buildSigninDatas(overrides) {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...overrides,
  };
}

function buildHomeUserDatas(overrides) {
  return {
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    plannings: [
      {
        _id: faker.random.uuid(),
        title: `Planning ${faker.random.number()}`,
      },
      {
        _id: faker.random.uuid(),
        title: `Planning ${faker.random.number()}`,
      },
      {
        _id: faker.random.uuid(),
        title: `Planning ${faker.random.number()}`,
      },
    ],
    team: [
      {
        _id: faker.random.uuid(),
        name: `Team ${faker.random.number()}`,
      },
      {
        _id: faker.random.uuid(),
        name: `Team ${faker.random.number()}`,
      },
    ],
    ...overrides,
  };
}

function buildTeamDatas(withNotes = false) {
  return [
    {
      _id: faker.random.hexaDecimal(24),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      creator: faker.random.hexaDecimal(24),
      name: `Team ${faker.random.number({ min: 0, max: 20 })}`,
      location: {
        city: faker.address.city(),
        geoId: '',
        address: faker.address.streetAddress(),
      },
      members: [
        {
          _id: faker.random.hexaDecimal(24),
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          poste: faker.name.jobTitle(),
          hours: String(faker.random.number(35)),
          email: faker.internet.email(),
          contract: faker.random.alpha(),
          notes: withNotes ? buildTeammateNotes() : [],
        },
      ],
    },
    {
      _id: faker.random.hexaDecimal(24),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      creator: faker.random.hexaDecimal(24),
      name: `Team ${faker.random.number({ min: 0, max: 20 })}`,
      location: {
        city: faker.address.city(),
        geoId: '',
        address: faker.address.streetAddress(),
      },
      members: [
        {
          _id: faker.random.hexaDecimal(24),
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          poste: faker.name.jobTitle(),
          hours: String(faker.random.number(45)),
          email: faker.internet.email(),
          contract: faker.random.alpha(),
          notes: withNotes ? buildTeammateNotes() : [],
        },
        {
          _id: faker.random.hexaDecimal(24),
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          poste: faker.name.jobTitle(),
          hours: String(faker.random.number(30)),
          email: faker.internet.email(),
          contract: faker.random.alpha(),
          notes: withNotes ? buildTeammateNotes() : [],
        },
      ],
    },
  ];
}

function buildNewTeamMemberDatas(overrides) {
  return {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    poste: faker.name.jobTitle(),
    hours: String(faker.random.number(30)),
    email: faker.internet.email(),
    contract: faker.random.alpha(),
    ...overrides,
  };
}

function buildNewMemberResponseDatas(overrides) {
  return {
    ...overrides,
    _id: faker.random.hexaDecimal(24),
    notes: [],
  };
}

function buildNewTeamDatas(overrides) {
  return {
    name: `Team ${faker.random.number({ min: 0, max: 20 })}`,
    location: {
      city: faker.address.city(),
      address: faker.address.streetAddress(),
    },
    members: [{ ...buildNewTeamMemberDatas(overrides?.members[0]) }],
  };
}

function buildNewTeamResponseDatas(overrides) {
  return {
    _id: faker.random.hexaDecimal(24),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    creator: faker.random.hexaDecimal(24),
    ...overrides,
    members: [
      {
        _id: faker.random.hexaDecimal(24),
        notes: [],
        ...overrides?.members[0],
      },
    ],
  };
}

function buildTeammateDatas(overrides) {
  return {
    teammate: [
      {
        _id: faker.random.hexaDecimal(24),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        poste: faker.name.jobTitle(),
        hours: String(faker.random.number(30)),
        email: faker.internet.email(),
        contract: faker.random.alpha(),
        notes: [],
        ...overrides?.teammate,
      },
    ],
    teamName: `Team ${faker.random.number({ min: 0, max: 20 })}`,
    location: {
      city: faker.address.city(),
      address: faker.address.streetAddress(),
      geoId: '',
    },
  };
}

function buildTeammateProfil(overrides) {
  return {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    poste: faker.name.jobTitle(),
    hours: String(faker.random.number(30)),
    email: faker.internet.email(),
    contract: faker.random.alpha(),
  };
}

function buildTeammateNotes(max = 2) {
  const notes = [];
  let i = 0;

  while (i < max) {
    notes.push({
      _id: faker.random.hexaDecimal(24),
      content: String(faker.lorem.sentence(12)),
    });
    i += 1;
  }

  return notes;
}

export {
  buildSignupDatas,
  buildHomeUserDatas,
  buildSigninDatas,
  buildUser,
  buildTeamDatas,
  buildNewTeamMemberDatas,
  buildNewTeamDatas,
  buildNewTeamResponseDatas,
  buildNewMemberResponseDatas,
  buildTeammateDatas,
  buildTeammateProfil,
  buildTeammateNotes,
};
