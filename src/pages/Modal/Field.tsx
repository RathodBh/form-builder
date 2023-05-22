import { Label } from "@mui/icons-material";
import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import React, { useState } from "react";

type fieldSet = {
    [key: string]: string | boolean | number;
};


const Field = ({
    field,
    fieldVal,
    setFieldVal,
}: {
    field: string;
    fieldVal: fieldSet;
    setFieldVal: React.Dispatch<React.SetStateAction<fieldSet>>;
}) => {
    
    const onDefaultChange = (
        e: React.ChangeEvent<HTMLElement>,
        name: string
    ) => {
        const target = e.target as HTMLInputElement;
        setFieldVal({
            ...fieldVal,
            [name]: target?.value,
        });
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

    const generateField = () => {
        return (
            <>
                <p>
                    {fieldVal?.required && (
                        <span style={{ color: "red" }}>*</span>
                    )}
                    {fieldVal?.label}
                </p>
                <TextField
                    value={fieldVal?.value as string}
                    // type={}
                    multiline={field === "Text Area" ? true : false}
                    rows={field === "Text Area" ? "4" : "0"}
                    variant="outlined"
                    fullWidth
                />
            </>
        );
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
                    <TextField
                        label="Default Value"
                        variant="outlined"
                        onChange={(e) => onDefaultChange(e, "value")}
                        style={{ margin: "10px 0" }}
                        fullWidth
                    />

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
                {/* preview */}
                <div
                    style={{
                        padding: "10px 20px",
                        width: "50%",
                    }}
                >
                    Preview
                    <div
                        style={{
                            background: "rgba(0,0,0,0.1)",
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
