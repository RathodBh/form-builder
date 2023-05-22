import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import Crop169Icon from "@mui/icons-material/Crop169";
import NotesIcon from "@mui/icons-material/Notes";
import NumbersIcon from "@mui/icons-material/Numbers";
import PasswordIcon from "@mui/icons-material/Password";
import { Alert, IconButton } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
];

const dragArr = ["sider", "dropArea"];

const Form = () => {
    const [open, setOpen] = React.useState(true);

    const updateDrag = (param:any) => {
      const sourceIndex = param.source.index;
      // console.log("🚀 ~ file: Form.tsx:49 ~ updateDrag ~ sourceIndex:", sourceIndex)
      const destIndex = param.destination.index;
        console.log("🚀 ~ file: Form.tsx:51 ~ updateDrag ~ destIndex:", param)
        // console.log("dragEnd");
    };

    return (
        <DragDropContext onDragEnd={(param) => updateDrag(param)}>
            <Box sx={{ display: "flex" }}>
                {dragArr.map((cur, i) => (
                    <Droppable droppableId={cur} key={cur}>
                        {(provided) => {
                            if (cur === "sider") {
                                return (
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
                                                <Typography
                                                    variant="h6"
                                                    noWrap
                                                    component="div"
                                                >
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
                                                        // onDragEnd={calledFun}
                                                    >
                                                        {(provided) => (
                                                            <>
                                                                <ListItem
                                                                    key={i}
                                                                    disablePadding
                                                                    ref={
                                                                        provided.innerRef
                                                                    }
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <ListItemButton>
                                                                        <ListItemIcon>
                                                                            {
                                                                                field.icon
                                                                            }
                                                                        </ListItemIcon>
                                                                        <ListItemText
                                                                            primary={
                                                                                field.text
                                                                            }
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
                                );
                            } else {
                                return (
                                    <>
                                        <Box
                                            component="main"
                                            sx={{
                                                flexGrow: 1,
                                                bgcolor: "background.default",
                                                p: 3,
                                            }}
                                        >
                                            <Toolbar />
                                            <Typography paragraph>
                                                {open && (
                                                    <Alert
                                                        action={
                                                            <IconButton
                                                                aria-label="close"
                                                                color="inherit"
                                                                size="small"
                                                                onClick={() => {
                                                                    setOpen(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                <CloseIcon fontSize="inherit" />
                                                            </IconButton>
                                                        }
                                                    >
                                                        Drag and Drop a form
                                                        component
                                                    </Alert>
                                                )}
                                            </Typography>
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                drag HERE
                                            </div>
                                        </Box>
                                    </>
                                );
                            }
                        }}
                    </Droppable>
                ))}
            </Box>
        </DragDropContext>
    );
};

export default Form;
