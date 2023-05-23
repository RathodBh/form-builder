import { TextField } from '@mui/material';
import React from 'react'
import FieldSet from '../../modals/FieldSet';

const TextBox = ({field}:{field:FieldSet}) => {
  return (
      <>
          <TextField
              value={field?.value as string}
              type={field?.fieldName as string}
              variant="outlined"
              placeholder={field?.placeholder as string}
              style={{
                  margin: "10px 0",
              }}
              multiline={field?.fieldName === "Text Area" ? true : false}
              rows={field?.fieldName === "Text Area" ? "4" : "1"}
              fullWidth
              InputProps={{
                  readOnly: field?.readOnly as boolean,
              }}
              disabled={field?.disabled as boolean}
          />
      </>
  );
}

export default TextBox