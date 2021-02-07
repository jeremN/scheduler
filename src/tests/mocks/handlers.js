// src/mocks/handlers.js
import { rest } from 'msw';
import {
  buildHomeUserDatas,
  buildNewTeamResponseDatas,
  buildTeamDatas,
  buildNewMemberResponseDatas,
  buildTeammateDatas,
} from '../generate';
import * as teamsDB from '../db/teams';

const apiURL = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8080';
const teamPageTeamsList = buildTeamDatas();

export const handlers = [
  rest.get(`${apiURL}/user/:userId`, async (_, res, ctx) => {
    const userDatas = await buildHomeUserDatas();
    return res(ctx.status(200), ctx.json({ user: userDatas }));
  }),

  rest.get(`${apiURL}/teams/teamsList`, async (_, res, ctx) => {
    const teamsList = teamPageTeamsList;
    return res(ctx.status(200), ctx.json({ teamsList }));
  }),

  rest.put(`${apiURL}/teams/updateTeam/:teamId`, async (req, res, ctx) => {
    const team = { ...req.body.updatedTeam };
    const newMember = team.members[1];
    team.members[1] = { ...buildNewMemberResponseDatas(newMember) };
    return res(ctx.status(200), ctx.json({ team }));
  }),

  rest.post(`${apiURL}/teams/newTeam`, async (req, res, ctx) => {
    const userTeams = teamPageTeamsList;
    const newTeam = await buildNewTeamResponseDatas(req.body.newTeam);
    const teamsList = [...userTeams, newTeam];
    return res(
      ctx.status(200),
      ctx.json({ newTeamID: newTeam._id, teamsList })
    );
  }),

  rest.delete(
    `${apiURL}/teams/deleteTeammate/:teamId/:memberId`,
    async (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ message: 'Teammate deleted !', deleted: true })
      );
    }
  ),

  rest.get(`${apiURL}/teams/teammate/:id/:memberId`, async (req, res, ctx) => {
    const { id, memberId } = req.params;
    const team = await teamsDB.getTeam(id);
    const { name, members, location } = team[0];
    const teammate = await teamsDB.getTeammate(memberId, members);
    return res(
      ctx.status(200),
      ctx.json({
        teammate,
        location,
        teamName: name,
      })
    );
  }),

  rest.put(
    `${apiURL}/teams/updateTeammate/:id/:memberId`,
    async (req, res, ctx) => {
      const { id, memberId } = req.params;
      const { updatedTeammate } = req.body;
      console.debug('updateTeammate', updatedTeammate);
      // const teams = await teamsDB.updateTeammate(id, memberId, updatedTeammate);
      console.debug('updateTeammate');
      return res(
        ctx.status(200),
        ctx.json({ message: 'Teammate profil updated !', updated: true })
      );
    }
  ),
];

export const getToken = (req) =>
  req.headers.get('Authorization')?.replace('Bearer ', '');
