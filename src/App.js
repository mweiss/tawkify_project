import "./App.css";
import ListInput from "./ListInput";
import { Checkbox, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "reset-css/reset.css";

function App() {
    const [values, setValues] = useState([
        "checking it twice",
        "making a list",
    ]);
    const [disabled, setDisabled] = useState(false);
    const [required, setRequired] = useState(true);
    const [maxItems, setMaxItems] = useState(3);

    const onChange = (v) => {
        setValues(v);
    };
    return (
        <div className="App">
            <FormControlLabel
                label="Disabled"
                control={
                    <Checkbox
                        onChange={(e) => setDisabled(e.target.checked)}
                        checked={disabled}
                    />
                }
            />
            <FormControlLabel
                label="Required"
                control={
                    <Checkbox
                        onChange={(e) => setRequired(e.target.checked)}
                        checked={required}
                    />
                }
            />
            <TextField
                type="number"
                label="Max items"
                value={maxItems}
                onChange={(e) =>
                    setMaxItems(
                        Math.max(values.length, +e.target.value) ||
                            values.length
                    )
                }
            />
            <div className="exampleInput">
                <ListInput
                    label={`Top ${maxItems} priorities`}
                    placeholder="Type here..."
                    required={required}
                    disabled={disabled}
                    max={maxItems}
                    onChange={onChange}
                    values={values}
                />
            </div>
        </div>
    );
}

export default App;
