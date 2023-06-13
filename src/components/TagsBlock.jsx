import React from "react";
import { useRef, useState } from 'react';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { Button, TextField } from '@mui/material';

import { SideBlock } from "./SideBlock";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {fetchGetByTag } from "../redux/slices/posts"

import styles from './UserProfile/userProfile.module.scss'

export const TagsBlock = ({ items, isLoading = true }) => {
  const [tags, setTags] = useState('');
  const dispatch = useDispatch();
  return (
    <SideBlock title="Тэги">
      <>
      <TextField
      sx={{ borderRadius: '10px', margin: '11px' }}
      type="text"
      onChange={(e) => setTags(e.target.value)}
      />
      <Link to={`/tags/${tags}`}
            onClick={() => {
              dispatch(fetchGetByTag(tags));
            }}>
        <Button size="large" variant="contained" style={{ borderRadius: 10, margin: '20px' }}>
        Поиск
        </Button>
        </Link>
        </>

      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <Link 
            key={i}
            style={{ textDecoration: "none", color: "black" }}
            to={`/tags/${name}`}
            onClick={() => {
              dispatch(fetchGetByTag(name));
            }}
          >
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
