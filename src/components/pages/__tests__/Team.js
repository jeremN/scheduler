import React from 'react';
import {
  render,
  waitForElementToBeRemoved,
  screen,
  act,
  userEvent,
  getNodeByText,
  waitFor,
} from '../../../tests/utilities';
import {
  buildNewTeamMemberDatas,
  buildNewTeamDatas,
} from '../../../tests/generate';

import Team from '../Team/Team';

describe('Team Page', () => {
  beforeEach(async () => {
    const props = { history: [] };
    const { queryAllByText } = await render(<Team {...props} />);

    await waitForElementToBeRemoved(
      () => [...queryAllByText(/Chargement.../i)],
      {
        timeout: 4000,
      }
    );
  });

  it('Should display a list of teammate', async () => {
    expect(screen.getAllByText(/Team /i)).toHaveLength(5);
    expect(screen.getByText(/Mes équipes/i)).toBeInTheDocument();
    expect(getNodeByText('3 équipiers', screen)).toBeInTheDocument();
    expect(getNodeByText('2 équipes', screen)).toBeInTheDocument();

    expect(screen.getByText(/créer un équipier/i)).toBeInTheDocument();
    expect(screen.getByText(/créer une équipe/i)).toBeInTheDocument();

    expect(screen.getAllByText(/voir la fiche/i)).toHaveLength(3);
    expect(screen.getAllByText(/Effacer/i)).toHaveLength(3);
  });

  it('Should add a new team member', async () => {
    const newMember = await buildNewTeamMemberDatas({
      poste: 'vendeur',
      contract: 'CDI',
      hours: '35',
    });

    await act(async () =>
      userEvent.click(await screen.findByText('créer un équipier'))
    );

    expect(await screen.getByText('Ajouter un/des équipier(s)')).toBeVisible();

    const options = [...document.querySelectorAll('#memberTeam > option')];

    userEvent.selectOptions(
      screen.getByLabelText('Team (requis)'),
      options[1].value
    );

    userEvent.type(
      await screen.findByLabelText(/Firstname/i),
      newMember.firstname
    );
    userEvent.type(
      await screen.findByLabelText(/Lastname/i),
      newMember.lastname
    );
    userEvent.type(await screen.findByLabelText(/Email/i), newMember.email);
    userEvent.type(
      await screen.findByLabelText(/Contrat/i),
      newMember.contract
    );
    userEvent.type(
      await screen.findByLabelText("Nombres d'heures"),
      newMember.hours
    );
    userEvent.type(await screen.findByLabelText(/Poste/i), newMember.poste);

    await act(async () =>
      userEvent.click(
        await screen.findByText(/Créer l'équipier/i, { selector: 'button' })
      )
    );

    await waitForElementToBeRemoved(() =>
      screen.getByText('Ajouter un/des équipier(s)')
    );

    expect(screen.getAllByText(/Team /i)).toHaveLength(6);
  });

  it('Should create a new team', async () => {
    const newTeamDatas = buildNewTeamDatas({
      members: [{ hours: '30', contract: 'CDI', poste: 'vendeur' }],
    });
    const newTeamMembersDatas = newTeamDatas.members[0];

    await act(async () =>
      userEvent.click(await screen.findByText('créer une équipe'))
    );

    expect(await screen.getByText('Nouvelle équipe')).toBeVisible();

    userEvent.type(
      await screen.findByLabelText(/team name/i),
      newTeamDatas.name
    );
    userEvent.type(
      await screen.findByLabelText(/city/i),
      newTeamDatas.location.city
    );
    userEvent.type(
      await screen.findByLabelText(/address/i),
      newTeamDatas.location.address
    );

    userEvent.type(
      await screen.findByLabelText(/Firstname/i),
      newTeamMembersDatas.firstname
    );
    userEvent.type(
      await screen.findByLabelText(/Lastname/i),
      newTeamMembersDatas.lastname
    );
    userEvent.type(
      await screen.findByLabelText(/Email/i),
      newTeamMembersDatas.email
    );
    userEvent.type(
      await screen.findByLabelText(/Contrat/i),
      newTeamMembersDatas.contract
    );
    userEvent.type(
      await screen.findByLabelText(/Nombres d'heures/i),
      newTeamMembersDatas.hours
    );
    userEvent.type(
      await screen.findByLabelText(/Poste/i),
      newTeamMembersDatas.poste
    );

    await act(async () =>
      userEvent.click(
        await screen.findByText(/Créer l'équipe/i, { selector: 'button' })
      )
    );

    await waitForElementToBeRemoved(() => screen.getByText('Nouvelle équipe'));

    expect(screen.getAllByText(/Team /i)).toHaveLength(7);
  });

  it('Should delete selected team member', async () => {
    expect(screen.getAllByText(/Team /i)).toHaveLength(5);

    const btns = await screen.getAllByText(/Effacer/i);
    const btnToClick = btns[btns.length - 1];
    await act(async () => userEvent.click(btnToClick));
    await waitFor(
      () => expect(btnToClick.closest('.member')).not.toBeInTheDocument(),
      {
        timeout: 4000,
      }
    );

    expect(screen.getAllByText(/Team /i)).toHaveLength(4);
  });
});
