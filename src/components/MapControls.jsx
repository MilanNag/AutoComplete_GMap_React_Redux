import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { connect } from 'react-redux';

import ListSearches from './ListSearches';
import { clearSelecteedTodoForEditing } from '../store/actions/list';

const RADIOS = [
  { label: "All", value: "all", id: "changetype-all" },
  { label: "Establishment", value: "establishment", id: "changetype-establishment" },
  { label: "Address", value: "address", id: "changetype-address" },
  { label: "Geocode", value: "geocode", id: "changetype-geocode" },
  { label: "(cities)", value: "cities", id: "changetype-cities" },
  { label: "(regions)", value: "regions", id: "changetype-regions" },
];

const CHECKBOXS = [
  { label: "Bias to map viewport", value: "viewport", id: "use-location-bias" },
  { label: "Strict bounds", value: "bounds", id: "use-strict-bounds" },
];

const MapControls = ({
  inRef,
  loading,
  inputSearchRef,
  onClickItem,
}) => {
  return (
    <Card
      ref={inRef}
      component="fieldset"
      disabled={!loading}
      className="cardTools"
    >
      <CardContent>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="options-search"
            name="options-search"
            defaultValue="all"
          >
            {RADIOS.map(item => 
              <FormControlLabel
                key={item.id}
                name="type"
                id={item.id}
                value={item.value}
                label={item.label}
                control={<Radio size="small" disabled={!loading} />}
              />
            )}
          </RadioGroup>
        </FormControl>
        <hr />
        <Stack spacing={2}>
          <div>
            {CHECKBOXS.map(item => 
              <FormControlLabel
                key={item.value}
                size="small"
                control={<Checkbox size="small" id={item.id} disabled={!loading} />}
                label={item.label}
              />
            )}
          </div>
          
          <TextField
            inputRef={inputSearchRef}
            disabled={!loading}
            fullWidth
            id="inputLocation"
            label="Enter a location"
            placeholder=""
            size="small"
            variant="outlined"
            inputProps={{ type: "search", className: "text-ellipsis" }}
          />
        </Stack>

        <ListSearches onClickItem={onClickItem} />
      </CardContent>
    </Card>
	);
}

const mapStateToProps = (state) => {
  return {
    selectedTaskToEditOrAdd: state.listSearch.selectedTaskToEditOrAdd,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearSelecteedTodoForEditing: () => {
      dispatch(clearSelecteedTodoForEditing());
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((MapControls));
