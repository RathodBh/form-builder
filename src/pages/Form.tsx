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
import { Alert, IconButton, TextField } from "@mui/material";
import {
    DragDropContext,
    Draggable,
    DropResult,
    Droppable,
} from "react-beautiful-dnd";
import Modal from "./Modal/Modal";

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
interface modalOptions {
    open: boolean;
    field: string;
}
const initialModalOptions = {
    open: false,
    field: "",
};
type fieldSet = {
    [key: string]: string | boolean | number;
};
const initialFieldState: fieldSet = {
    label: "",
    value: "",
    required: true,
    disabled: false,
    readonly: false,
    focus: false,
    placeholder: "",
};
const Form = () => {
    const [open, setOpen] = React.useState<boolean>(true);
    const [modal, setModal] = React.useState<modalOptions>(initialModalOptions);
    const [allFields, setAllFields] = React.useState<fieldSet[]>([]);

    const updateDrag = (param: DropResult) => {
        console.log("PARAM", param);
        if (
            param?.source?.droppableId === param?.destination?.droppableId &&
            param?.source?.droppableId === "dropArea"
        ) {
            const sourceIndex = param?.source?.index;
            const destIndex = param?.destination?.index;
            const temp = [...allFields];
            temp.splice(destIndex, 0, temp.splice(sourceIndex, 1)[0]);
            console.log(sourceIndex, destIndex);
            if (sourceIndex !== destIndex) {
                setAllFields([...temp])
            }
        } else if (param?.destination?.droppableId === "dropArea") {
            setModal({
                open: true,
                field: param.draggableId,
            });
            setOpen(false);
        }
    };

    return (
        <DragDropContext onDragEnd={(param: DropResult) => updateDrag(param)}>
            <Modal
                modal={modal}
                setModal={setModal}
                setAllFields={setAllFields}
            />
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
                                                style={{ minHeight: "100vh" }}
                                            >
                                                {allFields.length > 0
                                                    ? allFields?.map(
                                                          (field, i) => {
                                                              return (
                                                                  // <>
                                                                  <Draggable
                                                                      draggableId={`${i}`}
                                                                      index={i}
                                                                      key={i}
                                                                  >
                                                                      {(
                                                                          provided
                                                                      ) => (
                                                                          <div
                                                                              key={
                                                                                  i
                                                                              }
                                                                              // disablePadding
                                                                              ref={
                                                                                  provided.innerRef
                                                                              }
                                                                              {...provided.draggableProps}
                                                                              {...provided.dragHandleProps}
                                                                          >
                                                                              <p>
                                                                                  {
                                                                                      field?.label
                                                                                  }
                                                                                  {field?.required && (
                                                                                      <span
                                                                                          style={{
                                                                                              color: "red",
                                                                                          }}
                                                                                      >
                                                                                          *
                                                                                      </span>
                                                                                  )}
                                                                              </p>
                                                                              <TextField
                                                                                  value={
                                                                                      field?.value as string
                                                                                  }
                                                                                  variant="outlined"
                                                                                  fullWidth
                                                                              />
                                                                          </div>
                                                                      )}
                                                                  </Draggable>
                                                                  // </>
                                                              );
                                                          }
                                                      )
                                                    : "Drag Here"}
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
