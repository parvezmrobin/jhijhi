/**
 * Parvez M Robin
 * parvezmrobin@gmail.com
 * Date: Apr 05, 2019
 */


module.exports = {
  auth: {
    register: {
      ok: "Successfully registered as a new user.",
      err: "Error while registering as a new user.",
    },
  },
  players: {
    index: {
      err: "Error while retrieving player list",
    },
    create: {
      ok: (name) => `Successfully created player ${name}`,
      err: "Error while creating player",
    },
  },
  teams: {
    index: {
      err: "Error while retrieving team list",
    },
    create: {
      ok: (name) => `Successfully created team ${name}`,
      err: "Error while creating team",
    },
  },
  matches: {
    index: {
      err: "Error while retrieving match list",
    },
    create: {
      ok: (name) => `Successfully created match ${name}`,
      err: "Error while creating match",
    },
  },
  umpires: {
    index: {
      err: "Error while retrieving umpire list",
    },
    create: {
      ok: (name) => `Successfully created umpire ${name}`,
      err: "Error while creating umpire",
    },
  },
};
