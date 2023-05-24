import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Field from "./Field";
import FieldSet from "../../modals/FieldSet";
import { useEffect, useState } from "react";

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
    index?: number;
}

interface Props {
    modal: ModalOpt;
    setModal: React.Dispatch<React.SetStateAction<ModalOpt>>;
    allFields: FieldSet[];
    setAllFields: React.Dispatch<React.SetStateAction<FieldSet[]>>;
}
const initialFieldState: FieldSet = {
    label: "",
    value: "",
    values: [""],
    required: true,
    disabled: false,
    readonly: false,
    focus: false,
    placeholder: "",
    fieldName: "",
    options: [""],
};

export default function Modal({
    modal,
    setModal,
    allFields,
    setAllFields,
}: Props) {
    const [fieldVal, setFieldVal] = useState<FieldSet>();

    useEffect(() => {
        if (modal?.index !== -1) {
            const thisField = allFields?.find((_, i) => i === modal?.index);
            setFieldVal({ ...thisField });
        } else {
            setFieldVal({ ...initialFieldState });
        }
    }, [modal]);

    const handleClose = () => {
        setModal({
            ...modal,
            open: false,
        });
    };

    const addData = () => {
        if (modal?.index !== -1) {
            const newArr = allFields?.map((cur, i) => {
                return i === modal?.index ? { ...fieldVal } : cur;
            });
            setAllFields(newArr);
        } else {
            setAllFields([...allFields, fieldVal] as FieldSet[]);
        }
        setFieldVal({ ...initialFieldState });
    };

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
                    {modal?.index !== -1 && "Edit : "}
                    {modal?.field}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Field
                        field={modal?.field}
                        fieldVal={fieldVal as FieldSet}
                        setFieldVal={
                            setFieldVal as React.Dispatch<
                                React.SetStateAction<FieldSet>
                            >
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={() => {
                            handleClose();
                            addData();
                        }}
                    >
                        {modal?.index !== -1 ? "UPDATE" : "ADD"}
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
