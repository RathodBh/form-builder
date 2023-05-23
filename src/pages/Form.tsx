import { useEffect, useState } from "react";
import "./Form.css";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton } from "@mui/material";
import {
    DragDropContext,
    Draggable,
    DropResult,
    Droppable,
} from "react-beautiful-dnd";
import Modal from "./Modal/Modal";
import SidebarDroppable from "../components/SidebarDroppable";
import SelectBox from "./Fields/SelectBox";
import FieldSet from "../modals/FieldSet";
import TextBox from "./Fields/TextBox";
import CheckBox from "./Fields/CheckBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
interface ModalOptions {
    open: boolean;
    field: string;
}
const initialModalOptions = {
    open: false,
    field: "",
};

const Form = () => {
    const [open, setOpen] = useState<boolean>(true);
    const [modal, setModal] = useState<ModalOptions>(initialModalOptions);
    const [allFields, setAllFields] = useState<FieldSet[]>([]);

    useEffect(() => {
        if (localStorage.getItem("AllFields")) {
            setAllFields(JSON.parse(localStorage.getItem("AllFields") || "[]"));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("AllFields", JSON.stringify([...allFields]));
    }, [allFields]);

    const updateDrag = (param: DropResult) => {
        if (
            param?.source?.droppableId === param?.destination?.droppableId &&
            param?.source?.droppableId === "dropArea"
        ) {
            const sourceIndex = param?.source?.index;
            const destIndex = param?.destination?.index;
            const temp = [...allFields];
            temp.splice(destIndex, 0, temp.splice(sourceIndex, 1)[0]);
            if (sourceIndex !== destIndex) {
                setAllFields([...temp]);
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
            <Box sx={{ display: "flex" }}>
                <SidebarDroppable />

                <Droppable droppableId={"dropArea"} key={"dropArea"}>
                    {(provided) => (
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
                                                        setOpen(false);
                                                    }}
                                                >
                                                    <CloseIcon fontSize="inherit" />
                                                </IconButton>
                                            }
                                        >
                                            Drag and Drop a form component
                                        </Alert>
                                    )}
                                </Typography>
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{ minHeight: "100vh" }}
                                >
                                    {allFields.length > 0
                                        ? allFields?.map((field, i) => {
                                              console.log("Field", field);
                                              return (
                                                  // <>
                                                  <Draggable
                                                      draggableId={`${i}`}
                                                      index={i}
                                                      key={i}
                                                  >
                                                      {(provided, snapshot) => (
                                                          <div
                                                              key={i}
                                                              className={
                                                                  "pos-rel"
                                                              }
                                                              ref={
                                                                  provided.innerRef
                                                              }
                                                              {...provided.draggableProps}
                                                              {...provided.dragHandleProps}
                                                              style={{
                                                                  ...provided
                                                                      .draggableProps
                                                                      .style,
                                                                  boxShadow:
                                                                      snapshot.isDragging
                                                                          ? "0 0 .4rem #666"
                                                                          : "none",

                                                                  padding:
                                                                      "10px",
                                                                  borderRadius:
                                                                      "6px",
                                                              }}
                                                              // style={{ border: "1px solid silver"}}
                                                          >
                                                              <div className="pos-abs">
                                                                  <EditIcon />
                                                                  <DeleteForeverIcon color="error" />
                                                              </div>
                                                              <p>
                                                                  {field?.label}
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
                                                              {(field?.fieldName ===
                                                                  "Text Area" ||
                                                                  field?.fieldName ===
                                                                      "Text Field" ||
                                                                  field?.fieldName ===
                                                                      "Number" ||
                                                                  field?.fieldName ===
                                                                      "Password") && (
                                                                  <TextBox
                                                                      field={
                                                                          field
                                                                      }
                                                                  />
                                                              )}

                                                              {field?.fieldName ===
                                                                  "Select" && (
                                                                  <SelectBox
                                                                      field={
                                                                          field
                                                                      }
                                                                  />
                                                              )}

                                                              {field?.fieldName ===
                                                                  "Checkbox" && (
                                                                  <CheckBox
                                                                      field={
                                                                          field
                                                                      }
                                                                  />
                                                              )}
                                                          </div>
                                                      )}
                                                  </Draggable>
                                                  // </>
                                              );
                                          })
                                        : "Drag Here"}
                                </div>
                            </Box>
                        </>
                    )}
                </Droppable>
            </Box>
            {modal?.open && (
                <Modal
                    modal={modal}
                    setModal={setModal}
                    setAllFields={setAllFields}
                />
            )}
        </DragDropContext>
    );
};

export default Form;
