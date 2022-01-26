import PropTypes from "prop-types";
import {
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
} from "@mui/material";
import { Clear, DragIndicator } from "@mui/icons-material";
import { useState } from "react";
import ReactDragListView from "react-drag-listview/lib/index.js";

function ListInput({
    label,
    placeholder,
    required,
    disabled,
    max,
    onChange,
    values,
}) {
    const [workingItem, setWorkingItem] = useState("");
    const [maxItemsError, setMaxItemsError] = useState("");

    const onDelete = (i) => onChange(values.filter((_, j) => j !== i));

    /**
     * This function validates if a user can insert an item after hitting Enter.
     */
    const onKeyDown = (ev) => {
        const keycode = ev.keyCode ? ev.keyCode : ev.which;
        // If the user has not hit Enter, ignore the event.
        if (keycode !== 13) {
            return;
        }
        if (values.length >= max) {
            setMaxItemsError(
                `You may only enter ${max} items.  Please remove an item if you want to add a new one.`
            );
        } else {
            setWorkingItem("");
            onChange([workingItem, ...values]);
        }
    };

    let errorMessage = "";
    if (required && values.length === 0) {
        errorMessage = "Please enter at least one value in the list.";
    } else if (maxItemsError) {
        errorMessage = maxItemsError;
    }

    const dragProps = {
        onDragEnd(fromIndex, toIndex) {
            if (disabled) {
                return;
            }
            const valueToMove = values[fromIndex];
            const newValues = values.filter((_, i) => i !== fromIndex);
            newValues.splice(toIndex, 0, valueToMove);
            onChange(newValues);
        },
        nodeSelector: "li",
        handleSelector: "div.MuiListItemIcon-root",
    };

    return (
        <div>
            <TextField
                onKeyDownCapture={onKeyDown}
                fullWidth
                variant="standard"
                onChange={(e) => {
                    setMaxItemsError("");
                    setWorkingItem(e.target.value);
                }}
                value={workingItem}
                label={label}
                disabled={disabled || false}
                placeholder={placeholder}
                error={!!errorMessage}
                helperText={errorMessage}
            />
            <ReactDragListView {...dragProps}>
                <List>
                    {values.map((v, i) => (
                        <ListItem
                            key={i}
                            secondaryAction={
                                <IconButton
                                    disabled={disabled || false}
                                    onClick={() => onDelete(i)}
                                >
                                    <Clear />
                                </IconButton>
                            }
                        >
                            {disabled ? null : (
                                <ListItemIcon>
                                    <DragIndicator style={{ cursor: "move" }} />
                                </ListItemIcon>
                            )}

                            <ListItemText
                                primaryTypographyProps={{
                                    noWrap: true,
                                }}
                            >
                                {v}
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </ReactDragListView>
        </div>
    );
}

ListInput.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    max: PropTypes.number,
    onChange: PropTypes.func,
    values: PropTypes.array.isRequired,
};

export default ListInput;
