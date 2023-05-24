import React from "react";
import FieldSet from "../../modals/FieldSet";

const SimpleBox = ({ field }: { field: FieldSet }) => {
    console.log("SImple",field)
    return (
        <>
            <input
                type={field?.fieldName as string}
                value={field?.value as string}
                placeholder={field?.placeholder as string}
                required={field?.required as boolean}
                readOnly={field?.readonly as boolean}
                autoFocus={field?.focus as boolean}
                style={{padding: "10px 5px", border: "1px solid silver",width:"100%",borderRadius: "5px"}}
            />
        </>
    );
};

export default SimpleBox;
