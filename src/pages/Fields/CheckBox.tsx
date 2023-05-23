import React from "react";
import FieldSet from "../../modals/FieldSet";
import { Checkbox, FormControlLabel } from "@mui/material";

const CheckBox = ({ field }: { field: FieldSet }) => {
    return (
        <>
            {field?.options &&
                (field?.options as string[])?.map((op, i) => {
                    const isValid = (field?.values as string[])?.find((cur:string)=>cur === op)
                    return (
                        <FormControlLabel
                            style={{width:"100%"}}
                            checked={isValid ? true : false}
                            key={i}
                            label={op}
                            control={<Checkbox />}
                        />
                    );
                })}
        </>
    );
};

export default CheckBox;
