import { IUser } from "../localStore/authStore";
import { Query } from "react-apollo";
import withApollo from '../lib/with-apollo-client';

interface UserData {
    currentUser: IUser
}

class CurrentUserQuery extends Query<UserData> {}

export default withApollo(CurrentUserQuery);