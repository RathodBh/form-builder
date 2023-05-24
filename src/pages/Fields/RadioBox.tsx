import React from "react";
import FieldSet from "../../modals/FieldSet";
import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";

const RadioBox = ({ field }: { field: FieldSet }) => {
    console.log("FIELDSSSSS", field?.value);
    return (
        <>
            {/* <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                />
            </RadioGroup> */}
            <RadioGroup
                style={{ width: "100%" }}
                value={field?.value as string || ""}
                // key={i}
                name={"radio-buttons"}
            >
                {field?.options &&
                    (field?.options as string[])?.map((op, i) => {
                        return (
                            <FormControlLabel
                                value={op}
                                control={<Radio />}
                                label={op}
                            />
                        );
                    })}
            </RadioGroup>
        </>
    );
};

export default RadioBox;
