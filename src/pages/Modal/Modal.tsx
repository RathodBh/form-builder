import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Field from "./Field";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}
interface ModalOpt {
    open: boolean;
    field: string;
}
type fieldSet = {
    [key: string]: string | boolean | number;
};
interface Props {
    modal: ModalOpt;
    setModal: React.Dispatch<React.SetStateAction<ModalOpt>>;
    setAllFields: React.Dispatch<React.SetStateAction<fieldSet[]>>;
}
const initialFieldState: fieldSet = {
    label: "",
    value: "",
    required: true,
    disabled: false,
    readonly: false,
    focus: false,
    placeholder: "",
};

export default function Modal({ modal, setModal, setAllFields }: Props) {
    const [fieldVal, setFieldVal] = React.useState<fieldSet>(initialFieldState);
    // const [allField, setAllFields] = React.useState<fieldSet[]>([initialFieldState]);

    const handleClose = () => {
        setModal({
            ...modal,
            open: false,
        });
    };
    const addData = () => {
        setAllFields((prev)=>[...prev,fieldVal]);
        setFieldVal(initialFieldState);
    }
    
    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={modal?.open}
                fullWidth
                maxWidth={"md"}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    {modal?.field}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Field field={modal?.field} fieldVal={fieldVal} setFieldVal={setFieldVal} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={()=>{
                        handleClose();
                        addData()
                    }}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
