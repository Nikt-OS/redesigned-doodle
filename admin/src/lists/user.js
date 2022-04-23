import {
  List,
  Datagrid,
  TextField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  Show,
  SimpleShowLayout,
  CheckboxGroupInput,
  required,
  minLength,
  maxLength,
  minValue,
  number,
  email,
  choices,
  PasswordInput,
  ShowButton,
  useRecordContext,
  Labeled,
  SimpleList,
  FunctionField,
} from "react-admin";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@material-ui/core/styles";

const validateFullName = [required(), minLength(2), maxLength(25)];
const validatePassword = [required(), minLength(8), maxLength(16)];
const validateEmail = [email(), required()];
const validateAge = [number(), minValue(18)];
const validateGender = choices(
  ["m", "f", "nc"],
  "Please choose one of the values"
);
let genders = [
  { id: "m", name: "Male" },
  { id: "f", name: "Female" },
  { id: "nc", name: "Prefer not say" },
];
let bugs = [
  {
    id: "orphography",
    name: "Орфографические ошибки",
  },
  {
    id: "required_field_error",
    name: "Отображает ошибку если не заполнено необязательное поле/не отображает если не заполнено обязательное",
  },
  {
    id: "clear_button",
    name: "Не работают крестики очистки полей",
  },
];
const getGenders = (gender) => {
  let map = new Map();
  map.set("m", "Male");
  map.set("f", "Female");
  map.set("nc", "Prefer not say");
  return map.get(gender);
};
const getBugs = (bugs) => {
  let map = new Map();
  map.set("orphography", "Орфографические ошибки");
  map.set(
    "required_field_error",
    "Отображает ошибку если не заполнено необязательное поле/не отображает если не заполнено обязательное"
  );
  map.set("clear_button", "Не работают крестики очистки полей");
  return map.get(bugs);
};
export const UserList = (props) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <List {...props} basePath="/user">
      {isSmall ? (
        <SimpleList
          linkType="show"
          primaryText={(record) => record.id}
          secondaryText={(record) => record.email}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField sortable={false} source="id" />
          <TextField sortable={false} source="email" />
          <ShowButton />
        </Datagrid>
      )}
    </List>
  );
};
const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.email}"` : ""}</span>;
};

export const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="full_name" validate={validateFullName} />
      <TextInput disabled label="Email" source="email" />
      <TextInput label="Age" source="age" validate={validateAge} />
      <SelectInput
        label="Gender"
        source="gender"
        choices={genders}
        validate={validateGender}
      />
      <PasswordInput label="Enter new password" source="password" />

      <CheckboxGroupInput row={false} source="bugs" choices={bugs} required />
    </SimpleForm>
  </Edit>
);

export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="full_name" validate={validateFullName} />
      <TextInput label="Age" source="age" validate={validateAge} />
      <SelectInput
        label="Gender"
        source="gender"
        choices={genders}
        validate={validateGender}
      />

      <TextInput label="Email" source="email" validate={validateEmail} />
      <PasswordInput
        multiline
        label="Password"
        source="password"
        validate={validatePassword}
      />
      <CheckboxGroupInput row={false} source="bugs" choices={bugs} required />
    </SimpleForm>
  </Create>
);
const Bugs = (props) => {
  const record = useRecordContext(props);
  return (
    <>
      <Stack direction="column" spacing={1}>
        {record.bugs.map((item) => (
          <Chip key={item} label={getBugs(item)} />
        ))}{" "}
      </Stack>
    </>
  );
};
export const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="email" />
      <TextField source="full_name" />
      <FunctionField
        label="Gender"
        source="gender"
        render={(record) => getGenders(record.gender)}
      />
      <TextField source="age" />
      <Labeled source="bugs" label="Bugs">
        <Bugs source="bugs" />
      </Labeled>
    </SimpleShowLayout>
  </Show>
);
