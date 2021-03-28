import React from 'react';

import Avatar from '../../atoms/Avatar/Avatar';

import { generateRandomColor } from '../../../utilities/utilities';

import './PlanningMemberNavMenu.scss';

export default function PlanningMemberNavMenu(props) {
  const Tag = props?.tag ?? `div`;

  return (
    <Tag key={props._id} className="memberNavMenu">
      <Avatar
        letter={props?.firstname.charAt(0)}
        randomColor={() => `#${generateRandomColor()}`}
      />
      <div className="memberNavMenu__infos" aria-hidden={true}>
        <div className="memberNavMenu__leftBlock">
          <span className="memberNavMenu__fullname">{`${props?.firstname} ${props?.lastname}`}</span>
          <span className="memberNavMenu__poste">{props?.poste}</span>
        </div>
        <div className="memberNavMenu__rightBlock">
          <span className="memberNavMenu__timeTitle">Temps</span>
          <span className="memberNavMenu__hours">
            {props?.attributedHours ?? 0}h/{props?.hours ?? 35}h
          </span>
        </div>
      </div>
    </Tag>
  );
}
