import React from 'react';
import styles from './UserInfo.module.scss';
import { Link } from "react-router-dom";

export const UserInfo = ({ _id, avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl ? `${process.env.REACT_APP_API_URL}${avatarUrl}` : '/noavatar.png'}  alt={fullName} />
      <div className={styles.userDetails}>
      <Link to={`/user/${_id}`}>
        <span className={styles.userName}>{fullName}</span>
        </Link>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
