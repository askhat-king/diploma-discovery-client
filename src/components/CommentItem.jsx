import React from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
export const CommentItem = ({ cmt, children }) => {
    return (
        <SideBlock title="Комментарии">
            <List>
            <ListItem alignItems="flex-start">
                <div className='flex items-center gap-3'>
            <div className='flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm'>
                {cmt.fullName}
            </div>
            <div className='flex text-gray-300 text-[10px]'>{cmt.comment}</div>
        </div>
        </ListItem>
        </List>
        </SideBlock>
    )
}
