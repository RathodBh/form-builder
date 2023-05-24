import React from "react";
import { Draggable } from "react-beautiful-dnd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FieldSet from "../modals/FieldSet";
import TextBox from "../pages/Fields/TextBox";
import SelectBox from "../pages/Fields/SelectBox";
import CheckBox from "../pages/Fields/CheckBox";
import RadioBox from "../pages/Fields/RadioBox";
import SimpleBox from "../pages/Fields/SimpleBox";
import { Button } from "@mui/material";
interface ModalOptions {
    open: boolean;
    field: string;
    index?: number;
}
type Props = {
    field: FieldSet;
    setModal: React.Dispatch<React.SetStateAction<ModalOptions>>;
    setAllFields: React.Dispatch<React.SetStateAction<FieldSet[]>>;
    i: number;
};

const DraggableItem = ({ field, setModal, setAllFields, i }: Props) => {
    const editHandle = () => {
        setModal({
            open: true,
            index: i,
            field: field?.fieldName as string,
        });
    };
    const deleteHandle = () => {
        setAllFields((prev) => {
            return [...prev]?.filter((_, ind) => ind !== i);
        });
    };
    console.log(field.fieldName, field);
    return (
        <>
            <Draggable draggableId={`${i}`} index={i} key={i}>
                {(provided, snapshot) => (
                    <div
                        className={"pos-rel"}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            ...provided.draggableProps.style,
                            boxShadow: snapshot.isDragging
                                ? "0 0 .4rem #666"
                                : "none",

                            padding: "10px",
                            borderRadius: "6px",
                        }}
                    >
                        <div className="pos-abs">
                            <EditIcon onClick={editHandle} />
                            <DeleteForeverIcon
                                color="error"
                                onClick={deleteHandle}
                            />
                        </div>
                        <p>
                            {field?.fieldName !== "Button" && field?.label}
                            {field?.fieldName !== "Button" &&
                                field?.required && (
                                    <span
                                        style={{
                                            color: "red",
                                        }}
                                    >
                                        *
                                    </span>
                                )}
                        </p>
                        {(field?.fieldName === "Text Area" ||
                            field?.fieldName === "Text Field" ||
                            field?.fieldName === "Number" ||
                            field?.fieldName === "Password") && (
                            <TextBox field={field} />
                        )}

                        {field?.fieldName === "Select" && (
                            <SelectBox field={field} />
                        )}

                        {field?.fieldName === "Checkbox" && (
                            <CheckBox field={field} />
                        )}

                        {field?.fieldName === "Radio" && (
                            <RadioBox field={field} />
                        )}

                        {(field?.fieldName === "File" ||
                            field?.fieldName === "date") && (
                            <SimpleBox field={field} />
                        )}

                        {field?.fieldName === "Button" && (
                            <Button
                                variant={
                                    field?.placeholder as
                                        | "text"
                                        | "outlined"
                                        | "contained"
                                }
                                type={
                                    field?.value as
                                        | "button"
                                        | "submit"
                                        | "reset"
                                }
                                color={
                                    (field?.options as string[])[0] as
                                        | "primary"
                                        | "error"
                                        | "info"
                                        | "secondary"
                                        | "success"
                                        | "warning"
                                }
                            >
                                {field?.label as string}
                            </Button>
                        )}
                    </div>
                )}
            </Draggable>
        </>
    );
};

export default DraggableItem;
