import React from 'react';

import Card from '../../atoms/Card/Card';
import Avatar from '../../atoms/Avatar/Avatar';
import ButtonLink from '../../atoms/Link/Link';
import Button from '../../atoms/Buttons/Buttons';

import clientWrapper from '../../../utilities/fetchWrapper';

import './TeamMemberCard.scss';

const TeamMemberCard = ({ member, onDeleteMember }, index) => (
  <Card tag={'li'} classes={['member']}>
    <div className="member__infos">
      <Avatar letter={member.name.charAt(0)} />
      <span>
        <b>{member.name}</b> {member.email}
      </span>
    </div>
    <div className="member__poste">{member.poste}</div>
    <div className="member__contract">{member.contract}</div>
    <div className="member__hours">{member.hours}</div>
    <div className="member__teamName">{member.teamName}</div>
    <div className="member__shop">{member.shop}</div>
    <div className="member__notes">
      <ButtonLink
        linkTo={`/team/${member.teamId}/${member._id}`}
        linkId={member._id}>
        voir la fiche
      </ButtonLink>
    </div>
    <div className="member__actions">
      <Button clicked={onDeleteMember}>Effacer</Button>
    </div>
  </Card>
);

export default TeamMemberCard;
