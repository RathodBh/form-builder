import React from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import FieldSet from "../../modals/FieldSet";

const SelectBox = ({
    field,
    multiple=false,
}: {
    field: FieldSet;
    multiple?: boolean;
}) => {
    return (
        <>
            <FormControl fullWidth>
                <Select
                    value={field?.value as string}
                    id={"a" + new Date().getTime().toString()}
                    autoFocus={field?.autoFocus as boolean}
                    disabled={field?.disabled as boolean}
                    readOnly={field?.readonly as boolean}
                    multiple={multiple ? true : false}
                >
                    <MenuItem selected disabled value="">
                        <em>-------NONE-------</em>
                    </MenuItem>
                    {(field?.options as string[])?.map((opt, i) => (
                        <MenuItem value={opt}>{opt}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default SelectBox;
