import React from 'react';
import {
  render,
  act,
  screen,
  waitFor,
  userEvent,
  getNodeByText,
} from '../../../tests/utilities';
import {
  buildTeammateProfil,
  buildTeamDatas,
  buildTeammateNotes,
} from '../../../tests/generate';
import * as teamsDB from '../../../tests/db/teams';
import Router from 'react-router';

import Teammate from '../Team/Teammate/Teammate';

const spyParams = jest.spyOn(Router, 'useParams');
const defaultIndexes = { team: 0, member: 0 };

async function renderTeammatePage({ teams, indexes = defaultIndexes } = {}) {
  if (!teams) {
    teams = await teamsDB.create(buildTeamDatas());
  }

  const params = {
    id: teams[indexes.team]._id,
    memberId: teams[indexes.team].members[indexes.member]._id,
  };

  spyParams.mockReturnValue(params);

  const utils = await render(<Teammate />);

  return {
    ...utils,
    teams,
  };
}

describe('Teammate page', () => {
  it('Should load a team member profil', async () => {
    const { teams } = await renderTeammatePage();
    const member = teams[defaultIndexes.team].members[defaultIndexes.member];

    await waitFor(() =>
      expect(screen.getAllByText(teams[defaultIndexes.team].name)).toBeDefined()
    );
    expect(
      screen.getAllByText(`${member.firstname} ${member.lastname}`)
    ).toHaveLength(3);
    expect(screen.getByText(member.email)).toBeDefined();
    expect(screen.getByText(member.contract)).toBeDefined();
    expect(screen.getByText(member.poste)).toBeDefined();
  });

  it('Should be possible to edit teammate datas', async () => {
    await renderTeammatePage();
    const updatedProfil = buildTeammateProfil();

    await act(async () =>
      userEvent.click(
        await screen.getByText(/Editer la fiche/i, { selector: 'button' })
      )
    );

    userEvent.type(await screen.findByLabelText(/Email/i), updatedProfil.email);
    userEvent.type(
      await screen.findByLabelText(/Firstname/i),
      updatedProfil.firstname
    );
    userEvent.type(
      await screen.findByLabelText(/Lastname/i),
      updatedProfil.lastname
    );
    userEvent.type(await screen.findByLabelText(/Poste/i), updatedProfil.poste);
    userEvent.type(
      await screen.findByLabelText(/Contrat/i),
      updatedProfil.contract
    );
    userEvent.type(
      await screen.findByLabelText(/Nombre d'heures/i),
      updatedProfil.hours
    );

    expect(await screen.findByLabelText(/Email/i)).toHaveValue(
      updatedProfil.email
    );
    expect(await screen.findByLabelText(/Firstname/i)).toHaveValue(
      updatedProfil.firstname
    );
    expect(await screen.findByLabelText(/Lastname/i)).toHaveValue(
      updatedProfil.lastname
    );
    expect(await screen.findByLabelText(/Poste/i)).toHaveValue(
      updatedProfil.poste
    );
    expect(await screen.findByLabelText(/Contrat/i)).toHaveValue(
      updatedProfil.contract
    );
    expect(await screen.findByLabelText(/Nombre d'heures/i)).toHaveValue(
      updatedProfil.hours
    );

    userEvent.click(
      screen.getByText(/Enregistrer le profil/i, { selector: 'button' })
    );

    await waitFor(() =>
      expect(screen.getByText(`${updatedProfil.email}`)).toBeInTheDocument()
    );

    expect(
      await screen.findByText(`${updatedProfil.contract}`)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(`${updatedProfil.poste}`)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(`${updatedProfil.hours}`)
    ).toBeInTheDocument();

    expect(
      screen.getAllByText(
        `${updatedProfil.firstname} ${updatedProfil.lastname}`
      )
    ).toHaveLength(3);
  });

  /* it('Should update teammate notes', async () => {
    const setTeams = await teamsDB.create(buildTeamDatas(true));
    const { teams } = await renderTeammatePage({ teams: setTeams });
    const [newNote] = buildTeammateNotes(1);
    const [firstNote, lastNote] = teams[defaultIndexes.team].members[
      defaultIndexes.member
    ].notes;

    await waitFor(() =>
      expect(
        screen.getByText('Notes enregistrées (2)', { selector: 'h3' })
      ).toBeInTheDocument()
    );

    expect(
      await screen.findByText(firstNote.content, {
        selector: 'span',
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(lastNote.content, { selector: 'span' })
    ).toBeInTheDocument();

    userEvent.type(
      await screen.findByLabelText('Nouvelle note'),
      newNote.content
    );

    userEvent.click(
      await screen.findByText(/Enregistrer la note/i, { selector: 'button' })
    );

    await waitFor(
      expect(
        screen.getByText('Notes enregistrées (3)', { selector: 'h3' })
      ).toBeInTheDocument()
    );
    expect(screen.getByText(newNote.content)).toBeInTheDocument();
  }); */
});
