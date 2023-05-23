import React from "react";
import { AppBar, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Crop169Icon from "@mui/icons-material/Crop169";
import NotesIcon from "@mui/icons-material/Notes";
import NumbersIcon from "@mui/icons-material/Numbers";
import PasswordIcon from "@mui/icons-material/Password";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ChecklistIcon from "@mui/icons-material/Checklist";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const drawerWidth = 200;
const fields: { text: string; icon: JSX.Element }[] = [
    {
        text: "Text Field",
        icon: <Crop169Icon />,
    },
    {
        text: "Text Area",
        icon: <NotesIcon />,
    },
    {
        text: "Number",
        icon: <NumbersIcon />,
    },
    {
        text: "Password",
        icon: <PasswordIcon />,
    },
    {
        text: "Select",
        icon: <ArrowDropDownCircleIcon />,
    },
    {
        text: "Date",
        icon: <CalendarMonthIcon />,
    },
    {
        text: "File",
        icon: <AttachFileIcon />,
    },
    {
        text: "Checkbox",
        icon: <ChecklistIcon />,
    },
    {
        text: "Radio",
        icon: <RadioButtonCheckedIcon />,
    },
];

const SidebarDroppable = () => {
    return (
        <>
            <Droppable droppableId={"sidebar"} key={"sidebar"}>
                {(provided) => (
                    <>
                        <CssBaseline />
                        <AppBar
                            position="fixed"
                            sx={{
                                width: `calc(100% - ${drawerWidth}px)`,
                                ml: `${drawerWidth}px`,
                            }}
                        >
                            <Toolbar>
                                <Typography variant="h6" noWrap component="div">
                                    Form Builder
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Drawer
                            sx={{
                                width: drawerWidth,
                                flexShrink: 0,
                                "& .MuiDrawer-paper": {
                                    width: drawerWidth,
                                    boxSizing: "border-box",
                                },
                            }}
                            variant="permanent"
                            anchor="left"
                        >
                            <Toolbar
                                style={{
                                    background: "gainsboro",
                                    display: "grid",
                                    placeItems: "center",
                                    color: "#1976d2",
                                    fontWeight: "bolder",
                                }}
                            >
                                Fields
                            </Toolbar>
                            <Divider />
                            <List
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {fields.map((field, i) => (
                                    <Draggable
                                        draggableId={field.text}
                                        index={i}
                                        key={i}
                                    >
                                        {(provided) => (
                                            <>
                                                <ListItem
                                                    key={i}
                                                    disablePadding
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <ListItemButton>
                                                        <ListItemIcon>
                                                            {field.icon}
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={field.text}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            </>
                                        )}
                                    </Draggable>
                                ))}
                            </List>
                        </Drawer>
                    </>
                )}
            </Droppable>
        </>
    );
};
export default SidebarDroppable;
