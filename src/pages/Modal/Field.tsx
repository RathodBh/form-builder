import {
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Switch,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SelectBox from "../Fields/SelectBox";
import FieldSet from "../../modals/FieldSet";
import TextBox from "../Fields/TextBox";
import SimpleBox from "../Fields/SimpleBox";
import CheckBox from "../Fields/CheckBox";

type FieldType = {
    field: string;
    fieldVal: FieldSet;
    setFieldVal: React.Dispatch<React.SetStateAction<FieldSet>>;
};

const Field = ({ field, fieldVal, setFieldVal }: FieldType) => {
    const [options, setOptions] = useState<string[]>([]);
    const [multi, setMulti] = useState<string[]>([""]);

    useEffect(() => {
        setFieldVal({
            ...fieldVal,
            fieldName: field,
            values: multi,
        });
        console.log("Field", fieldVal);
    }, [multi]);

    const onDefaultChange = (
        e: React.ChangeEvent<HTMLElement> | SelectChangeEvent<unknown>,
        name: string
    ) => {
        const target = e.target as HTMLInputElement;

        setFieldVal({
            ...fieldVal,
            [name]: target?.value,
        });

        name === "value" && setMulti([target?.value]);
    };

    const onDefaultValid = (
        e: React.ChangeEvent<HTMLElement>,
        name: string
    ) => {
        const target = e.target as HTMLInputElement;
        setFieldVal({
            ...fieldVal,
            [name]: target?.checked,
        });
    };

    const removeOption = (index: number) => {
        const newOpt = options?.filter((opt, i) => i !== index);
        setOptions([...newOpt]);
        setFieldVal({
            ...fieldVal,
            options: [...newOpt],
        });
    };

    const optionsChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const newOpt = options?.map((opt, i) =>
            i === index ? (e.target.value as string) : opt
        );
        setOptions(index == -1 ? [e.target.value as string] : [...newOpt]);
        setFieldVal({
            ...fieldVal,
            options: [...newOpt],
        });
    };

    const generateField = () => {
        return (
            <>
                <p>
                    {fieldVal?.label}
                    {fieldVal?.required && (
                        <span style={{ color: "red" }}>*</span>
                    )}
                </p>
                {(field === "Text Area" ||
                    field === "Text Field" ||
                    field === "Number" ||
                    field === "Password") && (
                    <>
                        <TextBox field={fieldVal} />
                    </>
                )}

                {field === "Select" && <SelectBox field={fieldVal} />}

                {(field === "Date" || field === "File") && (
                    <SimpleBox field={fieldVal} />
                )}

                {field === "Checkbox" && <CheckBox field={fieldVal} />}
            </>
        );
    };

    const onMultiChange = (event: SelectChangeEvent<typeof multi>) => {
        const {
            target: { value },
        } = event;
        setMulti(typeof value === "string" ? value.split(",") : value);

        setFieldVal({ ...fieldVal, values: value });
    };
    return (
        <>
            <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                    <TextField
                        label="Label"
                        variant="outlined"
                        onChange={(e) => onDefaultChange(e, "label")}
                        style={{ margin: "10px 0" }}
                        fullWidth
                    />
                    {(field === "Text Area" ||
                        field === "Text Field" ||
                        field === "Number" ||
                        field === "Password") && (
                        <TextField
                            label="Default Value"
                            type={field}
                            variant="outlined"
                            onChange={(e) => onDefaultChange(e, "value")}
                            style={{ margin: "10px 0" }}
                            multiline={field === "Text Area" ? true : false}
                            rows={field === "Text Area" ? "4" : "1"}
                            fullWidth
                        />
                    )}

                    {(field === "Select" || field === "Checkbox") && (
                        <>
                            <fieldset
                                style={{
                                    border: "1px solid silver",
                                    borderRadius: "6px",
                                }}
                            >
                                <legend>All Options</legend>
                                {options && options?.length > 0 ? (
                                    options?.map((option, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                width: "100%",
                                                margin: "10px 0px",
                                            }}
                                        >
                                            <TextField
                                                label={"option" + (i + 1)}
                                                size="small"
                                                style={{
                                                    width:
                                                        options?.length > 1
                                                            ? "80%"
                                                            : "100%",
                                                }}
                                                value={option}
                                                onChange={(e) =>
                                                    optionsChange(e, i)
                                                }
                                                autoFocus
                                            />
                                            {options?.length > 1 && (
                                                <Button
                                                    variant="outlined"
                                                    style={{
                                                        width: "10% !important",
                                                    }}
                                                    color="error"
                                                    onClick={() => {
                                                        removeOption(i);
                                                    }}
                                                    size={"small"}
                                                >
                                                    <DeleteForeverIcon />
                                                </Button>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <TextField
                                        size="small"
                                        fullWidth
                                        onChange={(e) => {
                                            optionsChange(e, -1);
                                        }}
                                    />
                                )}

                                <Button
                                    variant="contained"
                                    size={"small"}
                                    onClick={() => {
                                        setOptions([...options, ""]);
                                    }}
                                >
                                    ADD
                                </Button>
                            </fieldset>

                            <FormControl fullWidth style={{ margin: "20px 0" }}>
                                <InputLabel
                                    id={
                                        new Date().getTime().toString() + "main"
                                    }
                                >
                                    Default selected value
                                </InputLabel>
                                <Select
                                    label={"Default selected value"}
                                    multiple={
                                        field === "Checkbox" ? true : false
                                    }
                                    value={multi}
                                    labelId={
                                        new Date().getTime().toString() + "main"
                                    }
                                    id={"a" + new Date().getTime().toString()}
                                    onChange={
                                        field === "Checkbox"
                                            ? onMultiChange
                                            : (e: SelectChangeEvent<unknown>) =>
                                                  onDefaultChange(e, "value")
                                    }
                                    renderValue={(selected: string[]) =>
                                        selected.join(",")
                                    }
                                >
                                    <MenuItem value={""} disabled>
                                        {"---------NONE---------"}
                                    </MenuItem>
                                    {options?.map((opt, i) => (
                                        <MenuItem value={opt}>{opt}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </>
                    )}

                    {field !== "Select" &&
                        field !== "Checkbox" &&
                        field !== "Date" &&
                        field !== "File" &&
                        field !== "Radio" && (
                            <TextField
                                label="Placeholder"
                                variant="outlined"
                                onChange={(e) =>
                                    onDefaultChange(e, "placeholder")
                                }
                                style={{ margin: "10px 0" }}
                                fullWidth
                            />
                        )}

                    {/* {
                        (field === "CheckBox") && (

                        )
                    } */}

                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={fieldVal?.required as boolean}
                                    onChange={(e) =>
                                        onDefaultValid(e, "required")
                                    }
                                    name="required"
                                />
                            }
                            label="Required"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={fieldVal?.readonly as boolean}
                                    onChange={(e) =>
                                        onDefaultValid(e, "readonly")
                                    }
                                    name="readonly"
                                />
                            }
                            label="Read only"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={fieldVal?.disabled as boolean}
                                    onChange={(e) =>
                                        onDefaultValid(e, "disabled")
                                    }
                                    name="disabled"
                                />
                            }
                            label="Disabled"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={fieldVal?.focus as boolean}
                                    onChange={(e) => onDefaultValid(e, "focus")}
                                    name="focus"
                                />
                            }
                            label="Autofocus"
                        />
                    </FormGroup>
                </div>
                <div
                    style={{
                        padding: "10px 20px",
                        width: "50%",
                    }}
                >
                    Preview
                    <div
                        style={{
                            // background: "rgba(0,0,0,0.1)",
                            border: "1px solid silver",
                            padding: "5px 15px 15px 15px",
                            borderRadius: "12px",
                        }}
                    >
                        {generateField()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Field;
