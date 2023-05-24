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
import RadioBox from "../Fields/RadioBox";
import { BtnColors, BtnTypes, BtnVariants } from "../../utils/Constants";
import Btn from "../../modals/Btn";

interface FieldType {
    field: string;
    fieldVal: FieldSet;
    setFieldVal: React.Dispatch<React.SetStateAction<FieldSet>>;
}

const Field = ({ field, fieldVal, setFieldVal }: FieldType) => {
    const [options, setOptions] = useState<string[]>([]);
    const [multi, setMulti] = useState<string[]>([""]);
    const [btn, setBtn] = useState<Btn>({
        variant: "outlined",
        color: "primary",
        type: "button",
    });

    useEffect(() => {
           
            setFieldVal((prev) => {
                return {
                    ...prev,
                    label:
                        prev?.label === ""
                            ? field
                            : field !== prev?.label
                            ? prev?.label
                            : field,
                    fieldName: field,
                };
            });

        field === "Button" &&
            setFieldVal((prev) => {
                return {
                    ...prev,
                    placeholder: btn?.variant,
                    value: btn?.type,
                    options: [btn?.color],
                    fieldName: field,
                };
            });
    }, []);

    useEffect(() => {
        if (fieldVal)
            setFieldVal({
                ...fieldVal,
                fieldName: field,
                label: field !== fieldVal?.label ? fieldVal?.label : field,
                values: multi,
            });
    }, [multi]);

    useEffect(() => {
        if (
            fieldVal?.options &&
            (fieldVal?.options as string[]).length > 0 &&
            field !== "Button"
        ) {
            setOptions(fieldVal?.options as string[]);
            setMulti(fieldVal?.values as string[]);
        }
        if (field === "Button") {
            setBtn({
                variant: fieldVal?.placeholder as
                    | "outlined"
                    | "contained"
                    | "text",
                color: fieldVal?.options
                    ? ((fieldVal?.options as string[])[0] as
                          | "primary"
                          | "error"
                          | "info"
                          | "secondary"
                          | "success"
                          | "warning")
                    : "primary",
                type: fieldVal?.value as "submit" | "button" | "reset",
            });
        }
    }, [fieldVal?.options]);

    const onDefaultChange = (
        e: React.ChangeEvent<HTMLElement> | SelectChangeEvent<unknown>,
        name: string
    ) => {
        const target = e.target as HTMLInputElement;

        setFieldVal((prev) => {
            return { ...prev, [name]: target?.value };
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
                    {fieldVal?.fieldName !== "Button" && fieldVal?.label}
                    {fieldVal?.required && fieldVal?.fieldName !== "Button" && (
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

                {(field === "date" || field === "File") && (
                    <SimpleBox field={fieldVal} />
                )}

                {field === "Checkbox" && <CheckBox field={fieldVal} />}
                {field === "Radio" && <RadioBox field={fieldVal} />}
                {field === "Button" && (
                    <Button
                        variant={btn?.variant}
                        color={btn?.color}
                        type={btn?.type}
                    >
                        {fieldVal?.label}
                    </Button>
                )}
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

    const updateBtn = (e: SelectChangeEvent<unknown>, type: string) => {
        setBtn({
            ...btn,
            [type]: e.target.value,
        });

        type === "variant" &&
            setFieldVal({
                ...fieldVal,
                placeholder: e.target?.value as string,
            });
        type === "color" &&
            setFieldVal({ ...fieldVal, options: [e.target?.value as string] });
        type === "type" &&
            setFieldVal({ ...fieldVal, value: e.target?.value as string });
    };
    return (
        <>
            <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                    <TextField
                        label={field === "Button" ? "Text" : "Label"}
                        variant="outlined"
                        value={fieldVal?.label}
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
                            value={fieldVal?.value}
                            type={field}
                            variant="outlined"
                            onChange={(e) => onDefaultChange(e, "value")}
                            style={{ margin: "10px 0" }}
                            multiline={field === "Text Area" ? true : false}
                            rows={field === "Text Area" ? "4" : "1"}
                            fullWidth
                        />
                    )}

                    {(field === "Select" ||
                        field === "Checkbox" ||
                        field === "Radio") && (
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
                        field !== "date" &&
                        field !== "File" &&
                        field !== "Radio" &&
                        field !== "Button" && (
                            <TextField
                                label="Placeholder"
                                value={fieldVal?.placeholder}
                                variant="outlined"
                                onChange={(e) =>
                                    onDefaultChange(e, "placeholder")
                                }
                                style={{ margin: "10px 0" }}
                                fullWidth
                            />
                        )}

                    {field === "Button" && (
                        <>
                            <div style={{ margin: "15px 0" }}>
                                <p>Button variant</p>
                                <Select
                                    fullWidth
                                    value={btn?.variant}
                                    onChange={(e) => updateBtn(e, "variant")}
                                >
                                    {BtnVariants?.map((v) => (
                                        <MenuItem value={v}>{v}</MenuItem>
                                    ))}
                                </Select>
                            </div>

                            <div style={{ margin: "15px 0" }}>
                                <p>Button color</p>
                                <Select
                                    fullWidth
                                    value={btn?.color}
                                    onChange={(e) => updateBtn(e, "color")}
                                >
                                    {BtnColors?.map((v) => (
                                        <MenuItem value={v}>{v}</MenuItem>
                                    ))}
                                </Select>
                            </div>

                            <div style={{ margin: "15px 0" }}>
                                <p>Button type</p>
                                <Select
                                    fullWidth
                                    value={btn?.type}
                                    onChange={(e) => updateBtn(e, "type")}
                                >
                                    {BtnTypes?.map((v) => (
                                        <MenuItem value={v}>{v}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </>
                    )}
                    {field !== "Button" && (
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
                                        onChange={(e) =>
                                            onDefaultValid(e, "focus")
                                        }
                                        name="focus"
                                    />
                                }
                                label="Autofocus"
                            />
                        </FormGroup>
                    )}
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
